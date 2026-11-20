import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { DoctorCard } from "@/components/sections/DoctorCard";
import { TextLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { consultantCount, consultants, doctors } from "@/data/doctors";

export function DentistsSection() {
  return (
    <section id="dentists" className="section-y bg-sand">
      <div className="wrap">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Meet Our Dental Experts"
            title="The people behind [[every confident smile.]]"
            lede="A team of dental surgeons and specialist dentists who listen first, explain clearly and plan your care together with you."
            className="max-w-3xl"
          />
          <Reveal delay={0.2} className="shrink-0">
            <TextLink href="/dentists">Meet the Full Team</TextLink>
          </Reveal>
        </div>

        <Stagger
          gap={0.07}
          className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:mt-20 lg:grid-cols-4 lg:gap-6"
        >
          {doctors.map((doctor) => (
            <StaggerItem key={doctor.id}>
              <DoctorCard doctor={doctor} />
            </StaggerItem>
          ))}

          {/* Consultant specialists summary */}
          <StaggerItem className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link
              href="/dentists#consultants"
              className="group flex h-full flex-col justify-between gap-10 rounded-[1.75rem] bg-charcoal p-7 text-ivory transition-colors duration-700 ease-luxe sm:p-8"
            >
              <div>
                <p className="eyebrow text-gold-soft">Consultant Specialists</p>
                <p className="mt-6 font-display text-[4.5rem] leading-none">{consultantCount}</p>
                <p className="mt-3 max-w-[16rem] text-[0.9375rem] leading-relaxed text-ivory/70">
                  visiting specialists across {consultants.length} fields of dentistry.
                </p>
              </div>
              <div>
                <ul className="flex flex-wrap gap-x-3 gap-y-1.5 text-[0.8125rem] text-ivory/60 lg:block lg:space-y-1.5">
                  {consultants.map((group) => (
                    <li key={group.speciality}>{group.speciality}</li>
                  ))}
                </ul>
                <span className="mt-7 flex items-center justify-between border-t hairline-light pt-5">
                  <span className="label-caps">See all specialists</span>
                  <span className="grid size-10 place-items-center rounded-full bg-ivory/10 transition-all duration-700 ease-luxe group-hover:bg-gold group-hover:text-charcoal">
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 transition-transform duration-700 ease-luxe group-hover:rotate-45"
                      strokeWidth={1.75}
                    />
                  </span>
                </span>
              </div>
            </Link>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
