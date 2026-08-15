import { Router } from 'express'
import { prisma } from '../lib/prisma.js'
import  { requireAuth} from '../middleware/auth.js'
import type{ AuthedRequest } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

// GET /documents — list documents owned by or shared with the logged-in user
router.get('/', async (req: AuthedRequest, res) => {

   if (!req.userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  
  const docs = await prisma.documents.findMany({
    where: {
      OR: [
        { owner_id: req.userId },
        { collaborators: { some: { user_id: req.userId } } },
      ],
    },
    orderBy: { updated_at: 'desc' },
  })
  res.json(docs)
})

// POST /documents — create a new document, owned by the logged-in user
router.post('/', async (req: AuthedRequest, res) => {
  const doc = await prisma.documents.create({
    data: { title: req.body.title ?? 'Untitled', owner_id: req.userId! },
  })
  res.status(201).json(doc)
})

const getDocumentId = (req: AuthedRequest): string | undefined => {
  const { id } = req.params
  return typeof id === 'string' ? id : undefined
}

// GET /documents/:id — fetch one document
router.get('/:id', async (req: AuthedRequest, res) => {
  const documentId = getDocumentId(req)
  if (!documentId) return res.status(400).json({ error: 'Invalid document id' })

  const doc = await prisma.documents.findUnique({ where: { id: documentId } })
  if (!doc) return res.status(404).json({ error: 'Not found' })
  res.json(doc)
})

// PATCH /documents/:id — update the title (only if the requester owns it)
router.patch('/:id', async (req: AuthedRequest, res) => {
  const documentId = getDocumentId(req)
  if (!documentId) return res.status(400).json({ error: 'Invalid document id' })

  const doc = await prisma.documents.findUnique({ where: { id: documentId } })
  if (doc?.owner_id !== req.userId) return res.status(403).json({ error: 'Forbidden' })

  const updated = await prisma.documents.update({
    where: { id: documentId },
    data: { title: req.body.title },
  })
  res.json(updated)
})

// DELETE /documents/:id — delete (only if the requester owns it)
router.delete('/:id', async (req: AuthedRequest, res) => {
  const documentId = getDocumentId(req)
  if (!documentId) return res.status(400).json({ error: 'Invalid document id' })

  const doc = await prisma.documents.findUnique({ where: { id: documentId } })
  if (doc?.owner_id !== req.userId) return res.status(403).json({ error: 'Forbidden' })

  await prisma.documents.delete({ where: { id: documentId } })
  res.status(204).send()
})

// POST /documents/:id/collaborators — share the document with another user
router.post('/:id/collaborators', async (req: AuthedRequest, res) => {
  const documentId = getDocumentId(req)
  if (!documentId) return res.status(400).json({ error: 'Invalid document id' })

  const doc = await prisma.documents.findUnique({ where: { id: documentId } })
  if (doc?.owner_id !== req.userId) return res.status(403).json({ error: 'Forbidden' })

  const collab = await prisma.collaborators.create({
    data: {
      document_id: documentId,
      user_id: req.body.user_id,
      role: req.body.role ?? 'viewer',
    },
  })
  res.status(201).json(collab)
})

// GET /documents/:id/versions — list version history
router.get('/:id/versions', async (req: AuthedRequest, res) => {
  const documentId = getDocumentId(req)
  if (!documentId) return res.status(400).json({ error: 'Invalid document id' })

  const versions = await prisma.versions.findMany({
    where: { document_id: documentId },
    orderBy: { created_at: 'desc' },
    select: { id: true, created_at: true, created_by: true },
    // deliberately NOT selecting content_snapshot here — it's large binary data,
    // only fetch it when the user actually wants to restore a specific version
  })
  res.json(versions)
})

// GET /documents/:id/versions/:versionId — get one version's content (for restore)
router.get('/:id/versions/:versionId', async (req: AuthedRequest, res) => {
  const documentId = getDocumentId(req)
  if (!documentId) return res.status(400).json({ error: 'Invalid document id' })

  const { versionId } = req.params
  if (typeof versionId !== 'string') {
    return res.status(400).json({ error: 'Invalid version id' })
  }

  const version = await prisma.versions.findUnique({
    where: { id: versionId },
  })
  if (!version) return res.status(404).json({ error: 'Not found' })
  if (version.document_id !== documentId) {
    return res.status(404).json({ error: 'Not found' })
  }

  res.json(version)
})


// GET /documents/:id/comments — list comments for a document
router.get('/:id/comments', async (req: AuthedRequest, res) => {
  const documentId = getDocumentId(req)
  if (!documentId) return res.status(400).json({ error: 'Invalid document id' })

  const comments = await prisma.comments.findMany({
    where: { document_id: documentId },
    orderBy: { created_at: 'asc' },
  })
  res.json(comments)
})

// POST /documents/:id/comments — add a comment
router.post('/:id/comments', async (req: AuthedRequest, res) => {
  const documentId = getDocumentId(req)
  if (!documentId) return res.status(400).json({ error: 'Invalid document id' })
  if (!req.userId) return res.status(401).json({ error: 'Unauthorized' })

  const comment = await prisma.comments.create({
    data: {
      document_id: documentId,
      user_id: req.userId,
      content: req.body.content,
      selection: req.body.selection ?? null,
    },
  })
  res.status(201).json(comment)
})


// GET /documents/:id/collaborators — list current collaborators (only owner can view)
router.get('/:id/collaborators', async (req: AuthedRequest, res) => {
  const documentId = getDocumentId(req)
  if (!documentId) return res.status(400).json({ error: 'Invalid document id' })

  const doc = await prisma.documents.findUnique({ where: { id: documentId } })
  if (doc?.owner_id !== req.userId) return res.status(403).json({ error: 'Forbidden' })

  const collaborators = await prisma.collaborators.findMany({
    where: { document_id: documentId },
    include: { users: { select: { id: true, name: true, email: true } } },
  })
  res.json(collaborators)
})

// GET /documents/users/search?email=... — look up a user by email, to invite them
router.get('/users/search', async (req: AuthedRequest, res) => {
  const email = req.query.email
  if (typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ error: 'Email query param required' })
  }

  const user = await prisma.users.findUnique({
    where: { email },
    select: { id: true, name: true, email: true },
  })
  if (!user) return res.status(404).json({ error: 'No user with that email' })
  res.json(user)
})

