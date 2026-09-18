import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";

const EXPLORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "Career Paths", href: "/career-paths" },
  { label: "Learning", href: "/learning" },
  { label: "Careers", href: "/careers-placement" },
  { label: "About", href: "/about" },
];

const PROGRAM_LINKS = [
  { label: "Digital Marketing", href: "/programs/tg-digital-marketing" },
  { label: "Game Development & Design", href: "/programs/tg-gameforge" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers-placement" },
  { label: "Contact / Enquire", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms & Conditions", href: "/legal/terms-conditions" },
  { label: "Refund Policy", href: "/legal/refund-policy" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
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
        <div className="flex flex-col gap-10 border-b border-background/10 pb-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-sm">
            <span className="text-xl font-semibold tracking-tight text-background">Techno Gurukul</span>
            <p className="mt-3 text-sm leading-relaxed text-background/70">
              Practical learning for skills you can build with.
            </p>
          </div>

          <div className="max-w-md">
            <p className="text-xl font-semibold text-background sm:text-2xl">Ready to Start Building?</p>
            <p className="mt-2 text-sm leading-relaxed text-background/70">
              Explore practical learning paths and find where you want to
              begin.
            </p>
            <Link
              href="/programs"
              className={cn(
                buttonVariants({ variant: "default" }),
                "mt-5 h-11 w-full rounded-full bg-background px-6 text-base text-foreground hover:bg-background/90 sm:w-auto"
              )}
            >
              Explore Programs
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 border-b border-background/10 py-12 sm:grid-cols-3">
          <FooterColumn title="Explore" links={EXPLORE_LINKS} />
          <div>
            <FooterColumn title="Programs" links={PROGRAM_LINKS} />
            <p className="mt-4 text-xs text-background/50">More learning pathways coming soon.</p>
          </div>
          <FooterColumn title="Company" links={COMPANY_LINKS} />
        </div>

        <div className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
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
