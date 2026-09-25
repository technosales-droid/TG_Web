import { randomUUID } from "node:crypto";
import { after, type NextRequest } from "next/server";
import { SOURCE_TYPES, clean, type SourceType } from "@/lib/access";
import { deliver } from "@/server/delivery";
import { sourceLabel } from "@/server/source-label";
import { claim, fail, guardPost, json } from "@/server/guard";
import { SessionNotConfigured, sessionFrom } from "@/server/session";

export const dynamic = "force-dynamic";

/**
 * Records that a signed-in visitor opened a piece of gated content, so the team can see what they are interested in.
 * It sends the visitor id, the content and the time. It does not track browsing, scrolling or anything else.
 */
export async function POST(req: NextRequest) {
  const g = await guardPost(req, "activity", 60, 10 * 60_000, 600);
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
  const type = src.sourceType as SourceType;
  const label = sourceLabel(type, sourceId);
  if (label === null) return fail(400, "Invalid request.");
  // Only the first time this person opens a piece of content is recorded, so repeat opens never queue Sheet writes.
  if (claim(`activity:${session.sid}:${type}:${sourceId}`, 24 * 60 * 60_000)) {
    // Logged after the response, so the visitor never waits on the Sheet. A failure is not worth showing them.
    after(() => deliver("lead-activity", { id: randomUUID(), leadId: session.sid, source: { sourceType: type, sourceId }, sourceLabel: label, at: new Date().toISOString() }).catch(() => {}));
  }
  return json({ ok: true });
}
