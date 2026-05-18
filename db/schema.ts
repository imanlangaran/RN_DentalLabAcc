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

export const doctorAssociations = sqliteTable('doctor_associations', {
  id: integer('id').primaryKey({ autoIncrement: true }).unique(),
  doctorId: integer('doctor_id').notNull().references(() => doctors.id),
  associatedDoctorId: integer('associated_doctor_id').notNull().references(() => doctors.id),
});

export type Doctor = typeof doctors.$inferSelect
export type DoctorAssociation = typeof doctorAssociations.$inferSelect