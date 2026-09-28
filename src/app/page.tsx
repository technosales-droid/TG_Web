import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { AvailableCourses } from "@/components/home/available-courses";
import { OutcomesShowcase } from "@/components/home/outcomes-showcase";
import { ComingSoonPrograms } from "@/components/home/programs-preview";
import { ClosingCta } from "@/components/home/closing-cta";

const title = "Techno Gurukul | Digital Marketing Institute in Nashik";
const description =
  "Techno Gurukul is a Nashik-based learning institute offering a practical Digital Marketing course as its signature program, alongside hands-on Game Development training, both built around real projects.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary", title, description },
};

export default function Page() {
  return (
    <main>
      <Hero />
      <AvailableCourses />
      <OutcomesShowcase />
      <ComingSoonPrograms />
      <ClosingCta />
    </main>
  );
}
