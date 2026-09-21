import { BookOpen, Check, ClipboardCheck, FolderOpen, Hammer } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "cn";
import { GRADIENT_TEXT, SectionHeader } from "../curriculum/section-header";

// Conceptual interface labels only. They are not official certificate statuses or institutional procedures.
const RECORD: { label: string; note: string; state: string; Icon: LucideIcon }[] = [
  { label: "Learning", note: "The learning experience itself.", state: "Completed", Icon: BookOpen },
  {
    label: "Completion",
    note: "Completed learning can be documented where certification applies.",
    state: "Documented",
    Icon: ClipboardCheck,
  },
  { label: "Practical Work", note: "Projects and applied work reinforce the learning.", state: "Built", Icon: Hammer },
  { label: "Portfolio", note: "Finished work, organised and presented separately.", state: "Presented", Icon: FolderOpen },
];

// Abstract "learning record". Deliberately not a certificate: no name, number, date, grade, issuer,
// signature, seal, QR code, logo or accreditation badge.
function LearningRecordVisual() {
  return (
    <div className="rounded-[2rem] border border-primary/15 bg-[#0b3d50] p-3 shadow-[0_28px_56px_-32px_rgba(16,20,28,0.5)] sm:p-5">
      <div aria-hidden="true" className="flex items-center gap-2 px-1 pb-3">
        <span className="size-2.5 rounded-full bg-white/30" />
        <span className="size-2.5 rounded-full bg-brand-green/60" />
        <span className="ml-2 h-2.5 w-28 rounded-full bg-white/15" />
      </div>

      <div className="rounded-2xl bg-card p-4 sm:p-6">
        <p className="text-sm font-semibold tracking-widest text-primary uppercase">Learning Record</p>
        <span aria-hidden="true" className="mt-3 block h-px w-full bg-primary/10" />

        <ol aria-label="Learning record" className="mt-2 divide-y divide-primary/10">
          {RECORD.map(({ label, note, state, Icon }, i) => (
            <li
              key={label}
              className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 py-4 sm:grid-cols-[auto_1fr_auto] sm:gap-x-4"
            >
              <span
                aria-hidden="true"
                className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary sm:size-11"
              >
                <Icon className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-base font-semibold text-foreground">
                  <span className="mr-2 text-sm font-medium text-muted-foreground">0{i + 1}</span>
                  {label}
                </p>
                <p className="mt-0.5 text-sm leading-snug text-muted-foreground">{note}</p>
              </div>
              <span
                className={cn(
                  "col-start-2 inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold text-foreground sm:col-start-auto",
                  i === 3 ? "border-primary/25 bg-primary/5" : "border-brand-green/30 bg-brand-green/10"
                )}
              >
                <Check className="size-3.5 text-brand-green" aria-hidden="true" />
                {state}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Proof of Work: abstract document and project tiles */}
      <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs font-semibold tracking-widest text-white/80 uppercase">Proof of Work</p>
        <div aria-hidden="true" className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
          {[
            "bg-gradient-to-br from-primary/60 to-brand-green/50",
            "bg-white/15",
            "bg-gradient-to-br from-brand-green/50 to-primary/40",
            "bg-white/10",
          ].map((tone, i) => (
            <span key={i} className={cn("grid aspect-[4/3] content-end gap-1.5 rounded-lg p-2", tone)}>
              <span className="block h-1.5 w-3/5 rounded-full bg-white/50" />
              <span className="block h-1.5 w-2/5 rounded-full bg-white/30" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CertificationsRecord() {
  return (
    <section aria-labelledby="certification-role-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid items-center gap-10 xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] xl:gap-16 xl:px-8">
          <div>
            <SectionHeader
              id="certification-role-heading"
              eyebrow="Why It Matters"
              title={
                <>
                  <span className="block">A Certificate Records the Learning.</span>
                  <span className={cn("block", GRADIENT_TEXT)}>Your Work Shows What You Can Do.</span>
                </>
              }
            >
              Completing a course can be documented. Practical work shows how the learning was applied, and a portfolio
              keeps that work visible as evidence. Certification and project work serve different purposes, so one does
              not replace the other.
            </SectionHeader>
          </div>

          <div className="w-full max-w-3xl xl:max-w-none">
            <LearningRecordVisual />
            <p className="mt-6 border-l-2 border-brand-green pl-4 text-lg leading-snug font-medium tracking-tight text-foreground sm:text-xl">
              Completion documents the learning.
              <br className="hidden sm:block" /> Practical work helps show how that learning was applied.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
