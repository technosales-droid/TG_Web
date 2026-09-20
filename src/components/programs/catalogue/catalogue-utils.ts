import type { CatalogueCourse, CatalogueStatus } from "@/data/catalogue";

export type SortKey = "featured" | "newest" | "az" | "za";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "az", label: "A–Z" },
  { value: "za", label: "Z–A" },
];

export const STATUS_LABEL: Record<CatalogueStatus, string> = {
  active: "Active",
  "coming-soon": "Coming Soon",
};

export interface Filters {
  q: string;
  industry: string | null;
  program: string | null;
  level: string | null;
  format: string | null;
  status: string | null;
  tags: string[];
  sort: SortKey;
}

export const EMPTY_FILTERS: Filters = {
  q: "",
  industry: null,
  program: null,
  level: null,
  format: null,
  status: null,
  tags: [],
  sort: "featured",
};

export interface FacetOption {
  value: string;
  count: number;
  /** Programs only: the industry this program belongs to, so the list can follow the industry filter. */
  industry?: string;
}

export interface Facets {
  industries: FacetOption[];
  programs: FacetOption[];
  levels: FacetOption[];
  formats: FacetOption[];
  statuses: FacetOption[];
  tags: FacetOption[];
}

const LEVEL_ORDER = ["Beginner", "Intermediate", "Advanced"];
const STATUS_ORDER = Object.values(STATUS_LABEL);

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

export function buildFacets(courses: CatalogueCourse[]): Facets {
  const alpha = (a: FacetOption, b: FacetOption) => a.value.localeCompare(b.value);
  const rank = (order: string[]) => (a: FacetOption, b: FacetOption) =>
    (order.indexOf(a.value) === -1 ? 99 : order.indexOf(a.value)) -
      (order.indexOf(b.value) === -1 ? 99 : order.indexOf(b.value)) || alpha(a, b);
  const industryOf = new Map(courses.map((c) => [c.programName, c.industryName]));
  return {
    // Industries and programs keep catalogue order (data order), not alphabetical.
    industries: count(courses.map((c) => c.industryName)),
    programs: count(courses.map((c) => c.programName)).map((o) => ({ ...o, industry: industryOf.get(o.value) })),
    levels: count(courses.map((c) => c.level)).sort(rank(LEVEL_ORDER)),
    formats: count(courses.map((c) => c.format)).sort(alpha),
    statuses: count(courses.map((c) => STATUS_LABEL[c.status])).sort(rank(STATUS_ORDER)),
    tags: count(courses.flatMap((c) => c.tags)).sort((a, b) => b.count - a.count || alpha(a, b)),
  };
}

export function searchText(c: CatalogueCourse): string {
  return [c.title, c.programName, c.industryName, c.level, c.format, c.description, ...c.tags, ...(c.keywords ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function filterCourses(
  index: { course: CatalogueCourse; haystack: string }[],
  f: Filters
): CatalogueCourse[] {
  // Each term must match at the start of a word, so "ai" finds AI but not "campaigns".
  const terms = f.q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => new RegExp(`(^|[^a-z0-9])${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
  return index
    .filter(({ course: c, haystack }) => {
      if (f.industry && c.industryName !== f.industry) return false;
      if (f.program && c.programName !== f.program) return false;
      if (f.level && c.level !== f.level) return false;
      if (f.format && c.format !== f.format) return false;
      if (f.status && STATUS_LABEL[c.status] !== f.status) return false;
      if (f.tags.length && !c.tags.some((t) => f.tags.includes(t))) return false;
      return terms.every((t) => t.test(haystack));
    })
    .map(({ course }) => course);
}

const statusRank = (c: CatalogueCourse) => (c.status === "active" ? 0 : 1);

export function sortCourses(list: CatalogueCourse[], sort: SortKey): CatalogueCourse[] {
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
  return [f.industry, f.program, f.level, f.format, f.status].filter(Boolean).length + f.tags.length;
}

const find = (options: FacetOption[], slug: string | null) =>
  (slug && options.find((o) => slugify(o.value) === slug)?.value) || null;

export function parseFilters(params: URLSearchParams, facets: Facets): Filters {
  const sort = params.get("sort");
  const tagSlugs = (params.get("tags") ?? "").split(",").filter(Boolean);
  return {
    q: params.get("q") ?? "",
    industry: find(facets.industries, params.get("industry")),
    program: find(facets.programs, params.get("program")),
    level: find(facets.levels, params.get("level")),
    format: find(facets.formats, params.get("format")),
    status: find(facets.statuses, params.get("status")),
    tags: facets.tags.filter((t) => tagSlugs.includes(slugify(t.value))).map((t) => t.value),
    sort: SORT_OPTIONS.some((o) => o.value === sort) ? (sort as SortKey) : "featured",
  };
}

export function serializeFilters(f: Filters): string {
  const p = new URLSearchParams();
  if (f.q.trim()) p.set("q", f.q.trim());
  if (f.industry) p.set("industry", slugify(f.industry));
  if (f.program) p.set("program", slugify(f.program));
  if (f.level) p.set("level", slugify(f.level));
  if (f.format) p.set("format", slugify(f.format));
  if (f.status) p.set("status", slugify(f.status));
  if (f.tags.length) p.set("tags", f.tags.map(slugify).join(","));
  if (f.sort !== "featured") p.set("sort", f.sort);
  return p.toString();
}
