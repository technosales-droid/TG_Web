import { randomUUID } from "node:crypto";
import type { NextRequest } from "next/server";
import { CONTACT_METHODS, INTERESTS, MESSAGE_MAX, SOURCES, STATUSES, validateEnquiry, type EnquiryValues } from "@/components/contact/contact-submit";
import { cellSafe, clean, cleanText } from "@/lib/access";
import { PRIVACY_POLICY_VERSION } from "@/lib/legal-versions";
import { DeliveryUnavailable, deliver } from "@/server/delivery";
import { fail, guardPost, json } from "@/server/guard";

export const dynamic = "force-dynamic";

const pick = (v: unknown, list: readonly string[]) => (typeof v === "string" && list.includes(v) ? v : "");

/** The Contact page enquiry. It is stored through the delivery boundary, and the answer says so only when it was. */
export async function POST(req: NextRequest) {
  const g = await guardPost(req, "enquiry", 8, 10 * 60_000);
  if (g.res) return g.res;
  const b = g.body;
  if (typeof b.website === "string" && b.website !== "") return fail(400, "Invalid request.");
  if (typeof b.elapsedMs !== "number" || b.elapsedMs < 3000) return fail(400, "Please take a moment to check your details and try again.");

  const v: EnquiryValues = {
    fullName: clean(b.fullName, 80),
    email: clean(b.email, 254).toLowerCase(),
    phone: clean(b.phone, 30),
    interest: pick(b.interest, INTERESTS),
    status: pick(b.status, STATUSES),
    contactMethod: pick(b.contactMethod, CONTACT_METHODS),
    source: pick(b.source, SOURCES),
    message: cleanText(b.message, MESSAGE_MAX),
    consent: b.consent === true,
  };
  const errors = validateEnquiry(v);
  if (Object.keys(errors).length) return json({ ok: false, error: "Please check the highlighted fields.", errors }, 400);

  const now = new Date().toISOString();
  try {
    await deliver("enquiry", {
      id: randomUUID(),
      name: cellSafe(v.fullName),
      email: v.email,
      phone: v.phone,
      interest: v.interest,
      currentStatus: v.status,
      preferredContact: v.contactMethod,
      heardVia: v.source,
      message: cellSafe(v.message),
      consent: true,
      consentTimestamp: now,
      privacyPolicyVersion: PRIVACY_POLICY_VERSION,
      receivedAt: now,
      page: "/contact",
    });
    return json({ ok: true });
  } catch (e) {
    if (e instanceof DeliveryUnavailable) {
      console.error("[enquiry] unavailable:", e.message);
      return fail(503, "We could not send your enquiry right now.");
    }
    throw e;
  }
}
