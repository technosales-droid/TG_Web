import { SectionHeader } from "@/components/ui/section-header";

const STAGES = [
  { name: "Learn", text: "Understand the concepts and tools relevant to your chosen area." },
  { name: "Practise", text: "Strengthen your skills through guided application and repetition." },
  { name: "Build", text: "Create projects that demonstrate practical ability." },
  { name: "Show", text: "Organise your work into a portfolio and supporting documentation." },
  { name: "Prepare", text: "Develop the communication and interview skills needed to discuss your work." },
];

export function CareerJourney() {
  return (
    <section aria-labelledby="career-journey-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <div className="rounded-[2rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
          <SectionHeader id="career-journey-heading" eyebrow="The Journey" title="A Practical Path Toward Career Readiness" />

          <ol className="relative mt-10 grid gap-6 xl:grid-cols-5 xl:gap-5">
            {/* Connecting line: vertical on small screens, horizontal on desktop */}
            <span aria-hidden="true" className="absolute top-2 bottom-2 left-[15px] w-px bg-primary/20 xl:top-[15px] xl:right-[10%] xl:bottom-auto xl:left-[10%] xl:h-px xl:w-auto" />
            {STAGES.map((s, i) => (
              <li key={s.name} className="relative grid grid-cols-[auto_1fr] gap-x-4 xl:block">
                <span
                  aria-hidden="true"
                  className={
                    "relative z-10 flex size-8 items-center justify-center rounded-full border-2 text-xs font-bold xl:mx-auto " +
                    (i === STAGES.length - 1
                      ? "border-brand-green bg-brand-green text-white"
                      : "border-primary/40 bg-card text-primary")
                  }
                 />
                <div className="xl:mt-4 xl:text-center">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">{s.name}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-muted-foreground xl:mx-auto xl:max-w-[16rem]">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
