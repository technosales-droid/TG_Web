import { ImageOff } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

// A full repository audit (public/, content/) found no real facility photography or video —
// only the site logo and a generic stock-style hero graphic already used on the homepage, neither
// of which depicts an actual Techno Gurukul room. So this stays an honest placeholder gallery
// rather than reusing unrelated imagery or inventing photos. No facility categories are named below
// because none are verified; they will be introduced once real, captioned photography exists.
const TILES = [
  { size: "sm:row-span-2", label: "Photos Coming Soon" },
  { size: "", label: "Photos Coming Soon" },
  { size: "", label: "Photos Coming Soon" },
];

/** Section: Facilities (#facilities). Honest empty-state gallery — no stock or fabricated photos. */
export function FacilitiesGallery() {
  return (
    <section id="facilities" aria-labelledby="fc-gallery-heading" className="scroll-mt-24 px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <SectionHeader
          id="fc-gallery-heading"
          eyebrow="Facilities"
          title={
            <>
              Explore the <span className={GRADIENT_TEXT}>Learning Environment.</span>
            </>
          }
        >
          Photography of the learning space will be published here as verified images become available.
        </SectionHeader>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:grid-rows-2 xl:grid-cols-3">
          {TILES.map((t, i) => (
            <li
              key={i}
              className={
                "flex min-h-40 flex-col items-center justify-center gap-3 rounded-[2rem] border border-dashed border-primary/25 bg-muted/40 px-6 py-10 text-center sm:min-h-0 " +
                t.size
              }
            >
              <span aria-hidden="true" className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ImageOff className="size-6" />
              </span>
              <p className="text-base font-semibold tracking-tight text-foreground">{t.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
