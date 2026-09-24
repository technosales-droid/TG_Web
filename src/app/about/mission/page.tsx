import type { Metadata } from "next";
import { MissionFinalCta } from "@/components/about/mission/mission-final-cta";
import { MissionFramework } from "@/components/about/mission/mission-framework";
import { MissionHero } from "@/components/about/mission/mission-hero";
import { MissionLearner } from "@/components/about/mission/mission-learner";
import { MissionPractice } from "@/components/about/mission/mission-practice";

export const metadata: Metadata = {
  title: "Our Mission | Techno Gurukul",
  description:
    "Discover Techno Gurukul's mission to make learning practical, useful and connected to what learners can build, show and apply.",
};

export default function Page() {
  return (
    <main>
      <MissionHero />
      <MissionFramework />
      <MissionPractice />
      <MissionLearner />
      <MissionFinalCta />
    </main>
  );
}
