import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AccessProvider } from "@/components/access/access-provider";
import { CookieBanner } from "@/components/access/cookie-banner";
import { CookieSettings } from "@/components/access/cookie-settings";
import { GoogleTagManager } from "@/components/analytics/google-tag-manager";
import { MetaPixel } from "@/components/analytics/meta-pixel";
import { CoursePromotionPopup } from "@/components/promotions/course-promotion-popup";
import { FloatingContact } from "@/components/common/floating-contact";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { GTM_ID, META_PIXEL_ID } from "@/lib/tracker-scripts";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const description =
  "Techno Gurukul is built around practical learning, helping students develop creative, technical and digital skills through hands-on education, real projects and industry-relevant tools.";

// ponytail: canonical URL and og:url need the production domain via
// metadataBase; add once it's known rather than guessing one here.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "./" },
  title: "Techno Gurukul | Learn. Create. Build What's Next.",
  description,
  openGraph: {
    title: "Techno Gurukul",
    description,
    siteName: "Techno Gurukul",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/brand/link-preview.jpg", width: 1200, height: 630, alt: "Techno Gurukul" }],
  },
  twitter: { card: "summary_large_image", title: "Techno Gurukul", description, images: ["/brand/link-preview.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#0c709a",
};

// Organization (typed as EducationalOrganization + LocalBusiness) and WebSite, both with stable @ids so other
// pages can reference them instead of re-declaring the entity. No ratings, reviews or other unverified claims --
// see src/data/business-facts.ts for what's confirmed vs. still unknown.
const SCHEMA = [organizationSchema(), websiteSchema()];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col overflow-x-clip bg-background text-foreground font-sans">
        {/* GTM noscript fallback: required by Google as high in <body> as possible, for visitors with JS
            disabled -- for whom the cookie-consent gate below (itself React) could never have run anyway. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Meta Pixel noscript fallback, for the same reason and in the same place as GTM's above. */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element -- a plain beacon pixel, not a real image Next should optimize */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {/* Mounted before {children} below so window.fbq/window.dataLayer are already defined by the time any
            page content's own effects run (e.g. ViewContentTracker on a program page) -- React commits effects
            top-to-bottom through the tree on mount, and these two used to be the LAST children here, after
            {children}, which meant a page-level tracker could run before either of these had loaded anything. */}
        <GoogleTagManager />
        <MetaPixel />
        <AccessProvider>
          {SCHEMA.map((d, i) => (
            <JsonLd key={i} data={d} />
          ))}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <SiteHeader />
          <div id="main-content" tabIndex={-1} className="flex flex-1 flex-col outline-none">
            {children}
          </div>
          <SiteFooter />
          <CoursePromotionPopup />
          <FloatingContact />
          <CookieSettings />
          <CookieBanner />
        </AccessProvider>
      </body>
    </html>
  );
}
