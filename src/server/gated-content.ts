// Content that sits behind the access gate. Import this only from server code (route handlers): it must never reach
// a browser bundle, or the files and links it holds would be readable without registering.
//
// The public catalogue (src/data/projects.ts and resources.ts) shows a card: title, thumbnail, short description and
// category. The full project or the file is defined here and served by /api/content/[kind]/[slug] only to a visitor
// with a valid access session.
//
// Nothing has been published yet, so both maps are empty. To publish: add the record to the public data file with
// `sample: false` (and, for a project, the permission fields), then add its full content below under the same slug.
import { ACTIVE_PROGRAMS } from "@/data/active-programs";
import { PROJECTS, isProjectPublic, type Project } from "@/data/projects";
import { RESOURCES, isResourcePublic } from "@/data/resources";
import { sourceTypeForCreator, type SourceType } from "@/lib/access";
import { DM_PROGRAM_SLUG, GD_PROGRAM_SLUG } from "@/lib/program-routes";

export interface GatedProjectContent {
  longDescription?: string;
  problem?: string;
  solution?: string;
  outcomes?: string[];
  images?: { url: string; alt: string }[];
  videos?: { url: string; label: string }[];
  links?: { label: string; url: string }[];
  relatedProgram?: { label: string; href: string };
  relatedResources?: { label: string; href: string }[];
}

/**
 * A "file" lives in /private-content (never /public, which anyone can fetch) and is streamed by
 * /api/content/resources/[slug]/file only to a visitor with an access session. An "external" resource is a link.
 */
export type GatedResourceContent =
  | { kind: "file"; file: string; downloadName: string; contentType: string }
  | { kind: "external"; url: string };

// TEST ENTRIES: the two entries below exist only to test the access gate end to end. Delete them, and their records in
// src/data/projects.ts and resources.ts, and private-content/access-test-resource.pdf, before launch.
const PROJECT_CONTENT: Record<string, GatedProjectContent> = {
  "access-test-project": {
    longDescription:
      "If you can read this, your access profile works. This entry exists so the Techno Gurukul team can check that projects open only after a visitor creates an access profile.",
    problem: "Gated content must not be readable by anyone who has not registered, including through the page source or the network.",
    solution: "The public catalogue holds only a preview. The full project is sent by the server, and only when the request carries a valid signed access session.",
    outcomes: [
      "A visitor without a profile sees the access form instead of this text.",
      "A visitor with a profile sees this text, and the team records which content they opened.",
    ],
    relatedProgram: { label: "Explore Techno Gurukul programs", href: "/programs" },
  },
};
const RESOURCE_CONTENT: Record<string, GatedResourceContent> = {
  "access-test-resource": {
    kind: "file",
    file: "access-test-resource.pdf",
    downloadName: "techno-gurukul-access-test.pdf",
    contentType: "application/pdf",
  },
};

/** A brochure PDF, gated the same way a resource file is. One entry per course currently open for enrolment. */
export interface GatedBrochureContent {
  kind: "file";
  file: string;
  downloadName: string;
  contentType: string;
}

// BROCHURE FILES NOT YET SUPPLIED: both entries point at a file that does not exist in /private-content yet. The
// download stays gated and correctly answers "not found" (see the file route) rather than a broken link, until the
// real PDFs are added at these exact paths. Keyed by the course's existing route slug (ACTIVE_PROGRAMS' href), so a
// popup or card only ever needs to know the course, never a filename.
const BROCHURE_CONTENT: Record<string, GatedBrochureContent> = {
  [DM_PROGRAM_SLUG]: {
    kind: "file",
    file: "brochure-digital-marketing.pdf",
    downloadName: "techno-gurukul-digital-marketing-brochure.pdf",
    contentType: "application/pdf",
  },
  [GD_PROGRAM_SLUG]: {
    kind: "file",
    file: "brochure-game-development.pdf",
    downloadName: "techno-gurukul-game-development-brochure.pdf",
    contentType: "application/pdf",
  },
};

const isSafeUrl = (u: string) => /^(https:\/\/|\/)[^\s]+$/.test(u);
// Images and videos are shown on this site, so they must be files it hosts (the Content Security Policy blocks others).
const isOwnFile = (u: string) => /^\/[^\s/][^\s]*$/.test(u);

// Fail loudly if the content does not line up with the public catalogue.
for (const slug of Object.keys(PROJECT_CONTENT)) {
  if (!PROJECTS.some((p) => p.slug === slug)) throw new Error(`[gated-content] no project "${slug}"`);
  const c = PROJECT_CONTENT[slug];
  for (const u of [...(c.images ?? []).map((i) => i.url), ...(c.videos ?? []).map((v) => v.url)])
    if (!isOwnFile(u)) throw new Error(`[gated-content] "${slug}": images and videos must be files under /public`);
  for (const l of c.links ?? []) if (!isSafeUrl(l.url)) throw new Error(`[gated-content] "${slug}" has an unsafe link`);
}
for (const [slug, c] of Object.entries(RESOURCE_CONTENT)) {
  if (!RESOURCES.some((r) => r.slug === slug)) throw new Error(`[gated-content] no resource "${slug}"`);
  if (c.kind === "external" && !isSafeUrl(c.url)) throw new Error(`[gated-content] "${slug}" has an unsafe url`);
  if (c.kind === "file" && !/^[a-z0-9][a-z0-9._-]*$/i.test(c.file)) throw new Error(`[gated-content] "${slug}" has an unsafe file name`);
}
for (const [slug, c] of Object.entries(BROCHURE_CONTENT)) {
  if (!ACTIVE_PROGRAMS.some((p) => p.href === `/programs/${slug}`)) throw new Error(`[gated-content] no active course "${slug}"`);
  if (!/^[a-z0-9][a-z0-9._-]*$/i.test(c.file)) throw new Error(`[gated-content] "${slug}" has an unsafe file name`);
}

export const projectSource = (p: Pick<Project, "creatorType">): SourceType => sourceTypeForCreator(p.creatorType);

export function getGatedProject(slug: string) {
  const project = PROJECTS.find((p) => p.slug === slug);
  const content = PROJECT_CONTENT[slug];
  if (!project || !content || !isProjectPublic(project)) return null;
  return { sourceType: projectSource(project), content };
}

export function getGatedResource(slug: string) {
  const resource = RESOURCES.find((r) => r.slug === slug);
  const content = RESOURCE_CONTENT[slug];
  if (!resource || !content || !isResourcePublic(resource)) return null;
  return { sourceType: "resource" as const, content };
}

/** A course's brochure. `slug` is the course's own route slug (see src/lib/program-routes.ts), not a separate id. */
export function getGatedBrochure(slug: string) {
  const course = ACTIVE_PROGRAMS.some((p) => p.href === `/programs/${slug}`);
  const content = BROCHURE_CONTENT[slug];
  if (!course || !content) return null;
  return { sourceType: "brochure" as const, content };
}
