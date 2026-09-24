import type { Metadata } from "next";
import { FacultySection } from "@/components/facilities/cards";
import { CtaSection } from "@/components/facilities/cta-section";
import { HeroCarousel } from "@/components/facilities/hero-carousel";
import { MediaCollage } from "@/components/facilities/media-collage";

export const metadata: Metadata = {
  title: "Facilities & Faculty | Techno Gurukul",
  description:
    "Explore the spaces, people and experiences that make learning at Techno Gurukul practical, collaborative and hands-on.",
};

export default function Page() {
  return (
    <main>
      <HeroCarousel />
      <MediaCollage />
      <FacultySection />
      <CtaSection />
    </main>
  );
}
