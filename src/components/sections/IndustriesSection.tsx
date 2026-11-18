import { Container, SectionHeading } from "@/components/ui";
import { IndustryCard } from "@/components/IndustryCard";
import { Reveal } from "@/components/Reveal";
import { industries } from "@/data/content";

export function IndustriesSection() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Industries We Serve"
            title="Packaging for the Products People Trust."
            description="From beauty counters to pharmacy shelves, NBA tubes carry products across many categories."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {industries.map((industry, index) => (
            <IndustryCard key={industry.id} industry={industry} index={index} />
          ))}
        </div>
        <p className="mt-6 text-xs text-navy/45">
          Images are sample illustrations of tube packaging and can be replaced with NBA product photography.
        </p>
      </Container>
    </section>
  );
}
