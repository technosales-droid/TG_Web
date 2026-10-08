import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { ProgramsDiscoverySection } from "@/components/programs/discovery/programs-discovery-section";
import { ProgramsFinalCta } from "@/components/programs/programs-final-cta";
import { ProgramsHero } from "@/components/programs/programs-hero";

export const metadata: Metadata = buildMetadata({
  title: "Programs | Digital Marketing & Game Development | Nashik",
  description:
    "Explore Techno Gurukul's practical, offline programs in Nashik: a Digital Marketing course and Game Development course, built around hands-on projects.",
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
