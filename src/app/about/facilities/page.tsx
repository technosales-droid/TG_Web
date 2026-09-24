import type { Metadata } from "next";
import { FacilitiesFaculty } from "@/components/about/facilities/facilities-faculty";
import { FacilitiesFinalCta } from "@/components/about/facilities/facilities-final-cta";
import { FacilitiesGallery } from "@/components/about/facilities/facilities-gallery";
import { FacilitiesHero } from "@/components/about/facilities/facilities-hero";
import { FacilitiesLocation } from "@/components/about/facilities/facilities-location";
import { FacilitiesTogether } from "@/components/about/facilities/facilities-together";

export const metadata: Metadata = {
  title: "Facilities & Faculty | Techno Gurukul",
  description:
    "Meet the faculty and explore the facilities, learning environment and infrastructure behind the Techno Gurukul experience.",
};

export default function Page() {
  return (
    <main>
      <FacilitiesHero />
      <FacilitiesFaculty />
      <FacilitiesGallery />
      <FacilitiesLocation />
      <FacilitiesTogether />
      <FacilitiesFinalCta />
    </main>
  );
}
