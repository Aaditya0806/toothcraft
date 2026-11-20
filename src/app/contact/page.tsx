import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { BookingSection } from "@/components/sections/BookingSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clinics } from "@/data/clinics";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact & Book an Appointment",
  description:
    "Book a dental appointment at ToothCraft, Chennai. Request a time online, call, or message us on WhatsApp. Clinics in Saidapet, Ashok Nagar and Mugalivakkam, open 9 AM – 9 PM all week.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <BookingSection as="h1" className="pt-36 sm:pt-40 lg:pt-48" />

      <section className="section-y">
        <div className="wrap">
          <SectionHeading
            eyebrow="Visit a Clinic"
            title="Find us [[across Chennai.]]"
            size="md"
            lede="Walk in, call ahead or request an appointment — each clinic consults from 9 AM to 9 PM, Monday to Sunday."
            className="max-w-3xl"
          />

          <Stagger gap={0.1} className="mt-14 grid gap-6 lg:grid-cols-3">
            {clinics.map((clinic) => (
              <StaggerItem as="article" key={clinic.slug} className="flex flex-col overflow-hidden rounded-[2rem] border hairline bg-paper">
                <div className="relative aspect-[4/3] bg-champagne">
                  <iframe
                    title={`Map showing ToothCraft ${clinic.name}`}
                    src={clinic.mapEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 size-full border-0 grayscale-[0.3]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <h2 className="font-display text-[2.1rem] leading-none">{clinic.name}</h2>
                  <ul className="mt-6 space-y-3.5 text-[0.9375rem]">
                    <li className="flex gap-3">
                      <MapPin aria-hidden className="mt-0.5 size-[1.125rem] shrink-0 text-gold-deep" strokeWidth={1.5} />
                      <address className="not-italic leading-relaxed">
                        {clinic.addressLines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                        <span className="block text-stone">Landmark: {clinic.landmark}</span>
                      </address>
                    </li>
                    <li className="flex gap-3">
                      <Phone aria-hidden className="mt-0.5 size-[1.125rem] shrink-0 text-gold-deep" strokeWidth={1.5} />
                      <span className="flex flex-col gap-1">
                        {clinic.phones.map((phone) => (
                          <span key={phone.tel}>
                            <a
                              href={`tel:${phone.tel}`}
                              className="font-semibold underline decoration-gold/60 underline-offset-4 hover:text-gold-deep"
                            >
                              {phone.display}
                            </a>
                            <span className="text-stone"> · {phone.label}</span>
                          </span>
                        ))}
                      </span>
                    </li>
                    <li className="flex gap-3 text-stone">
                      <Clock aria-hidden className="mt-0.5 size-[1.125rem] shrink-0 text-gold-deep" strokeWidth={1.5} />
                      <span>
                        {clinic.hours}, {clinic.days}
                        <span className="block">{clinic.lead}</span>
                      </span>
                    </li>
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-3 pt-8">
                    <a
                      href={clinic.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm"
                    >
                      <Navigation aria-hidden className="size-4" strokeWidth={1.75} />
                      <span>Directions</span>
                    </a>
                    <Link href={`/clinics/${clinic.slug}`} className="btn btn-outline btn-sm">
                      <span>Clinic Details</span>
                      <ArrowUpRight aria-hidden className="btn-icon size-4" strokeWidth={1.75} />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-12">
            <p className="max-w-2xl text-[0.875rem] leading-relaxed text-stone">
              In a dental emergency, please call the clinic nearest you directly rather than using the
              online form, so that our team can advise you straight away.
            </p>
          </Reveal>
        </div>
      </section>

      <JsonLd data={breadcrumbSchema([{ name: "Contact", path: "/contact" }])} />
    </>
  );
}
