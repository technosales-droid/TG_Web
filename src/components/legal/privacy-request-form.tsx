"use client";

import { useId, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { ErrorText, FIELD, FOCUS, Honeypot, INVALID, Label } from "@/components/access/form-ui";
import { PRIVACY_REQUEST_TYPES, type PrivacyRequestType } from "@/lib/privacy-requests";
import { cn } from "cn";

/**
 * Sends a privacy request to the team. It says the request was sent, not that it was handled: nothing here verifies
 * the person or acts on the request. That is a staff process backed by the records store.
 */
export function PrivacyRequestForm() {
  const uid = useId();
  const [type, setType] = useState<PrivacyRequestType>("access");
  const [v, setV] = useState({ name: "", email: "", message: "", website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof v, val: string) => {
    setV((p) => ({ ...p, [k]: val }));
    setErrors((p) => ({ ...p, [k]: "", form: "" }));
  };
  const hint = PRIVACY_REQUEST_TYPES.find((t) => t.id === type)?.hint;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const found: Record<string, string> = {};
    if (v.name.trim().length < 2) found.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) found.email = "Please enter a valid email address, like name@example.com.";
    if (type === "question" && v.message.trim().length < 5) found.message = "Please write your question.";
    if (Object.keys(found).length) return setErrors(found);
    setBusy(true);
    try {
      const res = await fetch("/api/privacy-request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...v, type }) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) return setSent(true);
      setErrors({ ...(data.errors ?? {}), form: data.error ?? "Something went wrong. Please try again." });
    } catch {
      setErrors({ form: "We could not reach the server. Check your connection and try again." });
    } finally {
      setBusy(false);
    }
  };

  if (sent) {
    return (
      <div role="status" className="rounded-3xl border border-primary/20 bg-accent/70 p-6 sm:p-8">
        <CheckCircle2 className="size-7 text-primary" aria-hidden="true" />
        <h2 className="mt-3 text-xl font-semibold text-foreground">Your request has been sent</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          It has been passed to Techno Gurukul&rsquo;s privacy contact. It is not handled automatically. We may ask you to
          confirm who you are before we act on it, and we will reply to the email address you gave.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative rounded-3xl border border-primary/10 bg-card p-5 sm:p-8">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">Have a question about your personal information?</h2>
      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-medium text-foreground">What would you like to do?</legend>
        <div className="flex flex-wrap gap-2">
          {PRIVACY_REQUEST_TYPES.map((t) => (
            <label key={t.id} className={cn("flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-[15px] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary", type === t.id ? "border-primary bg-primary/10 font-semibold text-foreground" : "border-primary/25 text-muted-foreground hover:border-primary/45")}>
              <input type="radio" name={`${uid}-type`} value={t.id} checked={type === t.id} onChange={() => setType(t.id)} className="sr-only" />
              {t.label}
            </label>
          ))}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{hint}</p>
      </fieldset>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${uid}-name`} required>Full name</Label>
          <input id={`${uid}-name`} value={v.name} onChange={(e) => set("name", e.target.value)} maxLength={80} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uid}-name-e` : undefined} className={cn(FIELD, errors.name && INVALID)} />
          <ErrorText id={`${uid}-name-e`}>{errors.name}</ErrorText>
        </div>
        <div>
          <Label htmlFor={`${uid}-email`} required>Email address</Label>
          <input id={`${uid}-email`} type="email" value={v.email} onChange={(e) => set("email", e.target.value)} maxLength={254} autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? `${uid}-email-e` : undefined} className={cn(FIELD, errors.email && INVALID)} />
          <ErrorText id={`${uid}-email-e`}>{errors.email}</ErrorText>
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor={`${uid}-message`} required={type === "question"}>Details</Label>
        <textarea id={`${uid}-message`} value={v.message} onChange={(e) => set("message", e.target.value)} maxLength={2000} rows={4} aria-invalid={!!errors.message} aria-describedby={errors.message ? `${uid}-message-e` : undefined} className={cn(FIELD, "h-auto py-3", errors.message && INVALID)} />
        <ErrorText id={`${uid}-message-e`}>{errors.message}</ErrorText>
        <p className="mt-1.5 text-sm text-muted-foreground">Please use the email address you gave us before, and do not include passwords or ID numbers.</p>
      </div>
      <Honeypot value={v.website} onChange={(x) => set("website", x)} />
      <p role="alert" className="mt-4 rounded-xl border border-destructive/40 bg-destructive/5 px-3.5 py-2.5 text-sm text-destructive empty:hidden">{errors.form}</p>
      <button type="submit" disabled={busy} className={cn("mt-5 flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-70", FOCUS)}>
        {busy && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
        {busy ? "Sending" : "Send request"}
      </button>
    </form>
  );
}
