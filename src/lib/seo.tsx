import type { Metadata } from "next";
import { clinics, type Clinic } from "@/data/clinics";
import type { Faq } from "@/data/faqs";
import { site } from "@/data/site";

/** Renders a JSON-LD block. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

/** Consistent title, description, canonical and Open Graph tags for a page. */
export function pageMetadata({ title, description, path, image = "/og-image.jpg" }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: `${site.name} Dental Clinics`,
      title: `${title} | ${site.name}`,
      description,
      url: path,
      images: [{ url: image, width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [image],
    },
  };
}

const openingHours = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  opens: site.hours.opens,
  closes: site.hours.closes,
};

export function clinicSchema(clinic: Clinic) {
  return {
    "@type": "Dentist",
    "@id": `${site.url}/clinics/${clinic.slug}#clinic`,
    name: `${site.name} Dental Clinic — ${clinic.name}`,
    url: `${site.url}/clinics/${clinic.slug}`,
    image: `${site.url}${clinic.image}`,
    telephone: clinic.phones[0].tel,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.streetAddress,
      addressLocality: clinic.name,
      addressRegion: "Tamil Nadu",
      postalCode: clinic.postalCode,
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: clinic.geo.lat, longitude: clinic.geo.lng },
    hasMap: clinic.directionsUrl,
    openingHoursSpecification: [openingHours],
    medicalSpecialty: "Dentistry",
    parentOrganization: { "@id": `${site.url}/#organization` },
  };
}

/** Organisation + one Dentist entry per clinic, using only published business details. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        alternateName: ["Tooth Craft", site.formalName],
        url: site.url,
        logo: `${site.url}/images/brand/logo-original.png`,
        image: `${site.url}/og-image.jpg`,
        description: site.description,
        foundingDate: String(site.founded),
        founder: { "@type": "Person", name: site.founder },
        email: site.email,
        telephone: site.phone.tel,
        areaServed: ["Chennai", ...clinics.map((clinic) => clinic.name)],
        sameAs: [site.social.facebook, site.social.instagram, site.social.x],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: `${site.name} Dental Clinics`,
        publisher: { "@id": `${site.url}/#organization` },
        inLanguage: "en-IN",
      },
      ...clinics.map(clinicSchema),
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function faqSchema(items: Pick<Faq, "q" | "a">[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
