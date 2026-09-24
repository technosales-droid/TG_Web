import { cn } from "cn";
import { Reveal } from "@/components/ui/reveal";
import { GRADIENT_TEXT } from "@/components/ui/section-header";
import { COLLAGE, COLLAGE_OVERLAYS } from "@/data/institute";
import { Media } from "./media";

/** The Techno Gurukul experience: an asymmetric, magazine-style collage of media placeholders. */
export function MediaCollage() {
  return (
    <section id="experience" aria-labelledby="fc-experience-heading" className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20 xl:py-24">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <Reveal className="max-w-3xl">
          <div className="flex items-center gap-2 text-sm font-medium tracking-[0.2em] text-primary uppercase">
            <span className="size-1.5 rounded-full bg-brand-sky" aria-hidden="true" />
            The Techno Gurukul experience
          </div>
          <h2 id="fc-experience-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-5xl">
            More Than <span className={GRADIENT_TEXT}>a Classroom.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Learning becomes more meaningful when students have the space to explore, practise, collaborate and build.
            Techno Gurukul brings together the environment, guidance and hands-on experiences that help learners turn
            knowledge into real skills.
          </p>
        </Reveal>

        <Reveal className="mt-12 lg:mt-16">
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:relative lg:h-[186rem] lg:grid-cols-12 lg:grid-rows-30 lg:gap-4">
            {COLLAGE.map((c) => (
              <li key={c.media.label} className={cn("relative aspect-square overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] lg:aspect-auto", c.wide && "col-span-2 aspect-video lg:col-auto", c.place)}>
                <Media item={c.media} sizes="(min-width: 1024px) 50vw, 50vw" compact={!c.wide} />
              </li>
            ))}
            {/* Small tiles that overlap the ones around them */}
            {COLLAGE_OVERLAYS.map((o) => (
              <li key={o.media.label} className={cn("relative z-10 hidden overflow-hidden rounded-[1.5rem] shadow-[0_18px_40px_-16px_rgba(6,44,61,0.55)] ring-[6px] ring-background lg:block", o.place)}>
                <Media item={o.media} compact sizes="20vw" />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
