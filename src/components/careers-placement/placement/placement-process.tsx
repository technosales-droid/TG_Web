import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

const PILLARS = [
  { title: "Skills", text: "Build practical capability in the tools and concepts relevant to your chosen direction." },
  { title: "Projects", text: "Apply learning through projects that give you something concrete to discuss and demonstrate." },
  { title: "Portfolio", text: "Organise your work so another person can quickly understand what you built and what you contributed." },
  { title: "Communication", text: "Practise explaining your decisions, process and technical or creative thinking clearly." },
];

const CHAIN = [
  { name: "Skills", question: "What can you do?" },
  { name: "Projects", question: "What have you built?" },
  { name: "Portfolio", question: "What can someone see?" },
  { name: "Resume", question: "How clearly can you communicate your experience?" },
  { name: "Interview", question: "Can you explain your work and thinking?" },
];

/** Sections 2 and 3: what preparation means, then the cumulative evidence framework. */
export function PlacementProcess() {
  return (
    <>
      <section aria-labelledby="placement-process-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <SectionHeader
            id="placement-process-heading"
            eyebrow="The Process"
            title={
              <>
                Placement Preparation <span className={GRADIENT_TEXT}>Starts Before the Interview.</span>
              </>
            }
          >
            Being ready for professional opportunities means more than knowing course material. It means having useful
            skills, work you can demonstrate and the ability to communicate what you have learned.
          </SectionHeader>

          {/* Editorial list: ruled rows rather than boxed cards */}
          <ol className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {PILLARS.map((p) => (
              <li key={p.title} className="flex gap-5 border-t-2 border-primary/25 pt-5">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">{p.title}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="placement-framework-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
            <SectionHeader
              id="placement-framework-heading"
              eyebrow="Readiness Framework"
              title={
                <>
                  A Strong Placement Profile Is <span className={GRADIENT_TEXT}>Built From Evidence.</span>
                </>
              }
            >
              Each part builds on the one before it, so preparation is cumulative rather than a single step.
            </SectionHeader>

            <ol className="relative mt-10 grid gap-6 xl:grid-cols-5 xl:gap-5">
              <span aria-hidden="true" className="absolute top-2 bottom-2 left-[15px] w-px bg-primary/20 xl:top-[15px] xl:right-[10%] xl:bottom-auto xl:left-[10%] xl:h-px xl:w-auto" />
              {CHAIN.map((c, i) => (
                <li key={c.name} className="relative grid grid-cols-[auto_1fr] gap-x-4 xl:block">
                  <span
                    aria-hidden="true"
                    className={
                      "relative z-10 flex size-8 items-center justify-center rounded-full border-2 text-xs font-bold xl:mx-auto " +
                      (i === CHAIN.length - 1 ? "border-brand-green bg-brand-green text-white" : "border-primary/40 bg-card text-primary")
                    }
                   />
                  <div className="xl:mt-4 xl:text-center">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">{c.name}</h3>
                    <p className="mt-1.5 text-base leading-relaxed text-muted-foreground xl:mx-auto xl:max-w-[14rem]">{c.question}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
