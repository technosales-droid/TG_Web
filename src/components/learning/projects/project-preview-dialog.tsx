"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "cn";
import type { Project, ProjectStatus } from "@/data/projects";
import { CreatorBadge } from "./project-card";
import { MediaViewer } from "./project-media";

const STATUS: Record<ProjectStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  showcased: "Showcased",
};

/** A native modal: focus is trapped, Escape closes it, and focus returns to the "View Project" button. */
export function ProjectPreviewDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project && !d.open) d.showModal();
    if (!project && d.open) d.close();
  }, [project]);

  const details: [string, string | undefined][] = project
    ? [
        ["Created by", project.creatorName],
        ["Industry", project.industry],
        ["Program", project.program],
        ["Course", project.course ?? undefined],
        ["Project type", project.projectType],
        ["Format", project.format],
        ["Status", STATUS[project.status]],
        ["Cohort", project.creatorBatch],
        ["Date", project.createdAt],
      ]
    : [];

  return (
    <dialog
      ref={ref}
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      className="fixed top-1/2 left-1/2 m-0 max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[2rem] border border-primary/10 bg-background p-0 text-foreground shadow-2xl backdrop:bg-foreground/50 open:flex"
    >
      {project && (
        <>
          <div className="flex items-start justify-between gap-4 border-b border-primary/10 px-5 py-4 sm:px-6">
            <div className="min-w-0">
              <CreatorBadge project={project} />
              <h3 id="project-dialog-title" className="mt-2 text-xl font-semibold tracking-tight [overflow-wrap:anywhere] sm:text-2xl">
                {project.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Close project preview"
              className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="overflow-y-auto px-5 py-5 sm:px-6">
            {project.sample && (
              <p className="rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-foreground">
                This is a sample record. It shows the format that real student and faculty work will use.
              </p>
            )}

            <p className={cn("text-base leading-relaxed text-muted-foreground", project.sample && "mt-4")}>
              {project.longDescription ?? project.shortDescription}
            </p>

            <dl className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {details
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k} className="min-w-0">
                    <dt className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">{k}</dt>
                    <dd className="mt-0.5 text-base font-medium text-foreground [overflow-wrap:anywhere]">{v}</dd>
                  </div>
                ))}
            </dl>

            <ul aria-label="Topics" className="mt-4 flex flex-wrap gap-1.5">
              {project.topics.map((t) => (
                <li key={t} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-foreground">
                  {t}
                </li>
              ))}
            </ul>

            <h4 className="mt-6 text-sm font-semibold tracking-widest text-muted-foreground uppercase">Project media</h4>
            <ul className="mt-3 grid gap-3">
              {project.media.map((m) => (
                <li key={m.label}>
                  <MediaViewer media={m} />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </dialog>
  );
}
