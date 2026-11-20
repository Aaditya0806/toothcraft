import { clinics } from "@/data/clinics";
import { services } from "@/data/treatments";

/**
 * Appointment enquiry: shared field definitions and validation.
 * The same rules run in the browser (for instant feedback) and on the server
 * (as the source of truth).
 */
export type EnquiryFields = {
  name: string;
  phone: string;
  email: string;
  clinic: string;
  treatment: string;
  date: string;
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryFields, string>>;

export const emptyEnquiry: EnquiryFields = {
  name: "",
  phone: "",
  email: "",
  clinic: "",
  treatment: "",
  date: "",
  message: "",
};

export const clinicOptions = [
  ...clinics.map((clinic) => ({ value: clinic.slug, label: clinic.name })),
  { value: "no-preference", label: "No preference" },
];

export const GENERAL_CONSULTATION = "General consultation";

export const treatmentOptions = [
  GENERAL_CONSULTATION,
  ...services.filter((treatment) => treatment.kind === "treatment").map((treatment) => treatment.name),
  "Not sure yet",
];

/**
 * Accepts Indian mobile numbers (10 digits starting 6–9, with or without
 * +91 / 0) and international numbers written with a leading "+".
 * Returns the number in a tidy form, or null when it is not valid.
 */
export function normalisePhone(input: string): string | null {
  const trimmed = input.trim();
  if (!/^[+\d][\d\s().-]*$/.test(trimmed)) return null;
  const international = trimmed.startsWith("+");
  let digits = trimmed.replace(/\D/g, "");

  if (international) {
    if (digits.startsWith("91")) {
      const local = digits.slice(2);
      return /^[6-9]\d{9}$/.test(local) ? `+91${local}` : null;
    }
    return digits.length >= 8 && digits.length <= 15 ? `+${digits}` : null;
  }

  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? `+91${digits}` : null;
}

/** Formats a normalised number for display, e.g. "+919876543210" -> "+91 98765 43210". */
export function displayPhone(input: string) {
  const normalised = normalisePhone(input);
  if (!normalised) return input.trim();
  const indian = normalised.match(/^\+91(\d{5})(\d{5})$/);
  return indian ? `+91 ${indian[1]} ${indian[2]}` : normalised;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Today's date as YYYY-MM-DD in India Standard Time. */
export function todayInIndia() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
}

export function validateEnquiry(fields: EnquiryFields): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = fields.name.trim();

  if (name.length < 2) errors.name = "Please enter your full name.";
  else if (name.length > 80) errors.name = "Please shorten your name to 80 characters.";
  else if (/[<>{}]|https?:\/\//i.test(name)) errors.name = "Please enter a valid name.";

  if (!fields.phone.trim()) errors.phone = "Please enter your phone number.";
  else if (!normalisePhone(fields.phone))
    errors.phone = "Enter a valid number, e.g. 98765 43210 or +971 50 123 4567.";

  const email = fields.email.trim();
  if (email && (!EMAIL.test(email) || email.length > 120))
    errors.email = "Please enter a valid email address.";

  if (!clinicOptions.some((option) => option.value === fields.clinic))
    errors.clinic = "Please choose a clinic.";

  if (fields.treatment && !treatmentOptions.includes(fields.treatment))
    errors.treatment = "Please choose a treatment from the list.";

  if (fields.date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fields.date) || Number.isNaN(Date.parse(fields.date)))
      errors.date = "Please choose a valid date.";
    else if (fields.date < todayInIndia()) errors.date = "Please choose today or a future date.";
  }

  if (fields.message.length > 1000) errors.message = "Please keep your message under 1,000 characters.";

  return errors;
}

export function clinicLabel(value: string) {
  return clinicOptions.find((option) => option.value === value)?.label ?? value;
}

export function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric" });
}

/** Plain-text summary used for the email body and the WhatsApp message. */
export function enquirySummary(fields: EnquiryFields) {
  const lines = [
    `Name: ${fields.name.trim()}`,
    `Phone: ${displayPhone(fields.phone)}`,
    fields.email.trim() ? `Email: ${fields.email.trim()}` : null,
    `Preferred clinic: ${clinicLabel(fields.clinic)}`,
    `Treatment: ${fields.treatment || GENERAL_CONSULTATION}`,
    fields.date ? `Preferred date: ${formatDate(fields.date)}` : null,
    fields.message.trim() ? `Message: ${fields.message.trim()}` : null,
  ];
  return lines.filter(Boolean).join("\n");
}

export function whatsappEnquiryText(fields: EnquiryFields) {
  return `Hello ToothCraft, I would like to request an appointment.\n\n${enquirySummary(fields)}`;
}
