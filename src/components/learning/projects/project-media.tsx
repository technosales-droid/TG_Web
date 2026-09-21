import Image from "next/image";
import {
  Code2,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  Image as ImageIcon,
  Images,
  LayoutTemplate,
  Play,
  Presentation,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "cn";
import type { MediaType, ProjectMedia } from "@/data/projects";
import { mediaAction, mediaBadge } from "./project-utils";

export const MEDIA_ICON: Record<MediaType, LucideIcon> = {
  image: ImageIcon,
  video: Play,
  pdf: FileText,
  document: FileText,
  spreadsheet: FileSpreadsheet,
  presentation: Presentation,
  "external-link": ExternalLink,
  gallery: Images,
};

const TINT: Record<MediaType, string> = {
  image: "from-primary/20 via-primary/10 to-brand-green/25",
  video: "from-[#0b3d50] via-[#0d5674] to-primary",
  pdf: "from-primary/15 to-primary/5",
  document: "from-primary/15 to-brand-green/10",
  spreadsheet: "from-brand-green/20 to-primary/10",
  presentation: "from-primary/20 to-brand-green/15",
  "external-link": "from-primary/10 via-muted to-brand-green/15",
  gallery: "from-brand-green/20 via-primary/10 to-primary/20",
};

/** True when there is something real to show instead of an abstract placeholder. */
const hasAsset = (m: ProjectMedia) => Boolean(m.thumbnail || (m.type === "image" && m.url));

// Abstract art for each kind of media. Never a real screenshot: it only tells you what you would open.
function Art({ type }: { type: MediaType | "prototype" | "code" }) {
  const line = "block h-1.5 rounded-full bg-primary/20";
  switch (type) {
    case "prototype":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid w-[64%] grid-cols-[28%_1fr] gap-2 rounded-lg border border-primary/20 bg-card p-2.5 shadow-md transition-transform duration-300 motion-safe:group-hover:-translate-y-1">
            <span className="row-span-3 rounded bg-primary/20" />
            <span className="h-3 rounded bg-primary/35" />
            <span className="h-9 rounded bg-gradient-to-br from-primary/20 to-brand-green/35" />
            <span className="flex gap-2">
              <span className="h-3 flex-1 rounded bg-brand-green/40" />
              <span className="h-3 flex-1 rounded bg-primary/15" />
            </span>
          </div>
        </div>
      );
    case "code":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid w-[64%] gap-2 rounded-lg border border-primary/25 bg-[#0b3d50] p-3 shadow-md transition-transform duration-300 motion-safe:group-hover:-translate-y-1">
            <span className="block h-1.5 w-1/3 rounded-full bg-brand-green/70" />
            <span className="ml-3 block h-1.5 w-2/3 rounded-full bg-background/40" />
            <span className="ml-3 block h-1.5 w-1/2 rounded-full bg-background/25" />
            <span className="ml-6 block h-1.5 w-3/5 rounded-full bg-primary/60" />
            <span className="block h-1.5 w-1/4 rounded-full bg-brand-green/70" />
          </div>
        </div>
      );
    case "image":
      return (
        <div className="absolute inset-0">
          <span className="absolute top-[18%] right-[16%] size-10 rounded-full bg-background/70 sm:size-12" />
          <span className="absolute bottom-0 left-[6%] h-[46%] w-[46%] rounded-t-[3rem] bg-primary/25" />
          <span className="absolute right-[4%] bottom-0 h-[36%] w-[52%] rounded-t-[3rem] bg-brand-green/35" />
        </div>
      );
    case "video":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-background/90 text-primary shadow-lg transition-transform duration-300 motion-safe:group-hover:scale-110 sm:size-[4.5rem]">
            <Play className="ml-1 size-7 fill-current" aria-hidden="true" />
          </span>
          <span className="absolute right-4 bottom-4 left-4 h-1.5 rounded-full bg-background/25">
            <span className="block h-full w-1/3 rounded-full bg-brand-green" />
          </span>
        </div>
      );
    case "pdf":
    case "document":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="absolute h-[70%] w-[38%] -rotate-6 rounded-lg border border-primary/15 bg-card/70" />
          <span className="absolute h-[74%] w-[38%] rotate-3 rounded-lg border border-primary/15 bg-card/80" />
          <span className="relative grid h-[80%] w-[40%] content-start gap-2 rounded-lg border border-primary/20 bg-card p-3 shadow-md transition-transform duration-300 motion-safe:group-hover:-translate-y-1">
            <span className="block h-2 w-1/2 rounded-full bg-primary/40" />
            <span className={cn(line, "w-full")} />
            <span className={cn(line, "w-5/6")} />
            <span className={cn(line, "w-full")} />
            <span className={cn(line, "w-2/3")} />
          </span>
        </div>
      );
    case "spreadsheet":
      return (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="grid w-[78%] grid-cols-4 gap-px overflow-hidden rounded-lg border border-primary/20 bg-primary/20 shadow-md transition-transform duration-300 motion-safe:group-hover:-translate-y-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className={cn("h-5", i < 4 ? "bg-primary/25" : i === 9 ? "bg-brand-green/35" : "bg-card")} />
            ))}
          </div>
        </div>
      );
    case "presentation":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative aspect-video w-[62%] rounded-lg border border-primary/20 bg-card p-3 shadow-md transition-transform duration-300 motion-safe:group-hover:-translate-y-1">
            <span className="block h-2 w-1/2 rounded-full bg-primary/40" />
            <span className="mt-2 block h-[38%] rounded bg-gradient-to-br from-primary/25 to-brand-green/35" />
            <span className={cn(line, "mt-2 w-3/4")} />
          </div>
          <span className="absolute right-[12%] bottom-[14%] h-[24%] w-[20%] rounded border border-primary/15 bg-card/70" />
        </div>
      );
    case "external-link":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[70%] overflow-hidden rounded-lg border border-primary/20 bg-card shadow-md transition-transform duration-300 motion-safe:group-hover:-translate-y-1">
            <div className="flex items-center gap-1.5 border-b border-primary/10 bg-muted px-2.5 py-2">
              <span className="size-2 rounded-full bg-primary/25" />
              <span className="size-2 rounded-full bg-brand-green/40" />
              <span className="ml-1.5 h-2 flex-1 rounded-full bg-primary/10" />
            </div>
            <div className="grid gap-2 p-3">
              <span className="block h-8 rounded bg-gradient-to-r from-primary/25 to-brand-green/30" />
              <span className={cn(line, "w-4/5")} />
              <span className={cn(line, "w-3/5")} />
            </div>
          </div>
        </div>
      );
    case "gallery":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="absolute h-[58%] w-[40%] -translate-x-[70%] -rotate-6 rounded-lg border border-primary/15 bg-primary/25 shadow" />
          <span className="absolute h-[58%] w-[40%] translate-x-[70%] rotate-6 rounded-lg border border-primary/15 bg-brand-green/35 shadow" />
          <span className="relative h-[66%] w-[42%] rounded-lg border border-primary/20 bg-gradient-to-br from-primary/30 to-brand-green/30 shadow-md transition-transform duration-300 motion-safe:group-hover:-translate-y-1" />
        </div>
      );
  }
}

