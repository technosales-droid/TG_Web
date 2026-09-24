import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const CASE_FLOW = [
  { name: "Context", text: "What problem, idea or situation did the project start from?" },
  { name: "Goal", text: "What were you trying to create or solve?" },
  { name: "Process", text: "How did you approach it?" },
  { name: "Build", text: "What did you actually create?" },
  { name: "Result", text: "What changed or what did the finished work accomplish?" },
  { name: "Reflection", text: "What did you learn and what would you improve?" },
];

const INCLUDE = [
  { title: "Project Overview", text: "One clear description of the project." },
  { title: "Your Role", text: "Explain what you personally contributed." },
  { title: "Tools", text: "Identify relevant software, technologies or methods." },
  { title: "Process", text: "Show important steps in your approach." },
  { title: "Final Work", text: "Present the finished outcome." },
  { title: "Challenges", text: "Explain meaningful problems encountered." },
  { title: "Learning", text: "Describe what the project taught you." },
  { title: "Documentation", text: "Include useful supporting material." },
];

const LIBRARY_FLOW = ["Project", "Select", "Document", "Present", "Portfolio"];

const STRONGER = [
  { title: "Select", text: "Choose work that represents useful skills." },
  { title: "Curate", text: "Remove weak or repetitive examples." },
  { title: "Explain", text: "Give each project enough context." },
  { title: "Improve", text: "Update the portfolio as your skills grow." },
];

const LINK =
  "group inline-flex min-h-11 items-center gap-1.5 rounded-lg text-base font-semibold text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary";

/** Sections 5 to 8: the case-study structure, what it includes, projects to portfolio, and curation. */
export function PortfolioEvidence() {
  return (
    <>
      <section aria-labelledby="pr-case-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
            <SectionHeader
              id="pr-case-heading"
              eyebrow="Portfolio"
              title={
                <>
                  Don&rsquo;t Just List the Project. <span className={GRADIENT_TEXT}>Show the Thinking Behind It.</span>
                </>
              }
            >
              A project case study can follow a simple path. Not every project needs a measurable result.
            </SectionHeader>

            <ol className="relative mt-10 grid gap-6 xl:grid-cols-6 xl:gap-4">
              <span aria-hidden="true" className="absolute top-2 bottom-2 left-[15px] w-px bg-primary/20 xl:top-[15px] xl:right-[8%] xl:bottom-auto xl:left-[8%] xl:h-px xl:w-auto" />
              {CASE_FLOW.map((s, i) => (
                <li key={s.name} className="relative grid grid-cols-[auto_1fr] gap-x-4 xl:block">
                  <span
                    aria-hidden="true"
                    className={
                      "relative z-10 flex size-8 items-center justify-center rounded-full border-2 text-xs font-bold xl:mx-auto " +
                      (i === CASE_FLOW.length - 1 ? "border-brand-green bg-brand-green text-white" : "border-primary/40 bg-card text-primary")
                    }
                   />
                  <div className="xl:mt-4 xl:text-center">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">{s.name}</h3>
                    <p className="mt-1.5 text-base leading-relaxed text-muted-foreground xl:mx-auto xl:max-w-[13rem]">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="pr-include-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="pr-include-heading"
            eyebrow="Inside a Case Study"
            title={
              <>
                What to Include in a <span className={GRADIENT_TEXT}>Project Case Study.</span>
              </>
            }
          >
            Only describe what is true: your real role, your real tools and results only where they genuinely exist.
          </SectionHeader>

          {/* Wireframe-style blocks, like the sections of a case-study page */}
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
            {INCLUDE.map((b) => (
              <li key={b.title} className="rounded-2xl border border-primary/15 bg-card p-5">
                <div aria-hidden="true" className="mb-4 grid gap-1.5">
                  <span className="block h-1.5 w-2/5 rounded-full bg-primary/30" />
                  <span className="block h-1.5 w-full rounded-full bg-primary/10" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">{b.title}</h3>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="pr-library-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="pr-library-heading"
            eyebrow="From Project Library to Portfolio"
            title={
              <>
                Start With the <span className={GRADIENT_TEXT}>Work You Already Have.</span>
              </>
            }
          >
            Projects built during learning can become useful portfolio material when they are selected carefully,
            documented clearly and presented with enough context for someone else to understand them.
          </SectionHeader>

          <ol aria-label="From project to portfolio" className="mt-10 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-0">
            {LIBRARY_FLOW.map((step, i) => (
              <li key={step} className="flex flex-1 flex-col items-stretch lg:flex-row lg:items-center">
                <span
                  className={
                    "flex min-h-14 flex-1 items-center justify-center rounded-2xl border px-4 py-3 text-center text-lg font-semibold tracking-tight " +
                    (i === LIBRARY_FLOW.length - 1 ? "border-transparent bg-gradient-to-r from-primary to-brand-green text-white" : "border-primary/20 bg-card text-foreground")
                  }
                >
                  {step}
                </span>
                {i < LIBRARY_FLOW.length - 1 && <ChevronRight aria-hidden="true" className="mx-1 hidden size-5 shrink-0 text-primary/60 lg:block" />}
              </li>
            ))}
          </ol>

          <Link href="/learning/projects" className={LINK + " mt-6"}>
            Explore Project Work
            <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section aria-labelledby="pr-stronger-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Quality Over Quantity
              </div>
              <h2 id="pr-stronger-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-5xl">
                A Strong Portfolio Is Not Necessarily <span className={GRADIENT_TEXT}>a Large Portfolio.</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                A smaller collection of well-explained work can communicate more clearly than a long list of unfinished or
                disconnected projects.
              </p>
            </div>
            <ol className="grid gap-x-8 sm:grid-cols-2">
              {STRONGER.map((s) => (
                <li key={s.title} className="border-l-2 border-brand-green py-3 pl-5">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">{s.title}</h3>
                  <p className="mt-1 text-base leading-relaxed text-muted-foreground">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
