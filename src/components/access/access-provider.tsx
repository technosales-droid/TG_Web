"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { useModal } from "@/components/learning/projects/use-modal";
import type { AccessSource } from "@/lib/access";
import { AccessGate, type GrantedSession } from "./access-gate";

type Session = { status: "unknown" } | { status: "anon" } | ({ status: "granted" } & GrantedSession);

interface AccessContextValue {
  session: Session;
  /** Reads the current session from the server once. Safe to call from any component that shows who is signed in. */
  load: () => void;
  /**
   * Resolves true once the visitor has an access session: straight away if they already do, otherwise after they
   * complete the gate. Resolves false if they close it.
   */
  requireAccess: (source: AccessSource) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AccessContext = createContext<AccessContextValue | null>(null);

export function useAccess(opts?: { load?: boolean }) {
  const ctx = useContext(AccessContext);
  if (!ctx) throw new Error("useAccess must be used inside <AccessProvider>");
  const { load } = ctx;
  const wantsLoad = opts?.load;
  useEffect(() => {
    if (wantsLoad) load();
  }, [wantsLoad, load]);
  return ctx;
}

const post = (url: string, body: unknown) =>
  fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).catch(() => null);

/**
 * Holds the visitor's access state and the single AccessGate dialog. The session lives in an HttpOnly cookie set by the
 * server; this component only knows the first name and age group the server tells it. Nothing personal is kept in the
 * browser's storage. The server is asked for the session only when a page needs it, not on every page load.
 */
export function AccessProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>({ status: "unknown" });
  const [gate, setGate] = useState<AccessSource | null>(null);
  const loading = useRef<Promise<Session> | null>(null);
  const resolver = useRef<((ok: boolean) => void) | null>(null);
  const modalRef = useModal(gate !== null);

  const fetchSession = useCallback((): Promise<Session> => {
    if (!loading.current) {
      loading.current = fetch("/api/access", { cache: "no-store" })
        .then((r) => r.json())
        .then((d): Session => (d.authenticated ? { status: "granted", displayName: d.displayName, ageGroup: d.ageGroup } : { status: "anon" }))
        .catch((): Session => ({ status: "anon" }))
        .then((s) => {
          setSession(s);
          return s;
        });
    }
    return loading.current;
  }, []);

  const load = useCallback(() => void fetchSession(), [fetchSession]);

  const finish = useCallback((ok: boolean) => {
    setGate(null);
    resolver.current?.(ok);
    resolver.current = null;
  }, []);

  const requireAccess = useCallback(
    async (source: AccessSource) => {
      const s = session.status === "unknown" ? await fetchSession() : session;
      if (s.status === "granted") {
        void post("/api/access/activity", { source });
        return true;
      }
      return new Promise<boolean>((resolve) => {
        resolver.current?.(false);
        resolver.current = resolve;
        setGate(source);
      });
    },
    [session, fetchSession],
  );

  const signOut = useCallback(async () => {
    await fetch("/api/access", { method: "DELETE" }).catch(() => null);
    loading.current = null;
    setSession({ status: "anon" });
  }, []);

  const value = useMemo(() => ({ session, load, requireAccess, signOut }), [session, load, requireAccess, signOut]);

  return (
    <AccessContext.Provider value={value}>
      {children}
      {gate && (
        <dialog
          ref={modalRef}
          // Escape or the close button: closing is always possible.
          onClose={() => finish(false)}
          aria-labelledby="access-gate-title"
          className="access-dialog m-auto max-h-[92dvh] w-[calc(100%-1.5rem)] max-w-md overflow-y-auto overscroll-contain rounded-3xl border border-primary/10 bg-card p-5 text-foreground shadow-[0_24px_60px_-20px_rgba(16,20,28,0.5)] backdrop:bg-black/60 sm:p-7"
        >
          <button
            type="button"
            onClick={() => finish(false)}
            aria-label="Close"
            className="absolute top-3 right-3 z-10 inline-flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
          <div className="pr-8">
            <AccessGate
              source={gate}
              onGranted={(g) => {
                setSession({ status: "granted", ...g });
                loading.current = Promise.resolve({ status: "granted", ...g });
                finish(true);
              }}
              onCancel={() => finish(false)}
            />
          </div>
        </dialog>
      )}
    </AccessContext.Provider>
  );
}
