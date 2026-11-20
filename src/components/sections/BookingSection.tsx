import { Clock, Mail, Phone } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { AppointmentForm } from "@/components/sections/AppointmentForm";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clinics } from "@/data/clinics";
import { defaultWhatsappMessage, site, whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";

type BookingSectionProps = {
  /** Heading level for the section title (h1 on the contact page). */
  as?: "h1" | "h2";
  className?: string;
};

/** Appointment request form with every direct contact route alongside it. */
export function BookingSection({ as = "h2", className }: BookingSectionProps) {
  const contactRoutes = [
    {
      label: "Call us",
      value: site.phone.display,
      href: `tel:${site.phone.tel}`,
      icon: <Phone aria-hidden className="size-[1.125rem]" strokeWidth={1.5} />,
    },
    {
      label: "WhatsApp enquiry",
      value: "Message us on WhatsApp",
      href: whatsappLink(defaultWhatsappMessage),
      external: true,
      icon: <WhatsAppIcon className="size-[1.125rem]" />,
    },
    {
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
      icon: <Mail aria-hidden className="size-[1.125rem]" strokeWidth={1.5} />,
    },
  ];

  return (
    <section id="book" className={cn("section-y scroll-mt-10 bg-sand", className)}>
      <div className="wrap grid gap-y-14 lg:grid-cols-12 lg:gap-x-14 xl:gap-x-20">
        <div className="lg:col-span-5">
          <SectionHeading
            as={as}
            eyebrow="Book an Appointment"
            title="Your Journey to a Healthier Smile [[Begins Here.]]"
            lede="Share a few details and our team will call you back to arrange a time that suits you. Prefer to talk? Call or message us — we are happy to help."
          />

          <Stagger as="ul" gap={0.08} className="mt-10 border-t hairline">
            {contactRoutes.map((route) => (
              <StaggerItem as="li" key={route.label} y={16} className="border-b hairline">
                <a
                  href={route.href}
                  {...(route.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-5 py-5"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border hairline text-gold-deep transition-colors duration-500 ease-luxe group-hover:border-charcoal group-hover:bg-charcoal group-hover:text-ivory">
                    {route.icon}
                  </span>
                  <span>
                    <span className="label-caps block text-stone">{route.label}</span>
                    <span className="mt-1 block text-[1.0625rem] font-semibold text-charcoal">{route.value}</span>
                  </span>
                </a>
              </StaggerItem>
            ))}
            <StaggerItem as="li" y={16} className="flex items-center gap-5 border-b hairline py-5">
              <span className="grid size-12 shrink-0 place-items-center rounded-full border hairline text-gold-deep">
                <Clock aria-hidden className="size-[1.125rem]" strokeWidth={1.5} />
              </span>
              <span>
                <span className="label-caps block text-stone">Consulting hours</span>
                <span className="mt-1 block text-[1.0625rem] font-semibold text-charcoal">
                  {site.hours.label}, {site.hours.days}
                </span>
              </span>
            </StaggerItem>
          </Stagger>

          <Reveal delay={0.15} className="mt-9">
            <p className="label-caps text-stone">Call a clinic directly</p>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-[0.9375rem]">
              {clinics.map((clinic) => (
                <li key={clinic.slug}>
                  <span className="text-stone">{clinic.name} · </span>
                  <a
                    href={`tel:${clinic.phones[0].tel}`}
                    className="font-semibold text-charcoal underline decoration-gold/60 underline-offset-4 hover:text-gold-deep"
                  >
                    {clinic.phones[0].display}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal y={36} delay={0.1} className="lg:col-span-7">
          <div className="relative rounded-[2rem] bg-paper p-6 shadow-soft sm:p-10 lg:p-12">
            <AppointmentForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
