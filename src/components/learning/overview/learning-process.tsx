import { cn } from "cn";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, GRADIENT, H2, INNER, LEAD, SECTION } from "./overview-ui";

const STAGES = [
  { n: "01", title: "Learn", tag: "Build the fundamentals.", text: "Understand the concepts, tools, terminology and workflows that form the foundation of a subject." },
  { n: "02", title: "Practice", tag: "Learn by doing.", text: "Apply what you learn through exercises, guided activities and practical work." },
  { n: "03", title: "Build", tag: "Create practical work.", text: "Bring different skills together to solve problems, experiment with ideas and create complete projects." },
  { n: "04", title: "Show", tag: "Build evidence of your work.", text: "Refine, document and present completed work so progress and practical ability can be demonstrated." },
];

// A stepped layout on wide screens (each stage sits a little lower and darker than the last) so the
// progression reads at a glance. It is a philosophy diagram, not a progress tracker.
const OFFSET = ["xl:mt-0", "xl:mt-10", "xl:mt-20", "xl:mt-30"];
const LINE = ["border-primary/20", "border-primary/40", "border-primary/70", "border-primary"];

export function LearningProcess() {
  return (
    <section id="learning-process" aria-labelledby="learning-process-heading" className={cn(SECTION, "scroll-mt-16 border-t border-primary/10")}>
      <div className={INNER}>
        <Reveal className="max-w-3xl">
          <Eyebrow index="02">The learning process</Eyebrow>
          <h2 id="learning-process-heading" className={cn(H2, "mt-5")}>
            Learn. Practice. Build. <span className={GRADIENT}>Show.</span>
          </h2>
          <p className={cn(LEAD, "mt-5")}>
            Learning develops through a process. Each stage builds on the previous one, moving students from understanding
            concepts to applying them and creating work they can demonstrate.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-10 xl:grid-cols-4 xl:gap-8">
          {STAGES.map((s, i) => (
            <li key={s.n} className={OFFSET[i]}>
              <Reveal delay={i * 100} className="h-full">
                <div className={cn("h-full border-l-2 pl-6 xl:border-t-2 xl:border-l-0 xl:pt-7 xl:pl-0", LINE[i])}>
                  <p className="text-6xl font-semibold tracking-tight text-primary/20 tabular-nums xl:text-7xl">{s.n}</p>
                  <h3 className="mt-4 text-sm font-semibold tracking-[0.25em] text-primary uppercase">{s.title}</h3>
                  <p className="mt-2 text-2xl leading-snug font-semibold text-foreground">{s.tag}</p>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-16 border-t border-primary/15 pt-8 xl:mt-20">
          <p className="max-w-3xl text-lg leading-relaxed text-foreground sm:text-xl">
            Every stage builds on the previous one. The goal is not simply to finish lessons, but to develop the ability to
            use what you learn.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
