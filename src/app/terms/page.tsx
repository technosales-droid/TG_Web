import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { DESCRIPTION, HEADING, LAST_UPDATED, TERMS_SECTIONS } from "@/components/legal/terms-content";

export const metadata: Metadata = {
  title: "Terms of Use | Techno Gurukul",
  description: "The rules for using the Techno Gurukul website, its restricted content and its community features.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return <LegalLayout heading={HEADING} description={DESCRIPTION} lastUpdated={LAST_UPDATED} sections={TERMS_SECTIONS} />;
}
