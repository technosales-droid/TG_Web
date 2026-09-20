// Single source of truth for the /programs catalogue.
// Adding a program = adding one object to PROGRAM_CATALOGUE. No component changes are needed.
// Only put approved, verified values here. Use `null` for anything that is not known, and the UI
// will simply leave it out (and hide any filter that has fewer than two real values).

export type ProgramIcon =
  | "megaphone"
  | "bar-chart"
  | "search"
  | "code"
  | "pen-tool"
  | "boxes"
  | "layers"
  | "sparkles";

export type ProgramTone = "blue" | "green" | "navy";

export interface CatalogueProgram {
  slug: string;
  href: string;
  title: string;
  /** Badge + category filter, e.g. "Digital & Marketing". */
  category: string;
  /** e.g. "Program", "Short Course", "Workshop", "Certification". */
  type: string;
  /** "Beginner" | "Intermediate" | "Advanced", or null when not stated. */
  level: string | null;
  /** e.g. "Offline / In-Person", "Online", "Hybrid", or null when not stated. */
  format: string | null;
  description: string;
  /** Shown on the card (max 4 are displayed) and used by the tag filter. */
  tags: string[];
  /** Search-only terms; never displayed. */
  keywords?: string[];
  /** Path under /public, or null to use the generated visual. */
  image: string | null;
  visual: { tone: ProgramTone; icons: ProgramIcon[] };
  featured: boolean;
  /** Catalogue order. Higher numbers are newer; "Newest" sorts by this descending. */
  order: number;
}

export const CATALOGUE_PAGE_SIZE = 12;

export const PROGRAM_CATALOGUE: CatalogueProgram[] = [
  {
    slug: "tg-digital-marketing",
    href: "/programs/tg-digital-marketing",
    title: "Digital Marketing",
    category: "Digital & Marketing",
    type: "Program",
    level: null,
    format: "Offline / In-Person",
    description: "Learn how brands grow in the digital world through practical, hands-on work.",
    tags: ["Marketing", "SEO", "Social Media", "Performance Marketing"],
    keywords: ["digital marketing", "strategy", "content", "advertising", "analytics", "campaigns", "search"],
    image: null,
    visual: { tone: "blue", icons: ["megaphone", "bar-chart", "search"] },
    featured: true,
    order: 1,
  },
  {
    slug: "tg-gameforge",
    href: "/programs/tg-gameforge",
    title: "Game Development & Design",
    category: "Creative Technology",
    type: "Program",
    level: null,
    format: null,
    description: "Learn to turn ideas into interactive experiences through practical project work.",
    tags: ["Game Development", "Game Design", "Interactive", "Animation"],
    keywords: ["programming", "digital art", "design", "projects"],
    image: null,
    visual: { tone: "green", icons: ["code", "pen-tool", "boxes"] },
    featured: true,
    order: 2,
  },
];
