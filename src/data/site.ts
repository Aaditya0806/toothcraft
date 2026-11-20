/**
 * Core business facts for ToothCraft.
 * Everything here is taken from the existing toothcrafts.com website.
 * Do not add statistics, awards or claims that the clinic has not published.
 */
export const site = {
  name: "ToothCraft",
  /** Name as written on the clinic signage and the previous website. */
  formalName: "Tooth Craft Multi-Speciality Dental Clinic",
  tagline: "Multi-speciality dental care in Chennai",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.toothcrafts.com").replace(/\/$/, ""),
  founded: 2007,
  founder: "Dr. Anand",
  email: "info@toothcrafts.com",
  /** Main line used for the "Call now" action on the previous site (Ashok Nagar clinic). */
  phone: { display: "+91 99402 69051", tel: "+919940269051" },
  /** WhatsApp number in international format without "+". */
  whatsapp: "919940269051",
  hours: {
    label: "9 AM – 9 PM",
    days: "Monday to Sunday",
    short: "Open 9 AM – 9 PM, all week",
    opens: "09:00",
    closes: "21:00",
  },
  /** Contact numbers published on the Dental Tourism page. */
  tourismPhones: [
    { display: "+91 99412 65427", tel: "+919941265427" },
    { display: "+91 97103 09360", tel: "+919710309360" },
  ],
  social: {
    facebook: "https://www.facebook.com/toothcraftmultispecialitydental",
    instagram: "https://www.instagram.com/toothcraft_dentalclinic/",
    x: "https://twitter.com/toothcrafts123",
  },
  description:
    "ToothCraft is a multi-speciality dental practice in Chennai with clinics in Saidapet, Ashok Nagar and Mugalivakkam. Personalised care, experienced dentists and a full range of treatments since 2007.",
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultWhatsappMessage =
  "Hello ToothCraft, I would like to enquire about a dental appointment.";

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Our Dentists", href: "/dentists" },
  { label: "Treatments", href: "/treatments" },
  { label: "Smile Gallery", href: "/smile-gallery" },
  { label: "Our Clinics", href: "/clinics" },
  { label: "Contact", href: "/contact" },
];

export const secondaryNav: NavItem[] = [
  { label: "Virtual Tour", href: "/virtual-tour" },
  { label: "Dental Tourism", href: "/dental-tourism" },
  { label: "FAQs", href: "/faq" },
];
