import Image from "next/image";
import { Counter } from "@/components/motion/Counter";
import { ImageReveal, Parallax } from "@/components/motion/ImageReveal";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutHighlights, facts } from "@/data/content";

/** Editorial introduction to ToothCraft with a layered photo composition. */
export function AboutIntro() {
  return (
    <section id="about" className="section-y relative">
      <div className="wrap grid gap-y-24 lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-20">
        {/* Photographs — ToothCraft's own clinic and team */}
        <div className="lg:sticky lg:top-28 lg:col-span-6">
         <div className="relative">
          <ImageReveal parallax strength={5} className="aspect-[4/5] w-[84%] rounded-[2rem] bg-champagne">
            <Image
              src="/images/clinic/ashok-nagar-reception.jpg"
              alt="Reception at ToothCraft, with the Tooth Craft sign above the desk"
              fill
              sizes="(min-width: 1024px) 42vw, 85vw"
              className="photo-grade object-cover object-[42%_50%]"
            />
          </ImageReveal>

          <Parallax distance={36} className="absolute -bottom-[7%] right-0 w-[54%] sm:w-[50%]">
            <Reveal delay={0.25}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border-[6px] border-ivory shadow-lift">
                <Image
                  src="/images/clinic/team-at-reception.jpg"
                  alt="Members of the ToothCraft team at the clinic reception"
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="photo-grade object-cover object-[50%_35%]"
                />
              </div>
            </Reveal>
          </Parallax>

          <Reveal delay={0.4} className="absolute -top-8 right-[3%] sm:right-[5%]">
            <div className="grid size-[6.5rem] place-items-center rounded-full border border-gold bg-ivory text-center sm:size-32">
              <p className="leading-none">
                <span className="label-caps block text-gold-deep">Since</span>
                <span className="mt-1.5 block font-display text-[2rem] sm:text-[2.6rem]">2007</span>
              </p>
            </div>
          </Reveal>
         </div>
        </div>

        {/* Story */}
        <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8">
          <SectionHeading
            eyebrow="About ToothCraft"
            title="More Than Dentistry. [[A Commitment to Every Smile.]]"
          />
          <Reveal delay={0.15}>
            <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-stone">
              <p>
                ToothCraft is a multi-speciality dental clinic that began in 2007 as a single-chair
                practice in Chennai. Over the years it has grown into a multi-location dental practice,
                so that more people can be cared for closer to home.
              </p>
              <p>
                What has not changed is the way we work. Our doctors take the time to speak with you
                personally and design a treatment plan around your individual needs, while keeping in
                step with the latest developments in dentistry.
              </p>
            </div>
          </Reveal>

          <Stagger as="ul" gap={0.07} className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {aboutHighlights.map((item) => (
              <StaggerItem as="li" key={item.title} y={18} className="border-t hairline pt-4">
                <p className="text-[0.9375rem] font-semibold text-charcoal">{item.title}</p>
                <p className="mt-1 text-[0.875rem] leading-relaxed text-stone">{item.text}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="mt-11">
            <ButtonLink href="/about" variant="outline">
              Explore Our Story
            </ButtonLink>
          </Reveal>
        </div>
      </div>

      {/* Verified facts */}
      <div className="wrap mt-24 lg:mt-36">
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
  );
}
