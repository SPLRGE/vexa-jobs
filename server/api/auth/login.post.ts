/* eslint-disable import/no-named-as-default-member */
import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { eq } from 'drizzle-orm'
import { insertUserSchema, users } from '~/db/schema'

export default defineRequestHandler(async event => {
  const parsedBody = await useBody(
    event,
    insertUserSchema.pick({
      email: true,
      password: true,
    })
  )

  if (!parsedBody.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid body',
      data: parsedBody.error,
    })
  }

  const user = await event.context.drizzle
    .select({
      id: users.id,
      role: users.role,
      password: users.password,
    })
    .from(users)
    .where(eq(users.email, parsedBody.data.email))

  if (user.length === 0) {
    throw createError({
      statusCode: 401,
      message: 'Identifiants incorrects',
    })
  }

  const validate = await compare(parsedBody.data.password, user[0].password)

  if (!validate) {
    throw createError({
      statusCode: 401,
      message: 'Identifiants incorrects',
    })
  }

  const token = jwt.sign(
    {
      id: user[0].id,
      role: user[0].role,
    },
    useRuntimeConfig().jwtSecret,
    {
      expiresIn: '1d',
    }
  )

  return {
    token,
  }
})
