import { ButtonLink, Container } from "./ui";
import { Reveal } from "./Reveal";
import { WhatsAppCTA } from "./WhatsAppButton";

export function CTASection({
  title = "Ready to Give Your Product the Packaging It Deserves?",
  description = "Connect with NBA to discuss your tube packaging requirements and discover the right solution for your business.",
  showWhatsApp = true,
}: {
  title?: string;
  description?: string;
  showWhatsApp?: boolean;
}) {
  return (
    <section className="bg-navy-grain relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" aria-hidden />
      <Container>
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">Let&apos;s work together</p>
          <h2 className="mt-5 text-3xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-silver sm:text-lg">{description}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/quote" size="lg" variant="gold">
              Request a Quote
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="outlineLight">
              Contact Us
            </ButtonLink>
          </div>
          {showWhatsApp ? (
            <div className="mt-6 flex justify-center">
              <WhatsAppCTA variant="outlineLight" size="sm" label="Prefer WhatsApp? Chat with us" className="border-transparent text-silver hover:bg-transparent hover:text-white" />
            </div>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
