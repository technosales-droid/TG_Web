// The site's currently enrollable programs, with the real routes, imagery and copy also used
// in the homepage programs marquee and the Programs page hero. Single source of truth so both
// stay in sync — do not duplicate this list elsewhere.
//
// `video` is optional: the Programs page hero plays it (muted, looped, 16:9 source expected) in
// place of `image` when set. `image` may be null for a program with no real photo/video yet — in
// that case the hero falls back to an icon + gradient treatment (`visual`) instead of a photo, the
// same honest fallback the /programs catalogue cards already use for programs with no image.
export interface ActiveProgram {
  category: string;
  title: string;
  description: string;
  outcome: string;
  href: string;
  image: string | null;
  video: string | null;
  alt: string;
  visual?: { tone: "blue" | "green" | "navy"; icon: "layers" | "pen-tool" | "boxes" };
}

export const ACTIVE_PROGRAMS: ActiveProgram[] = [
  {
    category: "Digital & Marketing",
    title: "Digital Marketing",
    description:
      "Build practical skills across digital marketing, content, campaigns, audience understanding and measurable digital work.",
    outcome: "Learn. Execute. Measure. Grow.",
    href: "/programs/tg-digital-marketing",
    image: "/brand/programs-digital-marketing.jpg",
    video: "/brand/programs-digital-marketing.mp4",
    alt: "A laptop showing a digital marketing strategy breakdown beside matching handwritten notes",
  },
  {
    category: "Creative Technology",
    title: "Game Development",
    description:
      "Learn the foundations of game creation through design, development, interactive systems and hands-on project work.",
    outcome: "Design. Build. Play.",
    href: "/programs/tg-gameforge",
    image: "/brand/programs-game-development.jpg",
    video: "/brand/programs-game-development.mp4",
    alt: "A person editing a game scene across multiple monitors in a production studio",
  },
  {
    category: "Creative Technology",
    title: "Game Design",
    description:
      "Turn ideas into structured game experiences by designing mechanics, levels, progression, challenges and rewards.",
    outcome: "Mechanics. Levels. Play.",
    href: "/programs/tg-gamedesign-studio",
    image: null,
    video: null,
    alt: "",
    visual: { tone: "navy", icon: "layers" },
  },
];
