import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/manrope";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/ui";
import { siteConfig } from "@/data/site";
import { images } from "@/data/images";
import { organizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "NBA | Tube Packaging Manufacturer in Pakistan — PE, Laminated & Aluminum Tubes",
    template: "%s | NBA",
  },
  description:
    "NBA is a tube packaging manufacturer in Pakistan. Premium empty printed PE tubes, laminated tubes and aluminum tubes for cosmetic, skincare, pharmaceutical and oral care brands. Request a quote.",
  applicationName: siteConfig.name,
  keywords: [
    "Tube Packaging Manufacturer in Pakistan",
    "PE Tube Manufacturer in Pakistan",
    "Laminated Tube Manufacturer",
    "Aluminum Tube Manufacturer",
    "Printed Plastic Tubes",
    "Cosmetic Tube Packaging",
    "Pharmaceutical Tube Packaging",
    "Empty Printed Tubes",
  ],
  openGraph: {
    type: "website",
    siteName: `${siteConfig.name} — ${siteConfig.descriptor}`,
    locale: siteConfig.locale,
    title: "NBA | Packaging That Defines Your Brand.",
    description:
      "Premium PE, laminated and aluminum tubes. Crafted for brands that demand quality. Tube packaging manufacturer in Pakistan.",
    images: [{ url: images.hero.src, width: images.hero.width, height: images.hero.height, alt: images.hero.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NBA | Packaging That Defines Your Brand.",
    description: "Premium PE, laminated and aluminum tubes for brands that demand quality.",
    images: [images.hero.src],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#101D2C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-PK">
      <body className="min-h-screen bg-white text-navy antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
