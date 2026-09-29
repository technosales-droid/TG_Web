"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Clock } from "lucide-react";
import { cn } from "cn";

// Committed future directions, not yet enrollable; no routes, no fabricated details. Digital Marketing and Game
// Development are not in this list: they are already available and covered by the Available Courses section above.
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
];

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

/**
 * The future-course ecosystem: clearly separate from, and visually quieter than, the two courses open for
 * enrolment right now (see AvailableCourses). Every card is muted and carries a "Coming Soon" label; none of them
 * link anywhere, because none of them are enrollable yet.
 */
export function ComingSoonPrograms() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} aria-labelledby="coming-soon-heading" className="py-14 sm:py-16">
      <div className="px-4 sm:px-6">
        <div className="mx-auto max-w-[1800px]">
          <div
            className={cn(
              "mx-auto max-w-3xl text-center transition-all duration-700",
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
              <span className="size-1.5 rounded-full bg-muted-foreground/50" aria-hidden="true" />
              Coming Soon
            </div>

            <h2 id="coming-soon-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
              More Programs Are on the Way.
            </h2>

            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              These are future directions we&rsquo;re exploring, not open for enrolment yet. Digital Marketing and
              Game Development are the two courses available today.
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
          {COMING_SOON_PROGRAMS.map((program) => (
            <ProgramCard key={`a-${program.title}`} program={program} />
          ))}
          {COMING_SOON_PROGRAMS.map((program) => (
            <ProgramCard key={`b-${program.title}`} program={program} duplicate />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramCard({ program, duplicate }: { program: (typeof COMING_SOON_PROGRAMS)[number]; duplicate?: boolean }) {
  return (
    <div
      className={cn(
        "group relative flex aspect-[3/4] w-72 shrink-0 flex-col overflow-hidden rounded-[2.5rem] grayscale-[35%] sm:aspect-[16/11] sm:w-[26rem] lg:w-[30rem]",
        duplicate && "motion-reduce:hidden"
      )}
      aria-hidden={duplicate}
    >
      <Image
        src={program.image}
        alt={program.alt}
        fill
        sizes="(min-width: 1024px) 480px, (min-width: 640px) 416px, 288px"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15" />

      <span className="relative m-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-background/85 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        <Clock className="size-3.5" aria-hidden="true" />
        Coming Soon
      </span>

      <div className="relative mt-auto flex flex-col gap-2.5 p-6 pt-0">
        <p className="text-2xl font-semibold text-background/90">{program.title}</p>
        <p className="text-base leading-relaxed text-background/60">{program.description}</p>
      </div>
    </div>
  );
}
