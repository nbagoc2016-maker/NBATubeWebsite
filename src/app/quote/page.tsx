import { Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { Reveal } from "@/components/Reveal";
import { WhatsAppCTA } from "@/components/WhatsAppButton";
import { Container } from "@/components/ui";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { productTypes } from "@/lib/validation";

export const metadata = buildMetadata({
  title: "Request a Quote | Printed PE, Laminated & Aluminum Tubes in Pakistan",
  description:
    "Request a quote from NBA for empty printed PE tubes, laminated tubes or aluminum tubes. Share your quantity, size and artwork and our team will respond.",
  path: "/quote",
  absoluteTitle: true,
  keywords: ["request tube packaging quote", "bulk tube order Pakistan", "empty printed tubes"],
});

const checklist = [
  "Tube material — PE, laminated or aluminum",
  "Required quantity (number of tubes)",
  "Tube diameter and length or capacity, if known",
  "Your artwork or a reference image",
  "Preferred cap or closure style",
];

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string | string[] }>;
}) {
  const params = await searchParams;
  const raw = Array.isArray(params.product) ? params.product[0] : params.product;
  const defaultProduct = productTypes.find((type) => type.toLowerCase() === raw?.toLowerCase());

  return (
    <>
      <PageHero
        eyebrow="Request a Quote"
        path="/quote"
        title="Tell Us What You Need. We'll Take It From There."
        description="Complete the form below with your tube packaging requirements. Our team will review your inquiry and respond with the right solution."
      />

      <section className="py-20 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.45fr_0.75fr] lg:gap-14">
          <Reveal>
            <div className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-navy/5 sm:p-10">
              <h2 className="text-2xl font-extrabold sm:text-3xl">Quote request form</h2>
              <p className="mb-8 mt-2 text-sm text-navy/60">
                Required fields are marked with an asterisk (*).
              </p>
              <QuoteForm defaultProduct={defaultProduct} idPrefix="quote" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-3xl bg-paper p-7 ring-1 ring-navy/5">
                <h3 className="text-lg font-extrabold">Helpful details to include</h3>
                <ul className="mt-5 space-y-3.5">
                  {checklist.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-semibold text-navy/80">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/25 text-gold-dark">
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs leading-relaxed text-navy/50">
                  Not sure about sizes yet? Submit what you know — our team will help you with the rest.
                </p>
              </div>

              <div className="bg-navy-grain rounded-3xl p-7">
                <h3 className="text-lg font-extrabold text-white">Prefer to talk?</h3>
                <p className="mt-2 text-sm text-silver">
                  Message us on WhatsApp or contact the team directly.
                </p>
                <WhatsAppCTA className="mt-5 w-full" />
                <dl className="mt-5 space-y-2 text-sm text-silver">
                  <div>
                    <dt className="sr-only">Phone</dt>
                    <dd>
                      <a href={siteConfig.contact.phoneHref} className="hover:text-white">
                        {siteConfig.contact.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a href={`mailto:${siteConfig.contact.email}`} className="break-all hover:text-white">
                        {siteConfig.contact.email}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
