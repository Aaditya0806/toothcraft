"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { lockScroll, unlockScroll } from "@/components/motion/SmoothScroll";

export type LightboxImage = { src: string; alt: string; width: number; height: number; caption?: string };

type LightboxProps = {
  images: LightboxImage[];
  /** Index of the open image, or null when closed. */
  index: number | null;
  onChange: (index: number | null) => void;
};

/** Full-screen image viewer with keyboard support (Esc, ← and →). */
export function Lightbox({ images, index, onChange }: LightboxProps) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const open = index !== null;
  const image = open ? images[index] : null;

  const step = useCallback(
    (direction: 1 | -1) => {
      if (index === null) return;
      onChange((index + direction + images.length) % images.length);
    },
    [images.length, index, onChange],
  );

  useEffect(() => {
    if (!open) return;
    lockScroll();
    const previous = document.activeElement as HTMLElement | null;
    closeButton.current?.focus();
    return () => {
      unlockScroll();
      previous?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onChange(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onChange, open, step]);

  return (
    <AnimatePresence>
      {image ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={image.caption ?? image.alt}
          className="fixed inset-0 z-[80] flex flex-col bg-charcoal/96 text-ivory backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={() => onChange(null)}
        >
          <div className="flex shrink-0 items-center justify-between px-5 py-4 sm:px-8">
            <p className="label-caps text-ivory/70">
              {String((index ?? 0) + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              {image.caption ? <span className="ml-4 text-ivory">{image.caption}</span> : null}
            </p>
            <button
              ref={closeButton}
              type="button"
              aria-label="Close"
              onClick={() => onChange(null)}
              className="grid size-11 place-items-center rounded-full border hairline-light transition-colors hover:bg-ivory hover:text-charcoal"
            >
              <X aria-hidden className="size-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative min-h-0 flex-1 px-4 pb-4 sm:px-20 sm:pb-8">
            <motion.div
              key={image.src}
              className="relative size-full"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <Image src={image.src} alt={image.alt} fill sizes="100vw" quality={85} className="object-contain" />
            </motion.div>

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={(event) => {
                    event.stopPropagation();
                    step(-1);
                  }}
                  className="absolute bottom-6 left-4 grid size-12 place-items-center rounded-full border hairline-light bg-charcoal/60 transition-colors hover:bg-ivory hover:text-charcoal sm:bottom-auto sm:left-5 sm:top-1/2 sm:-translate-y-1/2"
                >
                  <ArrowLeft aria-hidden className="size-5" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={(event) => {
                    event.stopPropagation();
                    step(1);
                  }}
                  className="absolute bottom-6 right-4 grid size-12 place-items-center rounded-full border hairline-light bg-charcoal/60 transition-colors hover:bg-ivory hover:text-charcoal sm:bottom-auto sm:right-5 sm:top-1/2 sm:-translate-y-1/2"
                >
                  <ArrowRight aria-hidden className="size-5" strokeWidth={1.5} />
                </button>
              </>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
