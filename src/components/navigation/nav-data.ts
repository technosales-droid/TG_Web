export interface NavLink {
  label: string;
  href: string;
}

export interface ProgramLink extends NavLink {
  tagline: string;
}

export const PROGRAM_CATEGORY = "Game Development & Design";

export const FLAGSHIP_PROGRAM: ProgramLink = {
  label: "TG GameForge",
  href: "/programs/tg-gameforge",
  tagline: "Professional Game Development & Design",
};

export const DIGITAL_MARKETING_CATEGORY = "Digital Marketing";

export const DIGITAL_MARKETING_PROGRAMS: ProgramLink[] = [
  {
    label: "TG Digital Marketing",
    href: "/programs/tg-digital-marketing",
    tagline: "SEO, Social Media & Performance Marketing",
  },
];

export const SPECIALIZED_PROGRAMS: ProgramLink[] = [
  {
    label: "TG Unity Studio",
    href: "/programs/tg-unity-studio",
    tagline: "Unity Game Development",
  },
  {
    label: "TG Unreal Studio",
    href: "/programs/tg-unreal-studio",
    tagline: "Unreal Engine Development",
  },
  {
    label: "TG GameArt Studio",
    href: "/programs/tg-gameart-studio",
    tagline: "2D & 3D Game Art",
  },
  {
    label: "TG GameDesign Studio",
    href: "/programs/tg-gamedesign-studio",
    tagline: "Game & Level Design",
  },
  {
    label: "TG Game Animation & VFX",
    href: "/programs/tg-game-animation-vfx",
    tagline: "Animation, VFX & Cinematics",
  },
  {
    label: "TG AI for Games",
    href: "/programs/tg-ai-for-games",
    tagline: "AI & Generative AI for Game Development",
  },
];

export const LEARNING_LINKS: NavLink[] = [
  { label: "Curriculum", href: "/learning/curriculum" },
  { label: "How We Teach", href: "/learning/how-we-teach" },
  { label: "Projects", href: "/learning/projects" },
  { label: "Certifications", href: "/learning/certifications" },
  { label: "Resources", href: "/learning/resources" },
];

export const CAREERS_LINKS: NavLink[] = [
  { label: "Placement", href: "/careers-placement/placement" },
  { label: "Internships", href: "/careers-placement/internships" },
  { label: "Portfolio & Resume", href: "/careers-placement/portfolio-resume" },
  { label: "Interview Preparation", href: "/careers-placement/interview-prep" },
  { label: "Industry Connections", href: "/careers-placement/industry-connections" },
];

export const ABOUT_LINKS: NavLink[] = [
  { label: "Mission", href: "/about/mission" },
  { label: "Why Techno Gurukul", href: "/about/why-technogurukul" },
  { label: "Our Approach", href: "/about/approach" },
  { label: "Facilities & Faculty", href: "/about/facilities" },
];

export const CTA_LINK: NavLink = { label: "Enquire Now", href: "/contact" };
