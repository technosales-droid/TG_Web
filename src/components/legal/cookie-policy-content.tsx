import Link from "next/link";
import { CookieSettingsButton } from "@/components/access/cookie-settings";
import { LegalNote, type LegalSectionData } from "./legal-layout";

export const HEADING = "Cookie Policy";
export const DESCRIPTION = "The cookies and browser storage this website uses, why, and how you can manage them.";
export const LAST_UPDATED = "24 September 2026";

const A = "font-medium text-primary underline-offset-2 hover:underline";
const UL = "list-disc space-y-2 pl-5";

interface Row {
  name: string;
  kind: string;
  purpose: string;
  duration: string;
}

// Kept in step with the code. If you add a cookie or storage key, add it here.
const ITEMS: Row[] = [
  { name: "__Host-tg_access (cookie)", kind: "Necessary", purpose: "Keeps your access profile signed in after you register. HttpOnly, so page scripts cannot read it. Set only after you complete the access form.", duration: "Up to 30 days, or until you sign out" },
  { name: "tg-cookie-preferences (local storage)", kind: "Necessary", purpose: "Remembers your choice about third-party embeds.", duration: "Until you clear your browser data" },
  { name: "tg-blog-feedback (local storage)", kind: "Functional", purpose: "Keeps the comments and reviews you write on this device. Other visitors cannot see them.", duration: "Until you clear your browser data" },
  { name: "tg-course-promo (session storage)", kind: "Functional", purpose: "Remembers which program suggestions you have already seen, so they are not repeated.", duration: "Until you close the tab" },
];

export const COOKIE_SECTIONS: LegalSectionData[] = [
  {
    id: "what-they-are",
    title: "What this covers",
    body: (
      <>
        <p>
          Cookies are small files a website saves in your browser. Browser storage (local and session storage) does a
          similar job. This page lists everything this website saves in your browser and everything it loads from other
          companies.
        </p>
        <LegalNote>
          This list describes what the website actually does today. It contains no analytics and no advertising or
          marketing tracking. If that changes, this page and the preference settings will be updated before it does.
        </LegalNote>
      </>
    ),
  },
  {
    id: "what-we-use",
    title: "What we use",
    body: (
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-muted/70 text-foreground">
              <th scope="col" className="px-4 py-3 font-semibold">Name</th>
              <th scope="col" className="px-4 py-3 font-semibold">Type</th>
              <th scope="col" className="px-4 py-3 font-semibold">What it does</th>
              <th scope="col" className="px-4 py-3 font-semibold">How long</th>
            </tr>
          </thead>
          <tbody>
            {ITEMS.map((r) => (
              <tr key={r.name} className="border-t border-border align-top">
                <td className="px-4 py-3 font-medium text-foreground">{r.name}</td>
                <td className="px-4 py-3">{r.kind}</td>
                <td className="px-4 py-3 leading-relaxed">{r.purpose}</td>
                <td className="px-4 py-3">{r.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "categories",
    title: "Categories",
    body: (
      <ul className={UL}>
        <li><strong className="text-foreground">Necessary:</strong> needed for something you asked for, such as staying signed in to your access profile. These cannot be switched off here.</li>
        <li><strong className="text-foreground">Functional:</strong> remember your own content and settings on this device. They do not track you across sites.</li>
        <li><strong className="text-foreground">Analytics:</strong> not used.</li>
        <li><strong className="text-foreground">Marketing:</strong> not used.</li>
      </ul>
    ),
  },
  {
    id: "third-party",
    title: "Third-party content",
    body: (
      <p>
        The footer can show an embedded Google Map. It is not loaded until you choose to load it, either with the Load map
        button or by allowing embeds in your cookie preferences. When it loads, Google may set its own cookies and receives
        your IP address. See Google&rsquo;s privacy policy for details. Links to social media and other sites open those
        sites, which have their own policies.
      </p>
    ),
  },
  {
    id: "manage",
    title: "Managing your preferences",
    body: (
      <>
        <p>You can change your choice about third-party embeds at any time:</p>
        <p>
          <CookieSettingsButton className="h-11 rounded-full bg-primary px-6 text-[15px] font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            Open cookie preferences
          </CookieSettingsButton>
        </p>
        <p>
          You can also delete cookies and site data in your browser settings, or sign out of your access profile from any
          comment or review box. Clearing site data removes your access session and any comments saved on this device.
        </p>
      </>
    ),
  },
  {
    id: "more",
    title: "More information",
    body: (
      <p>
        How personal information is used is explained in the <Link href="/privacy-policy" className={A}>Privacy Policy</Link>.
        Questions about this page can be sent through <Link href="/privacy-requests" className={A}>Privacy Requests</Link>.
      </p>
    ),
  },
];
