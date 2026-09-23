import { ProgramDiscovery } from "./program-discovery";

export function ProgramsDiscoverySection() {
  return (
    <section id="programs-listing" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-16">
      <div className="mx-auto max-w-[1800px]">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            Explore Our Programs
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            Choose a Skill.
            <br />
            Build Your Path.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Explore Techno Gurukul&rsquo;s programs and find the learning path that&rsquo;s relevant to you.
          </p>
        </div>

        <div className="mt-8 lg:mt-10">
          <ProgramDiscovery />
        </div>
      </div>
    </section>
  );
}
