import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "./overview-ui";

const GRID =
  "[background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:48px_48px]";

export function LearningCta() {
  return (
    <section aria-labelledby="learning-cta-heading" className="px-4 pb-16 sm:px-6 sm:pb-24">
      <Reveal>
        <div className="relative mx-auto max-w-[1800px] overflow-hidden rounded-[2.5rem] bg-foreground px-6 py-16 text-background sm:px-12 sm:py-24 lg:px-20">
          <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", GRID)} />
          <div className="relative max-w-3xl">
            <Eyebrow light>Ready to keep learning?</Eyebrow>
            <h2 id="learning-cta-heading" className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl xl:text-6xl">
              Learn by Doing.
              <br />
              Build What Comes Next.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-background/75 sm:text-lg">
              Explore the Techno Gurukul learning system and discover how practical learning can turn knowledge into
              experience.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/programs"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "group min-h-12 gap-2 rounded-full bg-background px-7 text-base font-semibold text-foreground transition-colors duration-200 hover:bg-background/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background motion-reduce:transition-none"
                )}
              >
                Explore Programs
                <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/learning/how-we-teach"
                className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-background/30 px-7 text-base font-semibold text-background transition-colors hover:bg-background/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background motion-reduce:transition-none"
              >
                See How We Teach
                <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
