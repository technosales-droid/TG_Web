import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/hero";
import { AvailableCourses } from "@/components/home/available-courses";
import { LearningApproach } from "@/components/home/learning-approach";
import { OutcomesShowcase } from "@/components/home/outcomes-showcase";
import { ComingSoonPrograms } from "@/components/home/programs-preview";
import { ClosingCta } from "@/components/home/closing-cta";

export const metadata: Metadata = buildMetadata({
  title: "Techno Gurukul | Digital Marketing Institute in Nashik",
  description:
    "A Nashik-based institute for practical learning: Digital Marketing as our signature course, alongside hands-on Game Development training, built on real work.",
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
