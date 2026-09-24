import { ABOUT_LINKS, LEARNING_LINKS, type NavLink } from "@/components/navigation/nav-data";

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
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Learning",
    links: LEARNING_LINKS,
  },
  {
    title: "Company",
    links: ABOUT_LINKS,
  },
];

export const footerLegal: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Community Guidelines", href: "/community-guidelines" },
  { label: "Privacy Requests", href: "/privacy-requests" },
  { label: "Refund Policy", href: "/legal/refund-policy" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
  { label: "Contact", href: "/contact" },
];

// Set `href` to the verified profile URL to activate an icon. Still unverified profiles stay `null`.
export type SocialId = "instagram" | "facebook" | "linkedin" | "youtube" | "whatsapp" | "threads" | "pinterest";

export const footerSocials: { id: SocialId; label: string; href: string | null }[] = [
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/_technogurukul_/" },
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/share/1EsCQmrfKt/" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/technogurukul" },
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@techno_gurukul" },
  { id: "whatsapp", label: "WhatsApp", href: null },
  { id: "threads", label: "Threads", href: "https://www.threads.com/@_technogurukul_" },
  { id: "pinterest", label: "Pinterest", href: "https://pin.it/1EuzMsFLY" },
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
