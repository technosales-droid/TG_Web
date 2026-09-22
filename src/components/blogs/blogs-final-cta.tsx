import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

// `outline-solid` matters: the shared button style sets `outline-none`, which would otherwise cancel the ring.
const FOCUS = "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-background focus-visible:ring-0";

export function BlogsFinalCta() {
  return (
    <section aria-labelledby="bl-final-cta-heading" className="px-4 pt-4 pb-14 sm:px-6 sm:pb-16">
      <div className="mx-auto max-w-[1800px]">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary px-6 py-10 sm:px-10 sm:py-12 xl:px-12 xl:py-14">
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-32 -z-10 size-[26rem] rounded-full border border-background/10" />
          <div aria-hidden="true" className="pointer-events-none absolute -top-48 right-1/4 -z-10 size-[30rem] rounded-full border border-background/5" />

          <div className="relative flex flex-col items-start gap-8 xl:flex-row xl:items-center xl:justify-between">
            <div className="max-w-xl">
              <h2 id="bl-final-cta-heading" className="text-3xl font-semibold tracking-tight text-balance text-background sm:text-4xl">
                Explore What&rsquo;s <span className="bg-gradient-to-r from-[#8fd3f0] to-brand-green bg-clip-text text-transparent">Already Here.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-background/75 sm:text-lg">
                While the Blogs library is empty, the programs and learning experience are ready to explore.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/programs"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "group h-12 w-full rounded-full bg-background px-6 text-base text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-background/90 hover:shadow-lg active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto",
                  FOCUS
                )}
              >
                Explore Programs
                <ArrowUpRight className="ml-1 size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
              <Link
                href="/learning"
                className={cn(
                  "group inline-flex h-12 w-full items-center justify-center gap-1 rounded-full border-2 border-background/60 px-6 text-base font-medium text-background transition-all duration-200 hover:-translate-y-0.5 hover:border-background hover:bg-background/10 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto",
                  FOCUS
                )}
              >
                Explore Learning
                <ChevronRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
