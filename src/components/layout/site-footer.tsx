import Link from "next/link";

const EXPLORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "Career Paths", href: "/career-paths" },
  { label: "About", href: "/about" },
];

const LEARNING_LINKS = [
  { label: "Digital Marketing", href: "/programs/tg-digital-marketing" },
  { label: "Game Development & Design", href: "/programs/tg-gameforge" },
  { label: "Curriculum", href: "/learning/curriculum" },
  { label: "Resources", href: "/learning/resources" },
];

const ABOUT_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Mission", href: "/about/mission" },
  { label: "Careers", href: "/careers-placement" },
  { label: "Contact", href: "/contact" },
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
      <ul className="mt-3 flex flex-col">
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
      <div className="mx-auto max-w-[1800px] px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <span className="text-xl font-semibold tracking-tight text-background">Techno Gurukul</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-background/70">
              Practical learning for skills you can build with.
            </p>
          </div>

          <FooterColumn title="Explore" links={EXPLORE_LINKS} />
          <FooterColumn title="Learning" links={LEARNING_LINKS} />
          <FooterColumn title="About" links={ABOUT_LINKS} />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-background/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Techno Gurukul. All rights reserved.
          </p>
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
        </div>
      </div>
    </footer>
  );
}
