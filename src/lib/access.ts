// Shared (browser and server) definitions for the access profile: what is asked, how it is validated and the shape of
// the lead record sent to the backend. Only what is needed is collected: name, email, phone and, optionally, an
// area of interest. No address, ID number, date of birth or other personal detail.

export const INTERESTS = [
  "Courses",
  "Admissions",
  "Game Development",
  "Digital Marketing",
  "Projects",
  "Resources",
  "Career Guidance",
  "Other",
] as const;
export type Interest = (typeof INTERESTS)[number];

/** The kind of content that caused the visitor to register. */
export const SOURCE_TYPES = [
  "blog",
  "resource",
  "student-project",
  "faculty-project",
  "institute-project",
  "other-project",
  "review",
  "comment",
  "brochure",
] as const;
export type SourceType = (typeof SOURCE_TYPES)[number];

export interface AccessSource {
  sourceType: SourceType;
  /** Slug or id of the specific content. */
  sourceId: string;
}

export type AgeGroup = "adult" | "minor";

/** What the access form submits. */
export interface AccessRequest {
  name: string;
  email: string;
  phone: string;
  interest: Interest | "";
  ageGroup: AgeGroup;
  /** Visitors under 18 only: a parent or guardian has agreed. */
  guardianConsent: boolean;
  /** Separate, optional, never pre-selected. */
  marketingConsent: boolean;
  source: AccessSource;
  /** Spam trap: real visitors never fill it in. */
  website: string;
  /** Milliseconds between the form opening and submitting. */
  elapsedMs: number;
}

/** Statuses a follow-up workflow may use. Nothing in this site assigns one: the CRM or team does. */
export const LEAD_STATUSES = [
  "new",
  "contacted",
  "interested",
  "application-started",
  "enrolled",
  "not-interested",
  "do-not-contact",
] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

/** What the backend receives and should store for each registration. */
export interface LeadRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: Interest | null;
  ageGroup: AgeGroup;
  /** "claimed" is a tick box only. Real verification of a guardian is a backend and legal task. */
  guardianConsent: "not-applicable" | "claimed";
  accessPermissions: ("blog-interaction" | "resources" | "projects")[];
  marketingConsent: boolean;
  /** Only set when marketingConsent is true. */
  marketingConsentAt: string | null;
  /** When the visitor acknowledged the Privacy Policy and accessed the content. */
  consentTimestamp: string;
  privacyPolicyVersion: string;
  termsVersion: string;
  source: AccessSource;
  firstAccessedAt: string;
  lastAccessedAt: string;
  createdAt: string;
  updatedAt: string;
  /** The readable title of the content, for the team's Sheet. */
  sourceLabel?: string;
  /** Set by the team's workflow, never by this site. */
  status?: LeadStatus;
}

export const LIMITS = { name: 80, email: 254, phone: 15, text: 2000 } as const;

