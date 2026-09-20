"use client";

import { useId, useState } from "react";
import {
  ArrowDown,
  Check,
  ChevronRight,
  FileCheck,
  FileText,
  FolderOpen,
  Lightbulb,
  ListChecks,
  Presentation,
  RefreshCw,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "cn";
import {
  PROOF_AREAS,
  PROOF_BOARDS,
  PROOF_PRINCIPLES,
  type ProofArea,
  type ProofIcon,
  type ProofPrinciple,
} from "@/data/career-proof";

const ICONS: Record<ProofIcon, LucideIcon> = {
  folder: FolderOpen,
  presentation: Presentation,
  "file-text": FileText,
  refresh: RefreshCw,
};

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const LABEL = "text-[11px] font-semibold tracking-widest text-muted-foreground uppercase";
// Layers step slightly to the right from tablet up (margin, so the layer never leaves its container).
const OFFSETS = ["", "sm:ml-4", "sm:ml-8", "sm:ml-12"];

const examplesFor = (p: ProofPrinciple, area: ProofArea) => (Array.isArray(p.examples) ? p.examples : p.examples[area]);

function Stage({
  index,
  icon: Icon,
  label,
  children,
  highlight = false,
}: {
  index: number;
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <li className={cn("min-w-0", OFFSETS[index])}>
      <div
        className={cn(
          "group rounded-2xl border p-4 transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_14px_28px_-18px_rgba(16,20,28,0.35)]",
          highlight ? "border-brand-green/30 bg-brand-green/10" : "border-primary/10 bg-background"
        )}
      >
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-full",
              highlight ? "bg-brand-green text-white" : "bg-accent text-primary"
            )}
          >
            <Icon className="size-3.5 transition-transform duration-300 motion-safe:group-hover:scale-110" aria-hidden="true" />
          </span>
          <p className={LABEL}>{label}</p>
        </div>
        <div className="mt-3">{children}</div>
      </div>
    </li>
  );
}

function Connector() {
  return (
    <li aria-hidden="true" className="flex justify-center py-1 text-primary/40 sm:justify-start sm:pl-6">
      <ArrowDown className="size-4" />
    </li>
  );
}

