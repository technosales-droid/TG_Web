// Copy for the course promotion popup (components/promotions/course-promotion-popup.tsx).
//
// Courses, titles, images and links come from COURSE_DETAILS, so a promotion can only ever point at a real, routable
// course page. This file adds only the messages: add several per course to vary the copy. A course with no entry here
// still gets promoted, using its own catalogue description. Keep every line truthful: no counts, ratings, discounts,
// deadlines, scarcity or testimonials.
import { COURSE_DETAILS } from "./course-details";
import { DM_PROGRAM_SLUG, GD_PROGRAM_SLUG } from "@/lib/program-routes";

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
  [DM_PROGRAM_SLUG]: [
    { headline: "Your next campaign could start here.", description: "Learn digital marketing through practical projects, tools and real-world workflows.", ctaLabel: "Explore Digital Marketing" },
    { headline: "Build work you can show.", description: "Campaign projects that turn what you learn into portfolio-worthy work." },
    { headline: "Curious how brands get noticed?", description: "Explore SEO, social media and performance marketing, step by step." },
  ],
  [GD_PROGRAM_SLUG]: [
    { headline: "Ever wanted to make your own game?", description: "Start with small exercises and work up to a capstone game project.", ctaLabel: "Explore Game Development" },
    { headline: "From first idea to finished game.", description: "Design, program, animate, test and publish, all in one program.", ctaLabel: "Explore Game Development" },
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
