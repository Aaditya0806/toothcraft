import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { TextReveal } from "@/components/motion/TextReveal";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; path: string };

type PageHeroProps = {
  eyebrow: string;
  /** Use [[double brackets]] around the phrase to emphasise. */
  title: string;
  lede?: ReactNode;
  crumbs: Crumb[];
  image?: { src: string; alt: string; focal?: string; grade?: boolean };
  /** Buttons or other actions shown under the introduction. */
  children?: ReactNode;
  /** Arch for portraits and lifestyle imagery, rounded for clinic photographs. */
  shape?: "arch" | "rounded";
  className?: string;
};

/**
 * Header block for inner pages: breadcrumb, large serif title and an optional
 * framed image. Animations are CSS-only so the title is visible immediately.
 */
export function PageHero({ eyebrow, title, lede, crumbs, image, children, shape = "arch", className }: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden pt-32 sm:pt-36 lg:pt-44", className)}>
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="load-fade-up" style={{ animationDelay: "0.05s" }}>
          <ol className="label-caps flex flex-wrap items-center gap-x-3 gap-y-1 text-stone">
            <li>
              <Link href="/" className="transition-colors hover:text-charcoal">
                Home
              </Link>
            </li>
            {crumbs.map((crumb, index) => {
              const last = index === crumbs.length - 1;
              return (
                <li key={crumb.path} className="flex items-center gap-3">
                  <span aria-hidden className="h-px w-5 bg-gold" />
                  {last ? (
                    <span aria-current="page" className="text-charcoal">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.path} className="transition-colors hover:text-charcoal">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div
          className={cn(
            "mt-10 grid gap-y-14 border-b hairline pb-16 lg:mt-14 lg:grid-cols-12 lg:gap-x-12 lg:pb-24",
            image ? "lg:items-end" : "",
          )}
        >
          <div className={cn(image ? "lg:col-span-7" : "lg:col-span-9")}>
            <p className="eyebrow load-fade-up text-gold-deep" style={{ animationDelay: "0.12s" }}>
              {eyebrow}
            </p>
            <TextReveal
              as="h1"
              mode="load"
              delay={0.2}
              gap={0.06}
              text={title}
              className="mt-6 font-display text-[clamp(2.6rem,5.4vw,5.5rem)] font-normal leading-[1] tracking-[-0.02em] text-charcoal"
            />
            {lede ? (
              <div
                className="load-fade-up mt-8 max-w-2xl text-[1.0625rem] leading-relaxed text-stone sm:text-lg"
                style={{ animationDelay: "0.75s" }}
              >
                {lede}
              </div>
            ) : null}
            {children ? (
              <div className="load-fade-up mt-10 flex flex-wrap gap-3" style={{ animationDelay: "0.9s" }}>
                {children}
              </div>
            ) : null}
          </div>

          {image ? (
            <div className="lg:col-span-5">
              <div
                className={cn(
                  "relative mx-auto w-full",
                  shape === "arch" ? "max-w-[22rem] lg:ml-auto lg:mr-0 lg:max-w-[25rem]" : "lg:ml-auto",
                )}
              >
                {shape === "arch" ? (
                  <span
                    aria-hidden
                    className="load-fade-in absolute inset-0 -translate-y-3 translate-x-3 rounded-b-[2rem] rounded-t-[999px] border border-gold/70"
                    style={{ animationDelay: "1.2s" }}
                  />
                ) : null}
                <div
                  className={cn(
                    "load-frame relative overflow-hidden bg-champagne",
                    shape === "arch"
                      ? "aspect-[4/5] rounded-b-[2rem] rounded-t-[999px]"
                      : "aspect-[4/3] rounded-[2rem]",
                  )}
                  style={{ animationDelay: "0.2s" }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 34vw, 88vw"
                    className={cn("load-settle object-cover", image.grade && "photo-grade")}
                    style={{ objectPosition: image.focal ?? "50% 50%", animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
