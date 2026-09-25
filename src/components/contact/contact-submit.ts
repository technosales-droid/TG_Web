import { EMAIL_RE, phoneError } from "@/lib/access";
import { CONTACT } from "./contact-data";

export const INTERESTS = ["Game Development", "Digital Marketing", "General Enquiry", "Career Guidance", "Other"] as const;
export const STATUSES = ["School Student", "College Student", "Graduate", "Working Professional", "Parent / Guardian", "Other"] as const;
export const CONTACT_METHODS = ["Phone", "WhatsApp", "Email"] as const;
export const SOURCES = ["Google Search", "Instagram", "Facebook", "YouTube", "Referral", "Other"] as const;

export const MESSAGE_MAX = 1000;
export const REQUIRED_KEYS = ["fullName", "email", "phone", "interest", "message", "consent"] as const;

/** Groups a plain 10-digit Indian mobile number as `XXXXX XXXXX` while typing. Numbers with a country code or a leading 0
 * are left as digits, so nothing a person types is cut off. */
export function formatPhone(raw: string): string {
  if (raw.trim().startsWith("+")) return "+" + raw.replace(/[^\d\s()-]/g, "").replace(/^\s+/, "").slice(0, 20);
  const d = raw.replace(/\D/g, "").slice(0, 15);
  return d.length > 5 && d.length <= 10 && d[0] !== "0" ? `${d.slice(0, 5)} ${d.slice(5)}` : d;
}

export interface EnquiryValues {
  fullName: string;
  email: string;
  phone: string;
  interest: string;
  status: string;
  contactMethod: string;
  source: string;
  message: string;
  consent: boolean;
}

export const EMPTY_ENQUIRY: EnquiryValues = {
  fullName: "",
  email: "",
  phone: "",
  interest: "",
  status: "",
  contactMethod: "",
  source: "",
  message: "",
  consent: false,
};

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

export function validateEnquiry(v: EnquiryValues): EnquiryErrors {
  const e: EnquiryErrors = {};
  if (v.fullName.trim().length < 2 || !/\p{L}/u.test(v.fullName)) e.fullName = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  const pe = phoneError(v.phone);
  if (pe) e.phone = pe;
  if (!v.interest) e.interest = "Please tell us what you're interested in.";
  if (!v.message.trim()) e.message = "Please enter a message.";
  else if (v.message.length > MESSAGE_MAX) e.message = `Please keep your message under ${MESSAGE_MAX} characters.`;
  if (!v.consent) e.consent = "Please agree to be contacted.";
  return e;
}

/** The fallback: an email to the team with the enquiry pre-filled, used only if sending fails. */
export function buildMailto(v: EnquiryValues): { mailto: string; email: string } {
  const email = CONTACT.email ?? "admission@technogurukul.com";
  const lines = [`Name: ${v.fullName.trim()}`, `Email: ${v.email.trim()}`, `Phone: ${v.phone.trim()}`, `Interested in: ${v.interest}`];
  if (v.status) lines.push(`Current status: ${v.status}`);
  if (v.contactMethod) lines.push(`Preferred contact: ${v.contactMethod}`);
  if (v.source) lines.push(`Heard about us via: ${v.source}`);
  lines.push("", v.message.trim());
  return { mailto: `mailto:${email}?subject=${encodeURIComponent(`Enquiry: ${v.interest}`)}&body=${encodeURIComponent(lines.join("\n"))}`, email };
}

/** Sends the enquiry to the server, which stores it. Resolves to an error message when it could not be sent. */
export async function sendEnquiry(v: EnquiryValues, openedAt: number, website: string, submissionId: string): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...v, website, submissionId, elapsedMs: Date.now() - openedAt }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) return { ok: true };
    return { ok: false, error: data.error ?? "Something went wrong. Please try again." };
  } catch {
    return { ok: false, error: "We could not reach the server. Check your connection and try again." };
  }
}
