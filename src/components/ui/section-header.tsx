import type { ReactNode } from "react";

export function SectionHeader({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-2 text-sm font-medium text-primary">
        <span className="size-1.5 rounded-full bg-brand-sky" aria-hidden="true" />
        {eyebrow}
      </div>
      <h2
        id={id}
        className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      {children && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{children}</p>
      )}
    </div>
  );
}

export const GRADIENT_TEXT = "bg-gradient-to-r from-primary to-brand-sky bg-clip-text text-transparent";
