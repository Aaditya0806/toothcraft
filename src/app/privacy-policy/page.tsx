import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How ToothCraft collects, uses and protects the personal information you share through this website.",
  path: "/privacy-policy",
});

/*
 * NOTE FOR TOOTHCRAFT: this policy describes what the website actually does.
 * Please have it reviewed by your legal adviser before launch, and update it
 * if you add analytics, advertising pixels or new forms.
 */
export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="November 2026"
      intro={`${site.formalName} ("ToothCraft", "we", "us") respects your privacy. This policy explains what information we collect through this website, why we collect it and the choices you have.`}
    >
      <h2>Information we collect</h2>
      <p>We collect only the information you choose to give us:</p>
      <ul>
        <li>
          <strong>Appointment requests</strong> — your name and phone number, and, if you provide them,
          your email address, preferred clinic, preferred treatment, preferred date and any message you
          write.
        </li>
        <li>
          <strong>Phone calls, emails and WhatsApp messages</strong> — the details you share when you
          contact us directly. WhatsApp messages are also subject to WhatsApp&rsquo;s own privacy policy.
        </li>
      </ul>
      <p>
        Please do not include detailed medical history in the online form. Your dentist will discuss your
        health with you in person.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To contact you about your appointment request or enquiry.</li>
        <li>To arrange and manage your appointment at the clinic you choose.</li>
        <li>To respond to questions you send us.</li>
      </ul>
      <p>
        We do not sell your personal information, and we do not use it for marketing unless you have asked
        us to keep in touch.
      </p>

      <h2>Sharing your information</h2>
      <p>
        Your details are shared only with the ToothCraft team members who need them to respond to you, and
        with service providers who help us run this website and deliver email on our behalf. We may also
        disclose information where the law requires it.
      </p>

      <h2>Cookies and third-party content</h2>
      <p>
        This website does not need cookies to work. Some pages include content from other services, which
        may set their own cookies or collect usage information when that content loads:
      </p>
      <ul>
        <li>Google Maps, to show clinic locations.</li>
        <li>YouTube, on the Virtual Tour page — videos load only when you press play.</li>
      </ul>
      <p>
        If we use analytics to understand how the website is used, the information collected is aggregated
        and is not used to identify you personally.
      </p>

      <h2>How long we keep information</h2>
      <p>
        We keep enquiry details for as long as needed to respond to you and to maintain appropriate
        records. Clinical records created when you become a patient are kept in line with applicable
        professional and legal requirements.
      </p>

      <h2>Your choices</h2>
      <p>
        You may ask us to tell you what personal information we hold about you, to correct it, or to delete
        it where we are not required to keep it. To make a request, contact us using the details below.
      </p>

      <h2>Contact us</h2>
      <p>
        Email <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
        <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a>. We may update this policy from time to
        time; the date at the top of the page shows when it was last revised.
      </p>
    </LegalPage>
  );
}
