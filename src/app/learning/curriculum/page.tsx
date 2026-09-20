import type { Metadata } from "next";
import { CurriculumAreas } from "@/components/learning/curriculum/curriculum-areas";
import { CurriculumContents } from "@/components/learning/curriculum/curriculum-contents";
import { CurriculumFinalCta } from "@/components/learning/curriculum/curriculum-final-cta";
import { CurriculumHero } from "@/components/learning/curriculum/curriculum-hero";
import { CurriculumPrinciple } from "@/components/learning/curriculum/curriculum-principle";
import { CurriculumPrograms } from "@/components/learning/curriculum/curriculum-programs";
import { CurriculumProgression } from "@/components/learning/curriculum/curriculum-progression";
import { CurriculumStructure } from "@/components/learning/curriculum/curriculum-structure";

export const metadata: Metadata = {
  title: "Techno Gurukul Curriculum: Structured, Practical Learning | TechnoGurukul",
  description:
    "See how Techno Gurukul organises its curriculum into fundamentals, guided practice, projects and portfolio work, so students build practical skills step by step.",
};

export default function Page() {
  return (
    <main>
      <CurriculumHero />
      <CurriculumStructure />
      <CurriculumAreas />
      <CurriculumContents />
      <CurriculumProgression />
      <CurriculumPrograms />
      <CurriculumPrinciple />
      <CurriculumFinalCta />
    </main>
  );
}
