import Image from "next/image";
import { Film, ImageIcon, Play, Sparkles } from "lucide-react";
import { cn } from "cn";
import type { MediaItem } from "@/data/institute";

// Three soft blue tones, picked from the label so neighbouring placeholders differ.
const TONES = [
  "from-[#0b3d50] via-[#0d5674] to-[#0a6a8f]",
  "from-[#0d5674] via-[#0a6a8f] to-primary/80",
  "from-[#0a4a66] via-[#0a6a8f] to-brand-sky/50",
];
const toneOf = (label: string) => TONES[[...label].reduce((n, c) => n + c.charCodeAt(0), 0) % TONES.length];

const KIND_ICON = { image: ImageIcon, video: Film, gif: Sparkles } as const;

/**
 * One piece of media, filling its parent (the parent sets the size and rounded corners). With a `src` it shows the
 * real image, GIF or video. Without one it shows a clearly labelled placeholder, so nothing invented is on screen.
 */
export function Media({ item, className, sizes = "100vw", priority = false, compact = false }: {
  item: MediaItem;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Smaller label for small tiles. */
  compact?: boolean;
}) {
  const Icon = KIND_ICON[item.kind];

  if (item.src && item.kind === "video") {
    return <video src={item.src} poster={item.poster} controls playsInline preload="none" aria-label={item.label} className={cn("absolute inset-0 size-full object-cover", className)} />;
  }
  if (item.src) {
    return (
      <Image
        src={item.src}
        alt={item.alt ?? item.label}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={item.kind === "gif"}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <div role="img" aria-label={`${item.label} (placeholder)`} className={cn("absolute inset-0 overflow-hidden bg-gradient-to-br", toneOf(item.label), className)}>
      <span aria-hidden="true" className="absolute -top-1/4 -right-1/6 size-3/4 rounded-full border border-white/10" />
      <span aria-hidden="true" className="absolute -bottom-1/3 -left-1/6 size-2/3 rounded-full border border-white/10" />

      <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
        {item.kind === "video" ? (
          <span className={cn("flex items-center justify-center rounded-full bg-white/90 text-[#062c3d] shadow-lg", compact ? "size-11" : "size-16 sm:size-20")}>
            <Play className={cn("translate-x-0.5 fill-current", compact ? "size-4" : "size-6 sm:size-7")} />
          </span>
        ) : (
          <Icon className={cn("text-white/25", compact ? "size-8" : "size-14 sm:size-20")} strokeWidth={1.25} />
        )}
      </span>

      <span className="absolute bottom-3 left-3 flex max-w-[calc(100%-1.5rem)] flex-col gap-0.5 rounded-xl bg-black/30 px-3 py-2 backdrop-blur-sm sm:bottom-4 sm:left-4">
        <span className={cn("truncate font-semibold text-white", compact ? "text-xs" : "text-sm")}>{item.label}</span>
        <span className="text-[10px] font-semibold tracking-[0.18em] text-white/65 uppercase">Placeholder</span>
      </span>

      {item.kind === "video" && item.duration && (
        <span className="absolute right-3 bottom-3 rounded-md bg-black/40 px-2 py-1 text-xs font-medium text-white tabular-nums sm:right-4 sm:bottom-4">{item.duration}</span>
      )}
    </div>
  );
}
