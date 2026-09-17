import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { getStudentStory, getStudentStories } from "@/lib/content";

export function generateStaticParams() {
  return getStudentStories().map((story) => ({ slug: story.slug }));
}

export default async function StudentStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getStudentStory(slug);
  if (!story) notFound();

  return <PageShell title={story.name} />;
}
