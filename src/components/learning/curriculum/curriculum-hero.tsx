import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { GRADIENT_TEXT } from "./section-header";

const OUTLINE_ROWS = ["w-4/5", "w-3/5", "w-2/3", "w-1/2"];

// Abstract curriculum outline (decorative): four rows that grow in emphasis, the last one lit.
function OutlineVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-3 translate-x-3 translate-y-3 rounded-[2rem] border border-primary/15 bg-primary/5" />
      <div className="relative rounded-[2rem] border border-primary/10 bg-card p-6 shadow-[0_28px_56px_-32px_rgba(16,20,28,0.35)] motion-safe:animate-[gentle-float_8s_ease-in-out_infinite] sm:p-8">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-primary/25" />
          <span className="size-2.5 rounded-full bg-brand-green/40" />
          <span className="ml-2 h-2.5 w-24 rounded-full bg-primary/15" />
        </div>
        <div className="mt-6 grid gap-5">
          {OUTLINE_ROWS.map((w, i) => (
            <div key={i} className="flex items-center gap-4">
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  i === 3 ? "bg-brand-green text-white" : "bg-primary text-primary-foreground"
                )}
              >
                0{i + 1}
              </span>
              <span className="grid flex-1 gap-2">
                <span className={cn("h-2.5 rounded-full", w, i === 3 ? "bg-brand-green/40" : "bg-primary/20")} />
                <span className="h-2 w-1/3 rounded-full bg-muted" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CurriculumHero() {
  return (
    <section className="px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-12">
      <div className="mx-auto max-w-[1800px]">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 lg:min-h-[560px] lg:px-12 lg:py-14 xl:px-16">
          <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[50%] lg:block">
            <div className="absolute inset-0 bg-primary/8 [clip-path:polygon(16%_0%,100%_0%,100%_100%,0%_100%)]" />
            <div className="absolute inset-0 bg-brand-green/10 [clip-path:polygon(62%_0%,100%_0%,100%_45%)]" />
          </div>

          <div className="relative grid items-center gap-10 lg:min-h-[440px] lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12 xl:gap-20">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Curriculum
              </div>
              <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl xl:text-6xl">
                <span className="block">Learn With Structure.</span>
                <span className={cn("block", GRADIENT_TEXT)}>Build With Purpose.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Explore how Techno Gurukul organises learning into structured topics, practical work and progressive
                skill development.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href="/programs"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "h-11 rounded-full px-6 text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                  )}
                >
                  Explore Programs
                </Link>
                <Link
                  href="/learning/how-we-teach"
                  className="group flex items-center gap-1 rounded-full text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  How We Teach
                  <ChevronRight
                    className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
            <OutlineVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
