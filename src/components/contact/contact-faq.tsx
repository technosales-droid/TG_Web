import Link from "next/link";
import { GRADIENT_TEXT, SectionHeader } from "../learning/curriculum/section-header";

const FAQS = [
  { q: "What can I enquire about?", a: "Programs, learning, admissions, career direction and general information." },
  {
    q: "Do I need to know which program I want?",
    a: (
      <>
        No. The form includes a &ldquo;Not Sure Yet&rdquo; option for Program / Area of Interest.
      </>
    ),
  },
  {
    q: "Can I ask about career directions?",
    a: (
      <>
        Yes. You can enquire through the form, or explore{" "}
        <Link href="/career-paths" className="font-semibold text-primary underline-offset-2 hover:underline">
          Career Paths
        </Link>{" "}
        first.
      </>
    ),
  },
  {
    q: "Can I explore programs first?",
    a: (
      <>
        Yes.{" "}
        <Link href="/programs" className="font-semibold text-primary underline-offset-2 hover:underline">
          Programs
        </Link>{" "}
        covers the current programme directions before you send an enquiry.
      </>
    ),
  },
];

/** Answers what the form and page can actually support — no invented admissions rules, fees or timings. */
export function ContactFaq() {
  return (
    <section aria-labelledby="ct-faq-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <SectionHeader
          id="ct-faq-heading"
          eyebrow="Common Questions"
          title={
            <>
              A Few Things <span className={GRADIENT_TEXT}>Worth Knowing.</span>
            </>
          }
        />

        <dl className="mt-10 grid gap-x-10 gap-y-2 md:grid-cols-2">
          {FAQS.map((f) => (
            <div key={f.q} className="border-t border-primary/15 py-6">
              <dt className="text-lg font-semibold tracking-tight text-foreground">{f.q}</dt>
              <dd className="mt-1.5 text-base leading-relaxed text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
