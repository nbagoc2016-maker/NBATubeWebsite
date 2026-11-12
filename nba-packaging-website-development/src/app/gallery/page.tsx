import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { ProductGallery } from "@/components/ProductGallery";
import { Container } from "@/components/ui";
import { galleryItems } from "@/data/gallery";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Product Gallery | Printed PE, Laminated & Aluminum Tube Designs",
  description:
    "Browse NBA's gallery of empty printed tubes. Filter PE, laminated and aluminum tube designs, preview full-size images and request a quote.",
  path: "/gallery",
  absoluteTitle: true,
  keywords: ["Printed Plastic Tubes", "Empty Printed Tubes", "Cosmetic Tube Packaging"],
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Product Gallery"
        path="/gallery"
        title="Explore Our Tube Designs."
        description="Browse printed PE, laminated and aluminum tubes. Filter by material and tap any design for a closer look."
      />
      <section className="py-20 lg:py-24">
        <Container>
          <ProductGallery items={galleryItems} />
          <p className="mt-8 text-xs text-navy/45">
            Gallery images are sample illustrations of tube packaging and will be replaced with NBA product
            photography.
          </p>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
