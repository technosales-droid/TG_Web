import { ChevronRight, FolderKanban, Gauge, Layers, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "cn";

// Program-agnostic: these are broad qualities the learning experience builds, not guaranteed outcomes.
// Keep programs, tools and course names out of this section.
const OUTCOMES: {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** The stage of growth this layer represents. */
  stage: string;
}[] = [
  {
    number: "01",
    title: "Practical Skills",
    description:
      "Build useful skills by understanding concepts and applying them through hands-on work.",
    icon: Layers,
    stage: "Concept",
  },
  {
    number: "02",
    title: "Real Project Experience",
    description: "Bring different skills together through practical projects and experiments.",
    icon: FolderKanban,
    stage: "Practice",
  },
  {
    number: "03",
    title: "Portfolio Evidence",
    description:
      "Turn completed work into projects, documentation and examples that can be refined and presented.",
    icon: ShieldCheck,
    stage: "Work",
  },
  {
    number: "04",
    title: "Learning Confidence",
    description:
      "Develop the ability to approach problems, practise independently, improve through feedback and continue learning.",
    icon: Gauge,
    stage: "Proof",
  },
];

// Each layer is a little stronger than the one below it. Layer 04 is the deepest surface.
const LAYER_STYLE = [
  "border-primary/10 bg-card",
  "border-primary/20 bg-primary/5",
  "border-primary/30 bg-primary/10",
  "border-transparent bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary text-background",
];

const LOOP = ["Build", "Review", "Improve", "Present"];

export function LearningOutcomes() {
  return (
    <section id="learning-outcomes" aria-labelledby="learning-outcomes-heading" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14 xl:gap-20">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              What the Experience Builds
            </div>
            <h2
              id="learning-outcomes-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl"
            >
              <span className="block">Skills You Can Use.</span>
              <span className="block bg-gradient-to-r from-primary to-brand-green bg-clip-text text-transparent">
                Work You Can Show.
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              The aim is not simply to complete lessons. Students develop practical skills, apply them through work,
              and gradually build evidence of what they can do.
            </p>
          </div>

          <div className="min-w-0">
            {/* Growth stack: read 01 to 04, displayed with the strongest layer on top */}
            <ol aria-label="How the learning experience builds up" className="flex flex-col-reverse gap-4">
              {OUTCOMES.map((o, i) => {
                const Icon = o.icon;
                const top = i === OUTCOMES.length - 1;
                return (
                  <li key={o.number} className="group relative min-w-0">
                    {/* Connector to the layer above (decorative) */}
                    {!top && (
                      <span
                        aria-hidden="true"
                        className="absolute -top-4 left-9 h-4 w-0.5 bg-primary/30 transition-colors duration-300 group-hover:bg-primary"
                      />
                    )}
                    <div
                      className={cn(
                        "rounded-3xl border p-5 transition-all duration-300 group-hover:shadow-[0_20px_40px_-24px_rgba(16,20,28,0.4)] motion-safe:group-hover:-translate-y-1 sm:p-6",
                        LAYER_STYLE[i]
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className={cn(
                            "flex size-12 shrink-0 items-center justify-center rounded-full transition-transform duration-300 motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110",
                            top ? "bg-background/15 text-background" : "bg-primary text-primary-foreground"
                          )}
                        >
                          <Icon className="size-6" aria-hidden="true" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                            <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                              <span aria-hidden="true" className={cn("mr-2 text-sm font-semibold tracking-widest", top ? "text-background/60" : "text-muted-foreground")}>
                                {o.number}
                              </span>
                              {o.title}
                            </h3>
                            <span
                              aria-hidden="true"
                              className={cn(
                                "text-xs font-semibold tracking-widest uppercase",
                                top ? "text-brand-green" : "text-primary"
                              )}
                            >
                              {o.stage}
                            </span>
                          </div>
                          <p className={cn("mt-2 text-base leading-relaxed", top ? "text-background/85" : "text-muted-foreground")}>
                            {o.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* The practical loop */}
            <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2" role="group" aria-label="Build, review, improve, present">
              {LOOP.map((step, i) => (
                <span key={step} className="flex items-center gap-2">
                  {i > 0 && <ChevronRight className="size-4 text-primary/50" aria-hidden="true" />}
                  <span className="rounded-full border border-primary/15 bg-card px-3.5 py-1.5 text-sm font-semibold text-foreground">
                    {step}
                  </span>
                </span>
              ))}
            </div>

            <p className="mt-5 max-w-2xl border-l-4 border-brand-green pl-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Progress looks different for every learner. The focus is on building skills through practice and
              creating work that shows that progress.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
