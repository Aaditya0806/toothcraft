"use client";

import { useEffect } from "react";
import { site } from "@/data/site";

/** Shown if a page fails to render. Offers a retry and a direct way to reach the clinic. */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="wrap flex min-h-svh flex-col justify-center pb-24 pt-40">
      <p className="eyebrow text-gold-deep">Something went wrong</p>
      <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,5.4vw,5rem)] leading-[1.02] tracking-[-0.02em]">
        We could not load this page <em className="text-gold-deep">just now.</em>
      </h1>
      <p className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-stone">
        Please try again. If you need to reach us in the meantime, call {site.phone.display} — we are open{" "}
        {site.hours.label}, {site.hours.days}.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <button type="button" className="btn" onClick={reset}>
          <span>Try Again</span>
        </button>
        <a href={`tel:${site.phone.tel}`} className="btn btn-outline">
          <span>Call {site.phone.display}</span>
        </a>
      </div>
    </section>
  );
}
