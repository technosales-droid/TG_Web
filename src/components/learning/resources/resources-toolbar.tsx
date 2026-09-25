"use client";

import { useId } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "cn";
import { ViewToggle } from "../projects/project-view-toggle";
import { SortSelect } from "../projects/projects-toolbar";
import { QUICK_MODES, activeChips, activeFilterCount, activeQuickMode, type ResourceState } from "./resource-utils";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary";

/** Quick browse. Each mode is a set of resource types, so it drives the same filter as the rail. */
export function QuickBrowse({ state, onChange }: { state: ResourceState; onChange: (p: Partial<ResourceState>) => void }) {
  const current = activeQuickMode(state);
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-0">
      <span className="text-sm font-semibold text-muted-foreground">Browse by:</span>
      <div role="group" aria-label="Quick browse" className="flex flex-wrap gap-x-4 gap-y-0 sm:gap-x-6">
        {QUICK_MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={current === m.id}
            onClick={() => onChange({ types: m.types })}
            className={cn(
              "min-h-11 border-b-2 text-[13px] font-semibold transition-colors min-[400px]:text-sm sm:text-base",
              FOCUS,
              current === m.id ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SearchField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const id = useId();
  return (
    <form role="search" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor={id} className="sr-only">
        Search resources, topics, tools or subjects
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted-foreground sm:left-4" aria-hidden="true" />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search resources, topics, tools or subjects..."
          autoComplete="off"
          className={cn(
            "h-14 w-full rounded-xl border border-primary/25 bg-card pr-12 pl-11 text-base text-foreground placeholder:text-xs placeholder:text-muted-foreground min-[400px]:placeholder:text-sm sm:pl-12 sm:placeholder:text-base [&::-webkit-search-cancel-button]:hidden",
            FOCUS
          )}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search"
            className={cn("absolute top-1/2 right-2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted", FOCUS)}
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </form>
  );
}

/** "Resources", the live count, and the controls: filters (below lg), sort and view. */
export function ResultsToolbar({
  state,
  countText,
  onChange,
  onOpenFilters,
}: {
  state: ResourceState;
  countText: string;
  onChange: (p: Partial<ResourceState>) => void;
  onOpenFilters: (opener: HTMLElement) => void;
}) {
  const count = activeFilterCount(state);
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div>
        <p className="text-xs font-bold tracking-widest text-primary uppercase">Resources</p>
        {/* Live region: the count is announced when a search or filter changes it. */}
        <p role="status" aria-live="polite" className="mt-1 text-base font-semibold text-foreground sm:text-lg">
          {countText}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={(e) => onOpenFilters(e.currentTarget)}
          className={cn(
            "inline-flex h-11 items-center gap-2 rounded-lg border border-primary/25 bg-card px-3.5 text-[15px] font-semibold text-foreground hover:bg-muted lg:hidden",
            FOCUS
          )}
        >
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Filters{count > 0 && ` (${count})`}
        </button>
        <SortSelect value={state.sort} onChange={(sort) => onChange({ sort })} />
        <ViewToggle view={state.view} onChange={(view) => onChange({ view })} />
      </div>
    </div>
  );
}

/** Removable chips for every active filter. Renders nothing when nothing is active. */
export function ActiveFilters({
  state,
  onChange,
  onReset,
}: {
  state: ResourceState;
  onChange: (p: Partial<ResourceState>) => void;
  onReset: () => void;
}) {
  const chips = activeChips(state);
  if (chips.length === 0) return null;
  return (
    <ul aria-label="Active filters" className="flex flex-wrap items-center gap-2">
      {chips.map((c) => (
        <li key={c.key}>
          <button
            type="button"
            onClick={() => onChange(c.remove)}
            aria-label={`Remove filter: ${c.label}`}
            className={cn(
              "inline-flex min-h-9 max-w-full items-center gap-1.5 rounded-md border border-primary/25 bg-primary/5 pr-2 pl-3 text-sm font-medium text-foreground transition-colors hover:bg-primary/10",
              FOCUS
            )}
          >
            <span className="truncate">{c.label}</span>
            <X className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
          </button>
        </li>
      ))}
      <li>
        <button type="button" onClick={onReset} className={cn("min-h-9 rounded px-2 text-sm font-semibold text-primary underline-offset-4 hover:underline", FOCUS)}>
          Clear All
        </button>
      </li>
    </ul>
  );
}
