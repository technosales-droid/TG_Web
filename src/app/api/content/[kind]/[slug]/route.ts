import type { NextRequest } from "next/server";
import { deliver } from "@/server/delivery";
import { getGatedProject, getGatedResource } from "@/server/gated-content";
import { fail, json, limited, clientIp } from "@/server/guard";
import { SessionNotConfigured, sessionFrom } from "@/server/session";

export const dynamic = "force-dynamic";

/** The gated part of a project or resource. Requires an access session; unpublished content answers 404. */
export async function GET(req: NextRequest, ctx: { params: Promise<{ kind: string; slug: string }> }) {
  const { kind, slug } = await ctx.params;
  if (limited(`content:${clientIp(req)}`, 120, 10 * 60_000)) return fail(429, "Too many requests.");
  let session;
  try {
    session = sessionFrom(req);
  } catch (e) {
    if (e instanceof SessionNotConfigured) return fail(503, "Unavailable.");
    throw e;
  }
  if (!session) return fail(401, "Access required.");

  const found = kind === "projects" ? getGatedProject(slug) : kind === "resources" ? getGatedResource(slug) : null;
  if (!found) return fail(404, "Not found.");

  try {
    await deliver("lead-activity", { leadId: session.sid, source: { sourceType: found.sourceType, sourceId: slug }, at: new Date().toISOString() });
  } catch {
    // Best effort.
  }
  const c = found.content;
  // A private file is reached through the file route, so its location on the server is never sent.
  const content = "kind" in c ? (c.kind === "file" ? { kind: "file", url: `/api/content/resources/${encodeURIComponent(slug)}/file` } : { kind: "external", url: c.url }) : c;
  return json({ ok: true, content });
}
