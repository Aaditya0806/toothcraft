"use client";

import Link from "next/link";
import { ArrowUpRight, CircleAlert, CircleCheck, LoaderCircle, Phone } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { clinics } from "@/data/clinics";
import { site, whatsappLink } from "@/data/site";
import { services } from "@/data/treatments";
import {
  clinicOptions,
  displayPhone,
  emptyEnquiry,
  todayInIndia,
  treatmentOptions,
  validateEnquiry,
  whatsappEnquiryText,
  type EnquiryErrors,
  type EnquiryFields,
} from "@/lib/enquiry";
import { cn } from "@/lib/utils";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; name: string; phone: string }
  | { state: "error"; message: string };

const fieldOrder: (keyof EnquiryFields)[] = ["name", "phone", "email", "clinic", "treatment", "date", "message"];

function Field({
  id,
  label,
  optional,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {optional ? <span className="ml-2 font-medium normal-case tracking-normal text-stone/80">Optional</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-[0.8125rem] font-medium text-[#9a3f27]">
          <CircleAlert aria-hidden className="mt-0.5 size-3.5 shrink-0" strokeWidth={2} />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Appointment request form.
 *
 * It sends a *request* to the clinic and says so plainly — a booking is only
 * confirmed when the team calls back. If the request cannot be delivered the
 * visitor is told, and offered WhatsApp or a phone call with their details
 * carried over.
 */
export function AppointmentForm({ idPrefix = "appt" }: { idPrefix?: string }) {
  const [fields, setFields] = useState<EnquiryFields>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [minDate, setMinDate] = useState<string>();
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Read ?clinic= / ?treatment= so links elsewhere on the site can pre-fill the form.
  useEffect(() => {
    startedAt.current = Date.now();
    setMinDate(todayInIndia());
    const params = new URLSearchParams(window.location.search);
    const clinic = params.get("clinic");
    const treatmentSlug = params.get("treatment");
    const treatment = services.find((entry) => entry.slug === treatmentSlug)?.name;
    setFields((current) => ({
      ...current,
      clinic: clinic && clinicOptions.some((option) => option.value === clinic) ? clinic : current.clinic,
      treatment: treatment && treatmentOptions.includes(treatment) ? treatment : current.treatment,
    }));
  }, []);

  const id = (name: string) => `${idPrefix}-${name}`;

  const update = (name: keyof EnquiryFields, value: string) => {
    setFields((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const validateField = (name: keyof EnquiryFields) => {
    const message = validateEnquiry(fields)[name];
    setErrors((current) => ({ ...current, [name]: message }));
  };

  const focusFirstError = (found: EnquiryErrors) => {
    const first = fieldOrder.find((name) => found[name]);
    if (first) formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(first))}`)?.focus();
  };

  const check = () => {
    const found = validateEnquiry(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      focusFirstError(found);
      return false;
    }
    return true;
  };

  const selectedClinic = clinics.find((clinic) => clinic.slug === fields.clinic);
  const callTarget = selectedClinic?.phones[0] ?? site.phone;

  const fail = (message: string) => {
    setStatus({ state: "error", message });
    requestAnimationFrame(() => resultRef.current?.focus());
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.state === "submitting" || !check()) return;
    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, company: honeypot, startedAt: startedAt.current }),
      });

      if (response.ok) {
        setStatus({
          state: "success",
          name: fields.name.trim().split(/\s+/)[0],
          phone: displayPhone(fields.phone),
        });
        setFields(emptyEnquiry);
        startedAt.current = Date.now();
        requestAnimationFrame(() => resultRef.current?.focus());
        return;
      }

      if (response.status === 422) {
        const data = (await response.json().catch(() => null)) as { errors?: EnquiryErrors } | null;
        const found = data?.errors ?? {};
        setErrors(found);
        setStatus({ state: "idle" });
        focusFirstError(found);
        return;
      }
      if (response.status === 429) {
        fail("We have received several requests from you in a short time. Please call us or message us on WhatsApp so we can help straight away.");
        return;
      }
      if (response.status === 400) {
        fail("That was a little quick for us to process. Please wait a moment and try again, or contact us directly.");
        return;
      }
      fail("We could not send your request online just now. Your details are still here — please send them on WhatsApp or call us and we will arrange your appointment.");
    } catch {
      fail("We could not reach our server. Please check your connection and try again, or contact us on WhatsApp or by phone.");
    }
  };

  const sendOnWhatsApp = () => {
    if (!check()) return;
    window.open(whatsappLink(whatsappEnquiryText(fields)), "_blank", "noopener,noreferrer");
  };

  if (status.state === "success") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="flex min-h-[28rem] flex-col items-start justify-center outline-none"
      >
        <span className="grid size-14 place-items-center rounded-full bg-champagne text-gold-deep">
          <CircleCheck aria-hidden className="size-7" strokeWidth={1.4} />
        </span>
        <h3 className="display-md mt-7">Thank you, {status.name}. Your request has been sent.</h3>
        <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-stone">
          This is a request, not a confirmed booking. A member of our team will call you on{" "}
          <span className="font-semibold text-charcoal">{status.phone}</span> to confirm a convenient time.
        </p>
        <p className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-stone">
          Need to be seen urgently? Please call the clinic directly — we are open {site.hours.label},{" "}
          {site.hours.days}.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={`tel:${site.phone.tel}`} className="btn btn-sm">
            <Phone aria-hidden className="size-4" strokeWidth={1.75} />
            <span>Call {site.phone.display}</span>
          </a>
          <button type="button" className="btn btn-outline btn-sm" onClick={() => setStatus({ state: "idle" })}>
            <span>Send Another Request</span>
          </button>
        </div>
      </div>
    );
  }

  const submitting = status.state === "submitting";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Appointment request">
      {status.state === "error" ? (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="alert"
          className="mb-8 rounded-[1.25rem] border border-[#9a3f27]/25 bg-[#9a3f27]/[0.06] p-5 outline-none sm:p-6"
        >
          <p className="flex items-start gap-3 text-[0.9688rem] font-medium leading-relaxed text-charcoal">
            <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-[#9a3f27]" strokeWidth={1.75} />
            {status.message}
          </p>
          <div className="mt-5 flex flex-wrap gap-3 pl-8">
            <button type="button" className="btn btn-sm" onClick={sendOnWhatsApp}>
              <WhatsAppIcon className="size-4" />
              <span>Send on WhatsApp</span>
            </button>
            <a href={`tel:${callTarget.tel}`} className="btn btn-outline btn-sm">
              <Phone aria-hidden className="size-4" strokeWidth={1.75} />
              <span>Call {callTarget.display}</span>
            </a>
          </div>
        </div>
      ) : null}

      <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
        <Field id={id("name")} label="Full Name" error={errors.name}>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            className="field"
            placeholder="Your name"
            value={fields.name}
            onChange={(event) => update("name", event.target.value)}
            onBlur={() => fields.name && validateField("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${id("name")}-error` : undefined}
          />
        </Field>

        <Field id={id("phone")} label="Phone Number" error={errors.phone}>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            className="field"
            placeholder="98765 43210"
            value={fields.phone}
            onChange={(event) => update("phone", event.target.value)}
            onBlur={() => fields.phone && validateField("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${id("phone")}-error` : undefined}
          />
        </Field>

        <Field id={id("email")} label="Email Address" optional error={errors.email}>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className="field"
            placeholder="you@example.com"
            value={fields.email}
            onChange={(event) => update("email", event.target.value)}
            onBlur={() => fields.email && validateField("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${id("email")}-error` : undefined}
          />
        </Field>

        <Field id={id("clinic")} label="Preferred Clinic Location" error={errors.clinic}>
          <select
            id={id("clinic")}
            name="clinic"
            required
            className={cn("field", !fields.clinic && "text-mist")}
            value={fields.clinic}
            onChange={(event) => update("clinic", event.target.value)}
            aria-invalid={Boolean(errors.clinic)}
            aria-describedby={errors.clinic ? `${id("clinic")}-error` : undefined}
          >
            <option value="" disabled>
              Choose a clinic
            </option>
            {clinicOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id={id("treatment")} label="Preferred Treatment" optional error={errors.treatment}>
          <select
            id={id("treatment")}
            name="treatment"
            className={cn("field", !fields.treatment && "text-mist")}
            value={fields.treatment}
            onChange={(event) => update("treatment", event.target.value)}
            aria-invalid={Boolean(errors.treatment)}
            aria-describedby={errors.treatment ? `${id("treatment")}-error` : undefined}
          >
            <option value="">Choose a treatment</option>
            {treatmentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field id={id("date")} label="Preferred Appointment Date" optional error={errors.date}>
          <input
            id={id("date")}
            name="date"
            type="date"
            min={minDate}
            className={cn("field", !fields.date && "text-mist")}
            value={fields.date}
            onChange={(event) => update("date", event.target.value)}
            onBlur={() => fields.date && validateField("date")}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? `${id("date")}-error` : undefined}
          />
        </Field>

        <Field id={id("message")} label="Message" optional error={errors.message} className="sm:col-span-2">
          <textarea
            id={id("message")}
            name="message"
            rows={4}
            maxLength={1000}
            className="field"
            placeholder="Tell us briefly what you would like help with"
            value={fields.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${id("message")}-error` : undefined}
          />
        </Field>

        {/* Honeypot — hidden from people, tempting to bots. */}
        <div aria-hidden className="absolute -left-[9999px] top-auto size-px overflow-hidden">
          <label htmlFor={id("company")}>Company</label>
          <input
            id={id("company")}
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>
      </div>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <button type="submit" className="btn" disabled={submitting} aria-busy={submitting}>
          {submitting ? (
            <>
              <LoaderCircle aria-hidden className="size-4 animate-spin" strokeWidth={1.75} />
              <span>Sending Request…</span>
            </>
          ) : (
            <>
              <span>Request Appointment</span>
              <ArrowUpRight aria-hidden className="btn-icon size-4" strokeWidth={1.75} />
            </>
          )}
        </button>
        <button type="button" className="btn btn-outline" onClick={sendOnWhatsApp} disabled={submitting}>
          <WhatsAppIcon className="size-4" />
          <span>Send via WhatsApp</span>
        </button>
      </div>

      <p className="mt-6 max-w-xl text-[0.8125rem] leading-relaxed text-stone">
        Submitting this form sends a request to our team — your appointment is confirmed once we call
        you back. We use your details only to respond to your enquiry. See our{" "}
        <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-charcoal">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
