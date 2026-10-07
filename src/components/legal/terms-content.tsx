import Link from "next/link";
import type { LegalSectionData } from "./legal-layout";

export const HEADING = "Terms of Use";
export const DESCRIPTION = "The rules that apply when you access and use the Techno Gurukul website and programs.";
export const LAST_UPDATED = "7 October 2026";

const EMAIL = "admission@technogurukul.com";
const A = "font-medium text-primary underline-offset-2 hover:underline";
const UL = "list-disc space-y-2 pl-5";

export const TERMS_SECTIONS: LegalSectionData[] = [
  {
    id: "introduction",
    title: "Introduction",
    body: (
      <>
        <p>
          Welcome to Techno Gurukul. These Terms of Use govern your access to and use of the Techno Gurukul website
          (technogurukul.com) and all related services, programs, and content provided by Techno Gurukul, a
          proprietorship registered under the laws of India, with its registered address at Office No. 305, Platinum
          Plaza, opp. Ramayan Bungalow, next to Jain Oswal Boarding, Tilak Wadi, Nashik, Maharashtra (&ldquo;Techno
          Gurukul,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
        </p>
        <p>By accessing or using this website, you agree to be bound by these Terms. If you do not agree, please do not use this website.</p>
      </>
    ),
  },
  {
    id: "acceptance-of-terms",
    title: "Acceptance of Terms",
    body: (
      <p>
        By using this website, you confirm that you are at least 18 years of age. If you are under 18, you may use
        this website for informational purposes only and may not submit personal information through enquiry forms
        or enrollment applications without the involvement and consent of a parent or legal guardian.
      </p>
    ),
  },
  {
    id: "use-of-the-website",
    title: "Use of the Website",
    body: (
      <p>
        You agree to use this website only for lawful purposes and in a way that does not infringe the rights of,
        restrict, or inhibit anyone else&rsquo;s use and enjoyment of the website. Prohibited behavior includes
        harassing or causing distress to any person, transmitting obscene or offensive content, or disrupting the
        normal flow of dialogue within the website.
      </p>
    ),
  },
  {
    id: "enrollment-and-program-terms",
    title: "Enrollment and Program Terms",
    body: (
      <>
        <p>Enrollment in any Techno Gurukul program is subject to the following:</p>
        <ul className={UL}>
          <li>
            <strong className="text-foreground">Eligibility:</strong> There is no minimum age bar for enrollment in
            our educational programs. Enrollment is open to all individuals seeking to develop practical technical
            skills, subject to the student&rsquo;s ability to engage with and benefit from the program content. The
            institute reserves the right to assess individual suitability for specific programs during the
            counselling or enrolment process.
          </li>
          <li>
            <strong className="text-foreground">Program availability:</strong> All programs are subject to minimum
            enrollment thresholds. Techno Gurukul reserves the right to cancel a program if the minimum number of
            enrollments is not met. In such cases, enrolled students will receive a full refund or the option to
            transfer to the next available batch, at the sole discretion of the management.
          </li>
          <li>
            <strong className="text-foreground">Batch transfers:</strong> Requests to transfer enrollment to a
            different batch are subject to management approval and depend on seat availability in the target batch.
            Transfers are not guaranteed and are considered on a case-by-case basis by the management team.
          </li>
          <li>
            <strong className="text-foreground">Conduct:</strong> Students are expected to maintain professional
            conduct during classes, workshops, and online interactions. Techno Gurukul reserves the right to dismiss
            a student for repeated misconduct.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "fees-and-payment",
    title: "Fees and Payment",
    body: (
      <>
        <p>
          Program fees vary depending on the program, batch timing, and other factors. Fee details are communicated
          individually during the counselling process. Payment terms are as follows:
        </p>
        <ul className={UL}>
          <li>
            <strong className="text-foreground">Fee structure:</strong> Fees for each program are variable and
            communicated at the time of enrollment. EMI (Equated Monthly Installment) options are available for
            eligible students. Specific fee details, installment plans, and any applicable interest or processing
            charges for EMI are provided during the counselling process.
          </li>
          <li>
            <strong className="text-foreground">Payment schedule:</strong> Payment deadlines and schedules are
            communicated at the time of enrollment. Late payment consequences, if any, are determined on a
            case-by-case basis by the management team.
          </li>
          <li><strong className="text-foreground">Accepted payment methods:</strong> Cash, UPI, online bank transfer, credit card, and debit card.</li>
          <li><strong className="text-foreground">Payment gateway charges:</strong> Payment gateway transaction charges, if any, are borne by the student.</li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    body: (
      <>
        <p>
          All content on this website &mdash; including text, graphics, logos, images, course materials, videos, and
          software &mdash; is the property of Techno Gurukul or its content suppliers and is protected by Indian and
          international copyright laws. You may not reproduce, distribute, modify, or create derivative works from
          any content without our prior written consent.
        </p>
        <p>
          Course materials provided to enrolled students are for personal educational use only. Sharing,
          distributing, or uploading course materials to third-party platforms is prohibited.
        </p>
      </>
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    body: (
      <p>
        Your use of this website is subject to our <Link href="/privacy-policy" className={A}>Privacy Policy</Link>.
        Please review our Privacy Policy to understand how we collect, use, and protect your personal data.
      </p>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    body: (
      <>
        <p>
          Techno Gurukul provides educational content and services on an &ldquo;as is&rdquo; basis. We do not
          guarantee specific job placements, salary outcomes, or career results as a result of completing any
          program. While we strive to provide accurate and up-to-date information, we make no representations or
          warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability
          of the website or its content.
        </p>
        <p>
          To the fullest extent permitted by law, Techno Gurukul shall not be liable for any indirect, incidental,
          special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly
          or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of
          the website or programs.
        </p>
      </>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    body: (
      <p>
        This website may contain links to third-party websites. These links are provided for your convenience only.
        Techno Gurukul does not endorse or take responsibility for the content, privacy policies, or practices of
        any third-party websites.
      </p>
    ),
  },
  {
    id: "modifications-to-terms",
    title: "Modifications to Terms",
    body: (
      <p>
        We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon
        posting to the website. Your continued use of the website following the posting of changes constitutes your
        acceptance of those changes. We encourage you to review these Terms periodically.
      </p>
    ),
  },
  {
    id: "governing-law-and-dispute-resolution",
    title: "Governing Law and Dispute Resolution",
    body: (
      <p>
        These Terms of Use shall be governed by and construed in accordance with the laws of India. In the event of
        any dispute arising out of or in connection with these terms, the parties shall first attempt to resolve the
        matter amicably through good-faith negotiation. If the dispute cannot be resolved through negotiation, it
        shall be referred to arbitration in accordance with the Arbitration and Conciliation Act, 1996, before a
        sole arbitrator appointed by mutual consent of the parties. The seat of arbitration shall be Nashik,
        Maharashtra, India.
      </p>
    ),
  },
  {
    id: "contact-information",
    title: "Contact Information",
    body: (
      <>
        <p>If you have any questions about these Terms of Use, please contact us at:</p>
        <ul className={UL}>
          <li><strong className="text-foreground">Email:</strong> <a href={`mailto:${EMAIL}`} className={A}>{EMAIL}</a></li>
          <li><strong className="text-foreground">Phone:</strong> <a href="tel:+917387152953" className={A}>+91 73871 52953</a></li>
          <li><strong className="text-foreground">Address:</strong> Office No. 305, Platinum Plaza, opp. Ramayan Bungalow, next to Jain Oswal Boarding, Tilak Wadi, Nashik, Maharashtra</li>
        </ul>
      </>
    ),
  },
];
