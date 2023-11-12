import { eq } from 'drizzle-orm'
import { users } from '~/db/schema'

export default defineRequestHandler(async event => {
  isUserLogged(event)

  const user = await event.context.drizzle
    .select({
      id: users.id,
      email: users.email,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, event.context.user.id))
    .limit(1)

  if (user.length === 0) {
    throw createError({
      statusCode: 404,
      message: 'User not found',
    })
  }

  return {
    user: user[0],
  }
})
