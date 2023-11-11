import { categories, insertCategorySchema } from '~/db/schema'

export default defineEventHandler(async event => {
  isUserLogged(event)

  const parsedBody = await useBody(event, insertCategorySchema)

  if (!parsedBody.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid body',
      data: parsedBody.error,
    })
  }

  const category = await event.context.drizzle
    .insert(categories)
    .values({
      name: parsedBody.data.name,
    })
    .returning()

  if (!category || category.length === 0) {
    throw createError({
      statusCode: 500,
      message: 'Impossible de créer la catégorie',
    })
  }

  return {
    success: true,
  }
})
