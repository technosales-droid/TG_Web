// Faculty placeholders shown on course pages (the Instructor section).
//
// NOTHING here is real institute material yet. Every media item has `src: null`, so it renders as a labelled
// placeholder. To publish a real photo, set that item's `src`: no component changes. Faculty wording is
// deliberately generic: no specifications, names, credentials or figures.

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

export interface FacultyPlaceholder {
  slug: string;
  name: string;
  role: string;
  designation: string;
  media: MediaItem;
  /** Optional profile details, shown on course pages when present. Never invented. */
  expertise?: string;
  experience?: string;
  bio?: string;
  projects?: string[];
  certifications?: string[];
  links?: { label: string; href: string }[];
}

// Placeholders only: no real people, roles or credentials. Replace each record when a verified profile exists.
export const FACULTY: FacultyPlaceholder[] = ["01", "02", "03", "04"].map((n) => ({
  slug: `faculty-member-${n}`,
  name: `Faculty Member ${n}`,
  role: "Mentor",
  designation: "Designation",
  media: img(`Faculty Member ${n}`),
}));
