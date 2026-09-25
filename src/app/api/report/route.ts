import { randomUUID } from "node:crypto";
import type { NextRequest } from "next/server";
import { clean } from "@/lib/access";
import { DeliveryUnavailable, deliver } from "@/server/delivery";
import { fail, guardPost, json } from "@/server/guard";
import { SessionNotConfigured, sessionFrom } from "@/server/session";

export const dynamic = "force-dynamic";

/**
 * Reports a comment or review for moderation. It is the intake half of moderation: it sends the report to the team.
 * Removing content is done by an authorised admin against the backend that stores comments (see docs/backend-requirements.md).
 */
export async function POST(req: NextRequest) {
  const g = await guardPost(req, "report", 10, 60 * 60_000);
  if (g.res) return g.res;
  let session;
  try {
    session = sessionFrom(req);
  } catch (e) {
    if (e instanceof SessionNotConfigured) return fail(503, "Unavailable.");
    throw e;
  }
  if (!session) return fail(401, "Access required.");
  const slug = clean(g.body.slug, 120);
  const itemId = clean(g.body.itemId, 60);
  const reason = clean(g.body.reason, 500);
  if (!slug || !itemId) return fail(400, "Invalid request.");
  try {
    await deliver("content-report", { id: randomUUID(), reporterId: session.sid, slug, itemId, reason, at: new Date().toISOString() });
    return json({ ok: true });
  } catch (e) {
    if (e instanceof DeliveryUnavailable) return fail(503, "Reporting is not available right now.");
    throw e;
  }
}
