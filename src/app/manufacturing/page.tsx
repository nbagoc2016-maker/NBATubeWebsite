import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { ManufacturingSection } from "@/components/sections/ManufacturingSection";
import { CustomizationSection } from "@/components/sections/CustomizationSection";
import { WhySection } from "@/components/sections/WhySection";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Manufacturing Capabilities | Tube Packaging Manufacturer in Pakistan",
  description:
    "See how NBA manufactures printed PE, laminated and aluminum tubes — from tube body manufacturing and printing to cap fitting, quality inspection and final packaging.",
  path: "/manufacturing",
  absoluteTitle: true,
  image: images.manufacturing,
  keywords: ["Tube Packaging Manufacturer in Pakistan", "printed plastic tubes", "empty printed tubes"],
});

export default function ManufacturingPage() {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing"
        path="/manufacturing"
        title="Precision at Every Stage of Tube Production."
        description="A structured production flow, from tube body to final packaging, designed to deliver consistent, well-printed tubes."
      />
      <ManufacturingSection dark={false} />
      <WhySection />
      <CustomizationSection />
      <CTASection />
    </>
  );
}
