import Image from "next/image";
import { BarChart3, Book, Settings2, Shapes } from "lucide-react";

const STAGES = [
  {
    label: "Learn",
    icon: Book,
    image: "/brand/learn.jpg",
    alt: "Reaching for a book on a shelf",
    description: "Understand the concepts, tools and workflows behind your discipline.",
  },
  {
    label: "Practise",
    icon: Settings2,
    image: "/brand/practise.jpg",
    alt: "A laptop and tablet set up for focused work",
    description: "Apply what you learn through hands-on exercises that grow more complex.",
  },
  {
    label: "Build",
    icon: Shapes,
    image: "/brand/build.jpg",
    alt: "A laptop showing a 3D structural model beside hand-drawn sketches",
    description: "Create real projects that bring your skills together.",
  },
  {
    label: "Show",
    icon: BarChart3,
    image: "/brand/show.jpg",
    alt: "A graduate in cap and gown walking toward a city skyline",
    description: "Present your work, get feedback and prepare for what's next.",
  },
] as const;

// ponytail: no scroll-triggered reveal here (this section previously faded and slid each card in on
// scroll). It renders in place; a card still lifts on hover, a plain CSS affordance, not an animation
// that plays on its own.
export function LearningApproach() {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-[1800px]">
        <div className="rounded-[2.5rem] border border-primary/10 bg-muted/50 p-5 sm:p-7 lg:p-8">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-sky" aria-hidden="true" />
            How We Learn
          </div>

          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl lg:text-4xl">
              Learning Should Lead to Something You Can Build.
            </h2>

            <p className="max-w-md text-base leading-relaxed text-muted-foreground lg:max-w-xl lg:pt-1 lg:text-right">
              Students build their understanding step by step, apply their skills through practical work, and bring
              what they learn together in projects they can actually show.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4">
            {STAGES.map((stage) => (
              <StageCard key={stage.label} stage={stage} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StageCard({ stage }: { stage: (typeof STAGES)[number] }) {
  const Icon = stage.icon;

  return (
    <div className="group flex flex-col overflow-hidden rounded-[1.5rem] bg-card transition-shadow duration-300 hover:shadow-[0_16px_32px_-16px_rgba(16,20,28,0.35)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-primary/10 bg-muted">
        <Image
          src={stage.image}
          alt={stage.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="relative -mt-5 flex items-end px-5">
        <span className="flex size-10 items-center justify-center rounded-full bg-card text-primary shadow-[0_8px_20px_-8px_rgba(16,20,28,0.35)] ring-4 ring-card">
          <Icon className="size-4" aria-hidden="true" />
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 pt-3 pb-5">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">{stage.label}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{stage.description}</p>
      </div>
    </div>
  );
}
