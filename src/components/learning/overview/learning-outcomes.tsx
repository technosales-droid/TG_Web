import { cn } from "cn";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, GRADIENT, INNER, LEAD, SECTION } from "./overview-ui";

// Describes the learning experience only — no job, salary, placement or certification promises.
const OUTCOMES = [
  { n: "01", title: "Practical understanding", text: "Move beyond memorising concepts and understand how knowledge can be applied." },
  { n: "02", title: "Problem solving", text: "Learn to approach problems, explore solutions and make informed decisions." },
  { n: "03", title: "Practical experience", text: "Develop experience through repeated application, exercises and projects." },
  { n: "04", title: "Learning confidence", text: "Build the confidence to work independently, learn from mistakes and continue improving." },
];

export function LearningOutcomes() {
  return (
    <section aria-labelledby="learning-outcomes-heading" className={cn(SECTION, "border-t border-primary/10 bg-muted/50")}>
      <div className={INNER}>
        <Reveal className="mx-auto max-w-4xl text-center">
          <Eyebrow index="05" className="justify-center">
            What the experience builds
          </Eyebrow>
          <h2
            id="learning-outcomes-heading"
            className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-foreground sm:text-5xl xl:text-6xl"
          >
            Skills You Can Use.
            <br />
            <span className={GRADIENT}>Work You Can Show.</span>
          </h2>
          <p className={cn(LEAD, "mx-auto mt-6 max-w-2xl")}>
            The aim is not simply to complete lessons. Students develop practical understanding, apply what they learn and
            gradually build evidence of what they can do.
          </p>
        </Reveal>

        <ul className="mt-14 grid border-t border-primary/20 sm:grid-cols-2 xl:grid-cols-4">
          {OUTCOMES.map((o, i) => (
            <li key={o.n} className="min-w-0 border-b border-primary/20 sm:border-r sm:even:border-r-0 xl:even:border-r xl:last:border-r-0">
              <Reveal delay={i * 80} className="h-full">
                <div className="h-full p-6 sm:p-8">
                  <p className="text-sm font-semibold text-primary tabular-nums">{o.n}</p>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">{o.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">{o.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
