"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
import { CTA_LINK, LEARNING_LINKS } from "@/components/navigation/nav-data";
import { lockScroll } from "@/lib/scroll-lock";
import { cn } from "cn";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;

    const unlock = lockScroll();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      unlock();
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 px-3 pt-5 sm:px-6">
      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4 rounded-full border border-primary/10 bg-card/95 py-2.5 pr-3 pl-4 shadow-[0_12px_32px_-16px_rgba(16,20,28,0.25)] backdrop-blur supports-[backdrop-filter]:bg-card/85 sm:pl-5 sm:pr-4">
          <Link
            href="/"
            className="flex items-center rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Image
              src="/brand/logo.png"
              alt="Techno Gurukul"
              width={1710}
              height={281}
              priority
              className="h-8 w-auto sm:h-10"
            />
          </Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
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
                  render={<Link href="/blogs" />}
                  className={navigationMenuTriggerStyle()}
                >
                  Blogs
                </NavigationMenuLink>
              </NavigationMenuItem>

              <DropdownNavItem label="Learning" href="/learning" items={LEARNING_LINKS} />

              <NavigationMenuItem>
                <NavigationMenuLink
                  render={<Link href="/about" />}
                  className={navigationMenuTriggerStyle()}
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-3">
            <Link
              href={CTA_LINK.href}
              className={cn(
                buttonVariants({ variant: "default" }),
                "hidden h-11 rounded-full px-6 text-[15px] lg:inline-flex"
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
              className="inline-flex size-10 items-center justify-center rounded-full text-foreground hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none lg:hidden"
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
