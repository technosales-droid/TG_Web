import { cn } from "cn";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, H2, INNER, LEAD, SECTION } from "./overview-ui";

const STEPS = [
  { word: "Understand", text: "Build context around what you’re learning and understand why it matters." },
  { word: "Apply", text: "Use new knowledge through practical exercises and guided work." },
  { word: "Experiment", text: "Try different approaches, make mistakes, test ideas and learn through the process." },
  { word: "Improve", text: "Use feedback, reflection and repetition to strengthen your understanding and improve your work." },
];

export function LearningMethod() {
  return (
    <section aria-labelledby="learning-method-heading" className={cn(SECTION, "bg-muted/50")}>
      <div className={cn(INNER, "grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20")}>
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>How learning happens</Eyebrow>
          <h2 id="learning-method-heading" className={cn(H2, "mt-5")}>
            Learning Through Practice.
          </h2>
          <p className={cn(LEAD, "mt-5 max-w-md")}>
            Understanding something is only the beginning. Learning becomes stronger when students apply ideas,
            experiment with them, receive feedback and improve through repetition.
          </p>
        </Reveal>

        <ol className="border-t border-primary/20">
          {STEPS.map((s, i) => (
            <li key={s.word}>
              <Reveal delay={i * 80}>
                <div className="group grid items-baseline gap-x-8 gap-y-3 border-b border-primary/20 py-8 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] sm:py-10">
                  <h3 className="text-4xl leading-none font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary motion-reduce:transition-none sm:text-5xl xl:text-6xl">
                    {s.word}
                  </h3>
                  <p className="max-w-sm text-base leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
