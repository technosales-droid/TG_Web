"use client";

import { useId, useMemo, useState } from "react";
import { Search, SearchX, X } from "lucide-react";
import { cn } from "cn";
import { ALL_OFFERINGS, PROGRAM_CATEGORIES } from "@/data/programs";
import { OfferingCard } from "./offering-card";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "min-h-10 shrink-0 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200",
        FOCUS,
        active ? "border-primary bg-primary text-primary-foreground" : "border-primary/15 bg-card text-foreground hover:bg-muted"
      )}
    >
      {children}
    </button>
  );
}

function searchText(o: (typeof ALL_OFFERINGS)[number]): string {
  return [o.title, o.subtitle, o.description, o.category, ...o.tags, ...(o.tools ?? [])].filter(Boolean).join(" ").toLowerCase();
}

export function ProgramDiscovery() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [tag, setTag] = useState<string | null>(null);
  const searchId = useId();

  const availableTags = useMemo(() => {
    const scoped = category ? ALL_OFFERINGS.filter((o) => o.categorySlug === category) : ALL_OFFERINGS;
    const seen = new Set<string>();
    const tags: string[] = [];
    for (const o of scoped) {
      for (const t of o.tags) {
        if (!seen.has(t)) {
          seen.add(t);
          tags.push(t);
        }
      }
    }
    return tags;
  }, [category]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_OFFERINGS.filter((o) => {
      if (category && o.categorySlug !== category) return false;
      if (tag && !o.tags.includes(tag)) return false;
      if (q && !searchText(o).includes(q)) return false;
      return true;
    });
  }, [query, category, tag]);

  function selectCategory(slug: string | null) {
    setCategory(slug);
    if (tag && slug) {
      const stillAvailable = ALL_OFFERINGS.some((o) => o.categorySlug === slug && o.tags.includes(tag));
      if (!stillAvailable) setTag(null);
    }
  }

  const clearAll = () => {
    setQuery("");
    setCategory(null);
    setTag(null);
  };
  const hasFilters = Boolean(query || category || tag);

  return (
    <div>
      <div className="rounded-[2rem] border border-primary/10 bg-muted/50 p-4 sm:p-6">
        <div className="relative">
          <label htmlFor={searchId} className="sr-only">
            Search programs, skills or tools
          </label>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programs, skills or tools..."
            autoComplete="off"
            className={cn(
              "h-12 w-full rounded-full border border-primary/15 bg-card pr-11 pl-12 text-base text-foreground placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden",
              FOCUS
            )}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
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

        <div role="group" aria-label="Program" className="mt-5 flex flex-wrap gap-2 overflow-x-auto pb-1">
          <Pill active={category === null} onClick={() => selectCategory(null)}>
            All Programs
          </Pill>
          {PROGRAM_CATEGORIES.map((c) => (
            <Pill key={c.slug} active={category === c.slug} onClick={() => selectCategory(c.slug)}>
              {c.name}
            </Pill>
          ))}
        </div>

        {availableTags.length > 0 && (
          <div role="group" aria-label="Topics" className="mt-4 flex flex-wrap gap-2 overflow-x-auto pb-1">
            {availableTags.map((t) => (
              <Pill key={t} active={tag === t} onClick={() => setTag(tag === t ? null : t)}>
                {t}
              </Pill>
            ))}
          </div>
        )}
      </div>

      <p role="status" aria-live="polite" className="mt-5 text-sm font-medium text-muted-foreground">
        Showing {results.length} of {ALL_OFFERINGS.length} programs
      </p>

      {results.length > 0 ? (
        <ul className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {results.map((o, i) => (
            <li key={o.slug} className="min-w-0">
              <OfferingCard offering={o} category={o.category} categorySlug={o.categorySlug} priority={i < 3} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 flex flex-col items-center rounded-[2rem] border border-dashed border-primary/25 bg-card px-6 py-14 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <SearchX className="size-7" aria-hidden="true" />
          </span>
          <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">No programs found.</h3>
          <p className="mt-2 max-w-md text-base text-muted-foreground">Try adjusting your search or clearing filters.</p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearAll}
              className={cn("mt-6 h-12 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/90", FOCUS)}
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
