import { TreatmentCarousel } from "@/components/home/TreatmentCarousel";
import { Reveal } from "@/components/motion/Reveal";
import { TreatmentCard } from "@/components/sections/TreatmentCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/treatments";

/** Order for the homepage: individual treatments first, the two overview pages last. */
const ordered = [...services].sort((a, b) => Number(a.kind === "category") - Number(b.kind === "category"));

export function TreatmentsShowcase() {
  return (
    <section id="treatments" className="section-y overflow-hidden">
      <TreatmentCarousel
        label="Dental treatments"
        header={
          <SectionHeading
            eyebrow="Dental Treatments"
            title="Every treatment your smile may need, [[thoughtfully delivered.]]"
            lede="From a routine clean to a complete smile makeover, care at ToothCraft is planned around you and explained clearly at every step."
            className="max-w-3xl"
          />
        }
      >
        {ordered.map((treatment, index) => (
          <Reveal
            key={treatment.slug}
            delay={index < 4 ? index * 0.08 : 0}
            className="w-[78vw] max-w-[21rem] shrink-0 snap-start sm:w-[20rem] sm:max-w-none lg:w-[22.5rem] 2xl:w-[24.5rem]"
          >
            <div data-card>
              <TreatmentCard
                treatment={treatment}
                index={index}
                sizes="(min-width: 1536px) 392px, (min-width: 1024px) 360px, (min-width: 640px) 320px, 78vw"
              />
            </div>
          </Reveal>
        ))}
      </TreatmentCarousel>

      <Reveal className="wrap mt-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p className="max-w-md text-[0.9375rem] text-stone">
          Not sure which treatment is right for you? A consultation is the best place to start.
        </p>
        <ButtonLink href="/treatments" variant="outline">
          View All Treatments
        </ButtonLink>
      </Reveal>
    </section>
  );
}
