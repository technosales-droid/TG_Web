import { cn } from "cn";
import type { Resource } from "@/data/resources";
import { ResourceCard, type OnOpen } from "./resource-card";
import type { ViewMode } from "./resource-utils";

/** Natural card heights; only the preview ratio is fixed. 1 column on phones, 2 on tablets, 3 on desktop, 4 on very wide screens. */
export function ResourcesGrid({ resources, view, onOpen }: { resources: Resource[]; view: ViewMode; onOpen: OnOpen }) {
  return (
    <ul
      className={cn(
        "grid gap-4 lg:gap-5",
        view === "grid" ? "md:grid-cols-2 xl:grid-cols-3 min-[1760px]:grid-cols-4!" : "min-[1760px]:grid-cols-2!"
      )}
    >
      {resources.map((r) => (
        <li key={r.slug} className="min-w-0">
          <ResourceCard resource={r} view={view} onOpen={onOpen} />
        </li>
      ))}
    </ul>
  );
}
