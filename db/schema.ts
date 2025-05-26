import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const doctors = sqliteTable('doctors', {
  id: integer('id').primaryKey({ autoIncrement: true }).unique(),
  name: text('name').notNull().default('doctor'),
  type: text('type', { enum: ['doctor', 'clinic'] }).notNull().default('doctor'),
  address: text('address').notNull().default(''),
  phone: text('phone', { length: 11 }).notNull().default(''),
  phone2: text('phone2', { length: 11 }).notNull().default(''),
  colabStartDate: text('colabStartDate').$type<{ colabStartDate: Date; }>().notNull().default(sql`(CURRENT_DATE)`),
  isActive: integer('isActive', { mode: 'boolean' }).notNull().default(true)
});

export type Doctor = typeof doctors.$inferSelect