import { z } from 'zod'
import isUserLogged from '~/server/utils/isUserLogged'
import useBody from '~/server/utils/useBody'
import { insertPostSchema, posts, stringToNumber } from '~/db/schema'

export default defineEventHandler(async event => {
  isUserLogged(event)

  const parsedBody = await useBody(
    event,
    insertPostSchema
      .omit({
        id: true,
        createdBy: true,
        createdAt: true,
        clicks: true,
      })
      .merge(
        z.object({
          categoryId: z
            .number()
            .or(stringToNumber("L'id de la catégorie doit être un nombre"))
            .transform(value => Number(value)),
        })
      )
  )

  if (!parsedBody.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid body',
      data: parsedBody.error,
    })
  }

  const post = await event.context.drizzle
    .insert(posts)
    .values({
      title: parsedBody.data.title,
      description: parsedBody.data.description,
      link: parsedBody.data.link,
      isActive: parsedBody.data.isActive,
      categoryId: parsedBody.data.categoryId,
      createdBy: event.context.user.id,
    })
    .catch(err => {
      /* eslint-disable-next-line eqeqeq */
      if (err.code == 23503) {
        // violates foreign key constraint
        throw createError({
          statusCode: 404,
          message: "La catégorie ou l'utilisateur n'existe(nt) pas",
        })
      }
      return null
    })

  if (!post) {
    throw createError({
      statusCode: 500,
      message: 'Impossible de créer le poste',
    })
  }

  return {
    success: true,
  }
})
