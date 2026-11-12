import nodemailer from "nodemailer";
import { siteConfig } from "@/data/site";
import type { QuoteInput } from "@/lib/validation";

/**
 * Secure server-side e-mail delivery for quote requests.
 * Credentials are read from environment variables only — never exposed to the browser.
 *
 *   SMTP_HOST, SMTP_PORT (587 STARTTLS or 465 SSL), SMTP_USER, SMTP_PASS,
 *   SMTP_FROM (optional), QUOTE_TO_EMAIL (the NBA business inbox)
 */

export interface MailConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
}

export function getMailConfig(): MailConfig | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.QUOTE_TO_EMAIL;
  if (!host || !user || !pass || !to) return null;

  const port = Number.parseInt(process.env.SMTP_PORT ?? "587", 10) || 587;
  return {
    host,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    user,
    pass,
    from: process.env.SMTP_FROM || user,
    to,
  };
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[char];
  });

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

interface SendArgs {
  reference: string;
  data: QuoteInput;
  sourcePage: string;
  artwork?: { filename: string; contentType: string; content: Buffer };
}

export async function sendInquiryEmail({ reference, data, sourcePage, artwork }: SendArgs) {
  const config = getMailConfig();
  if (!config) throw new Error("SMTP is not configured");

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  const rows: Array<[string, string]> = [
    ["Reference", reference],
    ["Full name", data.fullName],
    ["Company", data.companyName],
    ["Phone", data.phone],
    ["WhatsApp", data.whatsapp],
    ["Email", data.email],
    ["Product type", `${data.productType} tubes`],
    ["Required quantity", data.quantity],
    ["Tube diameter", data.tubeDiameter],
    ["Tube size", data.tubeSize],
    ["Submitted from", sourcePage],
    ["Artwork attached", artwork ? artwork.filename : ""],
  ];

  const textBody = [
    `New quote request ${reference}`,
    "",
    ...rows.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    data.message || "(none)",
  ].join("\n");

  const htmlRows = rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:9px 14px;color:#6b7280;font-size:13px;width:170px;vertical-align:top;border-bottom:1px solid #eef0f2">${escapeHtml(label)}</td><td style="padding:9px 14px;font-size:14px;color:#101d2c;border-bottom:1px solid #eef0f2">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const html = `<!doctype html><html><body style="margin:0;background:#f5f6f7;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:640px;margin:24px auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb">
    <div style="background:#101d2c;padding:22px 26px">
      <div style="color:#c69b63;font-size:12px;letter-spacing:.2em;font-weight:700">${escapeHtml(siteConfig.name)} · NEW QUOTE REQUEST</div>
      <div style="color:#ffffff;font-size:20px;font-weight:700;margin-top:6px">${escapeHtml(data.companyName)} — ${escapeHtml(data.productType)} tubes</div>
    </div>
    <table style="width:100%;border-collapse:collapse">${htmlRows}</table>
    <div style="padding:18px 26px">
      <div style="color:#6b7280;font-size:13px;margin-bottom:6px">Message</div>
      <div style="white-space:pre-wrap;font-size:14px;color:#101d2c;line-height:1.55">${escapeHtml(data.message || "(none)")}</div>
    </div>
    <div style="padding:14px 26px;background:#f5f6f7;color:#6b7280;font-size:12px">Reply directly to this email to respond to the customer.</div>
  </div></body></html>`;

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo: data.email,
    subject: oneLine(`New quote request ${reference} — ${data.productType} tubes — ${data.companyName}`),
    text: textBody,
    html,
    attachments: artwork
      ? [
          {
            filename: oneLine(artwork.filename).replace(/[\\/]/g, "_"),
            contentType: artwork.contentType,
            content: artwork.content,
          },
        ]
      : [],
  });
}
