import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GRADIENT_TEXT } from "@/components/ui/section-header";

const FLOW = [
  { name: "Question", text: "Decide what problem the project addresses." },
  { name: "Plan", text: "Choose an approach and break the work into steps." },
  { name: "Build", text: "Create the work and make decisions along the way." },
  { name: "Review", text: "Gather feedback and refine the result." },
  { name: "Present", text: "Explain the outcome, the decisions and what you learned." },
];

const LINK =
  "group inline-flex min-h-11 items-center gap-1.5 rounded-lg text-base font-semibold text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary";

// Abstract project card. Illustrative only: no real project, client or company.
function ProjectFlow() {
  return (
    <div className="mx-auto w-full max-w-xl rounded-[2rem] border border-primary/10 bg-card p-4 shadow-[0_28px_56px_-32px_rgba(16,20,28,0.35)] sm:p-6">
      <div aria-hidden="true" className="flex items-center gap-2">
        <span className="size-2.5 rounded-full bg-primary/25" />
        <span className="size-2.5 rounded-full bg-brand-green/40" />
        <span className="ml-2 h-2.5 w-28 rounded-full bg-primary/15" />
      </div>
      <ol aria-label="Question, plan, build, review, present" className="relative mt-5 grid gap-4">
        <span aria-hidden="true" className="absolute top-4 bottom-4 left-[15px] w-px bg-primary/20" />
        {FLOW.map((s, i) => (
          <li key={s.name} className="relative flex gap-4">
            <span
              aria-hidden="true"
              className={
                "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold " +
                (i === FLOW.length - 1 ? "border-brand-green bg-brand-green text-white" : "border-primary/40 bg-card text-primary")
              }
             />
            <div className="min-w-0 flex-1 rounded-xl border border-primary/10 bg-muted/60 px-4 py-3">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">{s.name}</h3>
              <p className="mt-0.5 text-base leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Section 4: why projects matter, connected to /learning/projects. */
export function WhyProjects() {
  return (
    <section aria-labelledby="wt-projects-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <div className="grid items-center gap-10 xl:grid-cols-2 xl:gap-16">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              Project-Based Learning
            </div>
            <h2 id="wt-projects-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
              Projects Give Learning <span className={GRADIENT_TEXT}>Somewhere to Go.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              A project creates a reason to make decisions, solve problems, use tools, document work and explain what was
              built.
            </p>
            <Link href="/learning/projects" className={LINK + " mt-6"}>
              Explore Projects
              <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
          <ProjectFlow />
        </div>
      </div>
    </section>
  );
}
