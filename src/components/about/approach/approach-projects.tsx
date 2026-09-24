import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const CYCLE = [
  { name: "Brief", text: "Understand what needs to be solved or created." },
  { name: "Plan", text: "Choose an approach and break the work into steps." },
  { name: "Build", text: "Create the work and make decisions along the way." },
  { name: "Review", text: "Gather feedback on the work so far." },
  { name: "Improve", text: "Refine the work based on that feedback." },
  { name: "Present", text: "Explain the outcome, the decisions and what you learned." },
];

/** Section 6: project-based application, connected to /learning/projects. */
export function ApproachProjects() {
  return (
    <section aria-labelledby="ap-projects-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <SectionHeader
          id="ap-projects-heading"
          eyebrow="Project Work"
          title={
            <>
              Projects Turn Learning Into <span className={GRADIENT_TEXT}>Something You Can Examine.</span>
            </>
          }
        >
          Projects give learners a place to apply concepts, make decisions, encounter problems, document progress and
          reflect on the finished work.
        </SectionHeader>

        <ol aria-label="Brief, plan, build, review, improve, present" className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-6 xl:gap-4">
          {CYCLE.map((s, i) => (
            <li key={s.name} className="flex flex-col rounded-2xl border border-primary/15 bg-card p-5">
              <span
                aria-hidden="true"
                className={
                  "flex size-8 items-center justify-center rounded-full border-2 text-xs font-bold " +
                  (i === CYCLE.length - 1 ? "border-brand-green bg-brand-green text-white" : "border-primary/40 bg-muted/60 text-primary")
                }
               />
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">{s.name}</h3>
              <p className="mt-1 text-base leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>

        <Link
          href="/learning/projects"
          className="group mt-8 inline-flex min-h-11 items-center gap-1.5 rounded-lg text-base font-semibold text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Explore Projects
          <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
