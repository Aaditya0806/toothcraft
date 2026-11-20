import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { TourGallery } from "@/components/sections/TourGallery";
import { VideoCard } from "@/components/sections/VideoCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clinicVideos, tourSets } from "@/data/gallery";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Virtual Clinic Tour",
  description:
    "Take a virtual tour of ToothCraft's dental clinics in Chennai — reception areas, waiting spaces, treatment rooms and equipment at Saidapet, Ashok Nagar and Mugalivakkam.",
  path: "/virtual-tour",
});

export default function VirtualTourPage() {
  return (
    <>
      <PageHero
        eyebrow="Virtual Clinic Tour"
        title="Step inside, [[before you step in.]]"
        lede="A first visit feels easier when the place is already familiar. Look around our reception areas, waiting spaces and treatment rooms — all photographed at ToothCraft's own clinics."
        crumbs={[{ name: "Virtual Tour", path: "/virtual-tour" }]}
      >
        <ButtonLink href="/clinics">Find a Clinic</ButtonLink>
        <ButtonLink href="/contact#book" variant="outline" arrow={false}>
          Book an Appointment
        </ButtonLink>
      </PageHero>

      <section className="section-y bg-sand">
        <div className="wrap">
          <Reveal y={30}>
            <TourGallery sets={tourSets} />
          </Reveal>
        </div>
      </section>

      <section className="grain section-y relative isolate bg-charcoal text-ivory">
        <div className="wrap">
          <SectionHeading
            tone="light"
            eyebrow="From Our Channel"
            title="See the clinics [[on film.]]"
            size="md"
            lede="Videos from ToothCraft's own YouTube channel. Each video loads only when you press play."
            className="max-w-3xl"
          />
          <Stagger gap={0.08} className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {clinicVideos.map((video) => (
              <StaggerItem key={video.id}>
                <VideoCard id={video.id} title={video.title} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <div className="pt-20 lg:pt-28">
        <CtaBand title="Like what you see? [[Come and visit.]]" />
      </div>
      <JsonLd data={breadcrumbSchema([{ name: "Virtual Tour", path: "/virtual-tour" }])} />
    </>
  );
}
