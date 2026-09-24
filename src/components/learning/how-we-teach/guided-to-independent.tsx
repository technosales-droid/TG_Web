import { cn } from "cn";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";
import { INDEPENDENCE_STAGES } from "./how-we-teach-data";

// Each stage carries a split bar: guidance (blue) shrinks and student-led work (green) grows.
// The bar is a picture only. Guidance never disappears: support stays available at every stage.
export function GuidedToIndependent() {
  return (
    <section id="learning-independence" aria-labelledby="learning-independence-heading" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1800px]">
        <div className="rounded-[2.5rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-14 lg:px-12 lg:py-16 xl:px-16">
          <SectionHeader
            id="learning-independence-heading"
            eyebrow="Learning Independence"
            title={
              <>
                <span className="block">Start With Guidance.</span>
                <span className={cn("block", GRADIENT_TEXT)}>Grow Into Independence.</span>
              </>
            }
          >
            Support stays available at every stage. What changes is how much of the work students lead.
          </SectionHeader>

          <ol aria-label="From guided learning to project ownership" className="mt-10 grid gap-4 lg:mt-12">
            {INDEPENDENCE_STAGES.map((s) => (
              <li
                key={s.title}
                className="group grid gap-4 rounded-3xl border border-primary/10 bg-card p-5 transition-all duration-300 hover:shadow-[0_18px_36px_-22px_rgba(16,20,28,0.35)] motion-safe:hover:-translate-y-0.5 sm:p-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-10"
              >
                <div className="flex flex-col items-start gap-1 sm:flex-row sm:gap-4">
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{s.title}</h3>
                    <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{s.description}</p>
                  </div>
                </div>

                <div aria-hidden="true" className="flex h-3 overflow-hidden rounded-full bg-muted">
                  <span className="bg-primary transition-all duration-500" style={{ width: `${s.guided}%` }} />
                  <span className="bg-brand-green transition-all duration-500" style={{ width: `${100 - s.guided}%` }} />
                </div>
              </li>
            ))}
          </ol>

          <p aria-hidden="true" className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><span className="size-3 rounded-full bg-primary" />Guidance and support</span>
            <span className="flex items-center gap-2"><span className="size-3 rounded-full bg-brand-green" />Student-led work</span>
          </p>
        </div>
      </div>
    </section>
  );
}