// PATCH /documents/:id/collaborators/:collaboratorId — change a collaborator's role
router.patch('/:id/collaborators/:collaboratorId', async (req: AuthedRequest, res) => {
  const documentId = getDocumentId(req)
  if (!documentId) return res.status(400).json({ error: 'Invalid document id' })

  const doc = await prisma.documents.findUnique({ where: { id: documentId } })
  if (doc?.owner_id !== req.userId) return res.status(403).json({ error: 'Forbidden' })

  const { collaboratorId } = req.params
  if (typeof collaboratorId !== 'string') {
    return res.status(400).json({ error: 'Invalid collaborator id' })
  }

  const updated = await prisma.collaborators.update({
    where: { id: collaboratorId },
    data: { role: req.body.role },
  })
  res.json(updated)
})

// DELETE /documents/:id/collaborators/:collaboratorId — remove a collaborator
router.delete('/:id/collaborators/:collaboratorId', async (req: AuthedRequest, res) => {
  const documentId = getDocumentId(req)
  if (!documentId) return res.status(400).json({ error: 'Invalid document id' })

  const doc = await prisma.documents.findUnique({ where: { id: documentId } })
  if (doc?.owner_id !== req.userId) return res.status(403).json({ error: 'Forbidden' })

  const { collaboratorId } = req.params
  if (typeof collaboratorId !== 'string') {
    return res.status(400).json({ error: 'Invalid collaborator id' })
  }

  await prisma.collaborators.delete({ where: { id: collaboratorId } })
  res.status(204).send()
})

export default router
