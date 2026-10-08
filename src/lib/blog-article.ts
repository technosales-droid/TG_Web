import type { Block } from "@/data/blog-content/types";
import type { BlogCategory } from "@/data/blogs";
import { DM_PROGRAM_HREF, GD_PROGRAM_HREF } from "@/lib/program-routes";

export interface TocItem {
  id: string;
  text: string;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Anchor ids for the article's h2 headings, keyed by block index, plus the table-of-contents entries. */
export function headingIds(blocks: Block[]) {
  const used = new Set<string>(["key-takeaways", "reactions", "discussion"]);
  const ids = new Map<number, string>();
  const items: TocItem[] = [];
  blocks.forEach((b, i) => {
    if (b.type !== "h2") return;
    const base = slugify(b.text) || "section";
    let id = base;
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
    used.add(id);
    ids.set(i, id);
    items.push({ id, text: b.text });
  });
  return { ids, items };
}

/** Sections that follow the article body, so the table of contents reaches the whole page. */
export const TAIL_TOC: TocItem[] = [
  { id: "key-takeaways", text: "Key takeaways" },
  { id: "reactions", text: "Reader reactions" },
  { id: "discussion", text: "Discussion" },
];

/** Where an article naturally leads. Every category maps to one of the two live programs -- Education, Careers
 * and Technology cover topics relevant to both, so they point at whichever program a given post leans toward
 * (set per-post isn't practical here; both programs are a safe, honest default since neither claim is false). */
export const PROGRAM_FOR: Record<BlogCategory, { href: string; cta: string; question: string; topic: string }> = {
  "Game Development": {
    href: GD_PROGRAM_HREF,
    cta: "Explore Game Development",
    question: "Want to learn game development by building real projects?",
    topic: "game development",
  },
  "Game Design": {
    href: GD_PROGRAM_HREF,
    cta: "Explore Game Development",
    question: "Want to design games people enjoy playing?",
    topic: "game design",
  },
  "Digital Marketing": {
    href: DM_PROGRAM_HREF,
    cta: "Explore Digital Marketing",
    question: "Want to build practical digital marketing skills?",
    topic: "digital marketing",
  },
  Careers: {
    href: DM_PROGRAM_HREF,
    cta: "Explore Our Programs",
    question: "Want practical, project-based training that builds a real portfolio?",
    topic: "digital marketing or game development",
  },
  Education: {
    href: DM_PROGRAM_HREF,
    cta: "Explore Our Programs",
    question: "Want to learn by building real, hands-on projects?",
    topic: "digital marketing or game development",
  },
  Technology: {
    href: GD_PROGRAM_HREF,
    cta: "Explore Our Programs",
    question: "Want to turn this into a practical, job-ready skill?",
    topic: "digital marketing or game development",
  },
};

/** Categories whose articles are worth suggesting after each other, closest first. */
export const RELATED_CATEGORIES: Record<BlogCategory, BlogCategory[]> = {
  "Game Development": ["Game Design", "Technology", "Careers"],
  "Game Design": ["Game Development", "Education"],
  "Digital Marketing": ["Careers", "Technology", "Education"],
  Education: ["Careers", "Technology"],
  Careers: ["Education", "Technology", "Game Development", "Digital Marketing"],
  Technology: ["Education", "Game Development", "Digital Marketing"],
};
