import Image from "next/image";
import { Reveal } from "./Reveal";
import type { Industry } from "@/data/content";

export function IndustryCard({ industry, index = 0 }: { industry: Industry; index?: number }) {
  return (
    <Reveal delay={(index % 3) * 0.08} className="h-full">
      <article className="group relative aspect-[4/3.7] overflow-hidden rounded-[1.75rem] bg-navy sm:aspect-[4/4.2] lg:aspect-[4/3.9]">
        <Image
          src={industry.image.src}
          alt={industry.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          style={{ objectPosition: industry.position ?? "50% 50%" }}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-transparent transition-opacity duration-500"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
          <span className="mb-3 block h-0.5 w-8 bg-gold transition-all duration-500 group-hover:w-16" aria-hidden />
          <h3 className="text-xl font-extrabold text-white sm:text-2xl">{industry.title}</h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/75">{industry.description}</p>
          <p className="mt-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-gold-light">
            {industry.materials}
          </p>
        </div>
      </article>
    </Reveal>
  );
}
