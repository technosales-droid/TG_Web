// Blog content. To publish a post, add an entry here; the hero carousel and article pages are
// driven entirely by this list, sorted by `publishedAt` (newest first), so ordering never needs
// to be maintained by hand.
//
// DRAFT COPY: article bodies are general explainers written to make the reading experience
// functional. They contain no statistics or company claims and should still go through editorial
// review before launch. `heroImage` paths currently reuse existing Techno Gurukul brand imagery;
// swap in article-specific photography (ideally 1920x1080+) by changing the path; nothing else.

import { ARTICLE_CONTENT } from "./blog-content";
import type { Block } from "./blog-content/types";
import { BODY_OVERRIDES, LIBRARY_POSTS } from "./blog-library";

export type BlogCategory =
  | "Education"
  | "Game Development"
  | "Game Design"
  | "Digital Marketing"
  | "Careers"
  | "Technology";

/** Display order for the library filter. */
export const BLOG_CATEGORIES: BlogCategory[] = [
  "Education",
  "Game Development",
  "Game Design",
  "Digital Marketing",
  "Careers",
  "Technology",
];

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string;
  /** Minutes, derived from the article body. */
  readTime: number;
  /** `null` renders a category-toned placeholder cover until a photo is supplied. */
  heroImage: string | null;
  heroImageAlt: string;
  /** CSS object-position for the hero photo, so the focal point survives cropping. */
  heroFocus?: string;
  author: string;
  featured: boolean;
  /** Short summary copy the article was seeded with; the article page renders `blocks`. */
  sections: BlogSection[];
  /** The full article (data/blog-content). */
  blocks: Block[];
  takeaways: string[];
}

export type BlogInput = Omit<BlogPost, "readTime" | "blocks" | "takeaways">;

const AUTHOR = "Techno Gurukul Editorial Team";

const blockWords = (blocks: Block[]) =>
  blocks.reduce((n, b) => {
    const text =
      b.type === "ul" || b.type === "ol" ? b.items.join(" ") : b.type === "flow" ? b.steps.map((x) => `${x.label} ${x.text ?? ""}`).join(" ") : b.type === "table" ? [...b.head, ...b.rows.flat()].join(" ") : b.type === "image" ? "" : "text" in b ? b.text : "code" in b ? "" : "";
    return n + text.split(/\s+/).filter(Boolean).length;
  }, 0);

