import { categories } from '~/db/schema'

export default defineEventHandler(event => {
  return event.context.drizzle.select().from(categories)
})
