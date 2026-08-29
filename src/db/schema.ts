import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const notes = pgTable('notes', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  title: text('title'),
  content: text('content'),
  color: text('color').default('default'),
  isArchived: boolean('is_archived').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  notes: many(notes),
}));

export const notesRelations = relations(notes, ({ one }) => ({
  author: one(users, {
    fields: [notes.userId],
    references: [users.id],
  }),
}));
