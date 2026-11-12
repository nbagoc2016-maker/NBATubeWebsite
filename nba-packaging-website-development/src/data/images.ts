/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  NBA — IMAGE LIBRARY
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every picture on the website is referenced from here.
 *
 *  HOW TO REPLACE SAMPLE IMAGES WITH NBA'S OWN PHOTOGRAPHS
 *    1. Drop the new photo into `public/images/` (JPG / PNG / WebP).
 *    2. Change the `src` below (and `width` / `height` to the new photo size).
 *    3. Update the `alt` text so it describes the real product.
 *  Pages, cards and the gallery update automatically.
 *
 *  All current images are SAMPLE imagery (AI-generated studio renders and
 *  royalty-free stock photos with no visible brands). They are illustrations of
 *  tube packaging, not photographs of NBA's own production.
 */

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const img = (src: string, alt: string, width = 1920, height = 1280): ImageAsset => ({
  src,
  alt,
  width,
  height,
});

export const images = {
  /* Hero + product category imagery */
  hero: img(
    "/images/hero-composition.jpg",
    "Premium printed PE, laminated and aluminum tubes standing together in a studio composition",
  ),
  pe: img(
    "/images/pe-tubes.jpg",
    "Empty printed PE tubes in white and bright colors with flip-top, screw and nozzle caps",
  ),
  laminated: img(
    "/images/laminated-tubes.jpg",
    "Empty printed laminated tubes with glossy and matte designs in navy, gold, green and pink",
  ),
  aluminum: img(
    "/images/aluminum-tubes.jpg",
    "Empty collapsible aluminum tubes in silver, white, navy and gold with different caps",
  ),

  /* Factory + customization */
  manufacturing: img(
    "/images/manufacturing.jpg",
    "Tube packaging production line with empty tubes on printing and finishing machinery",
  ),
  customization: img(
    "/images/customization.jpg",
    "Overhead view of many empty printed tubes in different colors, finishes, sizes and caps",
  ),

  /* Industries */
  cosmetics: img(
    "/images/stock/pexels-12969358.jpg",
    "Pink cosmetic tubes beside a makeup brush for cosmetics and beauty packaging",
    1600,
    1067,
  ),
  skincare: img(
    "/images/stock/pexels-8533265.jpg",
    "White and grey skincare tubes with screw caps resting on a stone block",
    1600,
    2400,
  ),
  pharmaceutical: img(
    "/images/pharmaceutical.jpg",
    "Printed aluminum ointment tubes beside a pharmacy tray for pharmaceutical packaging",
  ),
  oralCare: img(
    "/images/oral-care.jpg",
    "Printed laminated oral care tubes in mint and aqua next to a toothbrush",
  ),
  hairCare: img(
    "/images/hair-care.jpg",
    "Burgundy and gold printed hair care tubes on a dark marble salon counter",
  ),
  specialty: img(
    "/images/specialty.jpg",
    "Colorful specialty tubes with long nozzle tips for adhesives, art colors and gels",
  ),

  /* Extra gallery imagery */
  pastelPe: img(
    "/images/stock/pexels-7256065.jpg",
    "Two pastel colored PE tubes with black caps against a pink background",
    1600,
    2400,
  ),
  whitePe: img(
    "/images/stock/pexels-12024942.jpg",
    "Minimal white PE tube with a flip-top cap beside a white pump bottle",
    1600,
    1067,
  ),
  beigeTube: img(
    "/images/stock/pexels-4735905.jpg",
    "Beige soft-touch tube with a gold cap on a white marble surface",
    1600,
    2400,
  ),
} as const satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
