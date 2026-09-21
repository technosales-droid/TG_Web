import { cn } from "cn";
import type { Project } from "@/data/projects";
import { ProjectCard, type OnView } from "./project-card";
import type { ViewMode } from "./project-utils";

/** Natural card heights; only the media ratio is fixed. 2 columns on tablets, 3 on desktop, 4 on very wide screens. */
export function ProjectsGrid({ projects, view, onView }: { projects: Project[]; view: ViewMode; onView: OnView }) {
  return (
    <ul
      className={cn(
        "grid gap-4 lg:gap-5",
        view === "grid" ? "md:grid-cols-2 xl:grid-cols-3 min-[1760px]:grid-cols-4!" : "min-[1760px]:grid-cols-2!"
      )}
    >
      {projects.map((p) => (
        <li key={p.slug} className="min-w-0">
          <ProjectCard project={p} view={view} onView={onView} />
        </li>
      ))}
    </ul>
  );
}
