import { Briefcase, Clock, Hammer, MapPin, Monitor, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { IncludeIcon } from "@/data/course-details";

// Plain data, not a component — kept out of course-hero.tsx (a "use client" module) so server components like
// course-sections.tsx can import it without crossing the client boundary for a non-component value.
export const INCLUDE_ICON: Record<IncludeIcon, LucideIcon> = {
  clock: Clock,
  mode: Monitor,
  place: MapPin,
  tools: Wrench,
  projects: Hammer,
  portfolio: Briefcase,
  practice: Hammer,
};
