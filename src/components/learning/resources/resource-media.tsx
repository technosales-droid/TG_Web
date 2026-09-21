import Image from "next/image";
import {
  BookOpen,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  Image as ImageIcon,
  ListChecks,
  Play,
  Presentation,
  Table2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "cn";
import type { Resource } from "@/data/resources";
import { openUrl } from "./resource-utils";

type Visual = "guide" | "checklist" | "template" | "pdf" | "doc" | "ppt" | "xls" | "video" | "image" | "external";

/** The type decides the look for guides, checklists and templates; otherwise the file format does. */
export function visualOf(r: Resource): Visual {
  if (r.resourceType === "Guide") return "guide";
  if (r.resourceType === "Checklist") return "checklist";
  if (r.resourceType === "Template" || r.resourceType === "Worksheet") return "template";
  if (r.resourceType === "Video") return "video";
  if (r.resourceType === "Presentation") return "ppt";
  switch (r.format) {
    case "PDF":
      return "pdf";
    case "DOC":
    case "DOCX":
      return "doc";
    case "PPT":
    case "PPTX":
      return "ppt";
    case "XLS":
    case "XLSX":
    case "CSV":
      return "xls";
    case "VIDEO":
      return "video";
    case "IMAGE":
      return "image";
    case "EXTERNAL LINK":
      return "external";
  }
}

const ICON: Record<Visual, LucideIcon> = {
  guide: BookOpen,
  checklist: ListChecks,
  template: Table2,
  pdf: FileText,
  doc: FileText,
  ppt: Presentation,
  xls: FileSpreadsheet,
  video: Play,
  image: ImageIcon,
  external: ExternalLink,
};

const TINT: Record<Visual, string> = {
  guide: "from-primary/15 via-primary/5 to-brand-green/15",
  checklist: "from-brand-green/20 to-primary/10",
  template: "from-primary/15 to-brand-green/10",
  pdf: "from-primary/15 to-primary/5",
  doc: "from-primary/15 to-brand-green/10",
  ppt: "from-primary/20 to-brand-green/15",
  xls: "from-brand-green/20 to-primary/10",
  video: "from-[#0b3d50] via-[#0d5674] to-primary",
  image: "from-primary/20 via-primary/10 to-brand-green/25",
  external: "from-primary/10 via-muted to-brand-green/15",
};

const LINE = "block h-1.5 rounded-full bg-primary/20";
const SHEET = "border border-primary/20 bg-card shadow-md transition-transform duration-300 motion-safe:group-hover:-translate-y-1";

// Abstract art for each kind of resource. Never a screenshot of real software or a real document.
function Art({ visual }: { visual: Visual }) {
  switch (visual) {
    case "guide":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn("grid h-[80%] w-[62%] grid-cols-5 gap-3 rounded-lg p-3", SHEET)}>
            <div className="col-span-3 grid content-start gap-2">
              <span className="block h-2.5 w-2/3 rounded-full bg-primary/45" />
              <span className={cn(LINE, "w-full")} />
              <span className={cn(LINE, "w-5/6")} />
              <span className={cn(LINE, "w-full")} />
              <span className={cn(LINE, "w-2/3")} />
              <span className={cn(LINE, "w-4/5")} />
            </div>
            <div className="col-span-2 grid content-start gap-2">
              <span className="block h-10 rounded-md bg-gradient-to-br from-primary/30 to-brand-green/40" />
              <span className={cn(LINE, "w-full")} />
              <span className={cn(LINE, "w-3/4")} />
            </div>
          </div>
        </div>
      );
    case "checklist":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn("grid w-[54%] gap-3 rounded-lg p-4", SHEET)}>
            <span className="block h-2.5 w-1/2 rounded-full bg-primary/40" />
            {[true, true, true, false].map((on, i) => (
              <span key={i} className="flex items-center gap-2.5">
                <span className={cn("flex size-4 shrink-0 items-center justify-center rounded border", on ? "border-brand-green bg-brand-green" : "border-primary/30")}>
                  {on && <span className="block h-1.5 w-2 -translate-y-px -rotate-45 border-b-2 border-l-2 border-white" />}
                </span>
                <span className={cn(LINE, on ? "w-4/5" : "w-3/5")} />
              </span>
            ))}
          </div>
        </div>
      );
    case "template":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn("grid w-[58%] gap-2.5 rounded-lg p-4", SHEET)}>
            <span className="block h-2.5 w-2/5 rounded-full bg-primary/40" />
            <span className="block h-6 rounded-md border border-dashed border-primary/30 bg-primary/5" />
            <div className="grid grid-cols-2 gap-2">
              <span className="block h-6 rounded-md border border-dashed border-primary/30 bg-primary/5" />
              <span className="block h-6 rounded-md border border-dashed border-primary/30 bg-primary/5" />
            </div>
            <span className="block h-10 rounded-md border border-dashed border-primary/30 bg-primary/5" />
          </div>
        </div>
      );
    case "pdf":
    case "doc":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="absolute h-[70%] w-[38%] -rotate-6 rounded-lg border border-primary/15 bg-card/70" />
          <span className="absolute h-[74%] w-[38%] rotate-3 rounded-lg border border-primary/15 bg-card/80" />
          <span className={cn("relative grid h-[80%] w-[40%] content-start gap-2 rounded-lg p-3", SHEET)}>
            <span className="block h-2 w-1/2 rounded-full bg-primary/40" />
            <span className={cn(LINE, "w-full")} />
            <span className={cn(LINE, "w-5/6")} />
            <span className={cn(LINE, "w-full")} />
            <span className={cn(LINE, "w-2/3")} />
          </span>
        </div>
      );
    case "xls":
      return (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="grid w-[78%] grid-cols-4 gap-px overflow-hidden rounded-lg border border-primary/20 bg-primary/20 shadow-md transition-transform duration-300 motion-safe:group-hover:-translate-y-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className={cn("h-5", i < 4 ? "bg-primary/25" : i === 9 ? "bg-brand-green/35" : "bg-card")} />
            ))}
          </div>
        </div>
      );
    case "ppt":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn("relative aspect-video w-[62%] rounded-lg p-3", SHEET)}>
            <span className="block h-2 w-1/2 rounded-full bg-primary/40" />
            <span className="mt-2 block h-[38%] rounded bg-gradient-to-br from-primary/25 to-brand-green/35" />
            <span className={cn(LINE, "mt-2 w-3/4")} />
          </div>
          <span className="absolute right-[12%] bottom-[14%] h-[24%] w-[20%] rounded border border-primary/15 bg-card/70" />
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
    case "image":
      return (
        <div className="absolute inset-0">
          <span className="absolute top-[18%] right-[16%] size-10 rounded-full bg-background/70 sm:size-12" />
          <span className="absolute bottom-0 left-[6%] h-[46%] w-[46%] rounded-t-[3rem] bg-primary/25" />
          <span className="absolute right-[4%] bottom-0 h-[36%] w-[52%] rounded-t-[3rem] bg-brand-green/35" />
        </div>
      );
    case "external":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn("w-[70%] overflow-hidden rounded-lg", SHEET)}>
            <div className="flex items-center gap-1.5 border-b border-primary/10 bg-muted px-2.5 py-2">
              <span className="size-2 rounded-full bg-primary/25" />
              <span className="size-2 rounded-full bg-brand-green/40" />
              <span className="ml-1.5 h-2 flex-1 rounded-full bg-primary/10" />
            </div>
            <div className="grid gap-2 p-3">
              <span className="block h-8 rounded bg-gradient-to-r from-primary/25 to-brand-green/30" />
              <span className={cn(LINE, "w-4/5")} />
              <span className={cn(LINE, "w-3/5")} />
            </div>
          </div>
        </div>
      );
  }
}

