"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { CTA_LINK } from "@/components/navigation/nav-data";
import { COMMUNITY_PORTRAITS } from "@/data/community-portraits";

// Where each portrait sits around the card. Phones show the ones without `hidden`; the card's
// vertical padding keeps every portrait clear of the text, and at lg the side portraits stay
// inside the margins the (max-w) content column leaves free.
const SLOTS = [
  "top-4 left-4 size-10 sm:size-12 lg:top-[14%] lg:left-[4%] lg:size-14",
  "hidden md:block md:top-3 md:left-[34%] md:size-11 lg:top-[5%] lg:left-[22%] lg:size-14",
  "hidden lg:block lg:top-[40%] lg:left-[10%] lg:size-12",
  "bottom-4 left-6 size-10 sm:size-12 lg:bottom-[14%] lg:left-[3.5%] lg:size-14",
  "bottom-3 left-[42%] size-9 sm:size-11 lg:bottom-[5%] lg:left-[26%] lg:size-12",
  "top-6 right-6 size-10 sm:size-12 lg:top-[10%] lg:right-[4%] lg:size-16",
  "hidden md:block md:top-3 md:right-[30%] md:size-11 lg:top-[6%] lg:right-[20%] lg:size-12",
  "hidden lg:block lg:top-[46%] lg:right-[9%] lg:size-14",
  "bottom-6 right-4 size-10 sm:size-12 lg:bottom-[12%] lg:right-[6%] lg:size-16",
  "hidden md:block md:bottom-3 md:right-[34%] md:size-11 lg:bottom-[6%] lg:right-[24%] lg:size-12",
  "top-14 left-[30%] size-8 md:top-4 md:left-[56%] md:size-9 lg:top-[4%] lg:left-[38%] lg:size-10",
  "hidden md:block md:bottom-4 md:left-[20%] md:size-9 lg:bottom-[4%] lg:left-[44%] lg:size-10",
  "hidden lg:block lg:top-[4%] lg:right-[38%] lg:size-10",
  "bottom-14 right-[28%] size-8 md:bottom-4 md:right-[20%] md:size-9 lg:bottom-[4%] lg:right-[44%] lg:size-10",
  "hidden lg:block lg:top-[64%] lg:left-[6%] lg:size-10",
  "hidden lg:block lg:top-[66%] lg:right-[12%] lg:size-10",
] as const;

// Gentle, out-of-sync drift for each avatar: [x px, y px, rotate deg, scale, seconds, delay seconds].
const DRIFT = [
  [5, -9, 5, 1.06, 7, 0],
  [-6, 8, -4, 1.05, 8.5, -2],
  [4, 7, 6, 1.07, 6.5, -4],
  [-5, -8, -5, 1.05, 9, -1],
  [6, 6, 4, 1.06, 7.5, -3],
  [-4, -10, -6, 1.07, 8, -5],
  [5, 9, 5, 1.05, 6, -2.5],
  [-6, -6, -4, 1.06, 9.5, -6],
  [4, -8, 6, 1.07, 7, -1.5],
  [-5, 7, -5, 1.05, 8, -4.5],
  [6, -7, 4, 1.06, 6.8, -3.5],
  [-4, 9, -6, 1.05, 9.2, -0.5],
  [5, 6, 5, 1.07, 7.2, -5.5],
  [-6, -9, -4, 1.06, 8.8, -2.2],
  [4, 8, 6, 1.05, 6.4, -6.5],
  [-5, -7, -5, 1.07, 9.6, -3.2],
] as const;

const TONES = [
  "from-primary/25 to-primary/10",
  "from-brand-sky/30 to-brand-sky/10",
  "from-[#0d6386]/25 to-[#0b3d50]/10",
] as const;

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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return { ref, visible };
}

function FloatingPortraits({ visible }: { visible: boolean }) {
  return (
    <>
      {COMMUNITY_PORTRAITS.slice(0, SLOTS.length).map((p, i) => (
        <div
          key={p.id}
          aria-hidden={p.src ? undefined : true}
          style={{ transitionDelay: visible ? `${300 + i * 70}ms` : "0ms" }}
          className={cn(
            "absolute transition-all duration-700 motion-reduce:transition-none",
            SLOTS[i],
            visible ? "scale-100 opacity-100" : "scale-90 opacity-0"
          )}
        >
          <div
            className={cn(
              "avatar-drift size-full overflow-hidden rounded-full bg-gradient-to-br shadow-[0_8px_20px_-10px_rgba(16,20,28,0.35)] ring-2 ring-white",
              TONES[i % TONES.length]
            )}
            style={
              {
                "--drift-x": `${DRIFT[i][0]}px`,
                "--drift-y": `${DRIFT[i][1]}px`,
                "--drift-r": `${DRIFT[i][2]}deg`,
                "--drift-s": DRIFT[i][3],
                "--drift-dur": `${DRIFT[i][4]}s`,
                "--drift-delay": `${DRIFT[i][5]}s`,
              } as React.CSSProperties
            }
          >
            {p.src ? (
              <Image src={p.src} alt={p.alt} fill sizes="64px" className="object-cover" />
            ) : (
              <span className="flex size-full items-center justify-center">
                <User className="size-1/2 text-primary/40" aria-hidden="true" />
              </span>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export function BlogsFinalCta() {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  return (
    <section ref={ref} aria-labelledby="blog-cta-heading" className="border-t border-primary/10 bg-muted/60 px-4 py-16 sm:px-6 sm:py-24">
      <div
        className={cn(
          "relative mx-auto max-w-[1800px] rounded-[2.5rem] border border-primary/10 bg-card px-6 py-28 text-center shadow-[0_24px_60px_-40px_rgba(16,20,28,0.25)] transition-all duration-700 motion-reduce:transition-none sm:px-10 sm:py-28 lg:py-32",
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}
      >
        <FloatingPortraits visible={visible} />

        <div className="relative mx-auto flex max-w-2xl flex-col items-center lg:max-w-[620px] xl:max-w-[720px]">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase sm:text-sm">
            Ready to build what&rsquo;s next?
          </p>
          <h2
            id="blog-cta-heading"
            className="mt-4 text-3xl leading-[1.1] font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl xl:text-6xl"
          >
            Turn What You Learn Into What You Build.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Explore practical programs designed to help you turn ideas into real skills, real projects and career-ready
            experience.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4">
            <Link
              href="/programs"
              className={cn(
                buttonVariants({ variant: "default" }),
                "group min-h-12 gap-2 rounded-full px-8 text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:translate-y-0"
              )}
            >
              Explore Programs
              <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href={CTA_LINK.href}
              className="group inline-flex items-center gap-1.5 rounded text-base font-medium text-foreground/80 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Have questions? Talk to us
              <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
