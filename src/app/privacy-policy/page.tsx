import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { LegalLayout } from "@/components/legal/legal-layout";
import { DESCRIPTION, HEADING, LAST_UPDATED, PRIVACY_SECTIONS } from "@/components/legal/privacy-policy-content";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Techno Gurukul",
  description:
    "How Techno Gurukul collects, stores and protects your personal information when you visit this website or enrol in a program, and the rights you have over it.",
  path: "/privacy-policy",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Privacy Policy", path: "/privacy-policy" }])} />
      <LegalLayout heading={HEADING} description={DESCRIPTION} lastUpdated={LAST_UPDATED} sections={PRIVACY_SECTIONS} />
    </>
  );
}
