"use client";

import Link from "next/link";
import {
  ABOUT_LINKS,
  CAREERS_LINKS,
  CTA_LINK,
  DIGITAL_MARKETING_PROGRAMS,
  FLAGSHIP_PROGRAM,
  LEARNING_LINKS,
  SPECIALIZED_PROGRAMS,
  type NavLink,
} from "@/components/navigation/nav-data";

function MobileSection({
  title,
  href,
  links,
  onNavigate,
}: {
  title: string;
  href: string;
  links: NavLink[];
  onNavigate: () => void;
}) {
  return (
    <div className="py-3">
      <Link
        href={href}
        onClick={onNavigate}
        className="block font-heading text-base font-semibold text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-md"
      >
        {title}
      </Link>
      <ul className="mt-2 flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              className="block text-sm text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-md"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      id="mobile-nav-panel"
      hidden={!open}
      className="absolute inset-x-3 top-full z-40 mt-3 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-3xl border border-primary/10 bg-card p-5 shadow-[0_16px_40px_-16px_rgba(16,20,28,0.3)] lg:hidden"
    >
      <div className="py-2">
        <Link
          href="/"
          onClick={onClose}
          className="block font-heading text-base font-semibold text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-md"
        >
          Home
        </Link>
      </div>
      <div className="h-px bg-border" />

      <div className="py-3">
        <Link
          href="/programs"
          onClick={onClose}
          className="block font-heading text-base font-semibold text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-md"
        >
          Programs
        </Link>
        <ul className="mt-2 flex flex-col gap-2">
          <li>
            <Link
              href={FLAGSHIP_PROGRAM.href}
              onClick={onClose}
              className="block text-sm font-medium text-primary"
            >
              {FLAGSHIP_PROGRAM.label} — {FLAGSHIP_PROGRAM.tagline}
            </Link>
          </li>
          {SPECIALIZED_PROGRAMS.map((program) => (
            <li key={program.href}>
              <Link
                href={program.href}
                onClick={onClose}
                className="block text-sm text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-md"
              >
                {program.label}
              </Link>
            </li>
          ))}
          {DIGITAL_MARKETING_PROGRAMS.map((program) => (
            <li key={program.href}>
              <Link
                href={program.href}
                onClick={onClose}
                className="block text-sm text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-md"
              >
                {program.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-px bg-border" />

      <div className="py-3">
        <Link
          href="/career-paths"
          onClick={onClose}
          className="block font-heading text-base font-semibold text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-md"
        >
          Career Paths
        </Link>
      </div>
      <div className="h-px bg-border" />

      <MobileSection title="Learning" href="/learning" links={LEARNING_LINKS} onNavigate={onClose} />
      <div className="h-px bg-border" />
      <MobileSection title="Careers" href="/careers-placement" links={CAREERS_LINKS} onNavigate={onClose} />
      <div className="h-px bg-border" />
      <MobileSection title="About" href="/about" links={ABOUT_LINKS} onNavigate={onClose} />

      <Link
        href={CTA_LINK.href}
        onClick={onClose}
        className="mt-4 flex h-11 w-full items-center justify-center rounded-full bg-primary px-5 text-[15px] font-medium text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        {CTA_LINK.label}
      </Link>
    </div>
  );
}
