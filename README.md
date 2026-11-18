# NBA — Premium Tube Packaging Website

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide · PostgreSQL (Drizzle ORM)

**Brand:** Navy `#101D2C` · White · Silver `#A8B0B8` · Champagne Gold `#C69B63` · Light `#F5F6F7` · Font: Manrope

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Homepage (hero, intro, products, industries, why NBA, manufacturing, customization, CTA) |
| `/about` | Company profile, overview, capabilities, quality approach, vision & mission |
| `/products` | Product overview + filterable gallery |
| `/products/pe-tubes` · `/laminated-tubes` · `/aluminum-tubes` | Dedicated product pages |
| `/industries` · `/manufacturing` · `/gallery` | Supporting pages |
| `/quote` · `/contact` | Quote form (real backend) · contact details, map, form |
| `/admin/inquiries?token=…` | Private inbox of saved inquiries (needs `ADMIN_TOKEN`) |

## Where to edit things (no code changes needed beyond these files)

| What | File |
| --- | --- |
| Phone, WhatsApp, email, address, map, socials, nav & footer links | `src/data/site.ts` (or `.env`, see `.env.example`) |
| Product names, descriptions, applications, **specifications** | `src/data/products.ts` |
| Industries, "Why NBA", **manufacturing steps**, customization, About text | `src/data/content.ts` |
| All images (sample → real photos) | `src/data/images.ts` + files in `public/images/` |
| Gallery items & categories | `src/data/gallery.ts` |

Placeholders (phone, email, address, WhatsApp, socials) are marked `PLACEHOLDER` in `site.ts`.
Specifications NBA has not confirmed show as **"Shared on request · To be confirmed"** until you set
`confirmed: true` with a real value. Manufacturing steps can be hidden with `enabled: false`.

### Replacing sample images
1. Put the real photo in `public/images/`.
2. Update `src` / `width` / `height` / `alt` in `src/data/images.ts`.
All cards, product pages and the gallery update automatically. Current images are illustrative samples.

## Quote form → business email (secure, server-side)

Every inquiry is **saved to PostgreSQL first** (table `inquiries`, including any uploaded artwork), then
emailed to the NBA inbox over SMTP. Set these in `.env`:

```
SMTP_HOST=…  SMTP_PORT=587  SMTP_USER=…  SMTP_PASS=…
SMTP_FROM="NBA Website <no-reply@your-domain.com>"
QUOTE_TO_EMAIL=sales@your-domain.com
ADMIN_TOKEN=a-long-random-string
```

Without SMTP the inquiry is still stored; read it at `/admin/inquiries?token=ADMIN_TOKEN`.
Protections: shared client/server validation (zod), one-time idempotency key (no duplicate submissions),
honeypot field, per-IP rate limit, 5 MB / JPG-PNG-WebP-PDF artwork limit.

## SEO
Unique titles & descriptions per page, Open Graph/Twitter cards, `sitemap.xml`, `robots.txt`, breadcrumb and
Organization JSON-LD. `LocalBusiness` JSON-LD is only output when `NEXT_PUBLIC_BUSINESS_VERIFIED=true`.
Set `NEXT_PUBLIC_SITE_URL` to the production domain so canonical URLs and the sitemap are correct.

## Commands
```
npm run dev      # development
npm run build    # production build
npx drizzle-kit push   # apply DB schema
```
