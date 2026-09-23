import { cn } from "cn";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";
import { TEACHING_MODEL } from "./how-we-teach-data";

// One continuous method: a single rail with five nodes on it, and open text beneath. Horizontal from
// lg; a vertical rail below that.
export function TeachingModel() {
  return (
    <section id="teaching-model" aria-labelledby="teaching-model-heading" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1800px]">
        <SectionHeader
          id="teaching-model-heading"
          eyebrow="Our Teaching Model"
          title={
            <>
              The Lesson Is <span className={cn("inline-block", GRADIENT_TEXT)}>Only the Beginning.</span>
            </>
          }
        >
          Understanding a concept is important. Being able to use it is what turns learning into a practical skill.
        </SectionHeader>

        <ol aria-label="The five stages of the teaching model" className="relative mt-12 grid gap-8 lg:mt-16 lg:grid-cols-5 lg:gap-6">
          {/* Rail (decorative) */}
          <span aria-hidden="true" className="absolute hidden rounded-full bg-gradient-to-r from-primary/30 to-brand-green/60 lg:top-[0.95rem] lg:right-3 lg:left-3 lg:block lg:h-1" />

          {TEACHING_MODEL.map((s, i) => {
            const last = i === TEACHING_MODEL.length - 1;
            return (
              <li key={s.number} className="group relative min-w-0 pl-12 lg:pt-12 lg:pl-0">
                {!last && (
                  <span aria-hidden="true" className="absolute top-8 -bottom-8 left-[0.95rem] w-1 rounded-full bg-gradient-to-b from-primary/30 to-primary/10 lg:hidden" />
                )}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-0 left-0 flex size-8 items-center justify-center rounded-full text-xs font-semibold ring-4 ring-background transition-transform duration-300 motion-safe:group-hover:scale-110",
                    last ? "bg-brand-green text-white" : "bg-primary text-primary-foreground"
                  )}
                >
                  {s.number}
                </span>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">{s.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{s.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
