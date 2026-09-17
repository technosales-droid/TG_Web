import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { getCareer, getCareers } from "@/lib/content";

export function generateStaticParams() {
  return getCareers().map((career) => ({ slug: career.slug }));
}

export default async function CareerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const career = getCareer(slug);
  if (!career) notFound();

  return <PageShell title={career.title} />;
}
