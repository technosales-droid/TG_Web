// Access session: a signed, HttpOnly cookie. It holds a random visitor id, the first name to show beside comments and
// the age group. It holds no email, phone or other contact detail, and nothing in it is readable by page scripts.
//
// ACCESS_SESSION_SECRET (32+ random characters) is required in production. Without it the session routes fail closed.
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import type { NextRequest, NextResponse } from "next/server";
import type { AgeGroup } from "@/lib/access";

export const IS_PROD = process.env.NODE_ENV === "production";
export const COOKIE_NAME = IS_PROD ? "__Host-tg_access" : "tg_access";
export const SESSION_DAYS = 30;

export interface AccessSession {
  /** Random id that matches the lead record; not derived from any personal detail. */
  sid: string;
  /** First name only. */
  dn: string;
  ag: AgeGroup;
  /** Expiry, seconds since the epoch. */
  exp: number;
}

export class SessionNotConfigured extends Error {}

let devSecret: string | null = null;
function secret(): string {
  const s = process.env.ACCESS_SESSION_SECRET;
  if (s && s.length >= 32) return s;
  if (IS_PROD) throw new SessionNotConfigured("ACCESS_SESSION_SECRET is not set");
  if (!devSecret) {
    devSecret = randomBytes(32).toString("hex");
    console.warn("[access] ACCESS_SESSION_SECRET is not set; using a temporary key. Sessions reset when the server restarts.");
  }
  return devSecret;
}

const b64 = (b: Buffer | string) => Buffer.from(b).toString("base64url");
const sign = (body: string) => createHmac("sha256", secret()).update(body).digest();

export const newSessionId = () => randomBytes(16).toString("hex");

export function createToken(s: AccessSession): string {
  const body = b64(JSON.stringify(s));
  return `${body}.${b64(sign(body))}`;
}

export function readToken(token: string | undefined): AccessSession | null {
  if (!token) return null;
  const [body, mac] = token.split(".");
  if (!body || !mac) return null;
  try {
    const expected = sign(body);
    const given = Buffer.from(mac, "base64url");
    if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
    const s = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as AccessSession;
    if (typeof s.sid !== "string" || typeof s.dn !== "string" || (s.ag !== "adult" && s.ag !== "minor")) return null;
    if (typeof s.exp !== "number" || s.exp < Date.now() / 1000) return null;
    return s;
  } catch (e) {
    if (e instanceof SessionNotConfigured) throw e;
    return null;
  }
}

export const sessionFrom = (req: NextRequest) => readToken(req.cookies.get(COOKIE_NAME)?.value);

export function setSessionCookie(res: NextResponse, s: Omit<AccessSession, "exp">) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_DAYS * 86400;
  res.cookies.set(COOKIE_NAME, createToken({ ...s, exp }), {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  });
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set(COOKIE_NAME, "", { httpOnly: true, secure: IS_PROD, sameSite: "lax", path: "/", maxAge: 0 });
}
