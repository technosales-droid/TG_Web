import { GRADIENT_TEXT } from "../learning/curriculum/section-header";

const WHO = [
  { name: "Understand", text: "Build a strong foundation." },
  { name: "Practise", text: "Strengthen skills through repetition and guidance." },
  { name: "Build", text: "Apply learning through projects." },
  { name: "Show", text: "Turn work into visible evidence." },
  { name: "Prepare", text: "Develop the habits and communication needed for what comes next." },
];

const BELIEFS = [
  { title: "Learn by Understanding", text: "Build conceptual clarity before rushing into execution." },
  { title: "Learn by Practising", text: "Use repetition and guided application to strengthen skills." },
  { title: "Learn by Building", text: "Apply knowledge through real project work." },
  { title: "Learn by Reflecting", text: "Use feedback, mistakes and experience to improve." },
];

const STAGES = [
  { name: "Understand", text: "Know the concepts and why they matter." },
  { name: "Practise", text: "Work with the concepts repeatedly." },
  { name: "Apply", text: "Use them in practical situations." },
  { name: "Create", text: "Build something of your own." },
  { name: "Improve", text: "Review, refine and learn from the process." },
];

/** Sections 2, 3 and 4: who we are, what we believe, and knowledge-to-action (dark panel). */
export function AboutPhilosophy() {
  return (
    <>
      <section aria-labelledby="ab-who-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Who We Are
              </div>
              <h2 id="ab-who-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
                Built Around <span className={GRADIENT_TEXT}>Practical Learning.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Techno Gurukul focuses on learning that moves beyond simply completing lessons. The goal is to help learners
                understand concepts, practise them, apply them through projects and develop work they can actually explain
                and improve.
              </p>
              <p className="mt-6 border-l-2 border-brand-green pl-5 text-xl leading-snug font-medium tracking-tight text-foreground sm:text-2xl">
                Learning is not finished when the lesson ends. It is finished when you can use what you learned.
              </p>
            </div>

            <ol aria-label="Understand, practise, build, show, prepare" className="relative rounded-[2rem] border border-primary/15 bg-card px-5 py-6 sm:px-8 sm:py-8">
              <span aria-hidden="true" className="absolute top-10 bottom-10 left-[34px] w-px bg-primary/20 sm:left-[50px]" />
              {WHO.map((w, i) => (
                <li key={w.name} className="relative flex gap-4 py-3 sm:gap-5">
                  <span
                    aria-hidden="true"
                    className={
                      "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold " +
                      (i === WHO.length - 1 ? "border-brand-green bg-brand-green text-white" : "border-primary/40 bg-card text-primary")
                    }
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">{w.name}</h3>
                    <p className="mt-0.5 text-base leading-relaxed text-muted-foreground">{w.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="ab-belief-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Our Philosophy
              </div>
              <h2 id="ab-belief-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
                Learning Becomes More Valuable <span className={GRADIENT_TEXT}>When You Can Use It.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Understanding matters. Practice matters. But learning becomes especially useful when learners can apply what
                they know to a project, explain their decisions and improve through feedback.
              </p>
            </div>

            <ol className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
              {BELIEFS.map((b, i) => (
                <li key={b.title} className="border-t-2 border-primary/25 pt-5 xl:border-t-0 xl:border-l-2 xl:pt-0 xl:pl-6">
                  <span aria-hidden="true" className="text-sm font-semibold tracking-widest text-brand-green">
                    0{i + 1}
                  </span>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">{b.title}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{b.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="ab-action-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
        <div className="mx-auto max-w-[1800px] xl:px-8">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary px-6 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
            <div className="flex items-center gap-2 text-sm font-medium text-background">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              How We Think About Education
            </div>
            <h2 id="ab-action-heading" className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-background sm:text-4xl xl:text-5xl">
              Education Should Connect{" "}
              <span className="bg-gradient-to-r from-[#8fd3f0] to-brand-green bg-clip-text text-transparent">Knowledge With Action.</span>
            </h2>

            <ol aria-label="Understand, practise, apply, create, improve" className="relative mt-10 grid gap-6 xl:grid-cols-5 xl:gap-5">
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
