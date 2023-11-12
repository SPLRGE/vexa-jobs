import { z } from 'zod'
import { hash } from 'bcrypt'
import { eq } from 'drizzle-orm'
import { insertUserSchema, users } from '~/db/schema'

export default defineRequestHandler(async event => {
  const parsedBody = await useBody(
    event,
    insertUserSchema.merge(
      z.object({
        id: z.number(),
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

  /* eslint-disable no-empty */
  if (isUserAdmin(event)) {
  } else if (isUserItself(event, parsedBody.data.id)) {
    throw createError({
      statusCode: 403,
      message: 'Non autorisé',
    })
  }

  if (!isUserAdmin(event) && parsedBody.data.role !== 'USER') {
    throw createError({
      statusCode: 403,
      message: 'Non autorisé',
    })
  }

  const hashed = await hash(parsedBody.data.password, useRuntimeConfig().saltRounds)

  const user = await event.context.drizzle
    .update(users)
    .set({
      email: parsedBody.data.email,
      password: hashed,
      role: parsedBody.data.role,
    })
    .where(eq(users.id, parsedBody.data.id))
    .returning()
    .catch(err => {
      if (err.code === '23505') {
        throw createError({
          statusCode: 400,
          message: "Ce courriel est déjà utilisé par quelqu'un d'autre",
        })
      }
      return []
    })

  if (user.length === 0) {
    throw createError({
      statusCode: 500,
      message: "Impossible de mettre à jour l'utilisateur",
    })
  }

  return {
    success: true,
  }
})
