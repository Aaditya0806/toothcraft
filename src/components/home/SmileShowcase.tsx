"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import type { ComparisonPair } from "@/data/gallery";
import { cn, pad } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Treatment filter + interactive comparison. Selecting a treatment swaps the
 * photographs with a soft cross-fade.
 */
export function SmileShowcase({ pairs }: { pairs: ComparisonPair[] }) {
  const [active, setActive] = useState(0);
  const pair = pairs[active];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-14">
      <div
        role="tablist"
        aria-label="Treatment"
        aria-orientation="vertical"
        className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] lg:col-span-5 lg:mx-0 lg:block lg:overflow-visible lg:border-t lg:px-0 lg:hairline"
      >
        {pairs.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`smile-tab-${item.id}`}
              aria-selected={selected}
              aria-controls="smile-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "ArrowRight" && event.key !== "ArrowLeft")
                  return;
                event.preventDefault();
                const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
                const next = (index + (forward ? 1 : -1) + pairs.length) % pairs.length;
                setActive(next);
                document.getElementById(`smile-tab-${pairs[next].id}`)?.focus();
              }}
              className={cn(
                "group/tab flex shrink-0 items-center gap-4 whitespace-nowrap rounded-full border px-5 py-3 text-left transition-colors duration-500 ease-luxe",
                "lg:w-full lg:justify-between lg:whitespace-normal lg:rounded-none lg:border-x-0 lg:border-b lg:border-t-0 lg:px-1 lg:py-6 lg:hairline",
                selected
                  ? "border-charcoal bg-charcoal text-ivory lg:bg-transparent lg:text-charcoal"
                  : "hairline text-stone hover:text-charcoal",
              )}
            >
              <span className="flex items-baseline gap-5">
                <span
                  className={cn(
                    "label-caps hidden transition-colors duration-500 lg:inline",
                    selected ? "text-gold-deep" : "text-mist",
                  )}
                >
                  {pad(index + 1)}
                </span>
                <span
                  className={cn(
                    "text-[0.8125rem] font-semibold tracking-[0.02em] transition-all duration-700 ease-luxe lg:font-display lg:text-[1.9rem] lg:font-normal lg:leading-none lg:tracking-normal",
                    selected ? "lg:translate-x-2 lg:italic" : "lg:group-hover/tab:translate-x-1",
                  )}
                >
                  {item.treatment}
                </span>
              </span>
              <span
                aria-hidden
                className={cn(
                  "hidden h-px bg-gold transition-all duration-700 ease-luxe lg:block",
                  selected ? "w-12 opacity-100" : "w-0 opacity-0",
                )}
              />
            </button>
          );
        })}
      </div>

      <div id="smile-panel" role="tabpanel" aria-labelledby={`smile-tab-${pair.id}`} className="lg:col-span-7">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pair.id}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <BeforeAfter before={pair.before} after={pair.after} label={pair.treatment} />
          </motion.div>
        </AnimatePresence>
        <div className="mt-5 flex flex-col gap-2 text-[0.8125rem] text-stone sm:flex-row sm:items-center sm:justify-between">
          <p className="label-caps text-charcoal">Drag the handle to compare</p>
          <p>Photographs of ToothCraft patients. Individual results vary.</p>
        </div>
      </div>
    </div>
  );
}
