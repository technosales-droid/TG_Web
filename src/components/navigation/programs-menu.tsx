import Link from "next/link";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DIGITAL_MARKETING_CATEGORY,
  DIGITAL_MARKETING_PROGRAMS,
  FLAGSHIP_PROGRAM,
  PROGRAM_CATEGORY,
  SPECIALIZED_PROGRAMS,
} from "@/components/navigation/nav-data";

export function ProgramsMenu() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Programs</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="w-[40rem] p-6">
          <p className="mb-4 px-1 text-sm font-medium text-muted-foreground">
            {PROGRAM_CATEGORY}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <NavigationMenuLink
              render={<Link href={FLAGSHIP_PROGRAM.href} />}
              closeOnClick
              className="flex h-full flex-col justify-between rounded-2xl border border-primary/25 bg-accent p-5 hover:bg-accent"
            >
              <span className="text-lg font-semibold text-foreground">
                {FLAGSHIP_PROGRAM.label}
              </span>
              <span className="mt-2 text-sm text-muted-foreground">
                {FLAGSHIP_PROGRAM.tagline}
              </span>
              <span className="mt-5 text-xs font-medium text-primary">
                Flagship program
              </span>
            </NavigationMenuLink>

            <div className="flex flex-col gap-1">
              {SPECIALIZED_PROGRAMS.map((program) => (
                <NavigationMenuLink
                  key={program.href}
                  render={<Link href={program.href} />}
                  closeOnClick
                  className="flex flex-col items-start gap-0 p-2.5"
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

          <div className="mt-5 border-t border-border pt-5">
            <p className="mb-2 px-1 text-sm font-medium text-muted-foreground">
              {DIGITAL_MARKETING_CATEGORY}
            </p>
            <div className="flex flex-col gap-1">
              {DIGITAL_MARKETING_PROGRAMS.map((program) => (
                <NavigationMenuLink
                  key={program.href}
                  render={<Link href={program.href} />}
                  closeOnClick
                  className="flex flex-col items-start gap-0 p-2.5"
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

          <div className="mt-5 border-t border-border pt-5">
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
