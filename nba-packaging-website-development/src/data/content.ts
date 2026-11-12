import {
  ArrowUpDown,
  CircleDot,
  Gauge,
  Handshake,
  Layers,
  MessagesSquare,
  Palette,
  Printer,
  Ruler,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { images, type ImageAsset } from "./images";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  NBA — EDITABLE WEBSITE CONTENT
 * ─────────────────────────────────────────────────────────────────────────────
 *  Industries, "Why NBA" cards, manufacturing steps, customization options and
 *  the About page text all live here. Edit the text — pages update everywhere.
 *
 *  Do not add certifications, statistics, awards, founding years, capacities or
 *  customer names until NBA has confirmed them.
 */

/* ─────────────────────────── INDUSTRIES ─────────────────────────── */
export interface Industry {
  id: string;
  title: string;
  description: string;
  materials: string;
  image: ImageAsset;
  /** CSS object-position for cropping, e.g. "50% 80%" */
  position?: string;
}

export const industries: Industry[] = [
  {
    id: "cosmetics",
    title: "Cosmetics & Beauty",
    description: "Expressive printed tubes for creams, foundations, gels and beauty launches.",
    materials: "PE · Laminated",
    image: images.cosmetics,
    position: "50% 55%",
  },
  {
    id: "skincare",
    title: "Skincare & Personal Care",
    description: "Soft, clean packaging for lotions, face creams and everyday personal care.",
    materials: "PE · Laminated",
    image: images.skincare,
    position: "50% 60%",
  },
  {
    id: "pharmaceuticals",
    title: "Pharmaceuticals",
    description: "Hygienic collapsible tubes for ointments, gels and topical formulations.",
    materials: "Aluminum · Laminated",
    image: images.pharmaceutical,
  },
  {
    id: "oral-care",
    title: "Oral Care & Toothpaste",
    description: "Fresh, high-impact printed laminated tubes for oral care brands.",
    materials: "Laminated",
    image: images.oralCare,
  },
  {
    id: "hair-care",
    title: "Hair Care",
    description: "Premium tubes for hair color, treatments, masks and styling creams.",
    materials: "PE · Laminated",
    image: images.hairCare,
  },
  {
    id: "specialty",
    title: "Specialty Applications",
    description: "Practical tubes for adhesives, art colors, gels and technical products.",
    materials: "Aluminum · PE",
    image: images.specialty,
  },
];

/* ─────────────────────────── WHY NBA ─────────────────────────── */
export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const features: Feature[] = [
  {
    title: "Quality-Focused Manufacturing",
    description: "Careful attention to print clarity, finish and fit on every tube we produce.",
    icon: ShieldCheck,
  },
  {
    title: "Customized Printing",
    description: "Artwork reproduced to bring your brand to life on the shelf.",
    icon: Printer,
  },
  {
    title: "Multiple Tube Materials",
    description: "PE, laminated and aluminum options to match your product's needs.",
    icon: Layers,
  },
  {
    title: "Consistent Production Standards",
    description: "A disciplined approach aimed at repeatable results from order to order.",
    icon: Gauge,
  },
  {
    title: "Customer-Focused Solutions",
    description: "We listen first, then recommend packaging that is practical for your product.",
    icon: MessagesSquare,
  },
  {
    title: "Reliable Business Partnership",
    description: "Clear communication and dependable support from inquiry to delivery.",
    icon: Handshake,
  },
];

/* ─────────────────────────── INTRO HIGHLIGHTS ─────────────────────────── */
export const introHighlights = [
  {
    title: "PE Tube Manufacturing",
    description: "Versatile printed PE tubes for personal care and cosmetics.",
    href: "/products/pe-tubes",
  },
  {
    title: "Laminated Tube Solutions",
    description: "Premium print quality with suitable barrier properties.",
    href: "/products/laminated-tubes",
  },
  {
    title: "Aluminum Tube Packaging",
    description: "Collapsible metal tubes with a premium finish.",
    href: "/products/aluminum-tubes",
  },
] as const;

/* ─────────────────────────── MANUFACTURING ─────────────────────────── */
export interface ManufacturingProcess {
  id: string;
  title: string;
  description: string;
  /** Set to false to hide a step that NBA does not perform in-house. */
  enabled: boolean;
  /** Optional note shown as a tag, e.g. "Laminated tubes". */
  appliesTo?: string;
}

/**
 * EDIT ME — keep only the processes NBA actually performs.
 * Toggle `enabled`, rename steps, or re-order the list freely.
 */
export const manufacturingProcesses: ManufacturingProcess[] = [
  {
    id: "body",
    title: "Tube Body Manufacturing",
    description: "Tube bodies are produced to your chosen diameter and length.",
    enabled: true,
  },
  {
    id: "printing",
    title: "Printing",
    description: "Your artwork is printed on the tube with attention to color and clarity.",
    enabled: true,
  },
  {
    id: "lamination",
    title: "Lamination",
    description: "Layered materials are combined to create laminated tube structures.",
    enabled: true,
    appliesTo: "Laminated tubes",
  },
  {
    id: "shoulder",
    title: "Shoulder Manufacturing",
    description: "Tube shoulders and necks are formed to suit the closure you select.",
    enabled: true,
  },
  {
    id: "cap",
    title: "Cap Fitting",
    description: "Caps and closures are fitted to complete each tube.",
    enabled: true,
  },
  {
    id: "inspection",
    title: "Quality Inspection",
    description: "Tubes are checked for print, finish and fit before they leave the line.",
    enabled: true,
  },
  {
    id: "packing",
    title: "Final Packaging",
    description: "Finished tubes are packed carefully for safe delivery to your facility.",
    enabled: true,
  },
];

/* ─────────────────────────── CUSTOMIZATION ─────────────────────────── */
export const customizationOptions: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Tube diameter",
    description: "Sized to suit your product and filling process.",
    icon: Ruler,
  },
  {
    title: "Tube length",
    description: "Choose the length that matches your fill volume.",
    icon: ArrowUpDown,
  },
  {
    title: "Printing & artwork",
    description: "Your design, reproduced with care.",
    icon: Printer,
  },
  {
    title: "Material selection",
    description: "PE, laminated or aluminum construction.",
    icon: Layers,
  },
  {
    title: "Cap & closure options",
    description: "Flip-top, screw, nozzle and more.",
    icon: CircleDot,
  },
  {
    title: "Colors & finishes",
    description: "Matte, glossy and metallic looks.",
    icon: Palette,
  },
];

