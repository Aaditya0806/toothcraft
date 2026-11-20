"use client";

import { motion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useScrollShift } from "@/components/motion/useScrollShift";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  /** Direction the mask opens from. */
  from?: "bottom" | "left" | "right" | "top";
  delay?: number;
  /** Adds a gentle vertical drift while the frame crosses the viewport. */
  parallax?: boolean;
  /** Parallax strength as a percentage of the frame height. */
  strength?: number;
};

const closed = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/**
 * A framed image that is unmasked as it enters the viewport while the image
 * inside settles from a slight zoom. Put a `fill` <Image> inside.
 */
export function ImageReveal({
  children,
  className,
  from = "bottom",
  delay = 0,
  parallax = false,
  strength = 7,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const travel = parallax ? strength : 0;
  const y = useScrollShift(ref, -travel, travel, "%");

  return (
    <motion.div
      ref={ref}
      data-reveal
      className={cn("relative overflow-hidden", className)}
      initial={{ clipPath: closed[from] }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.35, delay, ease: EASE }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 1.9, delay, ease: EASE }}
      >
        {/* The inner layer is taller than the frame so the drift never exposes an edge. */}
        <motion.div
          className="absolute inset-x-0"
          style={{ y, top: `-${travel}%`, bottom: `-${travel}%` }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Pixels of travel across the viewport. */
  distance?: number;
};

/** Moves its children slowly on the y-axis as the page scrolls. */
export function Parallax({ children, className, distance = 60 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useScrollShift(ref, distance, -distance, "px");
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
