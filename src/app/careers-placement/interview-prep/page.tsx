import type { Metadata } from "next";
import { InterviewConnect } from "@/components/careers-placement/interview-prep/interview-connect";
import { InterviewConversation } from "@/components/careers-placement/interview-prep/interview-conversation";
import { InterviewFinalCta } from "@/components/careers-placement/interview-prep/interview-final-cta";
import { InterviewHero } from "@/components/careers-placement/interview-prep/interview-hero";
import { InterviewPractice } from "@/components/careers-placement/interview-prep/interview-practice";
import { InterviewQuestions } from "@/components/careers-placement/interview-prep/interview-questions";
import { InterviewRelated } from "@/components/careers-placement/interview-prep/interview-related";

export const metadata: Metadata = {
  title: "Interview Preparation | Techno Gurukul",
  description:
    "Prepare to explain your skills, projects, decisions and learning clearly with practical interview preparation from Techno Gurukul.",
};

export default function Page() {
  return (
    <main>
      <InterviewHero />
      <InterviewConversation />
      <InterviewQuestions />
      <InterviewPractice />
      <InterviewConnect />
      <InterviewRelated />
      <InterviewFinalCta />
    </main>
  );
}
