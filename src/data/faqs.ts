/**
 * Frequently asked questions. Answers are based on information published on
 * toothcrafts.com and are written to be medically responsible: general
 * guidance only, with no guaranteed outcomes.
 */
export type Faq = { q: string; a: string; topic: string };

export const faqs: Faq[] = [
  {
    topic: "Appointments",
    q: "How do I book an appointment?",
    a: "Send a request through the appointment form on this website, call the clinic nearest you, or message us on WhatsApp. Our team will get back to you to confirm a convenient time — your appointment is confirmed once you hear from us.",
  },
  {
    topic: "Appointments",
    q: "What are your consulting hours?",
    a: "All three ToothCraft clinics consult from 9 AM to 9 PM, Monday to Sunday.",
  },
  {
    topic: "Clinic locations",
    q: "Where are your clinics located?",
    a: "ToothCraft has clinics in Saidapet, Ashok Nagar and Mugalivakkam in Chennai. Each location page has the full address, phone numbers and directions.",
  },
  {
    topic: "Appointments",
    q: "What happens at my first visit?",
    a: "Your visit begins with a consultation with a resident dentist about your concerns. X-rays are taken where needed and your treatment options are discussed. If specialist care is appropriate, a specialist dentist will diagnose, plan and carry out the treatment, followed by periodic reviews.",
  },
  {
    topic: "Dental implants",
    q: "Am I a candidate for dental implants, and how long does it take?",
    a: "People missing one, several or all of their teeth may be candidates. Your dentist will examine you and take X-rays to assess the bone before recommending a plan. Treatment is completed in stages and typically takes around four to nine months, sometimes longer, depending on the case. Temporary teeth can be provided during this period.",
  },
  {
    topic: "Root canal treatment",
    q: "Is root canal treatment painful?",
    a: "Root canal treatment is carried out under local anaesthesia to keep you comfortable, and its purpose is to relieve the pain caused by infection. Some tenderness for a few days afterwards is normal, and your dentist will advise you on pain relief.",
  },
  {
    topic: "Teeth whitening",
    q: "How long does teeth whitening last?",
    a: "Whitening is effective but not permanent. How long results last depends on your age, diet and habits such as smoking. Temporary sensitivity can occur, and crowns, veneers and fillings do not change colour — your dentist will plan around them.",
  },
  {
    topic: "Orthodontic treatment",
    q: "When is the right age for braces — and can adults have them?",
    a: "A first orthodontic evaluation is recommended at around age seven, with full braces often considered at 12 to 13 if needed. Adults can have orthodontic treatment too; there is no upper age limit. Options include metal braces, ceramic braces and clear aligners, and treatment takes around 22 months on average, depending on the individual.",
  },
  {
    topic: "Children's dental care",
    q: "When should my child first see a dentist?",
    a: "A first visit by your child's first birthday is recommended, followed by check-ups twice a year. Early visits help children feel at ease and allow the dentist to guide you on diet, brushing and habits.",
  },
  {
    topic: "Comfort",
    q: "I am anxious about dental treatment. Can you help?",
    a: "Yes. Our team is experienced in caring for anxious patients and takes pain control seriously. Sedation dentistry is available where appropriate, provided by an anaesthetist trained in dental sedation. Tell us about your concerns when you book so we can plan your visit around them.",
  },
  {
    topic: "Costs",
    q: "How much will my treatment cost?",
    a: "Costs depend on your individual needs, so an estimate is given after a clinical examination. Your dentist will explain the treatment plan and the estimate before any treatment begins.",
  },
  {
    topic: "International patients",
    q: "Do you treat patients travelling from abroad?",
    a: "Yes. International patients can contact us by email or phone with their dental needs. We share a treatment plan, an estimate and the number of days required before you travel, and can help arrange airport pickup.",
  },
];

/** A shorter selection for the homepage. */
export const homeFaqs = faqs.filter((_, index) => [0, 1, 4, 5, 6, 7, 8, 2].includes(index));
