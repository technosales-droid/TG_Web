import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AccessProvider } from "@/components/access/access-provider";
import { CookieBanner } from "@/components/access/cookie-banner";
import { CookieSettings } from "@/components/access/cookie-settings";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { CoursePromotionPopup } from "@/components/promotions/course-promotion-popup";
import { FloatingContact } from "@/components/common/floating-contact";
import { JsonLd } from "@/components/seo/json-ld";
import { footerContact, footerLocation, footerSocials } from "@/components/layout/footer-data";
import { SITE_NAME, SITE_URL } from "@/lib/site";
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
    images: [{ url: "/brand/logo.png", alt: "Techno Gurukul" }],
  },
  twitter: { card: "summary", title: "Techno Gurukul", description },
};

export const viewport: Viewport = {
  themeColor: "#0c709a",
};

// Organization and WebSite only: name, address of the site, logo, verified phone and the verified social
// profiles. No ratings, reviews or other unverified claims.
const SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo.png`,
    ...(footerContact.phone ? { telephone: footerContact.phone } : {}),
    sameAs: footerSocials.flatMap((s) => (s.href ? [s.href] : [])),
    ...(footerLocation.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: footerLocation.shortAddress ?? undefined,
            addressLocality: "Nashik",
            addressRegion: "Maharashtra",
            addressCountry: "IN",
          },
        }
      : {}),
  },
  { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col overflow-x-clip bg-background text-foreground font-sans">
        <AccessProvider>
          {SCHEMA.map((d) => (
            <JsonLd key={d["@type"]} data={d} />
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
          <GoogleAnalytics />
        </AccessProvider>
      </body>
    </html>
  );
}
