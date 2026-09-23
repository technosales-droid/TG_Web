import { CONTACT } from "./contact-data";

export const INTERESTS = ["Game Development", "Digital Marketing", "General Enquiry", "Career Guidance", "Other"] as const;
export const STATUSES = ["School Student", "College Student", "Graduate", "Working Professional", "Parent / Guardian", "Other"] as const;
export const CONTACT_METHODS = ["Phone", "WhatsApp", "Email"] as const;
export const SOURCES = ["Google Search", "Instagram", "Facebook", "YouTube", "Referral", "Other"] as const;

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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEnquiry(v: EnquiryValues): EnquiryErrors {
  const e: EnquiryErrors = {};
  if (v.fullName.trim().length < 2) e.fullName = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  const phone = v.phone.trim();
  if (!phone) e.phone = "Please enter your phone number.";
  else {
    const digits = phone.replace(/\D/g, "");
    if (!/^[+\d][\d\s()+-]*$/.test(phone) || digits.length < 10 || digits.length > 13) {
      e.phone = "Please enter a valid phone number (10–13 digits).";
    }
  }
  if (!v.interest) e.interest = "Please tell us what you're interested in.";
  if (!v.message.trim()) e.message = "Please enter a message.";
  if (!v.consent) e.consent = "Please agree to be contacted.";
  return e;
}

/** The only place a submission happens. There is no server route or email service in this project
 * yet, so this opens the visitor's email app with the enquiry pre-filled and returns the link.
 * Replace the body with a `fetch` to a real endpoint when one exists — the form needs no other change. */
export function submitEnquiry(v: EnquiryValues): { mailto: string; email: string } {
  const email = CONTACT.email ?? "hello@technogurukul.com";
  const lines = [`Name: ${v.fullName.trim()}`, `Email: ${v.email.trim()}`, `Phone: ${v.phone.trim()}`, `Interested in: ${v.interest}`];
  if (v.status) lines.push(`Current status: ${v.status}`);
  if (v.contactMethod) lines.push(`Preferred contact: ${v.contactMethod}`);
  if (v.source) lines.push(`Heard about us via: ${v.source}`);
  lines.push("", v.message.trim());
  const mailto = `mailto:${email}?subject=${encodeURIComponent(`Enquiry: ${v.interest}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
  window.location.href = mailto;
  return { mailto, email };
}
