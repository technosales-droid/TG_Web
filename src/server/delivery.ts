// The single boundary to wherever leads, activity and privacy requests are kept. This site has no database, so records
// are sent to a webhook you control (a CRM, a spreadsheet automation, your own API):
//
//   LEAD_WEBHOOK_URL     https URL of the receiver; docs/google-sheets-setup.md connects it to a Google Sheet
//   LEAD_WEBHOOK_SECRET  sent as "Authorization: Bearer <secret>" and as `secret` in the body
//
// In production nothing is accepted unless the webhook is configured and confirms { ok: true }, so the site never tells a
// visitor their details were received when they were not. In development an unconfigured webhook is allowed, and only
// the kind of event is logged, never the personal details.
//
// A Google Sheet writes one request at a time and takes about 2 seconds for each. Records that arrive together are
// therefore sent as one batch, and while a batch is in flight the next records queue up and go as the next batch. Every
// record carries an id and the receiver ignores an id it already wrote, so a retry can never create a duplicate.

export type DeliveryKind = "lead" | "lead-activity" | "enquiry" | "privacy-request" | "content-report";

export class DeliveryUnavailable extends Error {}

const isProd = process.env.NODE_ENV === "production";

interface Job {
  kind: DeliveryKind;
  data: unknown;
  sentAt: string;
  ok: () => void;
  err: (e: Error) => void;
}

const MAX_BATCH = 40; // the receiver reads at most 100 cache keys per call and each lead uses two
const MAX_QUEUE = 400; // beyond this, answer "busy" at once instead of making visitors wait
const ACTIVITY_QUEUE = 100; // activity is best effort, so it yields when the queue is long
const ATTEMPT_MS = 25_000;
const queue: Job[] = [];
let running = false;
let timer: ReturnType<typeof setTimeout> | null = null;

export function deliver(kind: DeliveryKind, data: unknown): Promise<{ persisted: boolean }> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) {
    if (isProd) return Promise.reject(new DeliveryUnavailable("LEAD_WEBHOOK_URL is not set"));
    console.info(`[delivery] ${kind}: LEAD_WEBHOOK_URL is not set, so nothing was stored (development only).`);
    return Promise.resolve({ persisted: false });
  }
  // https only in production; plain http is accepted for a webhook on this same machine (local testing).
  if (isProd && !/^(https:\/\/|http:\/\/(localhost|127\.0\.0\.1)(:|\/))/.test(url)) return Promise.reject(new DeliveryUnavailable("LEAD_WEBHOOK_URL must be https"));
  if (queue.length >= MAX_QUEUE || (kind === "lead-activity" && queue.length >= ACTIVITY_QUEUE)) return Promise.reject(new DeliveryUnavailable("busy: delivery queue is full"));
  return new Promise((resolve, reject) => {
    queue.push({ kind, data, sentAt: new Date().toISOString(), ok: () => resolve({ persisted: true }), err: reject });
    if (!running && !timer) timer = setTimeout(pump, 30); // a short pause lets records that arrive together share a batch
  });
}

async function pump() {
  timer = null;
  if (running) return;
  running = true;
  try {
    while (queue.length) await send(queue.splice(0, MAX_BATCH));
  } finally {
    running = false;
  }
}

/** One POST to the receiver. Retries once after a quick failure; a slow failure is not retried, the visitor can retry safely. */
async function post(payload: Record<string, unknown>): Promise<{ ok?: boolean; error?: string; results?: { ok?: boolean; error?: string }[] }> {
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  const body = JSON.stringify({ ...payload, ...(secret ? { secret } : {}) });
  let last = "";
  for (let attempt = 0; attempt < 2; attempt++) {
    const t0 = Date.now();
    try {
      const res = await fetch(process.env.LEAD_WEBHOOK_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(secret ? { Authorization: `Bearer ${secret}` } : {}) },
        // The secret is also in the body because a Google Apps Script web app cannot read request headers.
        body,
        signal: AbortSignal.timeout(ATTEMPT_MS),
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Webhook answered ${res.status}`);
      // Google answers with an HTML page (still status 200) when a quota is used up or access is wrong, so anything that
      // is not a JSON object is a failure, never a success.
      const answer = await res.json().catch(() => null);
      if (!answer || typeof answer !== "object") throw new Error("Webhook did not answer with JSON");
      return answer;
    } catch (e) {
      last = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
      if (Date.now() - t0 > 10_000) break;
    }
  }
  throw new DeliveryUnavailable(last.slice(0, 200));
}

async function send(batch: Job[]) {
  const fail = (job: Job, msg: string) => job.err(new DeliveryUnavailable(msg.slice(0, 200)));
  try {
    const answer = await post({ kind: "batch", sentAt: new Date().toISOString(), records: batch.map((j) => ({ kind: j.kind, sentAt: j.sentAt, data: j.data })) });
    if (answer.ok === true && Array.isArray(answer.results)) {
      batch.forEach((job, i) => (answer.results![i]?.ok === true ? job.ok() : fail(job, `Webhook rejected a record: ${answer.results![i]?.error ?? "no result"}`)));
    } else if (answer.error === "unknown kind") {
      // An older receiver that does not know batches: send the records one at a time.
      for (const job of batch) {
        try {
          const one = await post({ kind: job.kind, sentAt: job.sentAt, data: job.data });
          if (one.ok === true) job.ok();
          else fail(job, `Webhook rejected the request: ${String(one.error ?? "")}`);
        } catch (e) {
          fail(job, e instanceof Error ? e.message : String(e));
        }
      }
    } else {
      batch.forEach((job) => fail(job, `Webhook rejected the request: ${String(answer.error ?? "")}`));
    }
  } catch (e) {
    batch.forEach((job) => fail(job, e instanceof Error ? e.message : String(e)));
  }
}
