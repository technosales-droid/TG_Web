import type { LegalSectionData } from "./legal-layout";

export const HEADING = "Disclaimer";
export const DESCRIPTION = "Important information about educational content, career outcomes, certifications and third-party tools referenced on this website.";
export const LAST_UPDATED = "7 October 2026";

const EMAIL = "info@technogurukul.com";
const A = "font-medium text-primary underline-offset-2 hover:underline";

export const DISCLAIMER_SECTIONS: LegalSectionData[] = [
  {
    id: "general-information",
    title: "General Information",
    body: (
      <p>
        The information, content, and materials provided on the Techno Gurukul website (technogurukul.com) and
        through our programs are for general informational and educational purposes only. While we strive to keep
        the information accurate, complete, and up to date, we make no representations or warranties of any kind,
        express or implied, about the accuracy, reliability, suitability, or availability of the website or the
        information, programs, or related graphics contained on the website for any purpose.
      </p>
    ),
  },
  {
    id: "not-a-guarantee-of-employment-or-income",
    title: "Not a Guarantee of Employment or Income",
    body: (
      <>
        <p>
          Techno Gurukul is an educational institution providing skill-based training.{" "}
          <strong className="text-foreground">We do not guarantee job placement, employment, income, or specific
          career outcomes</strong> as a result of completing any program. While our programs are designed to develop
          practical, industry-relevant skills, individual outcomes depend on many factors including but not limited
          to: the student&rsquo;s effort, prior knowledge, dedication, market conditions, and the student&rsquo;s own
          job search or business development activities.
        </p>
        <p>
          Any statements about career paths, job roles, or income potential on this website reflect realistic
          possibilities based on industry data and graduate experiences, not guaranteed outcomes for every student.
        </p>
      </>
    ),
  },
  {
    id: "certifications-and-accreditation",
    title: "Certifications and Accreditation",
    body: (
      <>
        <p>
          Upon successful completion of a Techno Gurukul program, students receive a Certificate of Completion
          issued directly by Techno Gurukul. These certificates are not affiliated with any university, government
          body, or external accreditation authority.
        </p>
        <p>
          Certificates are awarded based on satisfactory completion of program requirements, including attendance,
          assignments, projects, and assessments. The specific criteria for certification are communicated to
          students at the beginning of each program.
        </p>
        <p>
          Recognition of our certificates by employers, academic institutions, or other organizations is at their
          sole discretion. Techno Gurukul does not guarantee that its certificates will be recognized by any third
          party.
        </p>
      </>
    ),
  },
  {
    id: "third-party-tools-and-platforms",
    title: "Third-Party Tools and Platforms",
    body: (
      <>
        <p>
          Our programs may involve the use of third-party tools, platforms, software, or services (e.g., Google Ads,
          Meta Ads Manager, Canva, WordPress, game engines). We are not affiliated with, endorsed by, or responsible
          for these third-party platforms. Any trademarks, logos, or brand names displayed in our course materials
          are the property of their respective owners and are used for educational purposes only.
        </p>
        <p>
          Students may be required to create accounts on third-party platforms. Any fees, terms of service, or
          privacy policies associated with these platforms are the responsibility of the student to review and
          accept independently.
        </p>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    body: (
      <>
        <p>
          To the fullest extent permitted by applicable law, Techno Gurukul, its directors, instructors, employees,
          and affiliates shall not be liable for any loss, damage, or injury arising from:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>The use or inability to use the website or its content</li>
          <li>Any errors, omissions, or inaccuracies in the content</li>
          <li>Any unauthorized access to or use of our servers and personal information stored therein</li>
          <li>Any interruptions, suspensions, or discontinuation of services</li>
          <li>Any decisions made based on information provided on this website</li>
        </ul>
      </>
    ),
  },
  {
    id: "changes-to-programs-and-content",
    title: "Changes to Programs and Content",
    body: (
      <p>
        Techno Gurukul continuously updates its curriculum to reflect industry changes and best practices. Program
        content, structure, duration, and fees are subject to change without prior notice. Students currently
        enrolled in a program will continue under the curriculum and terms agreed upon at the time of enrollment,
        unless mutually agreed otherwise.
      </p>
    ),
  },
  {
    id: "external-links",
    title: "External Links",
    body: (
      <p>
        This website may contain links to external websites that are not operated by us. We have no control over
        and assume no responsibility for the content, privacy policies, or practices of any third-party websites.
        We encourage you to review the terms and privacy policies of any third-party sites you visit.
      </p>
    ),
  },
  {
    id: "indemnification",
    title: "Indemnification",
    body: (
      <p>
        You agree to indemnify, defend, and hold harmless Techno Gurukul, its officers, directors, employees,
        agents, and affiliates from and against any and all claims, damages, losses, liabilities, costs, and
        expenses (including reasonable attorney&rsquo;s fees) arising from or in any way connected with your use of
        the website, violation of these terms, or infringement of any rights of another party.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        If you have any questions about this Disclaimer, please contact us at{" "}
        <a href={`mailto:${EMAIL}`} className={A}>{EMAIL}</a>, phone{" "}
        <a href="tel:+917387152953" className={A}>+91 73871 52953</a>, or by post at Office No. 305, Platinum Plaza,
        opp. Ramayan Bungalow, next to Jain Oswal Boarding, Tilak Wadi, Nashik, Maharashtra.
      </p>
    ),
  },
];
