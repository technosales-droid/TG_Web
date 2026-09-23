import type { Metadata } from "next";
import { LearningCta } from "@/components/learning/overview/learning-cta";
import { LearningHero } from "@/components/learning/overview/learning-hero";
import { LearningMethod } from "@/components/learning/overview/learning-method";
import { LearningOutcomes } from "@/components/learning/overview/learning-outcomes";
import { LearningProcess } from "@/components/learning/overview/learning-process";
import { LearningProjects } from "@/components/learning/overview/learning-projects";
import { LearningSystem } from "@/components/learning/overview/learning-system";

export const metadata: Metadata = {
  title: "How We Learn | Techno Gurukul",
  description:
    "Explore how Techno Gurukul approaches practical learning through understanding, practice, projects and continuous improvement.",
};

export default function Page() {
  return (
    <main>
      <LearningHero />
      <LearningProcess />
      <LearningMethod />
      <LearningProjects />
      <LearningOutcomes />
      <LearningSystem />
      <LearningCta />
    </main>
  );
}