const RAW_POSTS: BlogInput[] = [
  {
    slug: "how-ai-is-changing-game-development",
    title: "How AI Is Changing Game Development: From Procedural Worlds to Smarter NPCs",
    excerpt:
      "AI is changing how games are designed, developed and tested, from procedural content generation to NPC behaviour and faster development workflows.",
    category: "Game Development",
    publishedAt: "2026-09-22",
    heroImage: "/brand/course-tg-ai-for-games.png",
    heroImageAlt: "An illustration of an AI head made of circuitry, held in an open hand",
    author: AUTHOR,
    featured: true,
    sections: [
      {
        heading: "Worlds that build themselves",
        paragraphs: [
          "Procedural generation lets a game create terrain, levels, items and quests from rules instead of hand-placing every element. Designers set the constraints and the system explores the possibilities, which makes large, varied worlds practical for small teams.",
          "The craft has not disappeared; it has moved. Good procedural content depends on well-chosen rules, careful tuning and a designer who knows what a satisfying result looks like.",
        ],
      },
      {
        heading: "Smarter characters",
        paragraphs: [
          "Non-player characters have long relied on state machines and behaviour trees. Newer techniques add pathfinding that adapts to the environment, characters that react to what the player actually does, and dialogue that feels less scripted.",
          "The goal is not realism for its own sake but believable behaviour that supports the player's experience.",
        ],
      },
      {
        heading: "Faster pipelines",
        paragraphs: [
          "AI-assisted tools now help with prototyping, asset variation, animation clean-up and automated testing. They shorten repetitive work, leaving more time for design decisions and polish.",
          "For students, the practical takeaway is to learn the fundamentals first (programming, design and art) and treat AI as another tool in the workflow.",
        ],
      },
    ],
  },
  {
    slug: "state-of-digital-marketing-in-india-2026",
    title: "The State of Digital Marketing in India: What Is Changing in 2026",
    excerpt:
      "How Indian brands are adapting to short-form content, AI-assisted marketing, search changes, creator ecosystems and increasingly fragmented audiences.",
    category: "Digital Marketing",
    publishedAt: "2026-09-15",
    heroImage: "/brand/course-tg-digital-marketing.png",
    heroImageAlt: "A phone held up surrounded by digital marketing icons: content, email, ads and analytics",
    author: AUTHOR,
    featured: true,
    sections: [
      {
        heading: "Attention is spread thin",
        paragraphs: [
          "Audiences now move between short-form video, messaging apps, search, marketplaces and communities in a single day. A brand can no longer rely on one channel to reach the people it cares about.",
        ],
      },
      {
        heading: "Creators and communities",
        paragraphs: [
          "Creators have become a core part of how people discover products, often carrying more trust than a brand's own advertising. Marketers increasingly plan around creator partnerships and community-led content.",
        ],
      },
      {
        heading: "AI in the workflow",
        paragraphs: [
          "AI tools are helping teams draft, translate, analyse and test faster. The advantage goes to marketers who pair that speed with clear strategy, a strong understanding of their audience and sound judgement about what to publish.",
        ],
      },
    ],
  },
  {
    slug: "idea-to-playable-game-pipeline",
    title: "From Idea to Playable Game: The Real Game Development Pipeline Explained",
    excerpt:
      "A practical breakdown of how a game moves from concept and game design to programming, art, testing and release.",
    category: "Game Development",
    publishedAt: "2026-09-08",
    heroImage: "/brand/course-tg-gameforge.png",
    heroImageAlt: "A collage of game development work: code, 3D sculpting and digital art on tablets",
    author: AUTHOR,
    featured: false,
    sections: [
      {
        heading: "Concept and pre-production",
        paragraphs: [
          "Every game starts as an idea, but pre-production turns it into a plan: the core loop, the audience, the scope and a small prototype that proves the idea is fun. Most projects are shaped, or cancelled, here, which is cheaper than doing so later.",
        ],
      },
      {
        heading: "Production",
        paragraphs: [
          "Programmers, artists, designers and audio teams build the game in parallel. Engines such as Unity and Unreal provide the shared foundation, and regular playable builds keep everyone aligned.",
        ],
      },
      {
        heading: "Testing and release",
        paragraphs: [
          "Testing finds bugs and balance problems, while polish turns a working game into a good one. Release is not the end: patches, feedback and updates continue after players arrive.",
        ],
      },
    ],
  },
  {
    slug: "ai-search-is-changing-seo",
    title: "AI Search Is Changing SEO: What Indian Businesses Need to Understand",
    excerpt:
      "Search is becoming more conversational and AI-assisted. Here's what that means for websites, content strategy and discoverability.",
    category: "Digital Marketing",
    publishedAt: "2026-09-01",
    heroImage: "/brand/problem-solving.jpg",
    heroImageAlt: "A person thinking, with question marks and a lightbulb drawn on the wall behind",
    heroFocus: "40% center",
    author: AUTHOR,
    featured: false,
    sections: [
      {
        heading: "Search is turning conversational",
        paragraphs: [
          "People increasingly ask full questions and expect direct, summarised answers. Search results are shifting from a list of links towards answers assembled from many sources.",
        ],
      },
      {
        heading: "What still matters",
        paragraphs: [
          "The fundamentals hold: clear site structure, fast pages, accurate information and content that genuinely helps the reader. Content that answers real questions well is more likely to be surfaced and cited.",
        ],
      },
      {
        heading: "What to do about it",
        paragraphs: [
          "Focus on topics where you have real expertise, write plainly, keep information current and make sure your business details are consistent everywhere they appear. Measure what changes rather than assuming.",
        ],
      },
    ],
  },
  {
    slug: "unity-vs-unreal-engine",
    title: "Unity vs Unreal Engine: Which Game Engine Should You Learn?",
    excerpt:
      "A practical comparison of Unity and Unreal Engine across programming, graphics, learning curve, 2D and 3D development and career applications.",
    category: "Game Development",
    publishedAt: "2026-08-25",
    heroImage: "/brand/course-tg-unity-studio.png",
    heroImageAlt: "A student building a game in the Unity editor across two monitors",
    author: AUTHOR,
    featured: false,
    sections: [
      {
        heading: "Programming",
        paragraphs: [
          "Unity uses C#, which many beginners find approachable. Unreal uses C++ alongside its Blueprint visual scripting system, which lets designers build gameplay without writing code but rewards programmers who go deeper.",
        ],
      },
      {
        heading: "Graphics and scope",
        paragraphs: [
          "Unreal is well known for high-fidelity 3D visuals out of the box. Unity is flexible across platforms and is a common choice for 2D games, mobile titles and smaller teams.",
        ],
      },
      {
        heading: "Which should you learn?",
        paragraphs: [
          "Neither is the wrong choice. Pick the engine that fits the kind of games you want to make, then focus on transferable skills (game design, programming logic and problem solving) which carry across engines.",
        ],
      },
    ],
  },
  {
    slug: "beyond-instagram-where-digital-marketing-is-heading",
    title: "Beyond Instagram: Where Digital Marketing Is Heading Next",
    excerpt:
      "Why marketers need to think beyond a single social platform and build strategies across search, video, creators, communities, websites and owned audiences.",
    category: "Digital Marketing",
    publishedAt: "2026-08-18",
    heroImage: "/brand/portfolio.jpg",
    heroImageAlt: "A laptop and desk objects floating above a grassy hillside",
    author: AUTHOR,
    featured: false,
    sections: [
      {
        heading: "Platform risk is real",
        paragraphs: [
          "Algorithms change, reach fluctuates and platforms rise and fall. A strategy that lives entirely on one social network is only as stable as that network's next update.",
        ],
      },
      {
        heading: "Build owned audiences",
        paragraphs: [
          "Websites, email lists and communities belong to the brand. They give marketers a direct line to their audience and a place to send people from every other channel.",
        ],
      },
      {
        heading: "Think in systems",
        paragraphs: [
          "Search, video, creators and communities each play a different role. The strongest strategies connect them, so each channel supports the others.",
        ],
      },
    ],
  },
  {
    slug: "what-does-a-game-designer-do",
    title: "What Does a Game Designer Actually Do?",
    excerpt:
      "Game design goes far beyond creating characters and levels. Explore mechanics, player psychology, balancing, progression, storytelling and prototyping.",
    category: "Game Development",
    publishedAt: "2026-08-11",
    heroImage: "/brand/course-tg-gamedesign-studio.png",
    heroImageAlt: "A designer working on a 3D character rig across two screens",
    author: AUTHOR,
    featured: false,
    sections: [
      {
        heading: "Designing the experience",
        paragraphs: [
          "A game designer decides what the player does and how it feels. That means defining mechanics, rules, goals and feedback; the systems that make a game work before any polish is applied.",
        ],
      },
      {
        heading: "Balance and progression",
        paragraphs: [
          "Designers tune difficulty, rewards and pacing so players stay challenged without becoming frustrated. This takes iteration, playtesting and a willingness to change ideas that do not work.",
        ],
      },
      {
        heading: "Prototype early",
        paragraphs: [
          "Rough prototypes turn ideas into something testable. Storytelling, level design and player psychology all come together in that loop of building, testing and refining.",
        ],
      },
    ],
  },
  {
    slug: "performance-marketing-in-india",
    title: "Performance Marketing in India: From Clicks to Real Business Outcomes",
    excerpt:
      "A practical look at how modern marketers measure campaigns through acquisition, conversion, retention and return on advertising spend.",
    category: "Digital Marketing",
    publishedAt: "2026-08-04",
    heroImage: "/brand/projects.jpg",
    heroImageAlt: "A team gathered around a wall of notes during a planning workshop",
    heroFocus: "center 35%",
    author: AUTHOR,
    featured: false,
    sections: [
      {
        heading: "Clicks are not the goal",
        paragraphs: [
          "Impressions and clicks are easy to count, but they do not pay the bills. Performance marketing ties spend to outcomes such as enquiries, sales and repeat customers.",
        ],
      },
      {
        heading: "The funnel view",
        paragraphs: [
          "Acquisition brings people in, conversion turns interest into action, and retention keeps customers coming back. Looking at all three stops a campaign from being judged on one number.",
        ],
      },
      {
        heading: "Return on ad spend",
        paragraphs: [
          "Return on advertising spend compares revenue generated with money spent. It is a useful guide, best read alongside margins, customer lifetime value and the quality of the traffic.",
        ],
      },
    ],
  },
  {
    slug: "skills-to-start-a-game-development-career",
    title: "The Skills You Actually Need to Start a Career in Game Development",
    excerpt:
      "Programming is only one part of the equation. Explore game design, 3D art, animation, level design, engines, collaboration and portfolio development.",
    category: "Game Development",
    publishedAt: "2026-07-28",
    heroImage: "/brand/course-tg-gameart-studio.png",
    heroImageAlt: "An artist sculpting a 3D character on a monitor and drawing tablet",
    author: AUTHOR,
    featured: false,
    sections: [
      {
        heading: "Pick a lane, know the neighbours",
        paragraphs: [
          "Games need programmers, designers, 3D and 2D artists, animators and level designers. Choose an area to go deep in, and learn enough about the others to collaborate well.",
        ],
      },
      {
        heading: "Learn an engine",
        paragraphs: [
          "Working in Unity or Unreal teaches how the pieces of a game fit together. Building small, finished projects matters more than starting large ones you never complete.",
        ],
      },
      {
        heading: "Show your work",
        paragraphs: [
          "A portfolio of playable projects, clear write-ups and evidence of teamwork is what most studios look at first. Start building it from your very first project.",
        ],
      },
    ],
  },
  {
    slug: "digital-marketing-vs-traditional-marketing",
    title: "Digital Marketing vs Traditional Marketing: What Has Actually Changed?",
    excerpt:
      "A clear comparison of how audience behaviour, measurement, distribution and communication have evolved in the digital era.",
    category: "Digital Marketing",
    publishedAt: "2026-07-21",
    heroImage: "/brand/learn.jpg",
    heroImageAlt: "A student reaching for a book from a tall library shelf",
    heroFocus: "35% center",
    author: AUTHOR,
    featured: false,
    sections: [
      {
        heading: "Measurement",
        paragraphs: [
          "Traditional media is largely broadcast: you reach a broad audience and estimate the impact. Digital channels let marketers see how people respond and adjust while a campaign is still running.",
        ],
      },
      {
        heading: "Conversation, not just messaging",
        paragraphs: [
          "Audiences can now reply, share and create content of their own. Brands are part of a two-way conversation rather than the only voice in the room.",
        ],
      },
      {
        heading: "They work best together",
        paragraphs: [
          "Traditional and digital marketing are not opposites. The fundamentals of understanding an audience and telling a clear story apply to both, and many campaigns combine them.",
        ],
      },
    ],
  },
];

