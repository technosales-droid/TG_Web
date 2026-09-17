import { Hero } from "@/components/home/hero";
import { LearningApproach } from "@/components/home/learning-approach";
import { OutcomesShowcase } from "@/components/home/outcomes-showcase";

export default function Page() {
  return (
    <main>
      <Hero />
      <LearningApproach />
      <OutcomesShowcase />
    </main>
  );
}
