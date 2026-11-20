import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { CtaBand } from "@/components/sections/CtaBand";
import { ImageGrid } from "@/components/sections/ImageGrid";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseImages, comparisonPairs } from "@/data/gallery";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { pad } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Smile Gallery — Before & After",
  description:
    "Before-and-after photographs of dental treatment at ToothCraft, Chennai: teeth whitening, smile correction, braces, dental implants and teeth replacement.",
  path: "/smile-gallery",
});

const cases = caseImages.map((image, index) => ({
  ...image,
  alt: `Before and after dental treatment at ToothCraft — case ${index + 1}`,
  caption: `Case ${pad(index + 1)}`,
}));

export default function SmileGalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Smile Transformation Gallery"
        title="Real patients. [[Real transformations.]]"
        lede="Every photograph on this page shows treatment carried out at ToothCraft. Drag across each image to compare before and after."
        crumbs={[{ name: "Smile Gallery", path: "/smile-gallery" }]}
      >
        <ButtonLink href="/contact#book">Book a Consultation</ButtonLink>
        <ButtonLink href="/treatments" variant="outline" arrow={false}>
          Explore Treatments
        </ButtonLink>
      </PageHero>

      {/* Interactive comparisons */}
      <section className="section-y">
        <div className="wrap">
          <Stagger gap={0.1} className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:gap-x-12 lg:gap-y-20">
            {comparisonPairs.map((pair, index) => (
              <StaggerItem as="article" key={pair.id} className={index === 0 ? "md:col-span-2" : ""}>
                <div className={index === 0 ? "mx-auto max-w-[52rem]" : ""}>
                  <BeforeAfter
                    before={pair.before}
                    after={pair.after}
                    label={pair.treatment}
                    priority={index === 0}
                    sizes={index === 0 ? "(min-width: 1024px) 832px, 92vw" : "(min-width: 768px) 46vw, 92vw"}
                  />
                  <div className="mt-5 flex items-baseline justify-between gap-6 border-b hairline pb-5">
                    <h2 className="font-display text-[1.75rem] leading-none sm:text-[2rem]">{pair.treatment}</h2>
                    <span className="label-caps text-gold-deep">{pad(index + 1)}</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-14">
            <p className="max-w-3xl text-[0.875rem] leading-relaxed text-stone">
              These are photographs of ToothCraft patients, shared from the clinic&rsquo;s own records.
              They are shown to illustrate the kind of treatment we provide and are not a guarantee of
              outcome — results depend on each person&rsquo;s teeth, health and treatment plan.
            </p>
          </Reveal>
        </div>
      </section>

      {/* More cases */}
      <section className="section-y bg-sand">
        <div className="wrap">
          <SectionHeading
            eyebrow="More From Our Clinics"
            title="Further cases, [[side by side.]]"
            size="md"
            lede="In each photograph, before treatment is on the left and after treatment is on the right. Select an image to view it larger."
            className="max-w-3xl"
          />
          <Reveal className="mt-14" y={30}>
            <ImageGrid
              images={cases}
              columns="grid-cols-1 items-start sm:grid-cols-2 lg:grid-cols-3"
              sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
            />
          </Reveal>
        </div>
      </section>

      <div className="pt-20 lg:pt-28">
        <CtaBand title="Curious what is possible [[for your smile?]]" />
      </div>
      <JsonLd data={breadcrumbSchema([{ name: "Smile Gallery", path: "/smile-gallery" }])} />
    </>
  );
}
