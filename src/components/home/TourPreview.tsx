import Image from "next/image";
import Link from "next/link";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const tiles = [
  {
    src: "/images/clinic/ashok-nagar-reception.jpg",
    alt: "Reception desk beneath the Tooth Craft sign",
    label: "Reception",
    place: "Ashok Nagar",
    span: "col-span-2 row-span-2",
    sizes: "(min-width: 1024px) 46vw, 92vw",
  },
  {
    src: "/images/clinic/ashok-nagar-treatment-room-3.jpg",
    alt: "Bright treatment room with a dental chair",
    label: "Treatment room",
    place: "Ashok Nagar",
    span: "",
    sizes: "(min-width: 1024px) 23vw, 46vw",
  },
  {
    src: "/images/clinic/ashok-nagar-waiting-area.jpg",
    alt: "Waiting area with a leather sofa",
    label: "Waiting area",
    place: "Ashok Nagar",
    span: "",
    sizes: "(min-width: 1024px) 23vw, 46vw",
  },
  {
    src: "/images/clinic/saidapet-4.jpg",
    alt: "Dental chair and instruments at the Saidapet clinic",
    label: "Modern equipment",
    place: "Saidapet",
    span: "",
    sizes: "(min-width: 1024px) 23vw, 46vw",
  },
  {
    src: "/images/clinic/mugalivakkam-reception.jpg",
    alt: "Reception desk at the Mugalivakkam clinic",
    label: "Reception",
    place: "Mugalivakkam",
    span: "",
    sizes: "(min-width: 1024px) 23vw, 46vw",
  },
];

/** A mosaic of ToothCraft's own clinic photographs leading to the full tour. */
export function TourPreview() {
  return (
    <section id="virtual-tour" className="section-y bg-sand">
      <div className="wrap">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Virtual Clinic Tour"
            title="Step inside, [[before you step in.]]"
            lede="Take a look around our reception areas, waiting spaces and treatment rooms — photographed at ToothCraft's own clinics."
            className="max-w-3xl"
          />
          <Reveal delay={0.2} className="shrink-0">
            <ButtonLink href="/virtual-tour" variant="outline">
              Take the Full Tour
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-4 lg:grid-rows-2 lg:gap-5">
          {tiles.map((tile, index) => (
            <Link
              key={tile.src}
              href="/virtual-tour"
              aria-label={`${tile.label}, ${tile.place} — view the clinic tour`}
              className={cn("group relative block", tile.span)}
            >
              <ImageReveal
                delay={index * 0.07}
                from={index % 2 === 0 ? "bottom" : "top"}
                className={cn(
                  "rounded-[1.5rem] bg-champagne lg:rounded-[1.75rem]",
                  tile.span ? "aspect-[4/3] lg:aspect-auto lg:h-full" : "aspect-[4/3]",
                )}
              >
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes={tile.sizes}
                  className="photo-grade object-cover transition-transform duration-[1600ms] ease-luxe group-hover:scale-[1.06]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent"
                />
              </ImageReveal>
              <span className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 sm:inset-x-5 sm:bottom-5">
                <span className="label-caps whitespace-nowrap rounded-full bg-ivory/95 px-2.5 py-1.5 text-[0.5625rem] text-charcoal backdrop-blur-sm sm:px-3 sm:py-2 sm:text-[0.6875rem]">
                  {tile.label}
                </span>
                <span className="label-caps hidden text-ivory sm:block">{tile.place}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
