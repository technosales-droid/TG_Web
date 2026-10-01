// Copy for the course promotion popup (components/promotions/course-promotion-popup.tsx).
//
// Courses, titles, images and links come from COURSE_DETAILS, so a promotion can only ever point at a real, routable
// course page. This file adds only the messages: add several per course to vary the copy. A course with no entry here
// still gets promoted, using its own catalogue description. Keep every line truthful: no counts, ratings, discounts,
// deadlines, scarcity or testimonials.
import { COURSE_DETAILS } from "./course-details";

export interface PromotionMessage {
  headline: string;
  description: string;
  /** Defaults to "Explore <course name>". */
  ctaLabel?: string;
}

export interface CoursePromotion {
  courseId: string;
  courseName: string;
  category: string;
  image: { src: string; alt: string } | null;
  href: string;
  /** Alternative copy for the same course; the popup shows one, chosen at random. */
  messages: PromotionMessage[];
}

const MESSAGES: Record<string, PromotionMessage[]> = {
  "tg-digital-marketing": [
    { headline: "Your next campaign could start here.", description: "Learn digital marketing through practical projects, tools and real-world workflows.", ctaLabel: "Explore Digital Marketing" },
    { headline: "Build work you can show.", description: "Campaign projects that turn what you learn into portfolio-worthy work." },
    { headline: "Curious how brands get noticed?", description: "Explore SEO, social media and performance marketing, step by step." },
  ],
  "tg-gameforge": [
    { headline: "Ever wanted to make your own game?", description: "Start with small exercises and work up to a capstone game project.", ctaLabel: "Explore Game Development" },
    { headline: "From first idea to finished game.", description: "Design, program, animate, test and publish, all in one program.", ctaLabel: "Explore Game Development" },
  ],
  "tg-unity-studio": [
    { headline: "Turn game ideas into playable builds.", description: "Learn Unity and C#, from gameplay and physics to UI, game AI and deployment." },
    { headline: "Learn the engine behind countless games.", description: "Build hands-on with Unity and C#, one working system at a time." },
  ],
  "tg-unreal-studio": [
    { headline: "Build immersive worlds in Unreal.", description: "Create high-quality interactive experiences with Blueprints and C++." },
  ],
  "tg-gameart-studio": [
    { headline: "Give games their look.", description: "Create characters, environments, props and interfaces through 2D and 3D game-art workflows." },
    { headline: "Love drawing? Try drawing for games.", description: "Take your art into game-ready characters, worlds and interfaces." },
  ],
  "tg-gamedesign-studio": [
    { headline: "What makes a game worth playing?", description: "Design mechanics and levels, and plan progression, challenges and rewards." },
    { headline: "Think like a game designer.", description: "Turn ideas into structured, playable game experiences." },
  ],
  "tg-game-animation-vfx": [
    { headline: "Bring game worlds to life.", description: "Animate characters, create VFX and particles, and work with shaders, lighting and cinematics." },
  ],
  "tg-ai-for-games": [
    { headline: "Make game characters think.", description: "Program NPC behaviour, state machines and pathfinding, and try AI-assisted development workflows." },
  ],
};

export const COURSE_PROMOTIONS: CoursePromotion[] = COURSE_DETAILS.map((c) => ({
  courseId: c.slug,
  courseName: c.title,
  category: c.category,
  image: c.heroImage ? { src: c.heroImage, alt: c.heroAlt } : null,
  href: `/programs/${c.slug}`,
  messages: MESSAGES[c.slug] ?? [{ headline: c.title, description: c.description }],
}));
