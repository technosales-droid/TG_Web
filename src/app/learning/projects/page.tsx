import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { ProjectsHero } from "@/components/learning/projects/projects-hero";
import { ProjectsShowcase } from "@/components/learning/projects/projects-showcase";
import { LearningCta } from "@/components/learning/overview/learning-cta";

export const metadata: Metadata = buildMetadata({
  title: "Student Projects | Techno Gurukul",
  description:
    "See how Techno Gurukul turns classroom learning into practical, presentable projects that students build, test, refine, document and show in interviews.",
  path: "/learning/projects",
});

export default function Page() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema([{ name: "Learning", path: "/learning" }, { name: "Projects", path: "/learning/projects" }])} />
      <ProjectsHero />
      <ProjectsShowcase />
      <LearningCta
        eyebrow="Ready to build?"
        headline={["Start a Project.", "Build Work You Can Show."]}
        text="Choose a Techno Gurukul program and turn what you learn into practical projects you can refine, document and present."
      />
    </main>
  );
}
