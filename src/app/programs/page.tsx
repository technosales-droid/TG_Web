import type { Metadata } from "next";
import { CatalogueSection } from "@/components/programs/catalogue/catalogue-section";
import { RoadmapSection } from "@/components/programs/catalogue/roadmap-section";
import { ProgramsHero } from "@/components/programs/programs-hero";
import { ProgramsPhilosophy } from "@/components/programs/programs-philosophy";

export const metadata: Metadata = {
  title: "Programs | TechnoGurukul",
  description:
    "Explore TechnoGurukul's practical learning programs designed to help students build real skills, projects and career-ready experience.",
};

export default function Page() {
  return (
    <main>
      <ProgramsHero />
      <CatalogueSection />
      <RoadmapSection />
      <ProgramsPhilosophy />
    </main>
  );
}
