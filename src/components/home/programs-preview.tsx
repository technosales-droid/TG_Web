"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";

const ACTIVE_PROGRAMS = [
  {
    status: "active" as const,
    category: "Digital & Marketing",
    title: "Digital Marketing",
    description:
      "Build practical skills across digital marketing, content, campaigns, audience understanding and measurable digital work.",
    outcome: "Learn. Execute. Measure. Grow.",
    href: "/programs/tg-digital-marketing",
    image: "/brand/programs-digital-marketing.jpg",
    alt: "A laptop showing a digital marketing strategy breakdown beside matching handwritten notes",
  },
  {
    status: "active" as const,
    category: "Creative Technology",
    title: "Game Development & Design",
    description:
      "Learn the foundations of game creation through design, development, interactive systems and hands-on project work.",
    outcome: "Design. Build. Play.",
    href: "/programs/tg-gameforge",
    image: "/brand/programs-game-development.jpg",
    alt: "A person editing a game scene across multiple monitors in a production studio",
  },
];

// Committed future directions, not yet enrollable — no routes, no fabricated details.
const COMING_SOON_PROGRAMS = [
  {
    title: "Cybersecurity",
    description: "Explore the fundamentals of cybersecurity, digital safety, systems protection and responsible security practices.",
    image: "/brand/programs-cybersecurity.jpg",
    alt: "A hooded figure working at multiple monitors showing security dashboards",
  },
  {
    title: "Data Science & Analytics",
    description: "Learn how data can be explored, interpreted and turned into useful insights, visualisations and decisions.",
    image: "/brand/programs-data-science.jpg",
    alt: "A laptop displaying financial charts and data visualisations on a desk",
  },
  {
    title: "Artificial Intelligence & Machine Learning",
    description: "Explore artificial intelligence, machine learning concepts and practical ways intelligent systems can be designed and applied.",
    image: "/brand/programs-ai-ml.jpg",
    alt: "A street scene with AI object-detection labels overlaid on people, vehicles and traffic signals",
  },
  {
    title: "Full-Stack Web Development",
    description: "Learn how modern web experiences are built across interfaces, applications, databases and the systems connecting them.",
    image: "/brand/programs-fullstack-web.jpg",
    alt: "A desk with multiple monitors showing code and a mobile app interface",
  },
  {
    title: "UI/UX & Product Design",
    description: "Explore user experience, interface design, interaction thinking and the process of turning ideas into useful digital products.",
    image: "/brand/programs-ui-ux.jpg",
    alt: "A design tool open on a monitor showing app screens and prototypes",
  },
  {
    title: "Cloud Computing & DevOps",
    description: "Understand modern cloud infrastructure, deployment workflows, automation and the systems that support digital products.",
    image: "/brand/programs-cloud-devops.jpg",
    alt: "A person reviewing a laptop in a server room lined with data racks",
  },
  {
    title: "3D Design & Animation",
    description: "Explore 3D modelling, visual design, animation and digital environments through creative project-based work.",
    image: "/brand/programs-3d-animation.jpg",
    alt: "A digital art tablet displaying character illustration software",
  },
  {
    title: "Blockchain & Web3",
    description: "Explore blockchain concepts, decentralised systems, digital assets and the technologies shaping Web3.",
    image: "/brand/programs-blockchain-web3.jpg",
    alt: "A coin with a Bitcoin symbol resting on a trading chart",
  },
].map((program) => ({ ...program, status: "coming-soon" as const }));

const ALL_PROGRAMS = [...ACTIVE_PROGRAMS, ...COMING_SOON_PROGRAMS];

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useRevealOnView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return { ref, visible };
}

export function ProgramsPreview() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} className="py-14 sm:py-16">
      <div className="px-4 sm:px-6">
        <div className="mx-auto max-w-[1800px]">
          <div
            className={cn(
              "mx-auto max-w-6xl text-center transition-all duration-700",
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              Explore Our Programs
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
              Choose a Skill. Build Your Path.
            </h2>

            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Practical programs designed to help you learn, create and build
              work that moves you toward your next opportunity.
            </p>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "group/marquee relative mt-10 overflow-hidden transition-all duration-700 motion-reduce:overflow-x-auto lg:mt-12",
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        )}
      >
        <div className="flex w-max gap-7 px-4 [animation:marquee_55s_linear_infinite] group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none sm:px-6 lg:gap-10">
          {ALL_PROGRAMS.map((program) => (
            <ProgramCard key={`a-${program.title}`} program={program} />
          ))}
          {ALL_PROGRAMS.map((program) => (
            <ProgramCard key={`b-${program.title}`} program={program} duplicate />
          ))}
        </div>
      </div>

      <div className="px-4 sm:px-6">
        <div className="mx-auto max-w-[1800px]">
          <div
            className={cn(
              "mt-10 flex flex-col items-center gap-4 border-t border-primary/10 pt-8 text-center transition-all delay-300 duration-700 lg:mt-12",
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <p className="text-base text-muted-foreground">
              Explore the full Techno Gurukul learning ecosystem.
            </p>
            <Link
              href="/programs"
              className={cn(buttonVariants({ variant: "default" }), "h-11 shrink-0 rounded-full px-6 text-base")}
            >
              Explore All Programs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

type Program =
  | ((typeof ACTIVE_PROGRAMS)[number] & { status: "active" })
  | (typeof COMING_SOON_PROGRAMS)[number];

function ProgramCard({ program, duplicate }: { program: Program; duplicate?: boolean }) {
  const isActive = program.status === "active";

  const content = (
    <>
      <Image
        src={program.image}
        alt={program.alt}
        fill
        sizes="(min-width: 1024px) 576px, (min-width: 640px) 480px, 320px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

      <span
        className={cn(
          "relative m-6 inline-flex w-fit items-center rounded-full px-3.5 py-1.5 text-xs font-semibold",
          isActive ? "bg-background/90 text-foreground" : "bg-background/70 text-muted-foreground"
        )}
      >
        {isActive ? program.category : "Coming Soon"}
      </span>

      {isActive && (
        <span
          aria-hidden="true"
          className="absolute top-6 right-6 flex size-11 items-center justify-center rounded-full bg-background/90 text-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <ArrowUpRight className="size-4" />
        </span>
      )}

      <div className="relative mt-auto flex flex-col gap-2.5 p-6 pt-0">
        <p className={cn("text-2xl font-semibold", isActive ? "text-background" : "text-background/90")}>{program.title}</p>
        <p className={cn("text-base leading-relaxed", isActive ? "text-background/80" : "text-background/60")}>{program.description}</p>
        {isActive && <p className="mt-1 text-xs font-semibold tracking-wide text-background/70">{program.outcome}</p>}
      </div>
    </>
  );

  const className = cn(
    "group relative flex aspect-[3/4] w-80 shrink-0 flex-col overflow-hidden rounded-[2.5rem] sm:aspect-[16/11] sm:w-[30rem] lg:w-[36rem]",
    duplicate && "motion-reduce:hidden"
  );

  if (isActive) {
    return (
      <Link href={program.href} className={className} tabIndex={duplicate ? -1 : 0} aria-hidden={duplicate}>
        {content}
      </Link>
    );
  }

  return (
    <div className={className} aria-hidden={duplicate}>
      {content}
    </div>
  );
}
