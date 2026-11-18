import Image from "next/image";
import type { CSSProperties } from "react";
import { Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { manufacturingProcesses } from "@/data/content";
import { images } from "@/data/images";
import { cn } from "@/lib/utils";

/** Process timeline driven by `manufacturingProcesses` in src/data/content.ts */
export function ManufacturingSection({ dark = true }: { dark?: boolean }) {
  const steps = manufacturingProcesses.filter((step) => step.enabled);

  return (
    <section className={cn("relative overflow-hidden py-24 lg:py-32", dark ? "bg-navy-grain" : "bg-white")}>
      <Container>
        <Reveal>
          <SectionHeading
            light={dark}
            eyebrow="Manufacturing Capabilities"
            title="Precision at Every Stage."
            description="From tube body to final packaging, each stage is handled with care so your tubes arrive looking exactly as designed."
          />
        </Reveal>

        <Reveal className="relative mt-14 aspect-[16/10] overflow-hidden rounded-[2rem] ring-1 ring-navy/10 sm:aspect-[21/9]">
          <Image
            src={images.manufacturing.src}
            alt={images.manufacturing.alt}
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" aria-hidden />
          <p className="absolute bottom-4 left-5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/80">
            Illustrative production-line imagery
          </p>
        </Reveal>

        <ol
          className="relative mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:[grid-template-columns:repeat(var(--steps),minmax(0,1fr))]"
          style={{ "--steps": steps.length } as CSSProperties}
        >
          <div
            className={cn(
              "absolute left-0 right-0 top-6 hidden h-px xl:block",
              dark ? "bg-gradient-to-r from-gold/60 via-white/15 to-transparent" : "bg-gradient-to-r from-gold via-navy/10 to-transparent",
            )}
            aria-hidden
          />
          {steps.map((step, index) => (
            <li key={step.id} className="relative">
              <Reveal delay={index * 0.06}>
                <div
                  className={cn(
                    "relative z-10 flex h-12 w-12 items-center justify-center rounded-full border text-sm font-bold",
                    dark ? "border-gold/50 bg-navy text-gold" : "border-gold bg-white text-gold-dark",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className={cn("mt-5 text-lg font-bold leading-snug", dark ? "text-white" : "text-navy")}>
                  {step.title}
                </h3>
                {step.appliesTo ? (
                  <span
                    className={cn(
                      "mt-2 inline-block rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider",
                      dark ? "bg-white/10 text-gold-light" : "bg-gold/15 text-gold-dark",
                    )}
                  >
                    {step.appliesTo}
                  </span>
                ) : null}
                <p className={cn("mt-2.5 text-sm leading-relaxed", dark ? "text-silver" : "text-navy/60")}>
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
