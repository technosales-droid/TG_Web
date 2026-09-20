"use client";

import { useDeferredValue, useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, ChevronDown, Search, SearchX, SlidersHorizontal, X } from "lucide-react";
import { cn } from "cn";
import { CATALOGUE_PAGE_SIZE, INDUSTRIES, PROGRAMS, type CatalogueCourse } from "@/data/catalogue";
import {
  EMPTY_FILTERS,
  SORT_OPTIONS,
  activeFilterCount,
  buildFacets,
  filterCourses,
  parseFilters,
  searchText,
  serializeFilters,
  sortCourses,
  type Facets,
  type FacetOption,
  type Filters,
  type SortKey,
} from "./catalogue-utils";
import { ProgramCard } from "./program-card";

const TOPIC_LIMIT = 10;
const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

type Update = (patch: Partial<Filters>) => void;

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "min-h-10 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
        FOCUS,
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-primary/15 bg-card text-foreground hover:bg-muted"
      )}
    >
      {children}
    </button>
  );
}

function SelectFilter({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string | null;
  options: FacetOption[];
  onChange: (v: string | null) => void;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value || null)}
          className={cn(
            "h-11 w-full appearance-none rounded-full border border-primary/15 bg-card pr-10 pl-4 text-sm font-medium text-foreground",
            FOCUS
          )}
        >
          <option value="">All</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.value} ({o.count})
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function FilterPanel({ filters, facets, update }: { filters: Filters; facets: Facets; update: Update }) {
  const uid = useId();
  const [showAllTopics, setShowAllTopics] = useState(false);
  const topics = showAllTopics ? facets.tags : facets.tags.slice(0, TOPIC_LIMIT);
  const programOptions = filters.industry ? facets.programs.filter((o) => o.industry === filters.industry) : facets.programs;
  const allSelects: { key: "program" | "level" | "format" | "status"; label: string; options: FacetOption[] }[] = [
    { key: "program", label: "Program", options: programOptions },
    { key: "level", label: "Level", options: facets.levels },
    { key: "format", label: "Format", options: facets.formats },
    { key: "status", label: "Status", options: facets.statuses },
  ];
  // A filter with fewer than two real values is meaningless, so it stays hidden until data supports it.
  const selects = allSelects.filter((s) => s.options.length >= 2);

  return (
    <div className="grid gap-5">
      {facets.industries.length >= 2 && (
        <div role="group" aria-label="Industry">
          <p className="mb-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase">Industry</p>
          <div className="flex flex-wrap gap-2">
            <Pill active={filters.industry === null} onClick={() => update({ industry: null })}>
              All
            </Pill>
            {facets.industries.map((c) => (
              <Pill key={c.value} active={filters.industry === c.value} onClick={() => update({ industry: c.value })}>
                {c.value}
              </Pill>
            ))}
          </div>
        </div>
      )}

      {selects.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {selects.map((s) => (
            <SelectFilter
              key={s.key}
              id={`${uid}-${s.key}`}
              label={s.label}
              value={filters[s.key]}
              options={s.options}
              onChange={(v) => update({ [s.key]: v } as Partial<Filters>)}
            />
          ))}
        </div>
      )}

      {facets.tags.length > 0 && (
        <div role="group" aria-label="Topics">
          <p className="mb-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase">Popular Topics</p>
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => {
              const active = filters.tags.includes(t.value);
              return (
                <Pill
                  key={t.value}
                  active={active}
                  onClick={() =>
                    update({ tags: active ? filters.tags.filter((x) => x !== t.value) : [...filters.tags, t.value] })
                  }
                >
                  {t.value}
                </Pill>
              );
            })}
            {facets.tags.length > TOPIC_LIMIT && (
              <button
                type="button"
                onClick={() => setShowAllTopics((v) => !v)}
                className={cn("min-h-10 rounded-full px-3 text-sm font-medium text-primary underline-offset-4 hover:underline", FOCUS)}
              >
                {showAllTopics ? "Show fewer" : `Show all (${facets.tags.length})`}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ActiveChips({ filters, update, clearAll }: { filters: Filters; update: Update; clearAll: () => void }) {
  const chips: { key: string; label: string; remove: () => void }[] = [];
  if (filters.industry) chips.push({ key: "industry", label: `Industry: ${filters.industry}`, remove: () => update({ industry: null }) });
  if (filters.level) chips.push({ key: "level", label: filters.level, remove: () => update({ level: null }) });
  if (filters.format) chips.push({ key: "format", label: filters.format, remove: () => update({ format: null }) });
  if (filters.program) chips.push({ key: "program", label: `Program: ${filters.program}`, remove: () => update({ program: null }) });
  if (filters.status) chips.push({ key: "status", label: filters.status, remove: () => update({ status: null }) });
  for (const t of filters.tags)
    chips.push({ key: `tag-${t}`, label: t, remove: () => update({ tags: filters.tags.filter((x) => x !== t) }) });
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Active filters" role="group">
      <span className="text-sm font-medium text-muted-foreground">Filters:</span>
      {chips.map((c) => (
        <button
          key={c.key}
          type="button"
          onClick={c.remove}
          aria-label={`Remove filter: ${c.label}`}
          className={cn(
            "inline-flex min-h-9 items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 py-1.5 pr-2.5 pl-3.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/20",
            FOCUS
          )}
        >
          {c.label}
          <X className="size-3.5" aria-hidden="true" />
        </button>
      ))}
      <button
        type="button"
        onClick={clearAll}
        className={cn("min-h-9 px-2 text-sm font-medium text-primary underline-offset-4 hover:underline", FOCUS)}
      >
        Clear all
      </button>
    </div>
  );
}

export function ProgramCatalogue({ courses }: { courses: CatalogueCourse[] }) {
  const searchParams = useSearchParams();
  const facets = useMemo(() => buildFacets(courses), [courses]);
  const index = useMemo(() => courses.map((course) => ({ course, haystack: searchText(course) })), [courses]);

  const [filters, setFilters] = useState<Filters>(() => parseFilters(new URLSearchParams(searchParams.toString()), facets));
  const [visibleCount, setVisibleCount] = useState(CATALOGUE_PAGE_SIZE);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const searchId = useId();
  const sortId = useId();

  // Follow the URL when it changes from outside (e.g. a "Browse courses" link in the roadmap).
  // Our own replaceState below produces URLs equal to the current filters, so those are ignored.
  const urlQs = searchParams.toString();
  const [seenQs, setSeenQs] = useState(urlQs);
  if (urlQs !== seenQs) {
    setSeenQs(urlQs);
    const next = parseFilters(new URLSearchParams(urlQs), facets);
    if (serializeFilters(next) !== serializeFilters(filters)) {
      setFilters(next);
      setVisibleCount(CATALOGUE_PAGE_SIZE);
    }
  }

  const deferredQ = useDeferredValue(filters.q);
  const results = useMemo(
    () => sortCourses(filterCourses(index, { ...filters, q: deferredQ }), filters.sort),
    [index, filters, deferredQ]
  );
  const shown = results.slice(0, visibleCount);
  const active = activeFilterCount(filters);
  // The program in scope: the chosen one, or the only program of the chosen industry.
  const industrySlug = INDUSTRIES.find((i) => i.name === filters.industry)?.slug;
  const scoped = filters.program
    ? PROGRAMS.filter((p) => p.name === filters.program)
    : industrySlug
      ? PROGRAMS.filter((p) => p.industrySlug === industrySlug)
      : [];
  const programOverview = scoped.length === 1 && scoped[0].href ? { name: scoped[0].name, href: scoped[0].href } : null;
  const filtering = active > 0 || filters.q.trim() !== "";

  const update: Update = (patch) => {
    // Changing the industry clears a program that no longer belongs to it.
    setFilters((f) => ({ ...f, ...("industry" in patch && !("program" in patch) ? { program: null } : {}), ...patch }));
    setVisibleCount(CATALOGUE_PAGE_SIZE);
  };
  const clearAll = () => {
    setFilters((f) => ({ ...EMPTY_FILTERS, sort: f.sort }));
    setVisibleCount(CATALOGUE_PAGE_SIZE);
  };

  useEffect(() => {
    const qs = serializeFilters(filters);
    const url = `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`;
    window.history.replaceState(window.history.state, "", url);
  }, [filters]);

  const noun = results.length === 1 ? "course" : "courses";
  const countText =
    results.length === 0
      ? "No results found"
      : `Showing ${shown.length} of ${results.length} ${noun}${
          filtering && results.length !== courses.length ? ` (${courses.length} in catalogue)` : ""
        }`;

  return (
    <div>
      {/* Search + filters */}
      <div className="rounded-[2rem] border border-primary/10 bg-muted/50 p-4 sm:p-6">
        <form role="search" onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <label htmlFor={searchId} className="sr-only">
              Search courses, skills or topics
            </label>
            <Search
              className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id={searchId}
              type="search"
              value={filters.q}
              onChange={(e) => update({ q: e.target.value })}
              placeholder="Search courses, skills or topics..."
              autoComplete="off"
              className={cn(
                "h-12 w-full rounded-full border border-primary/15 bg-card pr-11 pl-12 text-base text-foreground placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden",
                FOCUS
              )}
            />
            {filters.q && (
              <button
                type="button"
                onClick={() => update({ q: "" })}
                aria-label="Clear search"
                className={cn(
                  "absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted",
                  FOCUS
                )}
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className={cn(
              "inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-primary/15 bg-card px-5 text-sm font-semibold text-foreground hover:bg-muted lg:hidden",
              FOCUS
            )}
          >
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            Filters
            {active > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {active}
              </span>
            )}
          </button>
        </form>

        <div className="mt-5 hidden lg:block">
          <FilterPanel filters={filters} facets={facets} update={update} />
        </div>
      </div>

      {/* Mobile filter sheet */}
      <dialog
        ref={dialogRef}
        aria-label="Filters"
        onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
        className="fixed inset-x-0 top-auto bottom-0 m-0 max-h-[88dvh] w-full max-w-none flex-col overflow-hidden rounded-t-[2rem] border border-primary/10 bg-background p-0 text-foreground backdrop:bg-foreground/40 open:flex lg:hidden"
      >
        <div className="flex items-center justify-between border-b border-primary/10 px-5 py-4">
          <h3 className="text-lg font-semibold tracking-tight">Filters</h3>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close filters"
            className={cn("flex size-10 items-center justify-center rounded-full hover:bg-muted", FOCUS)}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-5">
          <FilterPanel filters={filters} facets={facets} update={update} />
        </div>
        <div className="flex gap-3 border-t border-primary/10 bg-background px-5 py-4">
          <button
            type="button"
            onClick={clearAll}
            className={cn(
              "h-12 flex-1 rounded-full border border-primary/20 text-base font-semibold text-foreground hover:bg-muted",
              FOCUS
            )}
          >
            Clear All
          </button>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className={cn(
              "h-12 flex-[1.4] rounded-full bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90",
              FOCUS
            )}
          >
            Apply Filters
          </button>
        </div>
      </dialog>

      {/* Active filters, count and sort */}
      <div className="mt-5 grid gap-4">
        <ActiveChips filters={filters} update={update} clearAll={clearAll} />
        {programOverview && (
          <Link
            href={programOverview.href}
            className={cn("inline-flex w-fit items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline", FOCUS)}
          >
            View the {programOverview.name} overview
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p role="status" aria-live="polite" className="text-sm font-medium text-muted-foreground sm:text-base">
            {countText}
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor={sortId} className="text-sm font-medium text-muted-foreground">
              Sort by
            </label>
            <div className="relative">
              <select
                id={sortId}
                value={filters.sort}
                onChange={(e) => update({ sort: e.target.value as SortKey })}
                className={cn(
                  "h-10 appearance-none rounded-full border border-primary/15 bg-card pr-9 pl-4 text-sm font-medium text-foreground",
                  FOCUS
                )}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <>
          <ul className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {shown.map((p, i) => (
              <li key={p.slug} className="min-w-0">
                <ProgramCard course={p} priority={i < 3} />
              </li>
            ))}
          </ul>
          {results.length > visibleCount && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((n) => n + CATALOGUE_PAGE_SIZE)}
                className={cn(
                  "h-12 rounded-full border border-primary/25 bg-card px-8 text-base font-semibold text-foreground transition-colors hover:bg-muted",
                  FOCUS
                )}
              >
                Load More
                <span className="ml-2 font-normal text-muted-foreground">({results.length - visibleCount} more)</span>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="mt-5 flex flex-col items-center rounded-[2rem] border border-dashed border-primary/25 bg-card px-6 py-14 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <SearchX className="size-7" aria-hidden="true" />
          </span>
          <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">No courses found.</h3>
          <p className="mt-2 max-w-md text-base text-muted-foreground">
            Try adjusting your search or clearing some filters.
          </p>
          <button
            type="button"
            onClick={clearAll}
            className={cn(
              "mt-6 h-12 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/90",
              FOCUS
            )}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
