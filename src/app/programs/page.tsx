import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { ProgramsDiscoverySection } from "@/components/programs/discovery/programs-discovery-section";
import { ProgramsFinalCta } from "@/components/programs/programs-final-cta";
import { ProgramsHero } from "@/components/programs/programs-hero";

// TEMPORARY: Game Development dropped from this title/description while the course is paused (see
// active-programs.ts) -- this page no longer lists or links it, so its own metadata shouldn't claim it does.
// Restore the original wording once the course is back.
export const metadata: Metadata = buildMetadata({
  title: "Programs | AI & Digital Marketing | Nashik",
  description:
    "Explore Techno Gurukul's practical, offline programs in Nashik: a Complete Applied AI Program and a Digital Marketing course, built around hands-on projects.",
  path: "/programs",
});

export default function Page() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema([{ name: "Programs", path: "/programs" }])} />
      <ProgramsHero />
      <ProgramsDiscoverySection />
      <ProgramsFinalCta />
    </main>
  );
}
