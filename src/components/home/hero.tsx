import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const HERO_VIDEO_SRC: string | null = "/hero/hero-video.mp4";
const HERO_POSTER_SRC: string | null = null;

// `outline-solid` matters: the shared button style sets `outline-none`, which would otherwise cancel the ring.
const FOCUS = "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-background";

export function Hero() {
  return (
    <section className="px-4 pt-6 pb-10 sm:px-6 sm:pt-8 sm:pb-14">
      <div className="mx-auto max-w-[1800px]">
        <div className="relative isolate flex min-h-[560px] flex-col justify-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary px-6 py-14 sm:min-h-[640px] sm:px-10 sm:py-16 lg:min-h-[720px] lg:px-16 xl:min-h-[800px]">
          {/* Texture: a faint dot grid, consistent with the dark panels used across the rest of the site. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-40 -z-10 size-[34rem] rounded-full border border-white/10" />
          <div aria-hidden="true" className="pointer-events-none absolute -top-56 right-0 -z-10 size-[36rem] rounded-full border border-white/5" />

          {HERO_VIDEO_SRC && (
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={HERO_POSTER_SRC ?? undefined}
              className="absolute inset-0 -z-10 size-full object-cover"
            >
              <source src={HERO_VIDEO_SRC} type="video/mp4" />
            </video>
          )}

          {/* Readability overlay: sits above the video/gradient, below the content. */}
          <div aria-hidden="true" className="absolute inset-0 -z-[5] bg-gradient-to-t from-black/55 via-black/20 to-black/10" />

          <div className="relative max-w-4xl">
            <div className="flex items-center gap-2 text-sm font-medium text-white/80">
              <span className="size-1.5 rounded-full bg-brand-sky" aria-hidden="true" />
              Techno Gurukul
            </div>

            <h1 className="mt-5 max-w-3xl text-[2.25rem] leading-[1.05] font-semibold tracking-tight text-balance text-white min-[430px]:text-5xl sm:text-6xl lg:text-7xl xl:text-[5rem]">
              Learn. Create.
              <br />
              Build{" "}
              <span className="bg-gradient-to-r from-[#8fd3f0] to-brand-sky bg-clip-text text-transparent">What&rsquo;s Next.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Techno Gurukul is built around practical learning, helping students develop creative, technical and
              digital skills through hands-on education, real projects and industry-relevant tools.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/programs"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-12 rounded-full bg-white px-7 text-base text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-lg active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                  FOCUS
                )}
              >
                Explore Programs
              </Link>
              <Link
                href="/about"
                className={cn(
                  "group inline-flex h-12 items-center gap-1.5 rounded-full border-2 border-white/50 px-6 text-base font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                  FOCUS
                )}
              >
                Discover Techno Gurukul
                <ChevronRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
