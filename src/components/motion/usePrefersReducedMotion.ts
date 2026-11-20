"use client";

import { useEffect, useState } from "react";

/**
 * True when the visitor has asked for reduced motion.
 * Always false during server rendering and the first client render, so it is
 * safe to use for markup without causing hydration mismatches.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return reduced;
}
