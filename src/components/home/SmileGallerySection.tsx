import { SmileShowcase } from "@/components/home/SmileShowcase";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { comparisonPairs } from "@/data/gallery";

export function SmileGallerySection() {
  return (
    <section id="smile-gallery" className="section-y">
      <div className="wrap">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Smile Transformation Gallery"
            title="Real patients. [[Real transformations.]]"
            lede="A selection of treatments carried out at ToothCraft. Choose a treatment, then drag across the photograph to see before and after."
            className="max-w-3xl"
          />
          <Reveal delay={0.2} className="shrink-0">
            <ButtonLink href="/smile-gallery" variant="outline">
              View All Transformations
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal className="mt-14 lg:mt-20" y={36}>
          <SmileShowcase pairs={comparisonPairs} />
        </Reveal>
      </div>
    </section>
  );
}