export const EMAIL_RE = /^(?![=+\-@])[^\s@<>()[\]\,;:"]+@[^\s@<>()[\]\,;:"]+\.[^\s@<>()[\]\,;:"]{2,}$/;

export type FieldErrors = Partial<Record<"name" | "email" | "phone" | "interest" | "guardianConsent" | "form", string>>;

// Zero-width characters and text-direction overrides let a name look like something else in a Sheet.
const INVISIBLE = /[\u200b-\u200f\u202a-\u202e\u2060-\u2064\u2066-\u2069\ufeff]/g;

/** Removes control characters and collapses whitespace. Output is always rendered as text, never as HTML. */
export const clean = (s: unknown, max: number) =>
  (typeof s === "string" ? s : "")
    .replace(INVISIBLE, "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

/** Like clean() but keeps line breaks, for messages. */
export const cleanText = (s: unknown, max: number) =>
  (typeof s === "string" ? s : "")
    .replace(INVISIBLE, "")
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, max);

/** Spreadsheet and CSV safe for short fields such as names: a leading = + - @ would otherwise be run as a formula. */
export const cellSafe = (s: string) => (/^[=+\-@]/.test(s) ? `'${s}` : s);

// ponytail: free text may legitimately start with "-" or "+91 ...", so only = and @ are guarded. The Sheet stores every
// cell as plain text; the guard only matters if someone exports to CSV and opens it in a spreadsheet program.
export const cellSafeText = (s: string) => (/^[=@]/.test(s) ? `'${s}` : s);

/**
 * One phone format for every form: "+91XXXXXXXXXX" for an Indian number typed with or without 0, 91 or +91, and
 * "+<digits>" for other countries. Anything with letters is returned unchanged so validation rejects it.
 */
export const normalizePhone = (s: string) => {
  if (/[^\d\s+\-().]/.test(s)) return s.trim();
  let t = s.replace(/[\s\-().]/g, "");
  if (t.startsWith("00")) t = `+${t.slice(2)}`;
  if (t.startsWith("+")) return `+${t.slice(1).replace(/\D/g, "")}`;
  const d = t.replace(/\D/g, "");
  if (d.length === 10) return `+91${d}`;
  if (d.length === 11 && d[0] === "0") return `+91${d.slice(1)}`;
  if (d.length === 12 && d.startsWith("91")) return `+${d}`;
  return d;
};

/** The error to show for a phone number, or null when it is acceptable. Used by every form, so they never disagree. */
export function phoneError(raw: string): string | null {
  if (!raw.trim()) return "Please enter your phone number.";
  const msg = "Please enter a valid phone number, like 98765 43210 or +971 50 123 4567.";
  const p = normalizePhone(raw);
  if (p.startsWith("+91")) return /^\+91[2-9]\d{9}$/.test(p) && !/^\+91(\d)\1{9}$/.test(p) ? null : msg;
  return /^\+[1-9]\d{7,14}$/.test(p) ? null : msg;
}

/** How a stored phone number reads in the Sheet: "+91 98765 43210". */
export const displayPhone = (p: string) => (/^\+91\d{10}$/.test(p) ? `+91 ${p.slice(3, 8)} ${p.slice(8)}` : p);

const TITLES = /^(mr|mrs|ms|miss|dr|prof|shri|smt|sri|er|ca|adv|capt|col)\.?$/i;
/** The first real name, skipping a title, so a greeting reads "Hi, Anil" and not "Hi, Prof.". */
export function firstName(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  return (parts.find((w) => !TITLES.test(w)) ?? parts[0] ?? "").slice(0, 30);
}

export function validateAccessFields(v: Pick<AccessRequest, "name" | "email" | "phone" | "interest" | "ageGroup" | "guardianConsent">): FieldErrors {
  const e: FieldErrors = {};
  const name = clean(v.name, LIMITS.name);
  if (name.length < 2) e.name = "Please enter your full name.";
  else if (!/\p{L}/u.test(name)) e.name = "Please enter your full name.";
  const email = clean(v.email, LIMITS.email);
  if (!email) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email)) e.email = "Please enter a valid email address, like name@example.com.";
  const pe = phoneError(clean(v.phone, 30));
  if (pe) e.phone = pe;
  if (v.interest !== "" && !(INTERESTS as readonly string[]).includes(v.interest)) e.interest = "Please choose one of the options.";
  if (v.ageGroup === "minor" && !v.guardianConsent) e.guardianConsent = "A parent or guardian needs to agree before you continue.";
  return e;
}

/** Maps who made a project to the access source recorded for it. */
export const sourceTypeForCreator = (c: "student" | "faculty" | "institute" | "other"): SourceType =>
  c === "student" ? "student-project" : c === "faculty" ? "faculty-project" : c === "institute" ? "institute-project" : "other-project";

/** A random id for one form submission. Sent with the form so that pressing Send twice, or retrying after a slow
 * answer, is stored once. Empty where the browser cannot make one; the server then makes its own. */
export const newSubmissionId = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : "");
export const isSubmissionId = (v: unknown): v is string => typeof v === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
