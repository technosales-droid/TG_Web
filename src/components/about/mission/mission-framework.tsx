import { GRADIENT_TEXT } from "../../learning/curriculum/section-header";

const DIMENSIONS = [
  { title: "Understand", text: "Build clarity." },
  { title: "Apply", text: "Use the idea in practice." },
  { title: "Create", text: "Turn learning into something tangible." },
  { title: "Improve", text: "Learn from feedback and iteration." },
];

const STAGES = [
  { name: "Understand", text: "Develop a meaningful grasp of the underlying concepts." },
  { name: "Practise", text: "Use guided repetition and application to strengthen the skill." },
  { name: "Build", text: "Create work that demonstrates practical use." },
  { name: "Show", text: "Make the work understandable through presentation and documentation." },
  { name: "Prepare", text: "Develop the communication, reflection and professional habits needed for what comes next." },
];

/** Sections 2 and 3: the reason behind the mission, and the mission's five-stage framework (page's central anchor). */
export function MissionFramework() {
  return (
    <>
      <section aria-labelledby="ms-why-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Why This Matters
              </div>
              <h2 id="ms-why-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
                Learning Should Not <span className={GRADIENT_TEXT}>End With Knowing.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Knowing a concept is important. Being able to use it, explain it, apply it and improve through experience
                makes that knowledge more useful.
              </p>
              <p className="mt-6 border-l-2 border-brand-green pl-5 text-xl leading-snug font-medium tracking-tight text-foreground sm:text-2xl">
                The goal is not simply to complete lessons. The goal is to make learning usable.
              </p>
            </div>

            <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {DIMENSIONS.map((d, i) => (
                <li key={d.title} className="border-t-2 border-primary/25 py-5">
                  <span aria-hidden="true" className="text-sm font-semibold tracking-widest text-brand-green">
                    0{i + 1}
                  </span>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">{d.title}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{d.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="ms-framework-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary px-6 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
            <div className="flex items-center gap-2 text-sm font-medium text-background">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              The Mission Framework
            </div>
            <h2 id="ms-framework-heading" className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-background sm:text-4xl xl:text-5xl">
              Build Learners Who Can Move{" "}
              <span className="bg-gradient-to-r from-[#8fd3f0] to-brand-green bg-clip-text text-transparent">From Knowledge to Action.</span>
            </h2>

            <ol aria-label="Understand, practise, build, show, prepare" className="relative mt-10 grid gap-6 xl:grid-cols-5 xl:gap-5">
              <span aria-hidden="true" className="absolute top-2 bottom-2 left-[15px] w-px bg-background/25 xl:top-[15px] xl:right-[10%] xl:bottom-auto xl:left-[10%] xl:h-px xl:w-auto" />
              {STAGES.map((s, i) => (
                <li key={s.name} className="relative grid grid-cols-[auto_1fr] gap-x-4 xl:block">
                  <span
                    aria-hidden="true"
                    className={
                      "relative z-10 flex size-8 items-center justify-center rounded-full border-2 text-xs font-bold xl:mx-auto " +
                      (i === STAGES.length - 1 ? "border-brand-green bg-brand-green text-white" : "border-background/60 bg-[#0d5674] text-background")
                    }
                  >
                    {i + 1}
                  </span>
                  <div className="xl:mt-4 xl:text-center">
                    <h3 className="text-xl font-semibold tracking-tight text-background">{s.name}</h3>
                    <p className="mt-1.5 text-base leading-relaxed text-background/75 xl:mx-auto xl:max-w-[14rem]">{s.text}</p>
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
