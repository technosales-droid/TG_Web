import { Tbc, type LegalSectionData } from "./legal-layout";

export const HEADING = "Disclaimer";
export const DESCRIPTION =
  "Important information about educational content, career outcomes, third-party resources and use of this website.";
export const LAST_UPDATED = "23 September 2026";

const EMAIL = "hello@technogurukul.com";

export const DISCLAIMER_SECTIONS: LegalSectionData[] = [
  {
    id: "educational-information",
    title: "Educational Information",
    body: (
      <p>
        All content on this website relating to programs, curriculum, learning approach, career paths, industry
        skills, blog articles and resources is provided for general educational and informational purposes only. It
        is intended to help you understand Techno Gurukul and the fields our programs cover, not to serve as a
        complete or authoritative statement on any subject.
      </p>
    ),
  },
  {
    id: "accuracy-of-information",
    title: "Accuracy of Information",
    body: (
      <p>
        We take reasonable care to keep information on this website current and accurate, but we do not warrant that
        every page is complete, error-free or fully up to date at all times. Industry practices, tools, technologies
        and job markets change, and content on this website may not always reflect the very latest developments.
      </p>
    ),
  },
  {
    id: "no-professional-advice",
    title: "No Professional Advice",
    body: (
      <p>
        Nothing on this website constitutes professional, financial, legal or personalised career counselling
        advice. Content about programs, career paths and industry trends is general in nature. Before making
        education, career or financial decisions, please use your own judgment and, where appropriate, seek advice
        from a qualified professional.
      </p>
    ),
  },
  {
    id: "program-and-curriculum-information",
    title: "Program and Curriculum Information",
    body: (
      <p>
        Program names, curriculum structure, duration, tools and topics described on this website reflect our
        current or planned program design and may be revised, updated or restructured over time as industry practice
        evolves. Please confirm current curriculum details directly with Techno Gurukul before enrolling.
      </p>
    ),
  },
  {
    id: "no-guaranteed-employment",
    title: "No Guaranteed Employment or Career Outcome",
    body: (
      <p>
        Techno Gurukul provides skills-based training and does not guarantee employment, internship, placement,
        promotion or any specific career outcome to any student. Career and employment outcomes depend on many
        factors outside our control, including an individual&rsquo;s effort and performance, prior experience,
        market and hiring conditions, employer decisions, and broader economic conditions. Where this website refers
        to career paths, industry roles or placement-related support, it describes the guidance and opportunities
        Techno Gurukul may make available; it is not a promise of a job offer or a particular result.
      </p>
    ),
  },
  {
    id: "salary-career-information",
    title: "Salary / Career Information",
    body: (
      <p>
        Any salary ranges, industry trends or career-progression information referenced on this website (including
        on career-path pages) is general, indicative information intended to help you understand an industry. It is
        not a guarantee of individual earning potential. Actual compensation depends on the employer, role,
        location, experience, negotiation and other factors specific to each individual.
      </p>
    ),
  },
  {
    id: "certifications",
    title: "Certifications",
    body: (
      <p>
        Where a program refers to a certificate or certification of completion, this refers to a certificate issued
        by or associated with Techno Gurukul&rsquo;s own program, not a third-party industry certification or a
        government or statutory accreditation, unless explicitly and separately stated for that specific program.{" "}
        <Tbc>CERTIFICATION / ACCREDITATION DETAILS TO BE CONFIRMED</Tbc> for any program where external recognition
        is claimed.
      </p>
    ),
  },
  {
    id: "third-party-tools",
    title: "Third-Party Tools and Platforms",
    body: (
      <p>
        Our programs may reference or make use of third-party software, platforms and tools, for example,
        industry-standard design, development, marketing or game-engine tools, as part of the curriculum.
        Techno Gurukul does not control these third-party tools, and their availability, pricing, features and terms
        of use are determined by their respective providers, not by us.
      </p>
    ),
  },
  {
    id: "external-links",
    title: "External Links",
    body: (
      <p>
        This website may link to third-party websites, social media pages or other external resources for
        convenience or reference. A link to a third-party website does not imply that Techno Gurukul endorses, is
        affiliated with, or is responsible for that website&rsquo;s content, accuracy or practices. Please review the
        terms and privacy practices of any external website you visit.
      </p>
    ),
  },
  {
    id: "user-responsibility",
    title: "User Responsibility",
    body: (
      <p>
        Decisions about enrolling in a program, choosing a career path, or relying on any information from this
        website remain your responsibility. We encourage you to verify important details directly with Techno
        Gurukul before acting on them.
      </p>
    ),
  },
  {
    id: "website-availability",
    title: "Website Availability",
    body: (
      <p>
        We aim to keep this website accessible, but we do not guarantee that it will be available at all times, free
        of interruptions, or free of errors. Content may be added, changed or removed without prior notice.
      </p>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    body: (
      <p>
        To the maximum extent permitted by applicable law, Techno Gurukul is not liable for any loss or damage
        arising from reliance on information published on this website, including career, salary or outcome-related
        content, except where such liability cannot be excluded under applicable law.
      </p>
    ),
  },
  {
    id: "changes-to-website-content",
    title: "Changes to Website Content",
    body: (
      <p>
        Techno Gurukul may update, revise or remove any content on this website, including program details,
        career-path information and resources, at its discretion and without prior notice.
      </p>
    ),
  },
  {
    id: "force-majeure",
    title: "Force Majeure / Events Beyond Control",
    body: (
      <p>
        Techno Gurukul is not responsible for delays, changes or interruptions to its programs or to this website
        caused by events beyond its reasonable control, including natural events, power or internet outages,
        government action, or other circumstances of a similar nature.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        If you have a question about this Disclaimer, contact us at{" "}
        <a href={`mailto:${EMAIL}`} className="font-medium text-primary underline-offset-2 hover:underline">
          {EMAIL}
        </a>
        , or by post at Office No. 305, Platinum Plaza, opp. Ramayan Bungalow, next to Jain Oswal Boarding, Tilak
        Wadi, Police Staff Colony, Nashik, Maharashtra 422002, India.
      </p>
    ),
  },
];
