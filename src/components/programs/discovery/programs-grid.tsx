import { cn } from "cn";
import { OfferingCard } from "./offering-card";
import type { OfferingWithCategory, ViewMode } from "./program-utils";

/** 1 column on phones, 2 on tablets, 3 on desktop, matching the offering cards' natural size. */
export function ProgramsGrid({ offerings, view }: { offerings: OfferingWithCategory[]; view: ViewMode }) {
  return (
    <ul className={cn("grid gap-4 lg:gap-5", view === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : "")}>
      {offerings.map((o) => (
        <li key={o.slug} className="min-w-0">
          <OfferingCard offering={o} category={o.category} categorySlug={o.categorySlug} view={view} />
        </li>
      ))}
    </ul>
  );
}
