# ToothCraft website

The redesigned website for ToothCraft Multi-Speciality Dental Clinics, Chennai.

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS 4**, **Motion** (animation), **Lenis** (smooth
scrolling) and **Lucide** icons.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run typecheck
```

Requires Node.js 20.9 or newer.

## What is in the site

| Route | Page |
| --- | --- |
| `/` | Homepage — hero, about, why choose us, treatments, dentists, smile gallery, testimonials, clinics, virtual tour, dental tourism, FAQ, booking |
| `/about` | Story, promise, approach, what to expect at a visit |
| `/dentists` | Founder, team and consultant specialists |
| `/treatments`, `/treatments/[slug]` | Filterable index and 16 treatment pages, plus the brushing guide |
| `/smile-gallery` | Interactive before/after comparisons and further cases |
| `/clinics`, `/clinics/[slug]` | Clinic finder and a page per location |
| `/virtual-tour` | Photo tour by clinic, plus videos from the ToothCraft YouTube channel |
| `/dental-tourism` | Information for international patients |
| `/faq` | Frequently asked questions |
| `/contact` | Appointment request form, contact routes and maps |
| `/privacy-policy`, `/terms` | Legal pages |
| `/api/enquiry` | Receives appointment requests |

`/sitemap.xml` and `/robots.txt` are generated automatically.

## Editing content

All content lives in typed files under `src/data/` — no page code needs to change for routine edits.

| File | Contents |
| --- | --- |
| `site.ts` | Name, phone, WhatsApp number, email, hours, social links, navigation |
| `clinics.ts` | Addresses, phone numbers, hours, map links, photographs |
| `doctors.ts` | Dentists and consultant specialists |
| `treatments.ts` | Every treatment page: summary, overview, questions and answers |
| `testimonials.ts` | Patient testimonials |
| `faqs.ts` | Frequently asked questions |
| `gallery.ts` | Before/after pairs, case photographs, clinic tour photographs, videos |
| `content.ts` | Why choose us, about highlights, visit steps, dental tourism steps |

**Content rules followed throughout:** business details, dentists' names and qualifications, testimonials and
photographs come from the existing toothcrafts.com site. Nothing has been invented — no awards, statistics or
credentials. Treatment copy avoids guaranteed outcomes. Please keep to this when editing.

## Appointment form

The form validates in the browser and again on the server, and is protected from spam by a hidden honeypot field, a
minimum-fill-time check, a same-origin check and per-visitor rate limiting.

To deliver requests, set **one** of these in `.env.local` (see `.env.example`):

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — sends an email (to `ENQUIRY_TO`, default `info@toothcrafts.com`)
- `ENQUIRY_WEBHOOK_URL` — posts the request as JSON to a webhook

Until one is configured, the form tells the visitor that online requests are unavailable and offers WhatsApp or a
phone call with their details carried over. It never shows a confirmation for a request that was not delivered, and
the success message makes clear that an appointment is confirmed only when the clinic calls back.

## SEO

- Unique title, description, canonical URL and Open Graph tags per page (`src/lib/seo.tsx`)
- Structured data: Organization, a `Dentist` entry per clinic, breadcrumbs, FAQs and a treatment list
- **301 redirects** from every old `.php` URL to its new page — see `next.config.ts`

### Before launch

1. Set `NEXT_PUBLIC_SITE_URL` to the live domain.
2. The old site has a WordPress blog at `/blog/`. It is **not** part of this build. Either keep WordPress serving
   `/blog/` on the same domain, or migrate the posts — otherwise those URLs will stop working.
3. Configure form delivery (above) and send a test request.
4. Have the Privacy Policy and Terms reviewed.

## Design system

Tokens (colours, type scale, easing, shadows) are defined in `src/app/globals.css` under `@theme`.

- Colours: ivory `#F8F6F1`, champagne `#E9DFD0`, muted gold `#B99A68`, deep charcoal `#222321`
- Type: Cormorant Garamond (display) and Manrope (text), loaded with `next/font`
- Motion: `src/components/motion/` — `Reveal`, `Stagger`, `TextReveal`, `ImageReveal`, `Parallax`, `Counter`,
  `SmoothScroll`. Everything respects the visitor's reduced-motion setting.

```
src/
  app/            routes, layout, global styles, API route
  components/
    layout/       header (mega menu + mobile menu), footer, quick actions
    home/         homepage sections
    sections/     shared sections (page hero, booking form, before/after, accordion, lightbox…)
    motion/       animation primitives
    ui/           buttons, headings, icons
  data/           all content
  lib/            SEO helpers, form validation, utilities
```

## Images

See `CREDITS.md`. ToothCraft's own photographs are used for the clinics, team, testimonials and before/after
gallery. Licensed stock photographs are used only for mood and treatment illustration, and never presented as
ToothCraft patients or staff.

The clinic's existing photographs are small (most portraits are under 300 px wide), so they are shown at modest
sizes. New professional photography of the clinics and team would let those sections be presented much larger.

## Deployment

The site uses a server route for the appointment form and server-side redirects, so it needs a Node.js host — for
example Vercel, or any server that can run `npm run build && npm start`. It cannot be uploaded as static files to the
old PHP hosting as it stands.
