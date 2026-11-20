"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import type { Testimonial } from "@/data/testimonials";
import { cn, pad } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const INTERVAL = 9000;

/**
 * Large-format testimonial carousel. Advances on its own, pauses while the
 * visitor is hovering or using the keyboard, and never auto-plays for people
 * who prefer reduced motion.
 */
export function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduce = usePrefersReducedMotion();
  const region = useRef<HTMLDivElement>(null);
  const item = items[index];

  const go = useCallback(
    (step: 1 | -1) => {
      setDirection(step);
      setIndex((current) => (current + step + items.length) % items.length);
    },
    [items.length],
  );

  useEffect(() => {
    if (paused || reduce) return;
    const timer = setTimeout(() => go(1), INTERVAL);
    return () => clearTimeout(timer);
  }, [go, index, paused, reduce]);

  return (
    <div
      ref={region}
      role="group"
      aria-roledescription="carousel"
      aria-label="Patient testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!region.current?.contains(event.relatedTarget as Node)) setPaused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(1);
        if (event.key === "ArrowLeft") go(-1);
      }}
      className="grid gap-12 lg:grid-cols-12 lg:gap-x-16"
    >
      {/* Quote */}
      <div className="lg:col-span-9">
        <span aria-hidden className="block font-display text-[7rem] leading-[0.6] text-gold lg:text-[9rem]">
          “
        </span>
        <div aria-live="polite" className="relative mt-2 min-h-[22rem] sm:min-h-[17rem] lg:min-h-[19rem]">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.figure
              key={item.id}
              custom={direction}
              variants={{
                enter: (dir: number) => ({ opacity: 0, y: 28 * dir }),
                center: { opacity: 1, y: 0 },
                exit: (dir: number) => ({ opacity: 0, y: -22 * dir }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.75, ease: EASE }}
            >
              <blockquote className="font-display text-[clamp(1.6rem,2.9vw,2.9rem)] leading-[1.22] tracking-[-0.01em] text-ivory">
                {item.quote}
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-5">
                <span className="relative block h-16 w-[4.6rem] shrink-0 overflow-hidden rounded-xl border border-gold/50">
                  <Image
                    src={item.image}
                    alt={`${item.name} with the ToothCraft team`}
                    fill
                    sizes="74px"
                    className="object-cover"
                  />
                </span>
                <span>
                  <span className="block text-[1rem] font-semibold text-ivory">{item.name}</span>
                  <span className="label-caps mt-1.5 block text-gold-soft">
                    {item.location}
                    {item.treatment ? ` · ${item.treatment}` : ""}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-end justify-between gap-8 lg:col-span-3 lg:flex-col lg:items-end lg:justify-end">
        <p className="font-display text-[2rem] leading-none text-ivory" aria-hidden>
          {pad(index + 1)}
          <span className="mx-2 text-ivory/30">/</span>
          <span className="text-ivory/50">{pad(items.length)}</span>
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="grid size-14 place-items-center rounded-full border hairline-light text-ivory transition-all duration-500 ease-luxe hover:border-gold hover:bg-gold hover:text-charcoal"
          >
            <ArrowLeft aria-hidden className="size-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="grid size-14 place-items-center rounded-full border hairline-light text-ivory transition-all duration-500 ease-luxe hover:border-gold hover:bg-gold hover:text-charcoal"
          >
            <ArrowRight aria-hidden className="size-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2 lg:col-span-12" aria-hidden>
        {items.map((entry, position) => (
          <span key={entry.id} className="relative h-px flex-1 overflow-hidden bg-ivory/15">
            <span
              key={`${entry.id}-${position === index ? index : "idle"}`}
              className={cn(
                "absolute inset-0 origin-left bg-gold",
                position < index && "scale-x-100",
                position > index && "scale-x-0",
                position === index && (paused || reduce ? "scale-x-100" : "testimonial-progress"),
              )}
              style={position === index ? { animationDuration: `${INTERVAL}ms` } : undefined}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
