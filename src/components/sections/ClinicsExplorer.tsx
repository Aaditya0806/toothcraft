"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Landmark, MapPin, Navigation, Phone, UserRound } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Clinic } from "@/data/clinics";
import { cn, pad } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Interactive clinic finder: pick a location to see its photograph or map,
 * address, phone numbers, hours and the quickest ways to get in touch.
 */
export function ClinicsExplorer({ clinics, initial = 0 }: { clinics: Clinic[]; initial?: number }) {
  const [active, setActive] = useState(initial);
  const [view, setView] = useState<"photo" | "map">("photo");
  const clinic = clinics[active];

  const select = (index: number) => {
    setActive(index);
    setView("photo");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-12">
      {/* Location list */}
      <div
        role="tablist"
        aria-label="Clinic location"
        className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] lg:col-span-4 lg:mx-0 lg:block lg:overflow-visible lg:border-t lg:px-0 lg:hairline"
      >
        {clinics.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.slug}
              type="button"
              role="tab"
              id={`clinic-tab-${item.slug}`}
              aria-selected={selected}
              aria-controls="clinic-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(event) => {
                if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
                event.preventDefault();
                const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
                const next = (index + (forward ? 1 : -1) + clinics.length) % clinics.length;
                select(next);
                document.getElementById(`clinic-tab-${clinics[next].slug}`)?.focus();
              }}
              className={cn(
                "group/tab shrink-0 rounded-full border px-5 py-3 text-left transition-colors duration-500 ease-luxe",
                "lg:block lg:w-full lg:rounded-none lg:border-x-0 lg:border-b lg:border-t-0 lg:px-1 lg:py-7 lg:hairline",
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
                <span>
                  <span
                    className={cn(
                      "block text-[0.8125rem] font-semibold tracking-[0.02em] transition-all duration-700 ease-luxe lg:font-display lg:text-[2.4rem] lg:font-normal lg:leading-none lg:tracking-[-0.01em]",
                      selected ? "lg:translate-x-2 lg:italic" : "lg:group-hover/tab:translate-x-1",
                    )}
                  >
                    {item.name}
                  </span>
                  <span
                    className={cn(
                      "mt-3 hidden text-[0.875rem] leading-relaxed transition-all duration-700 ease-luxe lg:block",
                      selected ? "translate-x-2 text-stone" : "text-stone/75",
                    )}
                  >
                    {item.landmark}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Details */}
      <div id="clinic-panel" role="tabpanel" aria-labelledby={`clinic-tab-${clinic.slug}`} className="lg:col-span-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={clinic.slug}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="grid overflow-hidden rounded-[2rem] border hairline bg-paper shadow-soft md:grid-cols-[1.2fr_1fr]"
          >
            {/* Photo / map */}
            <div className="relative min-h-[17rem] bg-champagne md:min-h-[29rem]">
              {view === "photo" ? (
                <Image
                  src={clinic.image}
                  alt={clinic.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 92vw"
                  className="photo-grade object-cover"
                />
              ) : (
                <iframe
                  title={`Map showing ToothCraft ${clinic.name}`}
                  src={clinic.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 size-full border-0 grayscale-[0.35]"
                />
              )}
              <div className="absolute left-4 top-4 flex rounded-full bg-ivory/95 p-1 shadow-soft backdrop-blur-sm">
                {(["photo", "map"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={view === option}
                    onClick={() => setView(option)}
                    className={cn(
                      "label-caps rounded-full px-4 py-2.5 transition-colors duration-500 ease-luxe",
                      view === option ? "bg-charcoal text-ivory" : "text-stone hover:text-charcoal",
                    )}
                  >
                    {option === "photo" ? "Clinic" : "Map"}
                  </button>
                ))}
              </div>
            </div>

            {/* Information */}
            <div className="flex flex-col p-6 sm:p-9">
              <p className="eyebrow text-gold-deep">ToothCraft Dental Clinic</p>
              <h3 className="mt-3 font-display text-[2.4rem] leading-none tracking-[-0.01em]">{clinic.name}</h3>

              <dl className="mt-7 space-y-5 text-[0.9375rem]">
                <div className="flex gap-4">
                  <dt>
                    <MapPin aria-hidden className="mt-0.5 size-[1.125rem] text-gold-deep" strokeWidth={1.5} />
                    <span className="sr-only">Address</span>
                  </dt>
                  <dd>
                    <address className="not-italic leading-relaxed text-charcoal">
                      {clinic.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt>
                    <Landmark aria-hidden className="mt-0.5 size-[1.125rem] text-gold-deep" strokeWidth={1.5} />
                    <span className="sr-only">Landmark</span>
                  </dt>
                  <dd className="text-stone">{clinic.landmark}</dd>
                </div>
                <div className="flex gap-4">
                  <dt>
                    <Phone aria-hidden className="mt-0.5 size-[1.125rem] text-gold-deep" strokeWidth={1.5} />
                    <span className="sr-only">Phone</span>
                  </dt>
                  <dd className="flex flex-wrap gap-x-4 gap-y-1">
                    {clinic.phones.map((phone) => (
                      <a
                        key={phone.tel}
                        href={`tel:${phone.tel}`}
                        className="font-semibold text-charcoal underline decoration-gold/60 underline-offset-4 transition-colors hover:text-gold-deep"
                      >
                        {phone.display}
                      </a>
                    ))}
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt>
                    <Clock aria-hidden className="mt-0.5 size-[1.125rem] text-gold-deep" strokeWidth={1.5} />
                    <span className="sr-only">Consulting hours</span>
                  </dt>
                  <dd className="text-stone">
                    <span className="text-charcoal">{clinic.hours}</span> · {clinic.days}
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt>
                    <UserRound aria-hidden className="mt-0.5 size-[1.125rem] text-gold-deep" strokeWidth={1.5} />
                    <span className="sr-only">Dentist</span>
                  </dt>
                  <dd className="text-stone">{clinic.lead}</dd>
                </div>
              </dl>

              <div className="mt-auto flex flex-wrap gap-3 pt-9">
                <Link href={`/contact?clinic=${clinic.slug}#book`} className="btn btn-sm">
                  <span>Book Appointment</span>
                  <ArrowUpRight aria-hidden className="btn-icon size-4" strokeWidth={1.75} />
                </Link>
                <a
                  href={clinic.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  <Navigation aria-hidden className="size-4" strokeWidth={1.75} />
                  <span>Directions</span>
                </a>
              </div>
              <Link
                href={`/clinics/${clinic.slug}`}
                className="link-line mt-6 self-start text-charcoal"
              >
                <span>About this clinic</span>
                <ArrowUpRight aria-hidden className="link-icon size-4" strokeWidth={1.75} />
              </Link>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
