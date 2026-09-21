import { ArrowRight, GraduationCap, User } from "lucide-react";
import { cn } from "cn";
import { STATUS_LABEL, type Project, type ProjectStatus } from "@/data/projects";
import { MEDIA_ICON, MediaPreview } from "./project-media";
import { CREATOR_LABEL, mediaCount, sampleLabel, type ViewMode } from "./project-utils";

const MAX_TOPICS = 3;
const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export type OnView = (project: Project, opener: HTMLElement) => void;

/** Student and faculty work look different: faculty carries a deep navy badge and top edge. */
export function CreatorBadge({ project }: { project: Project }) {
  const faculty = project.creatorType === "faculty";
  const Icon = faculty ? GraduationCap : User;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-bold tracking-widest uppercase",
        faculty ? "bg-[#0b3d50] text-white" : "bg-primary/10 text-primary"
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {CREATOR_LABEL[project.creatorType]}
    </span>
  );
}

const STATUS_DOT: Record<ProjectStatus, string> = {
  completed: "bg-brand-green",
  "in-progress": "bg-amber-500",
  showcased: "bg-primary",
};

/** A quiet status marker. It says where the work is, never that it was delivered to anyone. */
export function StatusMark({ status }: { status: ProjectStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
      <span className={cn("size-1.5 rounded-full", STATUS_DOT[status])} aria-hidden="true" />
      <span className="sr-only">Status: </span>
      {STATUS_LABEL[status]}
    </span>
  );
}

/** Industry, program and course, grouped so the card reads as one block of context. */
function Context({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <div className={cn("border-l-2 border-primary/30 pl-3 text-sm leading-snug", compact ? "" : "mt-3")}>
      <p className="font-semibold text-foreground">
        {project.industry}
        <span className="font-normal text-muted-foreground" aria-hidden="true">
          {" "}
          ·{" "}
        </span>
        <span className="sr-only">, </span>
        <span className="font-medium text-primary">{project.projectType}</span>
      </p>
      <p className="mt-0.5 text-muted-foreground">
        {project.program}
        {project.course && !compact && (
          <>
            <span aria-hidden="true"> · </span>
            <span className="sr-only">, </span>
            {project.course}
          </>
        )}
      </p>
    </div>
  );
}

function Topics({ topics, max = MAX_TOPICS }: { topics: string[]; max?: number }) {
  const extra = topics.length - max;
  return (
    <ul aria-label="Topics" className="flex flex-wrap gap-1.5">
      {topics.slice(0, max).map((t) => (
        <li key={t} className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
          {t}
        </li>
      ))}
      {extra > 0 && <li className="px-1 py-0.5 text-xs font-medium text-muted-foreground">+{extra}</li>}
    </ul>
  );
}

/** Media indicators: the media types in this project and a short count such as "1 PDF · 1 spreadsheet". */
export function MediaIndicators({ project }: { project: Project }) {
  const types = [...new Set(project.media.map((m) => m.type))].slice(0, 4);
  return (
    <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
      <span className="flex gap-1" aria-hidden="true">
        {types.map((t) => {
          const Icon = MEDIA_ICON[t];
          return <Icon key={t} className="size-3.5 text-primary" />;
        })}
      </span>
      <span>
        <span className="sr-only">Media: </span>
        {mediaCount(project)}
      </span>
    </p>
  );
}

function ViewButton({ project, onView, className }: { project: Project; onView: OnView; className?: string }) {
  return (
    <button
      type="button"
      onClick={(e) => onView(project, e.currentTarget)}
      className={cn(
        "group/btn inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90",
        FOCUS,
        className
      )}
    >
      View Project
      <span className="sr-only">: {project.title}</span>
      <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover/btn:translate-x-0.5" aria-hidden="true" />
    </button>
  );
}

