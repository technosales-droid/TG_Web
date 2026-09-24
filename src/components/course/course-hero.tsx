import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Layers } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import type { CourseDetail } from "@/data/course-details";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function CourseHero({ course: c }: { course: CourseDetail }) {
  const facts = [
    c.level && `Level: ${c.level}`,
    c.duration && `Duration: ${c.duration}`,
    c.learningMode && c.learningMode,
    c.location,
  ].filter(Boolean) as string[];

  return (
    <section aria-labelledby="course-title" className="relative -mt-[5.25rem] bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-[#0a6a8f] px-4 pt-[7.5rem] pb-12 text-white sm:px-6 sm:pb-16">
      <div className="mx-auto grid max-w-[1350px] gap-10 xl:px-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-14">
        <div>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-white/75">
            <Link href="/programs" className={cn("rounded transition-colors hover:text-white", FOCUS)}>Programs</Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <span aria-current="page" className="font-medium text-white">{c.title}</span>
          </nav>

          <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-brand-green uppercase">{c.category}</p>
          <h1 id="course-title" className="mt-3 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl xl:text-5xl">{c.title}</h1>
          {c.subtitle && <p className="mt-2 text-lg font-medium text-white/85">{c.subtitle}</p>}
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{c.description}</p>

          <p className="mt-5 text-sm font-medium text-white/70">{c.credibility}</p>
          <p className="mt-1 text-sm text-white/70">Taught by Techno Gurukul faculty</p>

          {facts.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {facts.map((f) => (
                <li key={f} className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-sm font-medium">{f}</li>
              ))}
            </ul>
          )}
        </div>

        <aside aria-label="Course preview" className="self-start overflow-hidden rounded-3xl bg-card text-foreground shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
          <div className="relative aspect-video bg-gradient-to-br from-[#0d5674] to-primary">
            {c.heroImage ? (
              <Image src={c.heroImage} alt={c.heroAlt} fill priority sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
            ) : (
              <Layers aria-hidden="true" className="absolute top-1/2 left-1/2 size-14 -translate-x-1/2 -translate-y-1/2 text-white/30" strokeWidth={1.25} />
            )}
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold tracking-tight">Start building real skills</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">Talk to Techno Gurukul about this course and the next step.</p>
            <div className="mt-5 grid gap-3">
              <Link href="/contact" className={cn(buttonVariants({ variant: "default" }), "h-12 w-full rounded-full text-base font-semibold")}>Enquire Now</Link>
              <Link href="/contact" className="inline-flex h-12 w-full items-center justify-center rounded-full border border-primary/30 text-base font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Apply for the Program</Link>
            </div>
            {c.note && <p className="mt-4 text-sm text-muted-foreground">{c.note}</p>}
          </div>
        </aside>
      </div>
    </section>
  );
}

export function CourseSnapshot({ course: c }: { course: CourseDetail }) {
  const items = [
    { label: "Duration", value: c.duration },
    { label: "Level", value: c.level },
    { label: "Projects", value: c.projectCount !== undefined ? String(c.projectCount) : undefined },
    { label: "Certificate", value: c.certificate === undefined ? undefined : c.certificate ? "Yes" : "No" },
    { label: "Learning mode", value: c.learningMode },
    { label: "Location", value: c.location },
  ].filter((i): i is { label: string; value: string } => Boolean(i.value));
  if (!items.length) return null;

  return (
    <section aria-label="Course snapshot" className="px-4 pt-8 sm:px-6">
      <dl className="mx-auto grid max-w-[1350px] grid-cols-2 gap-x-6 gap-y-5 rounded-3xl border border-primary/15 bg-card px-6 py-6 sm:grid-cols-3 lg:grid-cols-6 xl:px-8">
        {items.map((i) => (
          <div key={i.label}>
            <dt className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">{i.label}</dt>
            <dd className="mt-1.5 text-base font-semibold text-foreground">{i.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
