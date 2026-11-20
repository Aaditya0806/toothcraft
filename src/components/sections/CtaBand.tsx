import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { defaultWhatsappMessage, site, whatsappLink } from "@/data/site";

type CtaBandProps = {
  /** Use [[double brackets]] around the phrase to emphasise. */
  title?: string;
  text?: string;
  /** Where the primary button leads; defaults to the booking form. */
  bookHref?: string;
  whatsappMessage?: string;
};

/** Closing call-to-action used at the foot of inner pages. */
export function CtaBand({
  title = "Ready when you are. [[Let's plan your visit.]]",
  text = "Request an appointment online, or speak to our team directly — we are open 9 AM to 9 PM, all week.",
  bookHref = "/contact#book",
  whatsappMessage = defaultWhatsappMessage,
}: CtaBandProps) {
  return (
    <section className="pb-20 pt-4 lg:pb-28">
      <div className="wrap">
        <div className="grain relative isolate overflow-hidden rounded-[2rem] bg-charcoal px-6 py-14 text-ivory sm:px-12 sm:py-16 lg:rounded-[2.5rem] lg:px-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-x-12">
            <div className="lg:col-span-7">
              <p className="eyebrow text-gold-soft">Book an Appointment</p>
              <TextReveal
                text={title}
                className="display-lg mt-6 text-ivory"
                accentClassName="italic text-gold-soft"
              />
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ivory/70">{text}</p>
              </Reveal>
            </div>
            <Reveal delay={0.25} className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <Link href={bookHref} className="btn btn-gold">
                <span>Book Appointment</span>
                <ArrowUpRight aria-hidden className="btn-icon size-4" strokeWidth={1.75} />
              </Link>
              <a href={`tel:${site.phone.tel}`} className="btn btn-outline-light">
                <Phone aria-hidden className="size-4" strokeWidth={1.75} />
                <span>Call Now</span>
              </a>
              <a
                href={whatsappLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light"
              >
                <WhatsAppIcon className="size-4" />
                <span>WhatsApp Enquiry</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
