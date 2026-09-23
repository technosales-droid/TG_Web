import type { Metadata } from "next";
import { ProgramsDiscoverySection } from "@/components/programs/discovery/programs-discovery-section";
import { ProgramsFinalCta } from "@/components/programs/programs-final-cta";
import { ProgramsHero } from "@/components/programs/programs-hero";

export const metadata: Metadata = {
  title: "Programs | TechnoGurukul",
  description:
    "Explore TechnoGurukul's practical learning programs designed to help students build real skills, projects and career-ready experience.",
};

export default function Page() {
  return (
    <main>
      <ProgramsHero />
      <ProgramsDiscoverySection />
      <ProgramsFinalCta />
    </main>
  );
}
