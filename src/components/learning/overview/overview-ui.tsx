import { cn } from "cn";

/** Small eyebrow label. `light` is for dark backgrounds. */
export function Eyebrow({ children, light, className }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase", light ? "text-white/80" : "text-primary", className)}>
      {children}
    </p>
  );
}

export const SECTION = "px-4 py-16 sm:px-6 sm:py-24 xl:py-28";
export const INNER = "mx-auto max-w-[1800px] xl:px-8";
export const H2 = "text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-5xl";
export const LEAD = "text-base leading-relaxed text-muted-foreground sm:text-lg";
export const GRADIENT = "bg-gradient-to-r from-primary to-brand-green bg-clip-text text-transparent";
