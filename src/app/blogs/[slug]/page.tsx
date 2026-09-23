import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { BlogCover } from "@/components/blogs/blog-cover";
import { BlogFeedback } from "@/components/blogs/blog-feedback";
import { formatBlogDate, getBlogPost, getBlogPosts, toBlogCard, type BlogCategory } from "@/data/blogs";

const PROGRAM_LINK: Record<BlogCategory, { href: string; label: string }> = {
  "Game Development": { href: "/programs?category=game-development#programs-listing", label: "Explore Game Development programs" },
  "Game Design": { href: "/programs?category=game-design#programs-listing", label: "Explore Game Design programs" },
  "Digital Marketing": { href: "/programs/tg-digital-marketing", label: "Explore the Digital Marketing program" },
  Education: { href: "/programs", label: "Explore our programs" },
  Careers: { href: "/programs", label: "Explore our programs" },
  Technology: { href: "/programs", label: "Explore our programs" },
};

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Techno Gurukul`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      ...(post.heroImage ? { images: [post.heroImage] } : {}),
    },
  };
}

// Paragraphs may contain **bold** spans.
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-foreground">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const others = getBlogPosts().filter((p) => p.slug !== post.slug);
  const related = [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)]
    .slice(0, 3)
    .map(toBlogCard);
  const program = PROGRAM_LINK[post.category];

  return (
    <main>
      <header className="relative -mt-[5.25rem] flex min-h-[70svh] flex-col justify-end overflow-hidden bg-black">
        <BlogCover post={post} sizes="100vw" priority />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-[1100px] px-5 pt-32 pb-10 sm:px-10 sm:pb-14">
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-white/85 uppercase transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <ArrowLeft className="size-4 transition-transform duration-300 motion-safe:group-hover:-translate-x-1" aria-hidden="true" />
            All articles
          </Link>
          <p className="mt-6 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-white uppercase sm:text-sm">
            <span aria-hidden="true" className="h-px w-8 bg-brand-green" />
            {post.category}
          </p>
          <h1 className="mt-4 max-w-[900px] text-3xl leading-[1.08] font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl xl:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 text-sm text-white/80">
            {post.author}
            <span aria-hidden="true" className="mx-2">
              &middot;
            </span>
            <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
            <span aria-hidden="true" className="mx-2">
              &middot;
            </span>
            {post.readTime} min read
          </p>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-6 sm:py-16">
        <p className="text-xl leading-relaxed font-medium text-foreground sm:text-2xl">{post.excerpt}</p>
        {post.sections.map((section, i) => (
          <section key={i} className="mt-10">
            {section.heading && (
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{section.heading}</h2>
            )}
            {section.paragraphs.map((text, j) => (
              <p key={j} className="mt-4 text-lg leading-8 text-foreground/85">
                <Rich text={text} />
              </p>
            ))}
          </section>
        ))}
      </article>

      <div className="mx-auto max-w-5xl px-5 pb-16 sm:px-6 sm:pb-20">
        <BlogFeedback slug={post.slug} />
      </div>

      <section aria-labelledby="more-heading" className="border-t border-primary/10 bg-muted/50 px-5 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1400px]">
          <h2 id="more-heading" className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            What to explore next
          </h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blogs/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-primary/10 bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(16,20,28,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span className="relative block aspect-video overflow-hidden bg-muted">
                    <span className="absolute inset-0 transition-transform duration-500 motion-safe:group-hover:scale-105">
                      <BlogCover post={p} sizes="(min-width: 768px) 30vw, 92vw" />
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <span className="text-xs font-semibold tracking-widest text-primary uppercase">{p.category}</span>
                    <span className="mt-2 text-lg leading-snug font-semibold text-foreground">{p.title}</span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-foreground group-hover:text-primary">
                      Read article
                      <ArrowRight className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-gradient-to-br from-primary to-[#0b3d50] px-6 py-9 sm:flex-row sm:items-center sm:px-10">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Explore Techno Gurukul Programs</h2>
              <p className="mt-2 max-w-xl text-base text-white/85">
                Practical, project-led learning in game development, game design and digital marketing.
              </p>
            </div>
            <Link
              href={program.href}
              className="group inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-white px-6 text-base font-semibold text-[#0b3d50] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {program.label}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
