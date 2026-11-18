import { WhatsAppIcon } from "./icons";
import { ButtonLink } from "./ui";
import { siteConfig } from "@/data/site";
import { cn, whatsappUrl } from "@/lib/utils";

/** Floating WhatsApp button, rendered on every page from the root layout. */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${siteConfig.name} on WhatsApp`}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 sm:bottom-7 sm:right-7"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white opacity-0 shadow-lg transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        Chat on WhatsApp
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.75)] transition duration-300 group-hover:scale-110">
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 [animation-duration:3.2s] motion-safe:animate-ping" aria-hidden />
        <WhatsAppIcon className="relative h-7 w-7" />
      </span>
    </a>
  );
}

/** Inline WhatsApp call-to-action button for product pages, contact sections, etc. */
export function WhatsAppCTA({
  message,
  label = "Chat on WhatsApp",
  size = "md",
  className,
  variant = "whatsapp",
}: {
  message?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "whatsapp" | "outline" | "outlineLight";
}) {
  return (
    <ButtonLink
      href={whatsappUrl(message)}
      external
      arrow={false}
      size={size}
      variant={variant}
      className={cn(className)}
    >
      <WhatsAppIcon className="h-5 w-5" />
      {label}
    </ButtonLink>
  );
}
