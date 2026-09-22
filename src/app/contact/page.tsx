import type { Metadata } from "next";
import { ContactDirections } from "@/components/contact/contact-directions";
import { ContactEnquiry } from "@/components/contact/contact-enquiry";
import { ContactFaq } from "@/components/contact/contact-faq";
import { ContactFinalCta } from "@/components/contact/contact-final-cta";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactLocation } from "@/components/contact/contact-location";

export const metadata: Metadata = {
  title: "Enquire Now | Techno Gurukul",
  description: "Contact Techno Gurukul to ask about programs, learning, admissions, career paths and getting started.",
};

export default function Page() {
  return (
    <main>
      <ContactHero />
      <ContactEnquiry />
      <ContactLocation />
      <ContactDirections />
      <ContactFaq />
      <ContactFinalCta />
    </main>
  );
}
