import { readFile } from "node:fs/promises";
import path from "node:path";
import type { NextRequest } from "next/server";
import { deliver } from "@/server/delivery";
import { getGatedBrochure, getGatedResource } from "@/server/gated-content";
import { clientIp, fail, limited } from "@/server/guard";
import { SessionNotConfigured, sessionFrom } from "@/server/session";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Streams a private resource file, only to a visitor with a valid access session. */
export async function GET(req: NextRequest, ctx: { params: Promise<{ kind: string; slug: string }> }) {
  const { kind, slug } = await ctx.params;
  if (limited(`file:${clientIp(req)}`, 60, 10 * 60_000)) return fail(429, "Too many requests.");
  let session;
  try {
    session = sessionFrom(req);
  } catch (e) {
    if (e instanceof SessionNotConfigured) return fail(503, "Unavailable.");
    throw e;
  }
  if (!session) return fail(401, "Access required.");

  const found = kind === "resources" ? getGatedResource(slug) : kind === "brochures" ? getGatedBrochure(slug) : null;
  if (!found || found.content.kind !== "file") return fail(404, "Not found.");

  // The file name was validated when the content was defined; basename is a second guard against path tricks.
  const file = path.join(process.cwd(), "private-content", path.basename(found.content.file));
  let data: Buffer;
  try {
    data = await readFile(file);
  } catch {
    return fail(404, "Not found.");
  }
  try {
    const sourceType = kind === "brochures" ? "brochure" : "resource";
    const action = kind === "brochures" ? "brochure-download" : "download";
    await deliver("lead-activity", { leadId: session.sid, source: { sourceType, sourceId: slug }, at: new Date().toISOString(), action });
  } catch {
    // Best effort.
  }
  return new Response(new Uint8Array(data), {
    headers: {
      "Content-Type": found.content.contentType,
      "Content-Disposition": `attachment; filename="${found.content.downloadName}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
