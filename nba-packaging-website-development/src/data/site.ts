/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  NBA — CENTRAL SITE CONFIGURATION  (edit this file to update the whole site)
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything marked "PLACEHOLDER" has NOT been supplied by NBA yet.
 *  Replace the value here (or set the matching environment variable in `.env`)
 *  and every page, the footer, the WhatsApp buttons and SEO data update at once.
 *
 *  Environment overrides (all optional):
 *    NEXT_PUBLIC_SITE_URL          e.g. https://www.yourdomain.com
 *    NEXT_PUBLIC_WHATSAPP_NUMBER   digits only, international format: 923001234567
 *    NEXT_PUBLIC_WHATSAPP_DISPLAY  e.g. "+92 300 1234567"
 *    NEXT_PUBLIC_BUSINESS_PHONE    e.g. "+92 21 1234567"
 *    NEXT_PUBLIC_BUSINESS_EMAIL    e.g. sales@yourdomain.com
 *    NEXT_PUBLIC_BUSINESS_ADDRESS  full factory address
 *    NEXT_PUBLIC_MAP_EMBED_URL     Google Maps "Embed a map" src URL
 *    NEXT_PUBLIC_BUSINESS_VERIFIED "true" once the details above are real
 *    NEXT_PUBLIC_FACEBOOK_URL / _INSTAGRAM_URL / _LINKEDIN_URL
 */

const digits = (value: string) => value.replace(/\D/g, "");

const whatsappNumber = digits(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923000000000");
const phoneDisplay = process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "+92 300 0000000"; // PLACEHOLDER

export const siteConfig = {
  name: "NBA",
  descriptor: "Tube Packaging Manufacturer",
  tagline: "Packaging That Defines Your Brand.",
  description:
    "NBA is a Pakistani manufacturer of empty printed PE tubes, laminated tubes and aluminum tubes for cosmetic, skincare, pharmaceutical, oral care and specialty brands.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_PK",
  country: "Pakistan",

  contact: {
    phoneDisplay,
    phoneHref: `tel:+${digits(phoneDisplay)}`,
    email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "sales@your-domain.com", // PLACEHOLDER
    address:
      process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ??
      "Factory address to be added — Industrial Area, City, Pakistan", // PLACEHOLDER
    hours: "Monday – Saturday · 9:00 AM – 6:00 PM", // PLACEHOLDER
    /** Google Maps → Share → Embed a map → copy the `src` URL. Leave empty to show a placeholder. */
    mapEmbedUrl: process.env.NEXT_PUBLIC_MAP_EMBED_URL ?? "",
  },

  whatsapp: {
    number: whatsappNumber,
    display: process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? "+92 300 0000000", // PLACEHOLDER
    defaultMessage:
      "Hello NBA, I am interested in your tube packaging products. I would like to discuss my requirements.",
  },

  /**
   * Local-business structured data is only output when this is true,
   * i.e. once the phone, e-mail and address above are real, verified details.
   */
  business: {
    verified: process.env.NEXT_PUBLIC_BUSINESS_VERIFIED === "true",
    address: {
      streetAddress: "",
      addressLocality: "",
      addressRegion: "",
      postalCode: "",
      addressCountry: "PK",
    },
  },

  socials: [
    {
      id: "facebook",
      label: "Facebook",
      url: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://www.facebook.com", // PLACEHOLDER
      verified: Boolean(process.env.NEXT_PUBLIC_FACEBOOK_URL),
    },
    {
      id: "instagram",
      label: "Instagram",
      url: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com", // PLACEHOLDER
      verified: Boolean(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      url: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com", // PLACEHOLDER
      verified: Boolean(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    },
  ],
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerLinks = {
  products: [
    { label: "PE Tubes", href: "/products/pe-tubes" },
    { label: "Laminated Tubes", href: "/products/laminated-tubes" },
    { label: "Aluminum Tubes", href: "/products/aluminum-tubes" },
    { label: "Product Gallery", href: "/gallery" },
  ],
  company: [
    { label: "About NBA", href: "/about" },
    { label: "Industries", href: "/industries" },
    { label: "Manufacturing", href: "/manufacturing" },
    { label: "Request a Quote", href: "/quote" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
