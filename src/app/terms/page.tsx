import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { LegalLayout } from "@/components/legal/legal-layout";
import { DESCRIPTION, HEADING, LAST_UPDATED, TERMS_SECTIONS } from "@/components/legal/terms-content";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use | Techno Gurukul",
  description:
    "The terms that apply when you access and use the Techno Gurukul website, enrol in a program, or use community features such as comments and reviews.",
  path: "/terms",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Terms of Use", path: "/terms" }])} />
      <LegalLayout heading={HEADING} description={DESCRIPTION} lastUpdated={LAST_UPDATED} sections={TERMS_SECTIONS} />
    </>
  );
}
