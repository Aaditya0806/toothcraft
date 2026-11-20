import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { TreatmentsBrowser } from "@/components/sections/TreatmentsBrowser";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/data/site";
import { getTreatment, services } from "@/data/treatments";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Dental Treatments in Chennai",
  description:
    "Explore dental treatments at ToothCraft, Chennai: dental implants, root canal treatment, orthodontics, cosmetic dentistry, veneers, teeth whitening, crowns, bridges, dentures and children's dentistry.",
  path: "/treatments",
});

const ordered = [...services].sort((a, b) => Number(a.kind === "category") - Number(b.kind === "category"));

export default function TreatmentsPage() {
  const guide = getTreatment("brushing-techniques");

  return (
    <>
      <PageHero
        eyebrow="Dental Treatments"
        title="Every treatment your smile may need, [[thoughtfully delivered.]]"
        lede="From a routine professional clean to implants and complete smile makeovers, ToothCraft offers a full range of dental care — planned around you and explained clearly at every step."
        crumbs={[{ name: "Treatments", path: "/treatments" }]}
      >
        <ButtonLink href="/contact#book">Book a Consultation</ButtonLink>
      </PageHero>

      <section className="pb-24 pt-14 lg:pb-32 lg:pt-20">
        <div className="wrap">
          <TreatmentsBrowser treatments={ordered} />
        </div>
      </section>

      {guide ? (
        <section className="pb-24 lg:pb-32">
          <div className="wrap">
            <Reveal>
              <Link
                href={`/treatments/${guide.slug}`}
                className="group grid overflow-hidden rounded-[2rem] bg-sand md:grid-cols-[1fr_1.4fr]"
              >
                <div className="relative min-h-[14rem]">
                  <Image
                    src={guide.image}
                    alt={guide.imageAlt}
                    fill
                    sizes="(min-width: 768px) 40vw, 92vw"
                    className="object-cover transition-transform duration-[1600ms] ease-luxe group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                  <p className="eyebrow text-gold-deep">Patient Guide</p>
                  <h2 className="display-md mt-5">Brushing techniques, explained simply.</h2>
                  <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-stone">{guide.summary}</p>
                  <span className="link-line group-line mt-8 self-start text-charcoal">
                    <span>Read the Guide</span>
                    <ArrowUpRight aria-hidden className="link-icon size-4" strokeWidth={1.75} />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      ) : null}

      <CtaBand
        title="Not sure where to begin? [[Start with a consultation.]]"
        text="Tell us what is bothering you, or what you would like to change. Your dentist will examine your teeth and explain the options that suit you."
      />

      <JsonLd data={breadcrumbSchema([{ name: "Treatments", path: "/treatments" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Dental treatments at ToothCraft",
          itemListElement: services.map((treatment, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: treatment.name,
            url: `${site.url}/treatments/${treatment.slug}`,
          })),
        }}
      />
    </>
  );
}
