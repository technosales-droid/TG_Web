import Link from "next/link";
import { PRIVACY_POLICY_VERSION } from "@/lib/legal-versions";
import { LegalNote, Tbc, type LegalSectionData } from "./legal-layout";

export const HEADING = "Privacy Policy";
export const DESCRIPTION =
  "How Techno Gurukul collects, uses and protects your personal information, and the choices and rights you have.";
export const LAST_UPDATED = "6 October 2026";

const EMAIL = "admission@technogurukul.com";
const A = "font-medium text-primary underline-offset-2 hover:underline";
const UL = "list-disc space-y-2 pl-5";

export const PRIVACY_SECTIONS: LegalSectionData[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <LegalNote>
          Draft for legal review. Text in <Tbc>square brackets</Tbc> is information the business still has to supply.
          Policy version: {PRIVACY_POLICY_VERSION}.
        </LegalNote>
        <p>
          This website is run by Techno Gurukul, a learning institute in Nashik, Maharashtra, India. For the personal
          information described here, the organisation responsible is <Tbc>LEGAL ENTITY NAME</Tbc>, registered at{" "}
          <Tbc>REGISTERED ADDRESS</Tbc>. In data-protection terms it decides why and how your information is used
          (the &ldquo;data fiduciary&rdquo; under India&rsquo;s Digital Personal Data Protection Act, 2023).
        </p>
        <p>
          This policy is written with reference to that Act and the rules made under it. It is not a statement that the
          organisation is compliant with any law. Different provisions come into force on dates the Government notifies,
          and this policy will be reviewed as they do.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What information we collect",
    body: (
      <>
        <p>We collect only what is needed for each purpose below.</p>
        <p className="font-semibold text-foreground">When you create an access profile (to open a project or resource, or to comment or review):</p>
        <ul className={UL}>
          <li>Your full name, email address and phone number.</li>
          <li>Optionally, the area you are interested in (for example Courses or Game Development).</li>
          <li>Whether you are 18 or older. Access profiles are not available to visitors under 18 at this time.</li>
          <li>Whether you agreed to be contacted by us. This is a separate choice and is never pre-selected.</li>
          <li>When you agreed, and which version of this policy and the Terms applied.</li>
          <li>Which page or content led you to register, and the content you later open with your access profile.</li>
        </ul>
        <p className="font-semibold text-foreground">When you use the community features:</p>
        <ul className={UL}>
          <li>The comments and reviews you write, your first name and the time you wrote them.</li>
          <li>At present, comments and reviews are saved only in your own browser. Other visitors cannot see them. We will update this policy before that changes.</li>
        </ul>
        <p className="font-semibold text-foreground">When you contact us:</p>
        <ul className={UL}>
          <li>
            The <Link href="/contact" className={A}>enquiry form</Link> sends what you type (name, email, phone, what you are
            interested in, your current status, preferred contact method, how you heard about us and your message) to us. It
            is kept with the other records described below.
          </li>
          <li>
            A <Link href="/privacy-requests" className={A}>privacy request</Link> sends the request type, your name and
            email and any message you write.
          </li>
        </ul>
        <p className="font-semibold text-foreground">Collected automatically:</p>
        <ul className={UL}>
          <li>
            Technical records such as IP address, browser type and pages requested, kept by the hosting service that
            serves the website (<Tbc>HOSTING PROVIDER</Tbc>) for security and reliability.
          </li>
        </ul>
        <p>
          We do not ask for your address, date of birth, gender, government ID numbers, payment details or any sensitive
          personal data.
        </p>
      </>
    ),
  },
  {
    id: "why-we-collect",
    title: "Why we collect it",
    body: (
      <ul className={UL}>
        <li><strong className="text-foreground">To give you access</strong> to selected projects, resources and community features.</li>
        <li><strong className="text-foreground">To run the community</strong> features: showing your first name beside your comments and reviews, and moderating them.</li>
        <li><strong className="text-foreground">To understand interest</strong> in our programs, so we know which content is useful.</li>
        <li><strong className="text-foreground">To contact you about courses, admissions, programs, resources and career opportunities, only if you agreed</strong> to that separately.</li>
        <li><strong className="text-foreground">To respond to your requests</strong>, including privacy requests.</li>
        <li><strong className="text-foreground">To keep the website secure</strong> and prevent spam and abuse.</li>
        <li><strong className="text-foreground">To meet legal obligations</strong>, where they apply.</li>
      </ul>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use it, and what we do not do",
    body: (
      <>
        <p>
          Your access profile lets you open gated content without filling in the form again on this device. Your contact
          details are used by our team to identify people who may want to hear about our programs. Being registered does
          not mean we will call or email you, and we do not treat you as agreeing to promotion unless you ticked that
          box.
        </p>
        <ul className={UL}>
          <li>We do not sell your personal information.</li>
          <li>We do not use it for advertising profiles or behavioural tracking.</li>
          <li>We do not carry out tracking, behavioural monitoring or targeted advertising directed at children.</li>
          <li>We do not send promotional messages to visitors who told us they are under 18.</li>
        </ul>
      </>
    ),
  },
  {
    id: "consent",
    title: "Your consent, and withdrawing it",
    body: (
      <>
        <p>
          Continuing with the access form means you acknowledge this policy and agree to the use of your details to give
          you access, as described here. Agreeing to be contacted is a separate, optional tick box. You can use the
          website and open gated content without ticking it.
        </p>
        <p>
          You can withdraw either consent at any time, as easily as you gave it, from the{" "}
          <Link href="/privacy-requests" className={A}>Privacy Requests</Link> page or by emailing{" "}
          <Tbc>PRIVACY CONTACT EMAIL</Tbc>. Withdrawing consent does not affect what was done before you withdrew it.
          If you withdraw the access consent, we will stop your access profile, which means the gated content and community
          features will need a new profile to use.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: (
      <>
        <p>Your information is shared only with those who need it to run the service for us:</p>
        <ul className={UL}>
          <li><strong className="text-foreground">Hosting</strong>: <Tbc>HOSTING PROVIDER</Tbc>, which serves the website.</li>
          <li><strong className="text-foreground">Lead and record storage</strong>: Google LLC (Google Sheets, in our Google Workspace account), where access profiles, enquiries and privacy requests are kept. We may move to a customer-relationship system later and will update this policy if we do.</li>
          <li><strong className="text-foreground">Analytics</strong>: Google LLC (Google Analytics), only if you allow analytics in your cookie preferences. Helps us understand how the site is used, in aggregate; not used for advertising.</li>
          <li><strong className="text-foreground">Authorities</strong>, where the law requires it.</li>
        </ul>
        <p>These providers may only use your information to provide their service to us. We do not share it for their own marketing.</p>
      </>
    ),
  },
  {
    id: "storage-security",
    title: "Where it is kept, and how it is protected",
    body: (
      <>
        <p>Information is stored in <Tbc>STORAGE LOCATION AND COUNTRY</Tbc>. We use these measures:</p>
        <ul className={UL}>
          <li>Details are sent over an encrypted connection (HTTPS).</li>
          <li>Your access session is a signed, HttpOnly cookie. Page scripts cannot read it, and it contains no email or phone number.</li>
          <li>Forms are checked on the server as well as in your browser, and are limited to reduce spam and abuse.</li>
          <li>Your email address and phone number are never put in web addresses or kept in your browser&rsquo;s storage.</li>
          <li>Access to stored records is restricted to authorised staff: <Tbc>ACCESS CONTROL AND STAFF ROLES</Tbc>.</li>
        </ul>
        <p>No system is perfectly secure. If a breach affects your personal data, we will tell you and the authorities as the law requires.</p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <>
        <p>
          We keep access profiles and consent records for <Tbc>RETENTION PERIOD</Tbc>, or until you withdraw consent or ask
          for deletion, whichever is earlier, unless the law requires us to keep something longer. Privacy requests are
          kept for <Tbc>RETENTION PERIOD FOR REQUESTS</Tbc> so we can show how they were handled.
        </p>
        <p>Your access session on a device lasts up to 30 days, or until you sign out.</p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>You have the right to:</p>
        <ul className={UL}>
          <li>Ask for a summary of the personal information we process and who we shared it with.</li>
          <li>Ask us to correct information that is wrong, incomplete or out of date.</li>
          <li>Ask us to erase your information, where we are not required to keep it.</li>
          <li>Withdraw consent.</li>
          <li>Have a grievance answered, and nominate another person to exercise these rights for you if you die or cannot act.</li>
        </ul>
        <p>
          Use the <Link href="/privacy-requests" className={A}>Privacy Requests</Link> page. We may ask you to confirm
          who you are before acting, so that we do not give one person&rsquo;s information to another. We will respond within{" "}
          <Tbc>RESPONSE TIME</Tbc>.
        </p>
      </>
    ),
  },
  {
    id: "complaints",
    title: "Complaints",
    body: (
      <>
        <p>
          If you are unhappy with how we handled your information, contact our grievance contact first:{" "}
          <Tbc>GRIEVANCE CONTACT NAME, EMAIL AND ADDRESS</Tbc>. If you are not satisfied with the response, you can
          complain to the Data Protection Board of India once it is operating, as the Act provides.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <>
        <p>
          A person under 18 is a child under the Act. The access form asks whether you are 18 or older. If you are not, we do
          not create an access profile, because we cannot yet verify that a parent or guardian has agreed. We do not send
          promotional messages to, or use information for tracking or targeted advertising about, anyone who tells us they are
          under 18.
        </p>
        <LegalNote>
          Access for visitors under 18 is switched off until <Tbc>VERIFIABLE PARENTAL CONSENT METHOD</Tbc> is put in place, as the
          Rules require for children&rsquo;s data. A parent or guardian can contact us instead, and we can also remove a profile
          on request.
        </LegalNote>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and similar technologies",
    body: (
      <p>
        The website sets one cookie by default, an access session cookie, and only after you create an access profile.
        It also uses your browser&rsquo;s storage for a few settings. If you allow analytics in your cookie
        preferences, Google Analytics (GA4) sets its own cookies too. The{" "}
        <Link href="/cookie-policy" className={A}>Cookie Policy</Link> lists each one and how to manage them. We do not
        use advertising cookies.
      </p>
    ),
  },
  {
    id: "third-parties",
    title: "Third-party services and links",
    body: (
      <p>
        Pages may link to other sites, such as social media profiles, and can show an embedded Google Map if you choose to
        load it. Those services have their own privacy practices, which we do not control. We load the map only after you
        agree to it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We will update this page when our practices change and change the date and version at the top. If a change
        affects how we use information you have already given us, we will ask for your agreement again where the law
        requires it.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Privacy questions: <Tbc>PRIVACY CONTACT EMAIL</Tbc>. General contact:{" "}
        <a href={`mailto:${EMAIL}`} className={A}>{EMAIL}</a>. Office: Office No. 305, Platinum Plaza, opp. Ramayan
        Bungalow, next to Jain Oswal Boarding, Tilak Wadi, Police Staff Colony, Nashik, Maharashtra 422002, India.
      </p>
    ),
  },
];
