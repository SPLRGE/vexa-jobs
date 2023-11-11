import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { posts } from '~/db/schema'

export default defineEventHandler(async event => {
  if (!isUserAdmin(event)) {
    throw createError({
      statusCode: 403,
      message: 'Non autorisé',
    })
  }

  const parsedBody = await useBody(
    event,
    z.object({
      id: z.string().uuid(),
    })
  )

  if (!parsedBody.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid body',
      data: parsedBody.error,
    })
  }

  const post = await event.context.drizzle.delete(posts).where(eq(posts.id, parsedBody.data.id)).returning()

  if (post.length === 0) {
    throw createError({
      statusCode: 500,
      message: 'Impossible de supprimer le poste',
    })
  }

  return {
    success: true,
  }
})
