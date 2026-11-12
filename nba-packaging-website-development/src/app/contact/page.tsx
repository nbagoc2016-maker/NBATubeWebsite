import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { Reveal } from "@/components/Reveal";
import { WhatsAppCTA } from "@/components/WhatsAppButton";
import { Container, Eyebrow } from "@/components/ui";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact NBA | Tube Packaging Manufacturer in Pakistan",
  description:
    "Contact NBA for empty printed PE, laminated and aluminum tubes. Send an inquiry, chat on WhatsApp, call or email our team to discuss your tube packaging requirements.",
  path: "/contact",
  absoluteTitle: true,
  keywords: ["contact tube packaging manufacturer Pakistan", "NBA tubes", "request tube quote"],
});

export default function ContactPage() {
  const { contact, whatsapp } = siteConfig;
  const details = [
    {
      icon: Phone,
      label: "Business Phone",
      value: contact.phoneDisplay,
      href: contact.phoneHref,
    },
    {
      icon: Mail,
      label: "Business Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: MapPin,
      label: "Factory Address",
      value: contact.address,
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: contact.hours,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        path="/contact"
        title="Let's Talk About Your Tube Packaging."
        description="Tell us about your product and packaging requirements. Send an inquiry, or reach the NBA team directly on WhatsApp, phone or email."
      />

      <section className="py-20 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal>
            <Eyebrow>Get in touch</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] sm:text-4xl">We&apos;d love to hear from you.</h2>

            <div className="mt-8 rounded-3xl bg-[#25D366]/10 p-6 ring-1 ring-[#25D366]/25">
              <p className="font-bold text-navy">Fastest way to reach us</p>
              <p className="mt-1 text-sm text-navy/65">Chat on WhatsApp: {whatsapp.display}</p>
              <WhatsAppCTA className="mt-4" />
            </div>

            <ul className="mt-8 divide-y divide-navy/10 border-y border-navy/10">
              {details.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label} className="flex gap-4 py-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-gold">
                      <Icon className="h-[18px] w-[18px]" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-[0.18em] text-navy/45">
                        {item.label}
                      </span>
                      {item.href ? (
                        <a href={item.href} className="mt-1 block break-words font-semibold text-navy transition-colors hover:text-gold-dark">
                          {item.value}
                        </a>
                      ) : (
                        <span className="mt-1 block font-semibold text-navy">{item.value}</span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-navy/5 sm:p-10">
              <h2 className="text-2xl font-extrabold sm:text-3xl">Send us an inquiry</h2>
              <p className="mb-8 mt-2 text-sm text-navy/60">
                Share your requirements and our team will get back to you.
              </p>
              <QuoteForm idPrefix="contact" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Map */}
      <section className="pb-24 lg:pb-28">
        <Container>
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] ring-1 ring-navy/10">
              {contact.mapEmbedUrl ? (
                <iframe
                  title={`${siteConfig.name} factory location on Google Maps`}
                  src={contact.mapEmbedUrl}
                  className="h-[26rem] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-[22rem] flex-col items-center justify-center gap-3 bg-paper px-6 text-center sm:h-[26rem]">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-gold-dark shadow-card">
                    <MapPin className="h-6 w-6" aria-hidden />
                  </span>
                  <p className="text-lg font-extrabold text-navy">Google Maps location</p>
                  <p className="max-w-md text-sm text-navy/60">
                    Map embed placeholder — the factory location will appear here once the map link is added.
                  </p>
                  <p className="text-sm font-semibold text-navy">{contact.address}</p>
                </div>
              )}
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
