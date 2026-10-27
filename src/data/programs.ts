// The Programs page discovery model: exactly the three real top-level programs Techno Gurukul
// currently offers, each with its real offerings. This does not replace `catalogue.ts` (still the
// validated source of truth for course content, used elsewhere); it's a purpose-built, admin-panel-
// ready shape for this one page: Program -> Offering[], with no "coming soon" concept surfaced.
//
// Game Development offerings are pulled live from COURSE_CATALOGUE by slug, so this page always
// reflects the real, validated course data rather than a second copy of it. Digital Marketing and
// the AI Program are hand-written below, since both are modelled as a Program (not a Course) in
// catalogue.ts.
import { COURSE_CATALOGUE } from "./catalogue";
import { AI_PROGRAM_HREF, AI_PROGRAM_SLUG, DM_PROGRAM_HREF, DM_PROGRAM_SLUG, GD_PROGRAM_SLUG } from "@/lib/program-routes";

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
    // Every current course is taught at the one Nashik institute; hardcoded here rather than added as a Course
    // field, since there is nothing (yet) for it to vary by.
    location: "Nashik, Maharashtra",
    tags: course.tags,
    tools: course.tools,
    href: course.href,
    image,
    status: "active",
    flagship: course.featured,
  };
}

const DIGITAL_MARKETING_OFFERING: Offering = {
  id: DM_PROGRAM_SLUG,
  slug: DM_PROGRAM_SLUG,
  title: "Digital Marketing Professional Program",
  subtitle: "SEO, Social Media & Performance Marketing",
  description:
    "A complete, practical digital marketing learning program covering strategy, content, SEO, advertising, analytics and AI.",
  duration: "3–3.5 Months",
  mode: "Offline / In-Person",
  location: "Nashik, Maharashtra",
  tags: ["Marketing", "SEO", "Social Media", "Performance Marketing", "AI"],
  href: DM_PROGRAM_HREF,
  image: { src: "/brand/course-tg-digital-marketing.png", alt: "A phone held up surrounded by digital marketing icons: content, email, ads and analytics" },
  status: "active",
  flagship: false,
};

// No real photography exists for this program yet (source: Technogurukul_AI_Curriculum_Overview.pdf, no
// imagery supplied). `image.src: null` is the same honest "no photo yet" state GD's studio offerings used
// before theirs were set -- the catalogue card and nav tile both already render an icon + gradient fallback
// for it. Swap in real photography by setting `src` here; nothing else needs to change.
const AI_PROGRAM_OFFERING: Offering = {
  id: AI_PROGRAM_SLUG,
  slug: AI_PROGRAM_SLUG,
  title: "Complete Applied AI Program",
  subtitle: "Generative AI, Automation & Agentic Development",
  description:
    "A 3.5-month course to understand AI, create with it and build useful AI-powered experiences and workflows -- from prompting and Claude through image, video, voice, website and automation work to agentic AI development.",
  duration: "3.5 Months",
  mode: "Offline / In-Person",
  location: "Nashik, Maharashtra",
  tags: ["AI", "Generative AI", "Automation", "Claude", "Agentic AI"],
  href: AI_PROGRAM_HREF,
  image: { src: null, alt: "Students working on AI-generated creative, web and automation projects at Techno Gurukul" },
  status: "active",
  flagship: true,
};

export const PROGRAM_CATEGORIES: ProgramCategory[] = [
  {
    id: "ai-program",
    slug: "ai-program",
    name: "AI Program",
    description: "Practical, in-person training in generative AI, creative AI tools, automation and agentic AI development.",
    offerings: [AI_PROGRAM_OFFERING],
  },
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
      courseOffering(GD_PROGRAM_SLUG, {
        src: "/brand/course-tg-gameforge.png",
        alt: "A collage of game development work: code, 3D sculpting and digital art on tablets",
      }),
    ],
  },
];

export const ALL_OFFERINGS: (Offering & { category: string; categorySlug: string })[] = PROGRAM_CATEGORIES.flatMap(
  (category) => category.offerings.map((offering) => ({ ...offering, category: category.name, categorySlug: category.slug }))
);
