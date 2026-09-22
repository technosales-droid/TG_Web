import {
  ABOUT_LINKS,
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
      { label: "Blogs", href: "/blogs" },
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

// Office number and building were provided by the team; the rest of the address is the place
// Google Maps resolves for the team's share link (XQXG+VJ2 Platinum Plaza, Tilak Wadi, Nashik).
export const footerLocation: {
  name: string;
  type: string;
  locality: string;
  shortAddress: string | null;
  address: string | null;
  mapUrl: string | null;
  mapEmbedUrl: string | null;
} = {
  name: "Techno Gurukul",
  type: "Learning Institute",
  locality: "Nashik, Maharashtra, India",
  shortAddress: "Office No. 305, Platinum Plaza",
  address:
    "Office No. 305, Platinum Plaza, opp. Ramayan Bungalow, next to Jain Oswal Boarding, Tilak Wadi, Police Staff Colony, Nashik, Maharashtra 422002",
  mapUrl: "https://maps.app.goo.gl/HhqURkxhHpr5fCt29",
  mapEmbedUrl:
    "https://www.google.com/maps?q=XQXG%2BVJ2%20Platinum%20Plaza%2C%20Tilak%20Wadi%2C%20Nashik%2C%20Maharashtra%20422002&z=16&output=embed",
};
