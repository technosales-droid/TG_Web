import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { DESCRIPTION, HEADING, LAST_UPDATED, TERMS_SECTIONS } from "@/components/legal/terms-content";

export const metadata: Metadata = {
  title: "Terms & Conditions | Techno Gurukul",
  description: "Read the Terms & Conditions governing use of the Techno Gurukul website, programs and services.",
};

export default function Page() {
  return (
    <LegalLayout heading={HEADING} description={DESCRIPTION} lastUpdated={LAST_UPDATED} sections={TERMS_SECTIONS} />
  );
}
