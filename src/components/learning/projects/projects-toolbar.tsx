"use client";

import { useId } from "react";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "cn";
import { ViewToggle } from "./project-view-toggle";
import type { FilterGroup } from "./projects-filters";
import { SORT_OPTIONS, activeChips, activeFilterCount, type LibraryState, type SortKey } from "./project-utils";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

/** Convenience views. They set the same filters the rail does, so nothing is duplicated. */
export function QuickModes({ state, onChange }: { state: LibraryState; onChange: (p: Partial<LibraryState>) => void }) {
  const current = state.featuredOnly ? "featured" : state.creator;
  const modes = [
    { id: "all", label: "All Work", patch: { creator: "all", featuredOnly: false } },
    { id: "student", label: "Student Work", patch: { creator: "student", featuredOnly: false } },
    { id: "faculty", label: "Faculty Work", patch: { creator: "faculty", featuredOnly: false } },
    { id: "featured", label: "Featured", patch: { creator: "all", featuredOnly: true } },
  ] as const;
  return (
    <div role="group" aria-label="Quick views" className="flex flex-wrap gap-x-4 gap-y-1 sm:gap-x-6">
      {modes.map((m) => (
        <button
          key={m.id}
          type="button"
          aria-pressed={current === m.id}
          onClick={() => onChange(m.patch)}
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
  );
}

const BROWSE: { group: FilterGroup; label: string; short?: string }[] = [
  { group: "industry", label: "Industry" },
  { group: "program", label: "Program" },
  { group: "project-type", label: "Project Type", short: "Type" },
  { group: "media", label: "Media" },
];

/** A compact discovery row: each link jumps to that filter group. */
export function BrowseBy({ onBrowse }: { onBrowse: (g: FilterGroup) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] sm:gap-x-4 sm:text-sm">
      <span className="font-semibold text-muted-foreground">Browse by:</span>
      {BROWSE.map((b) => (
        <button
          key={b.group}
          type="button"
          onClick={() => onBrowse(b.group)}
          className={cn("min-h-11 font-medium text-primary underline-offset-4 hover:underline", FOCUS)}
        >
          {b.short ? (
            <>
              <span className="sm:hidden" aria-hidden="true">
                {b.short}
              </span>
              <span className="max-sm:sr-only">{b.label}</span>
            </>
          ) : (
            b.label
          )}
        </button>
      ))}
    </div>
  );
}

export function SearchField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const id = useId();
  return (
    <form role="search" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor={id} className="sr-only">
        Search projects, skills, tools or topics
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-5 sm:left-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search projects, skills, tools or topics..."
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

export function SortSelect({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  const id = useId();
  return (
    <div className="relative flex items-center">
      <label htmlFor={id} className="sr-only">
        Sort by
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className={cn("h-10 appearance-none rounded-lg border border-primary/20 bg-card pr-9 pl-3 text-sm font-medium text-foreground", FOCUS)}
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            Sort: {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 size-4 text-muted-foreground" aria-hidden="true" />
    </div>
  );
}

/** "Projects", the live count, and the controls: filters (below lg), sort and view. */
export function ResultsToolbar({
  state,
  countText,
  onChange,
  onOpenFilters,
}: {
  state: LibraryState;
  countText: string;
  onChange: (p: Partial<LibraryState>) => void;
  onOpenFilters: (opener: HTMLElement) => void;
}) {
  const count = activeFilterCount(state);
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div>
        <p className="text-xs font-bold tracking-widest text-brand-green uppercase">Projects</p>
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
            "inline-flex h-10 items-center gap-2 rounded-lg border border-primary/25 bg-card px-3.5 text-sm font-semibold text-foreground hover:bg-muted lg:hidden",
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
  state: LibraryState;
  onChange: (p: Partial<LibraryState>) => void;
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
