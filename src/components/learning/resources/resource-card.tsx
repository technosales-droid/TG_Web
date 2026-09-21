import { ArrowRight } from "lucide-react";
import { cn } from "cn";
import { CATEGORY_OF, DIFFICULTY_LABEL, type Resource } from "@/data/resources";
import { ResourcePreview } from "./resource-media";
import { GENERAL, industryOf, type ViewMode } from "./resource-utils";

const MAX_TOPICS = 3;
const FOCUS = "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary";

export type OnOpen = (resource: Resource, opener: HTMLElement) => void;

/** Resource type with its broad category: "LEARN · Guide". The category is derived, never stored. */
export function TypeLabel({ resource }: { resource: Resource }) {
  return (
    <p className="text-[11px] font-bold tracking-widest text-primary uppercase">
      <span className="text-brand-green">{CATEGORY_OF[resource.resourceType]}</span>
      <span aria-hidden="true"> · </span>
      <span className="sr-only">, </span>
      {resource.resourceType}
    </p>
  );
}

/** Industry, program and course as one quiet block. "General" when the resource is not tied to any. */
function Context({ resource, compact = false }: { resource: Resource; compact?: boolean }) {
  return (
    <div className="border-l-2 border-primary/30 pl-3 text-sm leading-snug">
      <p className="font-semibold text-foreground">{industryOf(resource)}</p>
      {resource.program && <p className="mt-0.5 text-muted-foreground">{resource.program}</p>}
      {resource.course && !compact && <p className="mt-0.5 text-muted-foreground">{resource.course}</p>}
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

/** "Beginner · PDF", plain text rather than pills. */
function Meta({ resource }: { resource: Resource }) {
  return (
    <p className="text-xs font-medium text-muted-foreground">
      {resource.difficulty && (
        <>
          {DIFFICULTY_LABEL[resource.difficulty]}
          <span aria-hidden="true"> · </span>
          <span className="sr-only">, </span>
        </>
      )}
      {resource.format}
      {resource.sample && (
        <>
          <span aria-hidden="true"> · </span>
          <span className="sr-only">, </span>
          Sample resource
        </>
      )}
    </p>
  );
}

function OpenButton({ resource, onOpen, className }: { resource: Resource; onOpen: OnOpen; className?: string }) {
  return (
    <button
      type="button"
      onClick={(e) => onOpen(resource, e.currentTarget)}
      className={cn(
        "group/btn inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90",
        FOCUS,
        className
      )}
    >
      Open Resource
      <span className="sr-only">: {resource.title}</span>
      <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover/btn:translate-x-0.5" aria-hidden="true" />
    </button>
  );
}

export function ResourceCard({ resource, view, onOpen }: { resource: Resource; view: ViewMode; onOpen: OnOpen }) {
  const frame =
    "group overflow-hidden rounded-xl border border-primary/15 bg-card transition-all duration-300 hover:border-primary/35 hover:shadow-[0_18px_36px_-26px_rgba(16,20,28,0.45)] motion-safe:hover:-translate-y-0.5";
  const alt = `${resource.title}: ${resource.format} ${resource.resourceType.toLowerCase()}`;

  if (view === "list") {
    return (
      <article className={cn(frame, "flex")}>
        <div className="w-28 shrink-0 sm:w-52">
          <ResourcePreview resource={resource} alt={alt} fill compact className="rounded-none" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2 p-3 sm:p-4">
          <TypeLabel resource={resource} />
          <h3 className="text-base leading-snug font-semibold tracking-tight text-foreground [overflow-wrap:anywhere] sm:text-lg">{resource.title}</h3>
          <p className="line-clamp-1 text-sm text-muted-foreground sm:line-clamp-2">{resource.shortDescription}</p>
          <div className="hidden sm:block">
            <Context resource={resource} compact />
          </div>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-1">
            <Meta resource={resource} />
            <OpenButton resource={resource} onOpen={onOpen} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={cn(frame, "flex h-full flex-col")}>
      <ResourcePreview resource={resource} alt={alt} className="rounded-none" />
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <TypeLabel resource={resource} />
        <h3 className="mt-2 text-xl leading-snug font-semibold tracking-tight text-foreground [overflow-wrap:anywhere]">{resource.title}</h3>
        <div className="mt-3">
          <Context resource={resource} />
        </div>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{resource.shortDescription}</p>
        <div className="mt-3 mb-4">
          <Topics topics={resource.topics} />
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-primary/10 pt-4">
          <Meta resource={resource} />
          <OpenButton resource={resource} onOpen={onOpen} />
        </div>
      </div>
    </article>
  );
}

/** The featured resource: a large preview beside the resource information. */
export function FeaturedResource({ resource, onOpen }: { resource: Resource; onOpen: OnOpen }) {
  return (
    <article className="group grid overflow-hidden rounded-2xl border border-primary/20 bg-card lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <div className="bg-muted/60 p-3 sm:p-5">
        <ResourcePreview
          resource={resource}
          alt={`${resource.title}: ${resource.format} ${resource.resourceType.toLowerCase()}`}
          large
          className="w-full rounded-lg lg:aspect-auto lg:h-full lg:min-h-80"
        />
      </div>

      <div className="flex flex-col p-5 sm:p-8">
        <p className="text-xs font-bold tracking-widest text-brand-green uppercase">Featured Resource</p>
        <div className="mt-3">
          <TypeLabel resource={resource} />
        </div>
        <h3 className="mt-3 text-2xl leading-tight font-semibold tracking-tight text-foreground [overflow-wrap:anywhere] sm:text-3xl">{resource.title}</h3>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">{resource.shortDescription}</p>

        {(resource.industry || resource.program || resource.course) && (
          <dl className="mt-5 grid gap-x-6 gap-y-3 border-l-2 border-primary/30 pl-4 sm:grid-cols-2">
            {[
              ["Industry", resource.industry ?? GENERAL],
              ["Program", resource.program],
              ["Course", resource.course],
            ]
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k} className="min-w-0">
                  <dt className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">{k}</dt>
                  <dd className="mt-0.5 text-sm font-medium text-foreground [overflow-wrap:anywhere]">{v}</dd>
                </div>
              ))}
          </dl>
        )}

        <div className="mt-4">
          <Topics topics={resource.topics} max={6} />
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-6">
          <Meta resource={resource} />
          <OpenButton resource={resource} onOpen={onOpen} className="min-h-11 px-5 text-base" />
        </div>
      </div>
    </article>
  );
}
