import type { Metadata } from "next";
import Link from "next/link";
import { PrivacyRequestForm } from "@/components/legal/privacy-request-form";

export const metadata: Metadata = {
  title: "Privacy Requests | Techno Gurukul",
  description: "Ask to access, correct or delete your personal information, withdraw consent, or ask a privacy question.",
  alternates: { canonical: "/privacy-requests" },
};

export default function Page() {
  return (
    <main className="px-4 pt-10 pb-20 sm:px-6 sm:pt-14 sm:pb-24">
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
          <a href="mailto:admission@technogurukul.com" className="font-medium text-primary underline underline-offset-2">admission@technogurukul.com</a>.
        </p>
      </div>
    </main>
  );
}
