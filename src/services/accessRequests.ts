import { prisma } from '../lib/prisma.js'

export async function approveAccessRequest(documentId: string, requestId: string) {
  return prisma.$transaction(async (transaction) => {
    const request = await transaction.access_requests.findUnique({
      where: { id: requestId },
    })

    if (
      !request ||
      request.document_id !== documentId ||
      !request.user_id
    ) {
      return null
    }

    const collaborator = await transaction.collaborators.upsert({
      where: {
        document_id_user_id: {
          document_id: documentId,
          user_id: request.user_id,
        },
      },
      update: { role: 'editor' },
      create: {
        document_id: documentId,
        user_id: request.user_id,
        role: 'editor',
      },
    })

    await transaction.access_requests.update({
      where: { id: requestId },
      data: { status: 'approved' },
    })

    return collaborator
  })
}
