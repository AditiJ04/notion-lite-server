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

export function attachSocket(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: allowedOrigins,
    },
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
      data: {
        document_id: documentId,
        content_snapshot: { data: base64 },
      },
    });

    dirty.delete(documentId);
    console.log("Saved version for document:", documentId);
  }

  setInterval(() => {
    dirty.forEach((documentId) => saveDoc(documentId));
  }, 120000);

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join-document", async (documentId: string) => {
      const token = socket.handshake.auth?.token;

      if (!token) {
        socket.emit("join-denied", { reason: "Not authenticated" });
        return;
      }

      const { data, error } = await supabaseAdmin.auth.getUser(token);
      if (error || !data.user) {
        socket.emit("join-denied", { reason: "Invalid session" });
        return;
      }

      const userId = data.user.id;

      const doc = await prisma.documents.findUnique({
        where: { id: documentId },
      });
      if (!doc) {
        socket.emit("join-denied", { reason: "Document not found" });
        return;
      }

      const isOwner = doc.owner_id === userId;
      const isCollaborator = await prisma.collaborators.findFirst({
        where: { document_id: documentId, user_id: userId },
      });

      if (!isOwner && !isCollaborator) {
        socket.emit("join-denied", {
          reason: "Not authorized for this document",
        });
        return;
      }

      socket.join(documentId);
      socketRooms.set(socket.id, documentId);
      const doc2 = await getDoc(documentId);
      const currentState = Y.encodeStateAsUpdate(doc2);
      socket.emit("yjs-update", currentState);
    });

    socket.on("yjs-update", async ({ documentId, update }) => {
      const doc = await getDoc(documentId);
      Y.applyUpdate(doc, new Uint8Array(update));
      dirty.add(documentId);

      socket.to(documentId).emit("yjs-update", update);
    });

    socket.on("cursor-update", ({ documentId, cursor }) => {
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
    });
  });

  return io;
}
