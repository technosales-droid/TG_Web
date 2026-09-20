import type { Metadata } from "next";
import { FeedbackLoop } from "@/components/learning/how-we-teach/feedback-loop";
import { GuidedToIndependent } from "@/components/learning/how-we-teach/guided-to-independent";
import { InstructorRole } from "@/components/learning/how-we-teach/instructor-role";
import { LearningExperience } from "@/components/learning/how-we-teach/learning-experience";
import { ProgramApplication } from "@/components/learning/how-we-teach/program-application";
import { ProjectLearning } from "@/components/learning/how-we-teach/project-learning";
import { TeachingFinalCta } from "@/components/learning/how-we-teach/teaching-final-cta";
import { TeachingHero } from "@/components/learning/how-we-teach/teaching-hero";
import { TeachingModel } from "@/components/learning/how-we-teach/teaching-model";
import { TeachingPrinciple } from "@/components/learning/how-we-teach/teaching-principle";

export const metadata: Metadata = {
  title: "How Techno Gurukul Teaches Practical Skills | TechnoGurukul",
  description:
    "Learn how Techno Gurukul combines guided instruction, practical practice, projects, feedback and refinement to build useful, real-world skills.",
};

export default function Page() {
  return (
    <main>
      <TeachingHero />
      <TeachingModel />
      <GuidedToIndependent />
      <FeedbackLoop />
      <ProjectLearning />
      <InstructorRole />
      <LearningExperience />
      <ProgramApplication />
      <TeachingPrinciple />
      <TeachingFinalCta />
    </main>
  );
}
