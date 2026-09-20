import type { Metadata } from "next";
import { HowWeTeachSection } from "@/components/learning/how-we-teach-section";
import { LearningHero } from "@/components/learning/learning-hero";

export const metadata: Metadata = {
  title: "How Techno Gurukul Teaches Practical Skills | TechnoGurukul",
  description:
    "Discover how Techno Gurukul combines practical learning, hands-on work, projects and portfolio development to help students build skills they can use.",
};

export default function Page() {
  return (
    <main>
      <LearningHero />
      <HowWeTeachSection />
    </main>
  );
}
