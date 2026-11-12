import { cn } from "@/lib/utils";

/** NBA logo: a simple tube mark in a navy tile + a confident wordmark. */
export function Logo({ variant = "dark", className }: { variant?: "dark" | "light"; className?: string }) {
  const light = variant === "light";
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg viewBox="0 0 64 64" className="h-10 w-10 shrink-0" fill="none" aria-hidden="true">
        <rect width="64" height="64" rx="16" fill={light ? "#16283B" : "#101D2C"} />
        {light ? <rect x="0.5" y="0.5" width="63" height="63" rx="15.5" stroke="#ffffff" strokeOpacity="0.14" /> : null}
        <rect x="26" y="9" width="12" height="9" rx="2.5" fill="#C69B63" />
        <path d="M23 18h18l4 7v22a3 3 0 0 1-3 3H22a3 3 0 0 1-3-3V25l4-7Z" fill="#FFFFFF" />
        <path d="M19 25h26" stroke="#A8B0B8" strokeWidth="1.5" />
        <path d="M22 53h20M23 56h18" stroke="#C69B63" strokeWidth="2" strokeLinecap="round" />
        <path d="M25 31c4-3 10 3 14 0M25 37c4-3 10 3 14 0" stroke="#C69B63" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[1.6rem] font-extrabold tracking-[0.16em]",
            light ? "text-white" : "text-navy",
          )}
        >
          NBA
        </span>
        <span className="mt-1.5 text-[0.56rem] font-semibold uppercase tracking-[0.34em] text-silver">
          Tube Packaging
        </span>
      </span>
    </span>
  );
}
