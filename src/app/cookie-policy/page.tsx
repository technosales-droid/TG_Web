import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { LegalLayout } from "@/components/legal/legal-layout";
import { DESCRIPTION, HEADING, LAST_UPDATED, COOKIE_SECTIONS } from "@/components/legal/cookie-policy-content";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy | Techno Gurukul",
  description:
    "The cookies and browser storage this website uses, including analytics, and how to manage or withdraw your preferences at any time from cookie settings.",
  path: "/cookie-policy",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Cookie Policy", path: "/cookie-policy" }])} />
      <LegalLayout heading={HEADING} description={DESCRIPTION} lastUpdated={LAST_UPDATED} sections={COOKIE_SECTIONS} />
    </>
  );
}
