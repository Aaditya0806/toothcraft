import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Phone } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Accordion } from "@/components/sections/Accordion";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { TreatmentCard } from "@/components/sections/TreatmentCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clinics } from "@/data/clinics";
import { site, whatsappLink } from "@/data/site";
import { getTreatment, relatedTreatments, treatmentCategories, treatments } from "@/data/treatments";
import { JsonLd, breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return treatments.map((treatment) => ({ slug: treatment.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatment(slug);
  if (!treatment) return {};
  return pageMetadata({
    title: treatment.seoTitle,
    description: treatment.seoDescription,
    path: `/treatments/${treatment.slug}`,
  });
}

export default async function TreatmentPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const treatment = getTreatment(slug);
  if (!treatment) notFound();

  const category = treatmentCategories.find((entry) => entry.id === treatment.category);
  const included = (treatment.includes ?? [])
    .map((entry) => getTreatment(entry))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const related = relatedTreatments(treatment, 3).filter(
    (entry) => !included.some((item) => item.slug === entry.slug),
  );
  const isGuide = treatment.kind === "guide";
  const bookHref = isGuide ? "/contact#book" : `/contact?treatment=${treatment.slug}#book`;
  const enquiry = `Hello ToothCraft, I would like to enquire about ${treatment.name}.`;
  const crumbs = [
    { name: "Treatments", path: "/treatments" },
    { name: treatment.name, path: `/treatments/${treatment.slug}` },
  ];

  // Answers flattened to plain text for structured data.
  const faqText = treatment.faqs.map((faq) => ({
    q: faq.q,
    a: [faq.list?.join("; "), faq.a].filter(Boolean).join(". "),
  }));

  return (
    <>
      <PageHero
        eyebrow={isGuide ? "Patient Guide" : (category?.clinical ?? "Treatment")}
        title={`${treatment.name}. [[${treatment.tagline}.]]`}
        lede={treatment.summary}
        crumbs={crumbs}
        image={{ src: treatment.image, alt: treatment.imageAlt, focal: treatment.focal }}
      >
        <ButtonLink href={bookHref}>{isGuide ? "Book a Check-up" : "Book a Consultation"}</ButtonLink>
        <ButtonLink href="/treatments" variant="outline" arrow={false}>
          All Treatments
        </ButtonLink>
      </PageHero>

      {/* Overview */}
      <section className="section-y">
        <div className="wrap grid gap-y-14 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-gold-deep">Overview</p>
              <div className="mt-7 space-y-6">
                <p className="font-display text-[1.65rem] leading-snug text-charcoal sm:text-[2rem]">
                  {treatment.intro[0]}
                </p>
                {treatment.intro.slice(1).map((paragraph) => (
                  <p key={paragraph} className="max-w-2xl text-[1.0625rem] leading-relaxed text-stone">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Enquiry card */}
          <aside className="lg:col-span-5 xl:col-span-4 xl:col-start-9">
            <Reveal delay={0.15} className="lg:sticky lg:top-28">
              <div className="rounded-[2rem] bg-sand p-7 sm:p-9">
                <p className="eyebrow text-gold-deep">
                  {isGuide ? "Time for a check-up?" : "Considering this treatment?"}
                </p>
                <p className="mt-5 font-display text-[1.75rem] leading-tight">
                  Speak with a ToothCraft dentist about what is right for you.
                </p>
                <div className="mt-7 flex flex-col gap-3">
                  <Link href={bookHref} className="btn">
                    <span>Request an Appointment</span>
                    <ArrowUpRight aria-hidden className="btn-icon size-4" strokeWidth={1.75} />
                  </Link>
                  <a
                    href={whatsappLink(enquiry)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    <WhatsAppIcon className="size-4" />
                    <span>WhatsApp Enquiry</span>
                  </a>
                </div>
                <ul className="mt-8 space-y-3 border-t hairline pt-6 text-[0.9063rem]">
                  {clinics.map((clinic) => (
                    <li key={clinic.slug} className="flex items-center justify-between gap-4">
                      <Link href={`/clinics/${clinic.slug}`} className="text-stone hover:text-charcoal">
                        {clinic.name}
                      </Link>
                      <a
                        href={`tel:${clinic.phones[0].tel}`}
                        className="inline-flex items-center gap-2 font-semibold text-charcoal hover:text-gold-deep"
                      >
                        <Phone aria-hidden className="size-3.5 text-gold-deep" strokeWidth={1.75} />
                        {clinic.phones[0].display}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[0.8125rem] text-stone">
                  {site.hours.label}, {site.hours.days}
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Treatments within a category */}
      {included.length > 0 ? (
        <section className="section-y bg-sand">
          <div className="wrap">
            <SectionHeading
              eyebrow={`Within ${treatment.name}`}
              title="Explore the [[individual treatments.]]"
              size="md"
            />
            <Stagger gap={0.08} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {included.map((entry) => (
                <StaggerItem key={entry.slug}>
                  <TreatmentCard
                    treatment={entry}
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw"
                  />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}

      {/* Questions */}
      <section className="section-y bg-paper">
        <div className="wrap grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="Questions & Answers"
                title={isGuide ? "The essentials, [[at a glance.]]" : "What patients [[often ask.]]"}
                size="md"
              />
              <Reveal delay={0.2}>
                <p className="mt-7 text-[0.875rem] leading-relaxed text-stone">
                  This information is general guidance and is not a substitute for professional advice.
                  Suitability, timelines and results vary from person to person; your dentist will
                  advise you after an examination.
                </p>
              </Reveal>
            </div>
          </div>
          <Reveal y={30} className="lg:col-span-8">
            <Accordion items={treatment.faqs} />
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 ? (
        <section className="section-y">
          <div className="wrap">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading eyebrow="Related Treatments" title="You may also [[be interested in.]]" size="md" />
              <Reveal delay={0.2} className="shrink-0">
                <ButtonLink href="/treatments" variant="outline">
                  View All Treatments
                </ButtonLink>
              </Reveal>
            </div>
            <Stagger gap={0.08} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {related.map((entry) => (
                <StaggerItem key={entry.slug}>
                  <TreatmentCard
                    treatment={entry}
                    aspect="aspect-[4/5] lg:aspect-[5/6]"
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
                  />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}

      <CtaBand
        title={
          isGuide
            ? "Healthy habits start [[with a check-up.]]"
            : `Talk to us about [[${treatment.name.toLowerCase()}.]]`
        }
        bookHref={bookHref}
        whatsappMessage={enquiry}
      />

      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqSchema(faqText)} />
    </>
  );
}
