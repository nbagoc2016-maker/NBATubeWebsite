import { z } from "zod";

/** Shared by the browser form (instant feedback) and the API route (authoritative check). */

export const productTypes = ["PE", "Laminated", "Aluminum"] as const;

export const ARTWORK_MAX_BYTES = 5 * 1024 * 1024; // 5 MB
export const ARTWORK_ACCEPT = "image/jpeg,image/png,image/webp,application/pdf";
const ARTWORK_TYPES = ARTWORK_ACCEPT.split(",");

const phonePattern = /^\+?[0-9][0-9\s\-().]{6,19}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const text = (max: number) =>
  z.string().trim().max(max, `Please keep this under ${max} characters.`);

export const quoteSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "Please keep this under 100 characters."),
  companyName: z
    .string()
    .trim()
    .min(2, "Please enter your company name.")
    .max(120, "Please keep this under 120 characters."),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter your phone number.")
    .refine((value) => value === "" || phonePattern.test(value), {
      message: "Enter a valid phone number, e.g. +92 300 1234567.",
    }),
  whatsapp: z
    .string()
    .trim()
    .refine((value) => value === "" || phonePattern.test(value), {
      message: "Enter a valid WhatsApp number, e.g. +92 300 1234567.",
    }),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(200, "Please keep this under 200 characters.")
    .refine((value) => value === "" || emailPattern.test(value), {
      message: "Enter a valid email address, e.g. name@company.com.",
    }),
  productType: z.enum(productTypes, { error: "Please select a product type." }),
  quantity: z
    .string()
    .trim()
    .min(1, "Please enter the required quantity.")
    .max(40, "Please keep this under 40 characters.")
    .refine(
      (value) =>
        value === "" ||
        (/^\d[\d,\s]*$/.test(value) && Number.parseInt(value.replace(/[,\s]/g, ""), 10) > 0),
      { message: "Enter the quantity in pieces, using numbers only (e.g. 50,000)." },
    ),
  tubeDiameter: text(80),
  tubeSize: text(80),
  message: text(2000),
  idempotencyKey: z.string().trim().min(16).max(64),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
export type QuoteFieldName = keyof QuoteInput | "artwork";

export function fieldErrors(error: z.ZodError): Partial<Record<QuoteFieldName, string>> {
  const result: Partial<Record<QuoteFieldName, string>> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "") as QuoteFieldName;
    if (key && !result[key]) result[key] = issue.message;
  }
  return result;
}

export function validateArtwork(file: { name: string; size: number; type: string }): string | null {
  if (file.size === 0) return "This file looks empty. Please choose another file.";
  if (file.size > ARTWORK_MAX_BYTES) return "File is too large. Please upload a file under 5 MB.";
  if (!ARTWORK_TYPES.includes(file.type)) {
    return "Unsupported file type. Please upload a JPG, PNG, WebP or PDF file.";
  }
  return null;
}
