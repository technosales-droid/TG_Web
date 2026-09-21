import type { Metadata } from "next";
import { AboutClose } from "@/components/about/about-close";
import { AboutDirections } from "@/components/about/about-directions";
import { AboutFinalCta } from "@/components/about/about-final-cta";
import { AboutHero } from "@/components/about/about-hero";
import { AboutLearning } from "@/components/about/about-learning";
import { AboutPhilosophy } from "@/components/about/about-philosophy";

export const metadata: Metadata = {
  title: "About Techno Gurukul | Practical Learning & Career Readiness",
  description:
    "Learn more about Techno Gurukul's practical learning approach, educational philosophy, programs and learner experience.",
};

export default function Page() {
  return (
    <main>
      <AboutHero />
      <AboutPhilosophy />
      <AboutLearning />
      <AboutDirections />
      <AboutClose />
      <AboutFinalCta />
    </main>
  );
}
