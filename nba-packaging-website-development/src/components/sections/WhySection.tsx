import { Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { features } from "@/data/content";

export function WhySection({ tone = "paper" }: { tone?: "paper" | "white" }) {
  return (
    <section className={tone === "paper" ? "bg-paper py-24 lg:py-32" : "py-24 lg:py-32"}>
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Why NBA?"
            title="Why Businesses Choose NBA."
            description="A practical, quality-focused approach to tube packaging — built around what your product needs."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} delay={(index % 3) * 0.08} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-3xl bg-white p-8 shadow-card ring-1 ring-navy/5 transition duration-500 hover:-translate-y-1 hover:shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-6 text-lg font-extrabold text-navy">{feature.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-navy/65">{feature.description}</p>
                  <span
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100"
                    aria-hidden
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
