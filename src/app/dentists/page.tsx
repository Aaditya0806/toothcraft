import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clinicLeads, consultantCount, consultants, doctors } from "@/data/doctors";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Dentists — Dental Surgeons & Specialists in Chennai",
  description:
    "Meet the ToothCraft team: dental surgeons, resident dentists and consultant specialists in endodontics, orthodontics, implants, oral surgery, gum care and children's dentistry.",
  path: "/dentists",
});

export default function DentistsPage() {
  const [founder, ...team] = doctors;

  return (
    <>
      <PageHero
        eyebrow="Our Dentists"
        title="The people behind [[every confident smile.]]"
        lede="ToothCraft is led by dental surgeons and supported by consultant specialists, so that the right expertise is on hand for every kind of treatment."
        crumbs={[{ name: "Our Dentists", path: "/dentists" }]}
      >
        <ButtonLink href="/contact#book">Book an Appointment</ButtonLink>
        <ButtonLink href="#consultants" variant="outline" arrow={false}>
          Consultant Specialists
        </ButtonLink>
      </PageHero>

      {/* Founder */}
      <section className="section-y" id={founder.id}>
        <div className="wrap grid gap-y-12 lg:grid-cols-12 lg:items-center lg:gap-x-16">
          <Reveal className="lg:col-span-4">
            <div className="group relative mx-auto aspect-[4/5] w-full max-w-[17rem] overflow-hidden rounded-b-[1.5rem] rounded-t-[999px] bg-champagne lg:mx-0">
              <Image
                src={founder.image ?? ""}
                alt={`${founder.name}, founder of ToothCraft`}
                fill
                sizes="272px"
                className="portrait-tone object-cover object-[50%_20%]"
              />
              <span aria-hidden className="absolute inset-0 bg-gold/15 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />
            </div>
          </Reveal>
          <div className="lg:col-span-8">
            <SectionHeading eyebrow="Founder" title={`${founder.name}, [[${founder.qualification}]]`} size="md" />
            <Reveal delay={0.15}>
              <p className="label-caps mt-6 text-stone">{founder.role}</p>
              <p className="mt-6 max-w-2xl font-display text-[1.6rem] leading-snug text-charcoal sm:text-[1.85rem]">
                ToothCraft began in 2007 as a single-chair clinic at St. Thomas Mount. Today it is a
                multi-location practice — built on the same idea of personal, carefully planned care.
              </p>
              <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-stone">
                Dr. Anand consults at the ToothCraft clinic in Saidapet.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-y bg-sand">
        <div className="wrap">
          <SectionHeading
            eyebrow="The Team"
            title="Dental surgeons and [[specialist dentists.]]"
            size="md"
            lede="Names, qualifications and roles are listed as published by the clinic."
            className="max-w-3xl"
          />
          <Stagger gap={0.07} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((doctor) => (
              <StaggerItem
                as="article"
                key={doctor.id}
                className="group flex scroll-mt-28 gap-6 rounded-[1.75rem] bg-paper p-6 transition-shadow duration-700 ease-luxe hover:shadow-lift sm:p-7"
              >
                <div id={doctor.id} className="relative aspect-[4/5] w-[7.25rem] shrink-0 scroll-mt-32 overflow-hidden rounded-b-[1rem] rounded-t-[999px] bg-champagne">
                  {doctor.image ? (
                    <Image
                      src={doctor.image}
                      alt={`${doctor.name}, ${doctor.role} at ToothCraft`}
                      fill
                      sizes="116px"
                      className="portrait-tone object-cover object-[50%_18%]"
                    />
                  ) : null}
                  <span aria-hidden className="absolute inset-0 bg-gold/15 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-[1.6rem] font-medium leading-tight">{doctor.name}</h3>
                  <p className="label-caps mt-2 text-gold-deep">{doctor.qualification}</p>
                  <p className="mt-3 text-[0.9375rem] font-semibold text-charcoal">{doctor.role}</p>
                  <p className="mt-2 text-[0.9063rem] leading-relaxed text-stone">{doctor.intro}</p>
                  {doctor.focus.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {doctor.focus.map((area) => (
                        <li key={area} className="label-caps rounded-full border hairline px-3 py-1.5 text-stone">
                          {area}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-10 rounded-[1.75rem] border hairline p-6 sm:p-8">
            <p className="eyebrow text-gold-deep">Also consulting at our clinics</p>
            <ul className="mt-5 flex flex-wrap gap-x-12 gap-y-4">
              {clinicLeads.map((lead) => (
                <li key={lead.name}>
                  <span className="font-display text-[1.5rem] leading-none">{lead.name}</span>
                  <span className="mt-1.5 block text-[0.875rem] text-stone">ToothCraft {lead.clinic}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Consultants */}
      <section id="consultants" className="grain section-y relative isolate scroll-mt-10 bg-charcoal text-ivory">
        <div className="wrap grid gap-y-14 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                tone="light"
                eyebrow="Consultant Specialists"
                title={`${consultantCount} specialists, [[six fields of dentistry.]]`}
                size="md"
                lede="When your treatment calls for specialist skills, our consultant specialists diagnose, plan and carry out your care."
              />
            </div>
          </div>
          <Stagger as="dl" gap={0.08} className="border-t hairline-light lg:col-span-7">
            {consultants.map((group) => (
              <StaggerItem
                key={group.speciality}
                className="grid gap-x-10 gap-y-4 border-b hairline-light py-8 sm:grid-cols-[1fr_1.1fr]"
              >
                <dt>
                  <span className="display-sm block text-ivory">{group.speciality}</span>
                  <span className="mt-2 block text-[0.9063rem] text-ivory/55">{group.description}</span>
                </dt>
                <dd>
                  <ul className="space-y-2 text-[1rem] text-ivory/85">
                    {group.members.map((member) => (
                      <li key={member} className="flex items-baseline gap-3">
                        <span aria-hidden className="h-px w-4 shrink-0 translate-y-[-0.3em] bg-gold" />
                        {member}
                      </li>
                    ))}
                  </ul>
                </dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <div className="pt-20 lg:pt-28">
        <CtaBand title="Meet the team in person. [[Book a consultation.]]" />
      </div>
      <JsonLd data={breadcrumbSchema([{ name: "Our Dentists", path: "/dentists" }])} />
    </>
  );
}
