// Request guards shared by the API routes: same-origin check (CSRF), a small body limit, and best-effort rate limits.
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

/**
 * The visitor's address, for rate limits. Vercel replaces x-forwarded-for with the real address, so its first entry is
 * safe. Anywhere else the first entries can be written by the visitor, so the entry added by our own proxy (the last)
 * is used. A visitor talking to the server directly can still fake it, which is why every route also has a global limit.
 */
export function clientIp(req: NextRequest): string {
  const list = (req.headers.get("x-forwarded-for") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  if (process.env.VERCEL) return list[0] || req.headers.get("x-real-ip") || "unknown";
  return req.headers.get("x-real-ip") || list[list.length - 1] || "unknown";
}

// ponytail: in-memory buckets. On serverless hosting each instance counts separately, so this only slows casual abuse.
// Use a shared store (Redis, the hosting provider's rate limiter) for a hard limit.
const BUCKETS_MAX = 20_000;
const buckets = new Map<string, { n: number; reset: number }>();
export function limited(key: string, max: number, windowMs: number): boolean {
  // When the host does not pass on the visitor's address, everyone shares one bucket, so it must be far larger.
  if (key.endsWith(":unknown")) max *= 10;
  const now = Date.now();
  if (buckets.size > BUCKETS_MAX) {
    for (const [k, v] of buckets) if (v.reset < now) buckets.delete(k);
    // Still full of live entries (thousands of fake addresses): forget the oldest half rather than grow without limit.
    if (buckets.size > BUCKETS_MAX) {
      let drop = BUCKETS_MAX / 2;
      for (const k of buckets.keys()) if (drop-- > 0) buckets.delete(k);
      else break;
    }
  }
  const b = buckets.get(key);
  if (!b || b.reset < now) {
    buckets.set(key, { n: 1, reset: now + windowMs });
    return false;
  }
  b.n += 1;
  return b.n > max;
}

// A submission being handled, or handled in the last minutes. claim() succeeds once; a repeat is a duplicate.
// Claimed before the record is sent so 60 identical requests arriving at once are one submission, not sixty.
const claims = new Map<string, number>();
export function claim(key: string, ttlMs = 10 * 60_000): boolean {
  const now = Date.now();
  if ((claims.get(key) ?? 0) > now) return false;
  if (claims.size > 20_000) {
    for (const [k, v] of claims) if (v < now) claims.delete(k);
    if (claims.size > 20_000) claims.clear();
  }
  claims.set(key, now + ttlMs);
  return true;
}
export const release = (key: string) => void claims.delete(key);

export const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
export const fail = (status: number, error: string) => json({ ok: false, error }, status);

/** Parses a small JSON body. A body over the limit is refused without reading all of it into memory. */
export async function readJson(req: NextRequest, maxBytes = 8192): Promise<Record<string, unknown> | null> {
  if (!req.headers.get("content-type")?.includes("application/json")) return null;
  const declared = Number(req.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > maxBytes) return null;
  const reader = req.body?.getReader();
  if (!reader) return null;
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.length;
    if (total > maxBytes) {
      await reader.cancel().catch(() => {});
      return null;
    }
    chunks.push(value);
  }
  try {
    const v = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/**
 * Common checks for a POST route. `perIp` is how many a single address may send in `windowMs`; `perMinute` is a cap on the
 * whole route, so a flood from many (or faked) addresses cannot fill the Sheet or use up the receiver's daily quota.
 * Returns a response to send, or the parsed body.
 */
export async function guardPost(req: NextRequest, name: string, perIp: number, windowMs: number, perMinute: number) {
  if (!sameOrigin(req)) return { res: fail(403, "Request not allowed.") };
  if (limited(`${name}:${clientIp(req)}`, perIp, windowMs)) return { res: fail(429, "Too many attempts. Please wait a while and try again.") };
  if (limited(`global:${name}`, perMinute, 60_000)) return { res: fail(429, "We are receiving a lot of requests right now. Please try again in a minute.") };
  const body = await readJson(req);
  if (!body) return { res: fail(400, "Invalid request.") };
  return { body };
}
