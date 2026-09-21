import { ChevronRight } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "../../learning/curriculum/section-header";

const LAYERS = [
  { name: "Resume", text: "Summarises your background." },
  { name: "Portfolio", text: "Shows the evidence behind it." },
  { name: "Conversation", text: "Lets you explain the work." },
];

const MISTAKES = [
  { title: "Too Much Information", text: "Remove unnecessary detail." },
  { title: "No Context", text: "Don’t show a project without explaining what it is." },
  { title: "Vague Claims", text: "Describe what you actually did." },
  { title: "No Evidence", text: "Support skills with projects or experience where possible." },
  { title: "Repetitive Projects", text: "Avoid showing five projects that demonstrate the same thing." },
  { title: "Outdated Content", text: "Keep your portfolio and resume current." },
  { title: "Poor Structure", text: "Make important information easy to scan." },
  { title: "Overdesigned Presentation", text: "Design should support communication, not obscure it." },
];

const DIRECTIONS = [
  {
    id: "pr-dir-dm",
    title: "Digital & Marketing Work",
    evidence: ["Campaigns", "Content", "Strategy", "Analytics", "Creative work", "Digital projects"],
  },
  {
    id: "pr-dir-game",
    title: "Game Development & Design Work",
    evidence: ["Game projects", "Gameplay systems", "3D and 2D work", "Game design", "Animation and VFX", "Technical prototypes"],
  },
];

/** Sections 9, 10 and 11: the three layers together, common mistakes, and work by direction. */
export function PortfolioTogether() {
  return (
    <>
      <section aria-labelledby="pr-together-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary px-6 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
            <div className="flex items-center gap-2 text-sm font-medium text-background">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              Resume + Portfolio Together
            </div>
            <h2 id="pr-together-heading" className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-background sm:text-4xl xl:text-5xl">
              Three Layers That{" "}
              <span className="bg-gradient-to-r from-[#8fd3f0] to-brand-green bg-clip-text text-transparent">Support Each Other.</span>
            </h2>

            <ol aria-label="Resume, portfolio, conversation" className="mt-10 flex flex-col items-stretch gap-3 lg:flex-row lg:items-stretch lg:gap-0">
              {LAYERS.map((l, i) => (
                <li key={l.name} className="flex flex-1 flex-col items-stretch lg:flex-row lg:items-center">
                  <div className="flex-1 rounded-2xl border border-background/20 bg-background/10 p-6">
                    <span aria-hidden="true" className="text-sm font-semibold tracking-widest text-brand-green">
                      0{i + 1}
                    </span>
                    <h3 className="mt-1 text-2xl font-semibold tracking-tight text-background">{l.name}</h3>
                    <p className="mt-1.5 text-base leading-relaxed text-background/75">{l.text}</p>
                  </div>
                  {i < LAYERS.length - 1 && <ChevronRight aria-hidden="true" className="mx-2 hidden size-6 shrink-0 text-background/60 lg:block" />}
                </li>
              ))}
            </ol>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-background/75 sm:text-lg">
              The strongest presentation happens when these three layers support each other rather than repeating the same
              information.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="pr-mistakes-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="pr-mistakes-heading"
            eyebrow="Common Pitfalls"
            title={
              <>
                Make Your Work <span className={GRADIENT_TEXT}>Easier to Understand.</span>
              </>
            }
          >
            Small habits that make a resume or portfolio harder to read, and what to do instead.
          </SectionHeader>

          <ul className="mt-10 grid gap-x-10 gap-y-2 sm:grid-cols-2">
            {MISTAKES.map((m) => (
              <li key={m.title} className="flex gap-4 border-t border-primary/15 py-5">
                <span aria-hidden="true" className="mt-2 block size-2 shrink-0 rounded-full bg-primary/40" />
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{m.title}</h3>
                  <p className="mt-1 text-base leading-relaxed text-muted-foreground">{m.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="pr-directions-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="pr-directions-heading"
            eyebrow="By Direction"
            title={
              <>
                Show the Work That <span className={GRADIENT_TEXT}>Matches Your Direction.</span>
              </>
            }
          >
            Two broad examples of the kinds of evidence a portfolio can hold. They are illustrations, not complete lists.
          </SectionHeader>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {DIRECTIONS.map((d) => (
              <article key={d.id} aria-labelledby={d.id} className="rounded-[2rem] border border-primary/15 bg-card p-6 sm:p-8">
                <h3 id={d.id} className="text-2xl font-semibold tracking-tight text-foreground">
                  {d.title}
                </h3>
                <p className="mt-3 text-sm font-semibold tracking-widest text-muted-foreground uppercase">Possible evidence</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {d.evidence.map((e) => (
                    <li key={e} className="flex items-center gap-2.5 text-base text-foreground">
                      <span aria-hidden="true" className="block size-1.5 shrink-0 rounded-full bg-brand-green" />
                      {e}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
