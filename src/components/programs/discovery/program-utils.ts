import { ALL_OFFERINGS, PROGRAM_CATEGORIES } from "@/data/programs";

export type SortKey = "featured" | "az" | "za";
export type ViewMode = "grid" | "list";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "az", label: "A–Z" },
  { value: "za", label: "Z–A" },
];

/** Everything the discovery UI remembers, and everything that lives in the URL. */
export interface ProgramState {
  q: string;
  category: string;
  topics: string[];
  durations: string[];
  sort: SortKey;
  view: ViewMode;
}

export const EMPTY_STATE: ProgramState = { q: "", category: "", topics: [], durations: [], sort: "featured", view: "grid" };

export type OfferingWithCategory = (typeof ALL_OFFERINGS)[number];

const uniq = <T,>(v: T[]) => [...new Set(v)];
const alpha = (a: string, b: string) => a.localeCompare(b);

export interface FacetOption {
  value: string;
  label: string;
  count: number;
}

export interface Facets {
  categories: FacetOption[];
  topics: FacetOption[];
  durations: FacetOption[];
}

// Everything the UI offers is derived from the data.
export function buildFacets(offerings: OfferingWithCategory[]): Facets {
  return {
    categories: PROGRAM_CATEGORIES.map((c) => ({
      value: c.slug,
      label: c.name,
      count: offerings.filter((o) => o.categorySlug === c.slug).length,
    })),
    topics: uniq(offerings.flatMap((o) => o.tags))
      .sort(alpha)
      .map((t) => ({ value: t, label: t, count: offerings.filter((o) => o.tags.includes(t)).length })),
    durations: uniq(offerings.flatMap((o) => (o.duration ? [o.duration] : []))).map((d) => ({
      value: d,
      label: d,
      count: offerings.filter((o) => o.duration === d).length,
    })),
  };
}

export function offeringSearchText(o: OfferingWithCategory): string {
  return [o.title, o.subtitle, o.description, o.category, o.duration, o.mode, ...o.tags, ...(o.tools ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export type SearchIndex = { offering: OfferingWithCategory; haystack: string }[];

export function filterOfferings(index: SearchIndex, s: ProgramState): OfferingWithCategory[] {
  // Each search word must match at the start of a word, so "unreal studio" needs both.
  const terms = s.q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => new RegExp(`(^|[^a-z0-9])${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
  const anyOf = <T,>(picked: T[], has: (v: T) => boolean) => picked.length === 0 || picked.some(has);
  return index
    .filter(({ offering: o, haystack }) => {
      if (s.category && o.categorySlug !== s.category) return false;
      if (!anyOf(s.topics, (t) => o.tags.includes(t))) return false;
      if (!anyOf(s.durations, (d) => o.duration === d)) return false;
      return terms.every((t) => t.test(haystack));
    })
    .map(({ offering }) => offering);
}

const SORTERS: Record<SortKey, (a: OfferingWithCategory, b: OfferingWithCategory) => number> = {
  featured: (a, b) => Number(b.flagship) - Number(a.flagship),
  az: (a, b) => a.title.localeCompare(b.title),
  za: (a, b) => b.title.localeCompare(a.title),
};
export const sortOfferings = (list: OfferingWithCategory[], sort: SortKey) => [...list].sort(SORTERS[sort]);

export const activeFilterCount = (s: ProgramState) => (s.category ? 1 : 0) + s.topics.length + s.durations.length;
export const isFiltering = (s: ProgramState) => s.q.trim() !== "" || activeFilterCount(s) > 0;

export interface Chip {
  key: string;
  label: string;
  remove: Partial<ProgramState>;
}

export function activeChips(s: ProgramState): Chip[] {
  const chips: Chip[] = [];
  const q = s.q.trim();
  if (q) chips.push({ key: "q", label: `Search: ${q}`, remove: { q: "" } });
  if (s.category) {
    const cat = PROGRAM_CATEGORIES.find((c) => c.slug === s.category);
    chips.push({ key: "category", label: cat?.name ?? s.category, remove: { category: "" } });
  }
  for (const t of s.topics) chips.push({ key: `topic:${t}`, label: t, remove: { topics: s.topics.filter((x) => x !== t) } });
  for (const d of s.durations) chips.push({ key: `duration:${d}`, label: d, remove: { durations: s.durations.filter((x) => x !== d) } });
  return chips;
}

// ------------------------------------------------------------------ URL state

const slugify = (v: string) =>
  v
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const pickFrom = <T extends string>(raw: string | null, options: readonly T[]): T[] =>
  (raw ?? "")
    .split(",")
    .map((v) => options.find((o) => slugify(o) === v))
    .filter((o): o is T => Boolean(o));

export function parseSearch(search: string, facets: Facets): ProgramState {
  const params = new URLSearchParams(search);
  const sort = params.get("sort");
  const categorySlug = params.get("category");
  return {
    q: params.get("q") ?? "",
    category: categorySlug && facets.categories.some((c) => c.value === categorySlug) ? categorySlug : "",
    topics: pickFrom(params.get("topics"), facets.topics.map((t) => t.value)),
    durations: pickFrom(params.get("duration"), facets.durations.map((d) => d.value)),
    sort: SORT_OPTIONS.some((o) => o.value === sort) ? (sort as SortKey) : "featured",
    view: params.get("view") === "list" ? "list" : "grid",
  };
}

export function toSearch(s: ProgramState): string {
  const params = new URLSearchParams();
  if (s.q.trim()) params.set("q", s.q);
  if (s.category) params.set("category", s.category);
  if (s.topics.length) params.set("topics", s.topics.map(slugify).join(","));
  if (s.durations.length) params.set("duration", s.durations.map(slugify).join(","));
  if (s.sort !== "featured") params.set("sort", s.sort);
  if (s.view !== "grid") params.set("view", s.view);
  return params.toString().replace(/%2C/g, ",");
}
