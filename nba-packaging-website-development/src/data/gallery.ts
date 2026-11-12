import { images, type ImageAsset } from "./images";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  NBA — PRODUCT GALLERY DATA
 * ─────────────────────────────────────────────────────────────────────────────
 *  Add, remove or re-order items below. To use NBA's own photographs, add the
 *  image in `src/data/images.ts` and reference it here.
 */

export type GalleryCategory = "pe" | "laminated" | "aluminum";

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  description: string;
  image: ImageAsset;
}

export const galleryCategories: { id: "all" | GalleryCategory; label: string }[] = [
  { id: "all", label: "All Designs" },
  { id: "pe", label: "PE Tubes" },
  { id: "laminated", label: "Laminated Tubes" },
  { id: "aluminum", label: "Aluminum Tubes" },
];

export const categoryLabels: Record<GalleryCategory, string> = {
  pe: "PE Tube",
  laminated: "Laminated Tube",
  aluminum: "Aluminum Tube",
};

export const galleryItems: GalleryItem[] = [
  {
    id: "pe-range",
    title: "Printed PE Tube Range",
    category: "pe",
    description: "White and colorful printed PE tubes with flip-top, screw and nozzle caps.",
    image: images.pe,
  },
  {
    id: "laminated-range",
    title: "Printed Laminated Designs",
    category: "laminated",
    description: "Glossy and matte laminated tubes with bold, brand-led artwork.",
    image: images.laminated,
  },
  {
    id: "aluminum-range",
    title: "Aluminum Tube Finishes",
    category: "aluminum",
    description: "Collapsible aluminum tubes in metallic, white, navy and gold finishes.",
    image: images.aluminum,
  },
  {
    id: "pe-pastel",
    title: "Soft Pastel PE Tubes",
    category: "pe",
    description: "Pastel colorways for beauty and personal care launches.",
    image: images.pastelPe,
  },
  {
    id: "laminated-oral-care",
    title: "Oral Care Tubes",
    category: "laminated",
    description: "Fresh mint and aqua artwork for oral care packaging.",
    image: images.oralCare,
  },
  {
    id: "aluminum-pharma",
    title: "Pharmaceutical Tubes",
    category: "aluminum",
    description: "Clean, clinical presentation for ointments and topical products.",
    image: images.pharmaceutical,
  },
  {
    id: "pe-white",
    title: "Minimal White PE Tube",
    category: "pe",
    description: "A plain white PE tube — ideal for simple, label-led branding.",
    image: images.whitePe,
  },
  {
    id: "laminated-hair-care",
    title: "Hair Care Tubes",
    category: "laminated",
    description: "Deep burgundy and gold printing for salon and hair color products.",
    image: images.hairCare,
  },
  {
    id: "aluminum-specialty",
    title: "Specialty Nozzle Tubes",
    category: "aluminum",
    description: "Long-nozzle tubes for adhesives, art colors and technical gels.",
    image: images.specialty,
  },
  {
    id: "pe-skincare",
    title: "Skincare PE Tubes",
    category: "pe",
    description: "Soft-touch tubes with screw caps for creams and lotions.",
    image: images.skincare,
  },
  {
    id: "laminated-cosmetics",
    title: "Cosmetic Tube Colors",
    category: "laminated",
    description: "Vibrant tube colors for cosmetics and beauty products.",
    image: images.cosmetics,
  },
  {
    id: "laminated-closure",
    title: "Premium Closure Detail",
    category: "laminated",
    description: "A close look at a gold-finish closure on a soft-touch tube.",
    image: images.beigeTube,
  },
];
