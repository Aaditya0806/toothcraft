import { services } from "@/data/treatments";

/** A slow, decorative band of treatment names. Hidden from assistive technology. */
export function TreatmentMarquee() {
  const row = (
    <ul className="flex shrink-0 items-center">
      {services.map((treatment) => (
        <li key={treatment.slug} className="flex items-center">
          <span className="px-7 font-display text-[1.5rem] italic leading-none text-charcoal/65 lg:px-10 lg:text-[1.9rem]">
            {treatment.name}
          </span>
          <span className="size-1.5 rotate-45 bg-gold" />
        </li>
      ))}
    </ul>
  );

  return (
    <div aria-hidden className="overflow-hidden border-y hairline bg-ivory py-5 lg:py-6">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row}
        {row}
      </div>
    </div>
  );
}
