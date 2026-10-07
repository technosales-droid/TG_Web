import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { HeroVideoCard } from "./hero-video-card";

const HERO_IMAGE_SRC = "/brand/index-hero.jpg";
// The people and the laptop sit in the right two-thirds of the photo; the left third is a plain dark wall, which is
// exactly where the text sits. This keeps that same framing however the image gets cropped at other hero shapes.
const HERO_IMAGE_POSITION = "72% 38%";

// `outline-solid` matters: the shared button style sets `outline-none`, which would otherwise cancel the ring.
const FOCUS = "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-background";

export function Hero() {
  return (
    <section className="px-4 pt-6 pb-10 sm:px-6 sm:pt-8 sm:pb-14">
      <div className="mx-auto max-w-[1800px]">
        <div className="relative isolate flex min-h-[560px] flex-col justify-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b1720] px-6 py-10 sm:min-h-[640px] sm:px-10 sm:py-16 lg:min-h-[720px] lg:px-16 xl:min-h-[800px]">
          <Image
            src={HERO_IMAGE_SRC}
            alt="A Techno Gurukul counsellor talking with a student and their parents"
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: HERO_IMAGE_POSITION }}
            className="-z-10 object-cover"
          />

          {/* Readability overlays: darkest over the text (left, and toward the bottom), fading out toward the
              photo's right side so the photograph itself stays visible, per the "no green UI, but leave real photo
              colour untouched" rule (there is none to touch here; this only ever darkens, never recolours). */}
          <div aria-hidden="true" className="absolute inset-0 -z-[5] bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
          <div aria-hidden="true" className="absolute inset-0 -z-[5] bg-gradient-to-t from-black/55 via-transparent to-transparent" />

          <div className="relative max-w-4xl">
            <div className="flex items-center gap-2 text-sm font-medium text-white/80">
              <span className="size-1.5 rounded-full bg-brand-sky" aria-hidden="true" />
              Techno Gurukul &middot; Nashik
            </div>

            <h1 className="mt-4 max-w-3xl text-[1.875rem] leading-[1.1] font-semibold tracking-tight text-balance text-white min-[430px]:text-5xl sm:mt-5 sm:text-6xl sm:leading-[1.05] lg:text-7xl xl:text-[5rem]">
              Learn. Create.
              <br />
              Build{" "}
              <span className="bg-gradient-to-r from-[#8fd3f0] to-brand-sky bg-clip-text text-transparent">What&rsquo;s Next.</span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-normal text-white/80 sm:mt-6 sm:leading-relaxed sm:text-lg">
              A Nashik-based institute for practical, hands-on learning, currently led by our Digital Marketing
              program and complemented by hands-on Game Development training.
            </p>

            <div className="mt-6 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="/programs"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-12 w-full rounded-full bg-white px-7 text-base text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-lg active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto",
                  FOCUS
                )}
              >
                Explore Programs
              </Link>
              <Link
                href="/about"
                className={cn(
                  "group inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-full border-2 border-white/50 px-6 text-base font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto",
                  FOCUS
                )}
              >
                Discover Techno Gurukul
                <ChevronRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>

            {/* Phone/tablet: part of the normal flow, below the CTAs, so it can never sit over the text. */}
            <div className="mt-6 max-w-[240px] motion-safe:animate-[course-promo-in_500ms_ease-out_200ms_both] sm:mt-8 sm:max-w-xs lg:hidden">
              <HeroVideoCard />
            </div>
          </div>

          {/* Desktop: floats over the photo's bottom-right corner, clear of the text and the CTAs. */}
          <div className="absolute right-10 bottom-9 z-10 hidden w-[320px] motion-safe:animate-[course-promo-in_500ms_ease-out_300ms_both] lg:block lg:right-14 xl:w-[380px]">
            <HeroVideoCard />
          </div>
        </div>
      </div>
    </section>
  );
}
