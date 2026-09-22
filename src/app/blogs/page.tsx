import type { Metadata } from "next";
import { BlogsEmpty } from "@/components/blogs/blogs-empty";
import { BlogsExplore } from "@/components/blogs/blogs-explore";
import { BlogsFinalCta } from "@/components/blogs/blogs-final-cta";
import { BlogsHero } from "@/components/blogs/blogs-hero";

export const metadata: Metadata = {
  title: "Blogs | Techno Gurukul",
  description: "Articles, updates and practical insights from Techno Gurukul. New posts are on the way.",
};

export default function Page() {
  return (
    <main>
      <BlogsHero />
      <BlogsEmpty />
      <BlogsExplore />
      <BlogsFinalCta />
    </main>
  );
}
