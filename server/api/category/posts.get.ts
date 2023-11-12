import { eq } from 'drizzle-orm'
import { categories, posts } from '~/db/schema'

export default defineRequestHandler(async event => {
  const postsFromDb = await event.context.drizzle
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

  const categoriesFromDb = await event.context.drizzle.select().from(categories)

  return categoriesFromDb.map(category => ({
    name: category.name,
    id: category.id,
    posts: postsFromDb.filter(post => post.category?.id === category.id),
  }))
})
