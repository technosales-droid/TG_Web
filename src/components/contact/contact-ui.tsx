import { cn } from "cn";

/** Small eyebrow: a thin rule, then the label. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase", className)}>
      {children}
    </p>
  );
}

export const FOCUS = "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary";
export const SECTION = "px-4 py-14 sm:px-6 sm:py-20 xl:py-24";
export const INNER = "mx-auto max-w-[1800px] xl:px-8";
