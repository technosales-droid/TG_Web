import Link from "next/link";
import { BlogCover } from "@/components/blogs/blog-cover";
import type { BlogCardData } from "@/data/blogs";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

function Meta({ post, className }: { post: BlogCardData; className?: string }) {
  return (
    <p className={className}>
      <time dateTime={post.isoDate}>{post.date}</time>
      <span aria-hidden="true" className="mx-2">
        &middot;
      </span>
      {post.readTime} min read
    </p>
  );
}

export function BlogsFeatured({ latest, more }: { latest: BlogCardData; more: BlogCardData[] }) {
  return (
    <section aria-labelledby="latest-heading" className="px-4 pt-14 pb-6 sm:px-6 sm:pt-20">
      <div className="mx-auto max-w-[1400px]">
        <h2 id="latest-heading" className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Latest from Techno Gurukul
        </h2>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)]">
          <Link
            href={`/blogs/${latest.slug}`}
            className={`group relative block aspect-[4/5] overflow-hidden rounded-[2rem] bg-muted sm:aspect-[16/10] lg:aspect-auto lg:min-h-[460px] ${FOCUS}`}
          >
            <span className="absolute inset-0 transition-transform duration-700 ease-out motion-safe:group-hover:scale-105">
              <BlogCover post={latest} sizes="(min-width: 1024px) 60vw, 100vw" />
            </span>
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 block p-6 sm:p-8">
              <span className="inline-flex rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-foreground">
                {latest.category}
              </span>
              <span className="mt-4 block max-w-2xl text-2xl leading-tight font-semibold text-balance text-white sm:text-3xl">
                {latest.title}
              </span>
              <span className="mt-3 line-clamp-2 block max-w-2xl text-base text-white/85">{latest.excerpt}</span>
              <Meta post={latest} className="mt-4 text-sm text-white/75" />
            </span>
          </Link>

          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">Latest posts</h3>
            <ul className="mt-5 grid gap-6">
              {more.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blogs/${post.slug}`} className={`group flex items-start gap-4 rounded-2xl ${FOCUS}`}>
                    <span className="relative block size-20 shrink-0 overflow-hidden rounded-2xl bg-muted sm:size-24">
                      <BlogCover post={post} sizes="96px" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold tracking-widest text-primary uppercase">{post.category}</span>
                      <span className="mt-1 line-clamp-3 block text-base leading-snug font-semibold text-foreground transition-colors group-hover:text-primary">
                        {post.title}
                      </span>
                      <Meta post={post} className="mt-1.5 text-xs text-muted-foreground" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
