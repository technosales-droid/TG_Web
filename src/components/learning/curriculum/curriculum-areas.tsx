import { cn } from "cn";
import { LEARNING_AREAS } from "./curriculum-data";
import { GRADIENT_TEXT, SectionHeader } from "./section-header";

// Six learning-area structures (not courses), laid out as an editorial list with large numerals.
export function CurriculumAreas() {
  return (
    <section id="curriculum-areas" aria-labelledby="curriculum-areas-heading" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1800px]">
        <div className="rounded-[2.5rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-14 lg:px-12 lg:py-16 xl:px-16">
          <SectionHeader
            id="curriculum-areas-heading"
            eyebrow="Learning Areas"
            title={
              <>
                What Learning Can <span className={cn("inline-block", GRADIENT_TEXT)}>Be Built Around.</span>
              </>
            }
          >
            Broad structures that a curriculum can be organised around, rather than individual courses.
          </SectionHeader>

          <ol className="mt-10 grid gap-x-12 lg:mt-12 lg:grid-cols-2 xl:gap-x-20">
            {LEARNING_AREAS.map((a) => {
              const Icon = a.icon;
              return (
                <li key={a.number} className="group flex gap-5 border-t border-primary/15 py-6 transition-colors duration-300 hover:border-primary sm:gap-6 sm:py-8">
                  <span
                    aria-hidden="true"
                    className="w-14 shrink-0 text-4xl font-semibold tracking-tight text-primary/25 transition-colors duration-300 group-hover:text-primary sm:w-16 sm:text-5xl"
                  >
                    {a.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <Icon
                        className="size-5 shrink-0 text-brand-green transition-transform duration-300 motion-safe:group-hover:scale-110"
                        aria-hidden="true"
                      />
                      <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{a.title}</h3>
                    </div>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">{a.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
