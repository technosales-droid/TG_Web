import type { LegalSectionData } from "./legal-layout";
import { BUSINESS } from "@/data/business-facts";

export const HEADING = "Community Guidelines";
export const DESCRIPTION = "How we keep classes, comments and community spaces at Techno Gurukul safe, respectful and productive.";
export const LAST_UPDATED = "7 October 2026";

const EMAIL = BUSINESS.email;
const A = "font-medium text-primary underline-offset-2 hover:underline";
const UL = "list-disc space-y-2 pl-5";

export const GUIDELINE_SECTIONS: LegalSectionData[] = [
  {
    id: "introduction",
    title: "Introduction",
    body: (
      <>
        <p>
          Welcome to the Techno Gurukul community. These Community Guidelines apply to all interactions within our
          learning environment &mdash; including in-person classes, online sessions, discussion forums, social media
          comments, blog comments, WhatsApp groups, and any other platform where Techno Gurukul students, staff, or
          community members interact.
        </p>
        <p>
          These guidelines exist to create a safe, respectful, and productive environment for everyone. By
          participating in the Techno Gurukul community, you agree to follow these guidelines.
        </p>
      </>
    ),
  },
  {
    id: "be-respectful",
    title: "Be Respectful",
    body: (
      <ul className={UL}>
        <li>Treat all community members &mdash; students, instructors, staff, and guests &mdash; with respect and courtesy, regardless of their background, experience level, or opinions.</li>
        <li>Do not harass, bully, threaten, or discriminate against anyone based on race, ethnicity, religion, gender, age, disability, sexual orientation, or any other protected characteristic.</li>
        <li>Constructive criticism is welcome. Personal attacks, insults, and demeaning comments are not.</li>
        <li>Respect differing opinions. Disagree with ideas, not with people.</li>
      </ul>
    ),
  },
  {
    id: "be-supportive",
    title: "Be Supportive",
    body: (
      <ul className={UL}>
        <li>Encourage and support fellow learners. Everyone is at a different stage in their journey.</li>
        <li>Share knowledge freely and help others when they have questions or face challenges.</li>
        <li>Acknowledge and celebrate the achievements of other community members.</li>
        <li>Do not belittle someone for asking a &ldquo;basic&rdquo; question or making a mistake. Learning requires making mistakes.</li>
      </ul>
    ),
  },
  {
    id: "be-professional",
    title: "Be Professional",
    body: (
      <ul className={UL}>
        <li>Communicate clearly, honestly, and constructively in all community interactions.</li>
        <li>Do not share misleading, false, or intentionally disruptive information.</li>
        <li>Respect the intellectual property of others. Do not share copyrighted materials without permission.</li>
        <li>Do not share confidential or proprietary information about the institute, its programs, or other community members.</li>
        <li>Avoid spamming, self-promotion unrelated to the community&rsquo;s learning goals, and commercial solicitation without permission.</li>
      </ul>
    ),
  },
  {
    id: "appropriate-content",
    title: "Appropriate Content",
    body: (
      <>
        <p>All content shared within the Techno Gurukul community must be appropriate for an educational setting:</p>
        <ul className={UL}>
          <li>No offensive, obscene, pornographic, or sexually explicit content</li>
          <li>No content that promotes violence, hate speech, or illegal activities</li>
          <li>No sharing of personal information about other community members without their consent</li>
          <li>No content that violates the privacy or dignity of any individual</li>
        </ul>
      </>
    ),
  },
  {
    id: "academic-integrity",
    title: "Academic Integrity",
    body: (
      <ul className={UL}>
        <li>Do your own work. Plagiarism, copying assignments, or submitting someone else&rsquo;s work as your own is not acceptable.</li>
        <li>Collaborate honestly and give credit when building on others&rsquo; ideas or work.</li>
        <li>Do not share answers to assessments, quizzes, or exams with other students during active evaluation periods.</li>
        <li>Use AI tools responsibly and transparently &mdash; disclose when AI assistance is used in submitted work, as per your instructor&rsquo;s guidelines.</li>
      </ul>
    ),
  },
  {
    id: "platform-specific-rules",
    title: "Platform-Specific Rules",
    body: (
      <ul className={UL}>
        <li><strong className="text-foreground">Blog comments:</strong> Comments are moderated. Keep comments relevant to the article topic. Off-topic, spam, or offensive comments will be removed.</li>
        <li><strong className="text-foreground">Social media:</strong> When interacting on Techno Gurukul&rsquo;s social media pages, represent yourself respectfully. Do not post abusive or off-topic comments on our public channels.</li>
        <li><strong className="text-foreground">Class sessions:</strong> Be on time, mute your microphone when not speaking, use the chat feature appropriately, and follow your instructor&rsquo;s session guidelines.</li>
        <li><strong className="text-foreground">WhatsApp / messaging groups:</strong> Use groups for program-related discussions only. No off-topic forwarding, spam, or unrelated promotions.</li>
      </ul>
    ),
  },
  {
    id: "reporting-and-moderation",
    title: "Reporting and Moderation",
    body: (
      <>
        <p>If you witness behavior that violates these Community Guidelines, please report it:</p>
        <ul className={UL}>
          <li>
            <strong className="text-foreground">How to report:</strong> Send an email to{" "}
            <a href={`mailto:${EMAIL}`} className={A}>{EMAIL}</a> with the subject line &ldquo;Community
            Report&rdquo; and details of the incident, including date, time, platform, and a description of the
            behavior. If possible, include screenshots or links.
          </li>
          <li>
            <strong className="text-foreground">Who handles reports:</strong> All community reports are handled by
            the Techno Gurukul administration team. Reports are reviewed by designated staff members, and
            appropriate action is taken based on the nature and severity of the reported behavior.
          </li>
          <li>
            <strong className="text-foreground">Response time:</strong> We aim to acknowledge all reports within 2
            business days and resolve the matter within 5 business days. Complex cases may take longer, and the
            reporter will be kept informed of the status.
          </li>
          <li>
            <strong className="text-foreground">Confidentiality:</strong> Reports are handled confidentially. The
            identity of the person reporting will not be disclosed without their consent, except where required by
            law.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "consequences-of-violations",
    title: "Consequences of Violations",
    body: (
      <>
        <p>
          Violations of these Community Guidelines may result in the following actions, depending on the severity
          and frequency of the violation:
        </p>
        <ul className={UL}>
          <li><strong className="text-foreground">Warning:</strong> A formal written warning from the moderation team</li>
          <li><strong className="text-foreground">Content removal:</strong> Removal of offending content from community platforms</li>
          <li><strong className="text-foreground">Temporary suspension:</strong> Temporary restriction from community platforms or sessions</li>
          <li>
            <strong className="text-foreground">Permanent removal:</strong> Permanent dismissal from the Techno
            Gurukul community and, for enrolled students, possible termination of enrollment without refund in cases
            of severe or repeated violations
          </li>
        </ul>
        <p>All disciplinary actions are at the discretion of the Techno Gurukul management team, following a fair review of the situation.</p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <>
        <p>For questions about these Community Guidelines or to report a concern:</p>
        <ul className={UL}>
          <li><strong className="text-foreground">Report an issue:</strong> <a href={`mailto:${EMAIL}`} className={A}>{EMAIL}</a></li>
          <li><strong className="text-foreground">General enquiries:</strong> <a href={`mailto:${EMAIL}`} className={A}>{EMAIL}</a></li>
          <li><strong className="text-foreground">Phone:</strong> <a href="tel:+917387152953" className={A}>+91 73871 52953</a></li>
          <li><strong className="text-foreground">Address:</strong> Office No. 305, Platinum Plaza, opp. Ramayan Bungalow, next to Jain Oswal Boarding, Tilak Wadi, Nashik, Maharashtra</li>
        </ul>
      </>
    ),
  },
];
