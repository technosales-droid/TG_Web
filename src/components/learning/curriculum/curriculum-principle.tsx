// Closing statement before the CTA.
export function CurriculumPrinciple() {
  return (
    <section aria-label="Curriculum principle" className="px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1800px]">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-brand-green/25 bg-brand-green/8 px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-6 left-6 text-[9rem] leading-none font-semibold text-brand-green/15 select-none sm:left-10 sm:text-[12rem]"
          >
            &ldquo;
          </span>
          <blockquote className="relative mx-auto max-w-4xl text-center">
            <p className="text-2xl leading-snug font-semibold tracking-tight text-balance text-foreground sm:text-3xl lg:text-4xl">
              Good curriculum gives students a path to follow while leaving room to practise, experiment, improve and
              create.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
