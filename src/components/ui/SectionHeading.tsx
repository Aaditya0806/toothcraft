import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
  /** Hide the leading rule. */
  bare?: boolean;
};

/** Small-caps label with a short gold rule, used above headings. */
export function Eyebrow({ children, className, tone = "dark", bare = false }: EyebrowProps) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-4",
        tone === "dark" ? "text-gold-deep" : "text-gold-soft",
        className,
      )}
    >
      {bare ? null : <span aria-hidden className="h-px w-10 shrink-0 bg-gold" />}
      <span>{children}</span>
    </p>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  /** Use [[double brackets]] around the phrase to emphasise. */
  title: string;
  lede?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  size?: "lg" | "md";
  as?: "h1" | "h2";
  className?: string;
  titleClassName?: string;
  id?: string;
};

/** Eyebrow + animated serif heading + optional supporting paragraph. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "dark",
  align = "left",
  size = "lg",
  as = "h2",
  className,
  titleClassName,
  id,
}: SectionHeadingProps) {
  const light = tone === "light";
  return (
    <div className={cn(align === "center" && "mx-auto text-center", className)}>
      <Reveal y={14}>
        <Eyebrow tone={tone} className={cn(align === "center" && "justify-center")}>
          {eyebrow}
        </Eyebrow>
      </Reveal>
      <TextReveal
        id={id}
        as={as}
        text={title}
        delay={0.08}
        className={cn(
          size === "lg" ? "display-lg" : "display-md",
          "mt-6",
          light ? "text-ivory" : "text-charcoal",
          titleClassName,
        )}
        accentClassName={cn("italic", light ? "text-gold-soft" : "text-gold-deep")}
      />
      {lede ? (
        <Reveal delay={0.2} y={18}>
          <div
            className={cn(
              "mt-7 max-w-xl text-[1.0625rem] leading-relaxed",
              light ? "text-ivory/70" : "text-stone",
              align === "center" && "mx-auto",
            )}
          >
            {lede}
          </div>
        </Reveal>
      ) : null}
    </div>
  );
}
