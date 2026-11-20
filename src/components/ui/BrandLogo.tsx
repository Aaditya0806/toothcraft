import { cn } from "@/lib/utils";

/**
 * ToothCraft logo lockup: the wordmark, a thin rule and the
 * "ISO 9001:2008 Certified" line beneath it, as in the original logo.
 *
 * The wordmark is drawn through a mask and the certification line is real
 * text, so the whole lockup takes the current text colour and stays sharp.
 * Set the width with a `w-*` class; the text scales with it.
 */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex flex-col [container-type:inline-size]", className)}>
      <span className="brand-mark w-full" />
      <span aria-hidden className="mt-[2.4cqw] h-px w-full bg-current opacity-45" />
      <span className="mt-[2.2cqw] whitespace-nowrap text-center text-[5.9cqw] font-medium leading-none tracking-[0.02em]">
        ISO 9001:2008 Certified
      </span>
    </span>
  );
}
