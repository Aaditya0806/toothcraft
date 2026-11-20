/**
 * Editorial content blocks. Claims here are grounded in statements on
 * toothcrafts.com (About, Why Choose Us, clinic and Dental Tourism pages).
 */

export const aboutHighlights = [
  { title: "Personalised dental care", text: "Treatment plans designed around your individual needs." },
  { title: "Experienced professionals", text: "Dental surgeons supported by consultant specialists." },
  { title: "Modern dental technology", text: "Ongoing investment in equipment and techniques." },
  { title: "Patient-focused planning", text: "Clear explanations, so you can decide with confidence." },
  { title: "Comfortable environments", text: "Relaxed, stress-free clinics with strict hygiene." },
  { title: "Comprehensive services", text: "From routine cleaning to implants, under one roof." },
];

export type Reason = {
  icon: "heart" | "users" | "scan" | "layers" | "armchair" | "map";
  title: string;
  text: string;
};

export const reasons: Reason[] = [
  {
    icon: "heart",
    title: "Personalised Dental Care",
    text: "Our doctors speak with you at a personal level and design a treatment plan around your individual needs — never a one-size-fits-all approach.",
  },
  {
    icon: "users",
    title: "Experienced Dental Professionals",
    text: "A team of dental surgeons works alongside consultant specialists in endodontics, prosthodontics, orthodontics, oral surgery, periodontics and children's dentistry.",
  },
  {
    icon: "scan",
    title: "Advanced Dental Technology",
    text: "We invest continually in training, equipment, premises and techniques, keeping in touch with the latest developments in dentistry.",
  },
  {
    icon: "layers",
    title: "Comprehensive Treatments",
    text: "Implants, root canal treatment, orthodontics, cosmetic and children's dentistry — a full range of care, without being sent from place to place.",
  },
  {
    icon: "armchair",
    title: "Patient Comfort and Care",
    text: "A relaxing, stress-free environment, a team experienced with anxious patients, serious attention to pain control and a strict cross-infection control policy.",
  },
  {
    icon: "map",
    title: "Multiple Convenient Clinic Locations",
    text: "Three clinics across Chennai — Saidapet, Ashok Nagar and Mugalivakkam — each open 9 AM to 9 PM, seven days a week.",
  },
];

/** Verified figures only: each number can be checked against the clinic's own website. */
export const facts = [
  { value: 2007, label: "Established", detail: "as a single-chair clinic", plain: true },
  { value: 3, label: "Clinics", detail: "across Chennai" },
  { value: 16, label: "Treatments", detail: "under one roof" },
  { value: 7, label: "Days a week", detail: "9 AM – 9 PM" },
];

/** "Our Treatment Protocols" from the clinic pages. */
export const visitSteps = [
  {
    title: "Initial consultation",
    text: "You meet a resident dentist to talk through your concerns and what you would like to achieve.",
  },
  {
    title: "X-rays and options",
    text: "Where needed, X-rays are taken and your treatment options are discussed with you.",
  },
  {
    title: "Specialist planning",
    text: "A specialist dentist confirms the diagnosis and prepares your treatment plan.",
  },
  {
    title: "Comfortable treatment",
    text: "Your treatment is carried out by the specialist dentist, with your comfort in mind.",
  },
  {
    title: "Review and follow-up",
    text: "Periodic reviews and regular follow-ups keep your results on track.",
  },
];

export const tourismSteps = [
  {
    title: "Tell us what you need",
    text: "Contact us by email or phone and describe your dental concerns.",
  },
  {
    title: "Receive your plan",
    text: "We send a treatment plan, an estimate and the number of days required before you travel.",
  },
  {
    title: "Arrive with ease",
    text: "Airport pickup can be arranged, and we can help you plan sightseeing around your appointments.",
  },
  {
    title: "Treatment in Chennai",
    text: "Your care is carried out at our clinics, following a strict sterilisation protocol.",
  },
];

export const tourismPoints = [
  "A multi-speciality clinic using current techniques, instruments and materials",
  "Patients have travelled to us from Iraq, Oman, Muscat and the USA",
  "Strict sterilisation protocol at every clinic",
  "Treatment plan and estimate shared before you travel",
];
