import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { cn } from "cn";
import {
  footerBrand,
  footerContact,
  footerLegal,
  footerLocation,
  footerNavigation,
  footerSocials,
} from "./footer-data";
import { SocialIcon } from "./social-icons";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white focus-visible:rounded-sm";

function SocialLinks() {
  const active = footerSocials.some((s) => s.href);

  return (
    <div>
      <p className="flex items-center gap-2 text-sm font-semibold text-background">
        <span aria-hidden="true" className="h-px w-4 bg-brand-green" />
        Follow Techno Gurukul
      </p>
      <ul className="mt-3 flex flex-wrap gap-2.5">
        {footerSocials.map((s) => (
          <li key={s.id}>
            {s.href ? (
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Techno Gurukul on ${s.label}`}
                className="flex size-10 items-center justify-center rounded-full border border-background/25 text-background transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-green/70 hover:text-brand-green hover:shadow-[0_8px_20px_-8px_rgba(47,174,91,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <SocialIcon id={s.id} className="size-[18px]" />
              </a>
            ) : (
              <span
                aria-hidden="true"
                className="flex size-10 items-center justify-center rounded-full border border-background/15 text-background/40"
              >
                <SocialIcon id={s.id} className="size-[18px]" />
              </span>
            )}
          </li>
        ))}
      </ul>
      {!active && <p className="mt-3 text-sm text-background/65">Social profiles coming soon.</p>}
    </div>
  );
}

function LocationCard() {
  const { name, type, locality, shortAddress, address, mapUrl, mapEmbedUrl } = footerLocation;

  if (mapUrl && mapEmbedUrl) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] border border-background/15 sm:aspect-[2/1] xl:aspect-[21/9]">
        <iframe
          src={mapEmbedUrl}
          title={`Map showing ${name} ${type}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={-1}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full border-0"
        />
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} ${type}, ${address ?? locality} — view on Google Maps`}
          style={{ backgroundImage: "linear-gradient(to top, rgba(8,44,58,0.92) 0%, rgba(8,44,58,0) 55%)" }}
          className="group absolute inset-0 flex items-end justify-end gap-3 p-4 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white sm:justify-between sm:p-5"
        >
          <span className="hidden min-w-0 sm:block">
            <span className="block text-base font-semibold text-background">{name}</span>
            <span className="block text-sm text-background/85">{type}</span>
            <span className="block text-sm text-background/85">{shortAddress ?? locality}</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-background px-3 py-1.5 text-sm font-medium text-[#0b3d50] transition-transform duration-200 motion-safe:group-hover:-translate-y-0.5">
            View on Google Maps
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </a>
      </div>
    );
  }

  const body = (
    <>
      <div aria-hidden="true" className="absolute inset-0 bg-[#0a3444]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div aria-hidden="true" className="absolute top-[34%] left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute -inset-5 rounded-full border border-background/15" />
        <span className="relative flex size-12 items-center justify-center rounded-full bg-background text-[#0b3d50] shadow-[0_10px_24px_-8px_rgba(0,0,0,0.6)]">
          <MapPin className="size-6" />
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-[#082c3a] to-transparent p-4 pt-10 sm:p-5 sm:pt-12">
        <div className="min-w-0">
          <p className="text-base font-semibold text-background">{name}</p>
          <p className="text-sm text-background/80">{type}</p>
          <p className="text-sm text-background/80">{address ?? locality}</p>
        </div>
        {mapUrl && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-background px-3 py-1.5 text-sm font-medium text-[#0b3d50] transition-transform duration-200 motion-safe:group-hover:-translate-y-0.5">
            View on Google Maps
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        )}
      </div>
    </>
  );

  const shell =
    "group relative block aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] border border-background/15 sm:aspect-[2/1] xl:aspect-[21/9]";

  return mapUrl ? (
    <a
      href={mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} ${type}, ${address ?? locality} — view on Google Maps`}
      className={cn(shell, "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white")}
    >
      {body}
    </a>
  ) : (
    <div role="group" aria-label={`${name} ${type}, ${locality}. Full address and map link to be added.`} className={shell}>
      {body}
    </div>
  );
}

export function SiteFooter() {
  const { email, phone } = footerContact;
  const { name, type, locality, address, mapUrl } = footerLocation;

  return (
    <footer className="relative bg-[#0b3d50] text-background before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-brand-green/70 before:to-transparent">
      <div className="relative mx-auto max-w-[1800px] px-4 pt-14 pb-8 sm:px-6 sm:pt-16">
        {/* Layer 2 — brand, navigation, contact */}
        <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] xl:gap-x-16">
          <div className="order-1 max-w-sm xl:col-start-1 xl:row-start-1">
            <Link
              href="/"
              aria-label="Techno Gurukul home"
              className="inline-flex rounded-2xl bg-background px-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Image src="/brand/logo.png" alt="Techno Gurukul" width={1710} height={281} className="h-8 w-auto" />
            </Link>
            <p className="mt-5 text-base leading-relaxed text-background/80">{footerBrand.tagline}</p>
            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>

          <nav
            aria-label="Footer navigation"
            className="order-3 grid grid-cols-2 gap-x-6 gap-y-10 md:order-2 lg:grid-cols-4 xl:col-start-2 xl:row-start-1"
          >
            {footerNavigation.map((group) => (
              <div key={group.title}>
                <h3 className="flex items-center gap-2 text-sm font-semibold tracking-widest text-background/70 uppercase">
                  <span aria-hidden="true" className="h-px w-4 bg-brand-green" />
                  {group.title}
                </h3>
                <ul className="mt-3 flex flex-col">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.href}`}>
                      <Link
                        href={link.href}
                        className={cn(
                          "block py-1.5 text-base text-background/85 transition-colors duration-200 hover:text-background",
                          focusRing
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="order-2 grid gap-8 rounded-[2rem] border border-background/15 bg-gradient-to-br from-background/8 to-background/[0.02] p-5 sm:p-8 md:order-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-12 xl:col-span-2 xl:row-start-2">
            <div className="grid content-start gap-8">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold tracking-widest text-background/70 uppercase">
                  <span aria-hidden="true" className="h-px w-4 bg-brand-green" />
                  Visit {name}
                </h3>
                <p className="mt-3 text-lg font-semibold text-background">{type}</p>
                <p className="mt-1 text-base leading-relaxed text-background/85">{address ?? locality}</p>
                {mapUrl && (
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "mt-3 inline-flex items-center gap-1 py-1 text-base font-medium text-background underline-offset-4 hover:underline",
                      focusRing
                    )}
                  >
                    View on Google Maps
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                )}
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold tracking-widest text-background/70 uppercase">
                  <span aria-hidden="true" className="h-px w-4 bg-brand-green" />
                  Contact
                </h3>
                <ul className="mt-3 flex flex-col gap-1">
                  {email && (
                    <li>
                      <a
                        href={`mailto:${email}`}
                        className={cn(
                          "flex items-center gap-3 py-1.5 text-base break-all text-background/90 transition-colors hover:text-background",
                          focusRing
                        )}
                      >
                        <Mail className="size-5 shrink-0 text-background/70" aria-hidden="true" />
                        {email}
                      </a>
                    </li>
                  )}
                  {phone && (
                    <li>
                      <a
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        className={cn(
                          "flex items-center gap-3 py-1.5 text-base text-background/90 transition-colors hover:text-background",
                          focusRing
                        )}
                      >
                        <Phone className="size-5 shrink-0 text-background/70" aria-hidden="true" />
                        {phone}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <LocationCard />
          </div>
        </div>

        {/* Layer 4 — legal */}
        <div className="mt-12 flex flex-col gap-4 border-t border-background/15 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-background/70">
            © {new Date().getFullYear()} {footerBrand.name}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {footerLegal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block py-1.5 text-sm text-background/75 transition-colors duration-200 hover:text-background",
                      focusRing
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
