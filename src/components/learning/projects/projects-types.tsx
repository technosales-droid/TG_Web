import { Code2, Palette, Presentation, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "cn";
import { GRADIENT_TEXT, SectionHeader } from "../curriculum/section-header";

// Program-agnostic project TYPES, not claims about completed student work. The same four categories
// as the projects section on /learning. No program curricula, roles, counts, clients or outcomes.
type VisualKey = "digital" | "creative" | "technical" | "portfolio";

const PROJECT_TYPES: {
  key: VisualKey;
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  examples: string[];
}[] = [
  {
    key: "digital",
    number: "01",
    icon: TrendingUp,
    title: "Digital Projects",
    description:
      "Plan and create digital marketing work across content, campaigns, social media, search and analytics.",
    examples: ["Campaigns", "Content", "SEO", "Social Media", "Analytics", "Digital Strategy"],
  },
  {
    key: "creative",
    number: "02",
    icon: Palette,
    title: "Creative Projects",
    description:
      "Develop visual ideas, creative concepts and interactive experiences that turn ideas into something people can see, use or experience.",
    examples: ["Visual Concepts", "3D Work", "Animation", "VFX", "Interactive Experiences"],
  },
  {
    key: "technical",
    number: "03",
    icon: Code2,
    title: "Technical Projects",
    description: "Apply technical skills to create functional experiences, interactive projects and digital products.",
    examples: ["Applications", "Interactive Systems", "Prototypes", "Gameplay Systems", "Technical Experiments"],
  },
  {
    key: "portfolio",
    number: "04",
    icon: Presentation,
    title: "Portfolio Projects",
    description:
      "Turn completed projects into work you can refine, document and present as evidence of what you can do.",
    examples: ["Project Documentation", "Case-study Style Work", "Screenshots & Media", "Process", "Outcome"],
  },
];

// Small abstract pictures, one per kind of work. Decorative only: no real software, screenshots or data.
// Parts drift slightly on hover (motion-safe).
const LIFT = "transition-transform duration-500 motion-safe:group-hover:-translate-y-1";

function TypeVisual({ kind }: { kind: VisualKey }) {
  const dark = kind === "technical";
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative h-40 overflow-hidden rounded-2xl p-4 sm:h-44",
        dark
          ? "bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary"
          : kind === "creative"
            ? "bg-gradient-to-br from-brand-green/25 via-primary/10 to-primary/20"
            : kind === "portfolio"
              ? "bg-gradient-to-br from-primary/10 to-brand-green/15"
              : "bg-gradient-to-br from-primary/20 via-primary/10 to-brand-green/15"
      )}
    >
      {kind === "digital" && (
        <div className="grid h-full grid-cols-5 gap-3">
          <div className={cn("col-span-3 flex items-end gap-2 rounded-xl bg-card/80 p-3", LIFT)}>
            {[40, 65, 50, 85, 60].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} className={cn("flex-1 rounded-md", i === 3 ? "bg-brand-green/70" : "bg-primary/30")} />
            ))}
          </div>
          <div className="col-span-2 grid gap-3">
            <div className="rounded-xl bg-card/80 p-3">
              <span className="block h-2 w-3/4 rounded-full bg-primary/30" />
              <span className="mt-2 block h-2 w-1/2 rounded-full bg-primary/15" />
            </div>
            <div className={cn("grid grid-cols-3 gap-1.5 rounded-xl bg-card/80 p-3", LIFT)}>
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className={cn("h-3 rounded", i === 4 ? "bg-brand-green/60" : "bg-primary/15")} />
              ))}
            </div>
          </div>
        </div>
      )}

      {kind === "creative" && (
        <div className="relative h-full">
          <span className={cn("absolute top-1 left-[8%] size-20 rounded-full bg-primary/30 sm:size-24", LIFT)} />
          <span className="absolute top-8 left-[28%] size-20 rotate-12 rounded-2xl bg-brand-green/45 transition-transform duration-500 motion-safe:group-hover:rotate-[20deg] sm:size-24" />
          <span className={cn("absolute right-[10%] bottom-2 h-16 w-28 rounded-full border-2 border-primary/30", LIFT)} />
          <span className="absolute top-3 right-[14%] size-6 rounded-full bg-card/80" />
          <span className="absolute bottom-3 left-[14%] h-2 w-24 rounded-full bg-card/70" />
        </div>
      )}

      {kind === "technical" && (
        <div className="grid h-full grid-cols-5 gap-3">
          <div className="col-span-2 grid content-center gap-2 rounded-xl bg-background/10 p-3">
            {["w-4/5", "w-3/5 ml-3", "w-2/3 ml-3", "w-1/2", "w-3/4 ml-3"].map((w, i) => (
              <span key={i} className={cn("h-1.5 rounded-full", w, i === 3 ? "bg-brand-green/80" : "bg-background/40")} />
            ))}
          </div>
          <div className="relative col-span-3 grid grid-cols-3 content-center gap-3">
            <span aria-hidden="true" className="absolute top-1/2 right-4 left-4 h-px bg-background/30" />
            <span aria-hidden="true" className="absolute top-4 bottom-4 left-1/2 w-px bg-background/30" />
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "relative h-9 rounded-lg",
                  i === 4 ? "bg-brand-green/70" : "bg-background/25",
                  i % 2 ? LIFT : ""
                )}
              />
            ))}
          </div>
        </div>
      )}

      {kind === "portfolio" && (
        <div className="relative h-full">
          <span className="absolute top-2 left-[14%] h-full w-[42%] -rotate-3 rounded-xl border border-primary/15 bg-card/60" />
          <div className={cn("absolute top-1 left-[28%] h-full w-[46%] rounded-xl border border-primary/15 bg-card p-3 shadow-sm", LIFT)}>
            <span className="block h-2 w-1/2 rounded-full bg-primary/35" />
            <span className="mt-2 block h-10 rounded-md bg-gradient-to-br from-primary/25 to-brand-green/35" />
            <span className="mt-2 block h-1.5 w-full rounded-full bg-primary/15" />
            <span className="mt-1.5 block h-1.5 w-3/4 rounded-full bg-primary/15" />
          </div>
          <span className="absolute top-6 right-[6%] flex size-7 items-center justify-center rounded-full bg-brand-green text-[11px] font-semibold text-white">
            ✓
          </span>
        </div>
      )}
    </div>
  );
}

