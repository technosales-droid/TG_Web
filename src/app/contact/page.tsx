import type { Metadata } from "next";
import { ContactEnquiry } from "@/components/contact/contact-enquiry";
import { ContactHero } from "@/components/contact/contact-hero";

export const metadata: Metadata = {
  title: "Contact Techno Gurukul | Get in Touch",
  description:
    "Get in touch with Techno Gurukul about programs, admissions and learning options. Send an enquiry or email the team.",
};

export default function Page() {
  return (
    <main>
      <ContactHero />
      <ContactEnquiry />
    </main>
  );
}
