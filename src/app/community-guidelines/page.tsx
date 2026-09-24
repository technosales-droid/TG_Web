import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { DESCRIPTION, HEADING, LAST_UPDATED, GUIDELINE_SECTIONS } from "@/components/legal/community-guidelines-content";

export const metadata: Metadata = {
  title: "Community Guidelines | Techno Gurukul",
  description: "How comments and reviews on Techno Gurukul are kept respectful, useful and safe.",
  alternates: { canonical: "/community-guidelines" },
};

export default function Page() {
  return <LegalLayout heading={HEADING} description={DESCRIPTION} lastUpdated={LAST_UPDATED} sections={GUIDELINE_SECTIONS} />;
}
