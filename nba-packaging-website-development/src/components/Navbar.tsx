"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./icons";
import { ButtonLink, Container } from "./ui";
import { navLinks, siteConfig } from "@/data/site";
import { products } from "@/data/products";
import { cn, whatsappUrl } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled || open
          ? "bg-white/90 shadow-[0_1px_0_rgba(16,29,44,0.07)] backdrop-blur-xl"
          : "bg-white",
      )}
    >
      <Container className="flex h-[72px] items-center justify-between lg:grid lg:h-20 lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" aria-label={`${siteConfig.name} — home`} onClick={() => setOpen(false)} className="justify-self-start">
          <Logo />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const item = (
              <Link
                href={link.href}
                className={cn(
                  "relative inline-flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-semibold transition-colors",
                  active ? "text-navy" : "text-navy/60 hover:text-navy",
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
                {link.href === "/products" ? (
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden />
                ) : null}
                {active ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
              </Link>
            );

            if (link.href !== "/products") return <div key={link.href}>{item}</div>;

            return (
              <div key={link.href} className="group relative">
                {item}
                <div className="invisible absolute left-1/2 top-full w-[23rem] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="rounded-3xl bg-white p-3 shadow-soft ring-1 ring-navy/5">
                    {products.map((product) => (
                      <Link
                        key={product.slug}
                        href={`/products/${product.slug}`}
                        className="flex items-center gap-4 rounded-2xl p-2.5 transition-colors hover:bg-paper"
                      >
                        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-paper">
                          <Image src={product.image.src} alt="" fill sizes="56px" className="object-cover" />
                        </span>
                        <span>
                          <span className="block text-sm font-bold text-navy">{product.name}</span>
                          <span className="block text-xs leading-snug text-navy/55">{product.tagline}</span>
                        </span>
                      </Link>
                    ))}
                    <Link
                      href="/gallery"
                      className="mt-1 flex items-center justify-between rounded-2xl bg-paper px-4 py-3 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
                    >
                      Browse the product gallery <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <ButtonLink href="/quote" size="sm" arrow={false} className="px-4 sm:px-6">
            <span className="hidden sm:inline">Request a Quote</span>
            <span className="sm:hidden">Get Quote</span>
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy/10 text-navy transition-colors hover:bg-paper lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile navigation */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-white lg:hidden"
          >
            <nav className="px-6 pb-4 pt-4" aria-label="Mobile">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + index * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between border-b border-navy/10 py-4 text-2xl font-bold",
                      isActive(link.href) ? "text-gold-dark" : "text-navy",
                    )}
                  >
                    {link.label}
                    <ArrowRight className="h-5 w-5 text-silver" aria-hidden />
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="space-y-3 px-6 pb-10 pt-4">
              <ButtonLink href="/quote" size="lg" variant="primary" className="w-full" >
                Request a Quote
              </ButtonLink>
              <ButtonLink
                href={whatsappUrl()}
                external
                arrow={false}
                size="lg"
                variant="whatsapp"
                className="w-full"
              >
                <WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp
              </ButtonLink>
              <p className="pt-2 text-center text-sm text-navy/55">
                {siteConfig.contact.phoneDisplay} · {siteConfig.contact.email}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
