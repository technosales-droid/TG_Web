/**
 * Techno Gurukul: writes website submissions into this Google Sheet.
 *
 * Paste this whole file into the Sheet's Apps Script editor (Extensions > Apps Script). Setup steps are in
 * docs/google-sheets-setup.md. The website sends every submission here as JSON:
 *   { kind, sentAt, data, secret }
 * `kind` decides which tab the row goes to. `secret` must equal the WEBHOOK_SECRET script property.
 */

const TIMEZONE = "Asia/Kolkata";

// Columns for lead tabs (someone who created an access profile to open content or to comment or review).
const LEAD_COLUMNS = [
  "Received at", "Lead ID", "Name", "Email", "Phone", "Interested in", "Age group", "Guardian consent",
  "Marketing consent", "Marketing consent at", "Consent given at", "Privacy policy version", "Terms version",
  "Source type", "Source ID", "Lead status", "Notes",
];

// Every tab and its columns. "Lead status" and "Notes" and "Status" are for your team to fill in.
const TABS = {
  "Enquiries": [
    "Received at", "Enquiry ID", "Name", "Email", "Phone", "Interested in", "Current status", "Preferred contact",
    "Heard about us via", "Message", "Consent given at", "Privacy policy version", "Page", "Lead status", "Notes",
  ],
  "Blog Comments": LEAD_COLUMNS,
  "Projects": LEAD_COLUMNS,
  "Resources": LEAD_COLUMNS,
  "All Leads": LEAD_COLUMNS,
  "Activity": ["Time", "Lead ID", "Name", "Email", "Source type", "Source ID", "Action"],
  "Privacy Requests": ["Received at", "Request type", "Name", "Email", "Message", "Privacy policy version", "Status", "Notes"],
  "Reports": ["Time", "Reporter lead ID", "Article", "Item ID", "Reason", "Status"],
};

/** Which lead tab a registration belongs to, from what made the visitor register. */
function leadTab(sourceType) {
  if (sourceType === "resource") return "Resources";
  if (/-project$/.test(sourceType)) return "Projects";
  return "Blog Comments"; // blog, comment, review
}

/** Run once from the editor (Run > setup) to create every tab with its header row. */
function setup() {
  Object.keys(TABS).forEach(function (name) { getTab(name); });
}

function doGet() {
  return out({ ok: true, service: "Techno Gurukul lead receiver" });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const body = JSON.parse(e.postData.contents);
    const expected = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");
    if (!expected || body.secret !== expected) return out({ ok: false, error: "unauthorised" });
    lock.waitLock(20000);

    const d = body.data || {};
    const at = ist(body.sentAt);

    if (body.kind === "lead") {
      const src = d.source || {};
      const row = [
        at, d.id, d.name, d.email, d.phone, d.interest || "", d.ageGroup, d.guardianConsent,
        d.marketingConsent ? "Yes" : "No", d.marketingConsentAt ? ist(d.marketingConsentAt) : "",
        ist(d.consentTimestamp), d.privacyPolicyVersion, d.termsVersion, src.sourceType, src.sourceId, "", "",
      ];
      append(leadTab(src.sourceType), row);
      append("All Leads", row);
    } else if (body.kind === "enquiry") {
      append("Enquiries", [
        at, d.id, d.name, d.email, d.phone, d.interest, d.currentStatus, d.preferredContact, d.heardVia,
        d.message, ist(d.consentTimestamp), d.privacyPolicyVersion, d.page, "", "",
      ]);
    } else if (body.kind === "lead-activity") {
      const lead = findLead(d.leadId);
      const src = d.source || {};
      append("Activity", [ist(d.at || body.sentAt), d.leadId, lead.name, lead.email, src.sourceType, src.sourceId, d.action || "opened"]);
    } else if (body.kind === "privacy-request") {
      append("Privacy Requests", [at, d.type, d.name, d.email, d.message, d.privacyPolicyVersion, "New", ""]);
    } else if (body.kind === "content-report") {
      append("Reports", [ist(d.at || body.sentAt), d.reporterId, d.slug, d.itemId, d.reason, "New"]);
    } else {
      return out({ ok: false, error: "unknown kind" });
    }
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function ist(iso) {
  return iso ? Utilities.formatDate(new Date(iso), TIMEZONE, "yyyy-MM-dd HH:mm:ss") : "";
}

/** Finds a tab, creating it with a header row the first time. */
function getTab(name) {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName(name);
  if (!sheet) {
    sheet = book.insertSheet(name);
    const header = TABS[name];
    sheet.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight("bold").setBackground("#e6f2f6");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Adds a row as plain text, so nothing a visitor typed can run as a spreadsheet formula. */
function append(name, row) {
  const sheet = getTab(name);
  const range = sheet.getRange(sheet.getLastRow() + 1, 1, 1, row.length);
  range.setNumberFormat("@").setValues([row.map(function (v) { return v == null ? "" : String(v); })]);
}

/** Looks a lead up by id in "All Leads", so the Activity tab shows a name and email. */
function findLead(id) {
  if (!id) return { name: "", email: "" };
  const sheet = getTab("All Leads");
  const cell = sheet.getRange("B:B").createTextFinder(String(id)).matchEntireCell(true).findNext();
  if (!cell) return { name: "", email: "" };
  const row = sheet.getRange(cell.getRow(), 1, 1, 4).getValues()[0];
  return { name: row[2], email: row[3] };
}
