import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { images } from "@/data/images";
import { absoluteUrl } from "@/lib/utils";

interface MetaInput {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: { src: string; alt: string; width: number; height: number };
  /** Use the title exactly as written (skips the "| NBA" suffix). */
  absoluteTitle?: boolean;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords,
  image = images.hero,
  absoluteTitle = false,
}: MetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: `${siteConfig.name} — ${siteConfig.descriptor}`,
      locale: siteConfig.locale,
      type: "website",
      images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.src],
    },
  };
}

/** Organization data is always output. LocalBusiness (with address/phone) only once verified. */
export function organizationJsonLd() {
  const verified = siteConfig.business.verified;
  const sameAs = siteConfig.socials.filter((s) => s.verified).map((s) => s.url);

  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": verified ? "LocalBusiness" : "Organization",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl(images.hero.src),
    slogan: siteConfig.tagline,
    areaServed: { "@type": "Country", name: siteConfig.country },
  };
  if (sameAs.length) base.sameAs = sameAs;
  if (verified) {
    base.telephone = siteConfig.contact.phoneDisplay;
    base.email = siteConfig.contact.email;
    base.address = { "@type": "PostalAddress", ...siteConfig.business.address };
  }
  return base;
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
