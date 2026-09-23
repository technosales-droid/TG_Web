import { cn } from "cn";
import { CONTACT, ENQUIRY_ID } from "./contact-data";
import { ContactForm } from "./contact-form";
import { Reveal } from "./contact-reveal";
import { Eyebrow, FOCUS, INNER } from "./contact-ui";

const LINK = cn("inline-flex min-h-11 items-center rounded text-base font-medium break-all text-foreground hover:text-primary", FOCUS);
const PENDING = <p className="text-base text-muted-foreground">Not listed yet &mdash; please email us.</p>;

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-primary/15 py-5">
      <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">{label}</p>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

/** One section: introduction and verified contact details on the left, the form on the right. */
export function ContactEnquiry() {
  const { email, phone, hours, location } = CONTACT;

  return (
    <section id={ENQUIRY_ID} aria-labelledby="ct-enquiry-heading" className="scroll-mt-20 bg-muted/50 px-4 py-14 sm:px-6 sm:py-20 xl:py-24">
      <div className={cn(INNER, "grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16 xl:gap-24")}>
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow index="02">Send an enquiry</Eyebrow>
          <h2 id="ct-enquiry-heading" className="mt-5 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-5xl">
            Tell Us What You Need.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Share a few details with us and we&rsquo;ll help you with the right next step.
          </p>

          <div className="mt-8 border-t border-primary/15">
            <Row label="Email">
              {email ? (
                <a href={`mailto:${email}`} className={LINK}>
                  {email}
                </a>
              ) : (
                PENDING
              )}
            </Row>
            <Row label="Phone">
              {phone ? (
                <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className={LINK}>
                  {phone}
                </a>
              ) : (
                PENDING
              )}
            </Row>
            <Row label="Location">
              <p className="text-base leading-relaxed text-foreground">{location.address ?? location.locality}</p>
              {location.mapUrl && (
                <a href={location.mapUrl} target="_blank" rel="noopener noreferrer" className={cn("inline-flex min-h-11 items-center rounded text-sm font-semibold text-primary underline-offset-2 hover:underline", FOCUS)}>
                  View on Google Maps
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </Row>
            <Row label="Working hours">{hours ? <p className="text-base font-medium text-foreground">{hours}</p> : PENDING}</Row>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
