"use client";

import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

let locks = 0;

/** Freeze page scrolling (used by the mobile menu and lightboxes). */
export function lockScroll() {
  locks += 1;
  if (typeof window === "undefined") return;
  window.__lenis?.stop();
  document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (typeof window === "undefined" || locks > 0) return;
  window.__lenis?.start();
  document.documentElement.style.overflow = "";
}

/**
 * App-wide motion settings:
 *  - Lenis smooth scrolling (skipped when the visitor prefers reduced motion)
 *  - MotionConfig so every Motion animation respects that same preference
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const poppedRef = useRef(false);
  const firstRender = useRef(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;

    const start = () => {
      if (media.matches || lenis) return;
      lenis = new Lenis({
        lerp: 0.11,
        wheelMultiplier: 1,
        autoRaf: true,
        anchors: { offset: -92 },
      });
      window.__lenis = lenis;
    };
    const stop = () => {
      lenis?.destroy();
      lenis = undefined;
      delete window.__lenis;
    };
    const onChange = () => (media.matches ? stop() : start());
    const onPop = () => {
      poppedRef.current = true;
    };

    start();
    media.addEventListener("change", onChange);
    window.addEventListener("popstate", onPop);
    return () => {
      media.removeEventListener("change", onChange);
      window.removeEventListener("popstate", onPop);
      stop();
    };
  }, []);

  // On forward navigation, drop any in-flight smooth scroll so the new page
  // starts at the top. Back/forward keeps the browser's restored position.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const lenis = window.__lenis;
    if (!lenis) return;
    if (poppedRef.current) {
      poppedRef.current = false;
      lenis.resize();
      return;
    }
    if (!window.location.hash) {
      lenis.scrollTo(0, { immediate: true, force: true });
    }
    lenis.resize();
  }, [pathname]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
