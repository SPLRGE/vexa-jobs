import { users } from '~/db/schema'

export default defineRequestHandler(event => {
  if (!isUserAdmin(event)) {
    throw createError({
      statusCode: 403,
      message: 'Non autorisé',
    })
  }

  return event.context.drizzle
    .select({
      id: users.id,
      email: users.email,
      role: users.role,
    })
    .from(users)
})
