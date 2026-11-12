import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { WhatsAppCTA } from "@/components/WhatsAppButton";
import { customizationOptions } from "@/data/content";
import { categoryLabels, galleryItems } from "@/data/gallery";
import { images } from "@/data/images";

const showcaseIds = ["pe-range", "laminated-range", "aluminum-range", "laminated-hair-care"];

export function CustomizationSection() {
  const showcase = showcaseIds
    .map((id) => galleryItems.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow>Customization</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] sm:text-4xl lg:text-[3rem]">
              Your Brand. Your Design. Our Packaging.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-navy/65 sm:text-lg">
              Share your artwork and requirements — we help turn them into finished tube packaging that
              fits your product and your brand.
            </p>
            <ul className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {customizationOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <li key={option.title} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-paper text-navy">
                      <Icon className="h-[18px] w-[18px]" aria-hidden />
                    </span>
                    <span>
                      <span className="block font-bold text-navy">{option.title}</span>
                      <span className="block text-sm leading-snug text-navy/60">{option.description}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/quote" size="lg">
                Request a Quote
              </ButtonLink>
              <WhatsAppCTA size="lg" variant="outline" label="Discuss on WhatsApp" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
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
        </div>

        <div className="mt-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-dark">Design gallery</p>
              <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">Explore different tube designs</h3>
            </div>
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold-dark"
            >
              View the full gallery
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {showcase.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.07}>
                <Link
                  href="/gallery"
                  className="group relative block aspect-[4/3.4] overflow-hidden rounded-2xl bg-paper sm:rounded-3xl"
                >
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span
                    className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent"
                    aria-hidden
                  />
                  <span className="absolute inset-x-0 bottom-0 p-3.5 text-white sm:p-5">
                    <span className="block text-[0.58rem] font-bold uppercase tracking-[0.18em] text-gold-light sm:text-xs">
                      {categoryLabels[item.category]}
                    </span>
                    <span className="mt-0.5 block text-sm font-bold leading-tight sm:text-base">{item.title}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
