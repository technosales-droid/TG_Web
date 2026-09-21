import type { Metadata } from "next";
import { CareerJourney } from "@/components/careers-placement/career-journey";
import { CareerReadiness } from "@/components/careers-placement/career-readiness";
import { CareerStrongStart } from "@/components/careers-placement/career-strong-start";
import { CareerSupportHub } from "@/components/careers-placement/career-support-hub";
import { CareersFinalCta } from "@/components/careers-placement/careers-final-cta";
import { CareersHero } from "@/components/careers-placement/careers-hero";

export const metadata: Metadata = {
  title: "Careers & Placement | Techno Gurukul",
  description:
    "Explore career preparation, internships, portfolio building, interview preparation and industry-focused learning at Techno Gurukul.",
};

export default function Page() {
  return (
    <main>
      <CareersHero />
      <CareerReadiness />
      <CareerJourney />
      <CareerSupportHub />
      <CareerStrongStart />
      <CareersFinalCta />
    </main>
  );
}
