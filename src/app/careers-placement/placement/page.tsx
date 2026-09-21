import type { Metadata } from "next";
import { PlacementControl } from "@/components/careers-placement/placement/placement-control";
import { PlacementFinalCta } from "@/components/careers-placement/placement/placement-final-cta";
import { PlacementHero } from "@/components/careers-placement/placement/placement-hero";
import { PlacementInterview } from "@/components/careers-placement/placement/placement-interview";
import { PlacementPortfolio } from "@/components/careers-placement/placement/placement-portfolio";
import { PlacementProcess } from "@/components/careers-placement/placement/placement-process";
import { PlacementRelated } from "@/components/careers-placement/placement/placement-related";

export const metadata: Metadata = {
  title: "Placement Preparation | Techno Gurukul",
  description:
    "Explore how Techno Gurukul helps learners build practical skills, projects, portfolios and professional preparation for career opportunities.",
};

export default function Page() {
  return (
    <main>
      <PlacementHero />
      <PlacementProcess />
      <PlacementControl />
      <PlacementPortfolio />
      <PlacementInterview />
      <PlacementRelated />
      <PlacementFinalCta />
    </main>
  );
}
