import Link from "next/link";
import { Tbc, type LegalSectionData } from "./legal-layout";

export const HEADING = "Privacy Policy";
export const DESCRIPTION =
  "Learn how Techno Gurukul collects, uses, protects and manages information when you interact with our website and services.";
export const LAST_UPDATED = "23 September 2026";

const EMAIL = "hello@technogurukul.com";

export const PRIVACY_SECTIONS: LegalSectionData[] = [
  {
    id: "introduction",
    title: "Introduction",
    body: (
      <>
        <p>
          This Privacy Policy explains how Techno Gurukul (&ldquo;Techno Gurukul&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo; or &ldquo;our&rdquo;) collects, uses, shares and protects information in connection with
          this website and the educational programs and services we describe on it.
        </p>
        <p>
          This policy applies to visitors who browse the website, submit an enquiry, or otherwise interact with the
          content, forms and features described here. It does not apply to information collected offline (for
          example, during in-person conversations, phone calls or physical enrollment paperwork), which is handled
          separately and in the same spirit of care described in this policy.
        </p>
        <p>
          By using this website, you agree to the collection and use of information as described in this policy. If
          you do not agree, please do not use the website or submit information through it.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: (
      <>
        <p>The website currently collects information in two general ways:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Information you provide directly</strong> — for example, through the
            enquiry form on our Contact page.
          </li>
          <li>
            <strong className="text-foreground">Limited technical information</strong> that may be processed
            automatically by the infrastructure that serves this website, and by third-party content that is
            embedded on certain pages (such as a map or a video).
          </li>
        </ul>
        <p>
          We do not currently collect payment card details, government identity numbers, or sensitive personal data
          through this website. We only ask for information that is reasonably relevant to responding to an enquiry
          or, in future, processing an application.
        </p>
      </>
    ),
  },
  {
    id: "information-you-provide",
    title: "Information You Provide Directly",
    body: (
      <>
        <p>The main way information reaches us through the website today is the enquiry form on our Contact page. That form asks for:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number (optional)</li>
          <li>What you are enquiring about (programs, learning, admissions, careers &amp; placement, or a general enquiry)</li>
          <li>Program or area of interest (optional)</li>
          <li>Your message</li>
        </ul>
        <p>
          The form works by preparing a pre-filled email and opening it in your own email application. Sending the
          enquiry is your action, sent from your own email account to {EMAIL} &mdash; the website itself does not
          transmit your enquiry to a Techno Gurukul server or database. Once you send it, we receive it as an
          ordinary email, in the same way as if you had written to us directly.
        </p>
        <p>
          If you contact us by email, phone or in person outside of this form, the information you choose to share
          in that conversation is handled with the same care described in this policy.
        </p>
      </>
    ),
  },
  {
    id: "information-collected-automatically",
    title: "Information Collected Automatically",
    body: (
      <>
        <p>
          This website does not currently use analytics, advertising or visitor-tracking scripts. We do not build
          browsing profiles of visitors and do not track you across other websites.
        </p>
        <p>
          As with most websites, the hosting and content-delivery infrastructure that serves these pages to your
          browser may automatically process a limited amount of technical information (for example, IP address,
          browser type, device type, or the pages requested) purely as part of delivering the website and keeping it
          secure. Techno Gurukul does not currently access, analyse or use this information for marketing purposes.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and Similar Technologies",
    body: (
      <>
        <p>
          Techno Gurukul does not currently set its own analytics, advertising or marketing cookies on this website,
          and there is no cookie-consent mechanism because no non-essential first-party tracking is in place.
        </p>
        <p>Certain pages embed third-party content, which may set their own cookies or use similar technologies under their own privacy policies once that content loads or you interact with it:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Google Maps</strong> &mdash; embedded on location pages to show our
            office on a map.
          </li>
          <li>
            <strong className="text-foreground">YouTube (privacy-enhanced mode)</strong> &mdash; used for some
            program-related videos in the Learning section, loaded via YouTube&rsquo;s &ldquo;nocookie&rdquo; embed
            mode, which limits cookie use until you interact with the player.
          </li>
        </ul>
        <p>
          These embeds are provided by Google and are governed by Google&rsquo;s own privacy and cookie practices,
          which are outside Techno Gurukul&rsquo;s control. If this changes &mdash; for example, if analytics or
          advertising tools are added in future &mdash; this section will be updated accordingly.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How We Use Information",
    body: (
      <>
        <p>We use the information described above to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Respond to enquiries and questions about our programs and services</li>
          <li>Understand what programs or information a visitor is interested in, so we can respond usefully</li>
          <li>Communicate with prospective and enrolled students about programs, schedules and related matters</li>
          <li>Maintain, secure and improve the website and the accuracy of its content</li>
          <li>Meet legal, regulatory or administrative obligations that apply to us</li>
        </ul>
        <p>We do not use the information you send us to make automated decisions that produce legal or similarly significant effects about you.</p>
      </>
    ),
  },
  {
    id: "communication-and-enquiry-data",
    title: "Communication and Enquiry Data",
    body: (
      <p>
        When you send an enquiry through the website (or by email, phone or in person), we use the details you
        provide to understand and respond to your question, discuss the relevant program or service, and follow up
        as reasonably necessary. We do not use enquiry information for unrelated marketing without a proper basis to
        do so, and we do not sell or rent it to third parties.
      </p>
    ),
  },
  {
    id: "application-enrollment-data",
    title: "Application / Enrollment Data",
    body: (
      <p>
        The website does not currently include an online application or enrollment portal. Enrollment in a Techno
        Gurukul program currently happens through direct communication &mdash; typically following an enquiry, call
        or meeting &mdash; rather than an automated on-site process. Any personal information you share with us
        during that process (for example, to confirm enrollment details) is handled with the same principles
        described in this policy. If an online application or enrollment system is introduced in the future, this
        Privacy Policy will be updated to describe it accurately before it goes live.
      </p>
    ),
  },
  {
    id: "payment-information",
    title: "Payment Information",
    body: (
      <p>
        This website does not currently process online payments, and we do not collect or store card, UPI or other
        payment credentials through it. Where program fees are currently collected, that happens outside the
        website, through arrangements communicated to you directly by Techno Gurukul. If online payment
        functionality is introduced in the future, payment details at that time would be handled by the applicable
        third-party payment provider under its own security and privacy practices, and this policy will be updated
        to name that provider and explain what it does with your payment information.
      </p>
    ),
  },
  {
    id: "how-we-share-information",
    title: "How We Share Information",
    body: (
      <>
        <p>
          Techno Gurukul does not sell, rent or trade your personal information. We may share information in the
          following limited circumstances:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>With service providers who help us operate the website (see &ldquo;Service Providers and Technology Partners&rdquo; below)</li>
          <li>Where required to comply with applicable law, regulation, legal process or a valid governmental request</li>
          <li>To protect the rights, property or safety of Techno Gurukul, our students, or the public, where appropriate</li>
          <li>With your consent, or at your direction</li>
        </ul>
      </>
    ),
  },
  {
    id: "service-providers",
    title: "Service Providers and Technology Partners",
    body: (
      <p>
        The website is built and delivered using standard web hosting and content-delivery infrastructure, and
        embeds Google Maps (for our location) and YouTube (for select program videos, in privacy-enhanced mode), as
        described under &ldquo;Cookies and Similar Technologies&rdquo; above. We do not currently integrate a CRM,
        marketing automation platform, analytics service or advertising network, so enquiry information is not
        shared with any such tool today. If that changes, this section will be updated to name the relevant
        provider and explain its role.
      </p>
    ),
  },
  {
    id: "legal-regulatory-disclosures",
    title: "Legal / Regulatory Disclosures",
    body: (
      <p>
        We may disclose information where we believe in good faith that disclosure is reasonably necessary to comply
        with applicable law, regulation, court order or other legal process, or to respond to a lawful request from
        a public or government authority.
      </p>
    ),
  },
  {
    id: "data-security",
    title: "Data Security",
    body: (
      <>
        <p>
          We take reasonable, common-sense steps to protect information shared with us, such as limiting who can
          access enquiry correspondence and keeping the software behind the website reasonably up to date. Because
          the enquiry form sends information as an ordinary email from your own device, its security in transit also
          depends on your own email provider&rsquo;s security practices.
        </p>
        <p>
          No method of transmission over the internet or method of electronic storage is completely secure, and we
          cannot guarantee absolute security. We do not currently hold any specific third-party security
          certification for this website, and we will not claim one unless it has actually been obtained.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "Data Retention",
    body: (
      <p>
        We aim to keep personal information only for as long as reasonably necessary for the purpose it was
        collected for &mdash; for example, to respond to and follow up on an enquiry. A formal, published data
        retention schedule has not yet been finalised: <Tbc>DATA RETENTION PERIOD TO BE CONFIRMED</Tbc>. This section
        will be updated once specific retention periods are confirmed internally.
      </p>
    ),
  },
  {
    id: "your-rights-and-choices",
    title: "Your Rights and Choices",
    body: (
      <p>
        You may ask us what information we hold about you, request that we correct inaccurate information, or ask us
        to delete information you have previously shared with us, subject to any legitimate need we may have to keep
        it (for example, to respond to an ongoing enquiry or meet a legal obligation). To make a request, contact us
        using the details in &ldquo;Contact / Privacy Queries&rdquo; below.
      </p>
    ),
  },
  {
    id: "correction-of-information",
    title: "Correction / Updating of Information",
    body: (
      <p>
        If any information you have given us (such as your contact details or program interest) changes or was
        entered incorrectly, let us know at {EMAIL} and we will update our records accordingly.
      </p>
    ),
  },
  {
    id: "withdrawal-of-consent",
    title: "Withdrawal of Consent",
    body: (
      <p>
        Where we rely on your consent (for example, submitting the enquiry form, which requires you to confirm you
        understand how it works before it can be sent), you may withdraw that consent at any time by contacting us.
        Withdrawing consent will not affect anything already sent to us, and may limit our ability to respond to an
        enquiry that is still open.
      </p>
    ),
  },
  {
    id: "childrens-privacy",
    title: "Children’s / Minor’s Privacy",
    body: (
      <p>
        Some of Techno Gurukul&rsquo;s programs may be relevant to students who are minors. Where the website or its
        enquiry form is used to ask about a program on behalf of, or together with, a minor, we expect a parent or
        guardian to be involved in that enquiry and in any subsequent enrollment decision. We have not set a specific
        minimum age for using this website, and we do not knowingly seek to collect personal information directly
        from a minor without appropriate parental or guardian involvement. If you believe a minor has submitted
        personal information to us without appropriate involvement of a parent or guardian, please contact us at{" "}
        {EMAIL} so we can address it.
      </p>
    ),
  },
  {
    id: "third-party-websites",
    title: "Third-Party Websites and Services",
    body: (
      <p>
        This website links to third-party services, including our social media pages (Instagram, Facebook, Threads,
        Pinterest and others as listed in our footer) and, in places, Google Maps and YouTube. Once you leave this
        website or interact with embedded third-party content, that third party&rsquo;s own privacy policy applies
        to whatever information it collects. We encourage you to review the privacy practices of any third-party
        site or service you visit.
      </p>
    ),
  },
  {
    id: "changes-to-this-policy",
    title: "Changes to This Privacy Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time, for example as the website&rsquo;s features change or
        as we are able to confirm details currently marked as pending. The &ldquo;Last updated&rdquo; date at the
        top of this page reflects the most recent revision. We encourage you to review this page periodically.
      </p>
    ),
  },
  {
    id: "contact-privacy-queries",
    title: "Contact / Privacy Queries",
    body: (
      <p>
        If you have questions about this Privacy Policy or how your information is handled, contact us at{" "}
        <a href={`mailto:${EMAIL}`} className="font-medium text-primary underline-offset-2 hover:underline">
          {EMAIL}
        </a>
        , or by post at our office: Office No. 305, Platinum Plaza, opp. Ramayan Bungalow, next to Jain Oswal
        Boarding, Tilak Wadi, Police Staff Colony, Nashik, Maharashtra 422002, India. You can also reach us through
        the form on our <Link href="/contact" className="font-medium text-primary underline-offset-2 hover:underline">Contact page</Link>.
      </p>
    ),
  },
];
