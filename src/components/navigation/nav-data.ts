import { LEARNING_PROJECTS_RESOURCES_ENABLED } from "@/lib/feature-flags";
import { AI_PROGRAM_HREF, DM_PROGRAM_HREF, GD_PROGRAM_HREF } from "@/lib/program-routes";

export interface NavLink {
  label: string;
  href: string;
}

export interface ProgramLink extends NavLink {
  tagline: string;
  /** Null when there's no real photography yet; the nav tile renders an icon + gradient fallback instead. */
  image: string | null;
  /** Shown as the small uppercase label on the tile (e.g. "Digital Marketing"). */
  eyebrow: string;
}

// The AI Program is Techno Gurukul's signature course, so it takes the large "flagship" tile in the Programs
// menu; Digital Marketing and Game Development are real, available courses, shown as secondary tiles.
export const SIGNATURE_PROGRAM: ProgramLink = {
  label: "AI Course",
  href: AI_PROGRAM_HREF,
  tagline: "Generative AI, Automation & Agentic Development",
  image: null,
  eyebrow: "AI Program",
};

export const SECONDARY_PROGRAMS: ProgramLink[] = [
  {
    label: "Digital Marketing Course",
    href: DM_PROGRAM_HREF,
    tagline: "SEO, Social Media & Performance Marketing",
    image: "/brand/course-tg-digital-marketing.png",
    eyebrow: "Digital Marketing",
  },
  {
    label: "Game Development Course",
    href: GD_PROGRAM_HREF,
    tagline: "Professional Game Development & Design",
    image: "/brand/course-tg-gameforge.png",
    eyebrow: "Game Development & Design",
  },
];

export const LEARNING_LINKS: NavLink[] = LEARNING_PROJECTS_RESOURCES_ENABLED
  ? [
      { label: "Projects", href: "/learning/projects" },
      { label: "Resources", href: "/learning/resources" },
    ]
  : [];


export const ABOUT_LINKS: NavLink[] = [{ label: "About Techno Gurukul", href: "/about" }];

export const CTA_LINK: NavLink = { label: "Enquire Now", href: "/contact" };
