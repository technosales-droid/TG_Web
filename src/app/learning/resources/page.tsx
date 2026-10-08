import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { LearningCta } from "@/components/learning/overview/learning-cta";
import { ResourcesHero } from "@/components/learning/resources/resources-hero";
import { ResourcesLibrary } from "@/components/learning/resources/resources-library";

export const metadata: Metadata = buildMetadata({
  title: "Learning Resources | Techno Gurukul",
  description:
    "Free guides, references, templates and practice material supporting practical Digital Marketing and Game Development learning at Techno Gurukul in Nashik.",
  path: "/learning/resources",
});

export default function Page() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema([{ name: "Learning", path: "/learning" }, { name: "Resources", path: "/learning/resources" }])} />
      <ResourcesHero />
      <ResourcesLibrary />
      <LearningCta
        eyebrow="Keep learning"
        headline={["Find the Right Resource.", "Keep Building."]}
        text="Use guides, templates and reference material alongside a Techno Gurukul program to keep practising and improving."
      />
    </main>
  );
}
