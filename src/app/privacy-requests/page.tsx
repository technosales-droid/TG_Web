import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { PrivacyRequestForm } from "@/components/legal/privacy-request-form";
import { BUSINESS } from "@/data/business-facts";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Requests | Techno Gurukul",
  description:
    "Ask Techno Gurukul to access, correct or delete your personal information, withdraw a consent you gave, or ask a privacy question. We reply within 30 days.",
  path: "/privacy-requests",
});

export default function Page() {
  return (
    <main className="px-4 pt-10 pb-20 sm:px-6 sm:pt-14 sm:pb-24">
      <JsonLd data={breadcrumbSchema([{ name: "Privacy Requests", path: "/privacy-requests" }])} />
      <div className="mx-auto max-w-3xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-accent px-3 py-1 text-sm font-medium text-primary">
          <span className="size-1.5 rounded-full bg-brand-sky" aria-hidden="true" />
          Your information
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">Privacy Requests</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          You can ask what personal information we hold about you, ask us to correct or delete it, withdraw a consent you
          gave, or ask a question. Our{" "}
          <Link href="/privacy-policy" className="font-medium text-primary underline underline-offset-2">Privacy Policy</Link>{" "}
          explains your rights and how long we keep information.
        </p>
        <div className="mt-8">
          <PrivacyRequestForm />
        </div>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          Sending this form asks us to look into your request. It does not change or delete anything by itself. We may ask
          you to confirm your identity first. If you would rather write to us, email{" "}
          <a href={`mailto:${BUSINESS.email}`} className="font-medium text-primary underline underline-offset-2">{BUSINESS.email}</a>.
        </p>
      </div>
    </main>
  );
}
