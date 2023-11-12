import { categories } from '~/db/schema'

export default defineRequestHandler(event => {
  return event.context.drizzle.select().from(categories)
})
