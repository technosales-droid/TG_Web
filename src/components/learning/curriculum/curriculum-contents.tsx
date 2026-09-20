import { cn } from "cn";
import { CONTENT_LAYERS } from "./curriculum-data";
import { GRADIENT_TEXT, SectionHeader } from "./section-header";

// A "curriculum map": four layers, each a little further along and a little stronger. Layers step to
// the right from tablet up using margin, so nothing can leave the container.
const LAYER = [
  "border-primary/10 bg-card",
  "border-primary/20 bg-primary/5 sm:ml-6 lg:ml-10",
  "border-primary/30 bg-primary/10 sm:ml-12 lg:ml-20",
  "border-transparent bg-gradient-to-br from-[#0b3d50] via-[#0d5674] to-primary text-background sm:ml-[4.5rem] lg:ml-32",
];

export function CurriculumContents() {
  return (
    <section id="curriculum-contents" aria-labelledby="curriculum-contents-heading" className="scroll-mt-28 px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 xl:gap-20">
          <SectionHeader
            id="curriculum-contents-heading"
            eyebrow="Inside the Learning"
            title={
              <>
                A Curriculum Is More Than{" "}
                <span className={cn("inline-block", GRADIENT_TEXT)}>a List of Topics.</span>
              </>
            }
          >
            A well-built curriculum can include several kinds of learning activity, each with its own purpose.
          </SectionHeader>

          <ol aria-label="What a curriculum can contain" className="grid gap-4">
            {CONTENT_LAYERS.map((layer, i) => (
              <li
                key={layer.title}
                className={cn(
                  "group rounded-3xl border p-5 transition-all duration-300 hover:shadow-[0_20px_40px_-24px_rgba(16,20,28,0.4)] motion-safe:hover:-translate-y-1 sm:p-6",
                  LAYER[i]
                )}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    <span
                      aria-hidden="true"
                      className={cn("mr-3 text-sm font-semibold tracking-widest", i === 3 ? "text-background/60" : "text-muted-foreground")}
                    >
                      0{i + 1}
                    </span>
                    {layer.title}
                  </h3>
                  <ul className="flex flex-wrap gap-2 sm:justify-end">
                    {layer.items.map((item) => (
                      <li
                        key={item}
                        className={cn(
                          "rounded-full border px-3.5 py-1.5 text-sm font-medium",
                          i === 3 ? "border-background/30 bg-background/10" : "border-primary/15 bg-background"
                        )}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
