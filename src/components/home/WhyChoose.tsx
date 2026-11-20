import Image from "next/image";
import { Armchair, HeartHandshake, Layers, MapPinned, ScanLine, Users } from "lucide-react";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reasons, type Reason } from "@/data/content";
import { pad } from "@/lib/utils";

const icons: Record<Reason["icon"], typeof Users> = {
  heart: HeartHandshake,
  users: Users,
  scan: ScanLine,
  layers: Layers,
  armchair: Armchair,
  map: MapPinned,
};

/** Six reasons, set as a numbered editorial list on a dark ground. */
export function WhyChoose() {
  return (
    <section id="why-toothcraft" className="grain section-y relative isolate bg-charcoal text-ivory">
      <div className="wrap grid gap-y-14 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              tone="light"
              eyebrow="Why Choose ToothCraft"
              title="Care that feels [[considered,]] from the first hello."
              lede="Our goal is an experience that exceeds your expectations — by taking the time to know you personally, so you feel secure in any treatment you choose."
            />
            <ImageReveal className="mt-12 hidden aspect-[4/3] rounded-[1.75rem] bg-graphite lg:block" delay={0.1}>
              <Image
                src="/images/stock/family.jpg"
                alt="A young family laughing together outdoors"
                fill
                sizes="(min-width: 1024px) 36vw, 0px"
                className="object-cover object-[50%_35%]"
              />
            </ImageReveal>
          </div>
        </div>

        <Stagger as="ol" gap={0.08} className="border-t hairline-light lg:col-span-7">
          {reasons.map((reason, index) => {
            const Icon = icons[reason.icon];
            return (
              <StaggerItem
                as="li"
                key={reason.title}
                className="group grid grid-cols-[3rem_1fr] gap-x-5 border-b hairline-light py-8 sm:grid-cols-[3.5rem_3.5rem_1fr] sm:gap-x-7 lg:py-10"
              >
                <span className="label-caps hidden pt-4 text-gold-soft sm:block">{pad(index + 1)}</span>
                <span className="grid size-12 place-items-center rounded-full border hairline-light text-gold-soft transition-colors duration-700 ease-luxe group-hover:border-gold group-hover:bg-gold group-hover:text-charcoal">
                  <Icon aria-hidden className="size-5" strokeWidth={1.4} />
                </span>
                <div className="transition-transform duration-700 ease-luxe lg:group-hover:translate-x-2">
                  <h3 className="display-sm text-ivory">{reason.title}</h3>
                  <p className="mt-3 max-w-xl text-[0.9688rem] leading-relaxed text-ivory/65">{reason.text}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
