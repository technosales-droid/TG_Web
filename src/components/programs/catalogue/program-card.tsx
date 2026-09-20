import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BarChart3,
  Box,
  Boxes,
  Bot,
  BookOpen,
  Brain,
  Bug,
  Clapperboard,
  Clock,
  Code2,
  Coins,
  Cpu,
  FileText,
  Flame,
  Gamepad2,
  Globe,
  Layers,
  LayoutDashboard,
  Lightbulb,
  Link2,
  MapPin,
  Megaphone,
  MessageCircle,
  Package,
  Palette,
  PenTool,
  Rocket,
  Search,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Sun,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { cn } from "cn";
import type {
  CatalogueCourse,
  ProgramIcon,
  ProgramTone,
} from "@/data/catalogue";

const ICONS: Record<ProgramIcon, LucideIcon> = {
  megaphone: Megaphone,
  "bar-chart": BarChart3,
  search: Search,
  code: Code2,
  "pen-tool": PenTool,
  boxes: Boxes,
  layers: Layers,
  sparkles: Sparkles,
  gamepad: Gamepad2,
  cube: Box,
  palette: Palette,
  clapperboard: Clapperboard,
  cpu: Cpu,
  target: Target,
  "trending-up": TrendingUp,
  users: Users,
  "file-text": FileText,
  globe: Globe,
  message: MessageCircle,
  bug: Bug,
  rocket: Rocket,
  smartphone: Smartphone,
  brain: Brain,
  workflow: Workflow,
  link: Link2,
  "map-pin": MapPin,
  zap: Zap,
  lightbulb: Lightbulb,
  layout: LayoutDashboard,
  sliders: SlidersHorizontal,
  coins: Coins,
  "book-open": BookOpen,
  package: Package,
  flame: Flame,
  sun: Sun,
  bot: Bot,
};

const TONES: Record<ProgramTone, string> = {
  blue: "from-primary via-primary/70 to-brand-green/50",
  green: "from-brand-green/80 via-primary/70 to-[#0b3d50]",
  navy: "from-[#0d6386] to-[#0b3d50]",
};

const MAX_TAGS = 4;

export function ProgramCard({
  course,
  priority = false,
}: {
  course: CatalogueCourse;
  priority?: boolean;
}) {
  const { title, description, tags, image, visual, href, industryName, programName } = course;
  const soon = course.status === "coming-soon";
  const meta = [course.level, course.format].filter(Boolean) as string[];
  // First icon is the large centre mark; the others flank it.
  const [main, ...rest] = visual.icons;
  const icons = [rest[0], main, rest[1]].filter((n): n is ProgramIcon => Boolean(n));

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-card transition-all duration-500",
        soon
          ? "border-brand-green/30"
          : "border-primary/10 hover:shadow-[0_20px_40px_-24px_rgba(16,20,28,0.35)] motion-safe:hover:-translate-y-1",
      )}
    >
      <div
        className={cn(
          "relative aspect-video overflow-hidden bg-gradient-to-br",
          TONES[visual.tone],
        )}
      >
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1536px) 22vw, (min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center gap-6 text-background/25 transition-transform duration-500 group-hover:scale-105 sm:gap-8"
          >
            {icons.map((name) => {
              const Icon = ICONS[name];
              return (
                <Icon
                  key={name}
                  className={name === main ? "size-20 text-background/45 sm:size-24" : "size-10 sm:size-12"}
                />
              );
            })}
          </div>
        )}
        <span className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold tracking-wide text-foreground uppercase">
          {industryName}
        </span>
        {soon && (
          <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-brand-green px-3 py-1.5 text-xs font-semibold tracking-wide text-white uppercase">
            <Clock className="size-3" aria-hidden="true" />
            Coming Soon
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-sm font-medium text-primary">
          {programName}
        </p>
        <h3 className="mt-2 line-clamp-2 text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>

        {tags.length > 0 && (
          <ul aria-label="Topics" className="mt-4 flex flex-wrap gap-1.5">
            {tags.slice(0, MAX_TAGS).map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {meta.length > 0 && (
          <p className="mt-4 text-sm text-muted-foreground">
            {meta.join(" · ")}
          </p>
        )}

        {soon || !href ? (
          <p className="mt-auto inline-flex items-center gap-1.5 pt-5 text-base font-medium text-brand-green">
            <Clock className="size-4" aria-hidden="true" />
            Coming Soon
            <span className="sr-only">: {title} is not open yet</span>
          </p>
        ) : (
          <Link
            href={href}
            className="mt-auto inline-flex items-center gap-1 pt-5 text-base font-medium text-foreground transition-colors duration-300 group-hover:text-primary after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
          >
            Explore Course
            <span className="sr-only">: {title}</span>
            <ArrowUpRight
              className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        )}
      </div>
    </article>
  );
}
