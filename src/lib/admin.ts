import { timingSafeEqual } from "node:crypto";

/** Constant-time check of the `?token=` against the ADMIN_TOKEN environment variable. */
export function isAdminToken(token: string | null | undefined): boolean {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected || !token) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const adminEnabled = () => Boolean(process.env.ADMIN_TOKEN);
