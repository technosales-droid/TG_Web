// The site's currently enrollable programs, with the real routes, imagery and copy also used
// in the homepage programs marquee and the Programs page hero. Single source of truth so both
// stay in sync; do not duplicate this list elsewhere.
//
// `video` is optional: the Programs page hero plays it (muted, looped, 16:9 source expected) in
// place of `image` when set. `image` may be null for a program with no real photo/video yet, in
// that case the hero falls back to an icon + gradient treatment (`visual`) instead of a photo, the
// same honest fallback the /programs catalogue cards already use for programs with no image.
import { INTERESTS, type Interest } from "@/lib/access";

export interface ActiveProgram {
  category: string;
  title: string;
  description: string;
  outcome: string;
  href: string;
  image: string | null;
  video: string | null;
  alt: string;
  visual?: { tone: "blue" | "sky" | "navy"; icon: "layers" | "pen-tool" | "boxes" };
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
];

/** `href`'s program as its plain catalogue name (e.g. "Digital Marketing"), usable as an access-form Interest value;
 * null when `href` isn't an active program or its title isn't one of the fixed Interest options, in which case no
 * brochure/interest-gated action should be offered for it. */
export function activeProgramInterest(href: string): Interest | null {
  const title = ACTIVE_PROGRAMS.find((p) => p.href === href)?.title;
  return title && (INTERESTS as readonly string[]).includes(title) ? (title as Interest) : null;
}
