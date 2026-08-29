import { Server } from "socket.io";
import http from "http";
import * as Y from "yjs";
import { supabaseAdmin } from "./lib/supabase.js";
import { prisma } from "./lib/prisma.js";

const allowedOrigins = [
  "http://localhost:3000",
  "https://notion-lite-client.vercel.app",
];

const socketRooms = new Map<string, string>();
const authorizedDocs = new Map<string, Map<string, string>>(); // socket.id -> Set of documentIds they're allowed in

export function attachSocket(server: http.Server) {
  const io = new Server(server, {
    cors: { origin: allowedOrigins },
  });

  const docs = new Map<string, Y.Doc>();
  const dirty = new Set<string>();

  async function getDoc(documentId: string): Promise<Y.Doc> {
    if (docs.has(documentId)) return docs.get(documentId)!;
    const doc = new Y.Doc();
    const latestVersion = await prisma.versions.findFirst({
      where: { document_id: documentId },
      orderBy: { created_at: "desc" },
    });
    if (latestVersion?.content_snapshot) {
      const snapshot = latestVersion.content_snapshot as { data: string };
      const bytes = Buffer.from(snapshot.data, "base64");
      Y.applyUpdate(doc, new Uint8Array(bytes));
    }
    docs.set(documentId, doc);
    return doc;
  }

  async function saveDoc(documentId: string) {
    const doc = docs.get(documentId);
    if (!doc) return;
    const update = Y.encodeStateAsUpdate(doc);
    const base64 = Buffer.from(update).toString("base64");
    await prisma.versions.create({
      data: { document_id: documentId, content_snapshot: { data: base64 } },
    });
    dirty.delete(documentId);
    console.log("Saved version for document:", documentId);
  }

  setInterval(() => {
    dirty.forEach((documentId) => saveDoc(documentId));
  }, 120000);

  async function checkAccess(
    token: string | undefined,
    documentId: string,
  ): Promise<{ allowed: boolean; role: string | null }> {
    if (!token) return { allowed: false, role: null };
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data.user) return { allowed: false, role: null };
    const userId = data.user.id;

    const doc = await prisma.documents.findUnique({
      where: { id: documentId },
    });
    if (!doc) return { allowed: false, role: null };

    if (doc.owner_id === userId) return { allowed: true, role: "owner" };

    const isCollaborator = await prisma.collaborators.findFirst({
      where: { document_id: documentId, user_id: userId },
    });

    if (!isCollaborator) return { allowed: false, role: null };
    return { allowed: true, role: isCollaborator.role };
  }

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    authorizedDocs.set(socket.id, new Map());

    socket.on("join-document", async (documentId: string) => {
      const token = socket.handshake.auth?.token;
      const { allowed, role } = await checkAccess(token, documentId);

      if (!allowed) {
        console.log("DENIED join-document:", {
          socketId: socket.id,
          documentId,
        });
        socket.emit("join-denied", {
          reason: "Not authorized for this document",
        });
        return;
      }

      authorizedDocs.get(socket.id)!.set(documentId, role!);
      socket.join(documentId);
      socketRooms.set(socket.id, documentId);
      const doc = await getDoc(documentId);
      const currentState = Y.encodeStateAsUpdate(doc);
      socket.emit("yjs-update", currentState);
      socket.emit("your-role", { documentId, role });
    });

    socket.on("yjs-update", async ({ documentId, update }) => {
      const role = authorizedDocs.get(socket.id)?.get(documentId);

      if (!role) {
        console.log("REJECTED yjs-update from unauthorized socket:", {
          socketId: socket.id,
          documentId,
        });
        return;
      }
      if (role === "viewer") {
        console.log("REJECTED yjs-update from viewer:", {
          socketId: socket.id,
          documentId,
        });
        return;
      }

      const doc = await getDoc(documentId);
      Y.applyUpdate(doc, new Uint8Array(update));
      dirty.add(documentId);
      socket.to(documentId).emit("yjs-update", update);
    });

    socket.on("cursor-update", ({ documentId, cursor }) => {
      if (!authorizedDocs.get(socket.id)?.has(documentId)) return;
      socket
        .to(documentId)
        .emit("cursor-update", { socketId: socket.id, cursor });
    });

    socket.on("disconnect", () => {
      const documentId = socketRooms.get(socket.id);
      if (documentId) {
        socket.to(documentId).emit("cursor-left", { socketId: socket.id });
      }
      socketRooms.delete(socket.id);
      authorizedDocs.delete(socket.id);
    });
  });

  return io;
}
