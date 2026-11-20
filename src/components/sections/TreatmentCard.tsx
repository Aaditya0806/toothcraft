import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { treatmentCategories, type Treatment } from "@/data/treatments";
import { cn, pad } from "@/lib/utils";

type TreatmentCardProps = {
  treatment: Treatment;
  index?: number;
  sizes?: string;
  className?: string;
  /** Aspect ratio utility for the image frame. */
  aspect?: string;
};

/**
 * Tall photographic treatment card. On hover the image eases in, the
 * description rises and the arrow badge turns gold; on touch screens the
 * description is always visible.
 */
export function TreatmentCard({
  treatment,
  index,
  sizes = "(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 80vw",
  className,
  aspect = "aspect-[3/4]",
}: TreatmentCardProps) {
  const category = treatmentCategories.find((entry) => entry.id === treatment.category);
  return (
    <Link
      href={`/treatments/${treatment.slug}`}
      draggable={false}
      className={cn("group relative block overflow-hidden rounded-[1.75rem] bg-graphite", aspect, className)}
    >
      <Image
        src={treatment.image}
        alt={treatment.imageAlt}
        fill
        sizes={sizes}
        draggable={false}
        className="object-cover transition-transform duration-[1800ms] ease-luxe group-hover:scale-110"
        style={{ objectPosition: treatment.focal ?? "50% 50%" }}
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/25 to-charcoal/10 transition-opacity duration-700 group-hover:opacity-90"
      />

      <span className="absolute inset-x-5 top-5 flex items-center justify-between text-ivory sm:inset-x-6 sm:top-6">
        <span className="label-caps rounded-full bg-charcoal/35 px-3 py-1.5 backdrop-blur-sm">
          {typeof index === "number" ? `${pad(index + 1)} · ` : ""}
          {category?.label}
        </span>
        <span className="grid size-10 place-items-center rounded-full bg-ivory/15 backdrop-blur-sm transition-all duration-700 ease-luxe group-hover:bg-gold group-hover:text-charcoal">
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-700 ease-luxe group-hover:rotate-45"
            strokeWidth={1.75}
          />
        </span>
      </span>

      <span className="absolute inset-x-5 bottom-5 block text-ivory sm:inset-x-6 sm:bottom-6">
        <span className="block font-display text-[1.75rem] leading-[1.05] sm:text-[2rem]">{treatment.name}</span>
        <span className="mt-3 grid transition-[grid-template-rows] duration-700 ease-luxe lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-visible:grid-rows-[1fr]">
          <span className="block overflow-hidden">
            <span className="block text-[0.9063rem] leading-relaxed text-ivory/80">{treatment.summary}</span>
          </span>
        </span>
        <span className="link-line group-line mt-5 text-gold-soft">
          <span>{treatment.kind === "guide" ? "Read Guide" : "Explore Treatment"}</span>
        </span>
      </span>
    </Link>
  );
}
