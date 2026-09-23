"use client";

import { useDeferredValue, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "cn";
import { ALL_OFFERINGS } from "@/data/programs";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";
import { FilterRail, FilterSheet } from "./program-filters";
import { ProgramsGrid } from "./programs-grid";
import { ActiveFilters, QuickBrowse, ResultsToolbar, SearchField } from "./program-toolbar";
import {
  EMPTY_STATE,
  buildFacets,
  filterOfferings,
  isFiltering,
  offeringSearchText,
  parseSearch,
  sortOfferings,
  toSearch,
  type ProgramState,
} from "./program-utils";

// Everything the UI offers is derived from the data, once.
const FACETS = buildFacets(ALL_OFFERINGS);
const INDEX = ALL_OFFERINGS.map((offering) => ({ offering, haystack: offeringSearchText(offering) }));

// The URL is the single source of truth for search, filters, sort and view, so a refresh restores
// them. The server snapshot is "" so the first render matches the server; the real query string
// follows on the client.
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  window.addEventListener("popstate", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("popstate", cb);
  };
};
const readSearch = () => window.location.search;
const readServerSearch = () => "";
function writeSearch(qs: string) {
  const url = `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`;
  try {
    window.history.replaceState(window.history.state, "", url);
  } catch {
    // Some browsers rate-limit history updates; the on-screen state still updates below.
  }
  listeners.forEach((l) => l());
}

export function ProgramsDiscoverySection() {
  const search = useSyncExternalStore(subscribe, readSearch, readServerSearch);
  const state = useMemo(() => parseSearch(search, FACETS), [search]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const opener = useRef<HTMLElement | null>(null);

  const deferredQ = useDeferredValue(state.q);
  const results = useMemo(() => sortOfferings(filterOfferings(INDEX, { ...state, q: deferredQ }), state.sort), [state, deferredQ]);
  const filtering = isFiltering(state);
  const countText = results.length === 0 ? "No programs found." : `Showing ${results.length} of ${ALL_OFFERINGS.length} programs`;

  const commit = (next: ProgramState) => writeSearch(toSearch(next));
  const update = (patch: Partial<ProgramState>) => commit({ ...parseSearch(readSearch(), FACETS), ...patch });
  const reset = () => commit(EMPTY_STATE);

  return (
    <section id="programs-listing" className="scroll-mt-28 pt-2 pb-14 sm:pb-16">
      <div className="px-4 sm:px-6">
        <div className="mx-auto max-w-[1800px]">
          <SectionHeader
            id="programs-listing-heading"
            eyebrow="Explore Our Programs"
            title={
              <>
                <span className="block">Choose a Skill.</span>
                <span className={cn("block", GRADIENT_TEXT)}>Build Your Path.</span>
              </>
            }
          >
            Explore Techno Gurukul&rsquo;s programs and find the learning path that&rsquo;s relevant to you.
          </SectionHeader>
        </div>
      </div>

      <div className="mt-8 border-y border-primary/10 bg-muted/50 px-4 py-8 sm:mt-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-[1800px]">
          <div className="border-b border-primary/10">
            <QuickBrowse state={state} onChange={update} />
          </div>

          <div className="mt-5">
            <SearchField value={state.q} onChange={(q) => update({ q })} />
          </div>

          <div className="mt-6">
            <ResultsToolbar
              state={state}
              countText={countText}
              onChange={update}
              onOpenFilters={(el) => {
                opener.current = el;
                setSheetOpen(true);
              }}
            />
          </div>

          <div className="mt-6 flex items-start gap-8">
            <FilterRail state={state} facets={FACETS} onChange={update} onReset={reset} />

            <div className="min-w-0 flex-1">
              {filtering && (
                <div className="mb-4">
                  <ActiveFilters state={state} onChange={update} onReset={reset} />
                </div>
              )}

              {results.length > 0 ? (
                <ProgramsGrid offerings={results} view={state.view} />
              ) : (
                <div className="flex flex-col items-center rounded-[2rem] border border-dashed border-primary/25 bg-card px-6 py-14 text-center">
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">No programs found.</h3>
                  <p className="mt-2 max-w-md text-base text-muted-foreground">Try adjusting your search or clearing some filters.</p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-6 h-12 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <FilterSheet
        open={sheetOpen}
        state={state}
        facets={FACETS}
        onApply={(s) => commit(s)}
        onClose={() => {
          setSheetOpen(false);
          opener.current?.focus();
        }}
      />
    </section>
  );
}
