import { SearchX } from "lucide-react";

export function ResourceEmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-primary/25 bg-card px-6 py-14 text-center">
      <span className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <SearchX className="size-7" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">No resources found.</h3>
      <p className="mt-2 max-w-md text-base text-muted-foreground">Try another search or clear a filter.</p>
      <button
        type="button"
        onClick={onClear}
        className="mt-6 h-12 rounded-lg bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Clear All Filters
      </button>
    </div>
  );
}
