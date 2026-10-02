export interface NavLink {
  label: string;
  href: string;
}

export interface ProgramLink extends NavLink {
  tagline: string;
  image: string;
}

// Digital Marketing is Techno Gurukul's signature course, so it takes the large "flagship" tile in the Programs
// menu; Game Development remains a single, real, available course, shown at the same tile size as any other program.
export const DIGITAL_MARKETING_CATEGORY = "Digital Marketing";

export const SIGNATURE_PROGRAM: ProgramLink = {
  label: "TG Digital Marketing",
  href: "/programs/tg-digital-marketing",
  tagline: "SEO, Social Media & Performance Marketing",
  image: "/brand/course-tg-digital-marketing.png",
};

export const PROGRAM_CATEGORY = "Game Development & Design";

export const GAME_DEVELOPMENT_PROGRAMS: ProgramLink[] = [
  {
    label: "Game Development",
    href: "/programs/tg-gameforge",
    tagline: "Professional Game Development & Design",
    image: "/brand/course-tg-gameforge.png",
  },
];

export const LEARNING_LINKS: NavLink[] = [
  { label: "Projects", href: "/learning/projects" },
  { label: "Resources", href: "/learning/resources" },
];


export const ABOUT_LINKS: NavLink[] = [{ label: "About Techno Gurukul", href: "/about" }];

export const CTA_LINK: NavLink = { label: "Enquire Now", href: "/contact" };
