import { Phone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/sections/Accordion";
import { TextLink } from "@/components/ui/ButtonLink";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeFaqs } from "@/data/faqs";
import { defaultWhatsappMessage, site, whatsappLink } from "@/data/site";

export function FaqSection() {
  return (
    <section id="faq" className="section-y bg-paper">
      <div className="wrap grid gap-y-14 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Good questions, [[clearly answered.]]"
              lede="General guidance on appointments and common treatments. Your dentist will always advise you based on a proper examination."
            />
            <Reveal delay={0.2} className="mt-10 rounded-[1.5rem] border hairline bg-ivory p-6 sm:p-7">
              <p className="font-display text-[1.5rem] leading-tight">Still have a question?</p>
              <p className="mt-2 text-[0.9375rem] text-stone">
                Speak to our team — we are available {site.hours.label}, {site.hours.days}.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`tel:${site.phone.tel}`} className="btn btn-sm">
                  <Phone aria-hidden className="size-4" strokeWidth={1.75} />
                  <span>Call Now</span>
                </a>
                <a
                  href={whatsappLink(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  <WhatsAppIcon className="size-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal y={30}>
            <Accordion items={homeFaqs} />
          </Reveal>
          <Reveal delay={0.1} className="mt-9">
            <TextLink href="/faq">View All FAQs</TextLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
