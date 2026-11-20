"use client";

import Image from "next/image";
import { Expand } from "lucide-react";
import { useState } from "react";
import { Lightbox, type LightboxImage } from "@/components/sections/Lightbox";
import { cn } from "@/lib/utils";

type ImageGridProps = {
  images: LightboxImage[];
  /** Grid column classes. */
  columns?: string;
  /** Apply the clinic photo colour grade. */
  grade?: boolean;
  /** Aspect ratio utility for every tile; omit to use each image's own ratio. */
  aspect?: string;
  sizes?: string;
};

/** Grid of photographs that open in a full-screen viewer. */
export function ImageGrid({
  images,
  columns = "grid-cols-2 lg:grid-cols-3",
  grade = false,
  aspect,
  sizes = "(min-width: 1024px) 31vw, 46vw",
}: ImageGridProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <ul className={cn("grid gap-3 sm:gap-5", columns)}>
        {images.map((image, index) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setOpen(index)}
              aria-label={`View larger: ${image.caption ?? image.alt}`}
              className="group relative block w-full overflow-hidden rounded-[1.25rem] bg-champagne sm:rounded-[1.5rem]"
              style={aspect ? undefined : { aspectRatio: `${image.width} / ${image.height}` }}
            >
              <span className={cn("relative block", aspect ?? "size-full")}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={sizes}
                  className={cn(
                    "object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.05]",
                    grade && "photo-grade",
                  )}
                />
              </span>
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100"
              />
              <span className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 sm:inset-x-4 sm:bottom-4">
                {image.caption ? (
                  <span className="label-caps whitespace-nowrap rounded-full bg-ivory/95 px-2.5 py-1.5 text-[0.5625rem] text-charcoal sm:px-3 sm:py-2 sm:text-[0.6875rem]">
                    {image.caption}
                  </span>
                ) : (
                  <span />
                )}
                <span className="grid size-9 place-items-center rounded-full bg-ivory/15 text-ivory backdrop-blur-sm transition-colors duration-500 group-hover:bg-gold group-hover:text-charcoal">
                  <Expand aria-hidden className="size-4" strokeWidth={1.5} />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox images={images} index={open} onChange={setOpen} />
    </>
  );
}