/** The card / featured preview of a project's first media item. Fixed ratio so cards line up. */
export function MediaPreview({
  media,
  alt,
  className,
  large = false,
  compact = false,
  fill = false,
}: {
  media: ProjectMedia;
  alt: string;
  className?: string;
  large?: boolean;
  /** Smaller badge and chip, for the list-view thumbnail. */
  compact?: boolean;
  /** Fill the parent's height instead of using the 16:10 ratio. */
  fill?: boolean;
}) {
  const Icon = media.art === "code" ? Code2 : media.art === "prototype" ? LayoutTemplate : MEDIA_ICON[media.type];
  const badge = media.art === "code" ? "CODE" : media.art === "prototype" ? "PROTOTYPE" : mediaBadge(media);
  const src = media.thumbnail ?? (media.type === "image" ? media.url : null);
  const soon = !hasAsset(media);

  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br", fill ? "h-full min-h-28" : "aspect-[16/10]", TINT[media.type], className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
        />
      ) : (
        <div aria-hidden="true">
          <Art type={media.art ?? media.type} />
        </div>
      )}

      <span
        className={cn(
          "absolute inline-flex items-center gap-1.5 rounded-md bg-background/90 font-semibold tracking-wide text-foreground",
          compact ? "top-2 left-2 px-1.5 py-0.5 text-[10px]" : "top-3 left-3 px-2 py-1 text-[11px]"
        )}
      >
        <Icon className={cn("text-primary", compact ? "size-3" : "size-3.5")} aria-hidden="true" />
        {badge}
      </span>

      {soon && (
        <span
          className={cn(
            "absolute rounded-md bg-foreground/70 font-medium text-background",
            compact ? "bottom-2 left-2 px-1.5 py-0.5 text-[10px]" : "bottom-3 left-3 px-2 py-1",
            !compact && (large ? "text-xs" : "text-[11px]")
          )}
        >
          Preview Coming Soon
        </span>
      )}
    </div>
  );
}

