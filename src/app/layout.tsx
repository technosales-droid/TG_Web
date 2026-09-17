import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const NAV_LINKS: [string, string][] = [
  ["/", "Home"],
  ["/programs", "Programs"],
  ["/career-paths", "Career Paths"],
  ["/learning", "Learning"],
  ["/careers-placement", "Careers & Placement"],
  ["/faculty", "Faculty"],
  ["/about", "About"],
  ["/student-stories", "Student Stories"],
  ["/admissions", "Admissions"],
  ["/resources", "Resources"],
  ["/contact", "Contact"],
];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Techno Gurukul",
  description: "Techno Gurukul",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav>
          <ul>
            {NAV_LINKS.map(([href, label]) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
