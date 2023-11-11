/* eslint-disable import/no-named-as-default-member */
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import useToken from '~/server/utils/useToken'
import { users } from '~/db/schema'

export default defineEventHandler(async event => {
  const token = useToken(event)

  if (!token) return

  let decoded
  try {
    decoded = jwt.verify(token, useRuntimeConfig().jwtSecret)
  } catch (err) {
    return
  }

  if (!decoded) return

  // verify decoded data with zod
  const parsedData = z
    .object({
      id: z.number(),
      role: z.enum(['ADMIN', 'USER']),
      exp: z.number(),
    })
    .safeParse(decoded)

  if (!parsedData.success) return

  const userRole = await event.context.drizzle
    .select({
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, parsedData.data.id))

  if (
    !userRole ||
    userRole.length !== 1 ||
    userRole[0].role !== parsedData.data.role ||
    parsedData.data.exp < new Date().getTime() / 1000
  )
    throw createError({
      statusCode: 401,
      message: 'Invalid token, try to reconnect',
      data: {
        isTokenValid: false,
      },
    })

  event.context.user = {
    id: parsedData.data.id,
    role: userRole[0].role,
  }
})
