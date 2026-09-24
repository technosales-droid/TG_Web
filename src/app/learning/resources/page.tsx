import { LearningCta } from "@/components/learning/overview/learning-cta";
import { ResourcesHero } from "@/components/learning/resources/resources-hero";
import { ResourcesLibrary } from "@/components/learning/resources/resources-library";

export default function Page() {
  return (
    <main>
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
