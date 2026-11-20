"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type TreatmentCarouselProps = {
  /** Accessible name for the scrolling region. */
  label: string;
  /** Content rendered on the same row as the arrows (heading and link). */
  header: ReactNode;
  children: ReactNode;
};

/**
 * Horizontal, snap-scrolling showcase. Works with touch, trackpad, keyboard
 * and mouse-drag, with arrow buttons and a progress line. The track bleeds to
 * the right edge of the viewport while its first card stays on the page grid.
 */
export function TreatmentCarousel({ label, header, children }: TreatmentCarouselProps) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [dragging, setDragging] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const step = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const gap = parseFloat(getComputedStyle(el).columnGap || "24");
    const cardWidth = (card?.offsetWidth ?? 320) + gap;
    const count = Math.max(1, Math.floor((el.clientWidth * 0.8) / cardWidth));
    el.scrollBy({ left: direction * cardWidth * count, behavior: "smooth" });
  };

  // Mouse drag-to-scroll (touch and trackpads already scroll natively).
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || !track.current) return;
    drag.current = { active: true, startX: event.clientX, startLeft: track.current.scrollLeft, moved: false };
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    const el = track.current;
    if (!state.active || !el) return;
    const delta = event.clientX - state.startX;
    if (!state.moved && Math.abs(delta) > 6) {
      state.moved = true;
      setDragging(true);
    }
    if (state.moved) el.scrollLeft = state.startLeft - delta;
  };
  const endDrag = () => {
    const state = drag.current;
    if (!state.active) return;
    state.active = false;
    setDragging(false);
    // Keep `moved` true for this tick so the click that follows a drag is ignored.
    setTimeout(() => {
      state.moved = false;
    }, 0);
  };

  return (
    <div>
      <div className="wrap flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        {header}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={!canPrev}
            aria-label="Previous treatments"
            className="grid size-14 place-items-center rounded-full border hairline text-charcoal transition-all duration-500 ease-luxe hover:border-charcoal hover:bg-charcoal hover:text-ivory disabled:pointer-events-none disabled:opacity-35"
          >
            <ArrowLeft aria-hidden className="size-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={!canNext}
            aria-label="Next treatments"
            className="grid size-14 place-items-center rounded-full border hairline text-charcoal transition-all duration-500 ease-luxe hover:border-charcoal hover:bg-charcoal hover:text-ivory disabled:pointer-events-none disabled:opacity-35"
          >
            <ArrowRight aria-hidden className="size-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div
        ref={track}
        role="region"
        aria-label={label}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={(event) => {
          if (drag.current.moved) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
        className={cn(
          "no-scrollbar mt-12 flex gap-5 overflow-x-auto px-[var(--wrap-pad)] pb-2 lg:mt-16 lg:gap-7",
          "scroll-px-[var(--wrap-pad)] overscroll-x-contain",
          dragging ? "cursor-grabbing select-none snap-none" : "cursor-grab snap-x snap-mandatory",
        )}
      >
        {children}
      </div>

      <div className="wrap mt-10">
        <div className="relative h-px w-full bg-charcoal/12">
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-full origin-left bg-gold-deep transition-transform duration-300 ease-out"
            style={{ transform: `scaleX(${0.12 + progress * 0.88})` }}
          />
        </div>
      </div>
    </div>
  );
}
