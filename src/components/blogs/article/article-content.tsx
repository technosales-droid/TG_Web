import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Lightbulb, Sparkles, Wrench } from "lucide-react";
import type { Block } from "@/data/blog-content/types";
import { headingIds } from "@/lib/blog-article";
import { cn } from "cn";

const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

/** Text with **bold** spans and [links](href). */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(INLINE).map((part, i) => {
        if (part.startsWith("**")) return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (!link) return part;
        const cls = "font-medium text-primary underline underline-offset-4 hover:text-primary/80";
        return link[2].startsWith("/") ? (
          <Link key={i} href={link[2]} className={cls}>{link[1]}</Link>
        ) : (
          <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer" className={cls}>{link[1]}</a>
        );
      })}
    </>
  );
}

const TEXT = "max-w-[52rem]";
const CALLOUT = {
  insight: { icon: Sparkles, label: "Worth noting", tone: "border-primary/25 bg-primary/[0.06]", accent: "text-primary" },
  tip: { icon: Lightbulb, label: "Practical tip", tone: "border-brand-sky/40 bg-brand-sky/10", accent: "text-[#0a4a66]" },
  example: { icon: Wrench, label: "Example", tone: "border-primary/10 bg-muted/70", accent: "text-foreground" },
} as const;

function BlockView({ block, id }: { block: Block; id?: string }) {
  switch (block.type) {
    case "lead":
      return <p className={cn(TEXT, "text-xl leading-relaxed text-foreground sm:text-2xl sm:leading-relaxed")}><Rich text={block.text} /></p>;
    case "h2":
      return (
        <h2 id={id} className={cn(TEXT, "mt-14 scroll-mt-28 border-l-4 border-brand-sky pl-4 text-2xl leading-tight font-semibold tracking-tight text-balance text-foreground sm:text-3xl")}>
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className={cn(TEXT, "mt-9 text-xl font-semibold tracking-tight text-foreground sm:text-2xl")}>{block.text}</h3>;
    case "p":
      return <p className={TEXT}><Rich text={block.text} /></p>;
    case "ul":
    case "ol": {
      const List = block.type;
      return (
        <List className={cn(TEXT, "space-y-2.5 pl-6 marker:text-primary", block.type === "ul" ? "list-disc" : "list-decimal")}>
          {block.items.map((item) => (
            <li key={item} className="pl-1"><Rich text={item} /></li>
          ))}
        </List>
      );
    }
    case "quote":
      return (
        <figure className="my-4 rounded-3xl border border-primary/10 bg-card px-6 py-7 shadow-[0_18px_40px_-30px_rgba(16,20,28,0.4)] sm:px-10 sm:py-9">
          <blockquote className="text-xl leading-snug font-semibold tracking-tight text-balance text-foreground sm:text-2xl lg:text-3xl">
            <span aria-hidden="true" className="text-brand-sky">&ldquo;</span>
            <Rich text={block.text} />
            <span aria-hidden="true" className="text-brand-sky">&rdquo;</span>
          </blockquote>
          {block.cite && <figcaption className="mt-4 text-sm text-muted-foreground">{block.cite}</figcaption>}
        </figure>
      );
    case "callout": {
      const v = CALLOUT[block.variant];
      const Icon = v.icon;
      return (
        <aside className={cn("rounded-2xl border p-5 sm:p-6", v.tone)}>
          <p className={cn("flex items-center gap-2 text-sm font-semibold tracking-wide uppercase", v.accent)}>
            <Icon className="size-4" aria-hidden="true" />
            {block.title ?? v.label}
          </p>
          <p className="mt-2 text-[1.0625rem] leading-relaxed text-foreground"><Rich text={block.text} /></p>
        </aside>
      );
    }
    case "image":
      return (
        <figure>
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-primary/10 bg-muted">
            <Image src={block.src} alt={block.alt} fill sizes="(min-width: 1280px) 960px, 100vw" className="object-cover" />
          </div>
          <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">{block.caption}</figcaption>
        </figure>
      );
    case "table":
      return (
        <figure>
          <div className="overflow-x-auto rounded-2xl border border-primary/10 bg-card">
            <table className="w-full min-w-[32rem] border-collapse text-left text-base">
              <thead>
                <tr className="bg-primary/[0.07]">
                  {block.head.map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 text-sm font-semibold text-foreground sm:px-5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row[0]} className="border-t border-primary/10 align-top">
                    {row.map((cell, i) => (
                      <td key={i} className={cn("px-4 py-3.5 leading-relaxed sm:px-5", i === 0 ? "font-semibold text-foreground" : "text-muted-foreground")}>
                        <Rich text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <figcaption className="mt-3 text-sm text-muted-foreground">{block.caption}</figcaption>}
        </figure>
      );
    case "flow":
      return (
        <figure className="rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/[0.06] to-brand-sky/[0.06] p-5 sm:p-7">
          {block.title && <figcaption className="mb-4 text-sm font-semibold tracking-wide text-primary uppercase">{block.title}</figcaption>}
          <ol className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-2">
            {block.steps.map((s, i) => (
              <li key={s.label} className="flex flex-1 flex-col gap-3 md:flex-row md:items-stretch md:gap-2">
                <div className="flex-1 rounded-2xl border border-primary/10 bg-card p-4">
                  <p className="font-semibold text-foreground">{s.label}</p>
                  {s.text && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>}
                </div>
                {i < block.steps.length - 1 && (
                  <ChevronRight aria-hidden="true" className="hidden size-5 shrink-0 self-center text-primary md:block" />
                )}
              </li>
            ))}
          </ol>
        </figure>
      );
    case "code":
      return (
        <figure>
          <pre className="overflow-x-auto rounded-2xl bg-[#0f1720] p-5 text-sm leading-relaxed text-[#e6edf3]">
            <code lang={block.lang}>{block.code}</code>
          </pre>
          {block.caption && <figcaption className="mt-3 text-sm text-muted-foreground">{block.caption}</figcaption>}
        </figure>
      );
  }
}

export function ArticleContent({ blocks }: { blocks: Block[] }) {
  const { ids } = headingIds(blocks);
  return (
    <div className="flex max-w-[64rem] flex-col gap-6 text-[1.0625rem] leading-[1.85] text-foreground/90 sm:text-[1.125rem] xl:text-[1.1875rem]">
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} id={ids.get(i)} />
      ))}
    </div>
  );
}
