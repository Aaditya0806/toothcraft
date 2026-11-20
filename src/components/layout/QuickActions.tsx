"use client";

import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { defaultWhatsappMessage, site, whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Persistent conversion shortcuts:
 *  - a bottom bar on phones and tablets (Call · WhatsApp · Book)
 *  - a floating WhatsApp button on desktop
 * Both appear once the visitor has scrolled past the first screen.
 */
export function QuickActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        aria-label="Quick actions"
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-700 ease-luxe lg:hidden",
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
        )}
      >
        <ul className="mx-auto grid max-w-md grid-cols-[1fr_1fr_1.35fr] items-stretch gap-1 rounded-full border border-ivory/10 bg-charcoal/95 p-1.5 text-ivory shadow-lift backdrop-blur-md">
          <li>
            <a
              href={`tel:${site.phone.tel}`}
              className="flex h-12 items-center justify-center gap-2 rounded-full text-[0.6875rem] font-bold uppercase tracking-[0.12em] transition-colors active:bg-ivory/10"
            >
              <Phone aria-hidden className="size-4 text-gold-soft" strokeWidth={1.75} />
              Call
            </a>
          </li>
          <li>
            <a
              href={whatsappLink(defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2 rounded-full text-[0.6875rem] font-bold uppercase tracking-[0.12em] transition-colors active:bg-ivory/10"
            >
              <WhatsAppIcon className="size-4 text-gold-soft" />
              WhatsApp
            </a>
          </li>
          <li>
            <Link
              href="/contact#book"
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-gold text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-charcoal"
            >
              <CalendarCheck aria-hidden className="size-4" strokeWidth={1.75} />
              Book
            </Link>
          </li>
        </ul>
      </nav>

      <a
        href={whatsappLink(defaultWhatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Enquire on WhatsApp"
        className={cn(
          "group fixed bottom-7 right-7 z-40 hidden h-14 items-center gap-0 overflow-hidden rounded-full bg-charcoal pl-[1.0625rem] pr-[1.0625rem] text-ivory shadow-lift transition-all duration-700 ease-luxe hover:gap-3 hover:bg-gold hover:pr-6 hover:text-charcoal lg:flex",
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
        )}
      >
        <WhatsAppIcon className="size-[1.375rem] shrink-0 text-gold-soft transition-colors duration-500 group-hover:text-charcoal" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.6875rem] font-bold uppercase tracking-[0.14em] transition-[max-width] duration-700 ease-luxe group-hover:max-w-[12rem]">
          WhatsApp Enquiry
        </span>
      </a>
    </>
  );
}
