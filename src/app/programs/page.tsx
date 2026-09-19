import type { Metadata } from "next";
import { ProgramsHero } from "@/components/programs/programs-hero";
import { ProgramsListing } from "@/components/programs/programs-listing";

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
    </main>
  );
}
