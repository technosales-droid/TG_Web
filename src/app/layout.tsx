import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const description =
  "Techno Gurukul is built around practical learning — helping students develop creative, technical and digital skills through hands-on education, real projects and industry-relevant tools.";

// ponytail: canonical URL and og:url need the production domain via
// metadataBase; add once it's known rather than guessing one here.
export const metadata: Metadata = {
  title: "Techno Gurukul — Learn. Create. Build What's Next.",
  description,
  openGraph: {
    title: "Techno Gurukul",
    description,
    siteName: "Techno Gurukul",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
