import Link from "next/link";
import type { LegalSectionData } from "./legal-layout";

export const HEADING = "Refund Policy";
export const DESCRIPTION = "The terms and conditions for refund requests, program cancellations and batch transfers at Techno Gurukul.";
export const LAST_UPDATED = "7 October 2026";

const EMAIL = "admission@technogurukul.com";
const A = "font-medium text-primary underline-offset-2 hover:underline";
const UL = "list-disc space-y-2 pl-5";

export const REFUND_SECTIONS: LegalSectionData[] = [
  {
    id: "introduction",
    title: "Introduction",
    body: (
      <>
        <p>
          At Techno Gurukul, we understand that circumstances can change. This Refund Policy outlines the terms and
          conditions for refund requests, program cancellations, and batch transfers. Please read this policy
          carefully before enrolling in any program.
        </p>
        <p>
          <strong className="text-foreground">Quick summary:</strong> Refund requests are evaluated on a
          case-by-case basis by the management team, depending on the specific circumstances. There is no fixed time
          window or guaranteed refund percentage. All decisions are made at the sole discretion of the management.
          Batch transfers are also subject to management approval and depend on seat availability.
        </p>
      </>
    ),
  },
  {
    id: "refund-requests",
    title: "Refund Requests",
    body: (
      <>
        <p>
          A student (or the student&rsquo;s parent/guardian, if the student is under 18) may request a refund by
          writing to <a href={`mailto:${EMAIL}`} className={A}>{EMAIL}</a> with the subject line &ldquo;Refund
          Request &mdash; [Your Full Name].&rdquo;
        </p>
        <p>
          Each refund request is reviewed individually by the management team, considering factors including but not
          limited to the reason for the request, the stage of the program at the time of request, and any relevant
          circumstances. The management team&rsquo;s decision on any refund request is final.
        </p>
        <p>
          Refund requests may be submitted at any point during or after the program. There is no fixed deadline for
          submitting a refund request, although requests submitted earlier are likely to receive faster
          consideration.
        </p>
      </>
    ),
  },
  {
    id: "refund-processing",
    title: "Refund Processing",
    body: (
      <>
        <p>If a refund is approved by the management team:</p>
        <ul className={UL}>
          <li>The refund amount, if any, is determined by the management team based on the specific circumstances of each case. There is no standard or guaranteed refund percentage.</li>
          <li>Payment gateway transaction charges deducted at the time of original payment are non-refundable and will be deducted from the refund amount, if applicable.</li>
          <li>Approved refunds will be processed within 45 business days to the original payment method used at the time of enrollment.</li>
          <li>You will receive a confirmation email once the refund has been initiated. Please note that it may take additional time for the amount to reflect in your bank account or payment platform, depending on your bank or payment provider.</li>
        </ul>
      </>
    ),
  },
  {
    id: "non-refundable-charges",
    title: "Non-Refundable Charges",
    body: (
      <p>
        Non-refundable charges, if any, are determined on a case-by-case basis by the management team depending on
        the circumstances of each situation.
      </p>
    ),
  },
  {
    id: "program-cancellation-by-techno-gurukul",
    title: "Program Cancellation by Techno Gurukul",
    body: (
      <>
        <p>
          Techno Gurukul may cancel a scheduled program under certain circumstances, including but not limited to
          insufficient enrollment, instructor unavailability, or unforeseen events beyond our control.
        </p>
        <p>If Techno Gurukul cancels a program:</p>
        <ul className={UL}>
          <li>All enrolled students will be notified as early as possible before the scheduled batch start date or as soon as the cancellation decision is made.</li>
          <li>
            Students will be offered one or more of the following options, at the management team&rsquo;s
            discretion:
            <ul className={`${UL} mt-2`}>
              <li>A refund of fees paid, processed within 45 business days. The refund amount will be determined based on the specific circumstances.</li>
              <li>A credit note for the full or partial amount, valid for enrollment in the next available batch of the same program or any other program, at the management team&rsquo;s discretion.</li>
              <li>Priority enrollment in the next available batch at no additional cost, subject to availability.</li>
            </ul>
          </li>
          <li>The specific options offered will depend on the timing and reason for the cancellation, and will be communicated directly to affected students.</li>
        </ul>
      </>
    ),
  },
  {
    id: "batch-transfer",
    title: "Batch Transfer",
    body: (
      <>
        <p>
          If you are unable to continue with your enrolled batch due to personal or professional reasons, you may
          request a transfer to a future batch by writing to <a href={`mailto:${EMAIL}`} className={A}>{EMAIL}</a>{" "}
          with the subject line &ldquo;Batch Transfer Request &mdash; [Your Full Name].&rdquo;
        </p>
        <p>
          Batch transfer requests are subject to management approval and depend on seat availability in the target
          batch. There is no guarantee of transfer, and all decisions are made at the sole discretion of the
          management team on a case-by-case basis.
        </p>
        <p>All pending assignments and payments must be completed before a transfer request is considered.</p>
      </>
    ),
  },
  {
    id: "how-to-request-a-refund-or-transfer",
    title: "How to Request a Refund or Transfer",
    body: (
      <>
        <p>To submit a refund or batch transfer request:</p>
        <ul className={UL}>
          <li>Send an email to <a href={`mailto:${EMAIL}`} className={A}>{EMAIL}</a></li>
          <li>Include your full name, contact number, enrolled program, batch start date, and the reason for your request</li>
          <li>Attach any supporting documents if applicable</li>
          <li>Our team will acknowledge your request and review it within a reasonable timeframe</li>
        </ul>
      </>
    ),
  },
  {
    id: "disputes",
    title: "Disputes",
    body: (
      <p>
        If you have a dispute regarding a refund, batch transfer, or any other matter related to your enrollment,
        please contact us first at <a href={`mailto:${EMAIL}`} className={A}>{EMAIL}</a>. We aim to resolve all
        disputes amicably. Any unresolved disputes shall be governed by the dispute resolution provisions in our{" "}
        <Link href="/terms" className={A}>Terms of Use</Link>.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <ul className={UL}>
        <li><strong className="text-foreground">Email:</strong> <a href={`mailto:${EMAIL}`} className={A}>{EMAIL}</a></li>
        <li><strong className="text-foreground">Phone:</strong> <a href="tel:+917387152953" className={A}>+91 73871 52953</a></li>
        <li><strong className="text-foreground">Address:</strong> Office No. 305, Platinum Plaza, opp. Ramayan Bungalow, next to Jain Oswal Boarding, Tilak Wadi, Nashik, Maharashtra</li>
      </ul>
    ),
  },
];
