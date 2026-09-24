import Link from "next/link";
import { Tbc, type LegalSectionData } from "./legal-layout";

export const HEADING = "Community Guidelines";
export const DESCRIPTION = "How we keep comments and reviews on Techno Gurukul useful, respectful and safe.";
export const LAST_UPDATED = "24 September 2026";

const A = "font-medium text-primary underline-offset-2 hover:underline";
const UL = "list-disc space-y-2 pl-5";

export const GUIDELINE_SECTIONS: LegalSectionData[] = [
  {
    id: "purpose",
    title: "Why these guidelines exist",
    body: (
      <p>
        Comments and reviews are there so learners can ask questions, share what they learned and say honestly how an
        article or program worked for them. These guidelines apply to everything you post. They sit alongside the{" "}
        <Link href="/terms" className={A}>Terms of Use</Link>.
      </p>
    ),
  },
  {
    id: "be-respectful",
    title: "Be respectful",
    body: (
      <ul className={UL}>
        <li>Disagree with ideas, not people. Keep feedback specific and kind.</li>
        <li>Do not harass, threaten, bully or demean anyone, including students, faculty and other readers.</li>
        <li>No hate speech or abuse based on caste, religion, gender, sexuality, disability, region, language or similar.</li>
        <li>Do not impersonate another person or claim to speak for Techno Gurukul.</li>
      </ul>
    ),
  },
  {
    id: "keep-it-useful",
    title: "Keep it useful and honest",
    body: (
      <ul className={UL}>
        <li>Stay on topic. Reviews should reflect your real experience.</li>
        <li>No spam, repeated posts or unrelated promotion. No advertising your own products, courses or services.</li>
        <li>Do not post fake or paid reviews, or reviews for someone else.</li>
        <li>Give credit. Do not copy other people&rsquo;s work, and do not post content you do not have the right to share.</li>
      </ul>
    ),
  },
  {
    id: "safety",
    title: "Keep everyone safe",
    body: (
      <ul className={UL}>
        <li>Do not post other people&rsquo;s personal information, such as phone numbers, addresses or photos, without their permission. Think twice before posting your own.</li>
        <li>Do not post links to malware, phishing or misleading pages.</li>
        <li>Nothing illegal, sexually explicit, or that encourages harm.</li>
        <li>If you are under 18, do not share personal details in a public comment.</li>
      </ul>
    ),
  },
  {
    id: "moderation",
    title: "Moderation",
    body: (
      <>
        <p>
          Techno Gurukul may remove or hide any comment or review, and may restrict access for someone who repeatedly breaks
          these guidelines. Removal is carried out by authorised staff. We do not remove honest criticism because it is
          negative.
        </p>
        <p>
          Reports of comments and reviews are handled by <Tbc>MODERATION CONTACT AND PROCESS</Tbc>.
        </p>
      </>
    ),
  },
  {
    id: "reporting",
    title: "Reporting a problem",
    body: (
      <p>
        If you see something that breaks these guidelines, tell us through the{" "}
        <Link href="/contact" className={A}>contact page</Link>, giving the article and what you saw. If it involves your
        personal information, use <Link href="/privacy-requests" className={A}>Privacy Requests</Link>.
      </p>
    ),
  },
];
