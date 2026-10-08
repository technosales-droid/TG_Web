"use client";

import { useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Download, FileWarning, Loader2, X } from "lucide-react";
import { useAccess } from "@/components/access/access-provider";
import { useModal } from "@/components/learning/projects/use-modal";
import { FOCUS } from "@/components/access/form-ui";
import type { Interest } from "@/lib/access";
import { cn } from "cn";

export interface BrochureCourse {
  /** The course's own route slug (see src/lib/program-routes.ts); also the brochure's sourceId. */
  slug: string;
  /** Shown as "Download the {name} Brochure", and used as the pre-filled Course field. */
  name: Interest;
}

type State = { status: "loading" } | { status: "ready"; downloadName: string; blobUrl: string } | { status: "missing" } | { status: "error"; message: string };

/**
 * The gated brochure download: reuses the site's one access-gate/lead flow (AccessGate, via requireAccess), then the
 * same private-file pattern already used for gated resources (/api/content/brochures/[slug] and its /file route).
 * A visitor who already has an access session is not asked again; the brochure just downloads.
 */
export function useBrochureDownload() {
  const { requireAccess } = useAccess();
  const [state, setState] = useState<State | null>(null);
  const modalRef = useModal(state !== null);
  const revokeRef = useRef<string | null>(null);

  const close = () => {
    if (revokeRef.current) {
      URL.revokeObjectURL(revokeRef.current);
      revokeRef.current = null;
    }
    setState(null);
  };

  const open = async (course: BrochureCourse) => {
    const granted = await requireAccess(
      { sourceType: "brochure", sourceId: course.slug },
      { title: `Download the ${course.name} Brochure`, text: "Enter your details and the brochure is yours.", presetInterest: course.name }
    );
    if (!granted) return; // visitor closed the access form; nothing downloaded, nothing claimed

    setState({ status: "loading" });
    try {
      const meta = await fetch(`/api/content/brochures/${encodeURIComponent(course.slug)}`, { cache: "no-store" });
      const metaData = await meta.json().catch(() => ({}));
      if (!meta.ok || !metaData.ok || metaData.content?.kind !== "file") return setState({ status: "missing" });

      // Fetched (not just linked) so a missing file on the server is caught here, not left as a dead link the
      // visitor clicks into. The lead is already recorded by this point either way.
      const file = await fetch(metaData.content.url, { cache: "no-store" });
      if (!file.ok) {
        if (file.status === 404) return setState({ status: "missing" });
        return setState({ status: "error", message: "Something went wrong. Please try again." });
      }
      const blob = await file.blob();
      const blobUrl = URL.createObjectURL(blob);
      revokeRef.current = blobUrl;
      const disposition = file.headers.get("content-disposition") ?? "";
      const downloadName = /filename="([^"]+)"/.exec(disposition)?.[1] ?? `techno-gurukul-${course.slug}-brochure.pdf`;
      setState({ status: "ready", downloadName, blobUrl });
      // Start the download itself; the dialog also offers a manual link, in case the browser blocked this.
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = downloadName;
      a.click();
    } catch {
      setState({ status: "error", message: "We could not reach the server. Check your connection and try again." });
    }
  };

  const viewer = state && (
    <dialog
      ref={modalRef}
      onClose={close}
      aria-label="Brochure download"
      className="access-dialog m-auto w-[calc(100%-1.5rem)] max-w-sm overflow-y-auto overscroll-contain rounded-3xl border border-primary/10 bg-card p-6 text-foreground shadow-[0_24px_60px_-20px_rgba(16,20,28,0.5)] backdrop:bg-black/60"
    >
      <button type="button" onClick={close} aria-label="Close" className={cn("absolute top-3 right-3 inline-flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted", FOCUS)}>
        <X className="size-5" aria-hidden="true" />
      </button>
      <div className="flex flex-col items-center pt-6 text-center">
        {state.status === "loading" && (
          <>
            <Loader2 className="size-8 animate-spin text-primary" aria-hidden="true" />
            <p role="status" className="mt-4 text-base text-foreground">Getting your brochure ready&hellip;</p>
          </>
        )}
        {state.status === "ready" && (
          <>
            <CheckCircle2 className="size-8 text-primary" aria-hidden="true" />
            <p role="status" className="mt-4 text-base font-semibold text-foreground">Your brochure is ready.</p>
            <p className="mt-1.5 text-balance text-sm text-muted-foreground">The download should have started. If it didn&rsquo;t:</p>
            <a href={state.blobUrl} download={state.downloadName} className={cn("mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-[15px] font-semibold text-primary-foreground hover:bg-primary/90", FOCUS)}>
              <Download className="size-4" aria-hidden="true" />
              Download the brochure
            </a>
          </>
        )}
        {state.status === "missing" && (
          <>
            <FileWarning className="size-8 text-primary" aria-hidden="true" />
            <p role="alert" className="mt-4 text-base font-semibold text-foreground">The brochure isn&rsquo;t ready to download yet.</p>
            <p className="mt-1.5 text-balance text-sm text-muted-foreground">We have your details and will follow up. You can also reach us on the Contact page.</p>
          </>
        )}
        {state.status === "error" && (
          <>
            <AlertCircle className="size-8 text-destructive" aria-hidden="true" />
            <p role="alert" className="mt-4 text-balance text-base font-semibold text-foreground">{state.message}</p>
          </>
        )}
      </div>
    </dialog>
  );

  return { open, viewer };
}
