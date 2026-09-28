import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "cn";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DIGITAL_MARKETING_CATEGORY,
  GAME_DEVELOPMENT_PROGRAMS,
  PROGRAM_CATEGORY,
  SIGNATURE_PROGRAM,
  SPECIALIZED_PROGRAMS,
  type ProgramLink,
} from "@/components/navigation/nav-data";

function Tile({
  program,
  eyebrow,
  flagship,
  className,
}: {
  program: ProgramLink;
  eyebrow?: string;
  flagship?: boolean;
  className?: string;
}) {
  return (
    <NavigationMenuLink
      render={<Link href={program.href} />}
      closeOnClick
      className={cn(
        "group/item relative block items-stretch overflow-hidden rounded-2xl bg-muted p-0 text-white hover:bg-muted hover:text-white focus:bg-muted focus:text-white",
        className
      )}
    >
      <Image
        src={program.image}
        alt=""
        fill
        sizes={flagship ? "480px" : "240px"}
        className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover/item:scale-105"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      {flagship && (
        <span className="absolute top-4 left-4 rounded-full bg-brand-sky px-3 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
          Signature Course
        </span>
      )}
      <span className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white text-foreground opacity-0 transition-all duration-300 motion-safe:translate-y-1 group-hover/item:opacity-100 motion-safe:group-hover/item:translate-y-0 group-focus-visible/item:opacity-100">
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </span>

      <span className={cn("absolute inset-x-0 bottom-0 block", flagship ? "p-5" : "p-3.5")}>
        {eyebrow && (
          <span className="mb-1 block text-[11px] font-semibold tracking-widest text-white/75 uppercase">{eyebrow}</span>
        )}
        <span className={cn("block leading-tight font-semibold", flagship ? "text-2xl" : "text-sm")}>{program.label}</span>
        <span className={cn("mt-1 block text-white/80", flagship ? "max-w-xs text-sm" : "line-clamp-2 text-xs")}>
          {program.tagline}
        </span>
      </span>
    </NavigationMenuLink>
  );
}

export function ProgramsMenu() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Programs</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="w-[min(64rem,calc(100vw-3rem))] p-5">
          <div className="mb-4 flex items-center justify-between px-1">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Explore Programs</p>
            <NavigationMenuLink
              render={<Link href="/programs" />}
              closeOnClick
              className="group/item w-auto gap-1.5 px-3 py-1.5 text-sm font-medium text-primary"
            >
              View All Programs
              <ArrowRight
                className="size-4 transition-transform duration-300 motion-safe:group-hover/item:translate-x-1"
                aria-hidden="true"
              />
            </NavigationMenuLink>
          </div>

          <div className="grid auto-rows-[9.5rem] grid-cols-4 gap-3">
            <Tile program={SIGNATURE_PROGRAM} eyebrow={DIGITAL_MARKETING_CATEGORY} flagship className="col-span-2 row-span-2" />
            {SPECIALIZED_PROGRAMS.map((program) => (
              <Tile key={program.href} program={program} />
            ))}
            {GAME_DEVELOPMENT_PROGRAMS.map((program) => (
              <Tile key={program.href} program={program} eyebrow={PROGRAM_CATEGORY} className="col-span-2" />
            ))}
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
