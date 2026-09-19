import type { Metadata } from "next";
import { ProgramsHero } from "@/components/programs/programs-hero";
import { ProgramsListing } from "@/components/programs/programs-listing";
import { ProgramsOutcomes } from "@/components/programs/programs-outcomes";
import { ProgramsProcess } from "@/components/programs/programs-process";

export const metadata: Metadata = {
  title: "Programs | TechnoGurukul",
  description:
    "Explore TechnoGurukul's practical learning programs designed to help students build real skills, projects and career-ready experience.",
};

export default function Page() {
  return (
    <main>
      <ProgramsHero />
      <ProgramsListing />
      <ProgramsProcess />
      <ProgramsOutcomes />
    </main>
  );
}
