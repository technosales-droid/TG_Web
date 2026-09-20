import {
  ABOUT_LINKS,
  CTA_LINK,
  DIGITAL_MARKETING_PROGRAMS,
  FLAGSHIP_PROGRAM,
  LEARNING_LINKS,
  type NavLink,
} from "@/components/navigation/nav-data";

// Single source of truth for the global footer. Every value that is not yet verified is `null`;
// the footer only renders a value once it is filled in here.

export const footerBrand = {
  name: "Techno Gurukul",
  tagline: "Practical learning for skills you can build with.",
} as const;

export const footerCta = {
  eyebrow: "Ready to start building?",
  text: "Build practical skills. Explore a program, find your path, or talk to Techno Gurukul.",
  primary: { label: "Explore Programs", href: "/programs" } satisfies NavLink,
  secondary: CTA_LINK,
} as const;

export interface FooterGroup {
  title: string;
  links: NavLink[];
}

export const footerNavigation: FooterGroup[] = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Programs", href: "/programs" },
      { label: "Career Paths", href: "/career-paths" },
      { label: "Learning", href: "/learning" },
      { label: "Careers", href: "/careers-placement" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Programs",
    links: [
      { label: "Digital Marketing", href: DIGITAL_MARKETING_PROGRAMS[0].href },
      { label: "Game Development & Design", href: FLAGSHIP_PROGRAM.href },
    ],
  },
  {
    title: "Learning",
    links: LEARNING_LINKS,
  },
  {
    title: "Company",
    links: [{ label: "About Us", href: "/about" }, ...ABOUT_LINKS],
  },
];

export const footerLegal: NavLink[] = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms & Conditions", href: "/legal/terms-conditions" },
  { label: "Refund Policy", href: "/legal/refund-policy" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
];

// Set `href` to the verified profile URL to activate an icon. No profile URLs exist in the
// project or source yet, so all are `null`.
export type SocialId = "instagram" | "facebook" | "linkedin" | "youtube" | "whatsapp";

export const footerSocials: { id: SocialId; label: string; href: string | null }[] = [
  { id: "instagram", label: "Instagram", href: null },
  { id: "facebook", label: "Facebook", href: null },
  { id: "linkedin", label: "LinkedIn", href: null },
  { id: "youtube", label: "YouTube", href: null },
  { id: "whatsapp", label: "WhatsApp", href: null },
];

// The web copy's Contact page lists the email below; its phone (0000000000) and address
// ("Address, Address…") are placeholders, so those stay `null` until real values exist.
export const footerContact: { email: string | null; phone: string | null } = {
  email: "hello@technogurukul.com",
  phone: null,
};

// Only the city is stated in the source ("based in Nashik, Maharashtra, India").
// Add the verified street address and Google Maps URL here to activate the address and map link.
export const footerLocation: {
  name: string;
  type: string;
  locality: string;
  address: string | null;
  mapUrl: string | null;
} = {
  name: "Techno Gurukul",
  type: "Learning Institute",
  locality: "Nashik, Maharashtra, India",
  address: null,
  mapUrl: null,
};
