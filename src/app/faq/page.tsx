import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/sections/Accordion";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink, TextLink } from "@/components/ui/ButtonLink";
import { faqs } from "@/data/faqs";
import { JsonLd, breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about appointments, dental implants, root canal treatment, teeth whitening, braces, children's dentistry and ToothCraft's clinics in Chennai.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Frequently Asked Questions"
        title="Good questions, [[clearly answered.]]"
        lede="General guidance on appointments, our clinics and common treatments. For advice about your own teeth, please book a consultation — your dentist will advise you after a proper examination."
        crumbs={[{ name: "FAQs", path: "/faq" }]}
      >
        <ButtonLink href="/contact#book">Book an Appointment</ButtonLink>
      </PageHero>

      <section className="section-y">
        <div className="wrap grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow text-gold-deep">Looking for something specific?</p>
              <p className="mt-5 font-display text-[1.75rem] leading-tight">
                Each treatment page has its own detailed questions and answers.
              </p>
              <div className="mt-7">
                <TextLink href="/treatments">Browse Treatments</TextLink>
              </div>
              <p className="mt-10 text-[0.875rem] leading-relaxed text-stone">
                The information on this page is general and is not a substitute for professional
                dental advice. Treatment suitability, timelines and results vary from person to person.
              </p>
            </div>
          </aside>
          <Reveal y={30} className="lg:col-span-8">
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <CtaBand title="Still have a question? [[We are happy to help.]]" />
      <JsonLd data={breadcrumbSchema([{ name: "FAQs", path: "/faq" }])} />
      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
