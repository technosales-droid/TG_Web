import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, contactPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { ContactEnquiry } from "@/components/contact/contact-enquiry";
import { ContactHero } from "@/components/contact/contact-hero";

export const metadata: Metadata = buildMetadata({
  title: "Contact Techno Gurukul | Nashik, Maharashtra",
  description:
    "Get in touch with Techno Gurukul in Nashik about our Digital Marketing and Game Development courses, admissions or questions. Call, WhatsApp or enquire.",
  path: "/contact",
});

export default function Page() {
  return (
    <main>
      <JsonLd data={contactPageSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "Contact", path: "/contact" }])} />
      <ContactHero />
      <ContactEnquiry />
    </main>
  );
}
