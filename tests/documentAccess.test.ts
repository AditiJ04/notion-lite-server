import { beforeEach, describe, expect, it, vi } from 'vitest'

const database = vi.hoisted(() => ({
  findDocument: vi.fn(),
  findCollaborator: vi.fn(),
}))

vi.mock('../src/lib/prisma.js', () => ({
  prisma: {
    documents: { findUnique: database.findDocument },
    collaborators: { findUnique: database.findCollaborator },
  },
}))

import { getDocumentAccess } from '../src/services/documentAccess.js'

const document = {
  id: 'document-1',
  title: 'Private plan',
  owner_id: 'owner-1',
  created_at: new Date(),
  updated_at: new Date(),
}

describe('getDocumentAccess', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns no access when the document does not exist', async () => {
    database.findDocument.mockResolvedValue(null)

    const result = await getDocumentAccess('missing-document', 'user-1')

    expect(result).toEqual({ document: null, role: null })
    expect(database.findCollaborator).not.toHaveBeenCalled()
  })

  it('grants owner access without querying collaborators', async () => {
    database.findDocument.mockResolvedValue(document)

    const result = await getDocumentAccess(document.id, document.owner_id)

    expect(result).toEqual({ document, role: 'owner' })
    expect(database.findCollaborator).not.toHaveBeenCalled()
  })

  it.each(['editor', 'viewer'] as const)(
    'grants %s access to a valid collaborator',
    async (role) => {
      database.findDocument.mockResolvedValue(document)
      database.findCollaborator.mockResolvedValue({ role })

      const result = await getDocumentAccess(document.id, 'collaborator-1')

      expect(result).toEqual({ document, role })
      expect(database.findCollaborator).toHaveBeenCalledWith({
        where: {
          document_id_user_id: {
            document_id: document.id,
            user_id: 'collaborator-1',
          },
        },
      })
    },
  )

  it('denies an unrelated authenticated user', async () => {
    database.findDocument.mockResolvedValue(document)
    database.findCollaborator.mockResolvedValue(null)

    const result = await getDocumentAccess(document.id, 'unrelated-user')

    expect(result).toEqual({ document, role: null })
  })

  it('denies an unknown collaborator role', async () => {
    database.findDocument.mockResolvedValue(document)
    database.findCollaborator.mockResolvedValue({ role: 'admin' })

    const result = await getDocumentAccess(document.id, 'collaborator-1')

    expect(result).toEqual({ document, role: null })
  })
})