export function ProjectCard({ project, view, onView }: { project: Project; view: ViewMode; onView: OnView }) {
  const faculty = project.creatorType === "faculty";
  const frame = cn(
    "group overflow-hidden rounded-xl border bg-card transition-all duration-300 motion-safe:hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-26px_rgba(16,20,28,0.45)]",
    faculty ? "border-[#0b3d50]/25 hover:border-[#0b3d50]/50" : "border-primary/15 hover:border-primary/35"
  );
  const media = project.media[0];
  const alt = `${project.title}: ${media.label}`;

  if (view === "list") {
    return (
      <article className={cn(frame, "flex", faculty && "border-l-[3px] border-l-[#0b3d50]")}>
        <div className="w-28 shrink-0 sm:w-52">
          <MediaPreview media={media} alt={alt} fill compact className="rounded-none" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2 p-3 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <CreatorBadge project={project} />
            <StatusMark status={project.status} />
          </div>
          <div className="min-w-0">
            <h3 className="text-base leading-snug font-semibold tracking-tight text-foreground [overflow-wrap:anywhere] sm:text-lg">{project.title}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{sampleLabel(project)}</p>
          </div>
          <p className="line-clamp-1 text-sm text-muted-foreground sm:line-clamp-2">{project.shortDescription}</p>
          <div className="hidden sm:block">
            <Context project={project} compact />
          </div>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-1">
            <MediaIndicators project={project} />
            <ViewButton project={project} onView={onView} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={cn(frame, "flex h-full flex-col border-t-[3px]", faculty ? "border-t-[#0b3d50]" : "border-t-primary/50")}>
      <MediaPreview media={media} alt={alt} className="rounded-none" />
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <CreatorBadge project={project} />
          <StatusMark status={project.status} />
        </div>
        <h3 className="mt-3 text-xl leading-snug font-semibold tracking-tight text-foreground [overflow-wrap:anywhere]">{project.title}</h3>
        <p className="mt-0.5 text-xs font-medium text-muted-foreground">{sampleLabel(project)}</p>
        <Context project={project} />
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{project.shortDescription}</p>
        <div className="mt-3 mb-4">
          <Topics topics={project.topics} />
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-primary/10 pt-4">
          <MediaIndicators project={project} />
          <ViewButton project={project} onView={onView} />
        </div>
      </div>
    </article>
  );
}

/** The spotlight: a large media canvas beside the project information. */
export function FeaturedProject({ project, onView }: { project: Project; onView: OnView }) {
  const faculty = project.creatorType === "faculty";
  return (
    <article
      className={cn(
        "group grid overflow-hidden rounded-2xl border bg-card lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]",
        faculty ? "border-[#0b3d50]/30" : "border-primary/20"
      )}
    >
      <div className="bg-muted/60 p-3 sm:p-5">
        <MediaPreview
          media={project.media[0]}
          alt={`${project.title}: ${project.media[0].label}`}
          large
          className="w-full rounded-lg lg:aspect-auto lg:h-full lg:min-h-80"
        />
      </div>

      <div className="flex flex-col p-5 sm:p-8">
        <p className="text-xs font-bold tracking-widest text-brand-green uppercase">Featured Project</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
          <CreatorBadge project={project} />
          <span className="text-xs font-medium text-muted-foreground">{sampleLabel(project)}</span>
          <StatusMark status={project.status} />
        </div>
        <h3 className="mt-4 text-2xl leading-tight font-semibold tracking-tight text-foreground [overflow-wrap:anywhere] sm:text-3xl">{project.title}</h3>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">{project.shortDescription}</p>

        <dl className="mt-5 grid gap-x-6 gap-y-3 border-l-2 border-primary/30 pl-4 sm:grid-cols-2">
          {[
            ["Industry", project.industry],
            ["Project type", project.projectType],
            ["Program", project.program],
            ["Course", project.course],
          ]
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <div key={k} className="min-w-0">
                <dt className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">{k}</dt>
                <dd className="mt-0.5 text-sm font-medium text-foreground [overflow-wrap:anywhere]">{v}</dd>
              </div>
            ))}
        </dl>

        <div className="mt-4">
          <Topics topics={project.topics} max={6} />
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-6">
          <MediaIndicators project={project} />
          <ViewButton project={project} onView={onView} className="min-h-11 px-5 text-base" />
        </div>
      </div>
    </article>
  );
}
