"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { FaYoutube } from "react-icons/fa6";
import { useModal } from "@/components/learning/projects/use-modal";
import { cn } from "cn";

// The part after "youtu.be/" (or "v=") in the supplied video's URL: https://youtu.be/MWLXjhJwgZ0
// To change or remove the hero's video, edit (or null out) this one line; nothing else needs to change.
export const HERO_YOUTUBE_VIDEO_ID: string | null = "MWLXjhJwgZ0";

/**
 * The hero's video card: a YouTube thumbnail with a play button, so the card itself never loads the heavy YouTube
 * player. Clicking it opens the player in a dimming, scroll-locking popup (the same native <dialog> pattern used
 * everywhere else on the site), rather than swapping the small card's own content. Hero renders this component
 * twice (an in-flow copy for phone/tablet, an absolutely positioned floating copy for desktop); it only fills
 * whatever box it's given, and the popup it opens is independent of that box's size.
 */
export function HeroVideoCard({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const modalRef = useModal(open);

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-2xl border border-white/15 bg-[#0b1720] shadow-[0_20px_45px_-18px_rgba(0,0,0,0.65)]",
        className
      )}
    >
      {!HERO_YOUTUBE_VIDEO_ID ? (
        <div className="flex size-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-white/10 to-transparent px-4 text-center">
          <span className="flex size-11 items-center justify-center rounded-full bg-white/15 text-white">
            <FaYoutube className="size-5" aria-hidden="true" />
          </span>
          <p className="text-xs font-medium text-white/70">Video coming soon</p>
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Play video"
            className="group absolute inset-0 flex size-full items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Image
              src={`https://i.ytimg.com/vi/${HERO_YOUTUBE_VIDEO_ID}/hqdefault.jpg`}
              alt="Thumbnail preview of Techno Gurukul's featured video"
              fill
              sizes="420px"
              className="object-cover"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-black/30 transition-colors duration-200 group-hover:bg-black/15" />
            <FaYoutube
              aria-hidden="true"
              className="relative size-14 text-[#FF0000] drop-shadow-[0_6px_16px_rgba(0,0,0,0.55)] transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </button>

          {open && (
            <dialog
              ref={modalRef}
              onClose={() => setOpen(false)}
              aria-label="Featured video"
              className="course-promo m-auto w-[min(1100px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/10 bg-black p-0 shadow-[0_24px_60px_-20px_rgba(16,20,28,0.6)] backdrop:bg-black/75 sm:rounded-3xl"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close video"
                className="absolute top-3 right-3 z-10 inline-flex size-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:top-4 sm:right-4 sm:size-11"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
              <div className="aspect-video w-full">
                <iframe
                  className="size-full"
                  src={`https://www.youtube-nocookie.com/embed/${HERO_YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
                  title="Featured video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </dialog>
          )}
        </>
      )}
    </div>
  );
}
