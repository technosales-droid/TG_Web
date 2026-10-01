"use client";

import { Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useBrochureDownload } from "@/components/promotions/brochure-download";
import { activeProgramInterest } from "@/data/active-programs";
import { cn } from "cn";

/**
 * "Download Brochure" on a course page's sticky card, gated the same way as the promotion popup's brochure button
 * (access form, then the private file). Renders nothing for a course that isn't one of the active programs with a
 * real brochure on file.
 */
export function BrochureButton({ slug }: { slug: string }) {
  const interest = activeProgramInterest(`/programs/${slug}`);
  const { open, viewer } = useBrochureDownload();
  if (!interest) return null;
  return (
    <>
      <button
        type="button"
        onClick={() => open({ slug, name: interest })}
        className={cn(buttonVariants({ variant: "outline" }), "h-12 w-full gap-2 rounded-none text-base font-semibold")}
      >
        <Download className="size-4" aria-hidden="true" />
        Download Brochure
      </button>
      {viewer}
    </>
  );
}
