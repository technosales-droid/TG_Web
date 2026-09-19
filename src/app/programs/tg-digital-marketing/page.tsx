import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DigitalMarketingCareers } from "@/components/programs/digital-marketing-careers";
import { DigitalMarketingCurriculum } from "@/components/programs/digital-marketing-curriculum";
import { DigitalMarketingPractical } from "@/components/programs/digital-marketing-practical";
import { DigitalMarketingHero } from "@/components/programs/digital-marketing-hero";
import { DigitalMarketingLearning } from "@/components/programs/digital-marketing-learning";
import { DigitalMarketingOverview } from "@/components/programs/digital-marketing-overview";
import { getCourse } from "@/lib/content";

export const metadata: Metadata = {
  title: "Digital Marketing | TechnoGurukul",
  description:
    "Learn practical digital marketing skills — strategy, content, social media, search, advertising and analytics — and apply them through real work and projects.",
};

export default function Page() {
  const course = getCourse("tg-digital-marketing");
  if (!course) notFound();

  return (
    <main>
      <DigitalMarketingHero focus={course.summary} />
      <DigitalMarketingOverview />
      <DigitalMarketingLearning />
      <DigitalMarketingCurriculum />
      <DigitalMarketingPractical />
      <DigitalMarketingCareers />
    </main>
  );
}
