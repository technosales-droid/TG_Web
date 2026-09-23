"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { cn } from "cn";
import {
  CONTACT_METHODS,
  EMPTY_ENQUIRY,
  INTERESTS,
  MESSAGE_MAX,
  REQUIRED_KEYS,
  SOURCES,
  STATUSES,
  formatPhone,
  submitEnquiry,
  validateEnquiry,
  type EnquiryValues,
} from "./contact-submit";
import { FOCUS } from "./contact-ui";

const FIELD =
  "block h-12 w-full rounded-xl border border-primary/20 bg-background px-4 text-base text-foreground placeholder:text-muted-foreground outline-none transition-[border-color,box-shadow] duration-150 hover:border-primary/40 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/15 motion-reduce:transition-none";
const INVALID = "border-destructive hover:border-destructive focus-visible:border-destructive focus-visible:ring-destructive/15";

type Key = keyof EnquiryValues;

function Label({ n, htmlFor, required, children }: { n: string; htmlFor?: string; required?: boolean; children: React.ReactNode }) {
  const inner = (
    <>
      <span aria-hidden="true" className="mr-2 text-xs font-medium text-muted-foreground tabular-nums">
        {n}
      </span>
      {children}
      {required ? (
        <>
          <span aria-hidden="true" className="text-destructive"> *</span>
          <span className="sr-only"> (required)</span>
        </>
      ) : (
        <span className="font-normal text-muted-foreground"> (optional)</span>
      )}
    </>
  );
  const cls = "mb-2 block text-sm font-medium text-foreground";
  return htmlFor ? (
    <label htmlFor={htmlFor} className={cls}>
      {inner}
    </label>
  ) : (
    <span className={cls}>{inner}</span>
  );
}

function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-destructive">
      {children}
    </p>
  );
}

function SelectField({
  id,
  value,
  onChange,
  onBlur,
  options,
  placeholder,
  invalid,
  describedBy,
  required,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  options: readonly string[];
  placeholder: string;
  invalid?: boolean;
  describedBy?: string;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        required={required}
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={cn(FIELD, "appearance-none pr-11", !value && "text-muted-foreground", invalid && INVALID)}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o} className="text-foreground">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
    </div>
  );
}

/** No server route or email service exists yet, so a valid submission opens the visitor's email app
 * with the enquiry pre-filled (see `submitEnquiry`). The confirmation says exactly that — it never
 * claims the message was delivered. */
