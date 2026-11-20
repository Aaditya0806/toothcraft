"use client";

import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export type AccordionItem = {
  q: string;
  /** Paragraph answer. */
  a?: string;
  /** Optional bullet list shown before the paragraph. */
  list?: string[];
  /** Optional small label shown above the question. */
  topic?: string;
};

type AccordionProps = {
  items: AccordionItem[];
  /** Index open on first render; pass -1 for all closed. */
  defaultOpen?: number;
  tone?: "dark" | "light";
  className?: string;
};

/** Accessible single-open accordion with a smooth height animation. */
export function Accordion({ items, defaultOpen = 0, tone = "dark", className }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const base = useId();
  const light = tone === "light";

  return (
    <div className={cn("border-t", light ? "hairline-light" : "hairline", className)}>
      {items.map((item, index) => {
        const expanded = open === index;
        const buttonId = `${base}-button-${index}`;
        const panelId = `${base}-panel-${index}`;
        return (
          <div key={item.q} className={cn("border-b", light ? "hairline-light" : "hairline")}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? -1 : index)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left sm:py-7"
              >
                <span>
                  {item.topic ? (
                    <span className={cn("label-caps mb-2 block", light ? "text-gold-soft" : "text-gold-deep")}>
                      {item.topic}
                    </span>
                  ) : null}
                  <span
                    className={cn(
                      "block font-display text-[1.45rem] font-medium leading-snug transition-colors duration-500 sm:text-[1.7rem]",
                      light ? "text-ivory" : "text-charcoal",
                    )}
                  >
                    {item.q}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-1 grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-luxe",
                    light ? "hairline-light text-ivory" : "hairline text-charcoal",
                    expanded
                      ? "rotate-45 border-gold bg-gold text-charcoal"
                      : "group-hover:border-gold group-hover:text-gold-deep",
                  )}
                >
                  <Plus className="size-4" strokeWidth={1.75} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {expanded ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      "max-w-2xl space-y-4 pb-8 pr-12 text-[1rem] leading-relaxed",
                      light ? "text-ivory/70" : "text-stone",
                    )}
                  >
                    {item.list ? (
                      <ul className="space-y-2.5">
                        {item.list.map((entry) => (
                          <li key={entry} className="relative pl-6">
                            <span aria-hidden className="absolute left-0 top-[0.8em] h-px w-3 bg-gold" />
                            {entry}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {item.a ? <p>{item.a}</p> : null}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
