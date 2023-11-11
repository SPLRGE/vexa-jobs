import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { insertPostSchema, posts, stringToNumber } from '~/db/schema'

export default defineEventHandler(async event => {
  if (!isUserAdmin(event)) {
    throw createError({
      statusCode: 403,
      message: 'Non autorisé',
    })
  }

  const parsedBody = await useBody(
    event,
    insertPostSchema
      .merge(
        z.object({
          id: z.string().uuid(),
          categoryId: z
            .number()
            .or(stringToNumber("L'id de la catégorie doit être un nombre"))
            .transform(value => Number(value)),
        })
      )
      .omit({
        createdBy: true,
        createdAt: true,
        clicks: true,
      })
  )

  if (!parsedBody.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid body',
      data: parsedBody.error,
    })
  }

  const post = await event.context.drizzle
    .update(posts)
    .set({
      title: parsedBody.data.title,
      description: parsedBody.data.description,
      link: parsedBody.data.link,
      isActive: parsedBody.data.isActive,
      categoryId: parsedBody.data.categoryId,
    })
    .where(eq(posts.id, parsedBody.data.id))
    .returning()
    .catch(err => {
      if (err.code === '23503') {
        // violates foreign key constraint
        throw createError({
          statusCode: 404,
          message: "La catégorie ou l'utilisateur n'existe(nt) pas",
        })
      }
      return []
    })

  if (post.length === 0) {
    throw createError({
      statusCode: 500,
      message: 'Impossible de mettre à jour le poste',
    })
  }

  return {
    success: true,
  }
})
