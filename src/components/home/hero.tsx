import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const NODES = [
  [40, 30],
  [140, 10],
  [220, 60],
  [90, 110],
  [190, 150],
  [30, 170],
] as const;

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [1, 3],
  [3, 4],
  [2, 4],
  [3, 5],
];

function NetworkMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 260 200"
      className="h-full w-full text-primary"
    >
      {EDGES.map(([a, b], index) => (
        <line
          key={index}
          x1={NODES[a][0]}
          y1={NODES[a][1]}
          x2={NODES[b][0]}
          y2={NODES[b][1]}
          stroke="currentColor"
          strokeOpacity={0.25}
          strokeWidth={1}
        />
      ))}
      {NODES.map(([x, y], index) => (
        <circle
          key={index}
          cx={x}
          cy={y}
          r={index % 2 === 0 ? 6 : 4}
          className={index % 3 === 0 ? "fill-brand-green" : "fill-primary"}
          fillOpacity={0.85}
        />
      ))}
    </svg>
  );
}

export function Hero() {
  return (
    <section className="px-3 pt-14 pb-16 sm:px-4 sm:pt-20 sm:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            Game Development & Design
          </div>

          <h1 className="mt-4 max-w-xl font-heading text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
            Build games. Not just play them.
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            TG GameForge is a complete game-development pipeline — design,
            programming, 2D &amp; 3D art, animation, VFX, and the engines that
            bring it together, taught through real projects.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/programs"
              className={cn(buttonVariants({ variant: "default" }), "h-11 rounded-full px-6 text-base")}
            >
              Explore Programs
            </Link>
            <Link
              href="/career-paths"
              className="text-base font-medium text-foreground underline-offset-4 hover:underline"
            >
              See Career Paths
            </Link>
          </div>
        </div>

        <div className="hidden aspect-[13/10] w-full max-w-md justify-self-center lg:block">
          <NetworkMark />
        </div>
      </div>
    </section>
  );
}
