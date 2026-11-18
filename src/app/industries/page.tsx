import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { WhySection } from "@/components/sections/WhySection";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Industries We Serve | Cosmetic & Pharmaceutical Tube Packaging",
  description:
    "NBA supplies empty printed tubes for cosmetics, skincare, pharmaceuticals, oral care, hair care and specialty applications. Cosmetic tube packaging and pharmaceutical tube packaging in Pakistan.",
  path: "/industries",
  absoluteTitle: true,
  image: images.cosmetics,
  keywords: ["Cosmetic Tube Packaging", "Pharmaceutical Tube Packaging", "Printed Plastic Tubes"],
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        path="/industries"
        title="Tube Packaging for Every Product Category."
        description="From cosmetic tube packaging to pharmaceutical tube packaging, NBA supports brands across beauty, personal care, healthcare and specialty applications."
      />
      <IndustriesSection />
      <WhySection />
      <CTASection />
    </>
  );
}
