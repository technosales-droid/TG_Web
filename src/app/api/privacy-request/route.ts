import { randomUUID } from "node:crypto";
import type { NextRequest } from "next/server";
import { LIMITS, clean, cellSafe, cellSafeText, validateAccessFields } from "@/lib/access";
import { PRIVACY_POLICY_VERSION } from "@/lib/legal-versions";
import { PRIVACY_REQUEST_TYPES } from "@/lib/privacy-requests";
import { DeliveryUnavailable, deliver } from "@/server/delivery";
import { fail, guardPost, json } from "@/server/guard";

export const dynamic = "force-dynamic";

/**
 * Sends a privacy request (access, correction, deletion, withdrawal of consent or a question) to the team. This route
 * only delivers it. It does not verify the requester or act on the request; that is a backend and staff process, and
 * the response says so.
 */
export async function POST(req: NextRequest) {
  const g = await guardPost(req, "privacy-request", 10, 60 * 60_000);
  if (g.res) return g.res;
  const b = g.body;
  if (typeof b.website === "string" && b.website !== "") return fail(400, "Invalid request.");

  const type = PRIVACY_REQUEST_TYPES.find((t) => t.id === b.type)?.id;
  const name = clean(b.name, LIMITS.name);
  const email = clean(b.email, LIMITS.email).toLowerCase();
  const message = clean(b.message, LIMITS.text);
  if (!type) return fail(400, "Please choose the kind of request.");
  const errors = validateAccessFields({ name, email, phone: "0000000", interest: "", ageGroup: "adult", guardianConsent: false });
  if (errors.name || errors.email) return json({ ok: false, error: "Please check the highlighted fields.", errors: { name: errors.name, email: errors.email } }, 400);
  if (type === "question" && message.length < 5) return json({ ok: false, error: "Please tell us what you would like to ask.", errors: { message: "Please write your question." } }, 400);

  try {
    await deliver("privacy-request", {
      id: randomUUID(),
      type,
      name: cellSafe(name),
      email,
      message: cellSafeText(message),
      receivedAt: new Date().toISOString(),
      privacyPolicyVersion: PRIVACY_POLICY_VERSION,
    });
    return json({ ok: true });
  } catch (e) {
    if (e instanceof DeliveryUnavailable) {
      console.error("[privacy-request] unavailable:", e.message);
      return fail(503, "This form is not available right now. Please email us instead.");
    }
    throw e;
  }
}
