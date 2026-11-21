import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Response } from 'express'
import type { AuthedRequest } from '../src/middleware/auth.js'

const access = vi.hoisted(() => ({
  getDocumentAccess: vi.fn(),
}))

vi.mock('../src/services/documentAccess.js', () => ({
  getDocumentAccess: access.getDocumentAccess,
}))

import { requireDocumentAccess } from '../src/middleware/documentAccess.js'

function createResponse() {
  const response = {
    locals: {},
    status: vi.fn(),
    json: vi.fn(),
  }
  response.status.mockReturnValue(response)
  response.json.mockReturnValue(response)
  return response
}

describe('requireDocumentAccess', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 400 when the document id is missing', async () => {
    const req = { params: {}, userId: 'user-1' } as AuthedRequest
    const res = createResponse()
    const next = vi.fn()

    await requireDocumentAccess(req, res as unknown as Response, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(next).not.toHaveBeenCalled()
  })

  it('returns 401 when the user is not authenticated', async () => {
    const req = { params: { id: 'document-1' } } as unknown as AuthedRequest
    const res = createResponse()
    const next = vi.fn()

    await requireDocumentAccess(req, res as unknown as Response, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(access.getDocumentAccess).not.toHaveBeenCalled()
    expect(next).not.toHaveBeenCalled()
  })

  it('returns 404 when the document does not exist', async () => {
    access.getDocumentAccess.mockResolvedValue({ document: null, role: null })
    const req = {
      params: { id: 'document-1' },
      userId: 'user-1',
    } as unknown as AuthedRequest
    const res = createResponse()
    const next = vi.fn()

    await requireDocumentAccess(req, res as unknown as Response, next)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(next).not.toHaveBeenCalled()
  })

  it('returns 403 when the user cannot access the document', async () => {
    access.getDocumentAccess.mockResolvedValue({
      document: { id: 'document-1' },
      role: null,
    })
    const req = {
      params: { id: 'document-1' },
      userId: 'unrelated-user',
    } as unknown as AuthedRequest
    const res = createResponse()
    const next = vi.fn()

    await requireDocumentAccess(req, res as unknown as Response, next)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(next).not.toHaveBeenCalled()
  })

  it.each(['owner', 'editor', 'viewer'] as const)(
    'allows a user with the %s role',
    async (role) => {
      const document = { id: 'document-1' }
      access.getDocumentAccess.mockResolvedValue({ document, role })
      const req = {
        params: { id: document.id },
        userId: 'allowed-user',
      } as unknown as AuthedRequest
      const res = createResponse()
      const next = vi.fn()

      await requireDocumentAccess(req, res as unknown as Response, next)

      expect(res.locals).toEqual({ document, documentRole: role })
      expect(next).toHaveBeenCalledOnce()
      expect(res.status).not.toHaveBeenCalled()
    },
  )
})
