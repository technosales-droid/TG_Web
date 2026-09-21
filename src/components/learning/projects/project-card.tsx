import { GraduationCap, User } from "lucide-react";
import { cn } from "cn";
import { MEDIA_LABEL, type Project } from "@/data/projects";
import { MediaPreview } from "./project-media";
import { creatorBadge } from "./project-utils";

const MAX_TOPICS = 4;
const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

/** Student and faculty work look different: faculty carries a deep accent and a "demonstration" note. */
export function CreatorBadge({ project }: { project: Project }) {
  const faculty = project.type === "faculty";
  const Icon = faculty ? GraduationCap : User;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        faculty ? "bg-[#0b3d50] text-background" : "bg-primary/10 text-primary"
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {creatorBadge(project)}
    </span>
  );
}

function mediaSummary(project: Project) {
  const types = [...new Set(project.media.map((m) => MEDIA_LABEL[m.type]))];
  return types.join(" · ");
}

export function ProjectCard({ project, onView }: { project: Project; onView: (p: Project) => void }) {
  const faculty = project.type === "faculty";
  const context = [project.program, project.course].filter(Boolean).join(" · ");

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-card shadow-[0_12px_28px_-22px_rgba(16,20,28,0.3)] transition-all duration-300 hover:shadow-[0_22px_44px_-26px_rgba(16,20,28,0.4)] motion-safe:hover:-translate-y-1",
        faculty ? "border-[#0b3d50]/25 hover:border-[#0b3d50]/50" : "border-primary/10 hover:border-primary/30"
      )}
    >
      <div className="p-3 pb-0">
        <MediaPreview media={project.media[0]} alt={`${project.title}: ${project.media[0].label}`} />
      </div>

      <div className="flex flex-1 flex-col p-5 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <CreatorBadge project={project} />
          <span className="text-xs font-medium text-muted-foreground">{project.creatorName}</span>
        </div>

        <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{project.title}</h3>
        <p className="mt-1 text-sm font-medium text-primary">
          {project.industry} <span aria-hidden="true">·</span> {project.projectType} <span aria-hidden="true">·</span> {project.format}
        </p>
        <p className="mt-2 line-clamp-3 text-base leading-relaxed text-muted-foreground">{project.shortDescription}</p>
        <p className="mt-2 text-sm text-muted-foreground">{context}</p>

        <ul aria-label="Topics" className="mt-3 flex flex-wrap gap-1.5">
          {project.topics.slice(0, MAX_TOPICS).map((t) => (
            <li key={t} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-foreground">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-5">
          <p className="text-xs font-medium text-muted-foreground">
            <span className="sr-only">Media: </span>
            {mediaSummary(project)}
          </p>
          <button
            type="button"
            onClick={() => onView(project)}
            className={cn(
              "inline-flex min-h-10 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90",
              FOCUS
            )}
          >
            View Project
            <span className="sr-only">: {project.title}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

/** The featured project: a large media area beside the project information. */
export function FeaturedProject({ project, onView }: { project: Project; onView: (p: Project) => void }) {
  const context = [project.program, project.course].filter(Boolean).join(" · ");
  return (
    <article className="group grid overflow-hidden rounded-[2rem] border border-primary/15 bg-card shadow-[0_24px_48px_-32px_rgba(16,20,28,0.4)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <div className="bg-muted/50 p-3 sm:p-4">
        <MediaPreview media={project.media[0]} alt={`${project.title}: ${project.media[0].label}`} large className="w-full lg:aspect-auto lg:h-full lg:min-h-72" />
      </div>

      <div className="flex flex-col p-6 sm:p-8">
        <p className="text-xs font-semibold tracking-widest text-brand-green uppercase">Featured Project</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <CreatorBadge project={project} />
          <span className="text-xs font-medium text-muted-foreground">{project.creatorName}</span>
        </div>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{project.title}</h3>
        <p className="mt-1 text-sm font-medium text-primary">
          {project.industry} <span aria-hidden="true">·</span> {project.projectType} <span aria-hidden="true">·</span> {project.format}
        </p>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">{project.shortDescription}</p>
        <p className="mt-2 text-sm text-muted-foreground">{context}</p>

        <ul aria-label="Topics" className="mt-4 flex flex-wrap gap-1.5">
          {project.topics.map((t) => (
            <li key={t} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-foreground">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-6">
          <p className="text-xs font-medium text-muted-foreground">
            <span className="sr-only">Media: </span>
            {mediaSummary(project)}
          </p>
          <button
            type="button"
            onClick={() => onView(project)}
            className={cn(
              "inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg",
              FOCUS
            )}
          >
            View Project
            <span className="sr-only">: {project.title}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
