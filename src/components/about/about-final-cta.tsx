import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

// `outline-solid` matters: the shared button style sets `outline-none`, which would otherwise cancel the ring.
const FOCUS = "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-background focus-visible:ring-0";
const STEPS = ["Learn", "Build", "Prepare"];

// Abstract and decorative: a project frame and a three-step path. No company, offer, statistic or logo.
function PathVisual() {
  return (
    <div aria-hidden="true" className="relative h-52 w-full sm:h-60 xl:h-64 xl:min-w-0 xl:flex-1">
      <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] opacity-40" />
      <div className="absolute top-1/2 left-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green/20 blur-3xl sm:size-56" />
      <div className="absolute top-[8%] left-[10%] w-[58%] rounded-2xl border border-background/25 bg-background/20 p-3 shadow-[0_24px_40px_-24px_rgba(0,0,0,0.5)] sm:p-4">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-background/50" />
          <span className="size-2 rounded-full bg-brand-green/80" />
          <span className="ml-1 h-1.5 w-10 rounded-full bg-background/30" />
        </div>
        <div className="mt-3 h-10 rounded-lg bg-gradient-to-br from-background/30 to-brand-green/50 sm:h-14" />
        <div className="mt-3 grid gap-1.5">
          <span className="h-1.5 w-4/5 rounded-full bg-background/35" />
          <span className="h-1.5 w-3/5 rounded-full bg-background/25" />
        </div>
      </div>
      <div className="absolute top-[30%] right-[8%] h-[34%] w-[34%] rounded-2xl border border-background/20 bg-background/10" />
      <div className="absolute right-[8%] bottom-[8%] left-[8%] flex items-start">
        {STEPS.map((step, i) => (
          <div key={step} className="flex flex-1 items-start last:flex-none">
            <div className="flex flex-col items-start gap-1.5">
              <span className={cn("size-3.5 rounded-full border-2 sm:size-4", i === STEPS.length - 1 ? "border-brand-green bg-brand-green" : "border-background/60")} />
              <span className="text-[10px] font-semibold tracking-widest text-background/60 uppercase">{step}</span>
            </div>
            {i < STEPS.length - 1 && <span className="mt-[7px] h-px flex-1 bg-background/35 sm:mt-2" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AboutFinalCta() {
  return (
    <section aria-labelledby="ab-final-cta-heading" className="px-4 pt-4 pb-14 sm:px-6 sm:pb-16">
      <div className="mx-auto max-w-[1800px]">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary px-6 py-12 sm:px-10 sm:py-14 xl:min-h-[400px] xl:px-12 xl:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-32 -z-10 size-[26rem] rounded-full border border-background/10" />
          <div aria-hidden="true" className="pointer-events-none absolute -top-48 right-1/4 -z-10 size-[30rem] rounded-full border border-background/5" />

          <div className="relative grid items-center gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] xl:gap-8">
            <div>
              <h2 id="ab-final-cta-heading" className="text-3xl font-semibold tracking-tight text-balance text-background sm:text-4xl xl:text-5xl">
                Understand. Practise. Build.{" "}
                <span className="bg-gradient-to-r from-[#8fd3f0] to-brand-green bg-clip-text text-transparent">Keep Going.</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-background/75 sm:text-lg">
                Explore the programs, learning experience and career directions available at Techno Gurukul.
              </p>
            </div>

            <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:gap-8">
              <div className="xl:w-72 xl:shrink-0">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center xl:flex-col xl:items-stretch">
                  <Link
                    href="/programs"
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "group h-12 w-full rounded-full bg-background px-6 text-base text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-background/90 hover:shadow-lg active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto xl:w-full",
                      FOCUS
                    )}
                  >
                    Explore Programs
                    <ArrowUpRight className="ml-1 size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/learning"
                    className={cn(
                      "group inline-flex h-12 w-full items-center justify-center gap-1 rounded-full border-2 border-background/60 px-6 text-base font-medium text-background transition-all duration-200 hover:-translate-y-0.5 hover:border-background hover:bg-background/10 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto xl:w-full",
                      FOCUS
                    )}
                  >
                    Explore Learning
                    <ChevronRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
                <Link
                  href="/careers-placement"
                  className={cn("group mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-full text-sm font-medium text-background/80 transition-colors hover:text-background", FOCUS)}
                >
                  Explore Careers &amp; Placement
                  <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
              <PathVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
