import type { Metadata } from "next";
import { ApproachClose } from "@/components/about/approach/approach-close";
import { ApproachDirections } from "@/components/about/approach/approach-directions";
import { ApproachDoing } from "@/components/about/approach/approach-doing";
import { ApproachEvidence } from "@/components/about/approach/approach-evidence";
import { ApproachFeedback } from "@/components/about/approach/approach-feedback";
import { ApproachFinalCta } from "@/components/about/approach/approach-final-cta";
import { ApproachHero } from "@/components/about/approach/approach-hero";
import { ApproachIndependence } from "@/components/about/approach/approach-independence";
import { ApproachModel } from "@/components/about/approach/approach-model";
import { ApproachProgression } from "@/components/about/approach/approach-progression";
import { ApproachProjects } from "@/components/about/approach/approach-projects";
import { ApproachRoles } from "@/components/about/approach/approach-roles";

export const metadata: Metadata = {
  title: "Our Approach | Techno Gurukul",
  description:
    "Explore how Techno Gurukul combines structured learning, guided practice, projects, feedback and growing independence.",
};

export default function Page() {
  return (
    <main>
      <ApproachHero />
      <ApproachModel />
      <ApproachRoles />
      <ApproachIndependence />
      <ApproachProjects />
      <ApproachFeedback />
      <ApproachDoing />
      <ApproachDirections />
      <ApproachEvidence />
      <ApproachProgression />
      <ApproachClose />
      <ApproachFinalCta />
    </main>
  );
}
