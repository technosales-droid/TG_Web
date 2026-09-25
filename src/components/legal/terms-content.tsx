import Link from "next/link";
import { Tbc, type LegalSectionData } from "./legal-layout";

export const HEADING = "Terms of Use";
export const DESCRIPTION =
  "These terms explain the rules that apply when you access and use the Techno Gurukul website and services.";
export const LAST_UPDATED = "24 September 2026";

const EMAIL = "admission@technogurukul.com";

export const TERMS_SECTIONS: LegalSectionData[] = [
  {
    id: "acceptance-of-terms",
    title: "Acceptance of Terms",
    body: (
      <p>
        By accessing or using this website, you agree to these Terms of Use. If you do not agree with any
        part of these terms, please do not use the website. These terms apply to all visitors, prospective students
        and enrolled students who interact with the website.
      </p>
    ),
  },
  {
    id: "about-techno-gurukul",
    title: "About Techno Gurukul",
    body: (
      <p>
        Techno Gurukul is an educational and training institute offering practical, skills-based programs, currently
        including Digital Marketing and Game Development &amp; Design, as described elsewhere on this website. Our
        office is located at Office No. 305, Platinum Plaza, opp. Ramayan Bungalow, next to Jain Oswal Boarding,
        Tilak Wadi, Police Staff Colony, Nashik, Maharashtra 422002, India.{" "}
        <Tbc>LEGAL ENTITY NAME, STRUCTURE AND REGISTRATION DETAILS TO BE CONFIRMED</Tbc>.
      </p>
    ),
  },
  {
    id: "eligibility-and-use",
    title: "Eligibility and Use of the Website",
    body: (
      <p>
        This website is available for browsing by visitors of any age seeking information about Techno Gurukul&rsquo;s
        programs. Enrollment in a specific program may have its own eligibility requirements (such as minimum age,
        prior education or prerequisite skills), which are <Tbc>PROGRAM-SPECIFIC ELIGIBILITY REQUIREMENTS TO BE
        CONFIRMED</Tbc> and will be communicated directly during the enquiry and enrollment process. Where a visitor
        is a minor, we expect a parent or guardian to be involved in any enquiry or enrollment decision.
      </p>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    body: (
      <p>
        You agree to use this website only for lawful purposes and in a way that does not infringe the rights of, or
        restrict or inhibit the use and enjoyment of the website by, anyone else. You agree not to attempt to gain
        unauthorised access to any part of the website, its underlying systems, or any account or data that is not
        your own.
      </p>
    ),
  },
  {
    id: "website-content",
    title: "Website Content",
    body: (
      <p>
        The website describes our programs, curriculum, learning approach, career paths, faculty and facilities,
        along with blog articles, resources and student stories. This content is provided for general informational
        purposes. We update it from time to time and take reasonable care over its accuracy, but we do not guarantee
        that every page is complete, error-free or fully current at all times.
      </p>
    ),
  },
  {
    id: "educational-content",
    title: "Educational Content",
    body: (
      <p>
        Curriculum descriptions, learning-approach content, articles and resources published on this website are
        educational and informational in nature. They are not a substitute for personalised academic, career,
        financial or legal advice. Please also see our{" "}
        <Link href="/legal/disclaimer" className="font-medium text-primary underline-offset-2 hover:underline">
          Disclaimer
        </Link>{" "}
        for important information about career-outcome and salary-related content.
      </p>
    ),
  },
  {
    id: "programs-and-course-information",
    title: "Programs and Course Information",
    body: (
      <p>
        Program names, durations, curriculum structure, formats and available batches shown on the website reflect
        our current or planned offerings and may be revised, updated, rescheduled or discontinued by Techno Gurukul
        from time to time as we develop our programs. Please confirm current program details directly with us before
        making an enrollment decision.
      </p>
    ),
  },
  {
    id: "enquiries-and-applications",
    title: "Enquiries and Applications",
    body: (
      <p>
        The enquiry form on our{" "}
        <Link href="/contact" className="font-medium text-primary underline-offset-2 hover:underline">
          Contact page
        </Link>{" "}
        prepares a pre-filled email in your own email application, which you then choose to send to {EMAIL}. Sending
        an enquiry does not, by itself, create any enrollment, reservation of a seat, or other obligation on the part
        of Techno Gurukul; it simply starts a conversation. You are responsible for the accuracy of the information
        you provide to us.
      </p>
    ),
  },
  {
    id: "enrollment",
    title: "Enrollment",
    body: (
      <p>
        The website does not currently offer an automated online application or checkout process. Enrollment in a
        Techno Gurukul program is finalised through direct communication with us, typically following an
        enquiry, call or in-person meeting, and specific enrollment terms, schedules and requirements for a
        program will be explained to you at that stage, separately from these website terms.
      </p>
    ),
  },
  {
    id: "fees-and-payments",
    title: "Fees and Payments",
    body: (
      <p>
        This website does not currently process online payments. Where applicable, program fees, payment schedules
        and accepted payment methods are communicated to you directly by Techno Gurukul as part of the enrollment
        process: <Tbc>FEE AND PAYMENT TERMS TO BE CONFIRMED</Tbc>. If online payment functionality is introduced on
        this website in the future, additional terms specific to the payment provider used at that time will apply
        and will be disclosed before you are asked to pay.
      </p>
    ),
  },
  {
    id: "refunds-and-cancellations",
    title: "Refunds and Cancellations",
    body: (
      <p>
        Cancellation, withdrawal and refund terms for Techno Gurukul programs are set out separately in our{" "}
        <Link href="/legal/refund-policy" className="font-medium text-primary underline-offset-2 hover:underline">
          Refund &amp; Cancellation Policy
        </Link>
        , which forms part of these Terms of Use.
      </p>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    body: (
      <p>
        Unless otherwise indicated, the website&rsquo;s content, including text, graphics, layout, curriculum
        materials, logos and branding, is owned by or licensed to Techno Gurukul and is protected by
        applicable intellectual property laws. You may view and print pages of this website for your own personal,
        non-commercial use. You may not reproduce, republish, redistribute or otherwise commercially exploit any
        part of the website&rsquo;s content without our prior written permission.
      </p>
    ),
  },
  {
    id: "access-profile",
    title: "Access Profiles and Restricted Content",
    body: (
      <>
        <p>
          Some projects, resources and community features are available only after you create an access profile with your
          name, email address and phone number. Please give accurate details and keep them up to date. Your access is
          personal to you: do not share it or use another person&rsquo;s details.
        </p>
        <p>
          We use your details as described in our{" "}
          <Link href="/privacy-policy" className="font-medium text-primary underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          . If you are under 18, a parent or guardian must agree before you create a profile. We may restrict or end
          access if these terms or the Community Guidelines are broken, or if details are found to be false.
        </p>
      </>
    ),
  },
  {
    id: "user-content",
    title: "Comments, Reviews and Other Content You Post",
    body: (
      <>
        <p>
          You are responsible for what you post. Keep to the{" "}
          <Link href="/community-guidelines" className="font-medium text-primary underline-offset-2 hover:underline">
            Community Guidelines
          </Link>
          , and only post content you have the right to share. You keep ownership of it, and you give Techno Gurukul
          permission to display it on the website for as long as it is published, and to remove or edit it for
          moderation.
        </p>
        <p>
          We may review, hide or remove content at our discretion, for example if it is abusive, spam, unlawful, or
          contains someone else&rsquo;s personal information. Opinions in comments and reviews are those of the people who
          wrote them, not of Techno Gurukul.
        </p>
      </>
    ),
  },
  {
    id: "project-and-student-work",
    title: "Projects and Student and Faculty Work",
    body: (
      <>
        <p>
          Projects shown on the website may belong to students, faculty or Techno Gurukul. Student work is shown only
          with its creator&rsquo;s permission (and their parent&rsquo;s or guardian&rsquo;s, for a minor), and the creator can
          ask for it to be credited differently or removed by contacting us.
        </p>
        <p>
          Unless a project says otherwise, it is shared for your own learning. You may not copy, republish, sell or
          present it as your own, and you must respect any attribution shown. Trademarks, tools and third-party material
          shown in a project belong to their owners.
        </p>
      </>
    ),
  },
  {
    id: "prohibited-activities",
    title: "Prohibited Activities",
    body: (
      <>
        <p>When using this website, you agree not to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Use the website for any unlawful purpose or in violation of these terms</li>
          <li>Attempt to gain unauthorised access to the website, its systems, or any related account</li>
          <li>Use automated tools to scrape, harvest or extract content from the website at scale</li>
          <li>Upload or transmit viruses, malicious code, or anything designed to disrupt the website</li>
          <li>Impersonate any person or misrepresent your affiliation with any person or organisation</li>
          <li>Interfere with the security, integrity or performance of the website</li>
          <li>Misuse the enquiry form to send spam, unsolicited advertising or abusive messages</li>
        </ul>
      </>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-Party Links and Services",
    body: (
      <p>
        This website contains links to third-party websites and services, including our social media pages and
        embedded Google Maps and YouTube content. These links are provided for your convenience and reference. We do
        not control, and are not responsible for, the content, accuracy or practices of any linked third-party
        website. Including a link does not imply that Techno Gurukul endorses or is affiliated with that website.
      </p>
    ),
  },
  {
    id: "website-availability",
    title: "Website Availability",
    body: (
      <p>
        We aim to keep this website available and functioning correctly, but we do not guarantee that it will be
        uninterrupted, timely, secure or error-free. We may suspend, restrict or modify access to all or part of the
        website at any time, including for maintenance, without prior notice.
      </p>
    ),
  },
  {
    id: "disclaimer-of-warranties",
    title: "Disclaimer of Warranties",
    body: (
      <p>
        To the extent permitted by applicable law, this website and its content are provided &ldquo;as is&rdquo; and
        &ldquo;as available&rdquo;, without warranties of any kind, whether express or implied, including as to
        accuracy, completeness, reliability or fitness for a particular purpose. Nothing in this section limits any
        warranty or guarantee that cannot lawfully be excluded under applicable Indian consumer protection law.
      </p>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    body: (
      <p>
        To the maximum extent permitted by applicable law, Techno Gurukul will not be liable for any indirect,
        incidental or consequential loss or damage arising from your access to, or use of (or inability to use),
        this website or its content. Nothing in these terms excludes or limits liability that cannot be excluded or
        limited as a matter of applicable law, including certain rights available to consumers.
      </p>
    ),
  },
  {
    id: "indemnification",
    title: "Indemnification",
    body: (
      <p>
        You agree to hold Techno Gurukul harmless from reasonable claims, losses or expenses that directly arise
        from your misuse of this website or your violation of these terms, except where such claims, losses or
        expenses result from our own error or wrongdoing.
      </p>
    ),
  },
  {
    id: "suspension-or-termination",
    title: "Suspension or Termination",
    body: (
      <p>
        We may restrict or suspend a visitor&rsquo;s access to this website where we reasonably believe these terms
        have been violated. Suspension or termination of an enrollment (as opposed to website access) would be
        governed by the specific enrollment terms agreed with you separately, once such an agreement exists.
      </p>
    ),
  },
  {
    id: "changes-to-these-terms",
    title: "Changes to These Terms",
    body: (
      <p>
        We may update these Terms of Use from time to time, for example as the website&rsquo;s features
        change. Continued use of the website after an update means you accept the revised terms. The &ldquo;Last
        updated&rdquo; date at the top of this page reflects the most recent revision.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law",
    body: (
      <p>
        These terms are intended to be interpreted in accordance with applicable Indian law. The specific governing
        jurisdiction for these terms is <Tbc>GOVERNING JURISDICTION TO BE CONFIRMED</Tbc> and will be confirmed once
        Techno Gurukul&rsquo;s registered business details are finalised.
      </p>
    ),
  },
  {
    id: "dispute-resolution",
    title: "Dispute Resolution",
    body: (
      <p>
        If a dispute arises in connection with this website or these terms, we encourage you to contact us directly
        first at {EMAIL} so we can try to resolve it informally. Beyond informal resolution, the applicable dispute
        resolution mechanism and forum is <Tbc>DISPUTE RESOLUTION MECHANISM TO BE CONFIRMED</Tbc>, without prejudice
        to any right you may have under applicable Indian consumer protection law to raise a dispute through a
        consumer forum or other statutory mechanism.
      </p>
    ),
  },
  {
    id: "contact-information",
    title: "Contact Information",
    body: (
      <p>
        Questions about these Terms of Use can be sent to{" "}
        <a href={`mailto:${EMAIL}`} className="font-medium text-primary underline-offset-2 hover:underline">
          {EMAIL}
        </a>
        , or by post to Office No. 305, Platinum Plaza, opp. Ramayan Bungalow, next to Jain Oswal Boarding, Tilak
        Wadi, Police Staff Colony, Nashik, Maharashtra 422002, India.
      </p>
    ),
  },
];
