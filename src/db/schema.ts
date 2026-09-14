import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/**
 * Newsletter subscribers — the only persistent entity this marketing site
 * needs. Emails are stored lower-cased and unique; the API layer treats a
 * duplicate insert as success ("already subscribed") so the form never leaks
 * whether an address is registered.
 */
export const subscribers = sqliteTable("subscribers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type Subscriber = typeof subscribers.$inferSelect;
export type NewSubscriber = typeof subscribers.$inferInsert;