/* ─────────────────────────── ABOUT PAGE ─────────────────────────── */
export const aboutContent = {
  intro: [
    "NBA is a Pakistani manufacturer of empty printed tube packaging. We make PE tubes, laminated tubes and aluminum tubes for businesses that want their products to look professional and arrive protected.",
    "Our focus is simple: product quality, attractive printing and customized packaging that helps brands make a lasting impression.",
  ],
  overview: [
    "We work with brands across cosmetics, skincare and personal care, pharmaceuticals, oral care, hair care and specialty applications. Every project starts by understanding your product, your artwork and the packaging experience you want your customers to have.",
    "From tube body to cap fitting, we take care of the details so that your packaging looks consistent and feels premium.",
  ],
  quality: [
    {
      title: "Right material for the product",
      description: "We help you choose between PE, laminated and aluminum tubes based on what your product needs.",
    },
    {
      title: "Print you can be proud of",
      description: "Careful attention to artwork, color and finish so your brand is represented well.",
    },
    {
      title: "Inspection before dispatch",
      description: "Quality inspection is part of our production flow, before tubes are packed and delivered.",
    },
  ],
  vision:
    "To be a trusted tube packaging partner for brands across Pakistan — known for quality, attractive printing and dependable service.",
  mission:
    "To deliver quality, beautifully printed tube packaging that helps our customers' products stand out, supported by clear communication and a customer-first approach.",
  values: ["Quality", "Reliability", "Customer focus", "Attention to detail"],
};

/* ─────────────────────────── HOME COPY ─────────────────────────── */
export const homeCopy = {
  introHeading: "More Than Packaging. A Partner in Your Growth.",
  introText:
    "At NBA, we specialize in manufacturing empty printed tube packaging solutions for businesses across multiple industries. Our focus is on product quality, attractive printing and customized packaging that helps brands make a lasting impression.",
};
