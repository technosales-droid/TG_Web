import Image from "next/image";
import Link from "next/link";
import { Award, BarChart3, Briefcase, ChevronRight, Clock, Hammer, Layers, MapPin, Monitor, Play, Star, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import type { CourseDetail, IncludeIcon } from "@/data/course-details";
import { FACULTY } from "@/data/institute";

export const INCLUDE_ICON: Record<IncludeIcon, LucideIcon> = {
  clock: Clock,
  mode: Monitor,
  place: MapPin,
  tools: Wrench,
  projects: Hammer,
  portfolio: Briefcase,
  practice: Hammer,
};

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/** Left of the header band: breadcrumb, category, title, description, instructor, rating area and metadata. */
export function CourseHeader({ course: c }: { course: CourseDetail }) {
  const instructor = c.instructor ? FACULTY.find((f) => f.slug === c.instructor?.facultySlug) : undefined;
  const meta = [
    c.level && { Icon: BarChart3, text: c.level },
    c.duration && { Icon: Clock, text: c.duration },
    c.learningMode && { Icon: Monitor, text: c.learningMode },
    c.curriculum.length > 0 && { Icon: Layers, text: `${c.curriculum.length} modules` },
    c.projectsCount !== undefined && { Icon: Hammer, text: `${c.projectsCount} projects` },
    c.certificate !== undefined && { Icon: Award, text: c.certificate ? "Certificate" : "No certificate" },
  ].filter(Boolean) as { Icon: LucideIcon; text: string }[];

  return (
    <div>
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-[#8fd3f0]">
        <Link href="/programs" className={cn("rounded hover:underline", FOCUS)}>Programs</Link>
        <ChevronRight className="size-3.5 text-white/60" aria-hidden="true" />
        <span className="text-white/80">{c.category}</span>
        <ChevronRight className="size-3.5 text-white/60" aria-hidden="true" />
        <span aria-current="page" className="text-white/80">{c.title}</span>
      </nav>

      <h1 id="course-title" className="mt-5 text-3xl leading-[1.15] font-semibold tracking-tight text-balance sm:text-4xl">{c.title}</h1>
      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-white/85">{c.subtitle ? `${c.subtitle}. ` : ""}{c.description}</p>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        {c.rating ? (
          <span className="flex items-center gap-1.5 font-semibold">
            <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
            {c.rating.value.toFixed(1)}
            <span className="font-normal text-white/70">({c.rating.count} ratings)</span>
          </span>
        ) : (
          <span className="text-white/70">Ratings will appear once learner feedback is collected</span>
        )}
        {c.students !== undefined && <span className="text-white/85">{c.students.toLocaleString()} learners</span>}
      </div>

      <p className="mt-3 text-sm text-white/85">
        Instructor: <span className="font-semibold text-[#8fd3f0]">{instructor?.name ?? "To be announced"}</span>
      </p>

      {meta.length > 0 && (
        <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/85">
          {meta.map(({ Icon, text }) => (
            <li key={text} className="flex items-center gap-1.5">
              <Icon className="size-4 text-white/70" aria-hidden="true" />
              {text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** The sticky card on the right: preview media, Apply Now / Enquire Now, and what the course includes. */
export function CourseCard({ course: c }: { course: CourseDetail }) {
  const highlights = c.includes.slice(0, 4);
  return (
    <aside aria-label="Course preview" className="overflow-hidden border border-primary/20 bg-card text-foreground shadow-[0_24px_48px_-24px_rgba(6,44,61,0.5)]">
      <div className="relative aspect-video bg-gradient-to-br from-[#0d5674] to-primary">
        {c.heroImage ? (
          <Image src={c.heroImage} alt={c.heroAlt} fill priority sizes="(min-width: 1024px) 23rem, 100vw" className="object-cover" />
        ) : (
          <Layers aria-hidden="true" className="absolute top-1/2 left-1/2 size-12 -translate-x-1/2 -translate-y-1/2 text-white/30" strokeWidth={1.25} />
        )}
        <span aria-hidden="true" className="absolute inset-0 bg-black/25" />
        <span aria-hidden="true" className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
          <Play className="size-6 translate-x-0.5 fill-[#062c3d] text-[#062c3d]" />
        </span>
        <span className="absolute inset-x-0 bottom-3 text-center text-sm font-semibold text-white">Preview this course</span>
      </div>

      <div className="p-5">
        <h2 className="text-xl font-semibold tracking-tight">Start building real skills</h2>
        <div className="mt-4 grid gap-2.5">
          <Link href="/contact" className={cn(buttonVariants({ variant: "default" }), "h-12 w-full rounded-none text-base font-semibold")}>Apply Now</Link>
          <Link href="/contact" className="inline-flex h-12 w-full items-center justify-center border border-primary text-base font-semibold text-primary transition-colors hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Enquire Now</Link>
        </div>
        {c.note && <p className="mt-3 text-center text-sm text-muted-foreground">{c.note}</p>}

        <h3 className="mt-5 text-base font-semibold">This course includes</h3>
        <ul className="mt-2 grid gap-2 text-sm text-foreground">
          {highlights.map(({ label, icon }) => {
            const Icon = INCLUDE_ICON[icon];
            return (
              <li key={label} className="flex items-start gap-2.5">
                <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                {label}
              </li>
            );
          })}
          <li className="flex items-start gap-2.5">
            <Award className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            {c.certificate === undefined ? "Ask an advisor about certification" : c.certificate ? "Certificate of completion" : "No certificate"}
          </li>
        </ul>
      </div>
    </aside>
  );
}
