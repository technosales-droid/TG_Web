import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, GRADIENT, H2, INNER, LEAD, SECTION } from "./overview-ui";

// Temporary photos from /public/brand: swap for dedicated editorial photography per stage.
const STAGES = [
  { title: "Learn", tag: "Build the fundamentals.", text: "Start with the concepts, tools and ways of thinking that create a strong foundation for learning.", image: "/brand/learn.jpg" },
  { title: "Practice", tag: "Learn by doing.", text: "Turn understanding into action through exercises, experimentation, guided practice and hands-on work.", image: "/brand/practise.jpg" },
  { title: "Build", tag: "Create practical work.", text: "Bring different skills together to solve problems, explore ideas and create meaningful projects.", image: "/brand/build.jpg" },
  { title: "Show", tag: "Build evidence of your skills.", text: "Review, refine and present your work so your progress becomes something you can demonstrate.", image: "/brand/show.jpg" },
];

// Tiles in reading order: image, text, image, text / text, image, text, image on wide screens (2 columns
// on tablet). Below `sm` every image sits directly above its own text, via `order`.
const TILES = [
  { stage: 0, kind: "image", order: "order-1" },
  { stage: 0, kind: "text", order: "order-2" },
  { stage: 1, kind: "image", order: "order-3" },
  { stage: 1, kind: "text", order: "order-4" },
  { stage: 2, kind: "text", order: "order-6" },
  { stage: 2, kind: "image", order: "order-5" },
  { stage: 3, kind: "text", order: "order-8" },
  { stage: 3, kind: "image", order: "order-7" },
] as const;

const TILE = "h-full min-h-72 rounded-3xl sm:min-h-80 xl:min-h-[26rem]";

export function LearningProcess() {
  return (
    <section id="learning-process" aria-labelledby="learning-process-heading" className={cn(SECTION, "scroll-mt-16 border-t border-primary/10")}>
      <div className={INNER}>
        <Reveal className="mx-auto max-w-5xl text-center">
          <Eyebrow className="justify-center">The learning process</Eyebrow>
          <h2 id="learning-process-heading" className={cn(H2, "mt-5")}>
            Learn. Practice. Build. <span className={GRADIENT}>Show.</span>
          </h2>
          <p className={cn(LEAD, "mx-auto mt-5 max-w-4xl")}>
            Learning at Techno Gurukul is designed as a continuous process. Students build their understanding, apply what
            they learn, create practical work and gradually develop the confidence to demonstrate their skills.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 xl:mt-14 xl:grid-cols-4">
          {TILES.map((t, i) => {
            const s = STAGES[t.stage];
            return (
              <Reveal key={`${s.title}-${t.kind}`} delay={(i % 4) * 80} className={cn("h-full min-w-0 sm:order-none", t.order)}>
                {t.kind === "image" ? (
                  <div aria-hidden="true" className={cn(TILE, "group relative overflow-hidden bg-muted")}>
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <article
                    className={cn(
                      TILE,
                      "group flex flex-col border border-primary/15 bg-card p-7 transition-colors duration-300 hover:bg-primary/5 motion-reduce:transition-none sm:p-8"
                    )}
                  >
                    <h3 className="text-sm font-semibold tracking-[0.25em] text-primary uppercase">{s.title}</h3>
                    <p className="mt-4 text-2xl leading-snug font-semibold tracking-tight text-foreground sm:text-3xl">{s.tag}</p>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">{s.text}</p>
                    <span aria-hidden="true" className="mt-auto flex items-center gap-2 pt-8 text-primary">
                      <span className="h-px w-8 bg-primary/50 transition-all duration-500 group-hover:w-14 group-hover:bg-primary motion-reduce:transition-none" />
                      <ArrowRight className="size-4 -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none" />
                    </span>
                  </article>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-14 border-t border-primary/15 pt-8 xl:mt-16">
          <p className="text-center text-base leading-relaxed text-foreground sm:text-lg xl:text-xl xl:whitespace-nowrap">
            Every stage builds on the previous one. The goal is not simply to complete lessons, but to develop the ability
            to understand, apply, create and improve.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