/** True when there is a real image to show instead of abstract art. */
const realImage = (r: Resource) => r.thumbnail ?? (r.format === "IMAGE" ? r.media?.url : null) ?? null;

/** The card / featured / list preview: a fixed 16:10 ratio so cards line up. */
export function ResourcePreview({
  resource,
  alt,
  className,
  large = false,
  compact = false,
  fill = false,
}: {
  resource: Resource;
  alt: string;
  className?: string;
  large?: boolean;
  compact?: boolean;
  fill?: boolean;
}) {
  const visual = visualOf(resource);
  const Icon = ICON[visual];
  const src = realImage(resource);
  const soon = !openUrl(resource);

  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br", fill ? "h-full min-h-28" : "aspect-[16/10]", TINT[visual], className)}>
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
          <Art visual={visual} />
        </div>
      )}

      <span
        className={cn(
          "absolute inline-flex items-center gap-1.5 rounded-md bg-background/90 font-semibold tracking-wide text-foreground",
          compact ? "top-2 left-2 px-1.5 py-0.5 text-[10px]" : "top-3 left-3 px-2 py-1 text-[11px]"
        )}
      >
        <Icon className={cn("text-primary", compact ? "size-3" : "size-3.5")} aria-hidden="true" />
        {resource.format}
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
  "inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary";

const FILE_FORMATS = ["DOC", "DOCX", "PPT", "PPTX", "XLS", "XLSX", "CSV"];

/** The resource inside the preview: the real thing when a URL exists, otherwise a clear note. Nothing is fabricated. */
export function ResourceViewer({ resource }: { resource: Resource }) {
  const url = openUrl(resource);
  if (!url) {
    return (
      <p className="rounded-xl border border-dashed border-primary/25 bg-muted/50 px-4 py-8 text-center text-sm text-muted-foreground">
        Resource Preview Coming Soon
      </p>
    );
  }
  const opensNewTab = !url.startsWith("/") || resource.format === "PDF" || resource.format === "EXTERNAL LINK";
  return (
    <div className="grid gap-4">
      {resource.format === "VIDEO" &&
        (embedUrl(url) ? (
          <div className="aspect-video overflow-hidden rounded-xl bg-black">
            <iframe
              src={embedUrl(url) as string}
              title={resource.title}
              allow="accelerometer; encrypted-media; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="size-full"
            />
          </div>
        ) : (
          <video controls preload="none" className="aspect-video w-full rounded-xl bg-black" aria-label={resource.title}>
            <source src={url} type={resource.media?.mimeType} />
          </video>
        ))}
      {resource.format === "IMAGE" && (
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
          <Image src={url} alt={resource.title} fill unoptimized sizes="100vw" className="object-contain" />
        </div>
      )}
      <a
        href={url}
        {...(opensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(FILE_FORMATS.includes(resource.format) ? { download: true } : {})}
        className={LINK}
      >
        Open Resource
        <ExternalLink className="size-4" aria-hidden="true" />
        <span className="sr-only">: {resource.title}{opensNewTab ? " (opens in a new tab)" : ""}</span>
      </a>
    </div>
  );
}
