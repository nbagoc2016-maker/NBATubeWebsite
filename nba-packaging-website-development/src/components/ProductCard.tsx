import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import type { Product } from "@/data/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <Reveal delay={index * 0.1} className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-card ring-1 ring-navy/5 transition duration-500 hover:-translate-y-1.5 hover:shadow-soft">
        <div className="relative aspect-[4/3] overflow-hidden bg-paper">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold tracking-[0.18em] text-navy backdrop-blur">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-7 sm:p-8">
          <h3 className="text-2xl font-extrabold text-navy">{product.name}</h3>
          <p className="mt-3 leading-relaxed text-navy/65">{product.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {product.showcase.map((item) => (
              <li
                key={item}
                className="rounded-full border border-navy/10 bg-paper px-3 py-1.5 text-xs font-semibold text-navy/70"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8">
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center gap-2.5 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold tracking-wide text-white transition-all duration-300 after:absolute after:inset-0 after:content-[''] group-hover:bg-gold group-hover:text-navy"
            >
              {product.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
