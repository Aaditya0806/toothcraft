"use client";

import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type BeforeAfterProps = {
  before: string;
  after: string;
  /** Treatment name, used for alt text and the slider label. */
  label: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Draggable before/after comparison.
 *
 * A native range input sits invisibly over the frame, so the comparison works
 * with mouse, touch and keyboard (arrow keys) and is announced properly by
 * screen readers — no custom pointer handling required.
 *
 * The source photographs carry small printed "before/after" tags; the
 * on-brand labels below are positioned to sit exactly over them.
 */
export function BeforeAfter({
  before,
  after,
  label,
  sizes = "(min-width: 1024px) 700px, 92vw",
  priority = false,
  className,
}: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const [touched, setTouched] = useState(false);
  const id = useId();

  return (
    <div
      className={cn(
        "group/ba relative aspect-[601/330] w-full select-none overflow-hidden rounded-[1.5rem] bg-graphite [container-type:inline-size] sm:rounded-[1.75rem]",
        className,
      )}
    >
      {/* After (base layer) */}
      <Image
        src={after}
        alt={`After ${label.toLowerCase()} at ToothCraft`}
        fill
        sizes={sizes}
        priority={priority}
        draggable={false}
        className="object-fill"
      />
      <span className="ba-tag right-[3.4%]">After</span>

      {/* Before (clipped to the left of the handle) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image
          src={before}
          alt={`Before ${label.toLowerCase()} at ToothCraft`}
          fill
          sizes={sizes}
          priority={priority}
          draggable={false}
          className="object-fill"
        />
        <span className="ba-tag left-[3.4%]">Before</span>
      </div>

      {/* Handle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-px bg-ivory shadow-[0_0_0_1px_rgba(34,35,33,0.12)]"
        style={{ left: `${position}%` }}
      >
        <span
          className={cn(
            "absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ivory text-charcoal shadow-lift transition-transform duration-500 ease-luxe group-hover/ba:scale-110 sm:size-14",
            !touched && "animate-pulse-dot",
          )}
        >
          <ChevronsLeftRight className="size-5" strokeWidth={1.5} />
        </span>
      </div>

      <label htmlFor={id} className="sr-only">
        Compare before and after — {label}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={position}
        onChange={(event) => {
          setPosition(Number(event.target.value));
          setTouched(true);
        }}
        aria-valuetext={`${Math.round(position)}% before, ${Math.round(100 - position)}% after`}
        className="ba-range absolute inset-0 size-full cursor-ew-resize touch-pan-y opacity-0"
      />
    </div>
  );
}