export function ContactForm() {
  const [values, setValues] = useState<EnquiryValues>(EMPTY_ENQUIRY);
  const [touched, setTouched] = useState<Partial<Record<Key, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [ready, setReady] = useState<{ mailto: string; email: string } | null>(null);

  const errors = useMemo(() => validateEnquiry(values), [values]);
  const err = (k: Key) => (submitted || touched[k] ? errors[k] : undefined);
  const touch = (k: Key) => setTouched((t) => (t[k] ? t : { ...t, [k]: true }));
  const set = <K extends Key>(key: K, value: EnquiryValues[K]) => setValues((v) => ({ ...v, [key]: value }));

  const text = (key: "fullName" | "email" | "phone" | "message") => ({
    id: `contact-${key}`,
    value: values[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => set(key, e.target.value),
    onBlur: () => touch(key),
    "aria-invalid": !!err(key),
    "aria-describedby": err(key) ? `contact-${key}-error` : undefined,
    className: cn(FIELD, err(key) && INVALID),
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    const first = REQUIRED_KEYS.find((k) => errors[k]);
    if (first) {
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setReady(submitEnquiry(values));
  }

  if (ready) {
    return (
      <div role="status" className="rounded-3xl border border-primary/10 bg-card p-6 shadow-sm sm:p-10">
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
            setTouched({});
            setSubmitted(false);
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
    <form noValidate onSubmit={onSubmit} className="@container rounded-3xl border border-primary/10 bg-card p-6 shadow-sm sm:p-10">
      <div className="grid gap-x-6 gap-y-6 @xl:grid-cols-2 @3xl:grid-cols-6">
        <div className="@3xl:col-span-3">
          <Label n="01" htmlFor="contact-fullName" required>
            Full name
          </Label>
          <input type="text" autoComplete="name" required aria-required="true" placeholder="Your full name" {...text("fullName")} />
          <ErrorText id="contact-fullName-error">{err("fullName")}</ErrorText>
        </div>

        <div className="@3xl:col-span-3">
          <Label n="02" htmlFor="contact-email" required>
            Email address
          </Label>
          <input type="email" autoComplete="email" required aria-required="true" placeholder="you@example.com" {...text("email")} />
          <ErrorText id="contact-email-error">{err("email")}</ErrorText>
        </div>

        <div className="@3xl:col-span-3">
          <Label n="03" htmlFor="contact-phone" required>
            Phone number
          </Label>
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-required="true"
            placeholder="+91 XXXXX XXXXX"
            {...text("phone")}
            onChange={(e) => set("phone", formatPhone(e.target.value))}
          />
          <ErrorText id="contact-phone-error">{err("phone")}</ErrorText>
        </div>

        <div className="@3xl:col-span-3">
          <Label n="04" htmlFor="contact-interest" required>
            I am interested in
          </Label>
          <SelectField
            id="contact-interest"
            value={values.interest}
            onChange={(v) => set("interest", v)}
            onBlur={() => touch("interest")}
            options={INTERESTS}
            placeholder="Select an option"
            required
            invalid={!!err("interest")}
            describedBy={err("interest") ? "contact-interest-error" : undefined}
          />
          <ErrorText id="contact-interest-error">{err("interest")}</ErrorText>
        </div>

        <div className="@3xl:col-span-2">
          <Label n="05" htmlFor="contact-status">
            Current status
          </Label>
          <SelectField id="contact-status" value={values.status} onChange={(v) => set("status", v)} options={STATUSES} placeholder="Select an option" />
        </div>

        <fieldset className="min-w-0 @3xl:col-span-2">
          <legend className="contents">
            <Label n="06">Preferred contact method</Label>
          </legend>
          <div className="grid h-12 grid-cols-3 gap-1 rounded-xl border border-primary/20 bg-muted/50 p-1">
            {CONTACT_METHODS.map((m) => (
              <label
                key={m}
                className={cn(
                  "flex cursor-pointer items-center justify-center rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:text-foreground motion-reduce:transition-none",
                  "has-checked:bg-primary has-checked:text-primary-foreground has-checked:shadow-sm has-focus-visible:outline-2 has-focus-visible:outline-solid has-focus-visible:outline-offset-2 has-focus-visible:outline-primary"
                )}
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={m}
                  checked={values.contactMethod === m}
                  onChange={() => set("contactMethod", m)}
                  onClick={() => values.contactMethod === m && set("contactMethod", "")}
                  className="sr-only"
                />
                {m}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="@xl:col-span-2">
          <Label n="07" htmlFor="contact-source">
            How did you hear about us?
          </Label>
          <SelectField id="contact-source" value={values.source} onChange={(v) => set("source", v)} options={SOURCES} placeholder="Select an option" />
        </div>

        <div className="@xl:col-span-2 @3xl:col-span-6">
          <Label n="08" htmlFor="contact-message" required>
            Message
          </Label>
          <textarea
            rows={6}
            required
            aria-required="true"
            maxLength={MESSAGE_MAX}
            placeholder="Tell us what you'd like to know..."
            {...text("message")}
            className={cn(FIELD, "h-auto min-h-40 resize-y py-3 leading-relaxed", err("message") && INVALID)}
          />
          <div className="mt-1.5 flex items-start justify-between gap-4">
            <ErrorText id="contact-message-error">{err("message")}</ErrorText>
            <p aria-hidden="true" className="ml-auto text-xs text-muted-foreground tabular-nums">
              {values.message.length} / {MESSAGE_MAX}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-primary/10 pt-6">
        <div className="flex items-start gap-3 rounded-xl border border-primary/15 bg-muted/40 p-4">
          <input
            id="contact-consent"
            type="checkbox"
            required
            aria-required="true"
            aria-invalid={!!err("consent")}
            aria-describedby={err("consent") ? "contact-consent-error" : undefined}
            checked={values.consent}
            onChange={(e) => {
              set("consent", e.target.checked);
              touch("consent");
            }}
            className={cn("mt-0.5 size-5 shrink-0 accent-primary", FOCUS)}
          />
          <label htmlFor="contact-consent" className="text-sm leading-relaxed text-foreground sm:text-base">
            I agree to be contacted by Techno Gurukul regarding this enquiry.
          </label>
        </div>
        <ErrorText id="contact-consent-error">{err("consent")}</ErrorText>

        <div className="mt-6 flex flex-col gap-4 @xl:flex-row @xl:items-center @xl:justify-between">
          <button
            type="submit"
            className={cn(
              "group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full @xl:w-auto @xl:min-w-56 bg-primary px-8 text-base font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90 motion-reduce:transition-none",
              FOCUS
            )}
          >
            Send enquiry
            <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
          </button>
          <p className="text-sm text-muted-foreground @xl:whitespace-nowrap @xl:text-right">
            Opens your email app with this enquiry pre-filled.
          </p>
        </div>
      </div>
    </form>
  );
}
