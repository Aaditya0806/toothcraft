"use client";

import Image from "next/image";
import { Expand } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Lightbox } from "@/components/sections/Lightbox";
import type { TourSet } from "@/data/gallery";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Clinic tour: choose a clinic, browse a large featured photograph with a
 * thumbnail rail, and open any image full-screen.
 * A ?clinic= query parameter selects the starting clinic.
 */
export function TourGallery({ sets }: { sets: TourSet[] }) {
  const [setIndex, setSetIndex] = useState(0);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("clinic");
    const found = sets.findIndex((set) => set.clinic === requested);
    if (found > 0) setSetIndex(found);
  }, [sets]);

  const current = sets[setIndex];
  const image = current.images[Math.min(active, current.images.length - 1)];
  const lightboxImages = current.images.map((entry) => ({ ...entry, caption: entry.label }));

  const chooseSet = (index: number) => {
    setSetIndex(index);
    setActive(0);
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Clinic"
        className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] lg:mx-0 lg:px-0"
      >
        {sets.map((set, index) => {
          const selected = index === setIndex;
          return (
            <button
              key={set.clinic}
              type="button"
              role="tab"
              id={`tour-tab-${set.clinic}`}
              aria-selected={selected}
              aria-controls="tour-panel"
              onClick={() => chooseSet(index)}
              className={cn(
                "flex shrink-0 items-center gap-2.5 rounded-full border px-5 py-3 text-[0.8125rem] font-semibold tracking-[0.02em] transition-colors duration-500 ease-luxe",
                selected
                  ? "border-charcoal bg-charcoal text-ivory"
                  : "hairline text-stone hover:border-charcoal hover:text-charcoal",
              )}
            >
              {set.name}
              <span className={cn("text-[0.6875rem] font-bold", selected ? "text-gold-soft" : "text-mist")}>
                {String(set.images.length).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="tour-panel"
        role="tabpanel"
        aria-labelledby={`tour-tab-${current.clinic}`}
        className="mt-8 grid gap-4 lg:grid-cols-12 lg:gap-6"
      >
        {/* Featured photograph */}
        <div className="lg:col-span-9">
          <button
            type="button"
            onClick={() => setLightbox(active)}
            aria-label={`View larger: ${image.label}, ${current.name}`}
            className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-champagne sm:aspect-[16/10] lg:rounded-[2rem]"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={image.src}
                className="absolute inset-0 block"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  quality={85}
                  sizes="(min-width: 1024px) 70vw, 92vw"
                  className={cn(
                    "photo-grade",
                    image.height > image.width ? "object-contain" : "object-cover",
                  )}
                />
              </motion.span>
            </AnimatePresence>
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-charcoal/60 to-transparent"
            />
            <span className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 sm:inset-x-7 sm:bottom-7">
              <span className="flex items-center gap-3">
                <span className="label-caps rounded-full bg-ivory/95 px-3 py-2 text-charcoal">{image.label}</span>
                <span className="label-caps hidden text-ivory sm:inline">ToothCraft {current.name}</span>
              </span>
              <span className="grid size-11 place-items-center rounded-full bg-ivory/15 text-ivory backdrop-blur-sm transition-colors duration-500 group-hover:bg-gold group-hover:text-charcoal">
                <Expand aria-hidden className="size-4" strokeWidth={1.5} />
              </span>
            </span>
          </button>
        </div>

        {/* Thumbnails */}
        <ul className="no-scrollbar -mx-[var(--gutter)] flex gap-3 overflow-x-auto px-[var(--gutter)] lg:col-span-3 lg:mx-0 lg:grid lg:max-h-[38rem] lg:grid-cols-2 lg:content-start lg:gap-4 lg:overflow-y-auto lg:px-0">
          {current.images.map((entry, index) => {
            const selected = index === active;
            return (
              <li key={entry.src} className="w-28 shrink-0 lg:w-auto">
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Show ${entry.label}`}
                  aria-current={selected}
                  className={cn(
                    "relative block aspect-[4/3] w-full overflow-hidden rounded-[0.875rem] bg-champagne ring-offset-2 ring-offset-sand transition-all duration-500 ease-luxe",
                    selected ? "ring-2 ring-gold-deep" : "opacity-70 hover:opacity-100",
                  )}
                >
                  <Image src={entry.src} alt="" fill sizes="160px" className="photo-grade object-cover" />
                </button>
                <span className="label-caps mt-2 block truncate text-[0.5625rem] text-stone">{entry.label}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <Lightbox images={lightboxImages} index={lightbox} onChange={setLightbox} />
    </div>
  );
}