function embedUrl(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  return null;
}

const LINK =
  "inline-flex min-h-10 items-center gap-2 rounded-full border border-primary/25 bg-card px-4 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

/** One media item inside the project preview: the real thing when a URL exists, otherwise a clear note. */
export function MediaViewer({ media }: { media: ProjectMedia }) {
  const Icon = MEDIA_ICON[media.type];
  const { url } = media;

  return (
    <div className="rounded-2xl border border-primary/10 bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex min-w-0 items-center gap-2 text-sm font-semibold text-foreground">
          <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
          <span className="[overflow-wrap:anywhere]">{media.label}</span>
        </p>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-foreground">
          {mediaBadge(media)}
        </span>
      </div>
      {media.description && <p className="mt-1 text-sm text-muted-foreground">{media.description}</p>}

      <div className="mt-3">
        {!url && !(media.type === "gallery" && media.images?.length) ? (
          <p className="rounded-xl border border-dashed border-primary/25 bg-muted/50 px-4 py-6 text-center text-sm text-muted-foreground">
            Preview Coming Soon
          </p>
        ) : media.type === "image" && url ? (
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
            <Image src={url} alt={media.description ?? media.label} fill unoptimized sizes="100vw" className="object-contain" />
          </div>
        ) : media.type === "gallery" ? (
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {(media.images ?? []).map((img) => (
              <li key={img.url} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                <Image src={img.url} alt={img.alt} fill unoptimized sizes="33vw" className="object-cover" />
              </li>
            ))}
          </ul>
        ) : media.type === "video" && url ? (
          embedUrl(url) ? (
            <div className="aspect-video overflow-hidden rounded-xl bg-black">
              <iframe
                src={embedUrl(url) as string}
                title={media.label}
                allow="accelerometer; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="size-full"
              />
            </div>
          ) : (
            <video controls preload="metadata" className="aspect-video w-full rounded-xl bg-black" aria-label={media.label}>
              <source src={url} type={media.mimeType} />
            </video>
          )
        ) : url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            {...(media.type === "document" || media.type === "spreadsheet" || media.type === "presentation" ? { download: true } : {})}
            className={LINK}
          >
            {mediaAction[media.type]}
            <ExternalLink className="size-4" aria-hidden="true" />
            <span className="sr-only">: {media.label}{media.type === "external-link" || media.type === "pdf" ? " (opens in a new tab)" : ""}</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}
