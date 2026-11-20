import { NextResponse } from "next/server";
import { clinics } from "@/data/clinics";
import { site } from "@/data/site";
import {
  clinicLabel,
  emptyEnquiry,
  enquirySummary,
  normalisePhone,
  validateEnquiry,
  type EnquiryFields,
} from "@/lib/enquiry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/enquiry — receives an appointment request and forwards it to the clinic.
 *
 * Delivery is configured with environment variables (see .env.example):
 *   - SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS  → email via SMTP
 *   - ENQUIRY_WEBHOOK_URL                            → JSON POST to a webhook
 *
 * If neither is configured the endpoint answers 503 and the form tells the
 * visitor to use WhatsApp or the phone instead. It never reports success for
 * a request that was not actually delivered.
 */

// --- spam protection -------------------------------------------------------
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MIN_FILL_MS = 2500;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [entry, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(entry);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true; // non-browser clients and some same-origin requests omit it
  try {
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

const text = (value: unknown, max: number) => (typeof value === "string" ? value.slice(0, max) : "");

// --- delivery --------------------------------------------------------------
type Delivery = "smtp" | "webhook";

function configuredDelivery(): Delivery | null {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) return "smtp";
  if (process.env.ENQUIRY_WEBHOOK_URL) return "webhook";
  return null;
}

async function deliver(method: Delivery, fields: EnquiryFields) {
  const summary = enquirySummary(fields);
  const clinic = clinics.find((entry) => entry.slug === fields.clinic);
  const receivedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  if (method === "webhook") {
    const response = await fetch(process.env.ENQUIRY_WEBHOOK_URL as string, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "toothcrafts.com appointment form",
        receivedAt,
        ...fields,
        phone: normalisePhone(fields.phone) ?? fields.phone,
        clinicName: clinicLabel(fields.clinic),
        summary,
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
    return;
  }

  const { default: nodemailer } = await import("nodemailer");
  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: process.env.ENQUIRY_FROM || `"${site.name} Website" <${process.env.SMTP_USER}>`,
    to: process.env.ENQUIRY_TO || site.email,
    replyTo: fields.email.trim() || undefined,
    subject: `New appointment request — ${fields.name.trim()} (${clinicLabel(fields.clinic)})`,
    text: [
      "A new appointment request was submitted on the website.",
      "",
      summary,
      "",
      clinic ? `Clinic phone: ${clinic.phones[0].display}` : null,
      `Received: ${receivedAt} IST`,
      "",
      "Please contact the patient to confirm a time. This request has not been confirmed to them.",
    ]
      .filter((line) => line !== null)
      .join("\n"),
  });
}

// --- handler ---------------------------------------------------------------
export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (text(body.company, 200)) {
    return NextResponse.json({ ok: false, error: "rejected" }, { status: 400 });
  }
  // Time trap: forms completed faster than a person could type are rejected.
  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: false, error: "too_fast" }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const fields: EnquiryFields = {
    ...emptyEnquiry,
    name: text(body.name, 120),
    phone: text(body.phone, 40),
    email: text(body.email, 160),
    clinic: text(body.clinic, 40),
    treatment: text(body.treatment, 80),
    date: text(body.date, 20),
    message: text(body.message, 1200),
  };

  const errors = validateEnquiry(fields);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "validation", errors }, { status: 422 });
  }

  const method = configuredDelivery();
  if (!method) {
    console.warn(
      "[enquiry] An appointment request was received but no delivery method is configured. " +
        "Set SMTP_* or ENQUIRY_WEBHOOK_URL (see .env.example). The visitor was asked to call or use WhatsApp.",
    );
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    await deliver(method, fields);
  } catch (error) {
    console.error("[enquiry] Delivery failed:", error instanceof Error ? error.message : error);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
