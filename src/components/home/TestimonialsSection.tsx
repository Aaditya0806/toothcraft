import { Testimonials } from "@/components/home/Testimonials";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="grain section-y relative isolate bg-charcoal text-ivory">
      <div className="wrap">
        <Reveal y={14} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Eyebrow tone="light">Patient Testimonials</Eyebrow>
          <p className="text-[0.8125rem] text-ivory/50">In our patients&rsquo; own words</p>
        </Reveal>
        <h2 className="sr-only">What our patients say</h2>

        <Reveal className="mt-12 lg:mt-16" y={32} delay={0.1}>
          <Testimonials items={testimonials} />
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl text-[0.8125rem] leading-relaxed text-ivory/45">
            Testimonials are from ToothCraft patients and have been lightly edited for spelling and
            length. They reflect individual experiences; treatment outcomes vary from person to person.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
