import { LayoutGrid, List } from "lucide-react";
import { cn } from "cn";
import type { ViewMode } from "./project-utils";

const OPTIONS = [
  { value: "grid", label: "Grid", Icon: LayoutGrid },
  { value: "list", label: "List", Icon: List },
] as const;

export function ViewToggle({ view, onChange }: { view: ViewMode; onChange: (v: ViewMode) => void }) {
  return (
    <div role="group" aria-label="View" className="inline-flex h-11 overflow-hidden rounded-lg border border-primary/20 bg-card">
      {OPTIONS.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          aria-pressed={view === value}
          onClick={() => onChange(value)}
          className={cn(
            "inline-flex min-w-11 items-center justify-center gap-1.5 px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary",
            view === value ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
          )}
        >
          <Icon className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">{label}</span>
          <span className="sr-only sm:hidden">{label} view</span>
        </button>
      ))}
    </div>
  );
}
