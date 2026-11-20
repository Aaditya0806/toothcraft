import Image from "next/image";
import { Check, Mail, Phone } from "lucide-react";
import { Testimonials } from "@/components/home/Testimonials";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { tourismPoints, tourismSteps } from "@/data/content";
import { site, whatsappLink } from "@/data/site";
import { testimonials } from "@/data/testimonials";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { pad } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Dental Tourism in Chennai, India",
  description:
    "Dental treatment in Chennai for international patients. ToothCraft shares a treatment plan and estimate before you travel and can help with airport pickup.",
  path: "/dental-tourism",
});

const tourismMessage =
  "Hello ToothCraft, I am an international patient and would like to enquire about dental treatment in Chennai.";

export default function DentalTourismPage() {
  return (
    <>
      <PageHero
        eyebrow="Dental Tourism"
        title="A warm Chennai welcome for [[international patients.]]"
        lede="Many patients combine their dental care with a visit to Chennai. Tell us what you need, and we will help you plan your treatment before you travel."
        crumbs={[{ name: "Dental Tourism", path: "/dental-tourism" }]}
        image={{
          src: "/images/stock/shore-temple.jpg",
          alt: "The Shore Temple at Mahabalipuram, near Chennai",
          focal: "40% 50%",
        }}
      >
        <ButtonLink href="/contact#book">Send a Treatment Enquiry</ButtonLink>
        <ButtonLink
          href={whatsappLink(tourismMessage)}
          variant="outline"
          arrow={false}
          external
          icon={<WhatsAppIcon className="size-4" />}
        >
          WhatsApp Us
        </ButtonLink>
      </PageHero>

      {/* Why Chennai + ToothCraft */}
      <section className="section-y">
        <div className="wrap grid gap-y-16 lg:grid-cols-12 lg:items-center lg:gap-x-16">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Care & Travel, Together"
              title="Dental treatment, [[and a city worth visiting.]]"
              size="md"
            />
            <Reveal delay={0.15}>
              <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-stone">
                <p>
                  As the cost of dental care rises in many countries, travelling for treatment has
                  become a practical choice for more people. Chennai is one of India&rsquo;s
                  best-loved destinations for it — home to one of the longest beaches in the world
                  and a short drive from the historic shore temples of Mahabalipuram.
                </p>
                <p>
                  ToothCraft is a multi-speciality dental clinic that uses current techniques,
                  instruments and materials. Patients have travelled to us from countries including
                  Iraq and Oman for their dental needs.
                </p>
              </div>
            </Reveal>
            <Stagger as="ul" gap={0.08} className="mt-9 space-y-4">
              {tourismPoints.map((point) => (
                <StaggerItem as="li" key={point} y={16} className="flex gap-4 text-[0.9688rem] text-charcoal">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-champagne text-gold-deep">
                    <Check aria-hidden className="size-3.5" strokeWidth={2.2} />
                  </span>
                  {point}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8">
            <ImageReveal parallax strength={5} className="aspect-[4/5] rounded-[2rem] bg-champagne">
              <Image
                src="/images/stock/chennai-coast.jpg"
                alt="Waves at golden hour on a sandy beach"
                fill
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="object-cover object-[50%_62%]"
              />
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section-y bg-sand">
        <div className="wrap">
          <SectionHeading
            eyebrow="Making Your Visit Trouble-Free"
            title="How it works, [[from enquiry to treatment.]]"
            size="md"
            className="max-w-3xl"
          />
          <Stagger as="ol" gap={0.09} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tourismSteps.map((step, index) => (
              <StaggerItem as="li" key={step.title} className="rounded-[1.75rem] bg-paper p-7 sm:p-8">
                <span className="font-display text-[3rem] leading-none text-gold-deep">{pad(index + 1)}</span>
                <h3 className="mt-6 font-display text-[1.55rem] font-medium leading-tight">{step.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone">{step.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Testimonials */}
      <section className="grain section-y relative isolate bg-charcoal text-ivory">
        <div className="wrap">
          <Reveal y={14}>
            <Eyebrow tone="light">International Patient Testimonials</Eyebrow>
          </Reveal>
          <h2 className="sr-only">What international patients say</h2>
          <Reveal className="mt-12 lg:mt-16" y={32} delay={0.1}>
            <Testimonials items={testimonials} />
          </Reveal>
          <p className="mt-10 max-w-2xl text-[0.8125rem] leading-relaxed text-ivory/45">
            Testimonials are from ToothCraft patients and have been lightly edited for spelling and
            length. They reflect individual experiences; treatment outcomes vary from person to person.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="section-y">
        <div className="wrap grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="International Enquiries"
              title="Start with [[a conversation.]]"
              size="md"
              lede="Email or call us with details of your dental needs — photographs and recent X-rays are helpful if you have them. We will reply with a treatment plan, an estimate and the time you should allow."
            />
          </div>
          <Stagger as="ul" gap={0.08} className="border-t hairline lg:col-span-7">
            {site.tourismPhones.map((phone) => (
              <StaggerItem as="li" key={phone.tel} y={16} className="border-b hairline">
                <a href={`tel:${phone.tel}`} className="group flex items-center gap-6 py-6">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border hairline text-gold-deep transition-colors duration-500 ease-luxe group-hover:border-charcoal group-hover:bg-charcoal group-hover:text-ivory">
                    <Phone aria-hidden className="size-[1.125rem]" strokeWidth={1.5} />
                  </span>
                  <span>
                    <span className="label-caps block text-stone">Call or WhatsApp</span>
                    <span className="mt-1 block font-display text-[1.9rem] leading-none">{phone.display}</span>
                  </span>
                </a>
              </StaggerItem>
            ))}
            <StaggerItem as="li" y={16} className="border-b hairline">
              <a href={`mailto:${site.email}`} className="group flex items-center gap-6 py-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border hairline text-gold-deep transition-colors duration-500 ease-luxe group-hover:border-charcoal group-hover:bg-charcoal group-hover:text-ivory">
                  <Mail aria-hidden className="size-[1.125rem]" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="label-caps block text-stone">Email</span>
                  <span className="mt-1 block font-display text-[1.9rem] leading-none">{site.email}</span>
                </span>
              </a>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <CtaBand
        title="Planning treatment in Chennai? [[We will help you prepare.]]"
        text="Send us your enquiry and we will share a treatment plan, an estimate and the number of days to allow — before you travel."
        whatsappMessage={tourismMessage}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Dental Tourism", path: "/dental-tourism" }])} />
    </>
  );
}
