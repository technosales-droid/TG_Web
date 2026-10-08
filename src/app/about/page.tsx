import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { aboutPageSchema, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { AboutTeach, AboutWho, AboutWhy } from "@/components/about/about-sections";
import { AboutStages } from "@/components/about/about-stages";
import { AboutDirections } from "@/components/about/about-directions";
import { LearningCta } from "@/components/learning/overview/learning-cta";
import { AboutHero } from "@/components/about/about-hero";

export const metadata: Metadata = buildMetadata({
  title: "About Techno Gurukul | Practical Learning in Nashik",
  description:
    "Techno Gurukul is a Nashik-based institute built around practical, project-based learning. Learn our teaching approach, programs and what students build.",
  path: "/about",
});

export default function Page() {
  return (
    <main>
      <JsonLd data={aboutPageSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "About", path: "/about" }])} />
      <AboutHero />
      <AboutWho />
      <AboutStages />
      <AboutTeach />
      <AboutDirections />
      <AboutWhy />
      <LearningCta
        eyebrow="Ready to begin?"
        headline={["Start Your", "Learning Journey."]}
        text="Explore the programs and learning experience available at Techno Gurukul, and choose where to start building."
      />
    </main>
  );
}
