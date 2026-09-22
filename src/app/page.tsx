import { Hero } from "@/components/home/hero";
import { LearningApproach } from "@/components/home/learning-approach";
import { OutcomesShowcase } from "@/components/home/outcomes-showcase";
import { ProgramsPreview } from "@/components/home/programs-preview";
import { ClosingCta } from "@/components/home/closing-cta";

export default function Page() {
  return (
    <main>
      <Hero />
      <LearningApproach />
      <OutcomesShowcase />
      <ProgramsPreview />
      <ClosingCta />
    </main>
  );
}
