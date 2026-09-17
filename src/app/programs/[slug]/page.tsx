import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { getCourse, getCourses } from "@/lib/content";

export function generateStaticParams() {
  return getCourses().map((course) => ({ slug: course.slug }));
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return <PageShell title={course.title} />;
}
