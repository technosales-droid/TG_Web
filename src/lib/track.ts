// Centralized wrappers for the handful of business events this site fires beyond the automatic PageView (see
// meta-pixel.tsx / google-tag-manager.tsx for that one). Each function re-checks consent itself via
// consent.ts's read(), rather than trusting the caller, so a stray call site can never send a tracked event
// after a visitor has turned marketing/analytics off -- the one place that knows the real fbq()/dataLayer call
// shape is also the one place that enforces consent for it.
//
// Never pass a visitor's name, email, phone number or message text into any of these -- only non-personal
// metadata about what happened (which program, which source type, which contact method).
import { read } from "./consent.ts";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** A visitor opened an individual program's detail page. Meta standard event; GA4's recommended equivalent
 * (view_item) is pushed to dataLayer for whoever manages the GTM container to wire up, since GA4 itself lives
 * in a GTM tag this repo can't configure. */
export function trackViewContent(params: { contentName: string; contentId: string; contentCategory?: string }) {
  if (read().marketing) {
    window.fbq?.("track", "ViewContent", {
      content_name: params.contentName,
      content_ids: [params.contentId],
      content_type: "product",
      ...(params.contentCategory ? { content_category: params.contentCategory } : {}),
    });
  }
  if (read().analytics) {
    window.dataLayer?.push({ event: "view_item", item_name: params.contentName, item_id: params.contentId });
  }
}

/** A real enquiry was submitted AND accepted by /api/enquiry -- call this only at that point, never on a
 * button click, a form open, or a failed/invalid submission. */
export function trackLead(params: { contentName: string }) {
  if (read().marketing) window.fbq?.("track", "Lead", { content_name: params.contentName });
  if (read().analytics) window.dataLayer?.push({ event: "generate_lead", content_name: params.contentName });
}

/** A visitor's access-profile form was submitted AND accepted by /api/access -- the site's only real
 * registration flow (gates brochures/resources/projects). `sourceType` is the kind of content it unlocked
 * (e.g. "brochure", "resource"), never anything the visitor typed. */
export function trackCompleteRegistration(params: { sourceType: string }) {
  if (read().marketing) window.fbq?.("track", "CompleteRegistration", { content_name: params.sourceType, status: true });
  if (read().analytics) window.dataLayer?.push({ event: "sign_up", method: params.sourceType });
}

/** A visitor clicked a phone, WhatsApp or email contact link -- this is the click only, not a confirmed
 * conversation or a submitted enquiry (that's trackLead, above). Meta's "Contact" standard event is exactly
 * this: telephone/SMS/email/chat contact initiation. */
export function trackContact(method: "phone" | "whatsapp" | "email") {
  if (read().marketing) window.fbq?.("track", "Contact", { content_category: method });
  if (read().analytics) window.dataLayer?.push({ event: "contact_click", method });
}
