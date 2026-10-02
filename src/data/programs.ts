// The Programs page discovery model: exactly the three real top-level programs Techno Gurukul
// currently offers, each with its real offerings. This does not replace `catalogue.ts` (still the
// validated source of truth for course content, used elsewhere); it's a purpose-built, admin-panel-
// ready shape for this one page: Program -> Offering[], with no "coming soon" concept surfaced.
//
// Game Development offerings are pulled live from COURSE_CATALOGUE by slug, so this page always
// reflects the real, validated course data rather than a second copy of it. Only Digital Marketing
// is hand-written below, since it is modelled as a Program (not a Course) in catalogue.ts.
import { COURSE_CATALOGUE } from "./catalogue";

export interface OfferingImage {
  src: string | null;
  alt: string;
}

export interface Offering {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  duration?: string;
  mode?: string;
  location?: string;
  tags: string[];
  tools?: string[];
  href: string;
  image: OfferingImage;
  /** Kept for future admin-panel use. Every offering on this page is "active" today. */
  status: "active";
  flagship?: boolean;
}

export interface ProgramCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  offerings: Offering[];
}

function courseOffering(slug: string, image: OfferingImage): Offering {
  const course = COURSE_CATALOGUE.find((c) => c.slug === slug && c.status === "active");
  if (!course || !course.href) throw new Error(`[programs] course "${slug}" is not an active, routable course`);
  return {
    id: course.slug,
    slug: course.slug,
    title: course.title,
    subtitle: course.subtitle,
    description: course.description,
    duration: course.duration,
    mode: course.format ?? undefined,
    tags: course.tags,
    tools: course.tools,
    href: course.href,
    image,
    status: "active",
    flagship: course.featured,
  };
}

const DIGITAL_MARKETING_OFFERING: Offering = {
  id: "tg-digital-marketing",
  slug: "tg-digital-marketing",
  title: "Digital Marketing Professional Program",
  subtitle: "SEO, Social Media & Performance Marketing",
  description:
    "A complete, practical digital marketing learning program covering strategy, content, SEO, advertising, analytics and AI.",
  duration: "3–3.5 Months",
  mode: "Offline / In-Person",
  location: "Nashik, Maharashtra",
  tags: ["Marketing", "SEO", "Social Media", "Performance Marketing", "AI"],
  href: "/programs/tg-digital-marketing",
  image: { src: "/brand/course-tg-digital-marketing.png", alt: "A phone held up surrounded by digital marketing icons: content, email, ads and analytics" },
  status: "active",
  flagship: true,
};

export const PROGRAM_CATEGORIES: ProgramCategory[] = [
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    name: "Digital Marketing",
    description: "Practical, in-person digital marketing training covering strategy through to execution.",
    offerings: [DIGITAL_MARKETING_OFFERING],
  },
  {
    id: "game-development",
    slug: "game-development",
    name: "Game Development",
    description: "A complete, practical path through every part of making a game.",
    offerings: [
      courseOffering("tg-gameforge", {
        src: "/brand/course-tg-gameforge.png",
        alt: "A collage of game development work: code, 3D sculpting and digital art on tablets",
      }),
    ],
  },
];

export const ALL_OFFERINGS: (Offering & { category: string; categorySlug: string })[] = PROGRAM_CATEGORIES.flatMap(
  (category) => category.offerings.map((offering) => ({ ...offering, category: category.name, categorySlug: category.slug }))
);
