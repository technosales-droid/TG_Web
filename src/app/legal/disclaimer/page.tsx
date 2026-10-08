import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { LegalLayout } from "@/components/legal/legal-layout";
import { DESCRIPTION, DISCLAIMER_SECTIONS, HEADING, LAST_UPDATED } from "@/components/legal/disclaimer-content";

export const metadata: Metadata = buildMetadata({
  title: "Disclaimer | Techno Gurukul",
  description:
    "Important information about Techno Gurukul's educational content, career outcomes, certifications, third-party tools and the use of this website.",
  path: "/legal/disclaimer",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Disclaimer", path: "/legal/disclaimer" }])} />
      <LegalLayout heading={HEADING} description={DESCRIPTION} lastUpdated={LAST_UPDATED} sections={DISCLAIMER_SECTIONS} />
    </>
  );
}
