"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { TocItem } from "@/lib/blog-article";
import { cn } from "cn";

/**
 * Jump links for the article's sections, with the current section highlighted. `mobile` is a collapsible block above the
 * article; `side` is the sticky list in the sidebar (large screens).
 */
export function ArticleToc({ items, variant }: { items: TocItem[]; variant: "mobile" | "side" }) {
  const [active, setActive] = useState(items[0]?.id);
  const details = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => Boolean(e));
    const io = new IntersectionObserver(
      (entries) => {
        const first = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (first) setActive(first.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  const links = (
    <ul className="space-y-0.5">
      {items.map((i) => (
        <li key={i.id}>
          <a
            href={`#${i.id}`}
            aria-current={active === i.id ? "location" : undefined}
            onClick={() => details.current?.removeAttribute("open")}
            className={cn(
              "block rounded-lg border-l-2 py-1.5 pr-2 pl-3 text-[0.9375rem] leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-primary",
              active === i.id ? "border-brand-sky font-semibold text-foreground" : "border-primary/10 text-muted-foreground hover:text-foreground",
            )}
          >
            {i.text}
          </a>
        </li>
      ))}
    </ul>
  );

  if (variant === "mobile") {
    return (
      <details ref={details} className="group mb-8 rounded-2xl border border-primary/10 bg-card lg:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
          On this page
          <ChevronDown className="size-4 text-primary transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <nav aria-label="Table of contents" className="border-t border-primary/10 p-3">{links}</nav>
      </details>
    );
  }
  return (
    <nav aria-label="Table of contents" className="hidden lg:block">
      <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-primary uppercase">On this page</p>
      {links}
    </nav>
  );
}
