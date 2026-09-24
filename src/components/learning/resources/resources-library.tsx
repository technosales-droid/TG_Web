"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "cn";
import { FileText, Layers, ListChecks, Presentation, Video } from "lucide-react";
import { RESOURCES } from "@/data/resources";
import { FilterRail, FilterSheet } from "./resources-filters";
import { ActiveFilters, QuickBrowse, ResultsToolbar, SearchField } from "./resources-toolbar";
import {
  EMPTY_STATE,
  applyPatch,
  buildFacets,
  isFiltering,
  parseSearch,
  toSearch,
  type ResourceState,
} from "./resource-utils";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary";

// The filter options come from the data. The library itself is empty until real resources are published.
const FACETS = buildFacets(RESOURCES);

// The URL is the single source of truth for search, filters, sort and view, so a refresh restores them.
// The server snapshot is "" so the first render matches the server; the real query string follows on the client.
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

const FORMATS = [
  { label: "Guides & references", Icon: FileText },
  { label: "Templates", Icon: Layers },
  { label: "Checklists & worksheets", Icon: ListChecks },
  { label: "Videos", Icon: Video },
  { label: "Presentations", Icon: Presentation },
];

// A library with nothing in it yet: the whole browse interface is in place, and the results area holds one
// "coming soon" panel. No resource, file or count is invented.
export function ResourcesLibrary() {
  const search = useSyncExternalStore(subscribe, readSearch, readServerSearch);
  const state = useMemo(() => parseSearch(search, FACETS), [search]);

  const [sheetOpen, setSheetOpen] = useState(false);
  const opener = useRef<HTMLElement | null>(null);

  const filtering = isFiltering(state);

  const commit = (next: ResourceState) => writeSearch(toSearch(next));
  // Reads the URL at call time, so two changes in quick succession never overwrite each other.
  const update = (patch: Partial<ResourceState>) => commit(applyPatch(parseSearch(readSearch(), FACETS), patch, FACETS));
  const reset = () => commit(EMPTY_STATE);

  return (
    <section id="resource-library" aria-label="Resource library" className="scroll-mt-28 pb-14 sm:pb-20">
      <div className="mt-10 border-y border-primary/10 bg-muted/50 px-4 py-8 sm:mt-14 sm:px-6 sm:py-12">
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
              countText="The library opens soon."
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

              <div className="flex min-h-[26rem] flex-col justify-between rounded-3xl border border-dashed border-primary/30 bg-card p-8 sm:p-12">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-green" />
                    Coming soon
                  </span>
                  <h3 className="mt-6 max-w-2xl text-3xl leading-tight font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
                    {filtering ? "Nothing to show for these filters yet." : "Learning resources will appear here as they are published."}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Guides, references, templates and practice material will be added once they are ready to be shared.
                  </p>
                  {filtering && (
                    <button
                      type="button"
                      onClick={reset}
                      className={cn("mt-6 h-11 rounded-lg border border-primary/30 px-6 text-base font-semibold text-foreground transition-colors hover:bg-muted", FOCUS)}
                    >
                      Clear filters
                    </button>
                  )}
                </div>

                <ul aria-label="Kinds of resource the library will hold" className="mt-10 flex flex-wrap gap-3">
                  {FORMATS.map(({ label, Icon }) => (
                    <li key={label} className="flex items-center gap-2 rounded-full border border-primary/15 bg-muted/50 px-4 py-2 text-sm font-medium text-foreground">
                      <Icon className="size-4 text-primary" aria-hidden="true" />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FilterSheet
        open={sheetOpen}
        state={state}
        facets={FACETS}
        onApply={commit}
        onClose={() => {
          setSheetOpen(false);
          opener.current?.focus();
        }}
      />
    </section>
  );
}
