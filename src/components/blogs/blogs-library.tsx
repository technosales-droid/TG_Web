"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "cn";
import { BlogCover } from "@/components/blogs/blog-cover";
import { BLOG_CATEGORIES, type BlogCardData, type BlogCategory } from "@/data/blogs";

const PER_PAGE = 6;
const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

type Filter = "All" | BlogCategory;

function PostCard({ post }: { post: BlogCardData }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-primary/10 bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(16,20,28,0.35)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <div className="absolute inset-0 transition-transform duration-500 motion-safe:group-hover:scale-105">
          <BlogCover post={post} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase">{post.category}</p>
        <h3 className="mt-2 text-xl leading-snug font-semibold tracking-tight text-foreground">
          <Link
            href={`/blogs/${post.slug}`}
            className={cn("after:absolute after:inset-0 after:rounded-[1.75rem]", FOCUS)}
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-base leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <p className="mt-auto pt-4 text-sm text-muted-foreground">
          <time dateTime={post.isoDate}>{post.date}</time>
          <span aria-hidden="true" className="mx-2">
            &middot;
          </span>
          {post.readTime} min read
        </p>
      </div>
    </article>
  );
}

export function BlogsLibrary({ posts }: { posts: BlogCardData[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [page, setPage] = useState(1);
  const nav = useRef<HTMLElement>(null);
  const navTop = useRef<number | null>(null);

  const categories = useMemo(() => BLOG_CATEGORIES.filter((c) => posts.some((p) => p.category === c)), [posts]);
  const filtered = useMemo(() => (filter === "All" ? posts : posts.filter((p) => p.category === filter)), [posts, filter]);
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const start = (current - 1) * PER_PAGE;
  const visible = filtered.slice(start, start + PER_PAGE);

  // Cards differ in height between pages, so keep the pagination bar fixed on screen instead of
  // letting the page jump.
  const goTo = (n: number) => {
    navTop.current = nav.current?.getBoundingClientRect().top ?? null;
    setPage(n);
  };

  useLayoutEffect(() => {
    if (navTop.current === null || !nav.current) return;
    const shift = nav.current.getBoundingClientRect().top - navTop.current;
    navTop.current = null;
    if (shift) window.scrollBy(0, shift);
  }, [current]);

  const chip = (active: boolean) =>
    cn(
      "min-h-10 rounded-full border px-4 text-sm font-medium transition-colors",
      FOCUS,
      active ? "border-primary bg-primary text-primary-foreground" : "border-primary/20 bg-card text-foreground hover:bg-muted"
    );

  return (
    <section aria-labelledby="library-heading" className="scroll-mt-28 px-4 pt-10 pb-16 sm:px-6 sm:pt-14 sm:pb-24">
      <div className="mx-auto max-w-[1400px] border-t border-primary/10 pt-10 sm:pt-14">
        <h2 id="library-heading" className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Explore the library
        </h2>

        <div role="group" aria-label="Filter articles by category" className="mt-6 flex flex-wrap gap-2">
          {(["All", ...categories] as Filter[]).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => {
                setFilter(c);
                setPage(1);
              }}
              className={chip(filter === c)}
            >
              {c}
            </button>
          ))}
        </div>

        <p aria-live="polite" className="mt-5 text-sm text-muted-foreground">
          Showing {filtered.length === 0 ? 0 : start + 1}–{start + visible.length} of {filtered.length}{" "}
          {filtered.length === 1 ? "article" : "articles"}
        </p>

        <ul className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((post) => (
            <li key={post.slug} className="min-w-0">
              <PostCard post={post} />
            </li>
          ))}
        </ul>

        {pages > 1 && (
          <nav ref={nav} aria-label="Article pages" className="mt-10 flex items-center justify-between gap-4 border-t border-primary/10 pt-8">
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              disabled={current === 1}
              aria-label="Previous page"
              className={cn("flex size-11 items-center justify-center rounded-full border border-primary/20 transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40", FOCUS)}
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <ul className="flex flex-wrap items-center justify-center gap-1.5">
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <li key={n}>
                  <button
                    type="button"
                    onClick={() => goTo(n)}
                    aria-label={`Page ${n}`}
                    aria-current={n === current ? "page" : undefined}
                    className={cn(
                      "flex size-10 items-center justify-center rounded-full text-sm font-medium transition-colors",
                      FOCUS,
                      n === current ? "bg-foreground text-background" : "text-foreground hover:bg-muted"
                    )}
                  >
                    {n}
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => goTo(current + 1)}
              disabled={current === pages}
              aria-label="Next page"
              className={cn("flex size-11 items-center justify-center rounded-full border border-primary/20 transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40", FOCUS)}
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}
