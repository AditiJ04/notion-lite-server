import type { Request, Response, NextFunction } from 'express'
import { supabaseAdmin } from '../lib/supabase.js'

export interface AuthedRequest extends Request {
  userId?: string
}

export async function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ error: 'Missing token' })

  const { data, error } = await supabaseAdmin.auth.getUser(token)
  if (error || !data.user) return res.status(401).json({ error: 'Invalid token' })

  req.userId = data.user.id
  next()
}