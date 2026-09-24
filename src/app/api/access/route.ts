import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  INTERESTS,
  SOURCE_TYPES,
  cellSafe,
  clean,
  normalizePhone,
  validateAccessFields,
  type AccessRequest,
  type Interest,
  type LeadRecord,
  type SourceType,
} from "@/lib/access";
import { PRIVACY_POLICY_VERSION, TERMS_VERSION } from "@/lib/legal-versions";
import { DeliveryUnavailable, deliver } from "@/server/delivery";
import { fail, guardPost, json } from "@/server/guard";
import { SessionNotConfigured, clearSessionCookie, newSessionId, sessionFrom, setSessionCookie } from "@/server/session";

export const dynamic = "force-dynamic";

/** Who is signed in. Returns the first name and age group only, never contact details. */
export async function GET(req: NextRequest) {
  try {
    const s = sessionFrom(req);
    return json(s ? { authenticated: true, displayName: s.dn, ageGroup: s.ag } : { authenticated: false });
  } catch (e) {
    if (e instanceof SessionNotConfigured) return json({ authenticated: false, unavailable: true });
    throw e;
  }
}

/** Registers a visitor: validates, records the lead through the delivery boundary, then starts a session. */
export async function POST(req: NextRequest) {
  const g = await guardPost(req, "access", 12, 10 * 60_000);
  if (g.res) return g.res;
  const b = g.body;

  // Spam traps: a filled hidden field, or a form submitted faster than a person can type.
  if (typeof b.website === "string" && b.website !== "") return fail(400, "Invalid request.");
  if (typeof b.elapsedMs !== "number" || b.elapsedMs < 3000) return fail(400, "Please take a moment to check your details and try again.");

  const sourceType = b.source && typeof b.source === "object" ? (b.source as Record<string, unknown>).sourceType : null;
  const sourceId = clean(b.source && typeof b.source === "object" ? (b.source as Record<string, unknown>).sourceId : "", 120);
  if (!(SOURCE_TYPES as readonly string[]).includes(sourceType as string) || !sourceId) return fail(400, "Invalid request.");

  const interestRaw = typeof b.interest === "string" ? b.interest : "";
  const v: AccessRequest = {
    name: clean(b.name, 80),
    email: clean(b.email, 254).toLowerCase(),
    phone: normalizePhone(clean(b.phone, 30)),
    interest: (INTERESTS as readonly string[]).includes(interestRaw) ? (interestRaw as Interest) : "",
    ageGroup: b.ageGroup === "minor" ? "minor" : "adult",
    guardianConsent: b.guardianConsent === true,
    // Never marketing to visitors under 18.
    marketingConsent: b.marketingConsent === true && b.ageGroup !== "minor",
    source: { sourceType: sourceType as SourceType, sourceId },
    website: "",
    elapsedMs: b.elapsedMs,
  };
  if (b.interest && !v.interest) return fail(400, "Please choose one of the options.");
  const errors = validateAccessFields(v);
  if (Object.keys(errors).length) return json({ ok: false, error: "Please check the highlighted fields.", errors }, 400);

  const now = new Date().toISOString();
  const id = newSessionId();
  const lead: LeadRecord = {
    id,
    name: cellSafe(v.name),
    email: v.email,
    phone: v.phone,
    interest: v.interest || null,
    ageGroup: v.ageGroup,
    guardianConsent: v.ageGroup === "minor" ? "claimed" : "not-applicable",
    accessPermissions: ["blog-interaction", "resources", "projects"],
    marketingConsent: v.marketingConsent,
    marketingConsentAt: v.marketingConsent ? now : null,
    consentTimestamp: now,
    privacyPolicyVersion: PRIVACY_POLICY_VERSION,
    termsVersion: TERMS_VERSION,
    source: v.source,
    firstAccessedAt: now,
    lastAccessedAt: now,
    createdAt: now,
    updatedAt: now,
  };

  try {
    await deliver("lead", lead);
    const res = json({ ok: true, displayName: v.name.split(" ")[0].slice(0, 30), ageGroup: v.ageGroup });
    setSessionCookie(res, { sid: id, dn: v.name.split(" ")[0].slice(0, 30), ag: v.ageGroup });
    return res;
  } catch (e) {
    if (e instanceof DeliveryUnavailable || e instanceof SessionNotConfigured) {
      console.error("[access] registration unavailable:", e.message);
      return fail(503, "Access registration is not available right now. Please try again later.");
    }
    throw e;
  }
}

/** Ends the session on this device. */
export async function DELETE(req: NextRequest) {
  if (req.headers.get("origin") && new URL(req.headers.get("origin")!).host !== req.headers.get("host")) return fail(403, "Request not allowed.");
  const res = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  clearSessionCookie(res);
  return res;
}
