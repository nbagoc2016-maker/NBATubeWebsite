import { siteConfig } from "@/data/site";

/** Join class names, ignoring falsy values. */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Build a wa.me link that opens WhatsApp with a prefilled message. */
export function whatsappUrl(message: string = siteConfig.whatsapp.defaultMessage) {
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** Absolute URL for a site path (used by SEO helpers, sitemap and e-mails). */
export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
