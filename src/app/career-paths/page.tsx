import type { Metadata } from "next";
import { CareerDirectionExplorer } from "@/components/career-paths/career-direction-explorer";
import { CareerPathsHero } from "@/components/career-paths/career-paths-hero";

export const metadata: Metadata = {
  title: "Digital Marketing & Game Development Career Paths | TechnoGurukul",
  description:
    "Explore career directions across digital marketing and game development. Build practical skills, projects and portfolio evidence with TechnoGurukul.",
};

export default function Page() {
  return (
    <main>
      <CareerPathsHero />
      <CareerDirectionExplorer />
    </main>
  );
}
