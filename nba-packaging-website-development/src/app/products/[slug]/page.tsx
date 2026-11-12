import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/ui";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { Reveal } from "@/components/Reveal";
import { WhatsAppCTA } from "@/components/WhatsAppButton";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { galleryItems } from "@/data/gallery";
import { getProduct, products } from "@/data/products";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import Link from "next/link";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return buildMetadata({
    title: product.seo.title,
    description: product.seo.description,
    keywords: product.seo.keywords,
    path: `/products/${product.slug}`,
    image: product.image,
    absoluteTitle: true,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const gallery = galleryItems.filter((item) => item.category === product.galleryCategory);
  const others = products.filter((item) => item.slug !== product.slug);
  const waMessage = `Hello NBA, I am interested in your ${product.headline.toLowerCase()}. I would like to discuss my requirements.`;
  const quoteHref = `/quote?product=${product.material}`;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.name, path: `/products/${product.slug}` },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-paper">
        <Container className="pb-20 pt-8 sm:pt-12 lg:pb-24">
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold text-navy/50">
              <li>
                <Link href="/" className="hover:text-navy">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/products" className="hover:text-navy">Products</Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-gold-dark" aria-current="page">{product.name}</li>
            </ol>
          </nav>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Reveal>
              <Eyebrow>{product.material} Tubes</Eyebrow>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.04] sm:text-5xl lg:text-6xl">
                {product.headline}
              </h1>
              <p className="mt-5 text-xl font-semibold leading-snug text-navy/80">{product.tagline}</p>
              <p className="mt-4 max-w-xl leading-relaxed text-navy/65">{product.summary}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {product.showcase.map((item) => (
                  <li key={item} className="rounded-full border border-navy/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-navy/70">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={quoteHref} size="lg">
                  Request a Quote
                </ButtonLink>
                <WhatsAppCTA size="lg" message={waMessage} label="Ask on WhatsApp" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-soft ring-1 ring-navy/5 sm:rounded-[2.5rem]">
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Introduction + detail block */}
      <section className="py-24 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Product Introduction</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] sm:text-4xl">
              {product.name} made for your brand.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-navy/70 sm:text-lg">
              {product.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-navy-grain h-full rounded-[2rem] p-8 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{product.detail.title}</p>
              <p className="mt-3 text-xl font-bold leading-snug text-white">{product.detail.subtitle}</p>
              <ul className="mt-7 space-y-4">
                {product.detail.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-silver">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-navy">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Gallery */}
      <section className="bg-paper py-24 lg:py-28">
        <Container>
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Product Gallery" title={`${product.name} designs.`} />
            <Link href="/gallery" className="text-sm font-semibold text-navy underline-offset-4 hover:text-gold-dark hover:underline">
              View all tube designs
            </Link>
          </Reveal>
          <div className="mt-10">
            <ProductGallery items={gallery} showFilters={false} />
          </div>
          <p className="mt-6 text-xs text-navy/45">
            Gallery images are sample illustrations and will be replaced with NBA product photography.
          </p>
        </Container>
      </section>

      {/* Customization */}
      <section className="py-24 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Customization Options"
              title="Tailored to your product."
              description={`Every order of ${product.name.toLowerCase()} can be customized. Tell us what you need and we will guide you through the options.`}
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {product.customization.map((option, index) => (
              <Reveal key={option.title} delay={(index % 3) * 0.07} className="h-full">
                <div className="group h-full rounded-3xl border border-navy/10 bg-white p-7 transition duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-soft">
                  <span className="text-sm font-bold tabular-nums text-gold-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-extrabold">{option.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-navy/65">{option.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Applications + specifications */}
      <section className="bg-paper py-24 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Typical Applications</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] sm:text-4xl">Where {product.name} work best.</h2>
            <ul className="mt-8 space-y-3.5">
              {product.applications.map((application) => (
                <li key={application} className="flex items-start gap-3 text-base font-semibold text-navy">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-dark">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                  </span>
                  {application}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <Eyebrow>Specifications</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] sm:text-4xl">Key product information.</h2>
            <dl className="mt-8 divide-y divide-navy/10 overflow-hidden rounded-3xl bg-white ring-1 ring-navy/10">
              {product.specs.map((spec) => (
                <div key={spec.label} className="grid gap-1 px-6 py-4 sm:grid-cols-[1fr_1.5fr] sm:gap-6">
                  <dt className="text-sm font-semibold text-navy/55">{spec.label}</dt>
                  <dd className="flex flex-wrap items-center gap-2 font-semibold text-navy">
                    <span className={spec.confirmed ? "" : "text-navy/60"}>{spec.value}</span>
                    {!spec.confirmed ? (
                      <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-gold-dark">
                        To be confirmed
                      </span>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-navy/50">
              Final specifications are confirmed with our team for each order. Contact us with your
              requirements for exact options.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Inquiry CTA */}
      <section className="py-24 lg:py-28">
        <Container>
          <Reveal>
            <div className="bg-navy-grain relative overflow-hidden rounded-[2.25rem] px-7 py-14 text-center sm:px-14 sm:py-16">
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-gold">Inquiry</p>
              <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-extrabold leading-[1.1] text-white sm:text-4xl lg:text-5xl">
                Planning {product.name.toLowerCase()} for your product?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-silver">
                Share your quantity, size and artwork and we will get back to you with the right solution.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href={quoteHref} size="lg" variant="gold">
                  Request a Quote
                </ButtonLink>
                <WhatsAppCTA size="lg" message={waMessage} label="Chat on WhatsApp" />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Other products */}
      <section className="bg-paper py-24 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="More from NBA" title="Explore other tube materials." />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
            {others.map((item, index) => (
              <ProductCard key={item.slug} product={item} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
