"use client";

import { X } from "lucide-react";
import { cn } from "cn";
import { DIFFICULTY_LABEL, STATUS_LABEL, type Resource } from "@/data/resources";
import { useModal } from "../projects/use-modal";
import { TypeLabel } from "./resource-card";
import { ResourcePreview as Preview, ResourceViewer } from "./resource-media";
import { industryOf } from "./resource-utils";

/**
 * The resource preview: a right-hand drawer on tablets and desktops, a full-screen sheet on phones.
 * A native modal, so focus is trapped and Escape closes it. There are no resource routes yet, so nothing
 * links to one, and "Open Resource" only appears when a real URL exists.
 */
export function ResourcePreviewDrawer({ resource, onClose }: { resource: Resource | null; onClose: () => void }) {
  const ref = useModal(resource !== null);

  const details: [string, string | null | undefined][] = resource
    ? [
        ["Resource type", resource.resourceType],
        ["Industry", industryOf(resource)],
        ["Program", resource.program],
        ["Course", resource.course],
        ["Difficulty", resource.difficulty ? DIFFICULTY_LABEL[resource.difficulty] : null],
        ["Format", resource.format],
        ["Status", STATUS_LABEL[resource.status]],
        ["Source", resource.source],
        ["Author", resource.author],
        ["Time", resource.estimatedTime ?? resource.duration],
      ]
    : [];

  return (
    <dialog
      ref={ref}
      aria-labelledby="resource-dialog-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      className="fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-none flex-col overflow-hidden border-l border-primary/15 bg-background p-0 text-foreground shadow-2xl backdrop:bg-foreground/50 open:flex sm:w-[44rem] sm:max-w-[calc(100vw-2rem)] motion-safe:open:animate-in motion-safe:open:slide-in-from-right motion-safe:open:duration-300"
    >
      {resource && (
        <>
          <div className="flex items-start justify-between gap-4 border-b border-primary/10 px-5 py-4 sm:px-8">
            <div className="min-w-0">
              <TypeLabel resource={resource} />
              <h3 id="resource-dialog-title" className="mt-2 text-2xl leading-tight font-semibold tracking-tight [overflow-wrap:anywhere] sm:text-3xl">
                {resource.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Close resource preview"
              className="flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-muted focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="overflow-y-auto overscroll-contain px-5 py-6 sm:px-8">
            {resource.sample && (
              <p className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-foreground">
                This is a sample resource record. It shows the format that real learning resources will use.
              </p>
            )}

            <div className={cn("overflow-hidden rounded-xl", resource.sample && "mt-5")}>
              <Preview resource={resource} alt={`${resource.title}: ${resource.format}`} large />
            </div>

            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{resource.longDescription ?? resource.shortDescription}</p>

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

            {resource.topics.length > 0 && (
              <div className="mt-5">
                <h4 className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">Topics</h4>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {resource.topics.map((t) => (
                    <li key={t} className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8">
              <ResourceViewer resource={resource} />
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}
