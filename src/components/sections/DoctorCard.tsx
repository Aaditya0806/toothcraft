import Image from "next/image";
import Link from "next/link";
import { TextLinkLabel } from "@/components/ui/ButtonLink";
import type { Doctor } from "@/data/doctors";
import { cn } from "@/lib/utils";

type DoctorCardProps = {
  doctor: Doctor;
  /** Link the card to the dentist's profile on the team page. */
  linked?: boolean;
  className?: string;
};

/**
 * Dentist card with an arched portrait. Portraits are shown in a soft
 * monochrome that warms to full colour on hover, which keeps a varied set of
 * clinic photographs visually consistent.
 */
export function DoctorCard({ doctor, linked = true, className }: DoctorCardProps) {
  const body = (
    <>
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[13.5rem] overflow-hidden rounded-b-[1.25rem] rounded-t-[999px] bg-champagne">
        {doctor.image ? (
          <Image
            src={doctor.image}
            alt={`${doctor.name}, ${doctor.role.replace(" · ", " and ")} at ToothCraft`}
            fill
            sizes="216px"
            className="portrait-tone object-cover object-[50%_20%] group-hover:scale-[1.04]"
          />
        ) : null}
        <span
          aria-hidden
          className="absolute inset-0 bg-gold/15 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0"
        />
      </div>
      <div className="mt-6 text-center">
        <h3 className="font-display text-[1.6rem] font-medium leading-tight text-charcoal">{doctor.name}</h3>
        <p className="label-caps mt-2 text-gold-deep">{doctor.qualification}</p>
        <p className="mt-2.5 text-[0.875rem] leading-snug text-stone">{doctor.role}</p>
        {linked ? <TextLinkLabel className="mt-5 text-charcoal">View Profile</TextLinkLabel> : null}
      </div>
    </>
  );

  const classes = cn(
    "group block h-full rounded-[1.75rem] bg-paper px-4 pb-7 pt-5 transition-shadow duration-700 ease-luxe hover:shadow-lift sm:px-6 sm:pt-6",
    className,
  );

  return linked ? (
    <Link href={`/dentists#${doctor.id}`} className={classes}>
      {body}
    </Link>
  ) : (
    <div className={classes}>{body}</div>
  );
}
