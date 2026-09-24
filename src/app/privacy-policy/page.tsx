import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { DESCRIPTION, HEADING, LAST_UPDATED, PRIVACY_SECTIONS } from "@/components/legal/privacy-policy-content";

export const metadata: Metadata = {
  title: "Privacy Policy | Techno Gurukul",
  description: "Read how Techno Gurukul collects, uses and protects personal information, and how to exercise your rights.",
  alternates: { canonical: "/privacy-policy" },
};

export default function Page() {
  return <LegalLayout heading={HEADING} description={DESCRIPTION} lastUpdated={LAST_UPDATED} sections={PRIVACY_SECTIONS} />;
}
