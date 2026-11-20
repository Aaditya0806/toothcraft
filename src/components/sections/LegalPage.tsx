import Link from "next/link";
import type { ReactNode } from "react";

type LegalPageProps = {
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
};

/** Plain, readable layout for policy pages. */
export function LegalPage({ title, updated, intro, children }: LegalPageProps) {
  return (
    <article className="pb-24 pt-36 sm:pt-40 lg:pb-32 lg:pt-48">
      <div className="wrap">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb">
            <ol className="label-caps flex items-center gap-3 text-stone">
              <li>
                <Link href="/" className="hover:text-charcoal">
                  Home
                </Link>
              </li>
              <li aria-hidden className="h-px w-5 bg-gold" />
              <li aria-current="page" className="text-charcoal">
                {title}
              </li>
            </ol>
          </nav>
          <h1 className="display-lg load-fade-up mt-8">{title}</h1>
          <p className="label-caps mt-6 text-stone">Last updated: {updated}</p>
          <p className="mt-8 border-b hairline pb-10 text-[1.125rem] leading-relaxed text-stone">{intro}</p>
          <div className="prose-tc mt-10 text-[1.0313rem] leading-relaxed">{children}</div>
        </div>
      </div>
    </article>
  );
}
