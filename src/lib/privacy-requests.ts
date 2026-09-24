export const PRIVACY_REQUEST_TYPES = [
  { id: "access", label: "Request access", hint: "Ask what personal information we hold about you." },
  { id: "correction", label: "Request correction", hint: "Ask us to correct information that is wrong or out of date." },
  { id: "deletion", label: "Request deletion", hint: "Ask us to erase your personal information where we are able to." },
  { id: "withdraw-consent", label: "Withdraw consent", hint: "Stop us using your details for contact or promotion, or withdraw your access profile." },
  { id: "question", label: "Privacy question", hint: "Ask anything about how your information is handled, or raise a concern." },
] as const;
export type PrivacyRequestType = (typeof PRIVACY_REQUEST_TYPES)[number]["id"];
