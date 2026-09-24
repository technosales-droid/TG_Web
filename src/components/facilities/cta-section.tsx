import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Media } from "./media";
import type { MediaItem } from "@/data/institute";

const CTA_MEDIA: MediaItem = { kind: "image", src: null, label: "Institute image" };

/** Closing call-to-action: copy and buttons on one side, an institute image placeholder on the other. */
export function CtaSection({
  eyebrow = "Start your journey",
  heading = ["Ready to Learn, ", "Build and Grow?"],
  text = "Explore our programs, visit the institute and find the learning path that fits your goals.",
  primary = { label: "Enquire Now", href: "/contact" },
  secondary = { label: "Explore Programs", href: "/programs" },
}: {
  eyebrow?: string;
  heading?: [string, string];
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section aria-labelledby="fc-cta-heading" className="px-4 pt-4 pb-16 sm:px-6 sm:pb-24">
      <Reveal>
        <div className="mx-auto grid max-w-[1800px] overflow-hidden rounded-[2.5rem] bg-[#0a6a8f] text-white lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          <div className="px-6 py-14 sm:px-12 sm:py-20 xl:px-20 xl:py-24">
            <div className="flex items-center gap-2 text-sm font-medium tracking-[0.2em] text-white/80 uppercase">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              {eyebrow}
            </div>
            <h2 id="fc-cta-heading" className="mt-5 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl xl:text-6xl">
              {heading[0]}<span className="bg-gradient-to-r from-[#8fd3f0] to-brand-green bg-clip-text text-transparent">{heading[1]}</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {text}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href={primary.href}
                className={cn(buttonVariants({ variant: "default" }), "group h-12 gap-2 rounded-full bg-white px-7 text-base font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-lg motion-reduce:transition-none")}
              >
                {primary.label}
                <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href={secondary.href}
                className="inline-flex h-12 items-center rounded-full border border-white/50 px-7 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {secondary.label}
              </Link>
            </div>
          </div>
          <div className="relative min-h-64 lg:min-h-full">
            <Media item={CTA_MEDIA} sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
