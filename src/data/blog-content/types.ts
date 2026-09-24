// Rich article content. Every article is a list of blocks rendered by components/blogs/article/article-content.tsx.
// Text may use **bold** and [links](/programs). Only h2 blocks appear in the table of contents.

export type Block =
  | { type: "lead"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; variant: "insight" | "tip" | "example"; title?: string; text: string }
  | { type: "image"; src: string; alt: string; caption: string }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] }
  | { type: "flow"; title?: string; steps: { label: string; text?: string }[] }
  | { type: "code"; lang: string; code: string; caption?: string };

export interface ArticleContent {
  blocks: Block[];
  takeaways: string[];
}

export const lead = (text: string): Block => ({ type: "lead", text });
export const h2 = (text: string): Block => ({ type: "h2", text });
export const h3 = (text: string): Block => ({ type: "h3", text });
export const p = (text: string): Block => ({ type: "p", text });
export const ul = (...items: string[]): Block => ({ type: "ul", items });
export const ol = (...items: string[]): Block => ({ type: "ol", items });
export const quote = (text: string, cite?: string): Block => ({ type: "quote", text, cite });
export const insight = (text: string, title?: string): Block => ({ type: "callout", variant: "insight", title, text });
export const tip = (text: string, title = "Practical tip"): Block => ({ type: "callout", variant: "tip", title, text });
export const example = (text: string, title = "Example"): Block => ({ type: "callout", variant: "example", title, text });
export const image = (img: { src: string; alt: string }, caption: string): Block => ({ type: "image", ...img, caption });
export const table = (head: string[], rows: string[][], caption?: string): Block => ({ type: "table", head, rows, caption });
export const flow = (steps: [string, string?][], title?: string): Block => ({
  type: "flow",
  title,
  steps: steps.map(([label, text]) => ({ label, text })),
});
export const code = (lang: string, source: string, caption?: string): Block => ({ type: "code", lang, code: source, caption });

/** Existing site imagery that can illustrate an article. Alt text describes what each picture actually shows. */
export const IMG = {
  ai: { src: "/brand/course-tg-ai-for-games.png", alt: "An illustration of an AI head made of circuitry, held in an open hand" },
  marketing: { src: "/brand/course-tg-digital-marketing.png", alt: "A phone held up surrounded by digital marketing icons: content, email, ads and analytics" },
  forge: { src: "/brand/course-tg-gameforge.png", alt: "A collage of game development work: code, 3D sculpting and digital art on tablets" },
  unity: { src: "/brand/course-tg-unity-studio.png", alt: "A student building a game in the Unity editor across two monitors" },
  unreal: { src: "/brand/course-tg-unreal-studio.png", alt: "A character facing a large mechanical creature in an Unreal Engine scene" },
  art: { src: "/brand/course-tg-gameart-studio.png", alt: "An artist sculpting a 3D character on a monitor and drawing tablet" },
  vfx: { src: "/brand/course-tg-game-animation-vfx.png", alt: "A split view of a finished VFX shot beside its green-screen production plate" },
  design: { src: "/brand/course-tg-gamedesign-studio.png", alt: "A designer working on a 3D character rig across two screens" },
  workshop: { src: "/brand/projects.jpg", alt: "A team gathered around a wall of notes during a planning workshop" },
  portfolio: { src: "/brand/portfolio.jpg", alt: "A laptop and desk objects floating above a grassy hillside" },
  thinking: { src: "/brand/problem-solving.jpg", alt: "A person thinking, with question marks and a lightbulb drawn on the wall behind" },
  library: { src: "/brand/learn.jpg", alt: "A student reaching for a book from a tall library shelf" },
} as const;
