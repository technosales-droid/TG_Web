import { Gamepad2, Layers, Megaphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "../../learning/curriculum/section-header";

const DIRECTIONS: { id: string; title: string; Icon: LucideIcon; chips: string[] }[] = [
  {
    id: "ap-dir-digital",
    title: "Digital & Marketing",
    Icon: Megaphone,
    chips: ["Strategy", "Content", "Campaigns", "Analytics", "Communication"],
  },
  {
    id: "ap-dir-game",
    title: "Game Development & Design",
    Icon: Gamepad2,
    chips: ["Development", "Game systems", "Design", "Art", "Animation", "Technical workflows"],
  },
  {
    id: "ap-dir-cross",
    title: "Cross-Functional Projects",
    Icon: Layers,
    chips: ["Collaboration", "Documentation", "Briefs", "Feedback", "Presentation", "Project coordination"],
  },
];

/** Section 9: how the approach applies across different kinds of work, as broad illustrations. */
export function ApproachDirections() {
  return (
    <section aria-labelledby="ap-directions-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <SectionHeader
          id="ap-directions-heading"
          eyebrow="Different Kinds of Work"
          title={
            <>
              The Approach Stays Practical <span className={GRADIENT_TEXT}>Across Different Types of Work.</span>
            </>
          }
        >
          Broad illustrations of what practice can involve. These are not exhaustive curricula.
        </SectionHeader>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {DIRECTIONS.map((d) => (
            <article key={d.id} aria-labelledby={d.id} className="rounded-[2rem] border border-primary/15 bg-card p-6 sm:p-8">
              <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <d.Icon className="size-5" />
              </span>
              <h3 id={d.id} className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
                {d.title}
              </h3>
              <p className="mt-3 text-sm font-semibold tracking-widest text-muted-foreground uppercase">Practice may involve</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {d.chips.map((c) => (
                  <li key={c} className="rounded-full border border-primary/20 bg-muted/60 px-3.5 py-1.5 text-sm font-medium text-foreground">
                    {c}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
