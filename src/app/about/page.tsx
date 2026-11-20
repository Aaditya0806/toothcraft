import Image from "next/image";
import { Check } from "lucide-react";
import { Counter } from "@/components/motion/Counter";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { WhyChoose } from "@/components/home/WhyChoose";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink, TextLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { facts, visitSteps } from "@/data/content";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { pad } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "About ToothCraft — Our Story",
  description:
    "ToothCraft began in 2007 as a single-chair dental clinic in Chennai and has grown into a multi-location practice. Read our story, our approach and what to expect at your visit.",
  path: "/about",
});

const commitments = [
  "The highest quality clinical skills",
  "A relaxing, stress-free and peaceful environment",
  "Affordable dental excellence",
  "An experience that exceeds your expectations",
  "Outstanding service",
];

const assurances = [
  {
    title: "Mercury-free, biocompatible dentistry",
    text: "We offer a holistic approach to dental care, using mercury-free, biocompatible materials.",
  },
  {
    title: "A choice of dentist",
    text: "With a number of dentists on the team, you may choose to be treated by a male or a female dentist.",
  },
  {
    title: "Care for anxious patients",
    text: "We are highly experienced in treating anxious patients, and we take pain control seriously.",
  },
  {
    title: "Strict infection control",
    text: "Every treatment follows our strict cross-infection control policy, supported by the latest sterilisation equipment.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About ToothCraft"
        title="More Than Dentistry. [[A Commitment to Every Smile.]]"
        lede="A multi-speciality dental practice that has cared for Chennai since 2007 — led by dentists who believe good treatment begins with listening."
        crumbs={[{ name: "About Us", path: "/about" }]}
        image={{
          src: "/images/clinic/team-at-reception.jpg",
          alt: "Members of the ToothCraft team standing at the clinic reception",
          focal: "50% 30%",
          grade: true,
        }}
        shape="rounded"
      >
        <ButtonLink href="/contact#book">Book an Appointment</ButtonLink>
        <ButtonLink href="/dentists" variant="outline" arrow={false}>
          Meet Our Dentists
        </ButtonLink>
      </PageHero>

      {/* Story */}
      <section className="section-y">
        <div className="wrap grid gap-y-14 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Our Story"
              title="From a single chair to [[a practice across Chennai.]]"
              size="md"
            />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <div className="space-y-6 text-[1.0625rem] leading-relaxed text-stone">
                <p className="font-display text-[1.6rem] leading-snug text-charcoal sm:text-[1.9rem]">
                  ToothCraft is a multi-speciality dental clinic headed by a group of enthusiastic
                  dentists, with a simple vision: to provide the best dental care possible to every
                  patient.
                </p>
                <p>
                  The practice started in 2007 as a single-chair dental clinic at St. Thomas Mount,
                  Chennai. Over the years it has grown into a multi-location dental practice, so that
                  more people can be cared for closer to home. Today you will find us in Saidapet, Ashok
                  Nagar and Mugalivakkam.
                </p>
                <p>
                  Growth has not changed the way we work. We make sure every patient receives
                  personalised dental care: our doctors communicate with you at a personal level and
                  design a treatment plan according to your individual needs.
                </p>
                <p>
                  We also stay in touch with the latest developments in dentistry, investing in
                  training, equipment, premises and techniques — so that the care you receive is both
                  thoughtful and current.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="wrap mt-20 lg:mt-28">
          <Stagger as="dl" gap={0.1} className="grid grid-cols-2 border-y hairline lg:grid-cols-4">
            {facts.map((fact, index) => (
              <StaggerItem
                key={fact.label}
                y={20}
                className={
                  "flex flex-col-reverse justify-end gap-3 px-2 py-9 sm:px-6 lg:py-12 " +
                  (index % 2 === 1 ? "border-l hairline " : "") +
                  (index >= 2 ? "border-t hairline lg:border-t-0 " : "") +
                  (index === 2 ? "lg:border-l " : "")
                }
              >
                <dt>
                  <span className="label-caps block text-charcoal">{fact.label}</span>
                  <span className="mt-1 block text-[0.875rem] text-stone">{fact.detail}</span>
                </dt>
                <dd className="font-display text-[3.25rem] leading-none text-charcoal sm:text-[4.5rem]">
                  <Counter value={fact.value} plain={fact.plain} />
                </dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Promise */}
      <section className="section-y bg-sand">
        <div className="wrap grid gap-y-16 lg:grid-cols-12 lg:items-center lg:gap-x-16">
          <div className="lg:col-span-6">
            <ImageReveal parallax strength={5} className="aspect-[4/3] rounded-[2rem] bg-champagne">
              <Image
                src="/images/clinic/ashok-nagar-treatment-room-3.jpg"
                alt="A bright treatment room at ToothCraft"
                fill
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="photo-grade object-cover"
              />
            </ImageReveal>
            <p className="label-caps mt-4 text-stone">A ToothCraft treatment room</p>
          </div>
          <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8">
            <SectionHeading
              eyebrow="Our Promise"
              title="Five things you can [[always expect.]]"
              size="md"
              lede="Everyone at ToothCraft is passionate about what they do and will go out of their way to look after you."
            />
            <Stagger as="ol" gap={0.08} className="mt-10 border-t hairline">
              {commitments.map((item, index) => (
                <StaggerItem as="li" key={item} y={16} className="flex items-baseline gap-6 border-b hairline py-5">
                  <span className="label-caps text-gold-deep">{pad(index + 1)}</span>
                  <span className="font-display text-[1.45rem] leading-snug text-charcoal">{item}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <WhyChoose />

      {/* Assurances */}
      <section className="section-y">
        <div className="wrap">
          <SectionHeading
            eyebrow="How We Care"
            title="We listen with respect [[to every concern.]]"
            size="md"
            className="max-w-3xl"
          />
          <Stagger gap={0.08} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {assurances.map((item) => (
              <StaggerItem key={item.title} className="rounded-[1.75rem] border hairline bg-paper p-7">
                <span className="grid size-10 place-items-center rounded-full bg-champagne text-gold-deep">
                  <Check aria-hidden className="size-4" strokeWidth={2} />
                </span>
                <h3 className="mt-6 font-display text-[1.5rem] font-medium leading-tight">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone">{item.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Visit steps */}
      <section className="section-y bg-paper">
        <div className="wrap">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Your Visit"
              title="What to expect, [[step by step.]]"
              size="md"
              lede="Our treatment protocol keeps every visit clear and unhurried, from the first conversation to follow-up."
              className="max-w-3xl"
            />
            <Reveal delay={0.2} className="shrink-0">
              <TextLink href="/faq">Read the FAQs</TextLink>
            </Reveal>
          </div>
          <Stagger as="ol" gap={0.09} className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {visitSteps.map((step, index) => (
              <StaggerItem as="li" key={step.title} className="border-t border-gold pt-6">
                <span className="font-display text-[2.75rem] leading-none text-gold-deep">{pad(index + 1)}</span>
                <h3 className="mt-5 text-[1rem] font-semibold text-charcoal">{step.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-stone">{step.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <div className="bg-paper">
        <CtaBand />
      </div>
      <JsonLd data={breadcrumbSchema([{ name: "About Us", path: "/about" }])} />
    </>
  );
}
