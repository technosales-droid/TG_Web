import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { DESCRIPTION, HEADING, LAST_UPDATED, REFUND_SECTIONS } from "@/components/legal/refund-policy-content";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Techno Gurukul",
  description: "Review Techno Gurukul's refund, cancellation, transfer and program cancellation terms.",
};

export default function Page() {
  return (
    <LegalLayout heading={HEADING} description={DESCRIPTION} lastUpdated={LAST_UPDATED} sections={REFUND_SECTIONS} />
  );
}
