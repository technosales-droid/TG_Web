"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { buttonVariants } from "@/components/ui/button";
import { ProgramsMenu } from "@/components/navigation/programs-menu";
import { DropdownNavItem } from "@/components/navigation/dropdown-nav-item";
import { MobileNav } from "@/components/navigation/mobile-nav";
import {
  ABOUT_LINKS,
  CAREERS_LINKS,
  CTA_LINK,
  LEARNING_LINKS,
} from "@/components/navigation/nav-data";
import { cn } from "cn";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 px-3 pt-4 sm:px-4">
      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-3 rounded-full border border-border bg-card/95 py-2 pr-2 pl-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/85 sm:pl-4 sm:pr-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <img src="/brand/logomark.svg" alt="Techno Gurukul" className="h-8 w-auto" />
            <span className="font-heading text-base font-semibold tracking-tight text-foreground">
              Techno Gurukul
            </span>
          </Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  render={<Link href="/" />}
                  className={navigationMenuTriggerStyle()}
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>

              <ProgramsMenu />

              <NavigationMenuItem>
                <NavigationMenuLink
                  render={<Link href="/career-paths" />}
                  className={navigationMenuTriggerStyle()}
                >
                  Career Paths
                </NavigationMenuLink>
              </NavigationMenuItem>

              <DropdownNavItem label="Learning" href="/learning" items={LEARNING_LINKS} />
              <DropdownNavItem label="Careers" href="/careers-placement" items={CAREERS_LINKS} />
              <DropdownNavItem label="About" href="/about" items={ABOUT_LINKS} />
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            <Link
              href={CTA_LINK.href}
              className={cn(
                buttonVariants({ variant: "default" }),
                "hidden h-9 rounded-full px-4 lg:inline-flex"
              )}
            >
              {CTA_LINK.label}
            </Link>

            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((value) => !value)}
              className="inline-flex size-9 items-center justify-center rounded-full text-foreground hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none lg:hidden"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      </div>
    </header>
  );
}
