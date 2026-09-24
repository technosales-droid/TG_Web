import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { formatBlogDate, type BlogCardData, type BlogPost } from "@/data/blogs";
import { PROGRAM_FOR } from "@/lib/blog-article";
import { BlogCover } from "@/components/blogs/blog-cover";
import { cn } from "cn";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function ArticleTakeaways({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <section id="key-takeaways" aria-labelledby="key-takeaways-heading" className="mt-14 scroll-mt-28 rounded-3xl bg-gradient-to-br from-[#0b3d50] to-primary p-6 text-white sm:p-9">
      <h2 id="key-takeaways-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">Key takeaways</h2>
      <ul className="mt-5 grid gap-x-8 gap-y-4 xl:grid-cols-2">
        {items.map((t) => (
          <li key={t} className="flex gap-3 leading-relaxed">
            <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-sky text-[#062c3d]" aria-hidden="true">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            <span className="text-white/95">{t}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** A prompt to the matching Techno Gurukul program. Renders nothing for topics without one. */
export function ProgramCta({ post, className }: { post: BlogPost; className?: string }) {
  const program = PROGRAM_FOR[post.category];
  if (!program) return null;
  return (
    <aside aria-label="Related program" className={cn("rounded-3xl border border-brand-sky/40 bg-brand-sky/10 p-5 sm:p-6", className)}>
      <p className="text-xs font-semibold tracking-[0.2em] text-[#0a4a66] uppercase">Learn it hands-on</p>
      <p className="mt-2 text-lg leading-snug font-semibold text-foreground">{program.question}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Techno Gurukul programs teach {program.topic} through practical, project-based learning.</p>
      <Link href={program.href} className={cn(buttonVariants({ variant: "default" }), "mt-4 h-11 w-full rounded-full text-[15px]")}>
        {program.cta}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </aside>
  );
}

export function ArticleInfo({ post }: { post: BlogPost }) {
  const rows: [string, string][] = [
    ["Category", post.category],
    ["Published", formatBlogDate(post.publishedAt)],
    ["Reading time", `${post.readTime} min`],
    ["Written by", post.author],
  ];
  return (
    <dl className="hidden rounded-3xl border border-primary/10 bg-card p-5 lg:block">
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-baseline justify-between gap-4 border-b border-primary/10 py-2.5 first:pt-0 last:border-0 last:pb-0">
          <dt className="text-sm text-muted-foreground">{k}</dt>
          <dd className="text-right text-sm font-semibold text-foreground">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ArticleAuthor({ post, more }: { post: BlogPost; more: BlogCardData[] }) {
  return (
    <section aria-labelledby="author-heading" className="mt-14 rounded-3xl border border-primary/10 bg-card p-5 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground" aria-hidden="true">TG</span>
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Written by</p>
          <h2 id="author-heading" className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{post.author}</h2>
          <p className="text-sm text-muted-foreground">Editorial team, Techno Gurukul</p>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
            The Techno Gurukul editorial team writes practical explainers on game development, game design, digital marketing and the way people learn
            technology, in the same hands-on spirit as the programs we teach.
          </p>
        </div>
      </div>
      {more.length > 0 && (
        <div className="mt-6 border-t border-primary/10 pt-5">
          <p className="text-sm font-semibold text-foreground">More from the editorial team</p>
          <ul className="mt-3 grid gap-2 md:grid-cols-3">
            {more.map((m) => (
              <li key={m.slug}>
                <Link href={`/blogs/${m.slug}`} className={cn("block h-full rounded-2xl border border-primary/10 p-4 transition-colors hover:bg-muted", FOCUS)}>
                  <span className="text-xs font-semibold tracking-widest text-primary uppercase">{m.category}</span>
                  <span className="mt-1 line-clamp-3 block leading-snug font-semibold text-foreground">{m.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export function ArticleRelated({ posts, category }: { posts: BlogCardData[]; category: string }) {
  if (!posts.length) return null;
  return (
    <section aria-labelledby="related-heading" className="border-t border-primary/10 bg-muted/40 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">Continue reading</p>
            <h2 id="related-heading" className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl xl:text-4xl">
              More on {category.toLowerCase()} and related topics
            </h2>
          </div>
          <Link href="/blogs" className={cn("inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-primary hover:underline", FOCUS)}>
            Browse all articles <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(16,20,28,0.35)]">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <BlogCover post={post} sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 92vw" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold tracking-widest text-primary uppercase">{post.category}</p>
                  <h3 className="mt-2 text-lg leading-snug font-semibold tracking-tight text-foreground">
                    <Link href={`/blogs/${post.slug}`} className={cn("after:absolute after:inset-0 after:rounded-3xl", FOCUS)}>{post.title}</Link>
                  </h3>
                  <p className="mt-auto pt-3 text-sm text-muted-foreground">
                    <time dateTime={post.isoDate}>{post.date}</time> &middot; {post.readTime} min read
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const FINAL: Record<string, { eyebrow: string; headline: string }> = {
  "Game Development": { eyebrow: "Keep building", headline: "Read about games, then make one." },
  "Game Design": { eyebrow: "Keep designing", headline: "Ideas become design when you test them." },
  "Digital Marketing": { eyebrow: "Keep practising", headline: "Strategy sticks when you run the campaign." },
};

export function ArticleFinalCta({ post }: { post: BlogPost }) {
  const program = PROGRAM_FOR[post.category];
  const copy = FINAL[post.category] ?? { eyebrow: "Keep learning", headline: "Learning sticks when you use it." };
  return (
    <section aria-labelledby="article-cta-heading" className="px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0b3d50] via-primary to-brand-sky/80 p-7 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-[0.2em] text-white/80 uppercase">{copy.eyebrow}</p>
          <h2 id="article-cta-heading" className="mt-3 text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl xl:text-4xl">{copy.headline}</h2>
          <p className="mt-3 leading-relaxed text-white/85">
            Techno Gurukul programs are built around practical work: real projects, industry-relevant tools and guidance along the way.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
          <Link href={program?.href ?? "/programs"} className={cn(buttonVariants({ variant: "secondary" }), "h-12 rounded-full px-6 text-base font-semibold")}>
            {program?.cta ?? "Explore our programs"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link href="/blogs" className="inline-flex h-12 items-center justify-center rounded-full border border-white/40 px-6 text-base font-semibold text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            More articles
          </Link>
        </div>
      </div>
    </section>
  );
}
