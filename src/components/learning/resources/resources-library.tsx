"use client";

import { useDeferredValue, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "cn";
import { RESOURCES, RESOURCE_PAGE_SIZE, type Resource } from "@/data/resources";
import { GRADIENT_TEXT, SectionHeader } from "../curriculum/section-header";
import { FeaturedResource } from "./resource-card";
import { ResourceEmptyState } from "./resource-empty-state";
import { ResourcePreviewDrawer } from "./resource-preview";
import { FilterRail, FilterSheet } from "./resources-filters";
import { ResourcesGrid } from "./resources-grid";
import { ActiveFilters, QuickBrowse, ResultsToolbar, SearchField } from "./resources-toolbar";
import {
  EMPTY_STATE,
  applyPatch,
  buildFacets,
  filterResources,
  isFiltering,
  parseSearch,
  resourceSearchText,
  sortResources,
  toSearch,
  type ResourceState,
} from "./resource-utils";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary";

// Everything the UI offers is derived from the data, once.
const FACETS = buildFacets(RESOURCES);
const INDEX = RESOURCES.map((resource) => ({ resource, haystack: resourceSearchText(resource) }));
const FEATURED = RESOURCES.find((r) => r.featured);
const anySample = RESOURCES.some((r) => r.sample);

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

export function ResourcesLibrary() {
  const search = useSyncExternalStore(subscribe, readSearch, readServerSearch);
  const state = useMemo(() => parseSearch(search, FACETS), [search]);

  const [visible, setVisible] = useState(RESOURCE_PAGE_SIZE);
  const [selected, setSelected] = useState<Resource | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const opener = useRef<HTMLElement | null>(null);

  const deferredQ = useDeferredValue(state.q);
  const results = useMemo(
    () => sortResources(filterResources(INDEX, { ...state, q: deferredQ }), state.sort),
    [state, deferredQ]
  );

  // The featured resource leads the default view. Once you search or filter, only matches are listed.
  const filtering = isFiltering(state);
  const featured = !filtering ? FEATURED : undefined;
  const list = featured ? results.filter((r) => r.slug !== featured.slug) : results;
  const shown = list.slice(0, visible);
  const shownCount = shown.length + (featured ? 1 : 0);
  const remaining = list.length - shown.length;
  const countText =
    results.length === 0 ? "No resources found." : `Showing ${shownCount} of ${results.length} resource${results.length === 1 ? "" : "s"}`;

  const commit = (next: ResourceState, resetPage = true) => {
    writeSearch(toSearch(next));
    if (resetPage) setVisible(RESOURCE_PAGE_SIZE);
  };
  // Reads the URL at call time, so two changes in quick succession never overwrite each other.
  const update = (patch: Partial<ResourceState>) =>
    commit(applyPatch(parseSearch(readSearch(), FACETS), patch, FACETS), !("view" in patch));
  const reset = () => commit(EMPTY_STATE);

  const open = (r: Resource, el: HTMLElement) => {
    opener.current = el;
    setSelected(r);
  };
  const restoreFocus = () => opener.current?.focus();

  return (
    <section id="resource-library" aria-labelledby="resource-library-heading" className="scroll-mt-28 pt-8 pb-14 sm:pt-12 sm:pb-20">
      <div className="px-4 sm:px-6">
        <div className="mx-auto max-w-[1800px]">
          <SectionHeader
            id="resource-library-heading"
            eyebrow="Resources Library"
            title={
              <>
                <span className="block">Find Something Useful.</span>
                <span className={cn("block", GRADIENT_TEXT)}>Keep Learning.</span>
              </>
            }
          >
            Explore guides, references, templates, practice material and other resources that can help you understand
            concepts, practise skills and continue learning.
          </SectionHeader>

          {anySample && (
            <p className="mt-6 max-w-3xl border-l-2 border-primary/40 pl-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              The resources below are sample records that show how learning resources will be presented. Real
              resources and files will replace them as they are published.
            </p>
          )}

          {featured && (
            <div className="mt-8 lg:mt-10">
              <FeaturedResource resource={featured} onOpen={open} />
            </div>
          )}
        </div>
      </div>

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
                <>
                  <ResourcesGrid resources={shown} view={state.view} onOpen={open} />
                  {remaining > 0 && (
                    <div className="mt-8 flex justify-center">
                      <button
                        type="button"
                        onClick={() => setVisible((n) => n + RESOURCE_PAGE_SIZE)}
                        className={cn(
                          "h-12 rounded-lg border border-primary/30 bg-card px-8 text-base font-semibold text-foreground transition-colors hover:bg-muted",
                          FOCUS
                        )}
                      >
                        Load More
                        <span className="ml-2 font-normal text-muted-foreground">({Math.min(RESOURCE_PAGE_SIZE, remaining)} more)</span>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <ResourceEmptyState onClear={reset} />
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
          restoreFocus();
        }}
      />
      <ResourcePreviewDrawer
        resource={selected}
        onClose={() => {
          setSelected(null);
          restoreFocus();
        }}
      />
    </section>
  );
}
