// Content that sits behind the access gate. Import this only from server code (route handlers): it must never reach
// a browser bundle, or the files and links it holds would be readable without registering.
//
// The public catalogue (src/data/projects.ts and resources.ts) shows a card: title, thumbnail, short description and
// category. The full project or the file is defined here and served by /api/content/[kind]/[slug] only to a visitor
// with a valid access session.
//
// Nothing has been published yet, so both maps are empty. To publish: add the record to the public data file with
// `sample: false` (and, for a project, the permission fields), then add its full content below under the same slug.
import { PROJECTS, isProjectPublic, type Project } from "@/data/projects";
import { RESOURCES, isResourcePublic } from "@/data/resources";
import { sourceTypeForCreator, type SourceType } from "@/lib/access";

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

export interface GatedResourceContent {
  /** A file under /public or an https URL. */
  url: string;
  /** "file" downloads; "external" opens another site. */
  kind: "file" | "external";
}

const PROJECT_CONTENT: Record<string, GatedProjectContent> = {};
const RESOURCE_CONTENT: Record<string, GatedResourceContent> = {};

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
  if (!isSafeUrl(c.url)) throw new Error(`[gated-content] "${slug}" has an unsafe url`);
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
