"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { TreatmentCard } from "@/components/sections/TreatmentCard";
import { treatmentCategories, type Treatment, type TreatmentCategoryId } from "@/data/treatments";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type Filter = "all" | TreatmentCategoryId;

/** Filterable grid of every treatment, with animated re-ordering. */
export function TreatmentsBrowser({ treatments }: { treatments: Treatment[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? treatments : treatments.filter((item) => item.category === filter);
  const activeCategory = treatmentCategories.find((category) => category.id === filter);

  const options: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All Treatments", count: treatments.length },
    ...treatmentCategories.map((category) => ({
      id: category.id as Filter,
      label: category.label,
      count: treatments.filter((item) => item.category === category.id).length,
    })),
  ];

  return (
    <div>
      <div
        role="group"
        aria-label="Filter treatments by category"
        className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-1 lg:mx-0 lg:flex-wrap lg:px-0"
      >
        {options.map((option) => {
          const selected = option.id === filter;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(option.id)}
              className={cn(
                "flex shrink-0 items-center gap-2.5 rounded-full border px-5 py-3 text-[0.8125rem] font-semibold tracking-[0.02em] transition-colors duration-500 ease-luxe",
                selected
                  ? "border-charcoal bg-charcoal text-ivory"
                  : "hairline text-stone hover:border-charcoal hover:text-charcoal",
              )}
            >
              {option.label}
              <span className={cn("text-[0.6875rem] font-bold", selected ? "text-gold-soft" : "text-mist")}>
                {String(option.count).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-7 min-h-6 text-[0.9375rem] text-stone">
        {activeCategory
          ? `${activeCategory.clinical} — ${activeCategory.blurb}`
          : "Sixteen treatments across every area of dentistry."}
      </p>

      <motion.ul layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7 2xl:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((treatment, index) => (
            <motion.li
              key={treatment.slug}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.55, ease: EASE, delay: Math.min(index, 8) * 0.035 }}
            >
              <TreatmentCard
                treatment={treatment}
                sizes="(min-width: 1536px) 23vw, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
                aspect="aspect-[4/5]"
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
