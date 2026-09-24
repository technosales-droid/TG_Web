import type { Metadata } from "next";
import { ProjectsHero } from "@/components/learning/projects/projects-hero";
import { ProjectsShowcase } from "@/components/learning/projects/projects-showcase";
import { LearningCta } from "@/components/learning/overview/learning-cta";

export const metadata: Metadata = {
  title: "Projects at Techno Gurukul: Build Work You Can Show | TechnoGurukul",
  description:
    "See how Techno Gurukul turns learning into practical projects that students build, test, refine, document and present.",
};

export default function Page() {
  return (
    <main>
      <ProjectsHero />
      <ProjectsShowcase />
      <LearningCta
        eyebrow="Ready to build?"
        headline={["Start a Project.", "Build Work You Can Show."]}
        text="Choose a Techno Gurukul program and turn what you learn into practical projects you can refine, document and present."
      />
    </main>
  );
}
