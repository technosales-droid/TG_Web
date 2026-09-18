import { Hero } from "@/components/home/hero";
import { LearningApproach } from "@/components/home/learning-approach";
import { OutcomesShowcase } from "@/components/home/outcomes-showcase";
import { ProgramsPreview } from "@/components/home/programs-preview";
import { CareerDirections } from "@/components/home/career-directions";
import { ClosingCta } from "@/components/home/closing-cta";

export default function Page() {
  return (
    <main>
      <Hero />
      <LearningApproach />
      <OutcomesShowcase />
      <ProgramsPreview />
      <CareerDirections />
      <ClosingCta />
    </main>
  );
}
