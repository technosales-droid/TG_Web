"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { ArrowUpRight, Lock, X } from "lucide-react";
import { useAccess } from "@/components/access/access-provider";
import { useModal } from "@/components/learning/projects/use-modal";
import { sourceTypeForCreator, type SourceType } from "@/lib/access";
import type { Project } from "@/data/projects";
import type { Resource } from "@/data/resources";
import { cn } from "cn";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

interface Payload {
  kind: "projects" | "resources";
  title: string;
  content: Record<string, unknown>;
}

type ViewerState = { status: "loading" | "error" | "ready"; payload?: Payload; error?: string };

/**
 * Opens the gated part of a project or resource. The visitor goes through the AccessGate if they have no session, then
 * the content is fetched from the server, which checks the session again. Nothing here is available without that.
 */
function useGatedViewer() {
  const { requireAccess } = useAccess();
  const [state, setState] = useState<ViewerState | null>(null);

  const open = async (kind: Payload["kind"], slug: string, title: string, sourceType: SourceType) => {
    if (!(await requireAccess({ sourceType, sourceId: slug }))) return;
    setState({ status: "loading" });
    try {
      const res = await fetch(`/api/content/${kind}/${encodeURIComponent(slug)}`, { cache: "no-store" });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) setState({ status: "ready", payload: { kind, title, content: data.content } });
      else setState({ status: "error", error: res.status === 401 ? "Your access has expired. Please try again." : "This content is not available right now." });
    } catch {
      setState({ status: "error", error: "We could not reach the server. Please try again." });
    }
  };

  return { open, viewer: state && <Viewer state={state} onClose={() => setState(null)} /> };
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6">
      <h3 className="text-sm font-semibold tracking-widest text-primary uppercase">{title}</h3>
      <div className="mt-2 space-y-2 text-base leading-relaxed text-foreground/90">{children}</div>
    </section>
  );
}

const linkCls = "inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-2 hover:text-primary/80";

