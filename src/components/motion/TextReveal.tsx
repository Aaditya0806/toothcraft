"use client";

import { motion } from "motion/react";
import { createElement } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type TextRevealProps = {
  /**
   * Heading text. Wrap a phrase in [[double brackets]] to set it in italic
   * with the gold accent, e.g. "More Than Dentistry. [[A Commitment to Every Smile.]]"
   */
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** Class applied to the emphasised phrase. */
  accentClassName?: string;
  /** "view" animates when scrolled into view; "load" animates on page load with CSS only. */
  mode?: "view" | "load";
  delay?: number;
  /** Seconds between words. */
  gap?: number;
  id?: string;
};

type Word = { text: string; accent: boolean };

function parse(text: string): Word[] {
  const words: Word[] = [];
  text.split(/(\[\[.*?\]\])/g).forEach((segment) => {
    if (!segment) return;
    const accent = segment.startsWith("[[") && segment.endsWith("]]");
    const clean = accent ? segment.slice(2, -2) : segment;
    clean
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word) => words.push({ text: word, accent }));
  });
  return words;
}

/**
 * Reveals a heading word by word from behind a mask.
 * The full sentence is exposed to assistive technology via aria-label, while
 * the animated word fragments are hidden from it.
 */
export function TextReveal({
  text,
  as = "h2",
  className,
  accentClassName = "italic text-gold-deep",
  mode = "view",
  delay = 0,
  gap = 0.055,
  id,
}: TextRevealProps) {
  const words = parse(text);
  const label = text.replace(/\[\[|\]\]/g, "");

  if (mode === "load") {
    return createElement(
      as,
      { className, "aria-label": label, id },
      words.map((word, index) => (
        <span key={`${word.text}-${index}`} aria-hidden="true">
          <span className="word-mask">
            <span
              className={cn("load-word", word.accent && accentClassName)}
              style={{ animationDelay: `${delay + index * gap}s` }}
            >
              {word.text}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      )),
    );
  }

  const Tag = motion[as] as typeof motion.h2;
  return (
    <Tag
      id={id}
      className={className}
      aria-label={label}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {words.map((word, index) => (
        <span key={`${word.text}-${index}`} aria-hidden="true">
          <span className="word-mask">
            <motion.span
              data-reveal
              className={cn("inline-block origin-bottom-left", word.accent && accentClassName)}
              variants={{
                hidden: { y: "118%", rotate: 3 },
                show: { y: "0%", rotate: 0, transition: { duration: 1.05, ease: EASE } },
              }}
            >
              {word.text}
            </motion.span>
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
