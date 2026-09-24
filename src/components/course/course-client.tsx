"use client";

import { useState } from "react";
import { ChevronDown, PlayCircle } from "lucide-react";
import { cn } from "cn";
import type { CourseModule } from "@/data/course-details";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

/** Udemy-style curriculum: modules as an accordion, only the first open, with "Expand all sections". */
export function CurriculumAccordion({ modules }: { modules: CourseModule[] }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const all = open.size === modules.length;
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const lessons = modules.reduce((n, m) => n + m.lessons.length, 0);
  const meta = [`${modules.length} modules`, lessons ? `${lessons} lessons` : ""].filter(Boolean).join(" • ");

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <p className="text-muted-foreground">{meta}</p>
        <button
          type="button"
          onClick={() => setOpen(all ? new Set() : new Set(modules.map((_, i) => i)))}
          className={cn("min-h-11 rounded font-semibold text-primary hover:underline", FOCUS)}
        >
          {all ? "Collapse all sections" : "Expand all sections"}
        </button>
      </div>

      <div className="mt-2 border border-primary/20">
        {modules.map((m, i) => {
          const isOpen = open.has(i);
          return (
            <div key={m.title} className="border-b border-primary/20 last:border-b-0">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`module-${i}`}
                onClick={() => toggle(i)}
                className={cn("flex min-h-14 w-full items-center justify-between gap-4 bg-muted/60 px-4 py-3 text-left hover:bg-muted", FOCUS)}
              >
                <span className="flex items-center gap-3 text-base font-semibold text-foreground">
                  <ChevronDown className={cn("size-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")} aria-hidden="true" />
                  <span>
                    <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Module {String(i + 1).padStart(2, "0")}</span>
                    <span className="block">{m.title}</span>
                  </span>
                </span>
                <span className="shrink-0 text-sm text-muted-foreground">
                  {[m.lessons.length ? `${m.lessons.length} lessons` : "", m.duration ?? ""].filter(Boolean).join(" • ")}
                </span>
              </button>
              <div id={`module-${i}`} hidden={!isOpen} className="bg-card px-4 py-3">
                {m.lessons.length ? (
                  <ul className="grid gap-1">
                    {m.lessons.map((l, li) => (
                      <li key={l.title} className="flex items-start justify-between gap-4 py-2 text-base text-foreground">
                        <span className="flex items-start gap-3">
                          <PlayCircle className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                          <span>
                            <span className="text-muted-foreground">Lesson {String(li + 1).padStart(2, "0")}: </span>
                            {l.title}
                            {l.preview && <span className="ml-2 text-sm font-semibold text-primary underline">Preview</span>}
                          </span>
                        </span>
                        {l.duration && <span className="shrink-0 text-sm text-muted-foreground">{l.duration}</span>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="py-1 text-base leading-relaxed text-muted-foreground">{m.summary ?? "Lessons for this module will be added here."}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Long text clamped to a few lines, with "Show more" / "Show less". */
export function ExpandableText({ paragraphs }: { paragraphs: string[] }) {
  const [open, setOpen] = useState(false);
  const long = paragraphs.join(" ").length > 420;
  return (
    <div>
      <div className={cn("relative grid gap-4 text-base leading-relaxed text-foreground", long && !open && "max-h-40 overflow-hidden")}>
        {paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {long && !open && <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />}
      </div>
      {long && (
        <button type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)} className={cn("mt-3 inline-flex min-h-11 items-center gap-1 rounded font-semibold text-primary hover:underline", FOCUS)}>
          {open ? "Show less" : "Show more"}
          <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
