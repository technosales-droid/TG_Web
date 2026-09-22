import type { Metadata } from "next";
import { FacilitiesClose } from "@/components/about/facilities/facilities-close";
import { FacilitiesEnvironment } from "@/components/about/facilities/facilities-environment";
import { FacilitiesFinalCta } from "@/components/about/facilities/facilities-final-cta";
import { FacilitiesHero } from "@/components/about/facilities/facilities-hero";
import { FacilitiesPeople } from "@/components/about/facilities/facilities-people";
import { FacilitiesTogether } from "@/components/about/facilities/facilities-together";

export const metadata: Metadata = {
  title: "Facilities & Faculty | Techno Gurukul",
  description:
    "Explore the learning environment and the people who support the practical learning experience at Techno Gurukul.",
};

export default function Page() {
  return (
    <main>
      <FacilitiesHero />
      <FacilitiesEnvironment />
      <FacilitiesPeople />
      <FacilitiesTogether />
      <FacilitiesClose />
      <FacilitiesFinalCta />
    </main>
  );
}
