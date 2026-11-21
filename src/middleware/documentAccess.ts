import type { NextFunction, Response } from 'express'
import type { AuthedRequest } from './auth.js'
import { getDocumentAccess } from '../services/documentAccess.js'

export async function requireDocumentAccess(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid document id' })
  }

  if (!req.userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { document, role } = await getDocumentAccess(id, req.userId)
  if (!document) return res.status(404).json({ error: 'Not found' })
  if (!role) return res.status(403).json({ error: 'Forbidden' })

  res.locals.document = document
  res.locals.documentRole = role
  next()
}
