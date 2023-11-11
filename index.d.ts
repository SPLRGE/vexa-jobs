import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

declare module 'h3' {
  interface H3EventContext {
    drizzle: PostgresJsDatabase
    user: {
      id: number
      role: 'ADMIN' | 'USER'
    }
  }
}

export {}
