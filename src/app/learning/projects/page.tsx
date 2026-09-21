import type { Metadata } from "next";
import { ProjectsHero } from "@/components/learning/projects/projects-hero";

export const metadata: Metadata = {
  title: "Projects at Techno Gurukul: Build Work You Can Show | TechnoGurukul",
  description:
    "See how Techno Gurukul turns learning into practical projects that students build, test, refine, document and present.",
};

export default function Page() {
  return (
    <main>
      <ProjectsHero />
    </main>
  );
}
