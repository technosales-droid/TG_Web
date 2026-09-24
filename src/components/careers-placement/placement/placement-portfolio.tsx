import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const FLOW = [
  { name: "Project", text: "Build something practical." },
  { name: "Documentation", text: "Explain what you made, how it works and what you learned." },
  { name: "Portfolio Piece", text: "Present the work clearly." },
  { name: "Conversation", text: "Be prepared to explain your decisions and process." },
];

const RESUME_POINTS = ["Skills", "Projects", "Relevant experience", "Education", "Tools and technologies, where appropriate"];
const PORTFOLIO_POINTS = [
  "Projects",
  "Screenshots",
  "Documentation",
  "Outcomes, where genuinely measurable",
  "Process",
  "Reflections",
];

const LINK =
  "group inline-flex min-h-11 items-center gap-1.5 rounded-lg text-base font-semibold text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary";

/** Sections 5 and 6: from project to portfolio, then the resume / portfolio split. */
export function PlacementPortfolio() {
  return (
    <>
      <section aria-labelledby="placement-flow-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="placement-flow-heading"
            eyebrow="From Project to Portfolio"
            title={
              <>
                Your Projects Should Be More Than <span className={GRADIENT_TEXT}>Completed Assignments.</span>
              </>
            }
          >
            A useful project gives you something you can demonstrate, explain and improve. Good documentation can turn a
            finished project into stronger portfolio evidence.
          </SectionHeader>

          <ol className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-4 xl:gap-0">
            {FLOW.map((s, i) => (
              <li key={s.name} className="relative">
                <div className="h-full rounded-2xl border border-primary/15 bg-card p-6 xl:rounded-none xl:first:rounded-l-2xl xl:last:rounded-r-2xl xl:[&:not(:first-child)]:border-l-0">
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">{s.name}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
                {i < FLOW.length - 1 && (
                  <span aria-hidden="true" className="absolute top-1/2 -right-3 z-10 hidden size-6 -translate-y-1/2 items-center justify-center rounded-full border border-primary/20 bg-background text-primary xl:flex">
                    <ChevronRight className="size-4" />
                  </span>
                )}
              </li>
            ))}
          </ol>

          <Link href="/learning/projects" className={LINK + " mt-6"}>
            Explore Project Work
            <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section aria-label="Resume and portfolio" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            {[
              {
                id: "placement-resume-heading",
                eyebrow: "Resume",
                title: "Make Your Resume Easy to Understand.",
                text: "A resume should clearly communicate what you can do and what you have done, so a reader can find the important points quickly:",
                points: RESUME_POINTS,
                cta: "Portfolio & Resume",
              },
              {
                id: "placement-portfolio-heading",
                eyebrow: "Portfolio",
                title: "Show the Work Behind the Words.",
                text: "Portfolio evidence can help demonstrate practical ability. Depending on the work, it can include:",
                points: PORTFOLIO_POINTS,
                cta: "Build Your Portfolio",
              },
            ].map((c) => (
              <article key={c.id} aria-labelledby={c.id} className="flex flex-col rounded-[2rem] border border-primary/15 bg-card p-6 sm:p-8">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                  {c.eyebrow}
                </div>
                <h2 id={c.id} className="mt-3 text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl">
                  {c.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{c.text}</p>
                <ul className="mt-4 grid gap-2">
                  {c.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-base text-foreground">
                      <span aria-hidden="true" className="mt-2.5 block size-1.5 shrink-0 rounded-full bg-brand-green" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link href="/careers-placement/portfolio-resume" className={LINK + " mt-auto self-start pt-6"}>
                  {c.cta}
                  <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
