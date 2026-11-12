import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";
import { IntroSection } from "@/components/sections/IntroSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { WhySection } from "@/components/sections/WhySection";
import { ManufacturingSection } from "@/components/sections/ManufacturingSection";
import { CustomizationSection } from "@/components/sections/CustomizationSection";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "NBA | Tube Packaging Manufacturer in Pakistan — PE, Laminated & Aluminum Tubes",
  description:
    "NBA is a tube packaging manufacturer in Pakistan. Premium empty printed PE tubes, laminated tubes and aluminum tubes for cosmetic, skincare, pharmaceutical and oral care brands. Request a quote.",
  path: "/",
  absoluteTitle: true,
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
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroSection />
      <ProductsSection />
      <IndustriesSection />
      <WhySection />
      <ManufacturingSection />
      <CustomizationSection />
      <CTASection />
    </>
  );
}
