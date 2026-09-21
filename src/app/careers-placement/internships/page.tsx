import type { Metadata } from "next";
import { InternshipsAfter } from "@/components/careers-placement/internships/internships-after";
import { InternshipsFinalCta } from "@/components/careers-placement/internships/internships-final-cta";
import { InternshipsHero } from "@/components/careers-placement/internships/internships-hero";
import { InternshipsPrepare } from "@/components/careers-placement/internships/internships-prepare";
import { InternshipsProjects } from "@/components/careers-placement/internships/internships-projects";
import { InternshipsRelated } from "@/components/careers-placement/internships/internships-related";
import { InternshipsValue } from "@/components/careers-placement/internships/internships-value";

export const metadata: Metadata = {
  title: "Internships | Techno Gurukul",
  description:
    "Explore how internships can connect learning with practical experience, professional habits and career readiness at Techno Gurukul.",
};

export default function Page() {
  return (
    <main>
      <InternshipsHero />
      <InternshipsValue />
      <InternshipsPrepare />
      <InternshipsProjects />
      <InternshipsAfter />
      <InternshipsRelated />
      <InternshipsFinalCta />
    </main>
  );
}
