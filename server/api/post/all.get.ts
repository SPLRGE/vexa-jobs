import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { categories, posts, users } from '~/db/schema'

export default defineEventHandler(event => {
  const parsedQuery = useQuery(
    event,
    z.object({
      adminMode: z
        .boolean()
        .optional()
        .or(
          z.string().refine(value => value === 'true', {
            message: 'Invalid admin mode',
          })
        )
        .optional(),
    })
  )

  if (!parsedQuery.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid query',
      data: parsedQuery.error,
    })
  }

  if (parsedQuery.data.adminMode) {
    if (!isUserAdmin(event)) {
      throw createError({
        statusCode: 403,
        message: 'Non autorisé',
      })
    }

    return event.context.drizzle
      .select({
        id: posts.id,
        title: posts.title,
        description: posts.description,
        link: posts.link,
        clicks: posts.clicks,
        isActive: posts.isActive,
        createdAt: posts.createdAt,
        createdBy: {
          id: users.id,
          email: users.email,
          role: users.role,
        },
        category: {
          id: categories.id,
          name: categories.name,
        },
      })
      .from(posts)
      .leftJoin(categories, eq(posts.categoryId, categories.id))
      .leftJoin(users, eq(posts.createdBy, users.id))
  }

  return event.context.drizzle
    .select({
      id: posts.id,
      title: posts.title,
      description: posts.description,
      link: posts.link,
      category: {
        id: categories.id,
        name: categories.name,
      },
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(eq(posts.isActive, true))
})
