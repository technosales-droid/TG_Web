// The readable name of the thing a visitor registered from, so the team sees "Unity vs Unreal Engine" in the Sheet and
// not only its technical id.
import { getBlogPost } from "@/data/blogs";
import { PROJECTS } from "@/data/projects";
import { RESOURCES } from "@/data/resources";
import type { SourceType } from "@/lib/access";

export function sourceLabel(type: SourceType, id: string): string {
  if (type === "blog" || type === "comment" || type === "review") return getBlogPost(id)?.title ?? id;
  if (type === "resource") return RESOURCES.find((r) => r.slug === id)?.title ?? id;
  return PROJECTS.find((p) => p.slug === id)?.title ?? id;
}
