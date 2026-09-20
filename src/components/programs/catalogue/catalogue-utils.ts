import type { CatalogueProgram } from "@/data/program-catalogue";

export type SortKey = "featured" | "newest" | "az" | "za";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "az", label: "A–Z" },
  { value: "za", label: "Z–A" },
];

export interface Filters {
  q: string;
  category: string | null;
  level: string | null;
  format: string | null;
  type: string | null;
  parent: string | null;
  tags: string[];
  sort: SortKey;
}

export const EMPTY_FILTERS: Filters = {
  q: "",
  category: null,
  level: null,
  format: null,
  type: null,
  parent: null,
  tags: [],
  sort: "featured",
};

export interface FacetOption {
  value: string;
  count: number;
}

export interface Facets {
  categories: FacetOption[];
  levels: FacetOption[];
  formats: FacetOption[];
  types: FacetOption[];
  parents: FacetOption[];
  tags: FacetOption[];
}

const LEVEL_ORDER = ["Beginner", "Intermediate", "Advanced"];

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function count(values: (string | null)[]): FacetOption[] {
  const map = new Map<string, number>();
  for (const v of values) if (v) map.set(v, (map.get(v) ?? 0) + 1);
  return [...map].map(([value, n]) => ({ value, count: n }));
}

export function buildFacets(programs: CatalogueProgram[]): Facets {
  const alpha = (a: FacetOption, b: FacetOption) => a.value.localeCompare(b.value);
  const byLevel = (a: FacetOption, b: FacetOption) => {
    const ia = LEVEL_ORDER.indexOf(a.value);
    const ib = LEVEL_ORDER.indexOf(b.value);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || alpha(a, b);
  };
  return {
    categories: count(programs.map((p) => p.category)).sort(alpha),
    levels: count(programs.map((p) => p.level)).sort(byLevel),
    formats: count(programs.map((p) => p.format)).sort(alpha),
    types: count(programs.map((p) => p.type)).sort(alpha),
    // Insertion order = catalogue order, so parents list flagship first.
    parents: count(programs.map((p) => p.parentProgram)),
    tags: count(programs.flatMap((p) => p.tags)).sort((a, b) => b.count - a.count || alpha(a, b)),
  };
}

export function searchText(p: CatalogueProgram): string {
  return [p.title, p.parentProgram, p.identity, p.category, p.type, p.level, p.format, p.description, ...p.tags, ...(p.keywords ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function filterPrograms(
  index: { program: CatalogueProgram; haystack: string }[],
  f: Filters
): CatalogueProgram[] {
  // Each term must match at the start of a word, so "ai" finds AI but not "campaigns".
  const terms = f.q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => new RegExp(`(^|[^a-z0-9])${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
  return index
    .filter(({ program: p, haystack }) => {
      if (f.category && p.category !== f.category) return false;
      if (f.level && p.level !== f.level) return false;
      if (f.format && p.format !== f.format) return false;
      if (f.type && p.type !== f.type) return false;
      if (f.parent && p.parentProgram !== f.parent) return false;
      if (f.tags.length && !p.tags.some((t) => f.tags.includes(t))) return false;
      return terms.every((t) => t.test(haystack));
    })
    .map(({ program }) => program);
}

const statusRank = (p: CatalogueProgram) => (p.status === "active" ? 0 : 1);

export function sortPrograms(list: CatalogueProgram[], sort: SortKey): CatalogueProgram[] {
  const out = [...list];
  switch (sort) {
    case "az":
      return out.sort((a, b) => a.title.localeCompare(b.title));
    case "za":
      return out.sort((a, b) => b.title.localeCompare(a.title));
    case "newest":
      return out.sort((a, b) => statusRank(a) - statusRank(b) || b.order - a.order);
    default:
      return out.sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order);
  }
}

export function activeFilterCount(f: Filters): number {
  return [f.category, f.level, f.format, f.type, f.parent].filter(Boolean).length + f.tags.length;
}

const find = (options: FacetOption[], slug: string | null) =>
  (slug && options.find((o) => slugify(o.value) === slug)?.value) || null;

export function parseFilters(params: URLSearchParams, facets: Facets): Filters {
  const sort = params.get("sort");
  const tagSlugs = (params.get("tags") ?? "").split(",").filter(Boolean);
  return {
    q: params.get("q") ?? "",
    category: find(facets.categories, params.get("category")),
    level: find(facets.levels, params.get("level")),
    format: find(facets.formats, params.get("format")),
    type: find(facets.types, params.get("type")),
    parent: find(facets.parents, params.get("program")),
    tags: facets.tags.filter((t) => tagSlugs.includes(slugify(t.value))).map((t) => t.value),
    sort: SORT_OPTIONS.some((o) => o.value === sort) ? (sort as SortKey) : "featured",
  };
}

export function serializeFilters(f: Filters): string {
  const p = new URLSearchParams();
  if (f.q.trim()) p.set("q", f.q.trim());
  if (f.category) p.set("category", slugify(f.category));
  if (f.level) p.set("level", slugify(f.level));
  if (f.format) p.set("format", slugify(f.format));
  if (f.type) p.set("type", slugify(f.type));
  if (f.parent) p.set("program", slugify(f.parent));
  if (f.tags.length) p.set("tags", f.tags.map(slugify).join(","));
  if (f.sort !== "featured") p.set("sort", f.sort);
  return p.toString();
}
