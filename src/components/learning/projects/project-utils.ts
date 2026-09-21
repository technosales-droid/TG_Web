import { MEDIA_LABEL, type MediaType, type Project, type ProjectMedia } from "@/data/projects";

export interface ProjectFilters {
  q: string;
  creator: "all" | "student" | "faculty";
  industry: string;
  projectType: string;
  media: "all" | MediaType;
}

export const EMPTY_PROJECT_FILTERS: ProjectFilters = {
  q: "",
  creator: "all",
  industry: "",
  projectType: "",
  media: "all",
};

export const CREATOR_LABEL = { student: "Student Project", faculty: "Faculty Demonstration" } as const;

/** "Sample Student Project" while the record is a sample, otherwise "Student Project". */
export const creatorBadge = (p: Project) => (p.sample ? `Sample ${CREATOR_LABEL[p.type]}` : CREATOR_LABEL[p.type]);

/** Filter options come from the data, never hard-coded. */
export function buildProjectFacets(projects: Project[]) {
  const unique = (values: string[]) => [...new Set(values)];
  const mediaTypes = unique(projects.flatMap((p) => p.media.map((m) => m.type))) as MediaType[];
  return {
    industries: unique(projects.map((p) => p.industry)),
    projectTypes: unique(projects.map((p) => p.projectType)),
    mediaTypes: mediaTypes.map((t) => ({ value: t, label: MEDIA_LABEL[t] })),
    counts: {
      student: projects.filter((p) => p.type === "student").length,
      faculty: projects.filter((p) => p.type === "faculty").length,
    },
  };
}

export function projectSearchText(p: Project): string {
  return [
    p.title,
    p.shortDescription,
    p.longDescription,
    p.type,
    p.type === "student" ? "students" : "faculty",
    p.sample ? "sample" : "",
    p.industry,
    p.program,
    p.course,
    p.projectType,
    p.format,
    ...p.topics,
    ...p.media.map((m) => `${m.type} ${MEDIA_LABEL[m.type]} ${m.label}`),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function filterProjects(
  index: { project: Project; haystack: string }[],
  f: ProjectFilters
): Project[] {
  // Each search word must match at the start of a word, so "seo report" needs both.
  const terms = f.q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => new RegExp(`(^|[^a-z0-9])${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
  return index
    .filter(({ project: p, haystack }) => {
      if (f.creator !== "all" && p.type !== f.creator) return false;
      if (f.industry && p.industry !== f.industry) return false;
      if (f.projectType && p.projectType !== f.projectType) return false;
      if (f.media !== "all" && !p.media.some((m) => m.type === f.media)) return false;
      return terms.every((t) => t.test(haystack));
    })
    .map(({ project }) => project);
}

export const isFiltering = (f: ProjectFilters) =>
  f.q.trim() !== "" || f.creator !== "all" || f.industry !== "" || f.projectType !== "" || f.media !== "all";

/** Short badge for a media item: the file format when known, otherwise the media type. */
export function mediaBadge(m: ProjectMedia): string {
  const ext = (m.url ?? "").split("?")[0].split(".").pop()?.toLowerCase() ?? "";
  const mime = m.mimeType ?? "";
  if (m.type === "pdf" || ext === "pdf" || mime === "application/pdf") return "PDF";
  if (m.type === "document") {
    if (ext === "docx" || mime.includes("wordprocessingml")) return "DOCX";
    if (ext === "txt" || mime === "text/plain") return "TXT";
    return "DOC";
  }
  if (m.type === "spreadsheet") {
    if (ext === "csv" || mime === "text/csv") return "CSV";
    if (ext === "xlsx" || mime.includes("spreadsheetml")) return "XLSX";
    return "XLS";
  }
  if (m.type === "presentation") return ext === "pptx" || mime.includes("presentationml") ? "PPTX" : "PPT";
  if (m.type === "video") return "VIDEO";
  if (m.type === "image") return "IMAGE";
  if (m.type === "gallery") return "GALLERY";
  return "LINK";
}

/** What opening the media does, for the button label and screen readers. */
export const mediaAction: Record<MediaType, string> = {
  image: "View image",
  video: "Watch video",
  pdf: "Open PDF",
  document: "Open document",
  spreadsheet: "Open spreadsheet",
  presentation: "Open presentation",
  "external-link": "Open link",
  gallery: "View gallery",
};
