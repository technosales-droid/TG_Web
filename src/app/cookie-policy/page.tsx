import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { DESCRIPTION, HEADING, LAST_UPDATED, COOKIE_SECTIONS } from "@/components/legal/cookie-policy-content";

export const metadata: Metadata = {
  title: "Cookie Policy | Techno Gurukul",
  description: "The cookies and browser storage the Techno Gurukul website uses, and how to manage them.",
  alternates: { canonical: "/cookie-policy" },
};

export default function Page() {
  return <LegalLayout heading={HEADING} description={DESCRIPTION} lastUpdated={LAST_UPDATED} sections={COOKIE_SECTIONS} />;
}
