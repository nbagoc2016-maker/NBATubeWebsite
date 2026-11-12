"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import {
  categoryLabels,
  galleryCategories,
  type GalleryCategory,
  type GalleryItem,
} from "@/data/gallery";
import { cn } from "@/lib/utils";

const productTypeFor: Record<GalleryCategory, string> = {
  pe: "PE",
  laminated: "Laminated",
  aluminum: "Aluminum",
};

export function ProductGallery({
  items,
  showFilters = true,
}: {
  items: GalleryItem[];
  showFilters?: boolean;
}) {
  const [filter, setFilter] = useState<"all" | GalleryCategory>("all");
  const [activeId, setActiveId] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((item) => item.category === filter)),
    [items, filter],
  );
  const activeIndex = activeId ? visible.findIndex((item) => item.id === activeId) : -1;
  const active = activeIndex >= 0 ? visible[activeIndex] : null;

  const step = useCallback(
    (direction: 1 | -1) => {
      if (activeIndex < 0 || visible.length === 0) return;
      const next = (activeIndex + direction + visible.length) % visible.length;
      setActiveId(visible[next].id);
    },
    [activeIndex, visible],
  );

  const open = Boolean(active);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveId(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, step]);

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: items.length };
    for (const item of items) result[item.category] = (result[item.category] ?? 0) + 1;
    return result;
  }, [items]);

  return (
    <div>
      {showFilters ? (
        <div
          className="no-scrollbar -mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          role="group"
          aria-label="Filter product gallery by tube material"
        >
          {galleryCategories.map((category) => {
            const isActive = filter === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setFilter(category.id)}
                aria-pressed={isActive}
                className={cn(
                  "shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                  isActive
                    ? "border-navy bg-navy text-white shadow-md"
                    : "border-navy/15 bg-white text-navy/70 hover:border-navy hover:text-navy",
                )}
              >
                {category.label}
                <span className={cn("ml-2 text-xs", isActive ? "text-gold" : "text-navy/40")}>
                  {counts[category.id] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

      <motion.div
        key={filter}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="columns-2 gap-3 sm:gap-5 lg:columns-3"
      >
        {visible.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveId(item.id)}
            aria-label={`Preview ${item.title}`}
            className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-paper text-left sm:mb-5 sm:rounded-3xl"
          >
            <Image
              src={item.image.src}
              alt={item.image.alt}
              width={item.image.width}
              height={item.image.height}
              sizes="(min-width: 1024px) 33vw, 50vw"
              className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            <span
              className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100"
              aria-hidden
            />
            <span className="absolute inset-x-0 bottom-0 p-3 text-white transition duration-500 sm:p-5 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
              <span className="block text-[0.58rem] font-bold uppercase tracking-[0.18em] text-gold-light sm:text-xs">
                {categoryLabels[item.category]}
              </span>
              <span className="mt-1 block text-[0.8rem] font-bold leading-tight sm:text-lg">{item.title}</span>
            </span>
            <span
              className="absolute right-3 top-3 hidden h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy opacity-0 shadow transition duration-300 group-hover:opacity-100 md:flex"
              aria-hidden
            >
              <ZoomIn className="h-4 w-4" />
            </span>
          </button>
        ))}
      </motion.div>

      <AnimatePresence>
        {active ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            className="fixed inset-0 z-[100] flex flex-col bg-navy-950/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActiveId(null)}
          >
            <div className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-6" onClick={(e) => e.stopPropagation()}>
              <span className="text-sm font-semibold tracking-wider text-silver">
                {activeIndex + 1} / {visible.length}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setActiveId(null)}
                aria-label="Close preview"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-navy"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous design"
                className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white hover:text-navy sm:left-6"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="flex max-h-full max-w-full items-center justify-center"
              >
                <Image
                  src={active.image.src}
                  alt={active.image.alt}
                  width={active.image.width}
                  height={active.image.height}
                  sizes="90vw"
                  priority
                  style={{ width: "auto", height: "auto" }}
                  className="max-h-[56vh] max-w-full rounded-2xl object-contain shadow-2xl sm:max-h-[66vh]"
                />
              </motion.div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next design"
                className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white hover:text-navy sm:right-6"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="px-5 pb-6 pt-5 text-center sm:px-8 sm:pb-8" onClick={(e) => e.stopPropagation()}>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
                {categoryLabels[active.category]}
              </p>
              <h3 className="mt-2 text-xl font-extrabold text-white sm:text-2xl">{active.title}</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm text-silver">{active.description}</p>
              <Link
                href={`/quote?product=${productTypeFor[active.category]}`}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-white"
              >
                Request a quote for this tube type <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
