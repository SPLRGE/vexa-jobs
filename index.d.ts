import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import type { Sql as PostgresSql } from 'postgres'

declare module 'h3' {
  interface H3EventContext {
    drizzle: PostgresJsDatabase
    client: PostgresSql
    user: {
      id: number
      role: 'ADMIN' | 'USER'
    }
  }
}

export {}
