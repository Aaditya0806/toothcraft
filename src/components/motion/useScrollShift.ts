"use client";

import { useMotionValue, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, type RefObject } from "react";

type Offset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

/**
 * Returns a y-offset that travels from `from` to `to` while `target` moves
 * through the viewport — the building block for parallax.
 *
 * When the visitor prefers reduced motion the offset stays at zero. That
 * preference is read after mount, so server and client markup always match.
 */
export function useScrollShift(
  target: RefObject<HTMLElement | null>,
  from: number,
  to: number,
  unit: "%" | "px" = "px",
  offset: Offset = ["start end", "end start"],
): MotionValue<string> {
  const { scrollYProgress } = useScroll({ target, offset });
  const enabled = useMotionValue(1);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => enabled.set(media.matches ? 0 : 1);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [enabled]);

  return useTransform([scrollYProgress, enabled], ([progress, on]: number[]) => {
    const value = on ? from + (to - from) * progress : 0;
    return `${value}${unit}`;
  });
}
