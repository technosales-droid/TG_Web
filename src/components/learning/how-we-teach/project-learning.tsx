import { cn } from "cn";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";
import { PROJECT_LIFECYCLE, PROJECT_PRINCIPLES } from "./how-we-teach-data";

// A chevron ribbon for the project lifecycle (horizontal from lg, stacked below), then four principles
// as open columns. No client, live-project or placement claims.
const CHEVRON = "lg:[clip-path:polygon(0_0,calc(100%-18px)_0,100%_50%,calc(100%-18px)_100%,0_100%,18px_50%)] lg:first:[clip-path:polygon(0_0,calc(100%-18px)_0,100%_50%,calc(100%-18px)_100%,0_100%)]";

export function ProjectLearning() {
  return (
    <section id="project-learning" aria-labelledby="project-learning-heading" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1800px]">
        <SectionHeader
          id="project-learning-heading"
          eyebrow="Learning Through Projects"
          title={
            <>
              Projects Bring <span className={cn("inline-block", GRADIENT_TEXT)}>the Learning Together.</span>
            </>
          }
        >
          Projects give students a reason to combine individual skills into something larger, test their decisions and
          create work they can refine and present.
        </SectionHeader>

        <ol aria-label="Project lifecycle" className="mt-10 grid gap-2 sm:grid-cols-2 lg:mt-12 lg:grid-cols-6 lg:gap-0">
          {PROJECT_LIFECYCLE.map((step, i) => {
            const last = i === PROJECT_LIFECYCLE.length - 1;
            return (
              <li
                key={step}
                className={cn(
                  "group flex items-center justify-center gap-2 rounded-2xl px-4 py-5 text-lg font-semibold transition-all duration-300 lg:rounded-none lg:px-6 lg:py-7",
                  CHEVRON,
                  last
                    ? "bg-gradient-to-r from-primary to-brand-green text-white"
                    : ["bg-primary/10", "bg-primary/15", "bg-primary/20", "bg-primary/25", "bg-primary/30"][i] + " text-foreground",
                  "lg:-ml-[6px] lg:first:ml-0"
                )}
              >
                <span aria-hidden="true" className="text-xs tracking-widest opacity-70">
                  0{i + 1}
                </span>
                {step}
              </li>
            );
          })}
        </ol>

        <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {PROJECT_PRINCIPLES.map((p) => (
            <li key={p.number} className="group min-w-0 border-t-2 border-primary/15 pt-5 transition-colors duration-300 hover:border-primary">
              <span aria-hidden="true" className="text-sm font-semibold tracking-widest text-muted-foreground">
                {p.number}
              </span>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">{p.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{p.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
