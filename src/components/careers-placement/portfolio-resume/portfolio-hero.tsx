import Link from "next/link";
import { ArrowLeft, Check, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { GRADIENT_TEXT } from "@/components/ui/section-header";

const RESUME = ["Skills", "Projects", "Education", "Experience"];
const PORTFOLIO = ["Project", "Process", "Documentation", "Outcome", "Reflection"];
const FLOW = ["Resume", "Portfolio", "Conversation"];

// Abstract two-layer workspace. Illustrative only: no real person, resume, profile, company or offer.
function PortfolioWorkspace() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="rounded-[2rem] border border-primary/10 bg-card p-4 shadow-[0_28px_56px_-32px_rgba(16,20,28,0.35)] sm:p-6">
        <div aria-hidden="true" className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-primary/25" />
          <span className="size-2.5 rounded-full bg-brand-green/40" />
          <span className="ml-2 h-2.5 w-28 rounded-full bg-primary/15" />
        </div>

        <ol aria-label="Resume, portfolio, conversation" className="mt-5 grid grid-cols-3 gap-2">
          {FLOW.map((step, i) => (
            <li
              key={step}
              aria-current={i === 1 ? "step" : undefined}
              className={cn(
                "flex items-center justify-center gap-1 rounded-full border px-2 py-1.5 text-xs font-semibold sm:text-[13px]",
                i === 1 ? "border-transparent bg-gradient-to-r from-primary to-brand-green text-white" : i === 0 ? "border-brand-green/30 bg-brand-green/10 text-foreground" : "border-dashed border-primary/25 text-muted-foreground"
              )}
            >
              {i === 0 && <Check className="size-3 text-brand-green" aria-hidden="true" />}
              {step}
            </li>
          ))}
        </ol>

        <div className="mt-4 grid gap-3 sm:grid-cols-5">
          {/* Resume layer */}
          <div className="rounded-2xl border border-primary/15 bg-background p-4 sm:col-span-2">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase">Resume</p>
            <ul aria-label="A resume can include" className="mt-3 grid gap-2">
              {RESUME.map((r) => (
                <li key={r} className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <span aria-hidden="true" className="block size-1.5 shrink-0 rounded-full bg-brand-green" />
                  {r}
                </li>
              ))}
            </ul>
            <div aria-hidden="true" className="mt-4 grid gap-1.5">
              <span className="block h-1.5 w-full rounded-full bg-primary/15" />
              <span className="block h-1.5 w-4/5 rounded-full bg-primary/10" />
            </div>
          </div>

          {/* Portfolio layer */}
          <div className="rounded-2xl border border-primary/15 bg-muted/60 p-4 sm:col-span-3">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase">Portfolio</p>
            <div aria-hidden="true" className="mt-3 h-14 rounded-lg bg-gradient-to-br from-primary/30 to-brand-green/40 sm:h-16" />
            <ul aria-label="A portfolio can include" className="mt-3 flex flex-wrap gap-1.5">
              {PORTFOLIO.map((p) => (
                <li key={p} className="rounded-md bg-card px-2 py-1 text-xs font-medium text-foreground">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortfolioHero() {
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
                Portfolio &amp; Resume
              </div>
              <h1 className="mt-4 max-w-3xl text-[2rem] leading-[1.12] font-semibold tracking-tight text-balance text-foreground min-[400px]:text-4xl sm:text-5xl xl:text-[2.75rem]">
                Show What You Know. <span className={GRADIENT_TEXT}>Prove What You Can Build.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                A strong resume communicates your background clearly. A strong portfolio gives your work context, evidence
                and depth.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href="/learning/projects"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "h-11 rounded-full px-6 text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-primary"
                  )}
                >
                  Explore Project Work
                </Link>
                <Link
                  href="/learning"
                  className="group flex min-h-11 items-center gap-1 rounded-full text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  Explore Learning
                  <ChevronRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
              <Link
                href="/careers-placement"
                className="group mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-full text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <ArrowLeft className="size-4 transition-transform duration-200 motion-safe:group-hover:-translate-x-1" aria-hidden="true" />
                Back to Careers &amp; Placement
              </Link>
            </div>

            <PortfolioWorkspace />
          </div>
        </div>
      </div>
    </section>
  );
}
