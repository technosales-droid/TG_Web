export interface NavLink {
  label: string;
  href: string;
}

export interface ProgramLink extends NavLink {
  tagline: string;
  image: string;
}

export const PROGRAM_CATEGORY = "Game Development & Design";

export const FLAGSHIP_PROGRAM: ProgramLink = {
  label: "TG GameForge",
  href: "/programs/tg-gameforge",
  tagline: "Professional Game Development & Design",
  image: "/brand/course-tg-gameforge.png",
};

export const DIGITAL_MARKETING_CATEGORY = "Digital Marketing";

export const DIGITAL_MARKETING_PROGRAMS: ProgramLink[] = [
  {
    label: "TG Digital Marketing",
    href: "/programs/tg-digital-marketing",
    tagline: "SEO, Social Media & Performance Marketing",
    image: "/brand/course-tg-digital-marketing.png",
  },
];

export const SPECIALIZED_PROGRAMS: ProgramLink[] = [
  {
    label: "TG Unity Studio",
    href: "/programs/tg-unity-studio",
    tagline: "Unity Game Development",
    image: "/brand/course-tg-unity-studio.png",
  },
  {
    label: "TG Unreal Studio",
    href: "/programs/tg-unreal-studio",
    tagline: "Unreal Engine Development",
    image: "/brand/course-tg-unreal-studio.png",
  },
  {
    label: "TG GameArt Studio",
    href: "/programs/tg-gameart-studio",
    tagline: "2D & 3D Game Art",
    image: "/brand/course-tg-gameart-studio.png",
  },
  {
    label: "TG GameDesign Studio",
    href: "/programs/tg-gamedesign-studio",
    tagline: "Game & Level Design",
    image: "/brand/course-tg-gamedesign-studio.png",
  },
  {
    label: "TG Game Animation & VFX",
    href: "/programs/tg-game-animation-vfx",
    tagline: "Animation, VFX & Cinematics",
    image: "/brand/course-tg-game-animation-vfx.png",
  },
  {
    label: "TG AI for Games",
    href: "/programs/tg-ai-for-games",
    tagline: "AI & Generative AI for Game Development",
    image: "/brand/course-tg-ai-for-games.png",
  },
];

export const LEARNING_LINKS: NavLink[] = [
  { label: "Projects", href: "/learning/projects" },
  { label: "Resources", href: "/learning/resources" },
];


export const ABOUT_LINKS: NavLink[] = [
  { label: "About Techno Gurukul", href: "/about" },
  { label: "Facilities & Faculty", href: "/about/facilities" },
];

export const CTA_LINK: NavLink = { label: "Enquire Now", href: "/contact" };
