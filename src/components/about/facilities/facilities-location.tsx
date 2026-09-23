import { ArrowUpRight, MapPin } from "lucide-react";
import { footerLocation } from "../../layout/footer-data";
import { GRADIENT_TEXT, SectionHeader } from "@/components/ui/section-header";

/** Section: Location. The one place on this page with fully verified, specific detail — the
 * same address and map already used in the global footer. */
export function FacilitiesLocation() {
  const { name, type, locality, shortAddress, address, mapUrl, mapEmbedUrl } = footerLocation;

  return (
    <section aria-labelledby="fc-location-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <SectionHeader
          id="fc-location-heading"
          eyebrow="Location"
          title={
            <>
              Visit the <span className={GRADIENT_TEXT}>Learning Institute.</span>
            </>
          }
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8">
          <div className="flex flex-col justify-center rounded-[2rem] border border-primary/15 bg-card p-6 sm:p-8">
            <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MapPin className="size-5" />
            </span>
            <p className="mt-4 text-xl font-semibold tracking-tight text-foreground">{name}</p>
            <p className="text-base text-muted-foreground">{type}</p>
            <p className="mt-3 text-base leading-relaxed text-foreground">{address ?? shortAddress ?? locality}</p>
            {mapUrl && (
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex min-h-11 items-center gap-1.5 self-start rounded-lg text-base font-semibold text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                View on Google Maps
                <ArrowUpRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            )}
          </div>

          {mapUrl && mapEmbedUrl && (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-primary/15 sm:aspect-[2/1] xl:aspect-auto">
              <iframe
                src={mapEmbedUrl}
                title={`Map showing ${name} ${type}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
