import Link from "next/link";
import { Image as ImageIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const HERO_CARDS = [
  { value: "30 Months", label: "Flagship Program", className: "left-2 top-6 sm:-left-6 sm:top-10" },
  { value: "Unity + Unreal", label: "Game Development", className: "right-2 top-1/2 -translate-y-1/2 sm:-right-8" },
  { value: "2D + 3D", label: "Game Art", className: "left-2 bottom-6 sm:-left-4 sm:bottom-10" },
] as const;

function FloatingCard({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className: string;
}) {
  return (
    <div
      className={cn(
        "absolute z-20 hidden w-44 rounded-2xl border border-primary/10 bg-card p-4 shadow-[0_12px_28px_-14px_rgba(16,20,28,0.3)] lg:block",
        className
      )}
    >
      <p className="text-base font-semibold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Two-tone diagonal backdrop, desktop only - the image (a transparent PNG)
          will sit directly on top of this so the geometry shows through around it. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 hidden lg:block">
        <div className="absolute inset-y-0 right-0 w-[58%] bg-brand-green/15 [clip-path:polygon(22%_0%,100%_0%,100%_100%,0%_100%)]" />
        <div className="absolute inset-y-0 right-0 w-[58%] bg-primary/12 [clip-path:polygon(58%_0%,100%_0%,100%_38%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-3 py-14 sm:px-6 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              Game Development &amp; Design
            </div>

            <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
              Turn Your Ideas Into Games You Can Build.
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Learn to design, develop and bring games to life — from your
              first concept to a playable, portfolio-ready experience.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/programs"
                className={cn(buttonVariants({ variant: "default" }), "h-11 rounded-full px-6 text-base")}
              >
                Explore Programs
              </Link>
              <Link
                href="/programs/tg-gameforge"
                className="text-base font-medium text-foreground underline-offset-4 hover:underline"
              >
                Explore GameForge
              </Link>
            </div>

            <p className="mt-4 text-xs font-medium tracking-wide text-muted-foreground">
              Learn. Build. Create.
            </p>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm lg:aspect-auto lg:h-[520px] lg:max-w-none">
            {/* HERO IMAGE PLACEHOLDER — FINAL ASSET WILL BE PROVIDED
                Final markup: <img src="..." className="absolute inset-0 h-full w-full object-contain object-bottom" />
                A transparent PNG here will reveal the diagonal backdrop above. */}
            <div className="flex h-full w-full flex-col items-center justify-end gap-2 rounded-[1.5rem] border-2 border-dashed border-primary/25 pb-8 text-muted-foreground lg:rounded-none lg:border-none">
              <ImageIcon className="size-10" aria-hidden="true" />
              <span className="text-sm">Hero image (transparent PNG)</span>
            </div>

            <FloatingCard value={HERO_CARDS[0].value} label={HERO_CARDS[0].label} className={HERO_CARDS[0].className} />
            <FloatingCard value={HERO_CARDS[1].value} label={HERO_CARDS[1].label} className={HERO_CARDS[1].className} />
            <FloatingCard value={HERO_CARDS[2].value} label={HERO_CARDS[2].label} className={HERO_CARDS[2].className} />
          </div>
        </div>
      </div>
    </section>
  );
}
