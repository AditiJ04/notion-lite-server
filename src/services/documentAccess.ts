import { prisma } from '../lib/prisma.js'

export type DocumentRole = 'owner' | 'editor' | 'viewer'

export async function getDocumentAccess(documentId: string, userId: string) {
  const document = await prisma.documents.findUnique({
    where: { id: documentId },
  })

  if (!document) {
    return { document: null, role: null }
  }

  if (document.owner_id === userId) {
    return { document, role: 'owner' as const }
  }

  const collaborator = await prisma.collaborators.findUnique({
    where: {
      document_id_user_id: {
        document_id: documentId,
        user_id: userId,
      },
    },
  })

  const role = collaborator?.role
  if (role !== 'editor' && role !== 'viewer') {
    return { document, role: null }
  }

  return { document, role }
}
