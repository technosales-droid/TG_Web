import { useSyncExternalStore } from "react";

// Reader reviews and comments. There is no backend yet, so entries are kept in this browser only (localStorage) and
// are visible only to the person who wrote them. Nothing is seeded: an article with no entries shows an empty state.
// To go live, replace read()/write() with calls to an API; the components do not change.

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  createdAt: number;
}
export interface Comment {
  id: string;
  name: string;
  text: string;
  createdAt: number;
  /** Set on replies. */
  parentId?: string;
}
export interface Feedback {
  reviews: Review[];
  comments: Comment[];
}

export const LIMITS = { name: 60, review: 1200, comment: 1000 } as const;

const EMPTY: Feedback = { reviews: [], comments: [] };
const listeners = new Set<() => void>();
const cache = new Map<string, { raw: string | null; data: Feedback }>();
const key = (slug: string) => `tg-blog-feedback:${slug}`;

function rawOf(slug: string) {
  try {
    return localStorage.getItem(key(slug));
  } catch {
    return null;
  }
}

function read(slug: string): Feedback {
  const raw = rawOf(slug);
  const hit = cache.get(slug);
  if (hit && hit.raw === raw) return hit.data;
  let data = EMPTY;
  if (raw) {
    try {
      const v = JSON.parse(raw);
      if (Array.isArray(v.reviews) && Array.isArray(v.comments)) data = v;
    } catch {}
  }
  cache.set(slug, { raw, data });
  return data;
}

function write(slug: string, data: Feedback) {
  try {
    localStorage.setItem(key(slug), JSON.stringify(data));
  } catch {}
  // If storage is blocked the entry still shows for this visit.
  cache.set(slug, { raw: rawOf(slug), data });
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  window.addEventListener("storage", l);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", l);
  };
};

export const useBlogFeedback = (slug: string) =>
  useSyncExternalStore(subscribe, () => read(slug), () => EMPTY);

const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

export function addReview(slug: string, r: Pick<Review, "name" | "rating" | "text">) {
  const cur = read(slug);
  write(slug, { ...cur, reviews: [{ id: uid(), createdAt: Date.now(), ...r }, ...cur.reviews] });
}

export function addComment(slug: string, c: Pick<Comment, "name" | "text" | "parentId">) {
  const cur = read(slug);
  write(slug, { ...cur, comments: [...cur.comments, { id: uid(), createdAt: Date.now(), ...c }] });
}
