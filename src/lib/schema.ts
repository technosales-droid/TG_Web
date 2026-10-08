// Shared JSON-LD builders. Centralised so every page assembles schema.org data the same way, with stable @ids
// that let Organization/WebSite be referenced instead of re-declared on every page (per Phase 2 of the SEO plan).
import { BUSINESS, ORG_ID, WEBSITE_ID } from "@/data/business-facts";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/** The sitewide Organization + LocalBusiness entity. One instance, rendered once in the root layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": ORG_ID,
    name: BUSINESS.name,
    alternateName: BUSINESS.alternateName,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/logo.png` },
    image: `${SITE_URL}/brand/logo.png`,
    description:
      "Techno Gurukul is a Nashik-based institute for practical, hands-on learning, offering a Digital Marketing course and a Game Development course, both taught offline.",
    telephone: BUSINESS.telephone,
    address: { "@type": "PostalAddress", ...BUSINESS.address },
    hasMap: BUSINESS.hasMap,
    areaServed: { "@type": "City", name: BUSINESS.areaServed },
    sameAs: BUSINESS.sameAs,
    ...(BUSINESS.email ? { email: BUSINESS.email } : {}),
    ...(BUSINESS.geo ? { geo: { "@type": "GeoCoordinates", ...BUSINESS.geo } } : {}),
    ...(BUSINESS.openingHoursSpecification
      ? {
          openingHoursSpecification: BUSINESS.openingHoursSpecification.map((s) => ({
            "@type": "OpeningHoursSpecification",
            ...s,
          })),
        }
      : {}),
    ...(BUSINESS.foundingDate ? { foundingDate: BUSINESS.foundingDate } : {}),
    ...(BUSINESS.founder ? { founder: { "@type": "Person", ...BUSINESS.founder } } : {}),
  };
}

/** The sitewide WebSite entity, publisher pointing back at the Organization. One instance, root layout. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
  };
}

/** A BreadcrumbList for any non-home page. `items` excludes Home, which this always prepends. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  const trail = [{ name: "Home", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

/** AboutPage, referencing the Organization as its subject. */
export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/about/#webpage`,
    url: `${SITE_URL}/about`,
    name: "About Techno Gurukul",
    about: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}

/** ContactPage with a ContactPoint. availableLanguage is left off -- not yet confirmed which languages admissions
 * actually supports, and this should be a real fact, not an assumption from the UI's own interface language. */
export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_URL}/contact/#webpage`,
    url: `${SITE_URL}/contact`,
    name: "Contact Techno Gurukul",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@id": ORG_ID,
      "@type": ["EducationalOrganization", "LocalBusiness"],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: BUSINESS.telephone,
        contactType: "admissions",
        areaServed: "IN",
        ...(BUSINESS.email ? { email: BUSINESS.email } : {}),
      },
    },
  };
}

/** FAQPage for a visible, on-page FAQ. `items` must match what's actually rendered -- schema must never say more
 * than the page shows. Wired in Phase 2, used starting Phase 3. */
export function faqSchema(items: { question: string; answer: string }[]) {
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
