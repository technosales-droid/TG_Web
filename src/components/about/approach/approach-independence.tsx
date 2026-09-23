import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const STAGES = [
  { name: "Show Me", text: "Understand the method or concept." },
  { name: "Let's Try", text: "Apply it together." },
  { name: "Try With Support", text: "Take more responsibility with guidance available." },
  { name: "Try Independently", text: "Make decisions and solve problems yourself." },
  { name: "Create Your Own", text: "Use the skill in a project or original piece of work." },
];

/** Section 5: the major guided-to-independent progression. */
export function ApproachIndependence() {
  return (
    <section aria-labelledby="ap-independence-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <SectionHeader
          id="ap-independence-heading"
          eyebrow="Guided to Independent"
          title={
            <>
              The Goal Is Not Permanent Guidance. <span className={GRADIENT_TEXT}>It Is Growing Independence.</span>
            </>
          }
        />

        <ol aria-label="Show me, let's try, try with support, try independently, create your own" className="relative mt-10 grid gap-6 xl:grid-cols-5 xl:gap-5">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[15px] w-px bg-primary/20 xl:top-[15px] xl:right-[10%] xl:bottom-auto xl:left-[10%] xl:h-px xl:w-auto" />
          {STAGES.map((s, i) => (
            <li key={s.name} className="relative grid grid-cols-[auto_1fr] gap-x-4 xl:block">
              <span
                aria-hidden="true"
                className={
                  "relative z-10 flex size-8 items-center justify-center rounded-full border-2 text-xs font-bold xl:mx-auto " +
                  (i === STAGES.length - 1 ? "border-brand-green bg-brand-green text-white" : "border-primary/40 bg-card text-primary")
                }
              >
                {i + 1}
              </span>
              <div className="xl:mt-4 xl:text-center">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">{s.name}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-muted-foreground xl:mx-auto xl:max-w-[13rem]">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
