import Link from "next/link";
import { ArrowRight, Compass, RefreshCw, Rss, Scale } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GRADIENT_TEXT } from "@/components/ui/section-header";

const PROJECT_STEPS = [
  { name: "Brief", text: "Define the problem and what a good outcome looks like." },
  { name: "Plan", text: "Choose an approach and break the work into steps." },
  { name: "Build", text: "Create the work and make decisions along the way." },
  { name: "Review", text: "Gather feedback and refine the result." },
  { name: "Present", text: "Explain the outcome, the decisions and what you learned." },
];

const COMMUNICATION = [
  { title: "Ask clear questions", text: "Say what you need to know and why it matters." },
  { title: "Ask for clarification", text: "When requirements are unclear, ask rather than guess." },
  { title: "Communicate progress", text: "Share where the work stands, including what is blocked." },
  { title: "Document decisions", text: "Record what was chosen and why, so others can follow it." },
  { title: "Explain problems", text: "Describe what went wrong and what you have already tried." },
  { title: "Receive feedback", text: "Listen, ask follow-up questions and refine the work." },
  { title: "Discuss trade-offs", text: "Explain what was given up to get what was needed." },
  { title: "Share work", text: "Present work so others can understand and use it." },
];

const CURRENT: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Follow", text: "Keep track of relevant developments.", Icon: Rss },
  { title: "Explore", text: "Try new tools or techniques where useful.", Icon: Compass },
  { title: "Evaluate", text: "Understand whether a new approach actually solves a problem.", Icon: Scale },
  { title: "Adapt", text: "Update your skills as your direction develops.", Icon: RefreshCw },
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
      <ol aria-label="Brief, plan, build, review, present" className="relative mt-5 grid gap-4">
        <span aria-hidden="true" className="absolute top-4 bottom-4 left-[15px] w-px bg-primary/20" />
        {PROJECT_STEPS.map((s, i) => (
          <li key={s.name} className="relative flex gap-4">
            <span
              aria-hidden="true"
              className={
                "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold " +
                (i === PROJECT_STEPS.length - 1 ? "border-brand-green bg-brand-green text-white" : "border-primary/40 bg-card text-primary")
              }
            >
              {i + 1}
            </span>
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

/** Sections 10, 11 and 12: projects as practice, professional communication, and staying current. */
export function IndustryProjects() {
  return (
    <>
      <section aria-labelledby="ic-projects-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
            <div className="grid items-center gap-10 xl:grid-cols-2 xl:gap-16">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                  Practical Exposure
                </div>
                <h2 id="ic-projects-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
                  Projects Are a Safe Place to <span className={GRADIENT_TEXT}>Practise Professional Thinking.</span>
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  A well-structured project can help learners practise defining a problem, making decisions, documenting
                  work, receiving feedback and presenting an outcome &mdash; all within a learning environment.
                </p>
                <Link href="/learning/projects" className={LINK + " mt-6"}>
                  Explore Project Work
                  <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
              <ProjectFlow />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="ic-communication-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Professional Communication
              </div>
              <h2 id="ic-communication-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
                Knowing What to Say Is Part of <span className={GRADIENT_TEXT}>Knowing How to Work.</span>
              </h2>
              <p className="mt-5 border-l-2 border-brand-green pl-4 text-lg font-medium tracking-tight text-foreground">
                Good work is easier to build on when it is easy to understand.
              </p>
            </div>

            <ul className="grid gap-3">
              {COMMUNICATION.map((c, i) => (
                <li
                  key={c.title}
                  className={"rounded-2xl border border-primary/15 bg-card px-5 py-4 sm:px-6" + (i % 2 === 1 ? " lg:ml-10" : "")}
                >
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{c.title}</h3>
                  <p className="mt-0.5 text-base leading-relaxed text-muted-foreground">{c.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="ic-current-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              Staying Current
            </div>
            <h2 id="ic-current-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
              Industries Change. <span className={GRADIENT_TEXT}>Learning Has to Move With Them.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Tools, workflows and expectations evolve. Building a habit of learning helps you stay curious, evaluate new
              information and adapt your skills over time.
            </p>
          </div>

          <ol aria-label="Follow, explore, evaluate, adapt" className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {CURRENT.map(({ title, text, Icon }) => (
              <li
                key={title}
                className="relative xl:after:absolute xl:after:top-6 xl:after:-right-6 xl:after:left-16 xl:after:h-px xl:after:border-t xl:after:border-dashed xl:after:border-primary/30 xl:last:after:hidden"
              >
                <span aria-hidden="true" className="relative z-10 flex size-12 items-center justify-center rounded-full border-2 border-primary/30 bg-card text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">{title}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
            No single tool or technology is guaranteed to stay current. The habit of evaluating what is new is what carries
            over.
          </p>
        </div>
      </section>
    </>
  );
}
