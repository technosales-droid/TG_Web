// The readable name of the thing a visitor registered from, so the team sees "Unity vs Unreal Engine" in the Sheet and
// not only its technical id. Returns null for an id that is not a real article, resource or project, so a made-up
// sourceId cannot put arbitrary text into the Sheet.
import { getBlogPost } from "@/data/blogs";
import { PROJECTS } from "@/data/projects";
import { RESOURCES } from "@/data/resources";
import type { SourceType } from "@/lib/access";

export function sourceLabel(type: SourceType, id: string): string | null {
  if (type === "blog" || type === "comment" || type === "review") return getBlogPost(id)?.title ?? null;
  if (type === "resource") return RESOURCES.find((r) => r.slug === id)?.title ?? null;
  return PROJECTS.find((p) => p.slug === id)?.title ?? null;
}
