import type { Metadata } from "next";
import { BlogsFinalCta } from "@/components/blogs/blogs-final-cta";
import { BlogsFeatured } from "@/components/blogs/blogs-featured";
import { BlogsHero } from "@/components/blogs/blogs-hero";
import { BlogsLibrary } from "@/components/blogs/blogs-library";
import { getBlogPosts, getLatestBlogPosts, toBlogCard } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Blogs | Techno Gurukul",
  description:
    "Articles on game development, game design, digital marketing, education and careers from Techno Gurukul, practical explainers, comparisons and career insight.",
};

export default function Page() {
  const heroPosts = getLatestBlogPosts(10).map(toBlogCard);
  const all = getBlogPosts().map(toBlogCard);

  return (
    <main>
      <BlogsHero posts={heroPosts} />
      <BlogsFeatured latest={all[0]} more={all.slice(1, 5)} />
      <BlogsLibrary posts={all} />
      <BlogsFinalCta />
    </main>
  );
}
