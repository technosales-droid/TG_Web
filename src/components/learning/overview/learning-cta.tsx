import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "./overview-ui";

const ARROW = "size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1";
const BTN = "group min-h-12 gap-2 rounded-full px-7 text-base font-semibold transition-all duration-200 motion-safe:hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none";

export function LearningCta({
  eyebrow = "Ready to keep learning?",
  headline = ["Learn by Doing.", "Build What Comes Next."],
  text = "Explore the Techno Gurukul learning system and discover how practical learning can turn knowledge into experience.",
}: {
  eyebrow?: string;
  headline?: [string, string];
  text?: string;
}) {
  return (
    <section aria-labelledby="learning-cta-heading" className="overflow-x-clip px-4 pb-16 sm:px-6 sm:pb-24">
      <Reveal>
        <div className="relative mx-auto max-w-[1800px] rounded-[2.5rem] bg-[#0a6a8f] px-6 pt-16 text-white sm:px-12 sm:pt-20 lg:flex lg:min-h-[30rem] lg:items-center lg:px-20 lg:py-16 xl:min-h-[36rem] 2xl:min-h-[42rem]">
          <div className="relative z-10 max-w-3xl lg:max-w-[44%]">
            <Eyebrow light>{eyebrow}</Eyebrow>
            <h2 id="learning-cta-heading" className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
              {headline[0]}
              <br />
              {headline[1]}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {text}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/programs" className={cn(buttonVariants({ variant: "default" }), BTN, "bg-white text-foreground hover:bg-white/90")}>
                Explore Programs
                <ArrowRight className={ARROW} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Transparent cut-out composited straight onto the blue. Below the copy on small screens; on wide ones a
              layer clipped to the rounded bottom corners only, so the standing student's head can rise above the top. */}
          <Reveal delay={200} className="mt-10 lg:pointer-events-none lg:absolute lg:inset-0 lg:mt-0 lg:[clip-path:inset(-60%_0_0_0_round_0_0_2.5rem_2.5rem)]">
            <Image
              src="/brand/learning-cta.png"
              alt="Students working together around a laptop"
              width={1920}
              height={1080}
              sizes="(min-width: 1024px) 84vw, 100vw"
              className="h-auto w-full lg:absolute lg:right-[-20%] lg:bottom-0 lg:w-[84%]"
            />
          </Reveal>
        </div>
      </Reveal>
    </section>
  );
}
