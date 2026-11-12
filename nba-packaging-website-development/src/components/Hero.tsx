"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink, Container, Eyebrow } from "./ui";
import { images } from "@/data/images";

const ease = [0.22, 1, 0.36, 1] as const;

const materials = [
  { label: "PE Tubes", dot: "bg-gold" },
  { label: "Laminated Tubes", dot: "bg-navy" },
  { label: "Aluminum Tubes", dot: "bg-silver" },
];

const sectors = ["Cosmetics", "Skincare", "Pharmaceuticals", "Oral Care", "Hair Care", "Specialty"];

export function Hero() {
  const reduce = useReducedMotion();
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease },
        };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-paper">
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[42rem] w-[42rem] rounded-full bg-gradient-to-br from-silver-light/70 to-transparent blur-3xl"
        aria-hidden
      />
      <Container className="relative pb-16 pt-10 sm:pt-14 lg:pb-20 lg:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-10 xl:gap-16">
          <div>
            <motion.div {...enter(0.05)}>
              <Eyebrow>Tube Packaging Manufacturer · Pakistan</Eyebrow>
            </motion.div>
            <motion.h1
              {...enter(0.15)}
              className="mt-6 text-[2.7rem] font-extrabold leading-[1.02] tracking-tight text-navy sm:text-6xl xl:text-[4.6rem]"
            >
              Packaging That <span className="text-gold-dark">Defines</span> Your Brand.
            </motion.h1>
            <motion.p
              {...enter(0.28)}
              className="mt-6 max-w-xl text-lg font-semibold leading-snug text-navy/85 sm:text-xl"
            >
              Premium PE, Laminated &amp; Aluminum Tubes. Crafted for Brands That Demand Quality.
            </motion.p>
            <motion.p {...enter(0.38)} className="mt-4 max-w-lg text-base leading-relaxed text-navy/60">
              Discover quality tube packaging solutions designed to bring your brand to life.
            </motion.p>
            <motion.div {...enter(0.5)} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/products" size="lg">
                Explore Our Products
              </ButtonLink>
              <ButtonLink href="/quote" size="lg" variant="outline">
                Request a Quote
              </ButtonLink>
            </motion.div>
          </div>

          <motion.div
            className="relative"
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
          >
            <div
              className="absolute -inset-5 rounded-[3rem] bg-gradient-to-br from-gold-light/40 via-silver-light/40 to-transparent blur-2xl"
              aria-hidden
            />
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-soft ring-1 ring-navy/5 sm:rounded-[2.5rem]">
              <Image
                src={images.hero.src}
                alt={images.hero.alt}
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
            </div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease }}
              className="absolute -bottom-6 left-4 rounded-2xl bg-white/95 px-5 py-4 shadow-card backdrop-blur sm:left-8"
            >
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-navy/45">
                We manufacture
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm font-bold text-navy">
                {materials.map((item) => (
                  <li key={item.label} className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${item.dot}`} aria-hidden />
                    {item.label}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="mt-20 border-t border-navy/10 pt-6"
        >
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-navy/45">
            <span className="text-navy/70">Empty printed tubes for</span>
            {sectors.map((sector, index) => (
              <span key={sector} className="flex items-center gap-3">
                {sector}
                {index < sectors.length - 1 ? <span className="h-1 w-1 rounded-full bg-gold" aria-hidden /> : null}
              </span>
            ))}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
