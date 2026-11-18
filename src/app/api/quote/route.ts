import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { fieldErrors, quoteSchema, validateArtwork } from "@/lib/validation";
import { getMailConfig, sendInquiryEmail } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Very small in-memory rate limiter (per server instance) to deter abuse. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 10;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_REQUESTS;
}

function makeReference() {
  const d = new Date();
  const stamp = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(5);
  const code = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
  return `NBA-${stamp}-${code}`;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please wait a few minutes or contact us on WhatsApp." },
      { status: 429 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid form submission." }, { status: 400 });
  }

  const str = (key: string) => {
    const value = form.get(key);
    return typeof value === "string" ? value : "";
  };

  // Honeypot: real visitors never fill this hidden field. Pretend success to bots.
  if (str("website").trim() !== "") {
    return NextResponse.json({ ok: true, reference: "NBA-RECEIVED" });
  }

  const parsed = quoteSchema.safeParse({
    fullName: str("fullName"),
    companyName: str("companyName"),
    phone: str("phone"),
    whatsapp: str("whatsapp"),
    email: str("email"),
    productType: str("productType"),
    quantity: str("quantity"),
    tubeDiameter: str("tubeDiameter"),
    tubeSize: str("tubeSize"),
    message: str("message"),
    idempotencyKey: str("idempotencyKey"),
  });

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please correct the highlighted fields.", errors: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }
  const data = parsed.data;

  /* Optional artwork / reference upload */
  let artwork: { filename: string; contentType: string; content: Buffer } | undefined;
  const file = form.get("artwork");
  if (file instanceof File && file.size > 0) {
    const problem = validateArtwork(file);
    if (problem) {
      return NextResponse.json(
        { ok: false, message: problem, errors: { artwork: problem } },
        { status: 400 },
      );
    }
    artwork = {
      filename: file.name.slice(0, 200) || "artwork",
      contentType: file.type,
      content: Buffer.from(await file.arrayBuffer()),
    };
  }

  const sourcePage = str("sourcePage").slice(0, 200) || "/quote";
  const reference = makeReference();

  if (!getMailConfig()) {
    console.error(`[quote] SMTP is not configured. Unable to send inquiry ${reference}.`);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Email service is currently not configured. Please contact us directly via WhatsApp or phone.",
      },
      { status: 500 },
    );
  }

  try {
    await sendInquiryEmail({ reference, data, sourcePage, artwork });
    return NextResponse.json({ ok: true, reference, emailed: true });
  } catch (error) {
    const emailError = error instanceof Error ? error.message : String(error);
    console.error(`[quote] e-mail delivery failed for ${reference}:`, emailError);
    return NextResponse.json(
      {
        ok: false,
        message:
          "We couldn't deliver your inquiry right now. Please try again or contact us directly on WhatsApp.",
      },
      { status: 500 },
    );
  }
}
