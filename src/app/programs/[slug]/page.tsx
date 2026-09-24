import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseBody } from "@/components/course/course-content";
import { CourseExtras } from "@/components/course/course-extras";
import { CourseHero, CourseSnapshot } from "@/components/course/course-hero";
import { COURSE_DETAILS, getCourseDetail } from "@/data/course-details";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return COURSE_DETAILS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = getCourseDetail((await params).slug);
  if (!course) return {};
  const title = `${course.title} | Techno Gurukul`;
  return {
    title,
    description: course.description,
    openGraph: { title, description: course.description, type: "website", ...(course.heroImage ? { images: [{ url: course.heroImage, alt: course.heroAlt }] } : {}) },
  };
}

// Every course renders through this one template; the content comes from data/course-details.ts.
export default async function Page({ params }: Props) {
  const course = getCourseDetail((await params).slug);
  if (!course) notFound();
  return (
    <main>
      <CourseHero course={course} />
      <CourseSnapshot course={course} />
      <CourseBody course={course} />
      <CourseExtras course={course} />
    </main>
  );
}
