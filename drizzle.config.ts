import type { Config } from 'drizzle-kit'
import 'dotenv/config'

export default {
  schema: './db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || 'postgres://username:password@host:port/database',
  },
} satisfies Config
