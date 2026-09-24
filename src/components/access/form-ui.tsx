import type { ReactNode } from "react";
import { AlertCircle } from "lucide-react";

export const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
export const FIELD =
  "block h-12 w-full rounded-xl border border-primary/25 bg-background px-4 text-base text-foreground placeholder:text-muted-foreground outline-none transition-[border-color,box-shadow] duration-150 hover:border-primary/45 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30";
export const INVALID = "border-destructive hover:border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20";

export function Label({ htmlFor, required, children }: { htmlFor?: string; required?: boolean; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-foreground">
      {children}
      {required ? (
        <>
          <span aria-hidden="true" className="text-destructive"> *</span>
          <span className="sr-only"> (required)</span>
        </>
      ) : (
        <span className="font-normal text-muted-foreground"> (optional)</span>
      )}
    </label>
  );
}

/** An error is shown with an icon and words, so it never relies on colour alone. */
export function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-start gap-1.5 text-sm text-destructive">
      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

/** Spam trap: hidden from people and assistive technology, filled in only by bots. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}
