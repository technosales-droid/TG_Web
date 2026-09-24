import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { BlogCover } from "@/components/blogs/blog-cover";
import { formatBlogDate, type BlogPost } from "@/data/blogs";

export function ArticleHero({ post }: { post: BlogPost }) {
  return (
    <header className="relative overflow-hidden border-b border-primary/10 bg-gradient-to-b from-primary/[0.06] to-transparent">
      <div className="mx-auto grid w-full max-w-[1600px] items-center gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14 lg:px-10 lg:py-14 xl:py-16">
        <div>
          <Link
            href="/blogs"
            className="inline-flex min-h-10 items-center gap-2 rounded-full text-sm font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All Articles
          </Link>

          <div className="mt-4 flex items-center gap-2 text-sm font-medium tracking-[0.2em] text-primary uppercase">
            <span className="size-1.5 rounded-full bg-brand-sky" aria-hidden="true" />
            {post.category}
          </div>
          <h1 className="mt-4 text-3xl leading-[1.1] font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg xl:text-xl">{post.excerpt}</p>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground" aria-hidden="true">
                TG
              </span>
              <span>
                <span className="block font-semibold text-foreground">{post.author}</span>
                <span className="block">Techno Gurukul</span>
              </span>
            </div>
            <span className="hidden h-8 w-px bg-primary/15 sm:block" aria-hidden="true" />
            <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden="true" />
              {post.readTime} min read
            </span>
          </div>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-primary/10 bg-muted shadow-[0_24px_50px_-30px_rgba(16,20,28,0.5)] sm:rounded-[2rem]">
          <BlogCover post={post} priority sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
      </div>
    </header>
  );
}
