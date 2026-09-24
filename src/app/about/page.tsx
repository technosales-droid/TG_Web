import type { Metadata } from "next";
import { AboutEnvironment, AboutTeach, AboutWho, AboutWhy } from "@/components/about/about-sections";
import { AboutStages } from "@/components/about/about-stages";
import { AboutDirections } from "@/components/about/about-directions";
import { LearningCta } from "@/components/learning/overview/learning-cta";
import { AboutHero } from "@/components/about/about-hero";

export const metadata: Metadata = {
  title: "About Techno Gurukul | Practical Learning & Career Readiness",
  description:
    "Learn more about Techno Gurukul's practical learning approach, educational philosophy, programs and learner experience.",
};

export default function Page() {
  return (
    <main>
      <AboutHero />
      <AboutWho />
      <AboutStages />
      <AboutTeach />
      <AboutDirections />
      <AboutWhy />
      <AboutEnvironment />
      <LearningCta
        eyebrow="Ready to begin?"
        headline={["Start Your", "Learning Journey."]}
        text="Explore the programs and learning experience available at Techno Gurukul, and choose where to start building."
      />
    </main>
  );
}
