import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10", className)}>{children}</div>;
}

export function Eyebrow({ children, light = false, className }: { children: ReactNode; light?: boolean; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em]",
        light ? "text-gold" : "text-gold-dark",
        className,
      )}
    >
      <span className="h-px w-8 bg-gold" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      {eyebrow ? (
        <Eyebrow light={light} className={cn(align === "center" && "justify-center")}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Tag
        className={cn(
          "mt-4 text-3xl font-extrabold leading-[1.08] sm:text-4xl lg:text-[3.1rem]",
          light ? "text-white" : "text-navy",
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", light ? "text-silver" : "text-navy/65")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

const variants = {
  primary: "bg-navy text-white hover:bg-gold hover:text-navy",
  gold: "bg-gold text-navy hover:bg-white",
  outline: "border border-navy/20 text-navy hover:border-navy hover:bg-navy hover:text-white",
  outlineLight: "border border-white/30 text-white hover:border-white hover:bg-white hover:text-navy",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#1fb857]",
} as const;

const sizes = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3.5 text-sm",
  lg: "px-8 py-4 text-[15px]",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = true,
  external = false,
  className,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  arrow?: boolean;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const classes = cn(
    "group/btn inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-wide transition-all duration-300 active:scale-[0.98]",
    variants[variant],
    sizes[size],
    className,
  );
  const content = (
    <>
      {children}
      {arrow ? (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden />
      ) : null}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}

/** Safe JSON-LD structured-data script tag. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
