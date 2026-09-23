import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { DESCRIPTION, DISCLAIMER_SECTIONS, HEADING, LAST_UPDATED } from "@/components/legal/disclaimer-content";

export const metadata: Metadata = {
  title: "Disclaimer | Techno Gurukul",
  description: "Important information about Techno Gurukul educational content, career outcomes, third-party resources and website use.",
};

export default function Page() {
  return (
    <LegalLayout heading={HEADING} description={DESCRIPTION} lastUpdated={LAST_UPDATED} sections={DISCLAIMER_SECTIONS} />
  );
}
