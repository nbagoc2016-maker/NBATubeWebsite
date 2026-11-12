import { images, type ImageAsset } from "./images";
import type { GalleryCategory } from "./gallery";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  NBA — CENTRAL PRODUCT DATA
 * ─────────────────────────────────────────────────────────────────────────────
 *  Product names, descriptions, images, applications and specifications for the
 *  homepage cards AND the three dedicated product pages come from this file.
 *
 *  SPECIFICATIONS
 *    Only information NBA has confirmed should be marked `confirmed: true`.
 *    Anything NBA has not supplied yet is shown as "Shared on request" with a
 *    "To be confirmed" tag. Replace the value and set `confirmed: true` when
 *    NBA provides the real figure (e.g. diameter range, capacity, MOQ).
 */

export type ProductSlug = "pe-tubes" | "laminated-tubes" | "aluminum-tubes";
export type ProductMaterial = "PE" | "Laminated" | "Aluminum";

export interface ProductSpec {
  label: string;
  value: string;
  confirmed: boolean;
}

export interface ProductOption {
  title: string;
  description: string;
}

export interface Product {
  slug: ProductSlug;
  material: ProductMaterial;
  galleryCategory: GalleryCategory;
  name: string;
  headline: string;
  tagline: string;
  cta: string;
  summary: string;
  intro: string[];
  image: ImageAsset;
  showcase: string[];
  detail: { title: string; subtitle: string; items: string[] };
  customization: ProductOption[];
  applications: string[];
  specs: ProductSpec[];
  seo: { title: string; description: string; keywords: string[] };
}

const REQUEST = "Shared on request";

