import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { categories } from '~/db/schema'

export default defineRequestHandler(async event => {
  if (!isUserAdmin(event)) {
    throw createError({
      statusCode: 403,
      message: 'Non autorisé',
    })
  }

  const parsedBody = await useBody(
    event,
    z.object({
      id: z.number(),
    })
  )

  if (!parsedBody.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid body',
      data: parsedBody.error,
    })
  }

  const category = await event.context.drizzle
    .delete(categories)
    .where(eq(categories.id, parsedBody.data.id))
    .returning()

  if (!category || category.length === 0) {
    throw createError({
      statusCode: 500,
      message: 'Impossible de supprimer la catégorie',
    })
  }

  return {
    success: true,
  }
})
