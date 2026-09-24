import type { Metadata } from "next";
import { WhyEvidence } from "@/components/about/why/why-evidence";
import { WhyFinalCta } from "@/components/about/why/why-final-cta";
import { WhyHero } from "@/components/about/why/why-hero";
import { WhyPractice } from "@/components/about/why/why-practice";
import { WhyProjects } from "@/components/about/why/why-projects";
import { WhyReasoning } from "@/components/about/why/why-reasoning";

export const metadata: Metadata = {
  title: "Why Techno Gurukul | Our Practical Learning Approach",
  description:
    "Understand why Techno Gurukul focuses on practical learning, projects, feedback, visible work and career context.",
};

export default function Page() {
  return (
    <main>
      <WhyHero />
      <WhyReasoning />
      <WhyProjects />
      <WhyPractice />
      <WhyEvidence />
      <WhyFinalCta />
    </main>
  );
}
