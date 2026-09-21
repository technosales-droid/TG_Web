import { Check, ClipboardCheck, Hammer, LayoutGrid, NotebookPen, Paperclip, RefreshCw } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "cn";
import { SectionHeader } from "../curriculum/section-header";

// Conceptual categories of learning evidence, not a list of what Techno Gurukul officially issues.
// The status words are neutral interface labels, not certificate statuses.
const EVIDENCE: { title: string; note: string; state: string; Icon: LucideIcon }[] = [
  { title: "Completion Record", note: "A record of completed learning.", state: "Recorded", Icon: ClipboardCheck },
  { title: "Project Work", note: "Practical work created during learning.", state: "Built", Icon: Hammer },
  { title: "Project Documentation", note: "Notes, process and supporting material.", state: "Documented", Icon: NotebookPen },
  { title: "Portfolio Piece", note: "Selected work prepared for presentation.", state: "Prepared", Icon: LayoutGrid },
  { title: "Reflection / Review", note: "Evidence of how the work was improved.", state: "Documented", Icon: RefreshCw },
  { title: "Supporting Material", note: "Relevant documents or learning artefacts.", state: "Prepared", Icon: Paperclip },
];

// Forms evidence can take. Labels only: not a claim that every format is accepted in any submission system.
const FORMATS = ["Image", "Video", "PDF", "Document", "Presentation", "Project", "Portfolio"];

// Abstract project preview: a report sheet, an image, a presentation slide and a portfolio tile.
// Nothing here is a real document, and there is no name, logo, date, number, signature, QR code or seal.
function EvidencePreview() {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-[#0b3d50] p-4 sm:p-6">
      <div aria-hidden="true" className="flex items-center gap-2">
        <span className="size-2.5 rounded-full bg-white/30" />
        <span className="size-2.5 rounded-full bg-brand-green/60" />
        <span className="ml-2 h-2.5 w-24 rounded-full bg-white/15" />
      </div>

      <div aria-hidden="true" className="relative mt-5 grid flex-1 grid-cols-5 grid-rows-[auto_auto] gap-3">
        {/* report sheet */}
        <div className="col-span-3 row-span-2 rounded-xl bg-card p-4 shadow-lg">
          <span className="block h-2.5 w-2/5 rounded-full bg-primary/40" />
          <span className="mt-3 block h-2 w-full rounded-full bg-primary/15" />
          <span className="mt-2 block h-2 w-5/6 rounded-full bg-primary/15" />
          <span className="mt-2 block h-2 w-full rounded-full bg-primary/15" />
          <span className="mt-2 block h-2 w-2/3 rounded-full bg-primary/10" />
          <span className="mt-4 block h-16 rounded-lg bg-gradient-to-br from-primary/25 to-brand-green/30 sm:h-24" />
          <span className="mt-4 flex items-center gap-2">
            <span className="flex size-5 items-center justify-center rounded-md bg-brand-green text-white">
              <Check className="size-3.5" />
            </span>
            <span className="h-2 w-1/2 rounded-full bg-primary/20" />
          </span>
        </div>
        {/* image thumbnail */}
        <div className="col-span-2 aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-primary/60 to-brand-green/50">
          <span className="mt-3 ml-3 block size-5 rounded-full bg-white/50" />
        </div>
        {/* presentation slide */}
        <div className="col-span-2 rounded-xl border border-white/15 bg-white/10 p-3">
          <span className="block h-2 w-1/2 rounded-full bg-white/50" />
          <span className="mt-2 block h-8 rounded-md bg-white/15" />
          <span className="mt-2 block h-1.5 w-3/4 rounded-full bg-white/25" />
        </div>
        {/* portfolio tiles */}
        <div className="col-span-5 grid grid-cols-3 gap-3">
          <span className="h-12 rounded-lg bg-white/15" />
          <span className="h-12 rounded-lg bg-brand-green/40" />
          <span className="h-12 rounded-lg bg-white/10" />
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold tracking-widest text-white/80 uppercase">Possible evidence formats</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {FORMATS.map((f) => (
            <li key={f} className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white">
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function CertificationsEvidence() {
  return (
    <section aria-labelledby="learning-evidence-heading" className="px-4 pt-4 pb-10 sm:px-6 sm:pb-14 xl:pb-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <SectionHeader id="learning-evidence-heading" eyebrow="Learning Evidence" title="Learning Leaves Something You Can Show.">
          Learning becomes easier to communicate when completed work, practical exercises and project outcomes are
          organised clearly.
        </SectionHeader>

        {/* Workspace */}
        <div className="mt-10 grid gap-3 rounded-[2rem] border border-primary/10 bg-muted/50 p-3 sm:p-5 xl:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] xl:gap-5">
          <div className="rounded-2xl bg-card p-4 sm:p-6">
            <p className="text-sm font-semibold tracking-widest text-primary uppercase">Learning Evidence</p>
            <p className="mt-1 text-sm text-muted-foreground">Examples of the kinds of evidence learning can leave behind.</p>
            <ol aria-label="Learning evidence" className="mt-3 divide-y divide-primary/10">
              {EVIDENCE.map(({ title, note, state, Icon }, i) => (
                <li
                  key={title}
                  className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 py-4 sm:grid-cols-[auto_1fr_auto] sm:gap-x-4"
                >
                  <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary sm:size-11">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-foreground">
                      <span className="mr-2 text-sm font-medium text-muted-foreground">0{i + 1}</span>
                      {title}
                    </p>
                    <p className="mt-0.5 text-sm leading-snug text-muted-foreground">{note}</p>
                  </div>
                  <span
                    className={cn(
                      "col-start-2 inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold text-foreground sm:col-start-auto",
                      state === "Prepared" ? "border-primary/25 bg-primary/5" : "border-brand-green/30 bg-brand-green/10"
                    )}
                  >
                    <Check className="size-3.5 text-brand-green" aria-hidden="true" />
                    {state}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <EvidencePreview />
        </div>

        {/* Documentation and portfolio */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-12 lg:mt-16">
          <div className="border-t-2 border-primary/30 pt-5">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">Documentation</h3>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Keep the learning process, practical work and completed projects organised so the work can be revisited and
              presented clearly.
            </p>
          </div>
          <div className="border-t-2 border-brand-green pt-5">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">Portfolio</h3>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Selected work can then be refined into a clearer collection of projects and evidence.
            </p>
          </div>
        </div>

        <p className="mt-12 text-2xl leading-snug font-semibold tracking-tight text-foreground sm:text-3xl">
          The certificate documents completion.
          <br className="hidden sm:block" /> The work documents application.
        </p>
      </div>
    </section>
  );
}
