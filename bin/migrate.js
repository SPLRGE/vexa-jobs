#!/usr/bin/env node

import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import 'dotenv/config'

const connectionPool = postgres(process.env.DATABASE_URL || 'postgres://username:password@host:port/database')
const db = drizzle(connectionPool)
await migrate(db, {
  migrationsFolder: './drizzle',
})

console.log('Migration complete')
process.exit(0)
