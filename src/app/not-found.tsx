import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

const suggestions = [
  { label: "Treatments", href: "/treatments" },
  { label: "Our Clinics", href: "/clinics" },
  { label: "Our Dentists", href: "/dentists" },
  { label: "Smile Gallery", href: "/smile-gallery" },
];

export default function NotFound() {
  return (
    <section className="wrap flex min-h-svh flex-col justify-center pb-24 pt-40">
      <p className="eyebrow text-gold-deep">Error 404</p>
      <h1 className="load-fade-up mt-6 max-w-4xl font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[1] tracking-[-0.02em]">
        This page seems to have <em className="text-gold-deep">slipped away.</em>
      </h1>
      <p className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-stone">
        The page you are looking for may have moved or no longer exists. Let&rsquo;s get you back to
        something useful.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to Home</ButtonLink>
        <ButtonLink href="/contact#book" variant="outline" arrow={false}>
          Book an Appointment
        </ButtonLink>
      </div>
      <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t hairline pt-8">
        {suggestions.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="nav-link text-[0.9375rem] font-semibold">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
