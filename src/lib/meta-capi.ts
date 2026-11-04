// Server-only: sends events to Meta's Conversions API (CAPI), the server-side counterpart to specific browser
// Pixel events (see tracker-scripts.ts for the Pixel itself, consent.ts for why only some events get a CAPI
// counterpart). Only ever called from inside a route handler AFTER the real action it reports on has already
// succeeded -- never expose a route whose only job is to accept one of these events, since that would let any
// visitor manufacture conversions by hitting it directly.
import { createHash } from "node:crypto";
import { META_PIXEL_ID } from "./tracker-scripts.ts";

const GRAPH_VERSION = process.env.META_GRAPH_API_VERSION || "v23.0";
const TIMEOUT_MS = 5000;

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");
// Meta's documented normalization for em/fn/ln before hashing: trim, lowercase.
const hashField = (v: string) => sha256(v.trim().toLowerCase());
// Meta's phone format for hashing: digits only, country code included, no "+", no leading zeros.
const hashPhone = (v: string) => sha256(v.replace(/\D/g, "").replace(/^0+/, ""));

/** Best-effort first/last split of a single "full name" field -- nothing on this site collects first and last
 * name separately. A wrong split only lowers CAPI match quality; it never sends anything not already collected. */
export function splitName(full: string): { firstName?: string; lastName?: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return {};
  if (parts.length === 1) return { firstName: parts[0] };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

export interface CapiUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  clientIp?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
}

export interface CapiEvent {
  eventName: string;
  eventId: string;
  eventSourceUrl?: string;
  user: CapiUserData;
  customData?: Record<string, unknown>;
}

function buildUserData(u: CapiUserData): Record<string, string | string[]> {
  const out: Record<string, string | string[]> = {};
  if (u.email) out.em = [hashField(u.email)];
  if (u.phone) out.ph = [hashPhone(u.phone)];
  if (u.firstName) out.fn = hashField(u.firstName);
  if (u.lastName) out.ln = hashField(u.lastName);
  // Not hashed, per Meta's spec -- these are network/browser identifiers, not personal data in the same sense.
  if (u.clientIp) out.client_ip_address = u.clientIp;
  if (u.userAgent) out.client_user_agent = u.userAgent;
  if (u.fbp) out.fbp = u.fbp;
  if (u.fbc) out.fbc = u.fbc;
  return out;
}

/**
 * Sends one event to Meta's Conversions API. Never throws -- the caller has always already committed the real
 * action (stored a lead, granted access) by the time this runs, so a Meta outage or a bad token must not undo
 * or fail that. Errors are logged with the event name and HTTP status only, never with any field from `user`
 * (hashed or not) or `customData`, and the access token never appears in a thrown error or log line.
 */
export async function sendCapiEvent(e: CapiEvent): Promise<void> {
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!token) {
    if (process.env.NODE_ENV === "production") console.error(`[meta-capi] ${e.eventName}: META_CAPI_ACCESS_TOKEN is not set.`);
    return;
  }
  // Hard rule, not config: a test event code can never leave this process in production, even if one is set.
  const testEventCode = process.env.NODE_ENV === "production" ? undefined : process.env.META_CAPI_TEST_EVENT_CODE;
  const payload = {
    data: [
      {
        event_name: e.eventName,
        event_id: e.eventId,
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        ...(e.eventSourceUrl ? { event_source_url: e.eventSourceUrl } : {}),
        user_data: buildUserData(e.user),
        ...(e.customData ? { custom_data: e.customData } : {}),
      },
    ],
    ...(testEventCode ? { test_event_code: testEventCode } : {}),
  };
  try {
    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${META_PIXEL_ID}/events?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[meta-capi] ${e.eventName} rejected: HTTP ${res.status} ${body.slice(0, 300)}`);
    }
  } catch (err) {
    console.error(`[meta-capi] ${e.eventName} failed: ${err instanceof Error ? err.message : String(err)}`);
  }
}
