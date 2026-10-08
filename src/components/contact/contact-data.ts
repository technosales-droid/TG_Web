import { footerContact, footerLocation } from "../layout/footer-data";

// Verified details come from the global footer's single source of truth. Working hours have not been
// supplied yet: leave them `null` and the page shows a clear "not listed yet" state. Set them here
// (the phone lives in footer-data) and the page updates.
export const CONTACT = {
  email: footerContact.email,
  phone: footerContact.phone,
  whatsapp: footerContact.whatsapp,
  hours: null as string | null,
  location: footerLocation,
};

export const ENQUIRY_ID = "enquiry";
