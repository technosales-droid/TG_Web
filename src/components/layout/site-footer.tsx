import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";

const EXPLORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "Career Paths", href: "/career-paths" },
  { label: "Careers", href: "/careers-placement" },
  { label: "About", href: "/about" },
];

// Programs + core learning pages together, per the brief's single
// "LEARNING" heading. Only the two currently-active programs are listed
// as programs; everything else stays out of the footer entirely rather
// than being presented as available.
const LEARNING_LINKS = [
  { label: "Digital Marketing", href: "/programs/tg-digital-marketing" },
  { label: "Game Development & Design", href: "/programs/tg-gameforge" },
  { label: "Curriculum", href: "/learning/curriculum" },
  { label: "Certifications", href: "/learning/certifications" },
  { label: "Resources", href: "/learning/resources" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms & Conditions", href: "/legal/terms-conditions" },
  { label: "Refund Policy", href: "/legal/refund-policy" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
];

function FooterColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-xs font-semibold tracking-wide text-background/50">{title}</p>
      <ul className="mt-3 flex flex-col">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block py-1.5 text-sm text-background/80 transition-colors duration-200 hover:text-background"
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
        {/* Compact intro CTA - secondary to the homepage's own Section 06 CTA */}
        <div className="flex flex-col gap-4 border-b border-background/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-background">Ready to Start Building?</p>
            <p className="mt-1 text-sm text-background/70">
              Explore practical learning paths and find where you want to
              begin.
            </p>
          </div>
          <Link
            href="/programs"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-10 w-full shrink-0 rounded-full bg-background px-5 text-sm text-foreground hover:bg-background/90 sm:w-auto"
            )}
          >
            Explore Programs
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.9fr_1.2fr] lg:gap-10">
          <div className="order-1">
            <span className="text-xl font-semibold tracking-tight text-background">Techno Gurukul</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-background/70">
              Practical learning for skills you can build with.
            </p>
          </div>

          {/* Contact - deliberately placed right after the brand on mobile,
              since it's the most useful information on a small screen. */}
          <div className="order-2 lg:order-none lg:col-start-4 lg:row-start-1">
            <p className="text-xs font-semibold tracking-wide text-background/50">Get in Touch</p>
            <div className="mt-3 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-background/50" aria-hidden="true" />
                <div>
                  <p className="text-xs text-background/50">Phone</p>
                  {/* No phone number exists in the project yet - honestly
                      labelled rather than a fabricated realistic-looking
                      number. Swap for a tel: link once one is available. */}
                  <p className="text-sm text-background/80">To be added</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-background/50" aria-hidden="true" />
                <div>
                  <p className="text-xs text-background/50">Email</p>
                  <p className="text-sm text-background/80">To be added</p>
                </div>
              </div>
            </div>
            <Link
              href="/contact"
              className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-background transition-colors duration-200 hover:text-brand-green"
            >
              Contact Us
              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </div>

          <FooterColumn title="Explore" links={EXPLORE_LINKS} className="order-3 lg:order-none lg:col-start-2" />
          <FooterColumn title="Learning" links={LEARNING_LINKS} className="order-4 lg:order-none lg:col-start-3" />

          {/* Location + map - stacks below Contact within the same column
              at desktop widths via shared col-start and grid auto-placement. */}
          <div className="order-5 lg:order-none lg:col-start-4 lg:row-start-2">
            <p className="text-xs font-semibold tracking-wide text-background/50">Visit Us</p>
            <p className="mt-3 text-sm text-background/80">Techno Gurukul</p>
            {/* No confirmed institute address exists in the project yet. */}
            <p className="text-sm text-background/50">Location to be announced</p>

            {/* LOCATION MAP — no real address or map embed exists yet for
                this project. Replace with a real map embed/image once a
                location is confirmed. */}
            <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary/50 to-[#0a2f3d] transition-transform duration-300 hover:scale-[1.02]">
              <MapPin className="absolute top-1/2 left-1/2 size-7 -translate-x-1/2 -translate-y-1/2 text-background/70" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-background/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-1 text-sm text-background/60 transition-colors duration-200 hover:text-background"
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
