import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { LegalLayout } from "@/components/legal/legal-layout";
import { DESCRIPTION, HEADING, LAST_UPDATED, GUIDELINE_SECTIONS } from "@/components/legal/community-guidelines-content";

export const metadata: Metadata = buildMetadata({
  title: "Community Guidelines | Techno Gurukul",
  description:
    "The guidelines that keep comments, reviews and community interactions on the Techno Gurukul website respectful, useful, honest and safe for everyone.",
  path: "/community-guidelines",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Community Guidelines", path: "/community-guidelines" }])} />
      <LegalLayout heading={HEADING} description={DESCRIPTION} lastUpdated={LAST_UPDATED} sections={GUIDELINE_SECTIONS} />
    </>
  );
}
