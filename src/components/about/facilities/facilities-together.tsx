const STAGES = ["Learn", "Practise", "Build", "Show", "Prepare"];

/** Section 4: connecting the space and the people to the same Learn-to-Prepare system, on a dark teal panel. */
export function FacilitiesTogether() {
  return (
    <section aria-labelledby="fc-together-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary px-6 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-16">
          <div className="flex items-center gap-2 text-sm font-medium text-background">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            Space and People Together
          </div>
          <h2 id="fc-together-heading" className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-background sm:text-4xl xl:text-5xl">
            Together, They Support{" "}
            <span className="bg-gradient-to-r from-[#8fd3f0] to-brand-green bg-clip-text text-transparent">the Same Learning System.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-background/75 sm:text-lg">
            Neither the space nor the people work in isolation. Both exist to support the same path a learner moves
            through, from understanding a concept to preparing to explain it.
          </p>

          <ol aria-label="Learn, practise, build, show, prepare" className="mt-10 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-0">
            {STAGES.map((step, i) => (
              <li key={step} className="flex flex-1 flex-col items-stretch sm:flex-row sm:items-center">
                <span
                  className={
                    "flex min-h-14 flex-1 items-center justify-center rounded-2xl border px-3 py-3 text-center text-base font-semibold tracking-tight " +
                    (i === STAGES.length - 1 ? "border-transparent bg-gradient-to-r from-primary to-brand-green text-white" : "border-background/25 bg-background/10 text-background")
                  }
                >
                  {step}
                </span>
                {i < STAGES.length - 1 && (
                  <span aria-hidden="true" className="mx-auto h-3 w-px bg-background/25 sm:mx-2 sm:h-px sm:w-3" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
