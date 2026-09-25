// Request guards shared by the API routes: same-origin check (CSRF), a small body limit, and a best-effort rate limit.
import { NextResponse, type NextRequest } from "next/server";

/** State-changing requests must come from this site's own pages. */
export function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export const clientIp = (req: NextRequest) =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";

// ponytail: in-memory buckets. On serverless hosting each instance counts separately, so this only slows casual abuse.
// Use a shared store (Redis, the hosting provider's rate limiter) for a hard limit.
const buckets = new Map<string, { n: number; reset: number }>();
export function limited(key: string, max: number, windowMs: number): boolean {
  // When the host does not pass on the visitor's address, everyone shares one bucket, so it must be far larger.
  if (key.endsWith(":unknown")) max *= 10;
  const now = Date.now();
  if (buckets.size > 5000) for (const [k, v] of buckets) if (v.reset < now) buckets.delete(k);
  const b = buckets.get(key);
  if (!b || b.reset < now) {
    buckets.set(key, { n: 1, reset: now + windowMs });
    return false;
  }
  b.n += 1;
  return b.n > max;
}

// ponytail: per instance, like the rate limiter. A repeat within the window is answered as a success without storing again.
const seen = new Map<string, number>();
export const seenRecently = (key: string) => (seen.get(key) ?? 0) > Date.now();
export function markSeen(key: string, ttlMs = 10 * 60_000) {
  const now = Date.now();
  if (seen.size > 2000) for (const [k, v] of seen) if (v < now) seen.delete(k);
  seen.set(key, now + ttlMs);
}

export const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
export const fail = (status: number, error: string) => json({ ok: false, error }, status);

/** Parses a small JSON body; anything larger or malformed is rejected. */
export async function readJson(req: NextRequest, maxBytes = 8192): Promise<Record<string, unknown> | null> {
  if (!req.headers.get("content-type")?.includes("application/json")) return null;
  const text = await req.text();
  if (text.length > maxBytes) return null;
  try {
    const v = JSON.parse(text);
    return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/** Common checks for a POST route. Returns a response to send, or the parsed body. */
export async function guardPost(req: NextRequest, name: string, max: number, windowMs: number) {
  if (!sameOrigin(req)) return { res: fail(403, "Request not allowed.") };
  if (limited(`${name}:${clientIp(req)}`, max, windowMs)) return { res: fail(429, "Too many attempts. Please wait a while and try again.") };
  const body = await readJson(req);
  if (!body) return { res: fail(400, "Invalid request.") };
  return { body };
}
