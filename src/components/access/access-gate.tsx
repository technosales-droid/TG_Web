"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { ArrowRight, ChevronDown, Loader2, ShieldCheck } from "lucide-react";
import {
  INTERESTS,
  LIMITS,
  newSubmissionId,
  validateAccessFields,
  type AccessRequest,
  type AccessSource,
  type AgeGroup,
  type FieldErrors,
  type Interest,
  type SourceType,
} from "@/lib/access";
import { CONTACT } from "@/components/contact/contact-data";
import { cn } from "cn";
import { ErrorText, FIELD, FOCUS, Honeypot, INVALID, Label } from "./form-ui";

export interface GrantedSession {
  displayName: string;
  ageGroup: AgeGroup;
}

const COPY: Record<SourceType, { title: string; text: string }> = {
  blog: { title: "Access this content", text: "Create your access profile to continue." },
  comment: { title: "Join the discussion", text: "Create your access profile to comment on articles." },
  review: { title: "Share your experience", text: "Create your access profile to post a review." },
  resource: { title: "Access this resource", text: "Create your access profile to open and download this resource." },
  "student-project": { title: "Access this project", text: "Create your access profile to view the full project." },
  "faculty-project": { title: "Access this project", text: "Create your access profile to view the full project." },
  "institute-project": { title: "Access this project", text: "Create your access profile to view the full project." },
  "other-project": { title: "Access this project", text: "Create your access profile to view the full project." },
  brochure: { title: "Download the brochure", text: "Enter your details and the brochure is yours." },
};

const LINK = "font-medium text-primary underline underline-offset-2 hover:text-primary/80";

/**
 * The one access form used everywhere content or a community feature is gated. It asks for the minimum (name, email,
 * phone and an optional area of interest), keeps the marketing choice separate and unticked, and treats visitors under
 * 18 differently. Submitting starts an access session on the server; nothing personal is stored in the browser.
 */
