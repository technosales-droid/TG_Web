import Link from "next/link";
import type { LegalSectionData } from "./legal-layout";
import { BUSINESS } from "@/data/business-facts";

export const HEADING = "Privacy Policy";
export const DESCRIPTION = "How Techno Gurukul collects, uses, stores and protects your personal information, and the rights you have over it.";
export const LAST_UPDATED = "7 October 2026";

const EMAIL = BUSINESS.email;
const GRIEVANCE_EMAIL = "ebrahim@technogurukul.com";
const A = "font-medium text-primary underline-offset-2 hover:underline";
const UL = "list-disc space-y-2 pl-5";

export const PRIVACY_SECTIONS: LegalSectionData[] = [
  {
    id: "introduction",
    title: "Introduction",
    body: (
      <p>
        This Privacy Policy describes how Techno Gurukul (&ldquo;Techno Gurukul,&rdquo; &ldquo;we,&rdquo;
        &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, stores, and protects your personal information when
        you visit our website technogurukul.com or enroll in our programs. This policy is designed to comply with
        applicable Indian data protection laws, including the Digital Personal Data Protection (DPDP) Act, 2023.
      </p>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: (
      <>
        <p>We collect information that you voluntarily provide to us through:</p>
        <ul className={UL}>
          <li>
            <strong className="text-foreground">Enquiry and contact forms:</strong> Name, email address, phone
            number, course interest, current education/professional status, preferred contact method, and any
            message you submit.
          </li>
          <li>
            <strong className="text-foreground">Cookies and usage data:</strong> Information about how you interact
            with our website, including pages visited, time spent, browser type, and device information. See our{" "}
            <Link href="/cookie-policy" className={A}>Cookie Policy</Link> for details.
          </li>
          <li>
            <strong className="text-foreground">Communications:</strong> When you contact us via email, phone,
            WhatsApp, or social media, we retain the content of those communications.
          </li>
          <li>
            <strong className="text-foreground">Program enrollment data:</strong> For enrolled students, we collect
            additional information necessary for program administration, including academic background,
            identification documents, and payment records.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-your-information",
    title: "How We Use Your Information",
    body: (
      <ul className={UL}>
        <li>To respond to your enquiries and provide information about our programs</li>
        <li>To process program enrollments and manage student records</li>
        <li>To communicate with you about your application, enrollment status, and program updates</li>
        <li>To improve our website, programs, and services based on user feedback and behavior</li>
        <li>To send you relevant updates, newsletters, and promotional content (you may unsubscribe at any time)</li>
        <li>To comply with legal and regulatory obligations</li>
        <li>To protect the security and integrity of our website and services</li>
      </ul>
    ),
  },
  {
    id: "data-storage-and-security",
    title: "Data Storage and Security",
    body: (
      <>
        <p><strong className="text-foreground">Legal Entity:</strong> Techno Gurukul</p>
        <p>
          <strong className="text-foreground">Registered Address:</strong> Office No. 305, Platinum Plaza, opp.
          Ramayan Bungalow, next to Jain Oswal Boarding, Tilak Wadi, Nashik, Maharashtra
        </p>
        <p className="font-semibold text-foreground">Where your data is stored:</p>
        <ul className={UL}>
          <li><strong className="text-foreground">Hosting provider:</strong> GoDaddy (Node.js Hosting).</li>
          <li><strong className="text-foreground">Data storage location:</strong> Europe, via our hosting provider&rsquo;s data centres.</li>
        </ul>
        <p>
          <strong className="text-foreground">Security measures:</strong> We implement appropriate technical and
          organizational measures to protect your personal data against unauthorized access, alteration,
          disclosure, or destruction. However, no method of transmission over the internet or electronic storage is
          100% secure, and we cannot guarantee absolute security.
        </p>
      </>
    ),
  },
  {
    id: "data-sharing-and-disclosure",
    title: "Data Sharing and Disclosure",
    body: (
      <>
        <p>
          We do not sell, trade, or rent your personal information to third parties. We may share your information
          only in the following circumstances:
        </p>
        <ul className={UL}>
          <li>
            <strong className="text-foreground">Service providers:</strong> With trusted third-party service
            providers who assist us in operating our website, processing payments, or delivering services, under
            strict confidentiality agreements.
          </li>
          <li><strong className="text-foreground">Legal compliance:</strong> When required by law, court order, or governmental authority.</li>
          <li>
            <strong className="text-foreground">Business transfer:</strong> In the event of a merger, acquisition,
            or sale of assets, user information may be transferred as part of the transaction.
          </li>
          <li><strong className="text-foreground">Consent:</strong> With your explicit consent for any other purpose.</li>
        </ul>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "Data Retention",
    body: (
      <>
        <p>
          We retain personal data only for as long as necessary to fulfill the purposes for which it was collected,
          including to satisfy legal, accounting, or reporting requirements:
        </p>
        <ul className={UL}>
          <li>
            <strong className="text-foreground">Enquiry form submissions and access profiles:</strong> Retained
            until the enquiry is resolved or converted to enrollment, after which data is archived and deleted based
            on operational requirements and applicable laws.
          </li>
          <li>
            <strong className="text-foreground">Enrolled student records:</strong> Retained for the duration of the
            program plus the period required by applicable educational record-keeping requirements.
          </li>
          <li>
            <strong className="text-foreground">Privacy request records:</strong> Retained for a period consistent
            with applicable limitation periods under Indian law.
          </li>
        </ul>
        <p>When data is no longer needed, it is securely deleted or anonymized.</p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights",
    body: (
      <>
        <p>Under applicable data protection laws, you have the following rights regarding your personal data:</p>
        <ul className={UL}>
          <li><strong className="text-foreground">Right to access:</strong> Request a copy of the personal data we hold about you.</li>
          <li><strong className="text-foreground">Right to correction:</strong> Request correction of inaccurate or incomplete data.</li>
          <li><strong className="text-foreground">Right to erasure:</strong> Request deletion of your personal data under certain circumstances.</li>
          <li><strong className="text-foreground">Right to restrict processing:</strong> Request that we limit how we use your data in certain situations.</li>
          <li><strong className="text-foreground">Right to data portability:</strong> Request your data in a structured, commonly used format.</li>
          <li><strong className="text-foreground">Right to withdraw consent:</strong> Withdraw consent for marketing communications at any time by contacting us directly.</li>
          <li><strong className="text-foreground">Right to grievance:</strong> File a complaint with our grievance officer (see below) or with the relevant data protection authority.</li>
        </ul>
        <p>To exercise any of these rights, contact us using the details in the Contact Us section below.</p>
      </>
    ),
  },
  {
    id: "response-to-privacy-requests",
    title: "Response to Privacy Requests",
    body: (
      <>
        <p>We are committed to responding to your privacy-related requests promptly and transparently:</p>
        <ul className={UL}>
          <li>
            <strong className="text-foreground">Response time:</strong> We aim to respond to all verifiable privacy
            requests within 30 days of receiving them. If additional time is needed, we will inform you of the
            extension and the reasons for it.
          </li>
          <li>We may request additional information to verify your identity before processing certain requests.</li>
          <li>There is no fee for submitting a privacy request unless the request is manifestly unfounded or excessive.</li>
        </ul>
      </>
    ),
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    body: (
      <p>
        This website is primarily intended for individuals 18 years of age and older. However, we recognize that
        younger individuals may be interested in our programs. If you are under 18, you are welcome to explore this
        website for informational purposes. If you wish to submit an enquiry or enrollment application and are under
        18, please have a parent or legal guardian contact us on your behalf. We do not knowingly collect personal
        information from children under 18 without appropriate guardian involvement.
      </p>
    ),
  },
  {
    id: "grievance-officer",
    title: "Grievance Officer",
    body: (
      <>
        <p>
          In accordance with applicable data protection laws, we have designated a Grievance Officer to address any
          concerns or complaints regarding the processing of your personal data:
        </p>
        <ul className={UL}>
          <li><strong className="text-foreground">Name:</strong> Ebrahim</li>
          <li><strong className="text-foreground">Email:</strong> <a href={`mailto:${GRIEVANCE_EMAIL}`} className={A}>{GRIEVANCE_EMAIL}</a></li>
          <li><strong className="text-foreground">Address:</strong> Nashik, Maharashtra</li>
        </ul>
        <p>We will make every effort to resolve grievances within 30 days of receipt.</p>
      </>
    ),
  },
  {
    id: "updates-to-this-policy",
    title: "Updates to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal
        requirements, or for other operational reasons. Any changes will be posted on this page with an updated
        &ldquo;Last updated&rdquo; date. We encourage you to review this Privacy Policy periodically.
      </p>
    ),
  },
  {
    id: "contact-us",
    title: "Contact Us",
    body: (
      <>
        <p>For any questions, concerns, or requests related to this Privacy Policy or your personal data:</p>
        <ul className={UL}>
          <li><strong className="text-foreground">General enquiries:</strong> <a href={`mailto:${EMAIL}`} className={A}>{EMAIL}</a></li>
          <li><strong className="text-foreground">Grievance Officer:</strong> Ebrahim at <a href={`mailto:${GRIEVANCE_EMAIL}`} className={A}>{GRIEVANCE_EMAIL}</a></li>
          <li><strong className="text-foreground">Phone:</strong> <a href="tel:+917387152953" className={A}>+91 73871 52953</a></li>
          <li><strong className="text-foreground">Address:</strong> Office No. 305, Platinum Plaza, opp. Ramayan Bungalow, next to Jain Oswal Boarding, Tilak Wadi, Nashik, Maharashtra</li>
        </ul>
      </>
    ),
  },
];