export const products: Product[] = [
  /* ───────────────────────────── PE TUBES ───────────────────────────── */
  {
    slug: "pe-tubes",
    material: "PE",
    galleryCategory: "pe",
    name: "PE Tubes",
    headline: "Empty Printed PE Tubes",
    tagline: "Versatile polyethylene tubes with print that stands out.",
    cta: "Explore PE Tubes",
    summary:
      "Versatile polyethylene tube packaging with customized printing and finishing options for personal care, cosmetics and other applications.",
    intro: [
      "NBA manufactures empty printed PE tubes for brands that need dependable, attractive packaging for creams, gels, lotions and pastes. As a PE tube manufacturer in Pakistan, we focus on clean print quality and a finish that reflects your brand.",
      "Choose plain white PE tubes for simple, label-led branding, or fully printed tubes in vibrant colors — paired with the cap style that suits how your customers use the product.",
    ],
    image: images.pe,
    showcase: [
      "White PE tubes",
      "Colorful printed PE tubes",
      "Different cap styles",
      "Different tube sizes",
    ],
    detail: {
      title: "Cap & closure styles",
      subtitle: "Match the closure to the product — and to the way it is used.",
      items: [
        "Flip-top caps for easy one-hand dispensing",
        "Screw caps for a classic, secure finish",
        "Nozzle caps for controlled application",
        "Applicator-style tips for precise dispensing",
      ],
    },
    customization: [
      { title: "Tube diameter", description: "Choose the diameter that fits your product and filling process." },
      { title: "Tube length", description: "Select the length that matches the volume your product needs." },
      { title: "Printing & artwork", description: "Your artwork printed on the tube, from simple one-color to full-color designs." },
      { title: "Colors & finishes", description: "Plain white or colored tubes with finishes that suit your brand." },
      { title: "Cap & closure", description: "Flip-top, screw, nozzle and other cap styles to choose from." },
      { title: "Material", description: "PE tube construction suited to personal care and cosmetic products." },
    ],
    applications: [
      "Skincare creams and lotions",
      "Cosmetics and beauty products",
      "Personal care gels and pastes",
      "Hair care products",
      "Hand and body care",
      "Other applications on request",
    ],
    specs: [
      { label: "Product type", value: "Empty printed PE tubes", confirmed: true },
      { label: "Printing", value: "Customized printing with your artwork", confirmed: true },
      { label: "Tube diameter", value: "Customizable to your requirement", confirmed: true },
      { label: "Tube length", value: "Customizable to your requirement", confirmed: true },
      { label: "Closures", value: "Multiple cap and closure styles", confirmed: true },
      { label: "Colors & finishes", value: "Customizable", confirmed: true },
      { label: "Available diameter range", value: REQUEST, confirmed: false },
      { label: "Capacity range", value: REQUEST, confirmed: false },
      { label: "Minimum order quantity", value: REQUEST, confirmed: false },
    ],
    seo: {
      title: "PE Tube Manufacturer in Pakistan | Empty Printed PE Tubes",
      description:
        "NBA is a PE tube manufacturer in Pakistan. Empty printed PE tubes with custom printing, colors and cap options for cosmetic, skincare and personal care brands. Request a quote.",
      keywords: [
        "PE tube manufacturer in Pakistan",
        "printed plastic tubes",
        "empty printed tubes",
        "cosmetic tube packaging",
        "PE tubes Pakistan",
      ],
    },
  },

  /* ─────────────────────────── LAMINATED TUBES ─────────────────────────── */
  {
    slug: "laminated-tubes",
    material: "Laminated",
    galleryCategory: "laminated",
    name: "Laminated Tubes",
    headline: "Empty Printed Laminated Tubes",
    tagline: "Rich print quality with suitable barrier properties.",
    cta: "Explore Laminated Tubes",
    summary:
      "Premium laminated tube packaging combining attractive printing with suitable barrier properties for a variety of product applications.",
    intro: [
      "NBA produces empty printed laminated tubes for brands that want high-impact graphics together with a layered structure suited to their product. Laminated tubes are a popular choice for oral care, skincare, cosmetics and topical products.",
      "From glossy to matte finishes, bold artwork to refined minimal designs, our laminated tubes help your product look premium on every shelf. As a laminated tube manufacturer serving Pakistani brands, we help you choose a suitable structure for your product.",
    ],
    image: images.laminated,
    showcase: [
      "Printed laminated tubes",
      "Different designs",
      "Different sizes and finishes",
      "Different closure options",
    ],
    detail: {
      title: "Laminated structure",
      subtitle: "Layered material built to balance print quality and product protection.",
      items: [
        "Printable outer surface for rich, detailed artwork",
        "Layered construction designed to provide suitable barrier properties",
        "Structure selected to suit your product and its shelf requirements",
        "Final structure options are confirmed with our team during your inquiry",
      ],
    },
    customization: [
      { title: "Tube diameter", description: "Choose the diameter that fits your product and filling process." },
      { title: "Tube length", description: "Select the length that matches the volume your product needs." },
      { title: "Printing & artwork", description: "Full-color artwork on the tube body, designed around your brand." },
      { title: "Colors & finishes", description: "Glossy, matte and other finishes to create the right look." },
      { title: "Cap & closure", description: "Screw caps, flip-top caps and other closure options." },
      { title: "Material structure", description: "Laminate structure selected to suit your product's requirements." },
    ],
    applications: [
      "Oral care and toothpaste",
      "Skincare and personal care creams",
      "Cosmetics and beauty products",
      "Topical and pharmaceutical products",
      "Hair care products",
      "Other applications on request",
    ],
    specs: [
      { label: "Product type", value: "Empty printed laminated tubes", confirmed: true },
      { label: "Printing", value: "Customized printing with your artwork", confirmed: true },
      { label: "Tube diameter", value: "Customizable to your requirement", confirmed: true },
      { label: "Tube length", value: "Customizable to your requirement", confirmed: true },
      { label: "Closures", value: "Multiple closure options", confirmed: true },
      { label: "Finishes", value: "Customizable", confirmed: true },
      { label: "Laminate structure", value: REQUEST, confirmed: false },
      { label: "Available diameter range", value: REQUEST, confirmed: false },
      { label: "Capacity range", value: REQUEST, confirmed: false },
      { label: "Minimum order quantity", value: REQUEST, confirmed: false },
    ],
    seo: {
      title: "Laminated Tube Manufacturer | Printed Laminated Tubes Pakistan",
      description:
        "NBA manufactures empty printed laminated tubes in Pakistan — premium print quality with suitable barrier properties for oral care, skincare, cosmetic and pharmaceutical packaging.",
      keywords: [
        "laminated tube manufacturer",
        "printed laminated tubes Pakistan",
        "tube packaging manufacturer in Pakistan",
        "pharmaceutical tube packaging",
        "empty printed tubes",
      ],
    },
  },

  /* ─────────────────────────── ALUMINUM TUBES ─────────────────────────── */
  {
    slug: "aluminum-tubes",
    material: "Aluminum",
    galleryCategory: "aluminum",
    name: "Aluminum Tubes",
    headline: "Empty Printed Aluminum Tubes",
    tagline: "Collapsible metal tubes with a premium finish.",
    cta: "Explore Aluminum Tubes",
    summary:
      "Collapsible aluminum tube packaging designed for pharmaceutical, cosmetic and specialty product applications.",
    intro: [
      "NBA offers empty printed aluminum tubes for pharmaceutical, cosmetic and specialty products that call for a premium, metallic presentation. Collapsible aluminum tubes combine a refined look with a practical, product-friendly design.",
      "Choose a natural metallic finish, or add printed artwork and colors that bring your brand to life. As an aluminum tube manufacturer for Pakistani businesses, we help you select the right cap and finish for your application.",
    ],
    image: images.aluminum,
    showcase: [
      "Aluminum tubes",
      "Printed aluminum tubes",
      "Different cap options",
      "Premium metallic finishes",
    ],
    detail: {
      title: "Collapsible aluminum design",
      subtitle: "A metal tube with a premium look and a practical, collapsible form.",
      items: [
        "Collapsible metal tube body",
        "Natural metallic finish or printed artwork",
        "Cap options to suit pharmaceutical, cosmetic and specialty uses",
        "Premium appearance that elevates your product on shelf",
      ],
    },
    customization: [
      { title: "Tube diameter", description: "Choose the diameter that fits your product and filling process." },
      { title: "Tube length", description: "Select the length that matches the volume your product needs." },
      { title: "Printing & artwork", description: "Printed designs on aluminum, from minimal to full-color artwork." },
      { title: "Colors & finishes", description: "Metallic, white and colored finishes for a premium appearance." },
      { title: "Cap & closure", description: "Screw caps and other cap options for different applications." },
      { title: "Material", description: "Collapsible aluminum tubes for pharmaceutical, cosmetic and specialty use." },
    ],
    applications: [
      "Pharmaceutical ointments and creams",
      "Cosmetic and beauty products",
      "Specialty gels and pastes",
      "Adhesives and technical products",
      "Art and craft colors",
      "Other applications on request",
    ],
    specs: [
      { label: "Product type", value: "Empty printed aluminum tubes", confirmed: true },
      { label: "Construction", value: "Collapsible aluminum tube", confirmed: true },
      { label: "Printing", value: "Customized printing with your artwork", confirmed: true },
      { label: "Tube diameter", value: "Customizable to your requirement", confirmed: true },
      { label: "Tube length", value: "Customizable to your requirement", confirmed: true },
      { label: "Closures", value: "Multiple cap options", confirmed: true },
      { label: "Available diameter range", value: REQUEST, confirmed: false },
      { label: "Capacity range", value: REQUEST, confirmed: false },
      { label: "Internal lacquer options", value: REQUEST, confirmed: false },
      { label: "Minimum order quantity", value: REQUEST, confirmed: false },
    ],
    seo: {
      title: "Aluminum Tube Manufacturer in Pakistan | Printed Aluminum Tubes",
      description:
        "NBA supplies empty printed collapsible aluminum tubes in Pakistan for pharmaceutical, cosmetic and specialty products. Premium metallic finishes and cap options. Request a quote.",
      keywords: [
        "aluminum tube manufacturer",
        "aluminum tubes Pakistan",
        "pharmaceutical tube packaging",
        "collapsible aluminum tubes",
        "empty printed tubes",
      ],
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export const productTypeOptions = [
  { value: "PE", label: "PE Tubes" },
  { value: "Laminated", label: "Laminated Tubes" },
  { value: "Aluminum", label: "Aluminum Tubes" },
] as const;
