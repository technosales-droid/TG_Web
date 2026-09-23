import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-background focus-visible:ring-0";

export function TeachingFinalCta() {
  return (
    <section aria-labelledby="teaching-cta-heading" className="px-4 pb-14 sm:px-6 sm:pb-16">
      <div className="mx-auto max-w-[1800px]">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -right-24 -bottom-32 size-[26rem] rounded-full border border-background/10 sm:size-[32rem]" />
            <div className="absolute top-1/2 right-[14%] hidden size-44 -translate-y-1/2 rounded-full bg-brand-green/15 blur-3xl lg:block" />
            <span className="absolute top-8 right-10 size-2 rounded-full bg-brand-green/70 motion-safe:animate-[gentle-float_6s_ease-in-out_infinite]" />
            <span className="absolute right-1/3 bottom-8 hidden size-1.5 rounded-full bg-background/50 sm:block motion-safe:animate-[gentle-float_7s_ease-in-out_infinite]" />
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-background/15 px-3 py-1.5 text-xs font-semibold text-background">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Ready to Learn by Doing?
              </span>
              <h2 id="teaching-cta-heading" className="mt-5 text-3xl font-semibold tracking-tight text-balance text-background sm:text-4xl lg:text-5xl">
                <span className="block">Choose a Direction.</span>
                <span className="block bg-gradient-to-r from-[#8fd3f0] to-brand-green bg-clip-text text-transparent">Start Building.</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-background/75 sm:text-lg">
                Explore a Techno Gurukul program and discover how practical learning can help you turn skills into
                work.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:max-w-sm lg:w-72">
              <Link
                href="/programs"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "group h-12 w-full rounded-full bg-background px-6 text-base text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-background/90 hover:shadow-lg active:translate-y-0",
                  FOCUS
                )}
              >
                Explore Programs
                <ArrowUpRight
                  className="ml-1 size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
