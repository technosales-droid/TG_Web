import type { Metadata } from "next";
import { PortfolioBasics } from "@/components/careers-placement/portfolio-resume/portfolio-basics";
import { PortfolioClose } from "@/components/careers-placement/portfolio-resume/portfolio-close";
import { PortfolioEvidence } from "@/components/careers-placement/portfolio-resume/portfolio-evidence";
import { PortfolioFinalCta } from "@/components/careers-placement/portfolio-resume/portfolio-final-cta";
import { PortfolioHero } from "@/components/careers-placement/portfolio-resume/portfolio-hero";
import { PortfolioRelated } from "@/components/careers-placement/portfolio-resume/portfolio-related";
import { PortfolioTogether } from "@/components/careers-placement/portfolio-resume/portfolio-together";

export const metadata: Metadata = {
  title: "Portfolio & Resume | Techno Gurukul",
  description:
    "Learn how to build a clear resume, present practical projects and create a portfolio that shows your skills and work.",
};

export default function Page() {
  return (
    <main>
      <PortfolioHero />
      <PortfolioBasics />
      <PortfolioEvidence />
      <PortfolioTogether />
      <PortfolioClose />
      <PortfolioRelated />
      <PortfolioFinalCta />
    </main>
  );
}
