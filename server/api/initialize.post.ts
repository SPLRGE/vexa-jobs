import { hash } from 'bcrypt'
import { insertUserSchema, users } from '~/db/schema'
import useBody from '~/server/utils/useBody'

export default defineRequestHandler(async event => {
  const parsedBody = await useBody(
    event,
    insertUserSchema.omit({
      id: true,
      role: true,
    })
  )
  if (!parsedBody.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid body',
      data: parsedBody.error,
    })
  }

  // if it's the initial user
  const result = await event.context.drizzle
    .select({
      id: users.id,
    })
    .from(users)

  if (result.length !== 0) {
    throw createError({
      statusCode: 400,
      message: "Impossible de créer l'utilisateur",
    })
  }

  const hashed = await hash(parsedBody.data.password, useRuntimeConfig().saltRounds)

  const user = await event.context.drizzle
    .insert(users)
    .values({
      email: parsedBody.data.email,
      password: hashed,
      role: 'ADMIN',
    })
    .returning()

  if (user.length === 0) {
    throw createError({
      statusCode: 500,
      message: "Impossible de créer l'utilisateur",
    })
  }

  return {
    success: true,
  }
})
