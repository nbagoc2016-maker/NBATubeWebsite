// import { pool } from "./index";

// let ready: Promise<void> | null = null;

// /**
//  * Safety net: guarantees the `inquiries` table exists even on a fresh database
//  * where `drizzle-kit push` has not been run yet. Mirrors `src/db/schema.ts`.
//  */
// export function ensureInquiriesTable(): Promise<void> {
//   if (!ready) {
//     ready = pool
//       .query(
//         `CREATE TABLE IF NOT EXISTS inquiries (
//           id serial PRIMARY KEY,
//           reference varchar(32) NOT NULL UNIQUE,
//           idempotency_key varchar(64) NOT NULL UNIQUE,
//           full_name varchar(120) NOT NULL,
//           company_name varchar(160) NOT NULL,
//           phone varchar(40) NOT NULL,
//           whatsapp varchar(40),
//           email varchar(200) NOT NULL,
//           product_type varchar(20) NOT NULL,
//           quantity varchar(40) NOT NULL,
//           tube_diameter varchar(80),
//           tube_size varchar(80),
//           message text,
//           artwork_name varchar(255),
//           artwork_type varchar(100),
//           artwork_size integer,
//           artwork_data bytea,
//           source_page varchar(200),
//           email_status varchar(20) NOT NULL DEFAULT 'pending',
//           email_error text,
//           ip_address varchar(64),
//           created_at timestamptz NOT NULL DEFAULT now()
//         )`,
//       )
//       .then(() => undefined)
//       .catch((error) => {
//         ready = null;
//         throw error;
//       });
//   }
//   return ready;
// }
