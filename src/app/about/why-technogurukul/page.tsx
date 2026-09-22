import type { Metadata } from "next";
import { WhyDirections } from "@/components/about/why/why-directions";
import { WhyEvidence } from "@/components/about/why/why-evidence";
import { WhyFinalCta } from "@/components/about/why/why-final-cta";
import { WhyHero } from "@/components/about/why/why-hero";
import { WhyLearner } from "@/components/about/why/why-learner";
import { WhyPractice } from "@/components/about/why/why-practice";
import { WhyProjects } from "@/components/about/why/why-projects";
import { WhyReasoning } from "@/components/about/why/why-reasoning";
import { WhyRelated } from "@/components/about/why/why-related";
import { WhySystem } from "@/components/about/why/why-system";

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
      <WhyDirections />
      <WhySystem />
      <WhyLearner />
      <WhyRelated />
      <WhyFinalCta />
    </main>
  );
}
