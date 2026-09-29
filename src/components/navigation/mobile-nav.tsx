"use client";

import Link from "next/link";
import {
  CTA_LINK,
  GAME_DEVELOPMENT_PROGRAMS,
  LEARNING_LINKS,
  SIGNATURE_PROGRAM,
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
    <div className="py-1">
      <Link
        href={href}
        onClick={onNavigate}
        className="block rounded-md py-3 font-heading text-base font-semibold text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        {title}
      </Link>
      <ul className="flex flex-col">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              className="block rounded-md py-3 text-[15px] text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
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
      className="absolute inset-x-3 top-full z-40 mt-3 max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain rounded-3xl border border-primary/10 bg-card p-5 shadow-[0_16px_40px_-16px_rgba(16,20,28,0.3)] lg:hidden"
    >
      <div className="py-1">
        <Link
          href="/"
          onClick={onClose}
          className="block rounded-md py-3 font-heading text-base font-semibold text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          Home
        </Link>
      </div>
      <div className="h-px bg-border" />

      <div className="py-1">
        <Link
          href="/programs"
          onClick={onClose}
          className="block rounded-md py-3 font-heading text-base font-semibold text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          Programs
        </Link>
        <ul className="flex flex-col">
          <li>
            <Link
              href={SIGNATURE_PROGRAM.href}
              onClick={onClose}
              className="block rounded-md py-3 text-[15px] font-medium text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {SIGNATURE_PROGRAM.label}: {SIGNATURE_PROGRAM.tagline}
            </Link>
          </li>
          {GAME_DEVELOPMENT_PROGRAMS.map((program) => (
            <li key={program.href}>
              <Link
                href={program.href}
                onClick={onClose}
                className="block rounded-md py-3 text-[15px] text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                {program.label}
              </Link>
            </li>
          ))}
          {SPECIALIZED_PROGRAMS.map((program) => (
            <li key={program.href}>
              <Link
                href={program.href}
                onClick={onClose}
                className="block rounded-md py-3 text-[15px] text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                {program.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-px bg-border" />

      <div className="py-1">
        <Link
          href="/blogs"
          onClick={onClose}
          className="block rounded-md py-3 font-heading text-base font-semibold text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          Blogs
        </Link>
      </div>
      <div className="h-px bg-border" />

      <MobileSection title="Learning" href="/learning" links={LEARNING_LINKS} onNavigate={onClose} />
      <div className="h-px bg-border" />

      <div className="py-1">
        <Link
          href="/about"
          onClick={onClose}
          className="block rounded-md py-3 font-heading text-base font-semibold text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          About
        </Link>
      </div>

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
