"use client";

import { X } from "lucide-react";
import { cn } from "cn";
import { STATUS_LABEL, type Project } from "@/data/projects";
import { CreatorBadge } from "./project-card";
import { MediaViewer } from "./project-media";
import { sampleLabel } from "./project-utils";
import { useModal } from "./use-modal";

/**
 * The project "case file": a right-hand drawer on tablets and desktops, a full-screen sheet on phones.
 * A native modal, so focus is trapped and Escape closes it. There is no project route yet, so there is no
 * "View Full Project" link: it will be added when that route exists.
 */
export function ProjectPreview({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useModal(project !== null);

  const details: [string, string | null | undefined][] = project
    ? [
        ["Created by", project.creatorName],
        ["Industry", project.industry],
        ["Program", project.program],
        ["Course", project.course],
        ["Project type", project.projectType],
        ["Status", STATUS_LABEL[project.status]],
        ["Cohort", project.cohort],
        ["Date", project.createdAt],
      ]
    : [];

  return (
    <dialog
      ref={ref}
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      className="fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-none flex-col overflow-hidden border-l border-primary/15 bg-background p-0 text-foreground shadow-2xl backdrop:bg-foreground/50 open:flex sm:w-[44rem] sm:max-w-[calc(100vw-2rem)] motion-safe:open:animate-in motion-safe:open:slide-in-from-right motion-safe:open:duration-300"
    >
      {project && (
        <>
          <div className="flex items-start justify-between gap-4 border-b border-primary/10 px-5 py-4 sm:px-8">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <CreatorBadge project={project} />
                <span className="text-xs font-medium text-muted-foreground">{sampleLabel(project)}</span>
              </div>
              <h3 id="project-dialog-title" className="mt-2 text-2xl leading-tight font-semibold tracking-tight [overflow-wrap:anywhere] sm:text-3xl">
                {project.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Close project preview"
              className="flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="overflow-y-auto overscroll-contain px-5 py-6 sm:px-8">
            {project.sample && (
              <p className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-foreground">
                This is a sample record. It shows the format that real student and faculty work will use.
              </p>
            )}

            <p className={cn("text-base leading-relaxed text-muted-foreground sm:text-lg", project.sample && "mt-5")}>
              {project.longDescription ?? project.shortDescription}
            </p>

            <dl className="mt-6 grid gap-x-6 gap-y-4 border-l-2 border-primary/30 pl-4 sm:grid-cols-2">
              {details
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k} className="min-w-0">
                    <dt className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">{k}</dt>
                    <dd className="mt-0.5 text-base font-medium text-foreground [overflow-wrap:anywhere]">{v}</dd>
                  </div>
                ))}
            </dl>

            {(["Topics", "Tools"] as const).map((label) => {
              const items = label === "Topics" ? project.topics : project.tools;
              return items.length > 0 ? (
                <div key={label} className="mt-5">
                  <h4 className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">{label}</h4>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {items.map((t) => (
                      <li key={t} className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null;
            })}

            <h4 className="mt-8 text-sm font-bold tracking-widest text-foreground uppercase">
              Project files <span className="font-medium text-muted-foreground">({project.media.length})</span>
            </h4>
            <ul className="mt-3 grid gap-3">
              {project.media.map((m) => (
                <li key={m.label}>
                  <MediaViewer media={m} />
                </li>
              ))}
            </ul>

            {project.externalLinks && project.externalLinks.length > 0 && (
              <>
                <h4 className="mt-8 text-sm font-bold tracking-widest text-foreground uppercase">Links</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.externalLinks.map((l) => (
                    <li key={l.url}>
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-10 items-center rounded-lg border border-primary/25 px-4 text-sm font-semibold text-primary hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        {l.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </>
      )}
    </dialog>
  );
}
