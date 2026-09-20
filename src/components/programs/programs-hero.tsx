export function ProgramsHero() {
  return (
    <section className="px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-12">
      <div className="mx-auto max-w-[1800px]">
        <div className="rounded-[2.5rem] border border-primary/10 bg-muted/50 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            Our Programs
          </div>

          <h1 className="mt-4 max-w-5xl text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl xl:text-6xl">
            <span className="block text-balance">Learn Skills. Build Work.</span>{" "}
            <span className="block bg-gradient-to-r from-primary to-brand-green bg-clip-text text-transparent">
              Move Forward.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Explore practical learning programs designed to help you develop real skills, create
            meaningful work and build a foundation for your next opportunity.
          </p>
        </div>
      </div>
    </section>
  );
}
