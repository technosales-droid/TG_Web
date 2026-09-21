import type { Metadata } from "next";
import { CertificationsHero } from "@/components/learning/certifications/certifications-hero";
import { CertificationsRecord } from "@/components/learning/certifications/certifications-record";

export const metadata: Metadata = {
  title: "Certifications at Techno Gurukul: Learning You Can Document | TechnoGurukul",
  description:
    "See how completion and recognition fit into the Techno Gurukul learning experience, alongside the structured learning and practical work they reflect.",
};

export default function Page() {
  return (
    <main>
      <CertificationsHero />
      <CertificationsRecord />
    </main>
  );
}
