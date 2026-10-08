import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { BlogsFinalCta } from "@/components/blogs/blogs-final-cta";
import { BlogsFeatured } from "@/components/blogs/blogs-featured";
import { BlogsHero } from "@/components/blogs/blogs-hero";
import { BlogsLibrary } from "@/components/blogs/blogs-library";
import { getBlogPosts, getLatestBlogPosts, toBlogCard } from "@/data/blogs";

export const metadata: Metadata = buildMetadata({
  title: "Blog | Digital Marketing & Game Development | Techno Gurukul",
  description:
    "Practical articles on digital marketing, game development, game design, education and careers from Techno Gurukul: explainers, comparisons and career insight.",
  path: "/blogs",
});

export default function Page() {
  const heroPosts = getLatestBlogPosts(10).map(toBlogCard);
  const all = getBlogPosts().map(toBlogCard);

  return (
    <main>
      <JsonLd data={breadcrumbSchema([{ name: "Articles", path: "/blogs" }])} />
      <BlogsHero posts={heroPosts} />
      <BlogsFeatured latest={all[0]} more={all.slice(1, 5)} />
      <BlogsLibrary posts={all} />
      <BlogsFinalCta />
    </main>
  );
}
