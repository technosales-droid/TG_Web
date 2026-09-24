import Image from "next/image";
import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { GRADIENT_TEXT } from "@/components/ui/section-header";

// One layered collage, laid out in percentages of its own box and sized in container units so it scales as a
// whole at every width. Every piece is absolutely positioned and overlaps its neighbours.
function Collage() {
  return (
    <div className="mx-auto w-full max-w-[760px] @container">
      <div className="relative aspect-[1.15] w-full">
        {/* Secondary image, under everything */}
        <div className="absolute top-[62%] left-[8%] h-[38%] w-[82%] overflow-hidden rounded-[max(14px,3.6cqw)] bg-muted">
          <Image src="/brand/projects.jpg" alt="Learners collaborating on a practical project" fill sizes="(min-width: 1280px) 30vw, 90vw" className="object-cover object-[50%_40%]" />
        </div>

        {/* Main image */}
        <div className="absolute top-0 left-[45%] h-[59.4%] w-[45%] overflow-hidden rounded-[max(16px,4.4cqw)] bg-gradient-to-b from-primary/25 to-brand-sky/25">
          <Image src="/hero/students.png" alt="Two learners with their notebooks" fill priority sizes="(min-width: 1280px) 22vw, 45vw" className="object-cover object-[74%_top]" />
        </div>

        {/* Large accent card */}
        <div className="absolute top-0 left-[8%] group flex h-[38.5%] w-[34.4%] flex-col justify-between rounded-[max(16px,4.4cqw)] bg-primary py-[max(10px,3.2cqw)] pr-[max(10px,3cqw)] pl-[max(14px,7cqw)] text-white transition-transform duration-300 motion-safe:hover:-translate-y-1">
          <div aria-hidden="true" className="flex -space-x-[1.6cqw]">
            {[1, 4, 9].map((n) => (
              <span key={n} className="relative size-[max(20px,6.4cqw)] overflow-hidden rounded-full bg-white ring-2 ring-primary">
                <Image src={`/community/avatar-${String(n).padStart(2, "0")}.png`} alt="" fill sizes="64px" className="object-cover" />
              </span>
            ))}
          </div>
          <div>
            <p className="text-[max(1rem,5.4cqw)] leading-[1.05] font-bold tracking-tight text-balance">Learn by Doing</p>
            <p className="mt-[1.2cqw] text-[max(10px,2.2cqw)] leading-snug text-white/85">Practical learning at every stage.</p>
          </div>
        </div>

        {/* Small accent card */}
        <div className="absolute top-[41.5%] left-[8%] flex h-[18%] w-[35%] items-end justify-between overflow-hidden rounded-[max(14px,3.8cqw)] bg-brand-sky pl-[max(14px,7cqw)] text-white transition-transform duration-300 motion-safe:hover:-translate-y-1">
          <p className="self-center pr-2 text-[max(11px,2.9cqw)] leading-tight font-semibold">
            Built Through
            <br />
            Practice
          </p>
          <div aria-hidden="true" className="flex h-[70%] items-end gap-[1cqw] pr-[3cqw]">
            <span className="h-[35%] w-[3.6cqw] rounded-t-md bg-white/35" />
            <span className="h-[60%] w-[3.6cqw] rounded-t-md bg-white/55" />
            <span className="h-[85%] w-[3.6cqw] rounded-t-md bg-white/85" />
          </div>
        </div>

        {/* Circular emblem between the two halves of the collage */}
        <div className="absolute top-[32%] left-[1%] hidden aspect-square w-[13%] items-center justify-center rounded-full bg-[#141b33] ring-[length:max(3px,0.9cqw)] ring-white sm:flex">
          <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 size-full motion-safe:animate-[spin_18s_linear_infinite]">
            <defs>
              <path id="emblem-path" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
            </defs>
            <text fill="#ffffff" fontSize="9" fontWeight="600">
              <textPath href="#emblem-path" textLength="232" lengthAdjust="spacing">PRACTISE · BUILD · SHOW · </textPath>
            </text>
          </svg>
          <BookOpen className="size-[34%] text-brand-sky" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export function AboutHero() {
  return (
    <section className="px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-12">
      <div className="mx-auto max-w-[1800px]">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/10 bg-muted/50 px-5 py-10 sm:px-10 sm:py-12 xl:min-h-[600px] xl:px-16 xl:py-14">
          <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[48%] xl:block">
            <div className="absolute inset-0 bg-brand-sky/10 [clip-path:polygon(14%_0%,100%_0%,100%_100%,0%_100%)]" />
            <div className="absolute inset-0 bg-primary/8 [clip-path:polygon(0%_100%,55%_100%,100%_55%,100%_100%)]" />
          </div>

          <div className="relative grid items-center gap-10 xl:min-h-[480px] xl:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] xl:gap-16">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-brand-sky" aria-hidden="true" />
                About Techno Gurukul
              </div>
              <h1 className="mt-4 max-w-3xl text-[1.75rem] leading-[1.12] font-semibold tracking-tight text-balance text-foreground min-[430px]:text-4xl sm:text-5xl xl:text-[3rem]">
                Learning Should Lead to <span className={GRADIENT_TEXT}>Something You Can Build.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Techno Gurukul is built around practical learning, helping learners understand concepts, practise
                skills, build projects and develop the confidence to apply what they know.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href="/learning"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "h-11 rounded-full px-6 text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-primary"
                  )}
                >
                  Explore Learning
                </Link>
                <Link
                  href="/programs"
                  className="group flex min-h-11 items-center gap-1 rounded-full text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  Explore Programs
                  <ChevronRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <Collage />
          </div>
        </div>
      </div>
    </section>
  );
}
