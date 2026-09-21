import type { Metadata } from "next";
import { IndustryClose } from "@/components/careers-placement/industry-connections/industry-close";
import { IndustryContext } from "@/components/careers-placement/industry-connections/industry-context";
import { IndustryExposure } from "@/components/careers-placement/industry-connections/industry-exposure";
import { IndustryFinalCta } from "@/components/careers-placement/industry-connections/industry-final-cta";
import { IndustryHero } from "@/components/careers-placement/industry-connections/industry-hero";
import { IndustryPractice } from "@/components/careers-placement/industry-connections/industry-practice";
import { IndustryProjects } from "@/components/careers-placement/industry-connections/industry-projects";

export const metadata: Metadata = {
  title: "Industry Connections | Techno Gurukul",
  description:
    "Explore industry context, professional expectations and practical ways to connect learning with the world of work at Techno Gurukul.",
};

export default function Page() {
  return (
    <main>
      <IndustryHero />
      <IndustryContext />
      <IndustryExposure />
      <IndustryPractice />
      <IndustryProjects />
      <IndustryClose />
      <IndustryFinalCta />
    </main>
  );
}
