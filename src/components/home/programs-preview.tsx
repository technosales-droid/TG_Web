"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Aperture,
  ArrowUpRight,
  BarChart3,
  Boxes,
  Bot,
  Briefcase,
  Camera,
  Clapperboard,
  Cloud,
  Code,
  Code2,
  Film,
  Gamepad2,
  Laptop,
  Megaphone,
  Monitor,
  PenTool,
  Palette,
  Rocket,
  Search,
  Shapes,
  ShieldCheck,
  Share2,
  Smartphone,
  Sparkles,
  Terminal,
  Wand2,
} from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";

const ACTIVE_PROGRAMS = [
  {
    status: "active" as const,
    category: "Digital & Marketing",
    title: "Digital Marketing",
    description:
      "Learn how brands grow in the digital world — from strategy and content to social media, search, advertising and analytics.",
    outcome: "Learn. Execute. Measure. Grow.",
    href: "/programs/tg-digital-marketing",
    icon: Megaphone,
    base: "from-primary via-primary/70 to-brand-green/40",
  },
  {
    status: "active" as const,
    category: "Creative Technology",
    title: "Game Development & Design",
    description:
      "Learn to turn ideas into interactive experiences through game design, programming, digital art, engines, animation and practical project work.",
    outcome: "Design. Build. Play.",
    href: "/programs/tg-gameforge",
    icon: Gamepad2,
    base: "from-brand-green via-primary/60 to-[#0b3d50]",
  },
];

const COMING_SOON_PROGRAMS = [
  { title: "Web Development", description: "Learn to build modern websites and web applications using HTML, CSS, JavaScript and modern frameworks.", icon: Code2 },
  { title: "UI/UX Design", description: "Learn to design websites and apps through user research, wireframes, visual design and prototyping.", icon: PenTool },
  { title: "Graphic Design", description: "Learn to create professional visual designs for branding, social media, advertising and digital content.", icon: Palette },
  { title: "Video Editing", description: "Learn to edit professional videos for YouTube, social media, advertising and digital campaigns.", icon: Clapperboard },
  { title: "Motion Graphics", description: "Learn to create animated graphics, titles, promotional visuals and engaging digital content.", icon: Wand2 },
  { title: "3D Design & Animation", description: "Learn to create 3D models, environments, animations and visual assets for digital media.", icon: Shapes },
  { title: "AI & Generative AI", description: "Learn how to use modern AI tools for content creation, productivity, automation and creative workflows.", icon: Sparkles },
  { title: "AI-Assisted Development", description: "Learn how AI can support coding, debugging, prototyping and software development workflows.", icon: Bot },
  { title: "Data Analytics", description: "Learn to work with data, create dashboards, identify patterns and turn information into useful insights.", icon: BarChart3 },
  { title: "Python Programming", description: "Learn Python fundamentals, problem solving, automation, data handling and practical programming.", icon: Terminal },
  { title: "App Development", description: "Learn to design and build mobile applications from interface to functionality and deployment.", icon: Smartphone },
  { title: "Software Development", description: "Learn programming fundamentals, software architecture, development workflows and application building.", icon: Code },
  { title: "Cybersecurity Fundamentals", description: "Learn the fundamentals of digital security, networks, threats, vulnerabilities and safe computing.", icon: ShieldCheck },
  { title: "Cloud Computing", description: "Learn cloud fundamentals, deployment, storage, services and modern cloud-based workflows.", icon: Cloud },
  { title: "Content Creation", description: "Learn to plan, create and publish content for YouTube, Instagram, websites and digital platforms.", icon: Camera },
  { title: "Social Media Management", description: "Learn content planning, platform strategy, community management, analytics and campaign execution.", icon: Share2 },
  { title: "SEO", description: "Learn how search engines work and how to improve websites through technical, on-page and content SEO.", icon: Search },
  { title: "Photography & Digital Imaging", description: "Learn photography fundamentals, image composition, editing and digital post-production.", icon: Aperture },
  { title: "Animation", description: "Learn 2D/3D animation principles, character movement, storytelling and digital production workflows.", icon: Film },
  { title: "CAD & 3D Modelling", description: "Learn computer-aided design, technical modelling and 3D workflows for digital and physical applications.", icon: Boxes },
  { title: "Office & Productivity Skills", description: "Learn practical skills in documents, spreadsheets, presentations, collaboration and everyday digital productivity.", icon: Briefcase },
  { title: "Computer Fundamentals", description: "Build essential computer skills including operating systems, files, internet usage, software and digital workflows.", icon: Monitor },
  { title: "Entrepreneurship & Digital Business", description: "Learn how to develop ideas, build digital businesses, market products and manage online operations.", icon: Rocket },
  { title: "Freelancing & Remote Work", description: "Learn how to build a portfolio, find opportunities, communicate with clients and manage freelance projects.", icon: Laptop },
].map((program) => ({ ...program, status: "coming-soon" as const, base: "from-muted to-border" }));

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
              "mx-auto max-w-4xl text-center transition-all duration-700",
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

            <p className="mx-auto mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg xl:text-nowrap">
              Practical programs designed to help you learn, create and build
              work that moves you toward your next opportunity.
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6">
        <div className="mx-auto max-w-[1800px]">
          <div
            className={cn(
              "group/marquee relative mt-10 overflow-hidden transition-all duration-700 motion-reduce:overflow-x-auto lg:mt-12",
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            )}
          >
            <div className="flex w-max gap-6 [animation:marquee_140s_linear_infinite] group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none lg:gap-8">
              {ALL_PROGRAMS.map((program) => (
                <ProgramCard key={`a-${program.title}`} program={program} />
              ))}
              {ALL_PROGRAMS.map((program) => (
                <ProgramCard key={`b-${program.title}`} program={program} duplicate />
              ))}
            </div>
          </div>
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
  const Icon = program.icon;
  const isActive = program.status === "active";

  const content = (
    <>
      {/* PROGRAM IMAGE/VIDEO PLACEHOLDER — FINAL ASSET TO BE PROVIDED.
          Final markup: replace this div's contents with either
          <img src="..." className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          or a <video> with the same sizing classes. */}
      <div className={cn("absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105", program.base)}>
        <Icon className={cn("absolute right-6 bottom-6 size-24", isActive ? "text-background/10" : "text-foreground/10")} aria-hidden="true" />
      </div>
      <div className={cn("absolute inset-0 bg-gradient-to-t to-transparent", isActive ? "from-black/70 via-black/10" : "from-black/40 via-black/5")} />

      <span
        className={cn(
          "relative m-5 inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-semibold",
          isActive ? "bg-background/90 text-foreground" : "bg-background/70 text-muted-foreground"
        )}
      >
        {isActive ? program.category : "Coming Soon"}
      </span>

      {isActive && (
        <span
          aria-hidden="true"
          className="absolute top-5 right-5 flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <ArrowUpRight className="size-4" />
        </span>
      )}

      <div className="relative mt-auto flex flex-col gap-2 p-5 pt-0">
        <p className={cn("text-xl font-semibold", isActive ? "text-background" : "text-background/90")}>{program.title}</p>
        <p className={cn("text-sm leading-relaxed", isActive ? "text-background/80" : "text-background/60")}>{program.description}</p>
        {isActive && <p className="mt-1 text-xs font-semibold tracking-wide text-background/70">{program.outcome}</p>}
      </div>
    </>
  );

  const className = cn(
    "group relative flex aspect-[4/3] w-80 shrink-0 flex-col overflow-hidden rounded-[2rem] sm:aspect-[16/11] sm:w-[28rem] lg:w-[32rem]"
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
