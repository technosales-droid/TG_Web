// Reviews and comments for blog articles.
//
// There is no backend yet, so submissions are stored in this browser's localStorage, keyed by
// article slug. That means visitors only see their own entries. To go public, replace `read`/`write`
// below with calls to an API — the Feedback shape and the hook stay the same.
import { useSyncExternalStore } from "react";

export interface BlogReview {
  id: string;
  name: string;
  rating: number;
  text: string;
  createdAt: string;
}

export interface BlogComment {
  id: string;
  name: string;
  text: string;
  createdAt: string;
}

export interface BlogFeedback {
  reviews: BlogReview[];
  comments: BlogComment[];
  /** Id of the review this browser submitted, so it can be edited instead of duplicated. */
  myReviewId: string | null;
}

export const LIMITS = { name: 60, review: 600, comment: 1000 } as const;

const EMPTY: BlogFeedback = { reviews: [], comments: [], myReviewId: null };
const KEY = (slug: string) => `tg-blog-feedback:${slug}`;

const listeners = new Set<() => void>();
const memory = new Map<string, string>();
const cache = new Map<string, { raw: string | null; value: BlogFeedback }>();

const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");

function sanitize(data: unknown): BlogFeedback {
  if (!data || typeof data !== "object") return EMPTY;
  const d = data as Record<string, unknown>;
  const list = (v: unknown) => (Array.isArray(v) ? v : []);
  const reviews = list(d.reviews).flatMap((r): BlogReview[] => {
    const o = r as Record<string, unknown>;
    const rating = Number(o?.rating);
    if (!o || typeof o.id !== "string" || !(rating >= 1 && rating <= 5)) return [];
    return [{ id: o.id, name: str(o.name, LIMITS.name), rating: Math.round(rating), text: str(o.text, LIMITS.review), createdAt: str(o.createdAt, 40) }];
  });
  const comments = list(d.comments).flatMap((c): BlogComment[] => {
    const o = c as Record<string, unknown>;
    if (!o || typeof o.id !== "string" || !str(o.text, 1)) return [];
    return [{ id: o.id, name: str(o.name, LIMITS.name), text: str(o.text, LIMITS.comment), createdAt: str(o.createdAt, 40) }];
  });
  return { reviews, comments, myReviewId: typeof d.myReviewId === "string" ? d.myReviewId : null };
}

function readRaw(slug: string): string | null {
  const inMemory = memory.get(slug);
  if (inMemory !== undefined) return inMemory;
  try {
    return window.localStorage.getItem(KEY(slug));
  } catch {
    return null;
  }
}

function read(slug: string): BlogFeedback {
  const raw = readRaw(slug);
  const hit = cache.get(slug);
  if (hit && hit.raw === raw) return hit.value;
  let value = EMPTY;
  if (raw) {
    try {
      value = sanitize(JSON.parse(raw));
    } catch {
      // Corrupt entry: fall back to empty.
    }
  }
  cache.set(slug, { raw, value });
  return value;
}

function write(slug: string, next: BlogFeedback) {
  const raw = JSON.stringify(next);
  memory.set(slug, raw);
  try {
    window.localStorage.setItem(KEY(slug), raw);
  } catch {
    // Storage blocked (private mode / quota): the in-memory copy keeps this session working.
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export function useBlogFeedback(slug: string): BlogFeedback {
  return useSyncExternalStore(
    subscribe,
    () => read(slug),
    () => EMPTY
  );
}

const newId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export function submitReview(slug: string, input: { name: string; rating: number; text: string }) {
  const current = read(slug);
  const review: BlogReview = {
    id: current.myReviewId ?? newId(),
    name: input.name.trim().slice(0, LIMITS.name),
    rating: Math.min(5, Math.max(1, Math.round(input.rating))),
    text: input.text.trim().slice(0, LIMITS.review),
    createdAt: new Date().toISOString(),
  };
  const others = current.reviews.filter((r) => r.id !== review.id);
  write(slug, { ...current, reviews: [review, ...others], myReviewId: review.id });
}

export function submitComment(slug: string, input: { name: string; text: string }) {
  const current = read(slug);
  const comment: BlogComment = {
    id: newId(),
    name: input.name.trim().slice(0, LIMITS.name),
    text: input.text.trim().slice(0, LIMITS.comment),
    createdAt: new Date().toISOString(),
  };
  write(slug, { ...current, comments: [comment, ...current.comments] });
}
