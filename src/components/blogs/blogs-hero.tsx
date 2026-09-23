"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "cn";
import { BlogCover } from "@/components/blogs/blog-cover";
import type { BlogCardData } from "@/data/blogs";

export type BlogHeroPost = BlogCardData;

const SLIDE_MS = 7000;
const MANUAL_PAUSE_MS = 10000;
const SWIPE_PX = 50;

const pad = (n: number) => String(n).padStart(2, "0");

function BlogHeroContent({ post }: { post: BlogHeroPost }) {
  return (
    <div className="max-w-[850px]">
      <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-white uppercase motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-700 sm:text-sm">
        <span aria-hidden="true" className="h-px w-8 bg-brand-green" />
        {post.category}
      </p>

      <h1
        className="mt-4 text-3xl leading-[1.08] font-semibold tracking-tight text-balance text-white motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-700 sm:mt-5 sm:text-4xl lg:text-5xl xl:text-6xl"
        style={{ animationDelay: "80ms" }}
      >
        {post.title}
      </h1>

      <p
        className="mt-4 line-clamp-3 max-w-2xl text-base leading-relaxed text-white/85 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-700 sm:mt-5 sm:line-clamp-none sm:text-lg"
        style={{ animationDelay: "160ms" }}
      >
        {post.excerpt}
      </p>

      <div
        className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-700"
        style={{ animationDelay: "240ms" }}
      >
        <Link
          href={`/blogs/${post.slug}`}
          className="group inline-flex items-center gap-2 border-b border-white/70 pb-1 text-sm font-semibold tracking-widest text-white uppercase transition-colors hover:border-brand-green hover:text-brand-green focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Read Article
          <ArrowRight
            className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
        <p className="text-sm text-white/75">
          <time dateTime={post.isoDate}>{post.date}</time>
          <span aria-hidden="true" className="mx-2">
            &middot;
          </span>
          {post.readTime} min read
        </p>
      </div>
    </div>
  );
}

function BlogHeroControls({
  index,
  total,
  paused,
  onPrev,
  onNext,
  onProgressEnd,
}: {
  index: number;
  total: number;
  paused: boolean;
  onPrev: () => void;
  onNext: () => void;
  onProgressEnd: () => void;
}) {
  const btn =
    "flex size-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
  return (
    <div className="flex w-full max-w-xs flex-col gap-4 lg:w-64 lg:max-w-none">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold tracking-widest text-white tabular-nums" aria-live="polite">
          <span className="sr-only">Article </span>
          {pad(index + 1)} <span className="text-white/50">/ {pad(total)}</span>
        </p>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onPrev} aria-label="Previous article" className={btn}>
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={onNext} aria-label="Next article" className={btn}>
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div aria-hidden="true" className="h-[2px] w-full overflow-hidden bg-white/25">
        <div
          key={index}
          onAnimationEnd={onProgressEnd}
          className="blog-hero-progress h-full origin-left bg-white"
          style={{
            ["--blog-hero-duration" as string]: `${SLIDE_MS}ms`,
            animationPlayState: paused ? "paused" : "running",
          }}
        />
      </div>
    </div>
  );
}

export function BlogsHero({ posts }: { posts: BlogHeroPost[] }) {
  const total = posts.length;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [manualPause, setManualPause] = useState(false);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const goTo = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total]
  );

  const interact = useCallback(
    (next: number) => {
      goTo(next);
      setManualPause(true);
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
      pauseTimer.current = setTimeout(() => setManualPause(false), MANUAL_PAUSE_MS);
    },
    [goTo]
  );

  useEffect(
    () => () => {
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
    },
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.key === "ArrowRight") interact(index + 1);
      else if (e.key === "ArrowLeft") interact(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, interact]);

  if (total === 0) return null;
  const post = posts[index];
  const paused = hovered || manualPause;
  // Only the current slide and its neighbours are mounted, so ten large photos aren't all fetched up front.
  const mounted = (i: number) => {
    const d = Math.abs(i - index);
    return d <= 1 || d === total - 1;
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured articles"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
      onTouchStart={(e) => {
        const t = e.touches[0];
        touch.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        const start = touch.current;
        touch.current = null;
        if (!start) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - start.x;
        if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(t.clientY - start.y)) interact(index + (dx < 0 ? 1 : -1));
      }}
      className="relative -mt-[5.25rem] flex min-h-[88svh] touch-pan-y flex-col justify-end overflow-hidden bg-black lg:min-h-[100svh]"
    >
      {posts.map((p, i) =>
        mounted(i) ? (
          <div
            key={p.slug}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${total}`}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 transition-[opacity,transform] duration-[800ms] ease-out motion-reduce:transition-none",
              i === index ? "z-10 scale-100 opacity-100" : "z-0 scale-[1.06] opacity-0"
            )}
          >
            <BlogCover post={p} sizes="100vw" priority={i === 0} />
          </div>
        ) : null
      )}

      <div aria-hidden="true" className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
      <div aria-hidden="true" className="absolute inset-0 z-10 hidden bg-gradient-to-r from-black/60 via-black/15 to-transparent lg:block" />

      <div className="relative z-20 mx-auto flex w-full max-w-[1800px] flex-col gap-8 px-5 pt-32 pb-8 sm:px-10 sm:pb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:px-16 lg:pb-14">
        <BlogHeroContent key={post.slug} post={post} />
        <BlogHeroControls
          index={index}
          total={total}
          paused={paused}
          onPrev={() => interact(index - 1)}
          onNext={() => interact(index + 1)}
          onProgressEnd={() => {
            if (total > 1) goTo(index + 1);
          }}
        />
      </div>
    </section>
  );
}
