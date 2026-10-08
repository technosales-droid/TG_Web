import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { LegalLayout } from "@/components/legal/legal-layout";
import { DESCRIPTION, HEADING, LAST_UPDATED, REFUND_SECTIONS } from "@/components/legal/refund-policy-content";

export const metadata: Metadata = buildMetadata({
  title: "Refund Policy | Techno Gurukul",
  description:
    "Techno Gurukul's refund policy: how refund requests, program cancellations and batch transfers are handled, and how to submit a request to our team.",
  path: "/legal/refund-policy",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Refund Policy", path: "/legal/refund-policy" }])} />
      <LegalLayout heading={HEADING} description={DESCRIPTION} lastUpdated={LAST_UPDATED} sections={REFUND_SECTIONS} />
    </>
  );
}
