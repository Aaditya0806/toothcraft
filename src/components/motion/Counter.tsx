"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type CounterProps = {
  value: number;
  /** Render the number without counting (used for years). */
  plain?: boolean;
  className?: string;
};

/**
 * Counts up to a number when it scrolls into view.
 * The final value is rendered on the server, so it is correct without JavaScript.
 */
export function Counter({ value, plain = false, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || plain || reduce || !inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = String(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [inView, plain, reduce, value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
