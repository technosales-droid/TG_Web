import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { footerContact, footerLocation } from "../layout/footer-data";

const TOPICS = ["Programs", "Learning", "Admissions", "Career Paths", "Careers & Placement"];

/** Verified contact details only: the email and address already used in the global footer.
 * No phone or social links render — footerContact.phone and every footerSocials href are null. */
export function ContactInfo() {
  const { email } = footerContact;
  const { shortAddress, locality, mapUrl } = footerLocation;

  return (
    <div className="rounded-[2rem] border border-primary/15 bg-card p-6 sm:p-8">
      <h3 className="text-lg font-semibold tracking-tight text-foreground">Contact Details</h3>

      <ul className="mt-5 grid gap-5">
        {email && (
          <li className="flex items-start gap-3.5">
            <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Mail className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">Email</p>
              <a
                href={`mailto:${email}`}
                className="mt-0.5 inline-flex min-h-11 items-center text-base font-medium break-all text-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {email}
              </a>
            </div>
          </li>
        )}

        <li className="flex items-start gap-3.5">
          <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MapPin className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">Visit</p>
            <p className="mt-0.5 text-base font-medium text-foreground">{shortAddress ?? locality}</p>
            {mapUrl && (
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-1 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                View on Google Maps
                <ArrowUpRight className="size-3.5 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </li>
      </ul>

      <p className="mt-6 text-sm font-semibold tracking-widest text-muted-foreground uppercase">You can enquire about</p>
      <ul className="mt-2.5 flex flex-wrap gap-2">
        {TOPICS.map((t) => (
          <li key={t} className="rounded-full border border-primary/20 bg-muted/60 px-3.5 py-1.5 text-sm font-medium text-foreground">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
