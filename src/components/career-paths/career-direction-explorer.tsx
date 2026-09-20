import { Briefcase, ClipboardCheck, Clapperboard, Code2, Cpu, Info, Laptop, Lightbulb, Box, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "cn";
import { CAREER_AREAS, type CareerArea, type CareerDirection, type CareerIcon } from "@/data/career-directions";

const ICONS: Record<CareerIcon, LucideIcon> = {
  briefcase: Briefcase,
  laptop: Laptop,
  rocket: Rocket,
  code: Code2,
  lightbulb: Lightbulb,
  cube: Box,
  clapperboard: Clapperboard,
  cpu: Cpu,
  "clipboard-check": ClipboardCheck,
};

const TONE = {
  blue: {
    panel: "bg-primary/5 border-primary/15",
    bar: "bg-primary",
    dot: "before:bg-primary",
    icon: "bg-accent text-primary",
    label: "text-primary",
    pill: "bg-primary text-primary-foreground",
  },
  green: {
    panel: "bg-brand-green/8 border-brand-green/25",
    bar: "bg-brand-green",
    dot: "before:bg-brand-green",
    icon: "bg-brand-green/15 text-brand-green",
    label: "text-brand-green",
    pill: "bg-brand-green text-white",
  },
} as const;

const LABEL = "text-xs font-semibold tracking-widest text-muted-foreground uppercase";

function DirectionCard({ direction, tone }: { direction: CareerDirection; tone: CareerArea["tone"] }) {
  const t = TONE[tone];
  const Icon = ICONS[direction.icon];
  const { title, description, highlight, roles, skills, proof } = direction;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-primary/10 bg-card p-5 shadow-[0_12px_28px_-22px_rgba(16,20,28,0.3)] transition-all duration-300 hover:shadow-[0_20px_40px_-24px_rgba(16,20,28,0.35)] sm:p-6 motion-safe:hover:-translate-y-1">
      {/* Accent line: draws in on hover, always visible when motion is reduced */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 motion-reduce:scale-x-100",
          t.bar
        )}
      />

      <div className="flex items-center gap-3">
        <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-full", t.icon)}>
          <Icon
            className="size-5 transition-transform duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6"
            aria-hidden="true"
          />
        </span>
        <h4 className="min-w-0 text-xl font-semibold tracking-tight text-foreground [overflow-wrap:anywhere]">{title}</h4>
      </div>

      {description && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>}

      {highlight && (
        <div className="mt-4">
          <p className={LABEL}>{highlight.label}</p>
          {highlight.ordered ? (
            <ol className="mt-2 grid gap-1.5">
              {highlight.items.map((item, i) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                  <span
                    aria-hidden="true"
                    className={cn("flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold", t.pill)}
                  >
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          ) : (
            <ul className="mt-2 grid gap-1.5">
              {highlight.items.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                  <span aria-hidden="true" className={cn("size-1.5 shrink-0 rounded-full", t.bar)} />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {roles && (
        <div className="mt-4">
          <p className={LABEL}>Roles to explore</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {roles.map((role) => (
              <li
                key={role}
                className="rounded-full border border-primary/15 bg-background px-3 py-1 text-sm font-medium text-foreground [overflow-wrap:anywhere]"
              >
                {role}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Direction -> skills -> proof, joined by a rail */}
      <div className="mt-auto pt-5">
      <div className="grid gap-5 border-l-2 border-primary/15 pl-4">
        <div className={cn("relative before:absolute before:top-1 before:-left-[1.4rem] before:size-2.5 before:rounded-full", t.dot)}>
          <p className={LABEL}>Skills to build</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <li key={skill} className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground [overflow-wrap:anywhere]">
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div className={cn("relative before:absolute before:top-1 before:-left-[1.4rem] before:size-2.5 before:rounded-full", t.dot)}>
          <p className={LABEL}>Proof to show</p>
          <ul className="mt-2 grid gap-1.5">
            {proof.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-foreground">
                <span aria-hidden="true" className={cn("mt-2 size-1.5 shrink-0 rounded-full", t.bar)} />
                <span className="min-w-0 [overflow-wrap:anywhere]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </article>
  );
}

function AreaHeader({ area, headingId }: { area: CareerArea; headingId: string }) {
  const t = TONE[area.tone];
  return (
    <div>
      <span className={cn("inline-block rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide uppercase", t.pill)}>
        {area.eyebrow}
      </span>
      <h3 id={headingId} className="mt-4 text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl lg:text-4xl">
        {area.name}
      </h3>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{area.description}</p>
    </div>
  );
}

export function CareerDirectionExplorer() {
  const [marketing, games] = CAREER_AREAS;

  return (
    <section id="career-directions" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-16">
      <div className="mx-auto max-w-[1800px]">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            Career Directions
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            Build Skills. Explore Your Direction.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            The skills you develop can open different paths across digital, creative and technical work. Explore the
            kinds of roles and directions you can work toward as you build your experience and portfolio.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:mt-12">
          {/* Area 01: three strong directions side by side */}
          <section
            aria-labelledby={`area-${marketing.slug}`}
            className={cn("rounded-[2.5rem] border p-5 sm:p-8 lg:p-10", TONE[marketing.tone].panel)}
          >
            <AreaHeader area={marketing} headingId={`area-${marketing.slug}`} />
            <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3 [&>li:last-child:nth-child(odd)]:md:col-span-2 [&>li:last-child:nth-child(odd)]:lg:col-span-1">
              {marketing.directions.map((d) => (
                <li key={d.slug} className="min-w-0">
                  <DirectionCard direction={d} tone={marketing.tone} />
                </li>
              ))}
            </ul>
          </section>

          {/* Area 02: intro beside a richer grid of six directions */}
          <section
            aria-labelledby={`area-${games.slug}`}
            className={cn("rounded-[2.5rem] border p-5 sm:p-8 lg:p-10", TONE[games.tone].panel)}
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(0,400px)_minmax(0,1fr)]">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <AreaHeader area={games} headingId={`area-${games.slug}`} />
              </div>
              <ul className="grid gap-5 md:grid-cols-2">
                {games.directions.map((d) => (
                  <li key={d.slug} className="min-w-0">
                    <DirectionCard direction={d} tone={games.tone} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <p className="mt-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-primary/10 bg-muted/50 px-4 py-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <Info className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <span>
            These are possible directions, not guaranteed outcomes. Career paths can vary based on skills, portfolio
            quality, experience and the type of work you choose to pursue.
          </span>
        </p>
      </div>
    </section>
  );
}
