import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Eye, Target } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { aboutContent, manufacturingProcesses } from "@/data/content";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About NBA | Tube Packaging Manufacturer in Pakistan",
  description:
    "Learn about NBA — a Pakistani manufacturer of empty printed PE, laminated and aluminum tubes. Our products, manufacturing capabilities, quality approach, vision and mission.",
  path: "/about",
  absoluteTitle: true,
  image: images.manufacturing,
  keywords: ["Tube Packaging Manufacturer in Pakistan", "about NBA", "empty printed tubes"],
});

const facts = [
  { label: "What we make", value: "Empty printed PE, laminated and aluminum tubes" },
  { label: "Who we serve", value: "Businesses across Pakistan and multiple industries" },
  { label: "How we work", value: "Customized to your artwork, size, material and closure" },
];

export default function AboutPage() {
  const steps = manufacturingProcesses.filter((step) => step.enabled);

  return (
    <>
      <PageHero
        eyebrow="About NBA"
        path="/about"
        title="A Pakistani Manufacturer of Premium Printed Tubes."
        description="NBA helps brands present their products with quality, attractive printing and reliable tube packaging."
      />

      {/* Introduction + overview */}
      <section className="py-24 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Company Introduction</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] sm:text-4xl">
              More Than Packaging. A Partner in Your Growth.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-navy/70 sm:text-lg">
              {aboutContent.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <h3 className="mt-12 text-2xl font-extrabold">Business Overview</h3>
            <div className="mt-4 space-y-5 text-base leading-relaxed text-navy/70">
              {aboutContent.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <dl className="mt-10 divide-y divide-navy/10 border-y border-navy/10">
              {facts.map((fact) => (
                <div key={fact.label} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="text-xs font-bold uppercase tracking-[0.18em] text-gold-dark">{fact.label}</dt>
                  <dd className="font-semibold text-navy">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="lg:pt-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft lg:sticky lg:top-28">
              <Image
                src={images.manufacturing.src}
                alt={images.manufacturing.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "35% 50%" }}
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Product categories */}
      <ProductsSection />

      {/* Manufacturing capabilities */}
      <section className="py-24 lg:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-soft">
              <Image
                src={images.customization.src}
                alt={images.customization.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>Manufacturing Capabilities</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] sm:text-4xl">Precision at Every Stage.</h2>
            <p className="mt-5 text-base leading-relaxed text-navy/65 sm:text-lg">
              Our production flow covers the stages that turn your artwork into finished tubes.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {steps.map((step) => (
                <li key={step.id} className="flex items-start gap-3 text-[15px] font-semibold text-navy">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-dark">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                  </span>
                  {step.title}
                </li>
              ))}
            </ul>
            <Link
              href="/manufacturing"
              className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold-dark"
            >
              See the manufacturing process
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Quality approach */}
      <section className="bg-paper py-24 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Quality Approach"
              title="Quality Is Built Into Every Step."
              description="We keep our approach simple: the right material, careful printing and inspection before dispatch."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3 lg:gap-6">
            {aboutContent.quality.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08} className="h-full">
                <div className="h-full rounded-3xl bg-white p-8 shadow-card ring-1 ring-navy/5">
                  <span className="text-sm font-bold tabular-nums text-gold-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-xl font-extrabold">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-navy/65">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Vision & mission */}
      <section className="py-24 lg:py-28">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
            <Reveal className="h-full">
              <div className="bg-navy-grain relative h-full overflow-hidden rounded-[2rem] p-9 sm:p-12">
                <Eye className="h-7 w-7 text-gold" aria-hidden />
                <h3 className="mt-6 text-2xl font-extrabold text-white sm:text-3xl">Our Vision</h3>
                <p className="mt-4 text-base leading-relaxed text-silver sm:text-lg">{aboutContent.vision}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <div className="h-full rounded-[2rem] bg-paper p-9 ring-1 ring-navy/5 sm:p-12">
                <Target className="h-7 w-7 text-gold-dark" aria-hidden />
                <h3 className="mt-6 text-2xl font-extrabold sm:text-3xl">Our Mission</h3>
                <p className="mt-4 text-base leading-relaxed text-navy/70 sm:text-lg">{aboutContent.mission}</p>
              </div>
            </Reveal>
          </div>
          <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {aboutContent.values.map((value) => (
              <span
                key={value}
                className="rounded-full border border-navy/10 px-5 py-2 text-sm font-semibold text-navy/75"
              >
                {value}
              </span>
            ))}
          </Reveal>
          <Reveal className="mt-10 flex justify-center">
            <ButtonLink href="/contact" variant="outline">
              Talk to the NBA team
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
