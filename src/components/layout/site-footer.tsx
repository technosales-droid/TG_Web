import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { ABOUT_LINKS, LEARNING_LINKS } from "@/components/navigation/nav-data";

// lucide-react no longer ships brand/logo icons, so these are small inline
// monoline SVGs matching lucide's own style (24x24, stroke, currentColor).
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v1.5A5 5 0 0 1 16 8Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.5 8.5a3 3 0 0 1 3-3h13a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-13a3 3 0 0 1-3-3Z" />
      <path d="m10 9 5 3-5 3Z" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 3h-2a5 5 0 0 0-5 5v3H6v4h2v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1h3Z" />
    </svg>
  );
}

const EXPLORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "Career Paths", href: "/career-paths" },
];

const PROGRAM_LINKS = [
  { label: "Digital Marketing", href: "/programs/tg-digital-marketing" },
  { label: "Game Development & Design", href: "/programs/tg-gameforge" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  ...ABOUT_LINKS,
  { label: "Careers", href: "/careers-placement" },
  { label: "Contact / Enquire", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms & Conditions", href: "/legal/terms-conditions" },
  { label: "Refund Policy", href: "/legal/refund-policy" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
];

// SOCIAL LINKS — visual presence only, no real handles exist yet for this
// project. Swap href="#" for the real profile URLs when available.
const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "LinkedIn", href: "#", icon: LinkedinIcon },
  { label: "YouTube", href: "#", icon: YoutubeIcon },
  { label: "Facebook", href: "#", icon: FacebookIcon },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-wide text-background/50">{title}</p>
      <ul className="mt-2 flex flex-col">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block py-1.5 text-sm text-background/80 transition-colors hover:text-background"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#0b3d50] text-background">
      <div className="mx-auto max-w-[1800px] px-4 py-14 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-6 border-b border-background/10 pb-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xl font-semibold text-background sm:text-2xl">Ready to Start Building?</p>
            <p className="mt-1 text-sm text-background/70">
              Explore practical learning paths and find where you want to begin.
            </p>
          </div>
          <Link
            href="/programs"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-11 w-full shrink-0 rounded-full bg-background px-6 text-base text-foreground hover:bg-background/90 sm:w-auto"
            )}
          >
            Explore Programs
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.1fr]">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <span className="text-xl font-semibold tracking-tight text-background">Techno Gurukul</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-background/70">
              Practical learning for skills you can build with.
            </p>

            <ul className="mt-5 flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <li key={social.label}>
                    <Link
                      href={social.href}
                      aria-label={social.label}
                      className="flex size-9 items-center justify-center rounded-full border border-background/15 text-background/70 transition-colors hover:border-background/30 hover:text-background"
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <FooterColumn title="Explore" links={EXPLORE_LINKS} />

          <div>
            <FooterColumn title="Programs" links={PROGRAM_LINKS} />
            <p className="mt-4 text-xs text-background/50">More learning pathways coming soon.</p>
          </div>

          <FooterColumn title="Learning" links={LEARNING_LINKS} />

          <div>
            <FooterColumn title="Company" links={COMPANY_LINKS} />

            {/* CAMPUS/LOCATION MAP — no real address exists yet for this
                project; placeholder only. Replace with a map embed or
                image once a location is confirmed. */}
            <div className="relative mt-5 aspect-[4/3] w-full max-w-[220px] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/60 to-[#0a2f3d]">
              <MapPin className="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 text-background/70" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-background/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-1 text-sm text-background/60 transition-colors hover:text-background"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Techno Gurukul. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
