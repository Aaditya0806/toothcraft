import Link from "next/link";
import { ArrowUpRight, Clock, Mail, Phone } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, XIcon } from "@/components/ui/SocialIcons";
import { clinics } from "@/data/clinics";
import { defaultWhatsappMessage, primaryNav, secondaryNav, site, whatsappLink } from "@/data/site";
import { services } from "@/data/treatments";

const footerTreatments = [
  "dental-implants",
  "root-canal-treatment",
  "orthodontics",
  "cosmetic-dentistry",
  "dental-veneers",
  "teeth-whitening",
  "smile-makeover",
  "pediatric-dentistry",
];

const socials = [
  { label: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { label: "X (Twitter)", href: site.social.x, Icon: XIcon },
];

export function Footer() {
  const year = new Date().getFullYear();
  const treatmentLinks = footerTreatments
    .map((slug) => services.find((treatment) => treatment.slug === slug))
    .filter((treatment): treatment is NonNullable<typeof treatment> => Boolean(treatment));

  return (
    <footer className="grain relative isolate overflow-hidden bg-charcoal text-ivory">
      <div className="wrap relative pb-28 pt-20 lg:pb-12 lg:pt-28">
        {/* Closing statement */}
        <div className="flex flex-col gap-10 border-b hairline-light pb-16 lg:flex-row lg:items-end lg:justify-between lg:pb-20">
          <p className="max-w-3xl font-display text-[clamp(2.25rem,4.6vw,4.5rem)] leading-[1.02] tracking-[-0.015em]">
            Thoughtful dentistry, <em className="text-gold-soft">crafted around you.</em>
          </p>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href="/contact#book" className="btn btn-gold">
              <span>Book Appointment</span>
              <ArrowUpRight aria-hidden className="btn-icon size-4" strokeWidth={1.75} />
            </Link>
            <a
              href={whatsappLink(defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light"
            >
              <WhatsAppIcon className="size-4" />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>
        </div>

        <div className="grid gap-x-10 gap-y-14 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-3">
            <Link href="/" aria-label="ToothCraft — home" className="inline-block text-ivory">
              <BrandLogo className="w-[11rem]" />
            </Link>
            <p className="mt-7 max-w-sm text-[0.9375rem] leading-relaxed text-ivory/65">
              A multi-speciality dental practice caring for Chennai since {site.founded} — personalised
              treatment, experienced dentists and comfortable clinics in Saidapet, Ashok Nagar and
              Mugalivakkam.
            </p>
            <ul className="mt-8 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`ToothCraft on ${label}`}
                    className="grid size-11 place-items-center rounded-full border hairline-light text-ivory/80 transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-charcoal"
                  >
                    <Icon className="size-[1.125rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <nav aria-label="Footer — explore" className="lg:col-span-2">
            <h2 className="eyebrow text-gold-soft">Explore</h2>
            <ul className="mt-6 space-y-3 text-[0.9375rem] text-ivory/75">
              {[...primaryNav, ...secondaryNav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors duration-300 hover:text-gold-soft">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Treatments */}
          <nav aria-label="Footer — treatments" className="lg:col-span-2">
            <h2 className="eyebrow text-gold-soft">Treatments</h2>
            <ul className="mt-6 space-y-3 text-[0.9375rem] text-ivory/75">
              {treatmentLinks.map((treatment) => (
                <li key={treatment.slug}>
                  <Link
                    href={`/treatments/${treatment.slug}`}
                    className="transition-colors duration-300 hover:text-gold-soft"
                  >
                    {treatment.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/treatments" className="text-gold-soft underline underline-offset-4">
                  All treatments
                </Link>
              </li>
            </ul>
          </nav>

          {/* Clinics */}
          <div className="sm:col-span-2 lg:col-span-5">
            <h2 className="eyebrow text-gold-soft">Our Clinics</h2>
            <ul className="mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-3">
              {clinics.map((clinic) => (
                <li key={clinic.slug}>
                  <Link
                    href={`/clinics/${clinic.slug}`}
                    className="font-display text-xl leading-none transition-colors duration-300 hover:text-gold-soft"
                  >
                    {clinic.name}
                  </Link>
                  <address className="mt-3 text-[0.8125rem] not-italic leading-relaxed text-ivory/60">
                    {clinic.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <a
                    href={`tel:${clinic.phones[0].tel}`}
                    className="mt-3 inline-block text-[0.875rem] text-ivory/85 transition-colors duration-300 hover:text-gold-soft"
                  >
                    {clinic.phones[0].display}
                  </a>
                </li>
              ))}
            </ul>

            <ul className="mt-10 space-y-3 border-t hairline-light pt-8 text-[0.9375rem] text-ivory/80">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-3 transition-colors duration-300 hover:text-gold-soft"
                >
                  <Mail aria-hidden className="size-4 text-gold-soft" strokeWidth={1.5} />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.tel}`}
                  className="inline-flex items-center gap-3 transition-colors duration-300 hover:text-gold-soft"
                >
                  <Phone aria-hidden className="size-4 text-gold-soft" strokeWidth={1.5} />
                  {site.phone.display}
                </a>
              </li>
              <li className="inline-flex items-center gap-3">
                <Clock aria-hidden className="size-4 text-gold-soft" strokeWidth={1.5} />
                {site.hours.label}, {site.hours.days}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t hairline-light pt-8 text-[0.8125rem] text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.formalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            <li>
              <Link href="/privacy-policy" className="transition-colors duration-300 hover:text-gold-soft">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors duration-300 hover:text-gold-soft">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/treatments/brushing-techniques"
                className="transition-colors duration-300 hover:text-gold-soft"
              >
                Brushing Guide
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
