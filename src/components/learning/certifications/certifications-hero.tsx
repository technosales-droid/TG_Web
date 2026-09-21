import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { GRADIENT_TEXT } from "../curriculum/section-header";

// Learning -> Completion -> Documentation -> Recognition. The visual marks the imaginary learner's position.
const STEPS = ["Learning", "Completion", "Documentation", "Recognition"];
const CURRENT = 2; // "Documentation"

// Abstract documentation workspace. It is deliberately not a certificate: no name, logo, seal, signature,
// serial number, grade, date or issuing body. Every shape is decorative; the step list is real text.
function DocumentWorkspaceVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="rounded-[2rem] border border-primary/10 bg-card p-4 shadow-[0_28px_56px_-32px_rgba(16,20,28,0.35)] sm:p-6">
        <div aria-hidden="true" className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-primary/25" />
          <span className="size-2.5 rounded-full bg-brand-green/40" />
          <span className="ml-2 h-2.5 w-28 rounded-full bg-primary/15" />
        </div>

        {/* Progression */}
        <ol aria-label="From learning to recognition" className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {STEPS.map((step, i) => {
            const done = i < CURRENT;
            const active = i === CURRENT;
            return (
              <li
                key={step}
                aria-current={active ? "step" : undefined}
                className={cn(
                  "flex items-center justify-center gap-1 rounded-full border px-2 py-1.5 text-xs font-semibold sm:text-[13px]",
                  active
                    ? "border-transparent bg-gradient-to-r from-primary to-brand-green text-white"
                    : done
                      ? "border-brand-green/30 bg-brand-green/10 text-foreground"
                      : "border-dashed border-primary/25 text-muted-foreground"
                )}
              >
                {done && <Check className="size-3 text-brand-green" aria-hidden="true" />}
                {step}
              </li>
            );
          })}
        </ol>

        {/* A stack of documents: the layered sheets sit behind the front one */}
        <div aria-hidden="true" className="relative mt-6 px-2 pb-2 sm:px-4">
          <span className="absolute inset-x-6 top-0 bottom-4 -rotate-2 rounded-2xl border border-primary/10 bg-muted sm:inset-x-8" />
          <span className="absolute inset-x-5 top-1 bottom-3 rotate-1 rounded-2xl border border-primary/10 bg-brand-green/10 sm:inset-x-7" />
          <div className="relative rounded-2xl border border-primary/15 bg-background p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="grid flex-1 gap-2">
                <span className="block h-3 w-2/5 rounded-full bg-primary/35" />
                <span className="block h-2 w-3/5 rounded-full bg-primary/15" />
              </div>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
                <Check className="size-5" />
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {["bg-primary/15", "bg-brand-green/20", "bg-primary/10"].map((tone, i) => (
                <span key={i} className={cn("grid gap-1.5 rounded-xl p-2.5", tone)}>
                  <span className="block h-1.5 w-1/2 rounded-full bg-foreground/20" />
                  <span className="block h-2 w-4/5 rounded-full bg-foreground/10" />
                </span>
              ))}
            </div>

            <div className="mt-4 grid gap-2.5">
              {[true, true, true, false].map((checked, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-md border",
                      checked ? "border-brand-green bg-brand-green text-white" : "border-primary/25"
                    )}
                  >
                    {checked && <Check className="size-3.5" />}
                  </span>
                  <span className={cn("h-2 rounded-full", checked ? "w-4/5 bg-primary/20" : "w-3/5 bg-primary/10")} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The work the documentation points back to (abstract portfolio strip) */}
        <div aria-hidden="true" className="mt-3 flex items-center gap-3 rounded-2xl border border-dashed border-brand-green/40 bg-brand-green/5 p-3">
          <span className="flex -space-x-2">
            <span className="size-8 rounded-lg bg-primary/25 ring-2 ring-card" />
            <span className="size-8 rounded-lg bg-brand-green/35 ring-2 ring-card" />
            <span className="size-8 rounded-lg bg-primary/15 ring-2 ring-card" />
          </span>
          <span className="h-2 flex-1 rounded-full bg-brand-green/25" />
        </div>
      </div>
    </div>
  );
}

export function CertificationsHero() {
  return (
    <section className="px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-12">
      <div className="mx-auto max-w-[1800px]">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 xl:min-h-[600px] xl:px-16 xl:py-14">
          <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[48%] xl:block">
            <div className="absolute inset-0 bg-primary/8 [clip-path:polygon(14%_0%,100%_0%,100%_100%,0%_100%)]" />
            <div className="absolute inset-0 bg-brand-green/10 [clip-path:polygon(0%_100%,55%_100%,100%_55%,100%_100%)]" />
          </div>

          <div className="relative grid items-center gap-10 xl:min-h-[480px] xl:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] xl:gap-16">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Certifications
              </div>
              <h1 className="mt-4 max-w-3xl text-[2rem] leading-[1.12] font-semibold tracking-tight text-balance text-foreground min-[400px]:text-4xl sm:text-5xl xl:text-[3rem]">
                Learning You Can <span className={GRADIENT_TEXT}>Document.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                A certificate tells someone you completed a course. A portfolio shows them what you can do. At Techno
                Gurukul, completion and recognition sit alongside the learning and practical work they reflect.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href="/programs"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "h-11 rounded-full px-6 text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-primary"
                  )}
                >
                  Explore Programs
                </Link>
                <Link
                  href="/learning/curriculum"
                  className="group flex min-h-11 items-center gap-1 rounded-full text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  View Curriculum
                  <ChevronRight
                    className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            <DocumentWorkspaceVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
