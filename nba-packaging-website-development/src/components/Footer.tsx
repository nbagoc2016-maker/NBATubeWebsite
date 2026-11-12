import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { WhatsAppIcon, socialIcons } from "./icons";
import { Container } from "./ui";
import { footerLinks, siteConfig } from "@/data/site";
import { whatsappUrl } from "@/lib/utils";

export function Footer() {
  const { contact, whatsapp } = siteConfig;
  return (
    <footer className="bg-navy-950 text-silver">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.3fr]">
          <div>
            <Link href="/" aria-label={`${siteConfig.name} — home`} className="inline-block">
              <Logo variant="light" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed">
              {siteConfig.name} manufactures empty printed PE, laminated and aluminum tubes for brands that
              demand quality, attractive printing and reliable tube packaging.
            </p>
            <p className="mt-4 text-sm font-semibold text-gold">{siteConfig.tagline}</p>
            <div className="mt-6 flex items-center gap-3">
              {siteConfig.socials.map((social) => {
                const Icon = socialIcons[social.id as keyof typeof socialIcons];
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${siteConfig.name} on ${social.label}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-silver transition-all duration-300 hover:border-gold hover:bg-gold hover:text-navy"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                );
              })}
            </div>
          </div>

          <FooterColumn title="Products" links={footerLinks.products} />
          <FooterColumn title="Company" links={footerLinks.company} />

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-white">Contact</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <a href={contact.phoneHref} className="transition-colors hover:text-white">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                  WhatsApp: {whatsapp.display}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <a href={`mailto:${contact.email}`} className="break-all transition-colors hover:text-white">
                  {contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <span>{contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-7 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-silver/70">
            Tube packaging manufacturer in Pakistan · PE tubes · Laminated tubes · Aluminum tubes
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-white">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="transition-colors hover:text-gold">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
