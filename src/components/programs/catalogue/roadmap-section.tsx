import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { COURSE_CATALOGUE, INDUSTRIES, PROGRAMS } from "@/data/catalogue";

const LABEL = { "coming-soon": "Coming Soon", planned: "Planned", active: "Active" } as const;

// "What's Coming Next": the future industries and their programs. Data-driven from INDUSTRIES /
// PROGRAMS; everything here is future (never active) and links only to a filtered view of the catalogue.
export function RoadmapSection() {
  const future = INDUSTRIES.filter((i) => i.status !== "active");
  if (future.length === 0) return null;

  return (
    <section id="future-learning-paths" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-16">
      <div className="mx-auto max-w-[1800px]">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            Future Learning Paths
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            What&apos;s Coming Next
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Techno Gurukul plans to grow into more technology learning areas. These are future directions, not open
            programs. Details will be shared when each one is ready.
          </p>
        </div>

        <ul className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {future.map((industry) => {
            const programs = PROGRAMS.filter((p) => p.industrySlug === industry.slug);
            const courseCount = COURSE_CATALOGUE.filter((c) => c.industrySlug === industry.slug).length;
            return (
              <li key={industry.slug} className="min-w-0">
                <article className="flex h-full flex-col rounded-[1.75rem] border border-brand-green/30 bg-card p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide text-white uppercase ${industry.status === "planned" ? "bg-[#0b3d50]" : "bg-brand-green"}`}
                    >
                      <Clock className="size-3" aria-hidden="true" />
                      {LABEL[industry.status]}
                    </span>
                    <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-foreground uppercase">
                      {industry.origin === "source" ? "Future direction" : "Proposed"}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">{industry.name}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">{industry.description}</p>

                  <ul aria-label={`${industry.name} programs`} className="mt-4 grid gap-1.5">
                    {programs.map((p) => (
                      <li key={p.slug} className="flex items-baseline justify-between gap-3 text-sm">
                        <span className="font-medium text-foreground">{p.name}</span>
                        <span className="shrink-0 text-muted-foreground">
                          {COURSE_CATALOGUE.filter((c) => c.programSlug === p.slug).length} courses · {LABEL[p.status]}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/programs?industry=${industry.slug}#programs-listing`}
                    scroll
                    className="mt-auto inline-flex items-center gap-1 pt-5 text-base font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Browse {courseCount} future courses
                    <span className="sr-only"> in {industry.name}</span>
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
