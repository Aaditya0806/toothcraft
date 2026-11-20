import Image from "next/image";
import { Check } from "lucide-react";
import { ImageReveal, Parallax } from "@/components/motion/ImageReveal";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { tourismPoints } from "@/data/content";
import { whatsappLink } from "@/data/site";

export function TourismPreview() {
  return (
    <section id="dental-tourism" className="section-y overflow-hidden">
      <div className="wrap grid gap-y-20 lg:grid-cols-12 lg:items-center lg:gap-x-12 xl:gap-x-20">
        <div className="lg:col-span-6 xl:col-span-5">
          <SectionHeading
            eyebrow="Dental Tourism"
            title="A warm Chennai welcome for [[international patients.]]"
            lede="Patients travel to ToothCraft from abroad for their dental care. Tell us what you need and we will share a treatment plan, an estimate and the number of days required — before you book your trip."
          />

          <Stagger as="ul" gap={0.08} className="mt-10 space-y-4">
            {tourismPoints.map((point) => (
              <StaggerItem as="li" key={point} y={16} className="flex gap-4 text-[0.9688rem] text-charcoal">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-champagne text-gold-deep">
                  <Check aria-hidden className="size-3.5" strokeWidth={2.2} />
                </span>
                {point}
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="mt-11 flex flex-wrap gap-3">
            <ButtonLink href="/dental-tourism">Plan Your Visit</ButtonLink>
            <ButtonLink
              href={whatsappLink("Hello ToothCraft, I am an international patient and would like to enquire about dental treatment.")}
              variant="outline"
              arrow={false}
              external
              icon={<WhatsAppIcon className="size-4" />}
            >
              WhatsApp Enquiry
            </ButtonLink>
          </Reveal>
        </div>

        {/* Travel imagery (licensed stock photography) */}
        <div className="relative lg:col-span-6 xl:col-span-6 xl:col-start-7">
          <ImageReveal
            parallax
            strength={6}
            className="ml-auto aspect-[4/5] w-[78%] rounded-b-[2rem] rounded-t-[999px] bg-champagne"
          >
            <Image
              src="/images/stock/shore-temple.jpg"
              alt="The Shore Temple at Mahabalipuram, near Chennai"
              fill
              sizes="(min-width: 1024px) 38vw, 72vw"
              className="object-cover object-[40%_50%]"
            />
          </ImageReveal>

          <Parallax distance={28} className="absolute bottom-[20%] left-0 w-[42%]">
            <Reveal delay={0.25}>
              <figure className="overflow-hidden rounded-[1.5rem] border-[6px] border-ivory bg-ivory shadow-lift">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/images/stock/chennai-coast.jpg"
                    alt="Waves at golden hour on a sandy beach"
                    fill
                    sizes="(min-width: 1024px) 20vw, 40vw"
                    className="object-cover object-[50%_60%]"
                  />
                </div>
                <figcaption className="label-caps px-3 py-3 text-stone">Golden hour by the sea</figcaption>
              </figure>
            </Reveal>
          </Parallax>

          <Reveal delay={0.4}>
            <p className="label-caps mt-5 text-right text-stone">Shore Temple, Mahabalipuram</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
