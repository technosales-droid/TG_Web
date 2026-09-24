import type { Block } from "@/data/blog-content/types";
import type { BlogCategory } from "@/data/blogs";

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

/** Where an article naturally leads. Categories without a matching program get no program prompt. */
export const PROGRAM_FOR: Partial<Record<BlogCategory, { href: string; cta: string; question: string; topic: string }>> = {
  "Game Development": {
    href: "/programs?category=game-development#programs-listing",
    cta: "Explore Game Development",
    question: "Want to learn game development by building real projects?",
    topic: "game development",
  },
  "Game Design": {
    href: "/programs?category=game-design#programs-listing",
    cta: "Explore Game Design",
    question: "Want to design games people enjoy playing?",
    topic: "game design",
  },
  "Digital Marketing": {
    href: "/programs/tg-digital-marketing",
    cta: "Explore Digital Marketing",
    question: "Want to build practical digital marketing skills?",
    topic: "digital marketing",
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