export function ProjectsTypes() {
  return (
    <section id="project-types" aria-labelledby="project-types-heading" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1800px]">
        <SectionHeader
          id="project-types-heading"
          eyebrow="Project Types"
          title={
            <>
              <span className="block">Build Different Skills</span>
              <span className={`block ${GRADIENT_TEXT}`}>Into Different Kinds of Work.</span>
            </>
          }
        >
          Projects can take different forms depending on the skills being developed. The focus is on combining what
          students learn into work they can test, refine, document and present.
        </SectionHeader>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-12 lg:gap-6">
          {PROJECT_TYPES.map((t) => {
            const Icon = t.icon;
            return (
              <li key={t.key} className="min-w-0">
                <article className="group flex h-full flex-col rounded-[2rem] border border-primary/10 bg-card p-4 shadow-[0_12px_28px_-22px_rgba(16,20,28,0.3)] transition-all duration-300 hover:border-primary/30 hover:shadow-[0_22px_44px_-26px_rgba(16,20,28,0.4)] motion-safe:hover:-translate-y-1 sm:p-5">
                  <TypeVisual kind={t.key} />

                  <div className="flex flex-1 flex-col px-1 pt-5 pb-1 sm:px-2 sm:pb-2">
                    <div className="flex items-center gap-3">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-primary transition-transform duration-300 motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <h3 className="min-w-0 text-2xl font-semibold tracking-tight text-foreground">
                        <span aria-hidden="true" className="mr-2 text-sm font-semibold tracking-widest text-muted-foreground">
                          {t.number}
                        </span>
                        {t.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t.description}</p>

                    <ul aria-label={`${t.title}: example areas`} className="mt-auto flex flex-wrap gap-2 pt-5">
                      {t.examples.map((e) => (
                        <li
                          key={e}
                          className="rounded-full border border-primary/15 bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors duration-300 group-hover:border-primary/30"
                        >
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
