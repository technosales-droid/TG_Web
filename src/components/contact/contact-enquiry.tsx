import { ContactForm } from "./contact-form";
import { ContactInfo } from "./contact-info";
import { GRADIENT_TEXT } from "../learning/curriculum/section-header";

/** The main section: the form is the visual priority, on the right at desktop widths. */
export function ContactEnquiry() {
  return (
    <section aria-labelledby="ct-enquiry-heading" className="px-4 py-10 sm:px-6 sm:py-14 xl:py-20">
      <div className="mx-auto max-w-[1800px] xl:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 xl:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              Get in Touch
            </div>
            <h2 id="ct-enquiry-heading" className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-tight">
              Tell Us What You <span className={GRADIENT_TEXT}>Need Help With.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              You do not need to have everything figured out before you enquire. Give us enough context to understand
              what you are looking for.
            </p>

            <div className="mt-8">
              <ContactInfo />
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
