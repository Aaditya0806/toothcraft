"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import { useScrollShift } from "@/components/motion/useScrollShift";

/**
 * The hero's image composition: an arched portrait, an overlapping detail
 * image, an opening-hours chip and a rotating "book" seal. Each layer drifts
 * at a slightly different speed as the page scrolls.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const leaving = ["start start", "end start"] as const;
  const imageY = useScrollShift(ref, 0, 10, "%", [...leaving]);
  const cardY = useScrollShift(ref, 0, -80, "px", [...leaving]);
  const chipY = useScrollShift(ref, 0, -44, "px", [...leaving]);

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-[24rem] sm:max-w-[28rem] lg:ml-auto lg:mr-0 lg:max-w-[32rem]"
    >
      {/* Offset gold outline */}
      <span
        aria-hidden
        className="load-fade-in absolute inset-0 -translate-y-3 translate-x-3 rounded-b-[2rem] rounded-t-[999px] border border-gold/70"
        style={{ animationDelay: "1.3s" }}
      />

      {/* Portrait */}
      <div
        className="load-frame relative aspect-[4/5] overflow-hidden rounded-b-[2rem] rounded-t-[999px] bg-champagne"
        style={{ animationDelay: "0.15s" }}
      >
        <motion.div className="absolute inset-x-0 -bottom-[6%] -top-[6%]" style={{ y: imageY }}>
          <Image
            src="/images/stock/hero-portrait.jpg"
            alt="Woman with curly hair smiling warmly, seated by a wooden table"
            fill
            priority
            quality={85}
            sizes="(min-width: 1024px) 34vw, (min-width: 640px) 28rem, 88vw"
            className="load-settle object-cover object-[52%_18%]"
            style={{ animationDelay: "0.15s" }}
          />
        </motion.div>
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent" />
      </div>

      {/* Detail image */}
      <motion.div
        className="absolute -left-3 bottom-[9%] w-[45%] sm:-left-9 lg:-left-16"
        style={{ y: cardY }}
      >
        <div className="load-fade-up" style={{ animationDelay: "1.05s" }}>
          <div className="animate-float">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border-[5px] border-ivory shadow-lift">
              <Image
                src="/images/stock/smile-closeup.jpg"
                alt="Close-up of a natural, confident smile"
                fill
                sizes="(min-width: 1024px) 15vw, 40vw"
                className="object-cover object-[72%_50%]"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hours chip */}
      <motion.div
        className="absolute -right-1 top-[34%] sm:-right-5 lg:-right-6"
        style={{ y: chipY }}
      >
        <div className="load-fade-up" style={{ animationDelay: "1.3s" }}>
          <div className="animate-float-slow flex items-center gap-3 rounded-full bg-paper/95 py-2.5 pl-4 pr-5 shadow-soft backdrop-blur-sm">
            <span aria-hidden className="size-2 rounded-full bg-gold animate-pulse-dot" />
            <p className="text-[0.75rem] font-semibold leading-tight text-charcoal">
              Open all week
              <span className="block font-medium text-stone">9 AM – 9 PM</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Rotating seal */}
      <div className="load-fade-up absolute -bottom-9 right-3 sm:right-6" style={{ animationDelay: "1.5s" }}>
        <Link
          href="#book"
          aria-label="Book a consultation"
          className="group relative grid size-[6.75rem] place-items-center rounded-full bg-charcoal text-ivory shadow-lift transition-colors duration-700 ease-luxe hover:bg-gold hover:text-charcoal sm:size-[7.5rem]"
        >
          <svg aria-hidden viewBox="0 0 120 120" className="absolute inset-0 size-full animate-spin-slow">
            <defs>
              <path id="hero-seal" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
            </defs>
            <text
              fill="currentColor"
              fontSize="8.2"
              fontWeight="600"
              letterSpacing="2.4"
              style={{ textTransform: "uppercase" }}
            >
              <textPath href="#hero-seal" textLength="278" lengthAdjust="spacing">
                Book a consultation · ToothCraft Chennai ·
              </textPath>
            </text>
          </svg>
          <ArrowUpRight
            aria-hidden
            className="size-6 text-gold-soft transition-all duration-700 ease-luxe group-hover:rotate-45 group-hover:text-charcoal"
            strokeWidth={1.5}
          />
        </Link>
      </div>
    </div>
  );
}
