// Content for the Faculty & Facilities page, the facility detail pages and the faculty placeholders.
//
// NOTHING here is real institute material yet. Every media item has `src: null`, so it renders as a labelled
// placeholder. To publish a real photo, GIF or video, set that item's `src` (and `poster` for a video): no
// component changes. Facility and faculty wording is deliberately generic: no specifications, capacities,
// equipment, names, credentials or figures.

export type MediaKind = "image" | "video" | "gif";

export interface MediaItem {
  kind: MediaKind;
  /** Real asset path or URL. null = not supplied yet, so a labelled placeholder is shown. */
  src: string | null;
  poster?: string;
  label: string;
  alt?: string;
  /** Shown on a video placeholder, e.g. "2:30". Leave undefined until the real length is known. */
  duration?: string;
}

const img = (label: string): MediaItem => ({ kind: "image", src: null, label });

export const HERO_SLIDES: MediaItem[] = [
  img("Institute exterior"),
  img("Classroom"),
  img("Computer lab"),
  img("Students working on computers"),
  img("Faculty teaching"),
];

export interface CollageItem {
  media: MediaItem;
  /** Grid placement from lg up, on a 12-column, 30-row grid. */
  place: string;
  /** Spans the full width of the 2-column gallery below lg. */
  wide?: boolean;
}

const vid = (label: string): MediaItem => ({ kind: "video", src: null, label });
const gif = (label: string): MediaItem => ({ kind: "gif", src: null, label });

// An asymmetric, magazine-style arrangement in three movements: large landscapes, portraits, small squares and wide
// strips, with small tiles overlapping their neighbours. Below lg it falls back to a simple 2-column gallery.
export const COLLAGE: CollageItem[] = [
  // First movement (rows 1-10)
  { media: vid("Institute Tour Video"), place: "lg:col-[1/8] lg:row-[1/6]", wide: true },
  { media: img("Faculty teaching"), place: "lg:col-[8/11] lg:row-[1/7]" },
  { media: gif("Students building in a lab"), place: "lg:col-[11/13] lg:row-[1/3]" },
  { media: img("Student using a computer"), place: "lg:col-[11/13] lg:row-[3/7]" },
  { media: img("Students building"), place: "lg:col-[1/4] lg:row-[6/11]" },
  { media: img("Classroom Session"), place: "lg:col-[4/8] lg:row-[6/9]" },
  { media: img("Students discussing a project"), place: "lg:col-[8/13] lg:row-[7/11]", wide: true },
  { media: img("Working individually"), place: "lg:col-[4/6] lg:row-[9/11]" },
  { media: img("Casual learning"), place: "lg:col-[6/8] lg:row-[9/11]" },
  // Second movement (rows 11-20)
  { media: vid("Workshop Highlights"), place: "lg:col-[1/6] lg:row-[11/16]", wide: true },
  { media: img("Students presenting"), place: "lg:col-[6/9] lg:row-[11/18]" },
  { media: gif("Project demo"), place: "lg:col-[9/13] lg:row-[11/14]", wide: true },
  { media: img("Pair programming"), place: "lg:col-[9/11] lg:row-[14/18]" },
  { media: img("Design review"), place: "lg:col-[11/13] lg:row-[14/18]" },
  { media: img("Lab session"), place: "lg:col-[1/4] lg:row-[16/21]" },
  { media: img("Note-taking"), place: "lg:col-[4/6] lg:row-[16/18]" },
  { media: vid("Learning in the Lab"), place: "lg:col-[4/9] lg:row-[18/21]", wide: true },
  { media: img("Feedback session"), place: "lg:col-[9/13] lg:row-[18/21]", wide: true },
  // Third movement (rows 21-30): the first pattern, mirrored
  { media: vid("Campus Life Video"), place: "lg:col-[6/13] lg:row-[21/26]", wide: true },
  { media: img("Group project"), place: "lg:col-[3/6] lg:row-[21/27]" },
  { media: gif("Prototype walkthrough"), place: "lg:col-[1/3] lg:row-[21/23]" },
  { media: img("Whiteboard session"), place: "lg:col-[1/3] lg:row-[23/27]" },
  { media: img("Mentor guidance"), place: "lg:col-[10/13] lg:row-[26/31]" },
  { media: vid("Student Showcase Video"), place: "lg:col-[6/10] lg:row-[26/29]", wide: true },
  { media: img("Team collaboration"), place: "lg:col-[1/6] lg:row-[27/31]", wide: true },
  { media: img("Hands-on practice"), place: "lg:col-[8/10] lg:row-[29/31]" },
  { media: vid("Behind the Scenes Video"), place: "lg:col-[6/8] lg:row-[29/31]" },
];

// Small tiles that overlap the ones around them; shown from lg only.
export const COLLAGE_OVERLAYS: { media: MediaItem; place: string }[] = [
  { media: img("Natural-light moment"), place: "lg:col-[6/8] lg:row-[5/7]" },
  { media: img("Quiet study"), place: "lg:col-[5/7] lg:row-[15/17]" },
  { media: img("Late-afternoon light"), place: "lg:col-[6/8] lg:row-[25/27]" },
];

export interface FacultyPlaceholder {
  slug: string;
  name: string;
  role: string;
  designation: string;
  media: MediaItem;
}

// Placeholders only: no real people, roles or credentials. Replace each record when a verified profile exists.
export const FACULTY: FacultyPlaceholder[] = ["01", "02", "03", "04"].map((n) => ({
  slug: `faculty-member-${n}`,
  name: `Faculty Member ${n}`,
  role: "Mentor",
  designation: "Designation",
  media: img(`Faculty Member ${n}`),
}));

export const getFacultyPlaceholder = (slug: string) => FACULTY.find((f) => f.slug === slug);
