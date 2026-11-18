import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Container, Eyebrow, JsonLd } from "./ui";
import { breadcrumbJsonLd } from "@/lib/seo";

/** Navy page header with breadcrumbs, used on every inner page. */
export function PageHero({
  eyebrow,
  title,
  description,
  path,
  trail = [],
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  path: string;
  trail?: { name: string; path: string }[];
  children?: ReactNode;
}) {
  const crumbs = [{ name: "Home", path: "/" }, ...trail, { name: eyebrow, path }];
  return (
    <section className="bg-navy-grain relative overflow-hidden">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-silver">
            {crumbs.map((crumb, index) => (
              <li key={crumb.path} className="flex items-center gap-1.5">
                {index < crumbs.length - 1 ? (
                  <>
                    <Link href={crumb.path} className="transition-colors hover:text-white">
                      {crumb.name}
                    </Link>
                    <ChevronRight className="h-3.5 w-3.5 text-silver/50" aria-hidden />
                  </>
                ) : (
                  <span className="text-gold" aria-current="page">
                    {crumb.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-silver sm:text-lg">{description}</p>
        ) : null}
        {children ? <div className="mt-9">{children}</div> : null}
      </Container>
    </section>
  );
}
