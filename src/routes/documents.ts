import { Router } from 'express'
import { prisma } from '../lib/prisma.js'
import  { requireAuth} from '../middleware/auth.js'
import type{ AuthedRequest } from '../middleware/auth.js'
import { getDocumentAccess } from '../services/documentAccess.js'

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
  if (!req.userId) return res.status(401).json({ error: 'Unauthorized' })

  const { document, role } = await getDocumentAccess(documentId, req.userId)
  if (!document) return res.status(404).json({ error: 'Not found' })
  if (!role) return res.status(403).json({ error: 'Forbidden' })

  res.json(document)
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

// POST /documents/:id/request-access — visitor requests to join
router.post('/:id/request-access', async (req: AuthedRequest, res) => {
  const documentId = getDocumentId(req)
  if (!documentId) return res.status(400).json({ error: 'Invalid document id' })
  if (!req.userId) return res.status(401).json({ error: 'Unauthorized' })

  const doc = await prisma.documents.findUnique({ where: { id: documentId } })
  if (!doc) return res.status(404).json({ error: 'Not found' })

  if (doc.owner_id === req.userId) {
    return res.status(400).json({ error: 'You already own this document' })
  }
  const existingCollab = await prisma.collaborators.findFirst({
    where: { document_id: documentId, user_id: req.userId },
  })
  if (existingCollab) {
    return res.status(400).json({ error: 'You already have access' })
  }

  const request = await prisma.access_requests.upsert({
    where: { document_id_user_id: { document_id: documentId, user_id: req.userId } },
    update: { status: 'pending' },
    create: { document_id: documentId, user_id: req.userId, status: 'pending' },
  })

  res.status(201).json(request)
})

// GET /documents/:id/access-requests — owner views pending requests
router.get('/:id/access-requests', async (req: AuthedRequest, res) => {
  const documentId = getDocumentId(req)
  if (!documentId) return res.status(400).json({ error: 'Invalid document id' })
  if (!req.userId) return res.status(401).json({ error: 'Unauthorized' })

  const doc = await prisma.documents.findUnique({ where: { id: documentId } })
  if (doc?.owner_id !== req.userId) return res.status(403).json({ error: 'Forbidden' })

  const requests = await prisma.access_requests.findMany({
    where: { document_id: documentId, status: 'pending' },
    include: { users: { select: { id: true, name: true, email: true } } },
  })

  res.json(requests)
})

// GET /documents/:id/my-request — the visitor checks their own request status
router.get('/:id/my-request', async (req: AuthedRequest, res) => {
  const documentId = getDocumentId(req)
  if (!documentId) return res.status(400).json({ error: 'Invalid document id' })
  if (!req.userId) return res.status(401).json({ error: 'Unauthorized' })

  const request = await prisma.access_requests.findUnique({
    where: { document_id_user_id: { document_id: documentId, user_id: req.userId } },
  })

  res.json(request ?? null)
})

// POST /documents/:id/access-requests/:requestId/approve
router.post('/:id/access-requests/:requestId/approve', async (req: AuthedRequest, res) => {
  const documentId = getDocumentId(req)
  if (!documentId) return res.status(400).json({ error: 'Invalid document id' })
  if (!req.userId) return res.status(401).json({ error: 'Unauthorized' })

  const doc = await prisma.documents.findUnique({ where: { id: documentId } })
  if (doc?.owner_id !== req.userId) return res.status(403).json({ error: 'Forbidden' })

  const { requestId } = req.params
  if (typeof requestId !== 'string') return res.status(400).json({ error: 'Invalid request id' })

  const request = await prisma.access_requests.findUnique({ where: { id: requestId } })
  if (!request || request.document_id !== documentId) {
    return res.status(404).json({ error: 'Not found' })
  }

  await prisma.access_requests.update({
    where: { id: requestId },
    data: { status: 'approved' },
  })

  const collaborator = await prisma.collaborators.create({
    data: { document_id: documentId, user_id: request.user_id, role: 'editor' },
  })

  res.json(collaborator)
})

// POST /documents/:id/access-requests/:requestId/deny
router.post('/:id/access-requests/:requestId/deny', async (req: AuthedRequest, res) => {
  const documentId = getDocumentId(req)
  if (!documentId) return res.status(400).json({ error: 'Invalid document id' })
  if (!req.userId) return res.status(401).json({ error: 'Unauthorized' })

  const doc = await prisma.documents.findUnique({ where: { id: documentId } })
  if (doc?.owner_id !== req.userId) return res.status(403).json({ error: 'Forbidden' })

  const { requestId } = req.params
  if (typeof requestId !== 'string') return res.status(400).json({ error: 'Invalid request id' })

  const request = await prisma.access_requests.findUnique({ where: { id: requestId } })
  if (!request || request.document_id !== documentId) {
    return res.status(404).json({ error: 'Not found' })
  }

  await prisma.access_requests.update({
    where: { id: requestId },
    data: { status: 'denied' },
  })

  res.json({ ok: true })
})


// DELETE /documents/:id/versions/:versionId
router.delete('/:id/versions/:versionId', async (req: AuthedRequest, res) => {
  const documentId = getDocumentId(req)
  if (!documentId) return res.status(400).json({ error: 'Invalid document id' })
  if (!req.userId) return res.status(401).json({ error: 'Unauthorized' })

  const doc = await prisma.documents.findUnique({ where: { id: documentId } })
  if (doc?.owner_id !== req.userId) return res.status(403).json({ error: 'Forbidden' })

  const { versionId } = req.params
  if (typeof versionId !== 'string') return res.status(400).json({ error: 'Invalid version id' })

  const version = await prisma.versions.findUnique({ where: { id: versionId } })
  if (!version || version.document_id !== documentId) {
    return res.status(404).json({ error: 'Not found' })
  }

  await prisma.versions.delete({ where: { id: versionId } })
  res.status(204).send()
})

// DELETE /documents/:id/comments/:commentId
router.delete('/:id/comments/:commentId', async (req: AuthedRequest, res) => {
  const documentId = getDocumentId(req)
  if (!documentId) return res.status(400).json({ error: 'Invalid document id' })
  if (!req.userId) return res.status(401).json({ error: 'Unauthorized' })

  const { commentId } = req.params
  if (typeof commentId !== 'string') return res.status(400).json({ error: 'Invalid comment id' })

  const comment = await prisma.comments.findUnique({ where: { id: commentId } })
  if (!comment || comment.document_id !== documentId) {
    return res.status(404).json({ error: 'Not found' })
  }

  // Allow deletion if: the requester wrote the comment, OR owns the document
  const doc = await prisma.documents.findUnique({ where: { id: documentId } })
  const isCommentAuthor = comment.user_id === req.userId
  const isDocOwner = doc?.owner_id === req.userId

  if (!isCommentAuthor && !isDocOwner) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  await prisma.comments.delete({ where: { id: commentId } })
  res.status(204).send()
})
export default router
