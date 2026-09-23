import type { Metadata } from "next";
import { GameDesignFinalCta } from "@/components/programs/game-design-final-cta";
import { GameDesignHero } from "@/components/programs/game-design-hero";
import { GameDesignOverview } from "@/components/programs/game-design-overview";

export const metadata: Metadata = {
  title: "Game Design | TechnoGurukul",
  description:
    "TG GameDesign Studio: turn ideas into structured game experiences by designing mechanics, levels, progression, challenges and rewards.",
};

export default function Page() {
  return (
    <main>
      <GameDesignHero />
      <GameDesignOverview />
      <GameDesignFinalCta />
    </main>
  );
}
