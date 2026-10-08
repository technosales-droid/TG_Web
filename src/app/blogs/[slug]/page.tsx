import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleContent } from "@/components/blogs/article/article-content";
import { ArticleFeedback } from "@/components/blogs/article/article-feedback";
import { BLOG_FEEDBACK_ENABLED } from "@/lib/feature-flags";
import { ArticleAuthor, ArticleFinalCta, ArticleInfo, ArticleRelated, ArticleTakeaways, ProgramCta } from "@/components/blogs/article/article-extras";
import { ArticleHero } from "@/components/blogs/article/article-hero";
import { ArticleToc } from "@/components/blogs/article/article-toc";
import { JsonLd } from "@/components/seo/json-ld";
import { getBlogPost, getBlogPosts, toBlogCard, type BlogPost } from "@/data/blogs";
import { headingIds, PROGRAM_FOR, RELATED_CATEGORIES, TAIL_TOC } from "@/lib/blog-article";
import { SITE_URL } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { ORG_ID } from "@/data/business-facts";
import { breadcrumbSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    ...buildMetadata({
      title: `${post.title} | Techno Gurukul`,
      description: post.excerpt,
      path: `/blogs/${post.slug}`,
      type: "article",
      article: { publishedTime: post.publishedAt, authors: [post.author], section: post.category },
      ...(post.heroImage ? { image: { url: post.heroImage, alt: post.heroImageAlt } } : {}),
    }),
    authors: [{ name: post.author }],
  };
}

/** Same category first, then the closest related categories, then anything else, newest first within each group. */
function relatedTo(post: BlogPost, count: number) {
  const affinity = [post.category, ...RELATED_CATEGORIES[post.category]];
  const rank = (p: BlogPost) => {
    const i = affinity.indexOf(p.category);
    return i === -1 ? affinity.length : i;
  };
  return getBlogPosts()
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => rank(a) - rank(b) || b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, count)
    .map(toBlogCard);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blogs/${post.slug}`;
  const toc = [...headingIds(post.blocks).items, ...(post.takeaways.length ? TAIL_TOC : TAIL_TOC.slice(1))];
  const more = getBlogPosts().filter((p) => p.slug !== post.slug).slice(0, 3).map(toBlogCard);
  const program = PROGRAM_FOR[post.category];

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          url,
          mainEntityOfPage: url,
          datePublished: post.publishedAt,
          dateModified: post.publishedAt,
          articleSection: post.category,
          ...(post.heroImage ? { image: `${SITE_URL}${post.heroImage}` } : {}),
          author: { "@type": "Organization", name: post.author },
          publisher: { "@id": ORG_ID },
          ...(program ? { about: { "@id": `${SITE_URL}${program.href}/#course` } } : {}),
        }}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Articles", path: "/blogs" }, { name: post.title, path: `/blogs/${post.slug}` }])} />

      <ArticleHero post={post} />

      <div className="mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-14">
          <div className="min-w-0">
            <ArticleToc items={toc} variant="mobile" />
            <article>
              <ArticleContent blocks={post.blocks} />
            </article>
            <ArticleTakeaways items={post.takeaways} />
            <ProgramCta post={post} className="mt-10 lg:hidden" />
            <ArticleAuthor post={post} more={more} />
            {BLOG_FEEDBACK_ENABLED && (
              <div className="max-w-[64rem]">
                <ArticleFeedback slug={post.slug} />
              </div>
            )}
          </div>

          <aside aria-label="Article information" className="space-y-5 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto">
            <ArticleToc items={toc} variant="side" />
            <ArticleInfo post={post} />
            <ProgramCta post={post} className="hidden lg:block" />
          </aside>
        </div>
      </div>

      <ArticleRelated posts={relatedTo(post, 4)} category={post.category} />
      <ArticleFinalCta post={post} />
    </main>
  );
}
