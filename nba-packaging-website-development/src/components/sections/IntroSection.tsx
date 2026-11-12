import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { homeCopy, introHighlights } from "@/data/content";
import { images } from "@/data/images";

export function IntroSection() {
  return (
    <section className="overflow-hidden py-24 lg:py-32">
      <Container className="grid items-center gap-20 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <Reveal className="relative mb-10 lg:mb-0">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-soft">
            <Image
              src={images.manufacturing.src}
              alt={images.manufacturing.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -right-1 w-[44%] overflow-hidden rounded-3xl border-[6px] border-white shadow-soft sm:-right-6">
            <div className="relative aspect-square">
              <Image
                src={images.customization.src}
                alt={images.customization.alt}
                fill
                sizes="(min-width: 1024px) 22vw, 44vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Eyebrow>About NBA</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] sm:text-4xl lg:text-[3rem]">
            {homeCopy.introHeading}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-navy/65 sm:text-lg">{homeCopy.introText}</p>

          <ul className="mt-10 divide-y divide-navy/10 border-y border-navy/10">
            {introHighlights.map((item, index) => (
              <li key={item.title}>
                <Link href={item.href} className="group flex items-center gap-5 py-5">
                  <span className="text-sm font-bold tabular-nums text-gold-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="block text-lg font-bold text-navy">{item.title}</span>
                    <span className="block text-sm text-navy/60">{item.description}</span>
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 text-silver transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-dark"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>

          <ButtonLink href="/about" className="mt-10">
            About NBA
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
