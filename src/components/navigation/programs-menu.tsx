import Link from "next/link";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  FLAGSHIP_PROGRAM,
  PROGRAM_CATEGORY,
  SPECIALIZED_PROGRAMS,
} from "@/components/navigation/nav-data";

export function ProgramsMenu() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Programs</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="w-[34rem] p-4">
          <p className="mb-3 px-1 font-heading text-sm font-medium text-muted-foreground">
            {PROGRAM_CATEGORY}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <NavigationMenuLink
              render={<Link href={FLAGSHIP_PROGRAM.href} />}
              closeOnClick
              className="flex h-full flex-col justify-between rounded-xl border border-primary/25 bg-accent p-4 hover:bg-accent"
            >
              <span className="font-heading text-base font-semibold text-foreground">
                {FLAGSHIP_PROGRAM.label}
              </span>
              <span className="mt-1.5 text-sm text-muted-foreground">
                {FLAGSHIP_PROGRAM.tagline}
              </span>
              <span className="mt-4 text-xs font-medium text-primary">
                Flagship program
              </span>
            </NavigationMenuLink>

            <div className="flex flex-col gap-0.5">
              {SPECIALIZED_PROGRAMS.map((program) => (
                <NavigationMenuLink
                  key={program.href}
                  render={<Link href={program.href} />}
                  closeOnClick
                  className="flex flex-col items-start gap-0 p-2"
                >
                  <span className="text-sm font-medium text-foreground">
                    {program.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {program.tagline}
                  </span>
                </NavigationMenuLink>
              ))}
            </div>
          </div>
          <div className="mt-3 border-t border-border pt-3">
            <NavigationMenuLink
              render={<Link href="/programs" />}
              closeOnClick
              className="font-medium text-primary"
            >
              View All Programs
            </NavigationMenuLink>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
