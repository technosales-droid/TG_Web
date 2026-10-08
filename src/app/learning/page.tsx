import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { LearningCta } from "@/components/learning/overview/learning-cta";
import { LearningHero } from "@/components/learning/overview/learning-hero";
import { LearningMethod } from "@/components/learning/overview/learning-method";
import { LearningProcess } from "@/components/learning/overview/learning-process";

export const metadata: Metadata = buildMetadata({
  title: "How We Learn | Techno Gurukul",
  description:
    "How Techno Gurukul approaches practical learning in Nashik: understanding concepts, hands-on practice, real projects and continuous improvement.",
  path: "/learning",
});

export default function Page() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema([{ name: "Learning", path: "/learning" }])} />
      <LearningHero />
      <LearningProcess />
      <LearningMethod />
      <LearningCta />
    </main>
  );
}
