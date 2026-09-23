"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "cn";
import {
  CONTACT_METHODS,
  EMPTY_ENQUIRY,
  INTERESTS,
  SOURCES,
  STATUSES,
  submitEnquiry,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryValues,
} from "./contact-submit";
import { FOCUS } from "./contact-ui";

const FIELD =
  "w-full rounded-xl border border-primary/15 bg-muted/50 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground outline-none transition-colors focus-visible:border-primary focus-visible:bg-background focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const INVALID = "border-destructive focus-visible:border-destructive focus-visible:outline-destructive";

type Key = Exclude<keyof EnquiryValues, "consent">;

function Field({
  n,
  id,
  label,
  error,
  required,
  className,
  children,
}: {
  n: string;
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline gap-2 text-sm font-semibold text-foreground">
        <span aria-hidden="true" className="text-xs font-semibold tracking-widest text-primary/70 tabular-nums">
          {n}
        </span>
        <span>
          {label}
          {required ? <span aria-hidden="true" className="text-destructive"> *</span> : <span className="font-normal text-muted-foreground"> (optional)</span>}
        </span>
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function Options({ items, placeholder }: { items: readonly string[]; placeholder: string }) {
  return (
    <>
      <option value="">{placeholder}</option>
      {items.map((i) => (
        <option key={i} value={i}>
          {i}
        </option>
      ))}
    </>
  );
}

/** No server route or email service exists yet, so a valid submission opens the visitor's email app
 * with the enquiry pre-filled (see `submitEnquiry`). The confirmation says exactly that — it never
 * claims the message was delivered. */
export function ContactForm() {
  const [values, setValues] = useState<EnquiryValues>(EMPTY_ENQUIRY);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [ready, setReady] = useState<{ mailto: string; email: string } | null>(null);

  const set = <K extends keyof EnquiryValues>(key: K, value: EnquiryValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const bind = (key: Key) => ({
    id: `contact-${key}`,
    value: values[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => set(key, e.target.value),
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `contact-${key}-error` : undefined,
    className: cn(FIELD, errors[key] && INVALID),
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validateEnquiry(values);
    setErrors(next);
    const first = (Object.keys(next) as (keyof EnquiryValues)[])[0];
    if (first) {
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setReady(submitEnquiry(values));
  }

  if (ready) {
    return (
      <div role="status" className="rounded-[2rem] border border-primary/15 bg-card p-6 sm:p-10">
        <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
          <CheckCircle2 className="size-6" />
        </span>
        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">Your enquiry is ready to send.</h3>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Your email app should have opened with everything pre-filled. Press send there and it goes straight to the
          Techno Gurukul team.
        </p>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Nothing opened? Email us directly at{" "}
          <a href={ready.mailto} className={cn("rounded font-semibold text-primary underline-offset-2 hover:underline", FOCUS)}>
            {ready.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY_ENQUIRY);
            setReady(null);
          }}
          className={cn("mt-6 inline-flex min-h-11 items-center rounded text-base font-semibold text-primary", FOCUS)}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-[2rem] border border-primary/15 bg-card p-6 shadow-[0_28px_56px_-40px_rgba(16,20,28,0.3)] sm:p-10">
      <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
        <Field n="01" id="contact-fullName" label="Full name" required error={errors.fullName}>
          <input type="text" autoComplete="name" required aria-required="true" placeholder="Your full name" {...bind("fullName")} />
        </Field>
        <Field n="02" id="contact-email" label="Email address" required error={errors.email}>
          <input type="email" autoComplete="email" required aria-required="true" placeholder="you@example.com" {...bind("email")} />
        </Field>
        <Field n="03" id="contact-phone" label="Phone number" required error={errors.phone}>
          <input type="tel" inputMode="tel" autoComplete="tel" required aria-required="true" placeholder="+91 XXXXX XXXXX" {...bind("phone")} />
        </Field>
        <Field n="04" id="contact-interest" label="I am interested in" required error={errors.interest}>
          <select required aria-required="true" {...bind("interest")}>
            <Options items={INTERESTS} placeholder="Choose one" />
          </select>
        </Field>
        <Field n="05" id="contact-status" label="Current status" error={errors.status}>
          <select {...bind("status")}>
            <Options items={STATUSES} placeholder="Select" />
          </select>
        </Field>
        <Field n="06" id="contact-contactMethod" label="Preferred contact method" error={errors.contactMethod}>
          <select {...bind("contactMethod")}>
            <Options items={CONTACT_METHODS} placeholder="Select" />
          </select>
        </Field>
        <Field n="07" id="contact-source" label="How did you hear about us?" error={errors.source}>
          <select {...bind("source")}>
            <Options items={SOURCES} placeholder="Select" />
          </select>
        </Field>
        <Field n="08" id="contact-message" label="Message" required error={errors.message} className="sm:col-span-2">
          <textarea rows={7} required aria-required="true" placeholder="Tell us what you'd like to know..." {...bind("message")} className={cn(FIELD, "min-h-40 resize-y", errors.message && INVALID)} />
        </Field>
      </div>

      <div className="mt-7 border-t border-primary/15 pt-6">
        <div className="flex items-start gap-3">
          <input
            id="contact-consent"
            type="checkbox"
            required
            aria-required="true"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "contact-consent-error" : undefined}
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className={cn("mt-0.5 size-5 shrink-0 accent-primary", FOCUS)}
          />
          <label htmlFor="contact-consent" className="text-sm leading-relaxed text-foreground">
            I agree to be contacted by Techno Gurukul regarding this enquiry.
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
            "group mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-semibold tracking-widest text-primary-foreground uppercase transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg active:translate-y-0 motion-reduce:transition-none sm:w-auto",
            FOCUS
          )}
        >
          Send Enquiry
          <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
        </button>
        <p className="mt-4 text-sm text-muted-foreground">
          This opens your email app with your enquiry pre-filled &mdash; there&rsquo;s no online form inbox yet.
        </p>
      </div>
    </form>
  );
}
