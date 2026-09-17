import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { getFacultyMember, getFaculty } from "@/lib/content";

export function generateStaticParams() {
  return getFaculty().map((member) => ({ slug: member.slug }));
}

export default async function FacultyMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getFacultyMember(slug);
  if (!member) notFound();

  return <PageShell title={member.name} />;
}
