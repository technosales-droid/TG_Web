import { FileText } from "lucide-react";
import { GRADIENT_TEXT, SectionHeader } from "../learning/curriculum/section-header";

// No blog content or content collection exists in the repository yet. This is an honest empty
// state, not a fabricated preview of articles that do not exist.
const SLOTS = 3;

export function BlogsEmpty() {
  return (
    <section aria-labelledby="bl-empty-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <SectionHeader
          id="bl-empty-heading"
          eyebrow="No Posts Yet"
          title={
            <>
              There&rsquo;s Nothing <span className={GRADIENT_TEXT}>Published Here Yet.</span>
            </>
          }
        >
          New articles will appear here as they are written and published.
        </SectionHeader>

        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {Array.from({ length: SLOTS }).map((_, i) => (
            <li
              key={i}
              className="flex flex-col items-center rounded-[2rem] border border-dashed border-primary/25 bg-muted/40 px-6 py-10 text-center"
            >
              <span aria-hidden="true" className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <FileText className="size-7" />
              </span>
              <p className="mt-4 text-base font-semibold tracking-tight text-foreground">Article Coming Soon</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Title, summary and author will appear here.</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