const BY_NEWEST = [...RAW_POSTS, ...LIBRARY_POSTS]
  .map((post) => (BODY_OVERRIDES[post.slug] ? { ...post, sections: BODY_OVERRIDES[post.slug] } : post))
  .map<BlogPost>((post) => {
    const content = ARTICLE_CONTENT[post.slug];
    const blocks: Block[] = content?.blocks ?? post.sections.flatMap((sec): Block[] => [
      ...(sec.heading ? [{ type: "h2" as const, text: sec.heading }] : []),
      ...sec.paragraphs.map((text) => ({ type: "p" as const, text })),
    ]);
    return { ...post, blocks, takeaways: content?.takeaways ?? [], readTime: Math.max(1, Math.round(blockWords(blocks) / 200)) };
  })
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const getBlogPosts = () => BY_NEWEST;
export const getLatestBlogPosts = (count = 10) => BY_NEWEST.slice(0, count);
export const getBlogPost = (slug: string) => BY_NEWEST.find((p) => p.slug === slug);

export const formatBlogDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** Serialisable subset of a post, for cards, lists and the hero. */
export interface BlogCardData {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  isoDate: string;
  date: string;
  readTime: number;
  heroImage: string | null;
  heroImageAlt: string;
  heroFocus?: string;
}

export const toBlogCard = (p: BlogPost): BlogCardData => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  category: p.category,
  isoDate: p.publishedAt,
  date: formatBlogDate(p.publishedAt),
  readTime: p.readTime,
  heroImage: p.heroImage,
  heroImageAlt: p.heroImageAlt,
  heroFocus: p.heroFocus,
});
