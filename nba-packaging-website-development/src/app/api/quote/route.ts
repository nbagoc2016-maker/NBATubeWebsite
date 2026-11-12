// import { NextResponse } from "next/server";
// import { randomBytes } from "node:crypto";
// import { eq } from "drizzle-orm";
// import { db } from "@/db";
// import { inquiries } from "@/db/schema";
// import { ensureInquiriesTable } from "@/db/ensure";
// import { fieldErrors, quoteSchema, validateArtwork } from "@/lib/validation";
// import { getMailConfig, sendInquiryEmail } from "@/lib/mailer";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// /* Very small in-memory rate limiter (per server instance) to deter abuse. */
// const WINDOW_MS = 10 * 60 * 1000;
// const MAX_REQUESTS = 10;
// const hits = new Map<string, number[]>();

// function isRateLimited(ip: string) {
//   const now = Date.now();
//   const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
//   recent.push(now);
//   hits.set(ip, recent);
//   if (hits.size > 5000) hits.clear();
//   return recent.length > MAX_REQUESTS;
// }

// function makeReference() {
//   const d = new Date();
//   const stamp = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
//   const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
//   const bytes = randomBytes(5);
//   const code = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
//   return `NBA-${stamp}-${code}`;
// }

// function isUniqueViolation(error: unknown) {
//   const e = error as { code?: string; cause?: { code?: string } };
//   return e?.code === "23505" || e?.cause?.code === "23505";
// }

// export async function POST(request: Request) {
//   const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
//   if (isRateLimited(ip)) {
//     return NextResponse.json(
//       { ok: false, message: "Too many requests. Please wait a few minutes or contact us on WhatsApp." },
//       { status: 429 },
//     );
//   }

//   let form: FormData;
//   try {
//     form = await request.formData();
//   } catch {
//     return NextResponse.json({ ok: false, message: "Invalid form submission." }, { status: 400 });
//   }

//   const str = (key: string) => {
//     const value = form.get(key);
//     return typeof value === "string" ? value : "";
//   };

//   // Honeypot: real visitors never fill this hidden field. Pretend success to bots.
//   if (str("website").trim() !== "") {
//     return NextResponse.json({ ok: true, reference: "NBA-RECEIVED" });
//   }

//   const parsed = quoteSchema.safeParse({
//     fullName: str("fullName"),
//     companyName: str("companyName"),
//     phone: str("phone"),
//     whatsapp: str("whatsapp"),
//     email: str("email"),
//     productType: str("productType"),
//     quantity: str("quantity"),
//     tubeDiameter: str("tubeDiameter"),
//     tubeSize: str("tubeSize"),
//     message: str("message"),
//     idempotencyKey: str("idempotencyKey"),
//   });

//   if (!parsed.success) {
//     return NextResponse.json(
//       { ok: false, message: "Please correct the highlighted fields.", errors: fieldErrors(parsed.error) },
//       { status: 400 },
//     );
//   }
//   const data = parsed.data;

//   /* Optional artwork / reference upload */
//   let artwork: { filename: string; contentType: string; content: Buffer } | undefined;
//   const file = form.get("artwork");
//   if (file instanceof File && file.size > 0) {
//     const problem = validateArtwork(file);
//     if (problem) {
//       return NextResponse.json(
//         { ok: false, message: problem, errors: { artwork: problem } },
//         { status: 400 },
//       );
//     }
//     artwork = {
//       filename: file.name.slice(0, 200) || "artwork",
//       contentType: file.type,
//       content: Buffer.from(await file.arrayBuffer()),
//     };
//   }

//   const sourcePage = str("sourcePage").slice(0, 200) || "/quote";

//   try {
//     await ensureInquiriesTable();

//     // Duplicate-submission protection: same key => return the original reference.
//     const existing = await db
//       .select({ reference: inquiries.reference })
//       .from(inquiries)
//       .where(eq(inquiries.idempotencyKey, data.idempotencyKey))
//       .limit(1);
//     if (existing[0]) {
//       return NextResponse.json({ ok: true, reference: existing[0].reference, duplicate: true });
//     }

//     const reference = makeReference();
//     try {
//       await db.insert(inquiries).values({
//         reference,
//         idempotencyKey: data.idempotencyKey,
//         fullName: data.fullName,
//         companyName: data.companyName,
//         phone: data.phone,
//         whatsapp: data.whatsapp || null,
//         email: data.email,
//         productType: data.productType,
//         quantity: data.quantity,
//         tubeDiameter: data.tubeDiameter || null,
//         tubeSize: data.tubeSize || null,
//         message: data.message || null,
//         artworkName: artwork?.filename ?? null,
//         artworkType: artwork?.contentType ?? null,
//         artworkSize: artwork?.content.length ?? null,
//         artworkData: artwork?.content ?? null,
//         sourcePage,
//         ipAddress: ip.slice(0, 64),
//       });
//     } catch (error) {
//       if (isUniqueViolation(error)) {
//         const again = await db
//           .select({ reference: inquiries.reference })
//           .from(inquiries)
//           .where(eq(inquiries.idempotencyKey, data.idempotencyKey))
//           .limit(1);
//         if (again[0]) {
//           return NextResponse.json({ ok: true, reference: again[0].reference, duplicate: true });
//         }
//       }
//       throw error;
//     }

//     /* E-mail the NBA business inbox. The inquiry is already safely stored. */
//     let emailStatus: "sent" | "failed" | "not_configured" = "not_configured";
//     let emailError: string | null = null;
//     if (getMailConfig()) {
//       try {
//         await sendInquiryEmail({ reference, data, sourcePage, artwork });
//         emailStatus = "sent";
//       } catch (error) {
//         emailStatus = "failed";
//         emailError = (error instanceof Error ? error.message : String(error)).slice(0, 500);
//         console.error(`[quote] e-mail delivery failed for ${reference}:`, emailError);
//       }
//     } else {
//       console.warn(`[quote] SMTP not configured — inquiry ${reference} stored in database only.`);
//     }

//     await db
//       .update(inquiries)
//       .set({ emailStatus, emailError })
//       .where(eq(inquiries.reference, reference));

//     return NextResponse.json({ ok: true, reference, emailed: emailStatus === "sent" });
//   } catch (error) {
//     console.error("[quote] failed to save inquiry:", error);
//     return NextResponse.json(
//       {
//         ok: false,
//         message:
//           "We couldn't submit your inquiry right now. Please try again, or contact us directly on WhatsApp.",
//       },
//       { status: 500 },
//     );
//   }
// }
