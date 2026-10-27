import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/hero";
import { AvailableCourses } from "@/components/home/available-courses";
import { LearningApproach } from "@/components/home/learning-approach";
import { OutcomesShowcase } from "@/components/home/outcomes-showcase";
import { ComingSoonPrograms } from "@/components/home/programs-preview";
import { ClosingCta } from "@/components/home/closing-cta";

export const metadata: Metadata = buildMetadata({
  title: "Techno Gurukul | AI, Digital Marketing & Game Development Institute in Nashik",
  description:
    "A Nashik-based institute for practical learning: a Complete Applied AI Program as our signature course, alongside hands-on Digital Marketing and Game Development training, built on real work.",
  path: "/",
});

export default function Page() {
  return (
    <main>
      <Hero />
      <AvailableCourses />
      <LearningApproach />
      <OutcomesShowcase />
      <ComingSoonPrograms />
      <ClosingCta />
    </main>
  );
}
