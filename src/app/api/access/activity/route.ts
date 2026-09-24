import type { NextRequest } from "next/server";
import { SOURCE_TYPES, clean } from "@/lib/access";
import { deliver } from "@/server/delivery";
import { fail, guardPost, json } from "@/server/guard";
import { SessionNotConfigured, sessionFrom } from "@/server/session";

export const dynamic = "force-dynamic";

/**
 * Records that a signed-in visitor opened a piece of gated content, so the team can see what they are interested in.
 * It sends the visitor id, the content and the time. It does not track browsing, scrolling or anything else.
 */
export async function POST(req: NextRequest) {
  const g = await guardPost(req, "activity", 60, 10 * 60_000);
  if (g.res) return g.res;
  let session;
  try {
    session = sessionFrom(req);
  } catch (e) {
    if (e instanceof SessionNotConfigured) return fail(503, "Unavailable.");
    throw e;
  }
  if (!session) return fail(401, "Access required.");
  const src = g.body.source && typeof g.body.source === "object" ? (g.body.source as Record<string, unknown>) : {};
  const sourceId = clean(src.sourceId, 120);
  if (!(SOURCE_TYPES as readonly string[]).includes(src.sourceType as string) || !sourceId) return fail(400, "Invalid request.");
  try {
    await deliver("lead-activity", { leadId: session.sid, source: { sourceType: src.sourceType, sourceId }, at: new Date().toISOString() });
  } catch {
    // Activity is best effort; the visitor still gets their content.
  }
  return json({ ok: true });
}
