import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-background focus-visible:ring-0";

// Abstract, decorative: layered blocks, a project frame and a four-step path. No photos, screenshots,
// certificates, statistics or logos. Everything is positioned in percentages inside its own box.
function BuildVisual() {
  return (
    <div aria-hidden="true" className="relative h-56 w-full sm:h-64 lg:h-80">
      <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] opacity-50" />
      <div className="absolute top-1/2 left-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green/20 blur-3xl sm:size-56" />

      {/* Layered blocks, building up to the right */}
      <div className="absolute bottom-[26%] left-[6%] h-[34%] w-[46%] rounded-2xl border border-background/15 bg-background/10" />
      <div className="absolute bottom-[34%] left-[16%] h-[34%] w-[46%] rounded-2xl border border-background/20 bg-background/15" />

      {/* Top layer: an abstract project frame */}
      <div className="absolute top-[8%] right-[6%] w-[58%] rounded-2xl border border-background/25 bg-background/20 p-3 shadow-[0_24px_40px_-24px_rgba(0,0,0,0.5)] motion-safe:animate-[gentle-float_7s_ease-in-out_infinite] sm:p-4">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-background/50" />
          <span className="size-2 rounded-full bg-brand-green/80" />
          <span className="ml-1 h-1.5 w-12 rounded-full bg-background/30" />
        </div>
        <div className="mt-3 h-12 rounded-lg bg-gradient-to-br from-background/30 to-brand-green/50 sm:h-16" />
        <div className="mt-3 grid gap-1.5">
          <span className="h-1.5 w-4/5 rounded-full bg-background/35" />
          <span className="h-1.5 w-3/5 rounded-full bg-background/25" />
        </div>
      </div>

      {/* Progression path: four connected nodes, the last one lit */}
      <div className="absolute right-[8%] bottom-[6%] left-[8%] flex items-center">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-1 items-center last:flex-none">
            <span
              className={cn(
                "size-3.5 shrink-0 rounded-full border-2 sm:size-4",
                i === 3 ? "border-brand-green bg-brand-green" : "border-background/60 bg-transparent"
              )}
            />
            {i < 3 && <span className="h-px flex-1 bg-background/35" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export function LearningFinalCta() {
  return (
    <section id="learning-final-cta" aria-labelledby="learning-final-cta-heading" className="px-4 pb-14 sm:px-6 sm:pb-16">
      <div className="mx-auto max-w-[1800px]">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-32 -z-10 size-[26rem] rounded-full border border-background/10" />

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-background/15 px-3 py-1.5 text-xs font-semibold text-background">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Ready to Keep Learning?
              </span>

              <h2
                id="learning-final-cta-heading"
                className="mt-5 text-3xl font-semibold tracking-tight text-balance text-background sm:text-4xl lg:text-5xl"
              >
                <span className="block">Learn by Doing.</span>
                <span className="block bg-gradient-to-r from-[#8fd3f0] to-brand-green bg-clip-text text-transparent">
                  Build What Comes Next.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-background/75 sm:text-lg">
                Explore a Techno Gurukul program, understand how it works, and start building practical skills through
                hands-on learning.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="/programs"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "group h-12 w-full rounded-full bg-background px-6 text-base text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-background/90 hover:shadow-lg active:translate-y-0 sm:w-auto",
                    FOCUS
                  )}
                >
                  Explore Programs
                  <ArrowUpRight
                    className="ml-1 size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
                <a
                  href="#learning-system"
                  className={cn(
                    "group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-background/60 px-6 text-base font-medium text-background transition-all duration-200 hover:-translate-y-0.5 hover:border-background hover:bg-background/10 active:translate-y-0 sm:w-auto",
                    FOCUS
                  )}
                >
                  Explore the Learning System
                  <ArrowDown
                    className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>

              <p className="mt-4 text-sm text-background/65">
                Start with the direction that fits what you want to build.
              </p>
            </div>

            <BuildVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
