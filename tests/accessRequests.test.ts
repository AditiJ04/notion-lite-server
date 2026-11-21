import { beforeEach, describe, expect, it, vi } from 'vitest'

const database = vi.hoisted(() => {
  const transaction = {
    access_requests: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    collaborators: {
      upsert: vi.fn(),
    },
  }

  return {
    transaction,
    runTransaction: vi.fn(async (operation) => operation(transaction)),
  }
})

vi.mock('../src/lib/prisma.js', () => ({
  prisma: { $transaction: database.runTransaction },
}))

import { approveAccessRequest } from '../src/services/accessRequests.js'

describe('approveAccessRequest', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates access and marks the request approved in one transaction', async () => {
    const request = {
      id: 'request-1',
      document_id: 'document-1',
      user_id: 'user-1',
      status: 'pending',
    }
    const collaborator = {
      id: 'collaborator-1',
      document_id: request.document_id,
      user_id: request.user_id,
      role: 'editor',
    }
    database.transaction.access_requests.findUnique.mockResolvedValue(request)
    database.transaction.collaborators.upsert.mockResolvedValue(collaborator)

    const result = await approveAccessRequest(request.document_id, request.id)

    expect(result).toEqual(collaborator)
    expect(database.runTransaction).toHaveBeenCalledOnce()
    expect(database.transaction.collaborators.upsert).toHaveBeenCalledWith({
      where: {
        document_id_user_id: {
          document_id: request.document_id,
          user_id: request.user_id,
        },
      },
      update: { role: 'editor' },
      create: {
        document_id: request.document_id,
        user_id: request.user_id,
        role: 'editor',
      },
    })
    expect(database.transaction.access_requests.update).toHaveBeenCalledWith({
      where: { id: request.id },
      data: { status: 'approved' },
    })
  })

  it('does not write when the request belongs to another document', async () => {
    database.transaction.access_requests.findUnique.mockResolvedValue({
      id: 'request-1',
      document_id: 'another-document',
      user_id: 'user-1',
      status: 'pending',
    })

    const result = await approveAccessRequest('document-1', 'request-1')

    expect(result).toBeNull()
    expect(database.transaction.collaborators.upsert).not.toHaveBeenCalled()
    expect(database.transaction.access_requests.update).not.toHaveBeenCalled()
  })

  it('does not write when the request does not exist', async () => {
    database.transaction.access_requests.findUnique.mockResolvedValue(null)

    const result = await approveAccessRequest('document-1', 'missing-request')

    expect(result).toBeNull()
    expect(database.transaction.collaborators.upsert).not.toHaveBeenCalled()
    expect(database.transaction.access_requests.update).not.toHaveBeenCalled()
  })
})
