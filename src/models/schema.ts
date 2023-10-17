import { relations, sql } from 'drizzle-orm';
import { bigint, datetime, index, json, mysqlTable, serial, text, uniqueIndex, varchar } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  fullName: varchar('full_name', { length: 256 }),
}, (users) => ({
  nameIdx: index('name_idx').on(users.fullName),
}));

export const candidates = mysqlTable('candidates', {
  id: serial('id').primaryKey(),
  fullName: varchar('full_name', { length: 256 }).notNull(),
  info: json('info').$type<{ info: string[] }>().notNull(),
  photo: text('photo').notNull(),
  social: text('social').notNull(),
  company_name: text('company_name').notNull()
  // created_at: datetime('created_at', { mode: 'date' }).default(sql`CURRENT_TIMESTAMP`),
}, (candidates) => ({
  candidatesIndex: uniqueIndex('candidates_idx').on(candidates.id),
}));

export const companies = mysqlTable('companies', {
  id: serial('id').primaryKey(),
  company_name: text('company_name').notNull().unique()
}, (companies) => ({
  companiesIndex: uniqueIndex('companies_idx').on(candidates.company_name),
}));

export const candidatesCompanyRelations = relations(candidates, ({ one }) => ({
  companies: one(companies, {
    fields: [candidates.id],
    references: [companies.company_name]
  })
}));