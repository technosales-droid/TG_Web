import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Gamepad2, Layers, Megaphone, type LucideIcon } from "lucide-react";
import { cn } from "cn";
import type { Offering } from "@/data/programs";
import type { ViewMode } from "./program-utils";

const CATEGORY_VISUAL: Record<string, { tone: string; icon: LucideIcon }> = {
  "digital-marketing": { tone: "from-primary via-primary/70 to-brand-green/50", icon: Megaphone },
  "game-development": { tone: "from-brand-green/80 via-primary/70 to-[#0b3d50]", icon: Gamepad2 },
  "game-design": { tone: "from-[#0d6386] to-[#0b3d50]", icon: Layers },
};

const MAX_TAGS = 4;
const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function OfferingImage({
  src,
  alt,
  categorySlug,
  className,
  children,
}: {
  src: string | null;
  alt: string;
  categorySlug: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const visual = CATEGORY_VISUAL[categorySlug] ?? CATEGORY_VISUAL["game-development"];
  const Icon = visual.icon;
  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br", visual.tone, className)}>
      {src ? (
        <Image src={src} alt={alt} fill sizes="(min-width: 1536px) 22vw, (min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
          <Icon className="size-16 text-background/25" />
        </div>
      )}
      {children}
    </div>
  );
}

export function OfferingCard({
  offering,
  category,
  categorySlug,
  view = "grid",
}: {
  offering: Offering;
  category: string;
  categorySlug: string;
  view?: ViewMode;
}) {
  const { title, subtitle, description, duration, mode, tags, href, image, flagship } = offering;
  const meta = [duration, mode].filter(Boolean).join(" · ");
  const frame = "group relative overflow-hidden rounded-[1.75rem] border border-primary/10 bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(16,20,28,0.35)]";

  if (view === "list") {
    return (
      <article className={cn(frame, "flex")}>
        <div className="w-28 shrink-0 sm:w-52">
          <OfferingImage src={image.src} alt={image.alt} categorySlug={categorySlug} className="size-full" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2 p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-medium text-primary">{category}</p>
            {flagship && <span className="rounded-full bg-brand-green px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-white uppercase">Flagship</span>}
          </div>
          <h3 className="text-lg leading-snug font-semibold tracking-tight text-foreground sm:text-xl">{title}</h3>
          {subtitle && <p className="text-sm font-medium text-foreground/70">{subtitle}</p>}
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p>
          {tags.length > 0 && (
            <ul aria-label="Topics" className="mt-1 flex flex-wrap gap-1.5">
              {tags.slice(0, MAX_TAGS).map((tag) => (
                <li key={tag} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-foreground">
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-2">
            <p className="text-sm text-muted-foreground">{meta}</p>
            <Link href={href} className={cn("inline-flex items-center gap-1 text-base font-medium text-foreground transition-colors group-hover:text-primary after:absolute after:inset-0 after:rounded-[1.75rem]", FOCUS)}>
              Explore Program
              <span className="sr-only">: {title}</span>
              <ArrowUpRight className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={cn(frame, "flex h-full flex-col")}>
      <OfferingImage src={image.src} alt={image.alt} categorySlug={categorySlug} className="aspect-video">
        {flagship && (
          <span className="absolute top-4 right-4 rounded-full bg-brand-green px-3 py-1.5 text-xs font-semibold tracking-wide text-white uppercase">Flagship</span>
        )}
      </OfferingImage>

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

        <Link href={href} className={cn("mt-auto inline-flex items-center gap-1 pt-5 text-base font-medium text-foreground transition-colors duration-300 group-hover:text-primary after:absolute after:inset-0 after:rounded-[1.75rem]", FOCUS)}>
          Explore Program
          <span className="sr-only">: {title}</span>
          <ArrowUpRight className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
