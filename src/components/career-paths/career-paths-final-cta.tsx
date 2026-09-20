import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-background focus-visible:ring-0";

export function CareerPathsFinalCta() {
  return (
    <section aria-labelledby="career-paths-cta-heading" className="px-4 pb-14 sm:px-6 sm:pb-16">
      <div className="mx-auto max-w-[1800px]">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          {/* Decorative only: soft rings, a dot field and a few small floating dots. Clipped by the panel. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -right-24 -bottom-32 size-[26rem] rounded-full border border-background/10 sm:size-[32rem]" />
            <div className="absolute -right-4 -bottom-12 size-[16rem] rounded-full border border-background/10 sm:size-[20rem]" />
            <div className="absolute top-1/2 right-[12%] hidden size-40 -translate-y-1/2 rounded-full bg-brand-green/15 blur-2xl lg:block" />
            <div className="absolute inset-y-0 right-0 hidden w-1/2 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_left,black,transparent)] lg:block" />
            <span className="absolute top-8 right-10 size-2 rounded-full bg-brand-green/70 motion-safe:animate-[gentle-float_6s_ease-in-out_infinite]" />
            <span
              style={{ animationDelay: "1.4s" }}
              className="absolute right-1/3 bottom-8 hidden size-1.5 rounded-full bg-background/50 motion-safe:animate-[gentle-float_7s_ease-in-out_infinite] sm:block"
            />
            <span className="absolute top-12 left-[46%] hidden h-px w-10 bg-background/25 lg:block" />
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16 xl:gap-24">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-background/15 px-3 py-1.5 text-xs font-semibold text-background">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Your Next Step
              </span>

              <h2
                id="career-paths-cta-heading"
                className="mt-5 text-3xl font-semibold tracking-tight text-balance text-background sm:text-4xl lg:text-5xl"
              >
                <span className="block">Build Your Skills.</span>
                <span className="block text-brand-green">Choose Your Direction.</span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-background/75 sm:text-lg">
                Explore a Techno Gurukul program, build practical skills and start creating work you can take
                forward.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:max-w-sm lg:w-72">
              <Link
                href="/programs"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-12 w-full rounded-full bg-background px-6 text-base text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-background/90 hover:shadow-lg active:translate-y-0",
                  FOCUS
                )}
              >
                Explore Programs
                <ArrowUpRight className="ml-1 size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-background/60 px-6 text-base font-medium text-background transition-all duration-200 hover:-translate-y-0.5 hover:border-background hover:bg-background/10 active:translate-y-0",
                  FOCUS
                )}
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Talk to Techno Gurukul
              </Link>
              <p className="mt-1 text-center text-sm text-background/65 sm:text-left">
                Start with the skills you want to build.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
