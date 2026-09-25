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
  /** Set by the team's workflow, never by this site. */
  status?: LeadStatus;
}

export const LIMITS = { name: 80, email: 254, phone: 15, text: 2000 } as const;

const EMAIL_RE = /^[^\s@<>()[\]\,;:"]+@[^\s@<>()[\]\,;:"]+\.[^\s@<>()[\]\,;:"]{2,}$/;

export type FieldErrors = Partial<Record<"name" | "email" | "phone" | "interest" | "guardianConsent" | "form", string>>;

/** Removes control characters and collapses whitespace. Output is always rendered as text, never as HTML. */
export const clean = (s: unknown, max: number) =>
  (typeof s === "string" ? s : "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

/** Like clean() but keeps line breaks, for messages. */
export const cleanText = (s: unknown, max: number) =>
  (typeof s === "string" ? s : "")
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, max);

/** Spreadsheet and CSV safe: a leading = + - @ would otherwise be run as a formula. */
export const cellSafe = (s: string) => (/^[=+\-@]/.test(s) ? `'${s}` : s);

export const normalizePhone = (s: string) => {
  const t = s.replace(/[\s\-().]/g, "");
  return t.startsWith("00") ? `+${t.slice(2)}` : t;
};

export function validateAccessFields(v: Pick<AccessRequest, "name" | "email" | "phone" | "interest" | "ageGroup" | "guardianConsent">): FieldErrors {
  const e: FieldErrors = {};
  const name = clean(v.name, LIMITS.name);
  if (name.length < 2) e.name = "Please enter your full name.";
  else if (!/\p{L}/u.test(name)) e.name = "Please enter your full name.";
  const email = clean(v.email, LIMITS.email);
  if (!email) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email)) e.email = "Please enter a valid email address, like name@example.com.";
  const phone = normalizePhone(clean(v.phone, 30));
  if (!phone) e.phone = "Please enter your phone number.";
  else if (!/^\+?\d{7,15}$/.test(phone)) e.phone = "Please enter a valid phone number (7 to 15 digits).";
  if (v.interest !== "" && !(INTERESTS as readonly string[]).includes(v.interest)) e.interest = "Please choose one of the options.";
  if (v.ageGroup === "minor" && !v.guardianConsent) e.guardianConsent = "A parent or guardian needs to agree before you continue.";
  return e;
}

/** Maps who made a project to the access source recorded for it. */
export const sourceTypeForCreator = (c: "student" | "faculty" | "institute" | "other"): SourceType =>
  c === "student" ? "student-project" : c === "faculty" ? "faculty-project" : c === "institute" ? "institute-project" : "other-project";
