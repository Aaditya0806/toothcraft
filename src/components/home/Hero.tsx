import { HeroVisual } from "@/components/home/HeroVisual";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/data/site";

const facts = [
  { value: String(site.founded), label: "Established" },
  { value: "Three", label: "Clinics in Chennai" },
  { value: "9 – 9", label: "Open all week" },
];

/**
 * Homepage hero. Entrance animations are CSS-only so the headline and the
 * portrait appear immediately, without waiting for JavaScript.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Champagne panel behind the portrait */}
      <div
        aria-hidden
        className="load-fade-in absolute inset-y-0 right-0 -z-10 hidden w-[38%] bg-sand lg:block"
      />

      <div className="wrap grid min-h-svh gap-y-16 pb-24 pt-28 sm:pt-32 lg:grid-cols-12 lg:items-center lg:gap-x-12 lg:pb-28 lg:pt-36">
        <div className="lg:col-span-7">
          <p
            className="eyebrow load-fade-up flex items-center gap-4 text-gold-deep"
            style={{ animationDelay: "0.1s" }}
          >
            <span aria-hidden className="load-line h-px w-10 shrink-0 bg-gold" style={{ animationDelay: "0.2s" }} />
            <span>Multi-speciality dental care · Chennai</span>
          </p>

          <TextReveal
            as="h1"
            mode="load"
            delay={0.25}
            gap={0.07}
            text="Where Exceptional Dentistry Meets the [[Art of Beautiful Smiles.]]"
            className="mt-7 font-display text-[clamp(2.75rem,5.9vw,6rem)] font-normal leading-[0.98] tracking-[-0.022em] text-charcoal"
          />

          <p
            className="load-fade-up mt-8 max-w-[34rem] text-[1.0625rem] leading-relaxed text-stone sm:text-lg"
            style={{ animationDelay: "0.95s" }}
          >
            Experience thoughtful dental care, advanced treatments, and personalised attention designed
            around your comfort, confidence, and smile.
          </p>

          <div className="load-fade-up mt-10 flex flex-wrap gap-3" style={{ animationDelay: "1.1s" }}>
            <ButtonLink href="#book">Book Your Appointment</ButtonLink>
            <ButtonLink href="/treatments" variant="outline" arrow={false}>
              Explore Our Treatments
            </ButtonLink>
          </div>

          <dl
            className="load-fade-up mt-14 grid max-w-xl grid-cols-3 gap-5 border-t hairline pt-7 sm:gap-8"
            style={{ animationDelay: "1.25s" }}
          >
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col-reverse justify-end gap-2">
                <dt className="label-caps text-stone">{fact.label}</dt>
                <dd className="font-display text-[1.9rem] leading-none text-charcoal sm:text-[2.25rem]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="load-fade-in label-caps absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-stone transition-colors hover:text-charcoal lg:flex"
        style={{ animationDelay: "1.8s" }}
      >
        <span>Scroll</span>
        <span aria-hidden className="relative block h-11 w-px overflow-hidden bg-charcoal/15">
          <span className="absolute inset-x-0 top-0 h-4 animate-scroll-dot bg-gold" />
        </span>
      </a>
    </section>
  );
}
