import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  GraduationCap,
  Laptop,
  Lightbulb,
  Sparkles,
  Star,
  Wrench,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const HERO_CARDS = [
  {
    icon: Wrench,
    title: "Practical Learning",
    detail: "Learn by Doing",
    tone: "accent" as const,
    className: "left-2 top-6 sm:-left-4 sm:top-10",
    delay: "0s",
  },
  {
    icon: Laptop,
    title: "Industry-Relevant Tools",
    detail: "Real-World Skills",
    tone: "green" as const,
    className: "right-2 top-6 sm:right-6 sm:top-16",
    delay: "0.8s",
  },
  {
    icon: Lightbulb,
    title: "Creative Skills",
    detail: "Turn Ideas Into Reality",
    tone: "green" as const,
    className: "left-2 top-1/2 -translate-y-1/2 sm:-left-8",
    delay: "1.6s",
  },
  {
    icon: GraduationCap,
    title: "Career Focused",
    detail: "Build Your Future",
    tone: "accent" as const,
    className: "right-2 bottom-10 sm:right-6",
    delay: "0.4s",
  },
] as const;

const CARD_TONE = {
  accent: "bg-accent text-primary",
  green: "bg-brand-green/15 text-brand-green",
} as const;

function FloatingCard({
  icon: Icon,
  title,
  detail,
  tone,
  className,
  delay,
}: {
  icon: typeof Wrench;
  title: string;
  detail: string;
  tone: "accent" | "green";
  className: string;
  delay: string;
}) {
  return (
    <div
      style={{ animationDelay: delay }}
      className={cn(
        "absolute z-20 hidden w-48 items-start gap-3 rounded-2xl border border-primary/10 bg-card p-4 shadow-[0_12px_28px_-14px_rgba(16,20,28,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-14px_rgba(16,20,28,0.35)] motion-safe:animate-[gentle-float_6s_ease-in-out_infinite] lg:flex",
        className
      )}
    >
      <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-full", CARD_TONE[tone])}>
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{detail}</p>
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden lg:min-h-[540px]">
      {/* Two-tone diagonal backdrop, desktop only - fills the full hero
          height so the image's bottom edge lands exactly on this shape's
          bottom edge (the "hero baseline"). */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 hidden lg:block">
        <div className="absolute inset-y-0 right-0 w-[58%] bg-brand-green/15 [clip-path:polygon(22%_0%,100%_0%,100%_100%,0%_100%)]" />
        <div className="absolute inset-y-0 right-0 w-[58%] bg-primary/12 [clip-path:polygon(58%_0%,100%_0%,100%_38%)]" />
      </div>

      {/* Decorative doodles, desktop only, subtle and slow */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 hidden lg:block">
        <Star className="absolute left-[46%] top-16 size-6 fill-primary/20 text-primary/30 motion-safe:animate-[pulse_5s_ease-in-out_infinite]" />
        <Sparkles className="absolute right-[6%] top-1/3 size-6 text-brand-green/40 motion-safe:animate-[pulse_4s_ease-in-out_infinite]" style={{ animationDelay: "1s" }} />
        <ChevronRight className="absolute right-[10%] bottom-24 size-8 -rotate-45 text-primary/25 motion-safe:animate-[pulse_6s_ease-in-out_infinite]" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="relative mx-auto w-full max-w-[1800px] px-4 pt-14 pb-8 sm:px-6 sm:pt-20 lg:pb-0">
        <div className="lg:max-w-[46%]">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            Techno Gurukul
          </div>

          <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
            Learn. Create.
            <br />
            Build{" "}
            <span className="bg-gradient-to-r from-primary to-brand-green bg-clip-text text-transparent">
              What&rsquo;s Next.
            </span>
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Techno Gurukul is built around practical learning — helping
            students develop creative, technical and digital skills
            through hands-on education, real projects and
            industry-relevant tools.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 pb-14 sm:pb-20 lg:pb-16">
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
              href="/about"
              className="group flex items-center gap-1 text-base font-medium text-foreground transition-colors hover:text-primary"
            >
              Discover Techno Gurukul
              <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hero image: in-flow on mobile/tablet, pinned to the section's
          bottom-right on desktop so the subjects' feet touch the baseline. */}
      <div className="relative mx-4 aspect-[16/11] sm:mx-6 lg:absolute lg:right-4 lg:bottom-0 lg:mx-0 lg:h-[500px] lg:aspect-auto lg:w-[calc(54%-2rem)]">
        <Image
          src="/hero/students.png"
          alt="Techno Gurukul students"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 90vw"
          className="object-contain object-bottom"
        />

        {HERO_CARDS.map((card) => (
          <FloatingCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}
