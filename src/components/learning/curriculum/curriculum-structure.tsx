import { cn } from "cn";
import { STRUCTURE_STAGES } from "./curriculum-data";
import { GRADIENT_TEXT, SectionHeader } from "./section-header";

// Top bars step up in strength from stage to stage: an open column layout, not a card grid.
const BAR = ["bg-primary/25", "bg-primary/45", "bg-primary/70", "bg-gradient-to-r from-primary to-brand-green"];

export function CurriculumStructure() {
  return (
    <section id="curriculum-structure" aria-labelledby="curriculum-structure-heading" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1800px]">
        <SectionHeader
          id="curriculum-structure-heading"
          eyebrow="Curriculum Structure"
          title={
            <>
              From Fundamentals <span className={cn("inline-block", GRADIENT_TEXT)}>to Practical Work.</span>
            </>
          }
        >
          Learning progresses from core concepts to guided practice, projects and portfolio-ready work.
        </SectionHeader>

        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-6 xl:gap-10">
          {STRUCTURE_STAGES.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.number} className="group min-w-0">
                <div aria-hidden="true" className={cn("h-1.5 rounded-full transition-all duration-300 group-hover:h-2", BAR[i])} />
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-full bg-accent text-primary transition-transform duration-300 motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span aria-hidden="true" className="text-sm font-semibold tracking-widest text-muted-foreground">
                    {s.number}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">{s.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{s.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
