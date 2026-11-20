import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "The terms that apply when you use the ToothCraft website.",
  path: "/terms",
});

/*
 * NOTE FOR TOOTHCRAFT: please have these terms reviewed by your legal adviser
 * before launch.
 */
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="November 2026"
      intro={`These terms apply to your use of the ${site.name} website. By using the website you agree to them.`}
    >
      <h2>General information only</h2>
      <p>
        The content on this website is provided for general information about dental care and about our
        clinics. It is not medical or dental advice and is not a substitute for a consultation with a
        qualified dentist. Always seek professional advice about your own circumstances.
      </p>

      <h2>No guarantee of outcomes</h2>
      <p>
        Dental treatment affects every person differently. Descriptions of treatments, typical timelines,
        before-and-after photographs and patient testimonials are shared to help you understand our work.
        They are not a promise or guarantee of any particular result.
      </p>

      <h2>Appointment requests</h2>
      <p>
        Submitting the appointment form sends a request to our team. It does not create a confirmed
        booking. Your appointment is confirmed only when a member of the ToothCraft team contacts you and
        agrees a date and time. Please do not use the online form for dental emergencies — call your
        nearest clinic instead.
      </p>

      <h2>Fees and estimates</h2>
      <p>
        Treatment costs depend on your individual needs and are discussed with you after a clinical
        examination. Any estimate given before an examination is indicative only.
      </p>

      <h2>Website content</h2>
      <p>
        The ToothCraft name, logo, text and clinic photographs on this website belong to ToothCraft. Some
        lifestyle images are licensed stock photographs and do not depict ToothCraft patients or staff.
        Please do not reproduce website content without permission.
      </p>

      <h2>Links to other websites</h2>
      <p>
        This website links to services such as Google Maps, WhatsApp and YouTube. We are not responsible
        for the content or privacy practices of other websites.
      </p>

      <h2>Privacy</h2>
      <p>
        Our <Link href="/privacy-policy">Privacy Policy</Link> explains how we handle the personal
        information you share with us.
      </p>

      <h2>Changes and contact</h2>
      <p>
        We may update these terms from time to time. If you have any questions, email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
        <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a>.
      </p>
    </LegalPage>
  );
}
