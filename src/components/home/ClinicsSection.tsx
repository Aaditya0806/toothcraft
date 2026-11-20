import { Reveal } from "@/components/motion/Reveal";
import { ClinicsExplorer } from "@/components/sections/ClinicsExplorer";
import { TextLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clinics } from "@/data/clinics";

export function ClinicsSection() {
  return (
    <section id="clinics" className="section-y">
      <div className="wrap">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Our Clinic Locations"
            title="Three clinics across Chennai, [[one standard of care.]]"
            lede="Find the ToothCraft clinic nearest you. Every location consults from 9 AM to 9 PM, Monday to Sunday."
            className="max-w-3xl"
          />
          <Reveal delay={0.2} className="shrink-0">
            <TextLink href="/clinics">Find a Clinic</TextLink>
          </Reveal>
        </div>

        <Reveal className="mt-14 lg:mt-20" y={36}>
          <ClinicsExplorer clinics={clinics} />
        </Reveal>
      </div>
    </section>
  );
}
