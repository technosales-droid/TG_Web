"use client";

import { useId } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { cn } from "cn";
import type { MediaType } from "@/data/projects";
import { isFiltering, type ProjectFilters } from "./project-utils";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export interface ProjectFacets {
  industries: string[];
  projectTypes: string[];
  mediaTypes: { value: MediaType; label: string }[];
  counts: { student: number; faculty: number };
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  const id = useId();
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "h-11 w-full appearance-none rounded-full border border-primary/15 bg-card pr-10 pl-4 text-sm font-medium text-foreground",
            FOCUS
          )}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      </div>
    </div>
  );
}

export function ProjectFilterBar({
  filters,
  facets,
  onChange,
  onClear,
}: {
  filters: ProjectFilters;
  facets: ProjectFacets;
  onChange: (patch: Partial<ProjectFilters>) => void;
  onClear: () => void;
}) {
  const searchId = useId();
  const creators: { value: ProjectFilters["creator"]; label: string }[] = [
    { value: "all", label: "All" },
    { value: "student", label: "Students" },
    { value: "faculty", label: "Faculty" },
  ];

  return (
    <div className="rounded-[2rem] border border-primary/10 bg-muted/50 p-4 sm:p-6">
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor={searchId} className="sr-only">
          Search projects
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            id={searchId}
            type="search"
            value={filters.q}
            onChange={(e) => onChange({ q: e.target.value })}
            placeholder="Search projects..."
            autoComplete="off"
            className={cn(
              "h-12 w-full rounded-full border border-primary/15 bg-card pr-11 pl-12 text-base text-foreground placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden",
              FOCUS
            )}
          />
          {filters.q && (
            <button
              type="button"
              onClick={() => onChange({ q: "" })}
              aria-label="Clear search"
              className={cn("absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted", FOCUS)}
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </form>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-[auto_1fr_1fr_1fr] lg:items-end">
        <div role="group" aria-label="Creator" className="sm:col-span-2 lg:col-span-1">
          <p className="mb-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase">Creator</p>
          <div className="flex flex-wrap gap-2">
            {creators.map((c) => {
              const active = filters.creator === c.value;
              return (
                <button
                  key={c.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onChange({ creator: c.value })}
                  className={cn(
                    "min-h-11 rounded-full border px-4 text-sm font-medium transition-colors duration-200",
                    FOCUS,
                    active ? "border-primary bg-primary text-primary-foreground" : "border-primary/15 bg-card text-foreground hover:bg-muted"
                  )}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <Select label="Industry" value={filters.industry} onChange={(v) => onChange({ industry: v })}>
          <option value="">All</option>
          {facets.industries.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </Select>
        <Select label="Project type" value={filters.projectType} onChange={(v) => onChange({ projectType: v })}>
          <option value="">All</option>
          {facets.projectTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
        <Select label="Media" value={filters.media} onChange={(v) => onChange({ media: v as ProjectFilters["media"] })}>
          <option value="all">All</option>
          {facets.mediaTypes.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </Select>
      </div>

      {isFiltering(filters) && (
        <button
          type="button"
          onClick={onClear}
          className={cn("mt-4 min-h-10 rounded-full px-2 text-sm font-medium text-primary underline-offset-4 hover:underline", FOCUS)}
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
