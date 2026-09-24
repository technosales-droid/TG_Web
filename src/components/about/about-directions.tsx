import Image from "next/image";
import { BookOpen, Briefcase, Hammer, Repeat, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "cn";
import { Reveal } from "@/components/ui/reveal";

// Each step sits higher than the last on wide screens: growth towards readiness, not a promise of an outcome.
// The photographs are existing project assets.
const READINESS: { step: string; text: string; Icon: LucideIcon; image: string }[] = [
  { step: "Learn", text: "Understand the concepts and why they matter.", Icon: BookOpen, image: "/brand/practice-work.jpg" },
  { step: "Practise", text: "Strengthen skills through guided repetition.", Icon: Repeat, image: "/brand/practise.jpg" },
  { step: "Build", text: "Apply what you know in practical projects.", Icon: Hammer, image: "/brand/build.jpg" },
  { step: "Portfolio", text: "Turn finished work into visible evidence.", Icon: Briefcase, image: "/brand/experiments.jpg" },
  { step: "Career Preparation", text: "Learn to explain, present and discuss your work.", Icon: Rocket, image: "/brand/show.jpg" },
];

/** The flow from learning to career readiness. */
export function AboutDirections() {
  return (
    <section aria-labelledby="ab-readiness-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-[#0a6a8f] px-6 py-12 text-white sm:px-10 sm:py-14 xl:px-16 xl:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-32 -z-10 size-[30rem] rounded-full border border-white/10" />

          <Reveal className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-medium tracking-[0.2em] text-white/80 uppercase">
              <span className="size-1.5 rounded-full bg-brand-sky" aria-hidden="true" />
              Learning to career readiness
            </div>
            <h2 id="ab-readiness-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
              Learning Should Prepare You to{" "}
              <span className="bg-gradient-to-r from-[#8fd3f0] to-brand-sky bg-clip-text text-transparent">Show What You Can Do.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
              Practical learning becomes more useful when learners can turn their work into evidence, organise that evidence
              and prepare to communicate it clearly.
            </p>
          </Reveal>

          <ol aria-label="Learn, practise, build, portfolio, career preparation" className="mt-12 grid gap-3 lg:mt-16 lg:h-[26rem] lg:grid-cols-5 lg:items-end lg:gap-4">
            {READINESS.map(({ step, text, Icon, image }, i) => {
              const last = i === READINESS.length - 1;
              return (
                <li key={step} style={{ "--step": `${58 + i * 10.5}%` } as React.CSSProperties} className="lg:h-[var(--step)]">
                  <Reveal delay={i * 90} className="h-full">
                    <div className="group relative isolate flex h-full min-h-64 flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-white/15 p-6 transition-transform duration-300 motion-safe:hover:-translate-y-1 motion-reduce:transition-none">
                      <Image
                        src={image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 20vw, 100vw"
                        className="-z-20 object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-110 motion-reduce:transition-none"
                      />
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-0 -z-10",
                          last
                            ? "bg-gradient-to-t from-[#0a6a8f]/95 via-brand-sky/55 to-primary/30"
                            : "bg-gradient-to-t from-[#062c3d]/95 via-[#0a4a66]/65 to-[#0a4a66]/25"
                        )}
                      />
                      <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-sm">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold tracking-tight">{step}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/85">{text}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
