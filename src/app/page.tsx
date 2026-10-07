import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { AvailableCourses } from "@/components/home/available-courses";
import { LearningApproach } from "@/components/home/learning-approach";
import { OutcomesShowcase } from "@/components/home/outcomes-showcase";
import { ComingSoonPrograms } from "@/components/home/programs-preview";
import { ClosingCta } from "@/components/home/closing-cta";

const title = "Techno Gurukul | Digital Marketing Institute in Nashik";
const description =
  "Techno Gurukul is a Nashik-based learning institute offering a practical Digital Marketing course as its signature program, alongside hands-on Game Development training, both built around real projects.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", images: [{ url: "/brand/link-preview.jpg", width: 1200, height: 630, alt: "Techno Gurukul" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/brand/link-preview.jpg"] },
};

export default function Page() {
  return (
    <main>
      <Hero />
      <AvailableCourses />
      <LearningApproach />
      <OutcomesShowcase />
      <ComingSoonPrograms />
      <ClosingCta />
    </main>
  );
}
