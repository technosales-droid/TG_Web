import Link from "next/link";
import { Image as ImageIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const HERO_CARDS = [
  { value: "30 Months", label: "Flagship Program" },
  { value: "Unity + Unreal", label: "Game Development" },
  { value: "2D + 3D", label: "Game Art" },
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
        "absolute hidden w-44 rounded-2xl border border-primary/10 bg-card p-4 shadow-[0_12px_28px_-14px_rgba(16,20,28,0.25)] lg:block",
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
    <section className="px-3 pt-10 pb-16 sm:px-6 sm:pt-14 sm:pb-24">
      <div className="mx-auto max-w-7xl">
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

          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-accent sm:-inset-6"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-5 -right-5 -z-10 size-24 rounded-3xl bg-brand-green/15 sm:size-32"
            />

            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-primary/10 bg-muted">
              {/* HERO IMAGE PLACEHOLDER — FINAL ASSET WILL BE PROVIDED */}
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
                <ImageIcon className="size-10" aria-hidden="true" />
                <span className="text-sm">Hero image</span>
              </div>
            </div>

            <FloatingCard value={HERO_CARDS[0].value} label={HERO_CARDS[0].label} className="-left-10 top-10" />
            <FloatingCard value={HERO_CARDS[1].value} label={HERO_CARDS[1].label} className="-right-8 top-1/2 -translate-y-1/2" />
            <FloatingCard value={HERO_CARDS[2].value} label={HERO_CARDS[2].label} className="-left-6 -bottom-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
