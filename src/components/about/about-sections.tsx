import Image from "next/image";
import { Check, Compass, FolderOpen, MessageSquare, Target, Users, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "cn";
import { Reveal } from "@/components/ui/reveal";
import { GRADIENT_TEXT } from "@/components/ui/section-header";

// Short sections for the consolidated About page. Nothing here states a number, result, partnership or outcome.
const SECTION = "px-4 py-14 sm:px-6 sm:py-20 xl:py-24";
const INNER = "mx-auto max-w-[1350px] xl:px-8";
const EYEBROW = "flex items-center gap-2 text-sm font-medium tracking-[0.2em] text-primary uppercase";
const H2 = "mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight";

function Header({ id, eyebrow, children, lead, center }: { id: string; eyebrow: string; children: React.ReactNode; lead?: string; center?: boolean }) {
  return (
    <Reveal className={cn("max-w-3xl", center && "mx-auto text-center")}>
      <div className={cn(EYEBROW, center && "justify-center")}>
        <span className="size-1.5 rounded-full bg-brand-sky" aria-hidden="true" />
        {eyebrow}
      </div>
      <h2 id={id} className={H2}>
        {children}
      </h2>
      {lead && <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{lead}</p>}
    </Reveal>
  );
}

type Split = {
  eyebrow: string;
  title: React.ReactNode;
  text: string;
  points: string[];
  image: string;
  alt: string;
  fit: "cover" | "contain";
};

// Both pictures are existing project assets: a cut-out of learners on a soft tint. Replace with real classroom
// photography when it is supplied.
const SPLITS: Split[] = [
  {
    eyebrow: "Our approach",
    title: "Learning That Goes Beyond the Classroom.",
    text: "Learning becomes meaningful when students can put knowledge into practice. Our approach combines guided instruction, hands-on exercises and project-based learning so that learners can move from understanding an idea to actually using it.",
    points: ["Practical, hands-on learning", "Guided projects and exercises", "Industry-relevant skills", "Confidence through application"],
    image: "/hero/students.png",
    alt: "Two learners with their notebooks",
    fit: "cover",
  },
  {
    eyebrow: "What we focus on",
    title: "Build Skills. Create Projects. Prepare for What’s Next.",
    text: "Techno Gurukul focuses on helping learners develop skills that are useful beyond the classroom. From digital tools and technology to creative problem-solving, learners get opportunities to practise, build and demonstrate what they know.",
    points: ["Learn through real tasks", "Build a practical portfolio", "Develop problem-solving skills", "Prepare for future opportunities"],
    image: "/brand/learning-cta.png",
    alt: "Learners working together around a laptop",
    fit: "contain",
  },
];

export function AboutWho() {
  return (
    <section aria-labelledby="ab-who-heading" className={SECTION}>
      <div className="mx-auto max-w-[1280px] xl:px-8">
        <Header
          id="ab-who-heading"
          eyebrow="Who we are"
          lead="Techno Gurukul is a technology-focused learning institute built around practical education. We help learners understand concepts, develop relevant skills, work on projects and gain the confidence to apply what they learn."
        >
          Built Around <span className={GRADIENT_TEXT}>Practical Learning.</span>
        </Header>

        <div className="mt-14 grid gap-20 sm:mt-20 lg:gap-28">
          {SPLITS.map((sp, i) => (
            <Reveal key={sp.eyebrow}>
              <div className={cn("grid items-center gap-10 lg:gap-16", i % 2 === 0 ? "lg:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]" : "lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]")}>
                <div className={cn("relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary/15 via-primary/5 to-brand-sky/20", i % 2 === 1 && "lg:order-2")}>
                  <Image
                    src={sp.image}
                    alt={sp.alt}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className={sp.fit === "cover" ? "object-cover object-center" : "object-contain object-bottom"}
                  />
                </div>

                <div className={cn(i % 2 === 1 && "lg:order-1")}>
                  <div className={EYEBROW}>
                    <span className="size-1.5 rounded-full bg-brand-sky" aria-hidden="true" />
                    {sp.eyebrow}
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl xl:text-4xl">{sp.title}</h3>
                  <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{sp.text}</p>
                  <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                    {sp.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3 text-base font-medium text-foreground">
                        <span aria-hidden="true" className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Four tiles of different size and treatment: two over photographs, one solid blue, one soft sky blue.
const TEACH: {
  title: string;
  text: string;
  Icon: LucideIcon;
  span: string;
  image?: string;
  tone: string;
}[] = [
  {
    title: "Practical learning",
    text: "Concepts are applied through exercises and hands-on work, not only explained.",
    Icon: Wrench,
    span: "lg:col-span-7",
    image: "/brand/practise.jpg",
    tone: "text-white",
  },
  {
    title: "Guided learning",
    text: "Clear structure and instructor guidance while skills are forming, with more independence over time.",
    Icon: Compass,
    span: "lg:col-span-5",
    tone: "bg-[#0a6a8f] text-white",
  },
  {
    title: "Projects",
    text: "Skills come together in practical work that can be reviewed, refined and presented.",
    Icon: FolderOpen,
    span: "lg:col-span-5",
    tone: "bg-brand-sky/15 text-foreground",
  },
  {
    title: "Feedback and mentorship",
    text: "Regular feedback shows what is working and what to improve next.",
    Icon: MessageSquare,
    span: "lg:col-span-7",
    image: "/brand/projects.jpg",
    tone: "text-white",
  },
];

export function AboutTeach() {
  return (
    <section aria-labelledby="ab-teach-heading" className={cn(SECTION, "border-y border-primary/10 bg-muted/50")}>
      <div className={INNER}>
        <Header id="ab-teach-heading" eyebrow="How we teach" lead="Four things shape every lesson, from the first concept to the finished project.">
          Learning That Is <span className={GRADIENT_TEXT}>Guided and Practical.</span>
        </Header>
        <ul className="mt-12 grid gap-5 lg:grid-cols-12">
          {TEACH.map(({ title, text, Icon, span, image, tone }, i) => (
            <li key={title} className={span}>
              <Reveal delay={(i % 2) * 100} className="h-full">
                <article className={cn("group relative isolate flex h-full min-h-72 flex-col justify-between overflow-hidden rounded-[2rem] p-7 sm:min-h-80 sm:p-9", tone, !image && "border border-primary/10")}>
                  {image && (
                    <>
                      <Image src={image} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="-z-20 object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-105 motion-reduce:transition-none" />
                      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#062c3d]/90 via-[#062c3d]/55 to-[#062c3d]/20" />
                    </>
                  )}
                  <span
                    aria-hidden="true"
                    className={cn("flex size-12 items-center justify-center rounded-full", tone.includes("text-white") ? "bg-white/15 text-white ring-1 ring-white/25" : "bg-primary/15 text-primary")}
                  >
                    <Icon className="size-5" />
                  </span>
                  <div className="mt-10">
                    <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h3>
                    <p className={cn("mt-3 max-w-md text-base leading-relaxed", tone.includes("text-white") ? "text-white/85" : "text-muted-foreground")}>{text}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const WHY: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Practical learning", text: "Learning is measured by what you can do with it.", Icon: Wrench },
  { title: "Project-based education", text: "Projects give learning somewhere to go and leave you with work you can show.", Icon: FolderOpen },
  { title: "Skills with a purpose", text: "Skills are taught alongside how they are used in real work.", Icon: Target },
  { title: "Career orientation", text: "Learners understand where their skills can lead, without promises about outcomes.", Icon: Users },
];

export function AboutWhy() {
  return (
    <section aria-labelledby="ab-why-heading" className={cn(SECTION, "sm:py-28 xl:py-36")}>
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-muted lg:aspect-auto lg:h-[46rem]">
              <Image src="/brand/portfolio.jpg" alt="A desk with a laptop and notebooks floating over a grassy hill" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-[35%_50%]" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#062c3d]/80 via-transparent to-transparent" />
              <p className="absolute right-5 bottom-5 left-5 rounded-2xl border border-white/25 bg-black/25 p-5 text-lg leading-snug font-medium text-white backdrop-blur-md sm:right-7 sm:bottom-7 sm:left-7 sm:text-xl">
                Knowing something and using it are not the same thing.
              </p>
            </div>
          </Reveal>

          <div>
            <Header id="ab-why-heading" eyebrow="Why Techno Gurukul" lead="That gap between knowing and using is what we teach into.">
              Because Knowing Is <span className={GRADIENT_TEXT}>Only the Beginning.</span>
            </Header>
            <ul className="mt-12 border-t border-primary/15">
              {WHY.map(({ title, text, Icon }, i) => (
                <li key={title} className="border-b border-primary/15">
                  <Reveal delay={i * 80}>
                    <div className="group flex items-start gap-5 py-8 xl:py-10">
                      <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white motion-reduce:transition-none">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary motion-reduce:transition-none">{title}</h3>
                        <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{text}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
