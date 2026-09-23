import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Gamepad2, Layers, Megaphone, type LucideIcon } from "lucide-react";
import { cn } from "cn";
import type { Offering } from "@/data/programs";

const CATEGORY_VISUAL: Record<string, { tone: string; icon: LucideIcon }> = {
  "digital-marketing": { tone: "from-primary via-primary/70 to-brand-green/50", icon: Megaphone },
  "game-development": { tone: "from-brand-green/80 via-primary/70 to-[#0b3d50]", icon: Gamepad2 },
  "game-design": { tone: "from-[#0d6386] to-[#0b3d50]", icon: Layers },
};

const MAX_TAGS = 4;

export function OfferingCard({
  offering,
  category,
  categorySlug,
  priority = false,
}: {
  offering: Offering;
  category: string;
  categorySlug: string;
  priority?: boolean;
}) {
  const { title, subtitle, description, duration, mode, tags, href, image, flagship } = offering;
  const visual = CATEGORY_VISUAL[categorySlug] ?? CATEGORY_VISUAL["game-development"];
  const Icon = visual.icon;
  const meta = [duration, mode].filter(Boolean).join(" · ");

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-primary/10 bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(16,20,28,0.35)]">
      <div className={cn("relative aspect-video overflow-hidden bg-gradient-to-br", visual.tone)}>
        {image.src ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            sizes="(min-width: 1536px) 22vw, (min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
          >
            <Icon className="size-16 text-background/25" />
          </div>
        )}
        {flagship && (
          <span className="absolute top-4 right-4 rounded-full bg-brand-green px-3 py-1.5 text-xs font-semibold tracking-wide text-white uppercase">
            Flagship
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-sm font-medium text-primary">{category}</p>
        <h3 className="mt-2 line-clamp-2 text-xl font-semibold tracking-tight text-foreground">{title}</h3>
        {subtitle && <p className="mt-1 line-clamp-1 text-sm font-medium text-foreground/70">{subtitle}</p>}
        <p className="mt-2 line-clamp-3 text-base leading-relaxed text-muted-foreground">{description}</p>

        {tags.length > 0 && (
          <ul aria-label="Topics" className="mt-4 flex flex-wrap gap-1.5">
            {tags.slice(0, MAX_TAGS).map((tag) => (
              <li key={tag} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-foreground">
                {tag}
              </li>
            ))}
          </ul>
        )}

        {meta && <p className="mt-4 text-sm text-muted-foreground">{meta}</p>}

        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-1 pt-5 text-base font-medium text-foreground transition-colors duration-300 group-hover:text-primary after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
        >
          Explore Program
          <span className="sr-only">: {title}</span>
          <ArrowUpRight className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
