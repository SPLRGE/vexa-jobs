import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'

export default defineEventHandler(event => {
  // create drizzle instance if it doesn't exist
  if (!event.context.drizzle) {
    const db = postgres(process.env.DATABASE_URL || '')
    event.context.drizzle = drizzle(db)
  }
})
