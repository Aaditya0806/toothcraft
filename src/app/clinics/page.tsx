import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ClinicsExplorer } from "@/components/sections/ClinicsExplorer";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clinics } from "@/data/clinics";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Clinics — Dental Clinics in Saidapet, Ashok Nagar & Mugalivakkam",
  description:
    "Find a ToothCraft dental clinic in Chennai. Addresses, phone numbers, consulting hours and directions for our clinics in Saidapet, Ashok Nagar and Mugalivakkam.",
  path: "/clinics",
});

export default function ClinicsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Clinics"
        title="Three clinics across Chennai, [[one standard of care.]]"
        lede="Wherever you are in the city, a ToothCraft clinic is close by. Every location consults from 9 AM to 9 PM, Monday to Sunday."
        crumbs={[{ name: "Our Clinics", path: "/clinics" }]}
      >
        <ButtonLink href="/contact#book">Book an Appointment</ButtonLink>
        <ButtonLink href="/virtual-tour" variant="outline" arrow={false}>
          Take the Virtual Tour
        </ButtonLink>
      </PageHero>

      <section className="section-y">
        <div className="wrap">
          <Reveal y={30}>
            <ClinicsExplorer clinics={clinics} />
          </Reveal>
        </div>
      </section>

      {/* Static list — every clinic's details are present in the page for search engines and quick scanning. */}
      <section className="section-y bg-sand">
        <div className="wrap">
          <SectionHeading eyebrow="All Locations" title="Choose your [[nearest clinic.]]" size="md" />
          <Stagger gap={0.1} className="mt-14 grid gap-6 lg:grid-cols-3">
            {clinics.map((clinic) => (
              <StaggerItem as="article" key={clinic.slug} className="group flex flex-col overflow-hidden rounded-[2rem] bg-paper">
                <Link href={`/clinics/${clinic.slug}`} className="relative block aspect-[4/3] overflow-hidden" tabIndex={-1} aria-hidden>
                  <Image
                    src={clinic.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 31vw, 92vw"
                    className="photo-grade object-cover transition-transform duration-[1600ms] ease-luxe group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <h3 className="font-display text-[2.1rem] leading-none">
                    <Link href={`/clinics/${clinic.slug}`} className="transition-colors hover:text-gold-deep">
                      {clinic.name}
                    </Link>
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone">{clinic.summary}</p>
                  <ul className="mt-6 space-y-3 border-t hairline pt-6 text-[0.9375rem]">
                    <li className="flex gap-3">
                      <MapPin aria-hidden className="mt-0.5 size-[1.125rem] shrink-0 text-gold-deep" strokeWidth={1.5} />
                      <address className="not-italic leading-relaxed">
                        {clinic.addressLines.join(", ")}
                        <span className="block text-stone">{clinic.landmark}</span>
                      </address>
                    </li>
                    <li className="flex gap-3">
                      <Phone aria-hidden className="mt-0.5 size-[1.125rem] shrink-0 text-gold-deep" strokeWidth={1.5} />
                      <span className="flex flex-wrap gap-x-4">
                        {clinic.phones.map((phone) => (
                          <a
                            key={phone.tel}
                            href={`tel:${phone.tel}`}
                            className="font-semibold underline decoration-gold/60 underline-offset-4 hover:text-gold-deep"
                          >
                            {phone.display}
                          </a>
                        ))}
                      </span>
                    </li>
                    <li className="flex gap-3 text-stone">
                      <Clock aria-hidden className="mt-0.5 size-[1.125rem] shrink-0 text-gold-deep" strokeWidth={1.5} />
                      {clinic.hours}, {clinic.days}
                    </li>
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                    <Link href={`/clinics/${clinic.slug}`} className="link-line text-charcoal">
                      <span>View Clinic</span>
                      <ArrowUpRight aria-hidden className="link-icon size-4" strokeWidth={1.75} />
                    </Link>
                    <a
                      href={clinic.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label-caps text-stone underline underline-offset-4 hover:text-charcoal"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <div className="pt-20 lg:pt-28">
        <CtaBand />
      </div>
      <JsonLd data={breadcrumbSchema([{ name: "Our Clinics", path: "/clinics" }])} />
    </>
  );
}
