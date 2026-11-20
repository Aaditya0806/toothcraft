"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronDown, Phone, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { lockScroll, unlockScroll } from "@/components/motion/SmoothScroll";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { defaultWhatsappMessage, primaryNav, secondaryNav, site, whatsappLink } from "@/data/site";
import { services, treatmentCategories, treatmentsByCategory } from "@/data/treatments";
import { cn, pad } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const megaColumns = [
  { ids: ["smile"] as const, span: "col-span-3" },
  { ids: ["restorative"] as const, span: "col-span-3" },
  { ids: ["gums", "alignment"] as const, span: "col-span-2" },
  { ids: ["family"] as const, span: "col-span-2" },
];

const mobileLinks = [
  { label: "Home", href: "/" },
  ...primaryNav.slice(0, 2),
  { label: "Treatments", href: "/treatments" },
  ...primaryNav.slice(3, 5),
  ...secondaryNav,
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileTreatmentsOpen, setMobileTreatmentsOpen] = useState(false);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaTrigger = useRef<HTMLButtonElement>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const menuClose = useRef<HTMLButtonElement>(null);

  // Solid background once the page has moved.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on navigation.
  useEffect(() => {
    setMegaOpen(false);
    setMenuOpen(false);
    setMobileTreatmentsOpen(false);
  }, [pathname]);

  // Escape closes whichever layer is open and returns focus to its trigger.
  useEffect(() => {
    if (!megaOpen && !menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (menuOpen) {
        setMenuOpen(false);
        menuToggle.current?.focus();
      } else {
        setMegaOpen(false);
        megaTrigger.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen, menuOpen]);

  // Lock the page behind the mobile menu.
  useEffect(() => {
    if (!menuOpen) return;
    lockScroll();
    const focusTimer = setTimeout(() => menuClose.current?.focus(), 120);
    return () => {
      clearTimeout(focusTimer);
      unlockScroll();
    };
  }, [menuOpen]);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setMegaOpen(false), 160);
  }, [cancelClose]);
  const openMega = useCallback(() => {
    cancelClose();
    setMegaOpen(true);
  }, [cancelClose]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const solid = scrolled || megaOpen;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-charcoal focus:px-5 focus:py-3 focus:text-sm focus:text-ivory"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-luxe",
          solid
            ? "bg-ivory/90 shadow-[0_1px_0_rgba(34,35,33,0.08)] backdrop-blur-xl"
            : "bg-transparent",
        )}
        onMouseLeave={megaOpen ? scheduleClose : undefined}
      >
        <div
          className={cn(
            "wrap flex items-center justify-between gap-6 transition-[height] duration-500 ease-luxe",
            scrolled ? "h-[4.75rem]" : "h-[5.25rem] lg:h-24",
          )}
        >
          <Link href="/" aria-label="ToothCraft — home" className="relative z-10 shrink-0 text-charcoal">
            <BrandLogo className="w-[8.75rem] sm:w-[9.75rem]" />
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-9 2xl:gap-11">
              {primaryNav.map((item) =>
                item.href === "/treatments" ? (
                  <li key={item.href}>
                    <button
                      ref={megaTrigger}
                      type="button"
                      className={cn(
                        "nav-link flex items-center gap-1.5 text-[0.8125rem] font-semibold tracking-[0.04em] text-charcoal",
                      )}
                      aria-expanded={megaOpen}
                      aria-controls="treatments-menu"
                      aria-current={isActive(item.href) ? "page" : undefined}
                      onMouseEnter={openMega}
                      onClick={() => setMegaOpen((open) => !open)}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden
                        className={cn(
                          "size-3.5 transition-transform duration-500 ease-luxe",
                          megaOpen && "rotate-180",
                        )}
                        strokeWidth={2}
                      />
                    </button>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="nav-link text-[0.8125rem] font-semibold tracking-[0.04em] text-charcoal"
                      aria-current={isActive(item.href) ? "page" : undefined}
                      onMouseEnter={megaOpen ? scheduleClose : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${site.phone.tel}`}
              className="hidden items-center gap-2.5 pr-2 text-[0.8125rem] font-semibold text-charcoal transition-colors hover:text-gold-deep 2xl:flex"
            >
              <span className="grid size-9 place-items-center rounded-full border hairline">
                <Phone aria-hidden className="size-3.5" strokeWidth={1.75} />
              </span>
              {site.phone.display}
            </a>
            <Link href="/contact#book" className="btn btn-sm hidden sm:inline-flex">
              <span>Book Appointment</span>
              <ArrowUpRight aria-hidden className="btn-icon size-4" strokeWidth={1.75} />
            </Link>
            <button
              ref={menuToggle}
              type="button"
              className="grid size-11 place-items-center rounded-full border hairline text-charcoal transition-colors hover:bg-charcoal hover:text-ivory xl:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <span aria-hidden className="flex w-[1.125rem] flex-col gap-[5px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-full bg-current" />
              </span>
            </button>
          </div>
        </div>

        {/* Treatments mega menu (desktop) */}
        <AnimatePresence>
          {megaOpen ? (
            <motion.div
              id="treatments-menu"
              className="absolute inset-x-0 top-full hidden xl:block"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.45, ease: EASE }}
              onMouseEnter={cancelClose}
            >
              <div className="wrap">
                <div className="grid grid-cols-12 gap-x-8 rounded-b-[2rem] border border-t-0 hairline bg-paper px-10 pb-10 pt-9 shadow-lift">
                  {megaColumns.map((column) => (
                    <div key={column.ids.join("-")} className={cn(column.span, "space-y-8")}>
                      {column.ids.map((id) => {
                        const category = treatmentCategories.find((entry) => entry.id === id)!;
                        return (
                          <div key={id}>
                            <p className="eyebrow text-gold-deep">{category.label}</p>
                            <ul className="mt-4 space-y-1">
                              {treatmentsByCategory(id).map((treatment) => (
                                <li key={treatment.slug}>
                                  <Link
                                    href={`/treatments/${treatment.slug}`}
                                    className="group/item flex items-center gap-0 py-1.5 text-[0.9375rem] text-charcoal/80 transition-colors duration-300 hover:text-charcoal"
                                  >
                                    <span
                                      aria-hidden
                                      className="h-px w-0 bg-gold transition-all duration-500 ease-luxe group-hover/item:mr-3 group-hover/item:w-4"
                                    />
                                    {treatment.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                  <Link
                    href="/treatments"
                    className="group relative col-span-2 block min-h-[16rem] overflow-hidden rounded-[1.25rem]"
                  >
                    <Image
                      src="/images/stock/smile-closeup.jpg"
                      alt=""
                      fill
                      sizes="240px"
                      className="object-cover object-[70%_50%] transition-transform duration-[1600ms] ease-luxe group-hover:scale-110"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent"
                    />
                    <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 text-ivory">
                      <span>
                        <span className="eyebrow block whitespace-nowrap text-gold-soft">{services.length} treatments</span>
                        <span className="mt-2 block font-display text-2xl leading-tight">View all treatments</span>
                      </span>
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ivory text-charcoal transition-transform duration-500 ease-luxe group-hover:-translate-y-1 group-hover:translate-x-1">
                        <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.75} />
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      {/* Full-screen menu (mobile and tablet) */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[70] flex flex-col bg-charcoal text-ivory xl:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <div className="wrap flex h-[5.25rem] shrink-0 items-center justify-between">
              <Link href="/" aria-label="ToothCraft — home" className="text-ivory" onClick={() => setMenuOpen(false)}>
                <BrandLogo className="w-[8.75rem] sm:w-[9.75rem]" />
              </Link>
              <button
                ref={menuClose}
                type="button"
                className="grid size-11 place-items-center rounded-full border hairline-light text-ivory transition-colors hover:bg-ivory hover:text-charcoal"
                aria-label="Close menu"
                onClick={() => {
                  setMenuOpen(false);
                  menuToggle.current?.focus();
                }}
              >
                <span aria-hidden className="relative block size-[1.125rem]">
                  <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
                  <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" />
                </span>
              </button>
            </div>

            <div data-lenis-prevent className="wrap flex-1 overflow-y-auto overscroll-contain pb-8 pt-4">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: 0.25 } } }}
              >
                {mobileLinks.map((item, index) => {
                  const isTreatments = item.href === "/treatments";
                  return (
                    <motion.li
                      key={item.href}
                      className="border-b hairline-light"
                      variants={{
                        hidden: { opacity: 0, y: 26 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
                      }}
                    >
                      {isTreatments ? (
                        <>
                          <button
                            type="button"
                            className="flex w-full items-baseline gap-4 py-4 text-left"
                            aria-expanded={mobileTreatmentsOpen}
                            aria-controls="mobile-treatments"
                            onClick={() => setMobileTreatmentsOpen((open) => !open)}
                          >
                            <span className="label-caps w-6 text-gold-soft">{pad(index + 1)}</span>
                            <span className="flex-1 font-display text-[2rem] leading-none sm:text-[2.5rem]">
                              {item.label}
                            </span>
                            <Plus
                              aria-hidden
                              className={cn(
                                "size-5 self-center text-gold-soft transition-transform duration-500 ease-luxe",
                                mobileTreatmentsOpen && "rotate-45",
                              )}
                              strokeWidth={1.5}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {mobileTreatmentsOpen ? (
                              <motion.div
                                id="mobile-treatments"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.55, ease: EASE }}
                                className="overflow-hidden"
                              >
                                <ul className="grid grid-cols-2 gap-x-6 gap-y-1 pb-6 pl-10 sm:grid-cols-3">
                                  {services.map((treatment) => (
                                    <li key={treatment.slug}>
                                      <Link
                                        href={`/treatments/${treatment.slug}`}
                                        className="block py-2 text-[0.9375rem] text-ivory/75"
                                        onClick={() => setMenuOpen(false)}
                                      >
                                        {treatment.name}
                                      </Link>
                                    </li>
                                  ))}
                                  <li className="col-span-full pt-3">
                                    <Link
                                      href="/treatments"
                                      className="link-line text-gold-soft"
                                      onClick={() => setMenuOpen(false)}
                                    >
                                      <span>View all treatments</span>
                                      <ArrowUpRight aria-hidden className="link-icon size-4" strokeWidth={1.75} />
                                    </Link>
                                  </li>
                                </ul>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className="flex items-baseline gap-4 py-4"
                          aria-current={isActive(item.href) ? "page" : undefined}
                          onClick={() => setMenuOpen(false)}
                        >
                          <span className="label-caps w-6 text-gold-soft">{pad(index + 1)}</span>
                          <span
                            className={cn(
                              "font-display text-[2rem] leading-none sm:text-[2.5rem]",
                              isActive(item.href) && "italic text-gold-soft",
                            )}
                          >
                            {item.label}
                          </span>
                        </Link>
                      )}
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>

            <motion.div
              className="wrap shrink-0 border-t hairline-light pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            >
              <p className="label-caps text-ivory/55">{site.hours.short}</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <a href={`tel:${site.phone.tel}`} className="btn btn-outline-light btn-sm">
                  <Phone aria-hidden className="size-4" strokeWidth={1.75} />
                  <span>Call Now</span>
                </a>
                <a
                  href={whatsappLink(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-light btn-sm"
                >
                  <WhatsAppIcon className="size-4" />
                  <span>WhatsApp</span>
                </a>
                <Link
                  href="/contact#book"
                  className="btn btn-gold col-span-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <span>Book Your Appointment</span>
                  <ArrowUpRight aria-hidden className="btn-icon size-4" strokeWidth={1.75} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
