import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { ProductGallery } from "@/components/ProductGallery";
import { Reveal } from "@/components/Reveal";
import { Container, SectionHeading } from "@/components/ui";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { galleryItems } from "@/data/gallery";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tube Packaging Products | PE, Laminated & Aluminum Tubes in Pakistan",
  description:
    "Explore NBA's empty printed PE tubes, laminated tubes and aluminum tubes. Cosmetic, skincare, pharmaceutical and oral care tube packaging manufactured in Pakistan.",
  path: "/products",
  absoluteTitle: true,
  keywords: [
    "Tube Packaging Manufacturer in Pakistan",
    "Printed Plastic Tubes",
    "Empty Printed Tubes",
    "Cosmetic Tube Packaging",
    "Pharmaceutical Tube Packaging",
  ],
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        path="/products"
        title="Empty Printed Tubes for Brands That Demand Quality."
        description="NBA is a tube packaging manufacturer in Pakistan, offering printed PE tubes, laminated tubes and aluminum tubes for cosmetic, skincare, pharmaceutical, oral care and specialty products."
      />
      <ProductsSection showHeading={false} />

      <section className="py-24 lg:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Product Gallery"
              title="Browse Our Tube Designs."
              description="Filter by material, tap any design to preview it, and request a quote for the tube type you like."
            />
          </Reveal>
          <div className="mt-12">
            <ProductGallery items={galleryItems} />
          </div>
          <p className="mt-6 text-xs text-navy/45">
            Gallery images are sample illustrations and will be replaced with NBA product photography.
          </p>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
