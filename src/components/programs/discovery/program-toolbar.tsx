"use client";

import { useId } from "react";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "cn";
import { PROGRAM_CATEGORIES } from "@/data/programs";
import { ViewToggle } from "../../learning/projects/project-view-toggle";
import { SORT_OPTIONS, activeChips, activeFilterCount, type ProgramState, type SortKey } from "./program-utils";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary";

/** Program category as a quick-browse row: the primary way to split the catalogue. */
export function QuickBrowse({ state, onChange }: { state: ProgramState; onChange: (p: Partial<ProgramState>) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-0">
      <span className="text-sm font-semibold text-muted-foreground">Browse by:</span>
      <div role="group" aria-label="Program" className="flex flex-wrap gap-x-4 gap-y-0 sm:gap-x-6">
        <button
          type="button"
          aria-pressed={state.category === ""}
          onClick={() => onChange({ category: "" })}
          className={cn(
            "min-h-11 border-b-2 text-[13px] font-semibold transition-colors min-[400px]:text-sm sm:text-base",
            FOCUS,
            state.category === "" ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          All Programs
        </button>
        {PROGRAM_CATEGORIES.map((c) => (
          <button
            key={c.slug}
            type="button"
            aria-pressed={state.category === c.slug}
            onClick={() => onChange({ category: c.slug })}
            className={cn(
              "min-h-11 border-b-2 text-[13px] font-semibold transition-colors min-[400px]:text-sm sm:text-base",
              FOCUS,
              state.category === c.slug ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {c.name}
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
        Search programs, skills or tools
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted-foreground sm:left-4" aria-hidden="true" />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search programs, skills or tools..."
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

/** "Programs", the live count, and the controls: filters (below lg), sort and view. */
export function ResultsToolbar({
  state,
  countText,
  onChange,
  onOpenFilters,
}: {
  state: ProgramState;
  countText: string;
  onChange: (p: Partial<ProgramState>) => void;
  onOpenFilters: (opener: HTMLElement) => void;
}) {
  const count = activeFilterCount(state);
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div>
        <p className="text-xs font-bold tracking-widest text-primary uppercase">Programs</p>
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
  state: ProgramState;
  onChange: (p: Partial<ProgramState>) => void;
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