function Viewer({ state, onClose }: { state: ViewerState; onClose: () => void }) {
  const ref = useModal(true);
  const p = state.payload;
  const c = (p?.content ?? {}) as {
    longDescription?: string;
    problem?: string;
    solution?: string;
    outcomes?: string[];
    images?: { url: string; alt: string }[];
    videos?: { url: string; label: string }[];
    links?: { label: string; url: string }[];
    relatedProgram?: { label: string; href: string };
    url?: string;
    kind?: "file" | "external";
  };
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-label={p?.title ?? "Content"}
      className="access-dialog m-auto max-h-[92dvh] w-[calc(100%-1.5rem)] max-w-3xl overflow-y-auto overscroll-contain rounded-3xl border border-primary/10 bg-card p-5 text-foreground shadow-[0_24px_60px_-20px_rgba(16,20,28,0.5)] backdrop:bg-black/60 sm:p-8"
    >
      <button type="button" onClick={onClose} aria-label="Close" className={cn("absolute top-3 right-3 inline-flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted", FOCUS)}>
        <X className="size-5" aria-hidden="true" />
      </button>
      {state.status === "loading" && <p role="status" className="py-10 text-center text-muted-foreground">Loading</p>}
      {state.status === "error" && <p role="alert" className="py-10 pr-8 text-foreground">{state.error}</p>}
      {state.status === "ready" && p && (
        <div className="pr-8">
          <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{p.title}</h2>
          {c.longDescription && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{c.longDescription}</p>}
          {c.problem && <Section title="The problem"><p>{c.problem}</p></Section>}
          {c.solution && <Section title="The solution"><p>{c.solution}</p></Section>}
          {c.outcomes && c.outcomes.length > 0 && (
            <Section title="Outcomes">
              <ul className="list-disc space-y-1 pl-5">{c.outcomes.map((o) => <li key={o}>{o}</li>)}</ul>
            </Section>
          )}
          {c.images && c.images.length > 0 && (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {c.images.map((i) => (
                <div key={i.url} className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
                  <Image src={i.url} alt={i.alt} fill sizes="(min-width: 640px) 380px, 100vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}
          {c.videos && c.videos.length > 0 && (
            <Section title="Videos">
              <ul className="space-y-1">{c.videos.map((v) => <li key={v.url}><a href={v.url} target="_blank" rel="noopener noreferrer" className={linkCls}>{v.label}<ArrowUpRight className="size-4" aria-hidden="true" /></a></li>)}</ul>
            </Section>
          )}
          {c.links && c.links.length > 0 && (
            <Section title="Links">
              <ul className="space-y-1">{c.links.map((l) => <li key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer" className={linkCls}>{l.label}<ArrowUpRight className="size-4" aria-hidden="true" /></a></li>)}</ul>
            </Section>
          )}
          {c.url && (
            <a href={c.url} target="_blank" rel="noopener noreferrer" {...(c.kind === "file" ? { download: "" } : {})} className={cn("mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary/90", FOCUS)}>
              {c.kind === "file" ? "Download" : "Open resource"}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          )}
          {c.relatedProgram && (
            <p className="mt-6 text-sm text-muted-foreground">
              Related program: <a href={c.relatedProgram.href} className={linkCls}>{c.relatedProgram.label}</a>
            </p>
          )}
        </div>
      )}
    </dialog>
  );
}

const TONES = ["from-primary via-primary/70 to-brand-sky/50", "from-[#0b3d50] via-primary to-brand-sky/60", "from-[#0a4a66] via-[#0a6a8f] to-brand-sky/50"];

function CardShell({ thumb, alt, tone, chips, title, text, meta, action, onOpen }: {
  thumb?: string;
  alt: string;
  tone: number;
  chips: string[];
  title: string;
  text: string;
  meta: string;
  action: string;
  onOpen: () => void;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(16,20,28,0.35)]">
      <div className={cn("relative aspect-[16/10] overflow-hidden", !thumb && `bg-gradient-to-br ${TONES[tone % TONES.length]}`)}>
        {thumb && <Image src={thumb} alt={alt} fill sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 92vw" className="object-cover" />}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase">{chips.join(" / ")}</p>
        <h3 className="mt-2 text-lg leading-snug font-semibold tracking-tight text-foreground">{title}</h3>
        <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-muted-foreground">{text}</p>
        <p className="mt-3 text-sm text-muted-foreground">{meta}</p>
        <button type="button" onClick={onOpen} className={cn("mt-auto flex h-11 items-center justify-center gap-2 rounded-full border border-primary/30 px-5 text-[15px] font-semibold text-foreground transition-colors after:absolute after:inset-0 hover:bg-primary/10", FOCUS)}>
          <Lock className="size-4 text-primary" aria-hidden="true" />
          {action}
        </button>
      </div>
    </article>
  );
}

const AccessNote = ({ what }: { what: string }) => (
  <p className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
    <Lock className="size-4 shrink-0 text-primary" aria-hidden="true" />
    {what} opens with a free access profile: your name, email and phone number.
  </p>
);

export function ProjectCards({ projects }: { projects: Project[] }) {
  const { open, viewer } = useGatedViewer();
  return (
    <>
      <AccessNote what="The full project" />
      <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <CardShell
              thumb={p.media.find((m) => m.thumbnail)?.thumbnail}
              alt=""
              tone={i}
              chips={[p.projectType, p.program]}
              title={p.title}
              text={p.shortDescription}
              meta={p.creatorName ?? (p.creatorType === "student" ? "Student work" : p.creatorType === "faculty" ? "Faculty work" : "Techno Gurukul")}
              action="View project"
              onOpen={() => open("projects", p.slug, p.title, sourceTypeForCreator(p.creatorType))}
            />
          </li>
        ))}
      </ul>
      {viewer}
    </>
  );
}

export function ResourceCards({ resources }: { resources: Resource[] }) {
  const { open, viewer } = useGatedViewer();
  return (
    <>
      <AccessNote what="The full resource" />
      <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {resources.map((r, i) => (
          <li key={r.slug}>
            <CardShell
              thumb={r.thumbnail}
              alt=""
              tone={i}
              chips={[r.resourceType, r.program ?? "General"]}
              title={r.title}
              text={r.shortDescription}
              meta={`${r.format}${r.difficulty ? ` · ${r.difficulty[0].toUpperCase()}${r.difficulty.slice(1)}` : ""}`}
              action="Get access"
              onOpen={() => open("resources", r.slug, r.title, "resource")}
            />
          </li>
        ))}
      </ul>
      {viewer}
    </>
  );
}
