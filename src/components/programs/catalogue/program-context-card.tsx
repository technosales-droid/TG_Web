import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { CatalogueProgram } from "@/data/catalogue";
import { STATUS_LABEL } from "./catalogue-utils";

// A PROGRAM, shown as context for its courses. Deliberately unlike a course card: no image, a
// "Program" label, and a summary of what it contains. It is never counted as a course.
export function ProgramContextCard({ program }: { program: CatalogueProgram }) {
  const { name, industryName, description, status, href, format, courseCount, statusCounts, curriculumCount } = program;
  const summary =
    courseCount > 0
      ? [
          `Contains ${courseCount} course${courseCount === 1 ? "" : "s"}`,
          ...(["active", "coming-soon", "planned"] as const)
            .filter((k) => statusCounts[k])
            .map((k) => `${statusCounts[k]} ${STATUS_LABEL[k]}`),
        ].join(" · ")
      : ["Offered as a complete learning program", format].filter(Boolean).join(" · ");

  return (
    <article className="flex h-full flex-col rounded-[1.75rem] border border-primary/20 border-l-[6px] border-l-primary bg-primary/5 p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold tracking-wide text-primary-foreground uppercase">
          Program
        </span>
        <span className="rounded-full bg-background px-3 py-1.5 text-xs font-semibold tracking-wide text-foreground uppercase">
          {industryName}
        </span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide text-white uppercase ${
            status === "active" ? "bg-brand-green" : status === "planned" ? "bg-[#0b3d50]" : "bg-brand-green"
          }`}
        >
          {status !== "active" && <Clock className="size-3" aria-hidden="true" />}
          {STATUS_LABEL[status]}
        </span>
      </div>
      <h4 className="mt-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{name}</h4>
      <p className="mt-2 text-base leading-relaxed text-muted-foreground">{description}</p>
      <p className="mt-3 text-sm text-muted-foreground">
        {summary}
        {curriculumCount > 0 && courseCount === 0 ? ` · ${curriculumCount}-module curriculum` : ""}
      </p>
      {href && status === "active" && (
        <Link
          href={href}
          className="mt-auto inline-flex w-fit items-center gap-1 pt-5 text-base font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Explore Program
          <span className="sr-only">: {name}</span>
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      )}
    </article>
  );
}
