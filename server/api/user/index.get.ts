import { eq } from 'drizzle-orm'
import useQuery from '~/server/utils/useQuery'
import { insertUserSchema, users } from '~/db/schema'

export default defineRequestHandler(async event => {
  const parsedQuery = useQuery(
    event,
    insertUserSchema.pick({
      id: true,
    })
  )

  if (!parsedQuery.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid query',
      data: parsedQuery.error,
    })
  }

  /* eslint-disable no-empty */
  if (isUserAdmin(event)) {
  } else if (!isUserItself(event, parsedQuery.data.id)) {
    throw createError({
      statusCode: 403,
      message: 'Non autorisé',
    })
  }

  const user = await event.context.drizzle
    .select({
      id: users.id,
      email: users.email,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, parsedQuery.data.id))

  if (user.length === 0) {
    throw createError({
      statusCode: 404,
      message: 'Utilisateur introuvable',
    })
  }

  return {
    user: user[0],
  }
})