export function AccessGate({
  source,
  onGranted,
  onCancel,
  title,
  text,
  presetInterest,
}: {
  source: AccessSource;
  onGranted: (s: GrantedSession) => void;
  onCancel: () => void;
  /** Overrides the generic per-sourceType copy below, e.g. to name the specific course a brochure is for. */
  title?: string;
  text?: string;
  /** When set, the "interested in" field is fixed to this and shown as the course the visitor is downloading/opening,
   * rather than an open choice: there is nothing to ask again. */
  presetInterest?: Interest;
}) {
  const uid = useId();
  const [openedAt] = useState(() => Date.now());
  const [submissionId] = useState(newSubmissionId);
  const [v, setV] = useState({ name: "", email: "", phone: "", interest: presetInterest ?? "", ageGroup: "adult" as AgeGroup, guardianConsent: false, marketingConsent: false, website: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [busy, setBusy] = useState(false);
  const set = <K extends keyof typeof v>(k: K, val: (typeof v)[K]) => {
    setV((p) => ({ ...p, [k]: val }));
    setErrors((p) => ({ ...p, [k]: undefined, form: undefined }));
  };
  const minor = v.ageGroup === "minor";
  const copy = COPY[source.sourceType];

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (minor) return;
    const found = validateAccessFields({ ...v, interest: v.interest as AccessRequest["interest"] });
    if (Object.keys(found).length) {
      setErrors(found);
      const first = (["name", "email", "phone", "interest", "guardianConsent"] as const).find((k) => found[k]);
      if (first) document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, marketingConsent: v.marketingConsent && !minor, source, submissionId, elapsedMs: Date.now() - openedAt }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) return onGranted({ displayName: data.displayName, ageGroup: data.ageGroup });
      setErrors({ ...(data.errors ?? {}), form: data.error ?? "Something went wrong. Please try again." });
    } catch {
      setErrors({ form: "We could not reach the server. Check your connection and try again." });
    } finally {
      setBusy(false);
    }
  };

  const desc = (k: keyof FieldErrors) => (errors[k] ? `${uid}-${k}-error` : undefined);

  return (
    <form onSubmit={submit} noValidate className="relative">
      <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        <ShieldCheck className="size-4" aria-hidden="true" />
        Access profile
      </p>
      <h2 id="access-gate-title" className="mt-2 text-2xl leading-tight font-semibold tracking-tight text-balance text-foreground sm:text-3xl">{title ?? copy.title}</h2>
      <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
        {text ?? copy.text} Your details help us provide access to selected Techno Gurukul resources, projects and community features.
      </p>

      <div className="mt-6 grid gap-x-4 gap-y-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${uid}-name`} required>Full name</Label>
          <input id={`${uid}-name`} value={v.name} onChange={(e) => set("name", e.target.value)} maxLength={LIMITS.name} autoComplete="name" placeholder="Your full name" aria-invalid={!!errors.name} aria-describedby={desc("name")} className={cn(FIELD, "h-11", errors.name && INVALID)} />
          <ErrorText id={`${uid}-name-error`}>{errors.name}</ErrorText>
        </div>
        <div>
          <Label htmlFor={`${uid}-email`} required>Email address</Label>
          <input id={`${uid}-email`} type="email" inputMode="email" value={v.email} onChange={(e) => set("email", e.target.value)} maxLength={LIMITS.email} autoComplete="email" placeholder="name@example.com" aria-invalid={!!errors.email} aria-describedby={desc("email")} className={cn(FIELD, "h-11", errors.email && INVALID)} />
          <ErrorText id={`${uid}-email-error`}>{errors.email}</ErrorText>
        </div>
        <div>
          <Label htmlFor={`${uid}-phone`} required>Phone number</Label>
          <input id={`${uid}-phone`} type="tel" inputMode="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} maxLength={20} autoComplete="tel" placeholder="+91 98765 43210" aria-invalid={!!errors.phone} aria-describedby={desc("phone")} className={cn(FIELD, "h-11", errors.phone && INVALID)} />
          <ErrorText id={`${uid}-phone-error`}>{errors.phone}</ErrorText>
        </div>
        <div>
          <Label htmlFor={`${uid}-interest`}>{presetInterest ? "Course" : "I’m interested in"}</Label>
          <div className="relative">
            <select
              id={`${uid}-interest`}
              value={v.interest}
              onChange={(e) => set("interest", e.target.value)}
              disabled={!!presetInterest}
              aria-invalid={!!errors.interest}
              aria-describedby={desc("interest")}
              className={cn(FIELD, "h-11 appearance-none pr-10", !v.interest && "text-muted-foreground", errors.interest && INVALID, presetInterest && "text-foreground disabled:opacity-100")}
            >
              {presetInterest ? (
                <option value={presetInterest}>{presetInterest}</option>
              ) : (
                <>
                  <option value="">Select an option</option>
                  {INTERESTS.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </>
              )}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          </div>
          <ErrorText id={`${uid}-interest-error`}>{errors.interest}</ErrorText>
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className="mb-1.5 text-sm font-medium text-foreground">
          Your age<span aria-hidden="true" className="text-destructive"> *</span>
          <span className="sr-only"> (required)</span>
        </legend>
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-muted p-1">
          {([["adult", "18 or older"], ["minor", "Under 18"]] as const).map(([val, label]) => (
            <label key={val} className={cn("flex min-h-10 cursor-pointer items-center justify-center rounded-lg px-3 text-[15px] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary", v.ageGroup === val ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>
              <input type="radio" name={`${uid}-age`} value={val} checked={v.ageGroup === val} onChange={() => set("ageGroup", val)} className="sr-only" />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      {minor && (
        <div role="alert" className="mt-4 rounded-xl border border-primary/20 bg-accent/70 p-4 text-sm leading-relaxed text-foreground/90">
          <p>
            Access profiles are not available to visitors under 18 yet, because we cannot verify a parent or guardian&rsquo;s agreement. A parent or
            guardian can email{" "}
            <a href={`mailto:${CONTACT.email ?? "admission@technogurukul.com"}`} className="font-semibold text-primary underline underline-offset-2">
              {CONTACT.email ?? "admission@technogurukul.com"}
            </a>{" "}
            and we will help. You can keep reading the rest of the site.
          </p>
        </div>
      )}

      <label className={cn("mt-5 flex items-start gap-3 rounded-xl border border-primary/15 bg-muted/50 p-3.5 text-sm leading-relaxed", minor ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:border-primary/30")}>
        <input type="checkbox" checked={v.marketingConsent && !minor} disabled={minor} onChange={(e) => set("marketingConsent", e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-[#0c709a]" />
        <span className="text-foreground/90">
          I agree to be contacted by Techno Gurukul regarding courses, admissions, programs, resources, career opportunities, or related services.
          <span className="mt-1 block text-[13px] text-muted-foreground">Optional. You can continue without ticking this, and change your mind at any time.</span>
        </span>
      </label>

      <Honeypot value={v.website} onChange={(x) => set("website", x)} />

      <p role="alert" className="mt-4 rounded-xl border border-destructive/40 bg-destructive/5 px-3.5 py-2.5 text-sm text-destructive empty:hidden">{errors.form}</p>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button type="button" onClick={onCancel} className={cn("h-12 rounded-full border border-primary/25 px-6 text-[15px] font-semibold text-foreground hover:bg-muted", FOCUS)}>
          Not now
        </button>
        <button type="submit" disabled={busy || minor} className={cn("flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_10px_24px_-12px_rgba(12,112,154,0.8)] transition-colors hover:bg-primary/90 disabled:opacity-70 sm:min-w-56", FOCUS)}>
          {busy ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
          {busy ? "Please wait" : "Continue"}
          {busy ? null : <ArrowRight className="size-4" aria-hidden="true" />}
        </button>
      </div>

      <p className="mt-5 border-t border-primary/10 pt-4 text-xs leading-relaxed text-muted-foreground">
        By continuing, you acknowledge the{" "}
        <Link href="/privacy-policy" target="_blank" className={LINK}>Privacy Policy</Link> and consent to the processing described for providing this access. See also the{" "}
        <Link href="/terms" target="_blank" className={LINK}>Terms of Use</Link>. Access is kept on this device with a cookie, described in the{" "}
        <Link href="/cookie-policy" target="_blank" className={LINK}>Cookie Policy</Link>.
      </p>
    </form>
  );
}
