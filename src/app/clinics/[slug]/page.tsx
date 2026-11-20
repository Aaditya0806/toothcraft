import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock, Landmark, MapPin, Navigation, Phone, UserRound } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { ImageGrid } from "@/components/sections/ImageGrid";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink, TextLink } from "@/components/ui/ButtonLink";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clinics, getClinic } from "@/data/clinics";
import { tourSets } from "@/data/gallery";
import { site, whatsappLink } from "@/data/site";
import { services } from "@/data/treatments";
import { JsonLd, breadcrumbSchema, clinicSchema, pageMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return clinics.map((clinic) => ({ slug: clinic.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const clinic = getClinic(slug);
  if (!clinic) return {};
  return pageMetadata({
    title: `Dental Clinic in ${clinic.name}, Chennai`,
    description: `ToothCraft dental clinic in ${clinic.name}, Chennai — ${clinic.addressLines.join(", ")}. Open ${clinic.hours}, ${clinic.days}. Call ${clinic.phones[0].display} or book online.`,
    path: `/clinics/${clinic.slug}`,
  });
}

export default async function ClinicPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const clinic = getClinic(slug);
  if (!clinic) notFound();

  const photos = (tourSets.find((set) => set.clinic === clinic.slug)?.images ?? []).map((image) => ({
    ...image,
    caption: image.label,
  }));
  const others = clinics.filter((entry) => entry.slug !== clinic.slug);
  const treatmentsOffered = services.filter((treatment) => treatment.kind === "treatment");
  const crumbs = [
    { name: "Our Clinics", path: "/clinics" },
    { name: clinic.name, path: `/clinics/${clinic.slug}` },
  ];
  const bookHref = `/contact?clinic=${clinic.slug}#book`;
  const enquiry = `Hello ToothCraft, I would like to book an appointment at the ${clinic.name} clinic.`;

  const details = [
    {
      label: "Address",
      icon: MapPin,
      content: (
        <address className="not-italic leading-relaxed">
          {clinic.addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      ),
    },
    { label: "Landmark", icon: Landmark, content: clinic.landmark },
    {
      label: "Phone",
      icon: Phone,
      content: (
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
      ),
    },
    { label: "Consulting hours", icon: Clock, content: `${clinic.hours}, ${clinic.days}` },
    { label: "Dentist", icon: UserRound, content: clinic.lead },
  ];

  return (
    <>
      <PageHero
        eyebrow="ToothCraft Dental Clinic"
        title={`Dental Clinic in ${clinic.name}, [[Chennai.]]`}
        lede={clinic.intro}
        crumbs={crumbs}
        image={{ src: clinic.image, alt: clinic.imageAlt, grade: true }}
        shape="rounded"
      >
        <ButtonLink href={bookHref}>Book at {clinic.name}</ButtonLink>
        <ButtonLink
          href={clinic.directionsUrl}
          variant="outline"
          arrow={false}
          external
          icon={<Navigation aria-hidden className="size-4" strokeWidth={1.75} />}
        >
          Get Directions
        </ButtonLink>
      </PageHero>

      {/* Details + map */}
      <section className="section-y">
        <div className="wrap grid gap-8 lg:grid-cols-12 lg:gap-x-10">
          <Reveal className="lg:col-span-5">
            <div className="h-full rounded-[2rem] bg-sand p-7 sm:p-10">
              <p className="eyebrow text-gold-deep">Visit Us</p>
              <h2 className="display-md mt-5">ToothCraft {clinic.name}</h2>
              <dl className="mt-8 divide-y divide-charcoal/10 border-y hairline">
                {details.map(({ label, icon: Icon, content }) => (
                  <div key={label} className="grid grid-cols-[1.5rem_1fr] gap-x-4 py-5">
                    <Icon aria-hidden className="mt-1 size-[1.125rem] text-gold-deep" strokeWidth={1.5} />
                    <div>
                      <dt className="label-caps text-stone">{label}</dt>
                      <dd className="mt-1.5 text-[1rem] text-charcoal">{content}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`tel:${clinic.phones[0].tel}`} className="btn btn-sm">
                  <Phone aria-hidden className="size-4" strokeWidth={1.75} />
                  <span>Call Now</span>
                </a>
                <a
                  href={whatsappLink(enquiry)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  <WhatsAppIcon className="size-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="relative h-full min-h-[22rem] overflow-hidden rounded-[2rem] bg-champagne lg:min-h-[34rem]">
              <iframe
                title={`Map showing ToothCraft ${clinic.name}`}
                src={clinic.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0 grayscale-[0.3]"
              />
              <a
                href={clinic.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-light btn-sm absolute bottom-5 left-5 shadow-lift"
              >
                <Navigation aria-hidden className="size-4" strokeWidth={1.75} />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Photos */}
      {photos.length > 0 ? (
        <section className="section-y bg-sand">
          <div className="wrap">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading eyebrow="Inside the Clinic" title="Take a [[look around.]]" size="md" />
              <Reveal delay={0.2} className="shrink-0">
                <TextLink href={`/virtual-tour?clinic=${clinic.slug}`}>Full Virtual Tour</TextLink>
              </Reveal>
            </div>
            <Reveal className="mt-12" y={30}>
              <ImageGrid
                images={photos.slice(0, 6)}
                grade
                aspect="aspect-[4/3]"
                columns="grid-cols-2 lg:grid-cols-3"
              />
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* Treatments */}
      <section className="section-y">
        <div className="wrap grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={`Treatments in ${clinic.name}`}
              title="Comprehensive care, [[close to home.]]"
              size="md"
              lede="ToothCraft offers a full range of dental treatments. Your dentist will confirm what can be carried out at this clinic when you book."
            />
            <Reveal delay={0.2} className="mt-9">
              <ButtonLink href="/treatments" variant="outline">
                View All Treatments
              </ButtonLink>
            </Reveal>
          </div>
          <Stagger as="ul" gap={0.03} className="grid border-t hairline sm:grid-cols-2 sm:gap-x-10 lg:col-span-7">
            {treatmentsOffered.map((treatment) => (
              <StaggerItem as="li" key={treatment.slug} y={14} className="border-b hairline">
                <Link
                  href={`/treatments/${treatment.slug}`}
                  className="group flex items-center justify-between gap-4 py-4 text-[1.0625rem] text-charcoal"
                >
                  <span className="transition-transform duration-500 ease-luxe group-hover:translate-x-1.5">
                    {treatment.name}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 text-gold-deep opacity-0 transition-all duration-500 ease-luxe group-hover:opacity-100"
                    strokeWidth={1.75}
                  />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Other clinics */}
      <section className="pb-20 lg:pb-28">
        <div className="wrap">
          <p className="eyebrow text-gold-deep">Our Other Clinics</p>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {others.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={`/clinics/${entry.slug}`}
                  className="group flex items-center justify-between gap-6 rounded-[1.75rem] border hairline bg-paper p-7 transition-shadow duration-700 ease-luxe hover:shadow-lift sm:p-8"
                >
                  <span>
                    <span className="block font-display text-[2rem] leading-none">{entry.name}</span>
                    <span className="mt-3 block text-[0.9375rem] text-stone">{entry.addressLines.join(", ")}</span>
                  </span>
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border hairline transition-all duration-700 ease-luxe group-hover:border-gold group-hover:bg-gold">
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 transition-transform duration-700 ease-luxe group-hover:rotate-45"
                      strokeWidth={1.5}
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={`Visit ToothCraft [[${clinic.name}.]]`}
        text={`Request an appointment online or call ${clinic.phones[0].display}. We are open ${site.hours.label}, ${site.hours.days}.`}
        bookHref={bookHref}
        whatsappMessage={enquiry}
      />

      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={{ "@context": "https://schema.org", ...clinicSchema(clinic) }} />
    </>
  );
}
