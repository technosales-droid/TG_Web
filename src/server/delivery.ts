// The single boundary to wherever leads, activity and privacy requests are kept. This site has no database, so records
// are sent to a webhook you control (a CRM, a spreadsheet automation, your own API):
//
//   LEAD_WEBHOOK_URL     https URL that accepts POST { kind, sentAt, data, secret }; docs/google-sheets-setup.md
//                        connects it to a Google Sheet
//   LEAD_WEBHOOK_SECRET  optional; sent as "Authorization: Bearer <secret>" and as `secret` in the body
//
// In production nothing is accepted unless the webhook is configured and answers 2xx, so the site never tells a visitor
// their details were received when they were not. In development an unconfigured webhook is allowed, and only the kind
// of event is logged, never the personal details.

export type DeliveryKind = "lead" | "lead-activity" | "enquiry" | "privacy-request" | "content-report";

export class DeliveryUnavailable extends Error {}

const isProd = process.env.NODE_ENV === "production";

export async function deliver(kind: DeliveryKind, data: unknown): Promise<{ persisted: boolean }> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) {
    if (isProd) throw new DeliveryUnavailable("LEAD_WEBHOOK_URL is not set");
    console.info(`[delivery] ${kind}: LEAD_WEBHOOK_URL is not set, so nothing was stored (development only).`);
    return { persisted: false };
  }
  // https only in production; plain http is accepted for a webhook on this same machine (local testing).
  if (isProd && !/^(https:\/\/|http:\/\/(localhost|127\.0\.0\.1)(:|\/))/.test(url)) throw new DeliveryUnavailable("LEAD_WEBHOOK_URL must be https");
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(secret ? { Authorization: `Bearer ${secret}` } : {}) },
    // The secret is also in the body because a Google Apps Script web app cannot read request headers.
    body: JSON.stringify({ kind, sentAt: new Date().toISOString(), data, ...(secret ? { secret } : {}) }),
    signal: AbortSignal.timeout(8000),
    cache: "no-store",
  });
  if (!res.ok) throw new DeliveryUnavailable(`Webhook answered ${res.status}`);
  // Google Apps Script answers 200 even when it rejects a request, so an explicit { ok: false } is also a failure.
  const answer = await res.json().catch(() => null);
  if (answer && answer.ok === false) throw new DeliveryUnavailable(`Webhook rejected the request: ${String(answer.error ?? "")}`.slice(0, 200));
  return { persisted: true };
}
