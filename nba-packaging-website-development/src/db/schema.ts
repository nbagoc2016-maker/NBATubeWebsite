import {
  customType,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

const bytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType() {
    return "bytea";
  },
});

/**
 * Quote / inquiry submissions from the website.
 * Every inquiry is stored here first, then emailed to the NBA business inbox.
 * (`src/db/ensure.ts` mirrors this definition as a safety net on fresh databases.)
 */
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 32 }).notNull().unique(),
  idempotencyKey: varchar("idempotency_key", { length: 64 }).notNull().unique(),
  fullName: varchar("full_name", { length: 120 }).notNull(),
  companyName: varchar("company_name", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 40 }),
  email: varchar("email", { length: 200 }).notNull(),
  productType: varchar("product_type", { length: 20 }).notNull(),
  quantity: varchar("quantity", { length: 40 }).notNull(),
  tubeDiameter: varchar("tube_diameter", { length: 80 }),
  tubeSize: varchar("tube_size", { length: 80 }),
  message: text("message"),
  artworkName: varchar("artwork_name", { length: 255 }),
  artworkType: varchar("artwork_type", { length: 100 }),
  artworkSize: integer("artwork_size"),
  artworkData: bytea("artwork_data"),
  sourcePage: varchar("source_page", { length: 200 }),
  emailStatus: varchar("email_status", { length: 20 }).notNull().default("pending"),
  emailError: text("email_error"),
  ipAddress: varchar("ip_address", { length: 64 }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type NewInquiry = typeof inquiries.$inferInsert;
