import { Server } from 'socket.io'
import http from 'http'
import * as Y from 'yjs'
import { prisma } from './lib/prisma.js'

export function attachSocket(server: http.Server) {
  const io = new Server(server, { cors: { origin: 'https://notion-lite-client.vercel.app' } })

  const docs = new Map<string, Y.Doc>()
  const dirty = new Set<string>() // tracks which documents have unsaved changes

  async function getDoc(documentId: string): Promise<Y.Doc> {
    if (docs.has(documentId)) return docs.get(documentId)!

    const doc = new Y.Doc()

    // Load the most recent saved version from the DB, if one exists
    const latestVersion = await prisma.versions.findFirst({
      where: { document_id: documentId },
      orderBy: { created_at: 'desc' },
    })

    if (latestVersion?.content_snapshot) {
      const snapshot = latestVersion.content_snapshot as { data: string }
      const bytes = Buffer.from(snapshot.data, 'base64')
      Y.applyUpdate(doc, new Uint8Array(bytes))
    }

    docs.set(documentId, doc)
    return doc
  }

  async function saveDoc(documentId: string) {
    const doc = docs.get(documentId)
    if (!doc) return

    const update = Y.encodeStateAsUpdate(doc)
    const base64 = Buffer.from(update).toString('base64')

    await prisma.versions.create({
      data: {
        document_id: documentId,
        content_snapshot: { data: base64 },
      },
    })

    dirty.delete(documentId)
    console.log('Saved version for document:', documentId)
  }

  // Autosave every 15 seconds, only for documents with unsaved changes
  setInterval(() => {
    dirty.forEach((documentId) => saveDoc(documentId))
  }, 120000)

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)

    socket.on('join-document', async (documentId: string) => {
      socket.join(documentId)
      const doc = await getDoc(documentId)
      const currentState = Y.encodeStateAsUpdate(doc)
      socket.emit('yjs-update', currentState)
    })

    socket.on('yjs-update', async ({ documentId, update }) => {
      const doc = await getDoc(documentId)
      Y.applyUpdate(doc, new Uint8Array(update))
      dirty.add(documentId) // mark as needing a save

      socket.to(documentId).emit('yjs-update', update)
    })

    socket.on('cursor-update', ({ documentId, cursor }) => {
      socket.to(documentId).emit('cursor-update', { socketId: socket.id, cursor })
    })
  })

  return io
}