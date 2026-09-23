import { cn } from "cn";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, H2, INNER, LEAD, SECTION } from "./overview-ui";

// Generic project categories that apply to any program — no discipline-specific examples.
const PROJECTS = [
  {
    n: "01",
    title: "Creative projects",
    text: "Practical work focused on creating, experimenting and communicating ideas.",
    verbs: ["Create", "Experiment", "Communicate"],
    span: "lg:col-span-7",
  },
  {
    n: "02",
    title: "Technical projects",
    text: "Projects involving applications, systems, prototypes, interactive experiences or technical problem solving.",
    verbs: ["Build", "Prototype", "Solve"],
    span: "lg:col-span-5",
  },
  {
    n: "03",
    title: "Problem-solving projects",
    text: "Practical challenges where students apply what they know to develop and test solutions.",
    verbs: ["Analyse", "Test", "Refine"],
    span: "lg:col-span-5",
  },
  {
    n: "04",
    title: "Portfolio projects",
    text: "Finished work that can be refined, documented and presented as evidence of learning.",
    verbs: ["Refine", "Document", "Present"],
    span: "lg:col-span-7",
    dark: true,
  },
];

export function LearningProjects() {
  return (
    <section aria-labelledby="learning-projects-heading" className={SECTION}>
      <div className={INNER}>
        <Reveal className="max-w-3xl">
          <Eyebrow index="04">Practical projects</Eyebrow>
          <h2 id="learning-projects-heading" className={cn(H2, "mt-5")}>
            Learning Becomes Practical Through Projects.
          </h2>
          <p className={cn(LEAD, "mt-5")}>
            Projects give students the opportunity to bring their learning together. They can apply concepts, solve
            problems, experiment with ideas, receive feedback and improve their work through practical experience.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-5 lg:grid-cols-12">
          {PROJECTS.map((p, i) => (
            <li key={p.n} className={cn("min-w-0", p.span)}>
              <Reveal delay={(i % 2) * 100} className="h-full">
                <article
                  className={cn(
                    "flex h-full min-h-64 flex-col rounded-3xl border p-7 transition-shadow duration-300 hover:shadow-[0_24px_48px_-32px_rgba(16,20,28,0.45)] motion-reduce:transition-none sm:p-9",
                    p.dark ? "border-transparent bg-foreground text-background" : "border-primary/15 bg-card text-foreground"
                  )}
                >
                  <div className="flex items-center justify-between text-xs font-semibold tracking-[0.2em] uppercase">
                    <span className={p.dark ? "text-background/50" : "text-primary"}>Project type {p.n}</span>
                    <span aria-hidden="true" className={cn("h-px w-16", p.dark ? "bg-background/25" : "bg-primary/25")} />
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold tracking-tight sm:text-3xl">{p.title}</h3>
                  <p className={cn("mt-3 max-w-lg text-base leading-relaxed", p.dark ? "text-background/70" : "text-muted-foreground")}>{p.text}</p>
                  <ul aria-label="Focus" className="mt-auto flex flex-wrap gap-2 pt-8">
                    {p.verbs.map((v) => (
                      <li
                        key={v}
                        className={cn(
                          "rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase",
                          p.dark ? "border-background/25 text-background/80" : "border-primary/20 text-foreground/70"
                        )}
                      >
                        {v}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
