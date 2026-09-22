"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { footerContact } from "../layout/footer-data";

const ENQUIRY_TYPES = ["Programs", "Learning", "Admissions", "Careers & Placement", "General Enquiry"] as const;

// Only the two currently active programme directions, matching the rest of the site (About/Mission/
// Approach/Why pages). Not a full catalogue dump, and no future/proposed catalogue items.
const PROGRAM_OPTIONS = ["Not Sure Yet", "Digital Marketing", "Game Development & Design"] as const;

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  enquiryType: string;
  programInterest: string;
  message: string;
  consent: boolean;
}

const INITIAL_STATE: FormState = {
  fullName: "",
  email: "",
  phone: "",
  enquiryType: "",
  programInterest: "",
  message: "",
  consent: false,
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(state: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (state.fullName.trim().length < 2) errors.fullName = "Enter your full name.";
  if (!EMAIL_RE.test(state.email.trim())) errors.email = "Enter a valid email address.";
  if (!state.enquiryType) errors.enquiryType = "Choose what you're enquiring about.";
  if (state.message.trim().length < 10) errors.message = "Tell us a little more (at least 10 characters).";
  if (!state.consent) errors.consent = "Check this box to continue.";
  return errors;
}

function buildMailto(state: FormState): string {
  const email = footerContact.email ?? "hello@technogurukul.com";
  const subject = state.programInterest && state.programInterest !== "Not Sure Yet" ? `Enquiry: ${state.enquiryType} — ${state.programInterest}` : `Enquiry: ${state.enquiryType}`;
  const lines = [
    `Name: ${state.fullName.trim()}`,
    `Email: ${state.email.trim()}`,
    state.phone.trim() && `Phone: ${state.phone.trim()}`,
    `Enquiring about: ${state.enquiryType}`,
    state.programInterest && `Programme interest: ${state.programInterest}`,
    "",
    state.message.trim(),
  ].filter(Boolean);
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

const FIELD =
  "w-full rounded-xl border border-primary/20 bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary";
const FIELD_INVALID = "border-destructive focus-visible:outline-destructive";
const LABEL = "block text-sm font-semibold text-foreground";

/** The page's primary interaction. No server/API route exists in this project, so a real, working
 * `mailto:` link is the honest submission mechanism — it opens the visitor's own mail app with the
 * enquiry pre-filled. We never claim the message has been sent, only that it is ready to send. */
export function ContactForm() {
  const [state, setState] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [ready, setReady] = useState<{ mailto: string; email: string } | null>(null);
  const firstErrorRef = useRef<HTMLElement | null>(null);

  const field = <K extends keyof FormState>(key: K) => (value: FormState[K]) => {
    setState((s) => ({ ...s, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(state);
    setErrors(nextErrors);
    const firstKey = Object.keys(nextErrors)[0] as keyof FormState | undefined;
    if (firstKey) {
      firstErrorRef.current = document.getElementById(`contact-${firstKey}`);
      firstErrorRef.current?.focus();
      return;
    }
    const mailto = buildMailto(state);
    window.location.href = mailto;
    setReady({ mailto, email: footerContact.email ?? "hello@technogurukul.com" });
  }

  if (ready) {
    return (
      <div className="rounded-[2rem] border border-primary/15 bg-card p-6 sm:p-8">
        <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
          <CheckCircle2 className="size-6" />
        </span>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">Your Enquiry Is Ready to Send.</h3>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
          Your email app should have opened with your enquiry pre-filled. Press send there to reach Techno Gurukul.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          If it didn&rsquo;t open, email us directly:{" "}
          <a href={ready.mailto} className="font-semibold text-primary underline-offset-2 hover:underline">
            {ready.email}
          </a>
        </p>
        <button
          type="button"
          onClick={() => setReady(null)}
          className="mt-6 inline-flex min-h-11 items-center rounded-lg text-base font-semibold text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Edit Your Enquiry
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="rounded-[2rem] border border-primary/15 bg-card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-fullName" className={LABEL}>
            Full Name <span aria-hidden="true" className="text-destructive">*</span>
          </label>
          <input
            id="contact-fullName"
            type="text"
            required
            aria-required="true"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "contact-fullName-error" : undefined}
            value={state.fullName}
            onChange={(e) => field("fullName")(e.target.value)}
            className={cn(FIELD, "mt-1.5", errors.fullName && FIELD_INVALID)}
          />
          {errors.fullName && (
            <p id="contact-fullName-error" role="alert" className="mt-1.5 text-sm font-medium text-destructive">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className={LABEL}>
            Email Address <span aria-hidden="true" className="text-destructive">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            value={state.email}
            onChange={(e) => field("email")(e.target.value)}
            className={cn(FIELD, "mt-1.5", errors.email && FIELD_INVALID)}
          />
          {errors.email && (
            <p id="contact-email-error" role="alert" className="mt-1.5 text-sm font-medium text-destructive">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-phone" className={LABEL}>
            Phone Number <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={state.phone}
            onChange={(e) => field("phone")(e.target.value)}
            className={cn(FIELD, "mt-1.5")}
          />
        </div>

        <div>
          <label htmlFor="contact-enquiryType" className={LABEL}>
            What are you enquiring about? <span aria-hidden="true" className="text-destructive">*</span>
          </label>
          <select
            id="contact-enquiryType"
            required
            aria-required="true"
            aria-invalid={!!errors.enquiryType}
            aria-describedby={errors.enquiryType ? "contact-enquiryType-error" : undefined}
            value={state.enquiryType}
            onChange={(e) => field("enquiryType")(e.target.value)}
            className={cn(FIELD, "mt-1.5", errors.enquiryType && FIELD_INVALID)}
          >
            <option value="">Choose one</option>
            {ENQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.enquiryType && (
            <p id="contact-enquiryType-error" role="alert" className="mt-1.5 text-sm font-medium text-destructive">
              {errors.enquiryType}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-programInterest" className={LABEL}>
            Program / Area of Interest <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <select
            id="contact-programInterest"
            value={state.programInterest}
            onChange={(e) => field("programInterest")(e.target.value)}
            className={cn(FIELD, "mt-1.5")}
          >
            <option value="">Not applicable</option>
            {PROGRAM_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className={LABEL}>
            Message <span aria-hidden="true" className="text-destructive">*</span>
          </label>
          <textarea
            id="contact-message"
            required
            aria-required="true"
            rows={5}
            placeholder="Tell us what you'd like to know..."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            value={state.message}
            onChange={(e) => field("message")(e.target.value)}
            className={cn(FIELD, "mt-1.5 resize-y", errors.message && FIELD_INVALID)}
          />
          {errors.message && (
            <p id="contact-message-error" role="alert" className="mt-1.5 text-sm font-medium text-destructive">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-start gap-3">
        <input
          id="contact-consent"
          type="checkbox"
          required
          aria-required="true"
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? "contact-consent-error" : undefined}
          checked={state.consent}
          onChange={(e) => field("consent")(e.target.checked)}
          className="mt-1 size-4 shrink-0 rounded border-primary/30 text-primary outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
        <label htmlFor="contact-consent" className="text-sm leading-relaxed text-muted-foreground">
          I understand this will open my email app to send this message to Techno Gurukul.
        </label>
      </div>
      {errors.consent && (
        <p id="contact-consent-error" role="alert" className="mt-1.5 text-sm font-medium text-destructive">
          {errors.consent}
        </p>
      )}

      <button
        type="submit"
        className={cn(
          buttonVariants({ variant: "default" }),
          "group mt-6 h-12 w-full gap-1.5 rounded-full px-6 text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-primary sm:w-auto"
        )}
      >
        <Mail className="size-4" aria-hidden="true" />
        Send Enquiry
      </button>
    </form>
  );
}
