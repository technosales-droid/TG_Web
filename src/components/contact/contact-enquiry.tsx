"use client";

import { cn } from "cn";
import { FaWhatsapp } from "react-icons/fa6";
import { trackContact } from "@/lib/track";
import { CONTACT, ENQUIRY_ID } from "./contact-data";
import { ContactForm } from "./contact-form";
import { Reveal } from "./contact-reveal";
import { Eyebrow, FOCUS, INNER } from "./contact-ui";

const LINK = cn("inline-flex min-h-11 items-center rounded text-base font-medium break-all text-foreground hover:text-primary", FOCUS);
const PENDING = <p className="text-base text-muted-foreground">Not listed yet, please email us.</p>;
const WHATSAPP_MESSAGE = "Hi, I'd like to know about your courses";

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
  const { email, phone, whatsapp, whatsappDisplay, hours, location } = CONTACT;

  return (
    <section id={ENQUIRY_ID} aria-labelledby="ct-enquiry-heading" className="scroll-mt-20 bg-muted/50 px-4 py-14 sm:px-6 sm:py-20 xl:py-24">
      <div className={cn(INNER, "grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16 xl:gap-24")}>
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Send an enquiry</Eyebrow>
          <h2 id="ct-enquiry-heading" className="mt-5 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl xl:text-5xl">
            Tell Us What You Need.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Share a few details with us and we&rsquo;ll help you with the right next step.
          </p>

          <div className="mt-8 border-t border-primary/15">
            <Row label="Email">
              {email ? (
                <a href={`mailto:${email}`} onClick={() => trackContact("email")} className={LINK}>
                  {email}
                </a>
              ) : (
                PENDING
              )}
            </Row>
            <Row label="Phone (call a counselor)">
              {phone ? (
                <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} onClick={() => trackContact("phone")} className={LINK}>
                  {phone}
                </a>
              ) : (
                PENDING
              )}
            </Row>
            {/* A different number from Phone above -- see footer-data.ts: this one is a WhatsApp chatbot,
                answers queries and sends brochures, but can't take a voice call. Its own row, with its own
                visible number, rather than an icon-only pill next to Phone's number -- otherwise a visitor
                has no way to tell these are two different numbers at all. */}
            {whatsapp && (
              <Row label="WhatsApp (chat with our assistant)">
                <a
                  href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                  onClick={() => trackContact("whatsapp")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(LINK, "inline-flex items-center gap-2")}
                >
                  <FaWhatsapp className="size-4 text-[#25D366]" aria-hidden="true" />
                  {whatsappDisplay ?? whatsapp}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Row>
            )}
            <Row label="Location">
              <p className="text-base leading-relaxed text-foreground">{location.address ?? location.locality}</p>
              {location.mapUrl && (
                <a href={location.mapUrl} target="_blank" rel="noopener noreferrer" className={cn("inline-flex min-h-11 items-center rounded text-sm font-semibold text-primary underline-offset-2 hover:underline", FOCUS)}>
                  View on Google Maps
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </Row>
            {hours && <Row label="Working hours">
              <p className="text-base font-medium text-foreground">{hours}</p>
            </Row>}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