export function CareerProof() {
  const [area, setArea] = useState<ProofArea>("digital-marketing");
  const [exampleIndex, setExampleIndex] = useState(0);
  const switchId = useId();
  const board = PROOF_BOARDS[area];
  const example = board.examples[exampleIndex] ?? board.examples[0];

  const chooseArea = (next: ProofArea) => {
    setArea(next);
    setExampleIndex(0);
  };

  return (
    <section id="career-proof" aria-labelledby="career-proof-heading" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12 xl:gap-20">
          {/* Left: message */}
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              Build Your Proof
            </div>
            <h2
              id="career-proof-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl"
            >
              Don&rsquo;t Just Learn the Skill.{" "}
              <span className="inline-block bg-gradient-to-r from-primary to-brand-green bg-clip-text text-transparent">
                Show What You Can Do.
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Practical learning becomes more valuable when you have work to show. Projects, experiments and
              portfolio pieces give you a way to demonstrate how you think, what you can build and how you apply
              your skills.
            </p>

            <ol aria-label="Build, refine, present" className="mt-6 flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
              {["Build", "Refine", "Present"].map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  {i > 0 && <ChevronRight className="size-4 text-primary/50" aria-hidden="true" />}
                  <span className="rounded-full border border-primary/15 bg-card px-3.5 py-1.5">{step}</span>
                </li>
              ))}
            </ol>

            <p className="mt-6 max-w-xl rounded-2xl border border-primary/10 bg-muted/50 px-4 py-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              The aim is to build evidence of your ability. Projects are real-world style and designed around
              practical workflows. They help you show your skills; they are not a promise of employment.
            </p>
          </div>

          {/* Right: switch + workspace */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p id={switchId} className="text-sm font-medium text-muted-foreground">
                Show examples for
              </p>
              <div
                role="group"
                aria-labelledby={switchId}
                className="inline-flex max-w-full flex-wrap rounded-full border border-primary/15 bg-card p-1"
              >
                {PROOF_AREAS.map((a) => {
                  const active = a.id === area;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => chooseArea(a.id)}
                      className={cn(
                        "min-h-10 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200",
                        FOCUS,
                        active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                      )}
                    >
                      {a.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-[2rem] border border-primary/10 bg-card shadow-[0_24px_48px_-32px_rgba(16,20,28,0.35)]">
              {/* Workspace bar */}
              <div className="flex items-center gap-3 border-b border-primary/10 bg-muted/50 px-4 py-3 sm:px-5">
                <span aria-hidden="true" className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-primary/25" />
                  <span className="size-2.5 rounded-full bg-brand-green/40" />
                  <span className="size-2.5 rounded-full bg-primary/15" />
                </span>
                <p className={LABEL}>Project workspace</p>
              </div>

              <div className="bg-gradient-to-br from-primary/5 via-transparent to-brand-green/10 p-4 sm:p-6">
                <p className={LABEL}>Example projects</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {board.examples.map((name, i) => (
                    <li key={name}>
                      <button
                        type="button"
                        aria-pressed={i === exampleIndex}
                        onClick={() => setExampleIndex(i)}
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 sm:text-sm motion-safe:hover:-translate-y-0.5",
                          FOCUS,
                          i === exampleIndex
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-primary/15 bg-card text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {name}
                      </button>
                    </li>
                  ))}
                </ul>

                <ol aria-label="From project to portfolio" className="mt-5 grid">
                  <Stage index={0} icon={Lightbulb} label="Project">
                    <p className="text-lg font-semibold tracking-tight text-foreground [overflow-wrap:anywhere]">{example}</p>
                    {/* Abstract placeholder for project media, not a real screenshot */}
                    <div aria-hidden="true" className="mt-3 grid grid-cols-[1fr_2fr] gap-2">
                      <div className="h-14 rounded-lg bg-gradient-to-br from-primary/20 to-brand-green/25" />
                      <div className="grid gap-2">
                        <div className="h-3 w-4/5 rounded-full bg-primary/15" />
                        <div className="h-3 w-3/5 rounded-full bg-primary/10" />
                        <div className="h-3 w-2/5 rounded-full bg-brand-green/25" />
                      </div>
                    </div>
                  </Stage>
                  <Connector />
                  <Stage index={1} icon={ListChecks} label="Process">
                    <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
                      {board.process.map((step, i) => (
                        <li key={step} className="flex items-center gap-1.5">
                          {i > 0 && <ChevronRight className="size-3.5 text-primary/50" aria-hidden="true" />}
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-foreground">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </Stage>
                  <Connector />
                  <Stage index={2} icon={FileCheck} label="Proof">
                    <ul className="grid gap-1.5 sm:grid-cols-2">
                      {board.proof.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                          <Check className="size-4 shrink-0 text-brand-green" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Stage>
                  <Connector />
                  <Stage index={3} icon={Presentation} label="Portfolio" highlight>
                    <p className="text-lg font-semibold tracking-tight text-foreground">{board.portfolio}</p>
                  </Stage>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Four proof principles: an open row, not a card grid */}
        <ul className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {PROOF_PRINCIPLES.map((p) => {
            const Icon = ICONS[p.icon];
            const examples = examplesFor(p, area);
            return (
              <li key={p.slug} className="group min-w-0 border-t-2 border-primary/15 pt-5 transition-colors duration-300 hover:border-primary">
                <span className="flex size-10 items-center justify-center rounded-full bg-accent text-primary">
                  <Icon className="size-5 transition-transform duration-300 motion-safe:group-hover:scale-110" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">{p.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{p.description}</p>
                <ul aria-label={`${p.title} examples`} className="mt-3 flex flex-wrap gap-1.5">
                  {examples.map((e) => (
                    <li key={e} className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground [overflow-wrap:anywhere]">
                      {e}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
