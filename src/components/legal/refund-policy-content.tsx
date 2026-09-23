import { Tbc, LegalNote, type LegalSectionData } from "./legal-layout";

export const HEADING = "Refund & Cancellation Policy";
export const DESCRIPTION =
  "Understand the cancellation, refund and transfer terms that apply to Techno Gurukul programs and services.";
export const LAST_UPDATED = "23 September 2026";

const EMAIL = "hello@technogurukul.com";

export const REFUND_SECTIONS: LegalSectionData[] = [
  {
    id: "scope",
    title: "Scope",
    body: (
      <>
        <p>
          This policy explains how Techno Gurukul handles cancellation, withdrawal, transfer and refund requests for
          paid programs, once a student has enrolled and a fee has been paid. This website does not currently
          process payments online itself; fees for a program are currently arranged and collected directly with
          Techno Gurukul as part of enrollment, outside the website. This policy describes how a request relating to
          that payment is handled.
        </p>
        <LegalNote>
          The specific commercial terms below &mdash; refund windows, percentages and processing timelines &mdash;
          are shown as clearly marked placeholders where Techno Gurukul has not yet published a finalised
          schedule. This page will be updated with exact figures once they are confirmed by the business, rather
          than showing invented numbers.
        </LegalNote>
      </>
    ),
  },
  {
    id: "program-cancellation",
    title: "Program / Course Cancellation",
    body: (
      <p>
        &ldquo;Cancellation&rdquo; in this policy covers two different situations, addressed separately below: a
        student choosing to cancel their own enrollment, and Techno Gurukul cancelling, postponing or rescheduling a
        program or batch. The terms that apply differ depending on which of these applies, and on the timing of the
        request relative to the program&rsquo;s start date.
      </p>
    ),
  },
  {
    id: "student-cancellation",
    title: "Student Cancellation",
    body: (
      <p>
        A student who wishes to cancel their enrollment should notify Techno Gurukul in writing (by email to{" "}
        {EMAIL}), including their full name, the program they enrolled in, their enrollment or payment reference,
        and the reason for cancellation. We will acknowledge the request and confirm the applicable outcome based on
        the sections below.
      </p>
    ),
  },
  {
    id: "cancellation-before-commencement",
    title: "Cancellation Before Program Commencement",
    body: (
      <p>
        Where a student cancels before their program has started, refund eligibility and any applicable refund
        percentage depend on how much advance notice is given. The specific notice windows and corresponding refund
        percentages are <Tbc>REFUND WINDOW TO BE CONFIRMED</Tbc> and <Tbc>REFUND PERCENTAGE TO BE CONFIRMED</Tbc>.
        Once finalised, this section will set out the exact tiers (for example, notice given well in advance versus
        shortly before the start date) and the refund percentage that applies to each.
      </p>
    ),
  },
  {
    id: "cancellation-after-commencement",
    title: "Cancellation After Program Commencement",
    body: (
      <p>
        Once a program has started, any refund for the unused or remaining portion is subject to{" "}
        <Tbc>PROGRAM CANCELLATION TERMS TO BE CONFIRMED</Tbc>. Costs already incurred on your behalf &mdash; such as
        instruction already delivered or materials already provided &mdash; may not be refundable, in line with the
        &ldquo;Non-Refundable Charges&rdquo; section below.
      </p>
    ),
  },
  {
    id: "withdrawal-non-attendance",
    title: "Withdrawal / Non-Attendance",
    body: (
      <p>
        Simply stopping attendance without formally notifying us (non-attendance) does not, by itself, entitle a
        student to a refund. To be considered for any applicable refund, a student must submit a formal cancellation
        request as described under &ldquo;Student Cancellation&rdquo; above.
      </p>
    ),
  },
  {
    id: "transfer-batch-change",
    title: "Transfer / Batch Change",
    body: (
      <p>
        Instead of cancelling outright, a student may request to transfer to a different batch or cohort of the same
        program, subject to seat availability. Whether a transfer is offered free of charge or subject to conditions
        is <Tbc>TRANSFER / BATCH CHANGE TERMS TO BE CONFIRMED</Tbc>. To request a transfer, contact us at {EMAIL}.
      </p>
    ),
  },
  {
    id: "cancellation-by-techno-gurukul",
    title: "Cancellation or Rescheduling by Techno Gurukul",
    body: (
      <p>
        If Techno Gurukul needs to cancel, postpone or reschedule a program or batch &mdash; for example, due to
        insufficient enrollment, instructor availability, or circumstances beyond our control &mdash; we will inform
        enrolled students as early as reasonably possible. In this situation, students will typically be offered the
        choice of transferring to another available batch or receiving a refund of fees paid for that specific
        program, in line with <Tbc>PROGRAM CANCELLATION TERMS TO BE CONFIRMED</Tbc>.
      </p>
    ),
  },
  {
    id: "refund-eligibility",
    title: "Refund Eligibility",
    body: (
      <p>
        Refund eligibility depends on which of the situations above applies to your enrollment, and is assessed on a
        case-by-case basis until a formal, published refund schedule is confirmed by Techno Gurukul. Where a request
        does not clearly fall within a published category, we will explain the applicable outcome directly when you
        contact us.
      </p>
    ),
  },
  {
    id: "non-refundable-charges",
    title: "Non-Refundable Charges",
    body: (
      <p>
        Certain charges may not be refundable regardless of when a cancellation is requested &mdash; for example, a
        registration or application fee (if any), the cost of materials already delivered, or transaction charges
        described below. The full, confirmed list of non-refundable charges is{" "}
        <Tbc>NON-REFUNDABLE CHARGES TO BE CONFIRMED</Tbc>.
      </p>
    ),
  },
  {
    id: "refund-request-process",
    title: "Refund Request Process",
    body: (
      <>
        <p>To request a refund, email {EMAIL} with the following details:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Your full name</li>
          <li>The program you enrolled in</li>
          <li>Your enrollment or payment reference</li>
          <li>The reason for your cancellation or refund request</li>
        </ul>
        <p>We will acknowledge your request, confirm whether it is eligible under this policy, and advise you of the next steps.</p>
      </>
    ),
  },
  {
    id: "refund-processing-timeline",
    title: "Refund Processing Timeline",
    body: (
      <p>
        Once a refund request is approved, we aim to process it within{" "}
        <Tbc>REFUND PROCESSING PERIOD TO BE CONFIRMED</Tbc>, credited back through the original payment method where
        reasonably possible.
      </p>
    ),
  },
  {
    id: "payment-gateway-charges",
    title: "Payment Gateway / Transaction Charges",
    body: (
      <p>
        This website does not currently process payments through an online payment gateway, so no gateway
        transaction charges currently apply. If online payment functionality is introduced in the future, any
        non-refundable transaction or processing charges deducted by that payment gateway would be{" "}
        <Tbc>PAYMENT GATEWAY TRANSACTION CHARGE TERMS TO BE CONFIRMED</Tbc>, and would be disclosed before you are
        asked to pay.
      </p>
    ),
  },
  {
    id: "exceptional-circumstances",
    title: "Exceptional Circumstances",
    body: (
      <p>
        We understand that genuine exceptional circumstances (such as a medical emergency) can affect a student&rsquo;s
        ability to continue a program. Techno Gurukul may, at its discretion, consider requests that fall outside
        the standard terms above on a case-by-case basis. Any accommodation made in one case does not create an
        obligation to make the same accommodation in another.
      </p>
    ),
  },
  {
    id: "consumer-rights",
    title: "Consumer Rights",
    body: (
      <p>
        Nothing in this policy is intended to limit any statutory right available to you as a consumer under
        applicable Indian consumer protection law. This policy is intended to explain our process and supplements,
        rather than replaces, those rights.
      </p>
    ),
  },
  {
    id: "contact-for-refund-requests",
    title: "Contact for Refund Requests",
    body: (
      <p>
        For any question about cancellations, transfers or refunds, contact us at{" "}
        <a href={`mailto:${EMAIL}`} className="font-medium text-primary underline-offset-2 hover:underline">
          {EMAIL}
        </a>
        , or by post at Office No. 305, Platinum Plaza, opp. Ramayan Bungalow, next to Jain Oswal Boarding, Tilak
        Wadi, Police Staff Colony, Nashik, Maharashtra 422002, India.
      </p>
    ),
  },
];
