import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Two-tone diagonal backdrop, desktop only - the image has a
          transparent background, so this geometry shows through around it. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 hidden lg:block">
        <div className="absolute inset-y-0 right-0 w-[58%] bg-brand-green/15 [clip-path:polygon(22%_0%,100%_0%,100%_100%,0%_100%)]" />
        <div className="absolute inset-y-0 right-0 w-[58%] bg-primary/12 [clip-path:polygon(58%_0%,100%_0%,100%_38%)]" />
      </div>

      <div className="relative mx-auto max-w-[1800px] px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              Techno Gurukul
            </div>

            <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
              Learn. Create. Build What&rsquo;s Next.
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Techno Gurukul is built around practical learning — helping
              students develop creative, technical and digital skills
              through hands-on education, real projects and
              industry-relevant tools.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/programs"
                className={cn(buttonVariants({ variant: "default" }), "h-11 rounded-full px-6 text-base")}
              >
                Explore Programs
              </Link>
              <Link
                href="/about"
                className="text-base font-medium text-foreground underline-offset-4 hover:underline"
              >
                Discover Techno Gurukul
              </Link>
            </div>
          </div>

          <div className="relative aspect-[16/11] w-full lg:aspect-auto lg:h-[460px]">
            <Image
              src="/hero/students.png"
              alt="Techno Gurukul students"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
