/**
 * Techno Gurukul: writes website submissions into this Google Sheet.
 *
 * Paste this whole file into the Sheet's Apps Script editor (Extensions > Apps Script). Setup steps are in
 * docs/google-sheets-setup.md. The website sends every submission here as JSON:
 *   { kind, sentAt, data, secret }
 * `kind` decides which tab the row goes to. `secret` must equal the WEBHOOK_SECRET script property.
 *
 * Functions you can run from the editor (choose it in the dropdown, then Run):
 *   setup()        Creates or upgrades every tab, dropdowns, colours and the Dashboard. Safe to run again.
 *   healthCheck()  Tells you if the secret is set and every tab exists with the right columns.
 *   deleteAllDataAndStartFresh()  Deletes every tab and all data, then builds clean empty tabs. Asks first.
 */

const VERSION = "4";
const TIMEZONE = "Asia/Kolkata";
const ROOM = 2000; // rows prepared in each tab; more are added automatically

const LEAD_STATUS = ["New", "Contacted", "Interested", "Enrolled", "Not interested", "Do not contact"];
const REQUEST_STATUS = ["New", "In progress", "Done", "Could not verify"];
const REPORT_STATUS = ["New", "Reviewed", "Removed", "Ignored"];

// The columns you use every day come first. Grey columns (from `tech`) are technical details kept for reference.
const LEAD_COLS = [
  "Received at", "Name", "Phone", "Email", "Interested in", "Came from", "Content", "Follow-up OK?", "Lead status", "Notes",
  "Age group", "Guardian consent", "Marketing consent", "Marketing consent at", "Consent given at",
  "Privacy policy version", "Terms version", "Source type", "Source ID", "Lead ID",
];
const LEAD_TAB = { cols: LEAD_COLS, tech: 11, status: "Lead status", options: LEAD_STATUS, dupe: "Email" };

const TABS = {
  "Enquiries": {
    cols: ["Received at", "Name", "Phone", "Email", "Reply by", "Interested in", "Current status", "Message", "Heard about us via",
      "Lead status", "Notes", "Consent given at", "Privacy policy version", "Page", "Enquiry ID"],
    tech: 12, status: "Lead status", options: LEAD_STATUS, dupe: "Email",
  },
  "Blog Comments": LEAD_TAB,
  "Projects": LEAD_TAB,
  "Resources": LEAD_TAB,
  "All Leads": LEAD_TAB,
  "Activity": { cols: ["Time", "Name", "Email", "Opened", "Type", "Action", "Source ID", "Lead ID"], tech: 7 },
  "Privacy Requests": {
    cols: ["Received at", "Request", "Name", "Email", "Message", "Records found", "Status", "Notes", "Privacy policy version", "Request ID"],
    tech: 9, status: "Status", options: REQUEST_STATUS,
  },
  "Reports": {
    cols: ["Time", "Reporter", "Reporter email", "Article", "Item ID", "Reason", "Status", "Notes", "Reporter lead ID", "Report ID"],
    tech: 9, status: "Status", options: REPORT_STATUS,
  },
};

const WIDTH = { "Received at": 150, "Time": 150, "Name": 170, "Phone": 140, "Email": 230, "Message": 380, "Notes": 240, "Content": 260,
  "Opened": 260, "Follow-up OK?": 210, "Reason": 300, "Article": 220, "Request": 160, "Records found": 190, "Reporter": 170 };

const SOURCE_TYPE_LABEL = {
  "blog": "Blog article", "comment": "Blog comment", "review": "Blog review", "resource": "Resource",
  "student-project": "Student project", "faculty-project": "Faculty project", "institute-project": "Institute project",
  "other-project": "Project",
};
const REQUEST_LABEL = {
  "access": "Wants a copy of their data", "correction": "Correct their data", "deletion": "Delete their data",
  "withdraw-consent": "Withdraw consent", "question": "Privacy question",
};

/** Which lead tab a registration belongs to, from what made the visitor register. */
function leadTab(sourceType) {
  if (sourceType === "resource") return "Resources";
  if (/-project$/.test(sourceType)) return "Projects";
  return "Blog Comments"; // blog, comment, review
}

// ---------------------------------------------------------------------------------------------------------------------
// Setup (run from the editor)
// ---------------------------------------------------------------------------------------------------------------------

function setup() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  book.setSpreadsheetTimeZone(TIMEZONE);
  const problems = [];
  Object.keys(TABS).forEach(function (name) {
    try { prepareTab(name); } catch (err) { problems.push(name + ": " + err); }
  });
  try { buildDashboard(); } catch (err) { problems.push("Dashboard: " + err); }
  tell(problems.length
    ? "Some tabs could not be set up. Send this message to whoever maintains the website: " + problems.join(" | ")
    : "Done. Every tab is ready. Tabs from an earlier version were renamed 'Old ...'; delete them when you are sure.");
}

/** Deletes every tab and all data, then builds clean empty tabs. Use it to wipe test data before going live. */
function deleteAllDataAndStartFresh() {
  const ui = SpreadsheetApp.getUi();
  const answer = ui.alert("Delete everything?",
    "This deletes EVERY tab and every lead, enquiry and request in this Sheet, then builds fresh empty tabs. It cannot be undone. Continue?",
    ui.ButtonSet.YES_NO);
  if (answer !== ui.Button.YES) return;
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const keep = book.insertSheet("temporary " + Date.now()); // a Sheet cannot have zero tabs while the others are deleted
  book.getSheets().forEach(function (sh) { if (sh.getSheetId() !== keep.getSheetId()) book.deleteSheet(sh); });
  setup();
  if (book.getSheets().length > 1) book.deleteSheet(keep);
}

/** Shows a message box when run from the editor, and always logs it. */
function tell(msg) {
  Logger.log(msg);
  try { SpreadsheetApp.getUi().alert("Techno Gurukul", msg, SpreadsheetApp.getUi().ButtonSet.OK); } catch (err) { /* no screen to show it on */ }
}

function healthCheck() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const problems = [];
  if (!PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET")) problems.push("WEBHOOK_SECRET is not set (Project Settings > Script properties).");
  Object.keys(TABS).forEach(function (n) {
    const sh = book.getSheetByName(n);
    if (!sh) problems.push("Tab missing: " + n + " (run setup).");
    else if (!headerMatches(sh, TABS[n])) problems.push("Tab '" + n + "' has old or changed column headings (run setup).");
  });
  if (!book.getSheetByName("Dashboard")) problems.push("Tab missing: Dashboard (run setup).");
  const msg = problems.length ? "Problems: " + problems.join(" ") : "All good. Version " + VERSION + ". Deploy a New version if you changed this code.";
  tell(msg);
  return msg;
}

/** True when the first columns of the tab are exactly the expected headings. Columns you add to the right are fine. */
function headerMatches(sheet, spec) {
  const n = spec.cols.length;
  if (sheet.getLastColumn() < n) return false;
  return sheet.getRange(1, 1, 1, n).getValues()[0].join("|") === spec.cols.join("|");
}

function colOf(name, header) { return TABS[name].cols.indexOf(header) + 1; }
function letter(n) { let s = ""; while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; }

/** Creates a tab, or upgrades it. A tab from an older version with different headers is kept and renamed "Old ...". */
function prepareTab(name) {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const spec = TABS[name];
  const n = spec.cols.length;
  let sheet = book.getSheetByName(name);
  if (sheet) {
    if (headerMatches(sheet, spec)) { formatTab(sheet, spec, n); return sheet; }
    sheet.setName(("Old " + name + " " + Utilities.formatDate(new Date(), TIMEZONE, "MMdd-HHmm")).slice(0, 99));
  }
  sheet = book.insertSheet(name);
  if (sheet.getMaxColumns() > n) sheet.deleteColumns(n + 1, sheet.getMaxColumns() - n);
  if (sheet.getMaxRows() < ROOM) sheet.insertRowsAfter(sheet.getMaxRows(), ROOM - sheet.getMaxRows());
  sheet.getRange(1, 1, 1, n).setValues([spec.cols]);
  formatTab(sheet, spec, n);
  return sheet;
}

function formatTab(sheet, spec, n) {
  const max = sheet.getMaxRows();
  const head = sheet.getRange(1, 1, 1, n);
  head.setFontWeight("bold").setFontColor("#ffffff").setBackground("#0c709a").setVerticalAlignment("middle").setWrap(true);
  if (spec.tech <= n) sheet.getRange(1, spec.tech, 1, n - spec.tech + 1).setBackground("#6b7280");
  sheet.setRowHeight(1, 36);
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(2);
  // Plain text everywhere, so nothing a visitor typed can turn into a formula and phone numbers keep their +.
  sheet.getRange(2, 1, max - 1, n).setNumberFormat("@").setVerticalAlignment("top").setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
  spec.cols.forEach(function (c, i) {
    sheet.setColumnWidth(i + 1, WIDTH[c] || (i + 1 >= spec.tech ? 150 : 130));
    if (c === "Message" || c === "Notes" || c === "Reason") sheet.getRange(2, i + 1, max - 1, 1).setWrap(true);
  });
  if (spec.status) {
    const sc = spec.cols.indexOf(spec.status) + 1;
    sheet.getRange(2, sc, max - 1, 1).setDataValidation(
      SpreadsheetApp.newDataValidation().requireValueInList(spec.options, true).setAllowInvalid(true).build());
  }
  if (sheet.getFilter()) sheet.getFilter().remove();
  sheet.getRange(1, 1, max, n).createFilter();

  // Colours that tell the operator what to do without reading every cell.
  const rules = [];
  const all = sheet.getRange(2, 1, max - 1, n);
  if (spec.status) {
    const sl = letter(spec.cols.indexOf(spec.status) + 1);
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=$' + sl + '2="Do not contact"').setFontColor("#9ca3af").setStrikethrough(true).setRanges([all]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=OR($' + sl + '2="Done",$' + sl + '2="Enrolled")').setFontColor("#6b7280").setRanges([all]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=$' + sl + '2="New"').setBackground("#e0f2fe").setRanges([sheet.getRange(2, spec.cols.indexOf(spec.status) + 1, max - 1, 1)]).build());
  }
  const fu = spec.cols.indexOf("Follow-up OK?") + 1;
  if (fu) {
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextStartsWith("No").setBackground("#fef3c7").setRanges([sheet.getRange(2, fu, max - 1, 1)]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextStartsWith("Yes").setBackground("#dbeafe").setRanges([sheet.getRange(2, fu, max - 1, 1)]).build());
  }
  if (spec.dupe) {
    const d = spec.cols.indexOf(spec.dupe) + 1, dl = letter(d);
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=AND($' + dl + '2<>"",COUNTIF($' + dl + '$2:$' + dl + ',$' + dl + '2)>1)').setBackground("#fef9c3").setRanges([sheet.getRange(2, d, max - 1, 1)]).build());
  }
  const age = spec.cols.indexOf("Age group") + 1;
  if (age) rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("minor").setBackground("#fef3c7").setRanges([sheet.getRange(2, age, max - 1, 1)]).build());
  sheet.setConditionalFormatRules(rules);
}

/** A page of counts, made of formulas that update themselves. */
function buildDashboard() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let d = book.getSheetByName("Dashboard");
  if (!d) d = book.insertSheet("Dashboard", 0);
  d.clear();
  const rows = [["Techno Gurukul: what needs attention", "", "", "", ""], ["", "", "", "", ""], ["", "Total", "Today", "Last 7 days", "Waiting (status New)"]];
  const lines = [
    ["Enquiries (Contact page)", "Enquiries"], ["Blog comment and review sign-ups", "Blog Comments"], ["Project sign-ups", "Projects"],
    ["Resource sign-ups", "Resources"], ["Privacy requests", "Privacy Requests"], ["Reported comments", "Reports"],
  ];
  lines.forEach(function (l) {
    const q = "'" + l[1] + "'!", st = TABS[l[1]].status ? letter(colOf(l[1], TABS[l[1]].status)) : "";
    rows.push([
      l[0],
      "=COUNTA(" + q + "A2:A)",
      '=COUNTIF(' + q + 'A2:A,TEXT(TODAY(),"yyyy-mm-dd")&"*")',
      '=SUMPRODUCT(--(LEFT(' + q + 'A2:A,10)>=TEXT(TODAY()-6,"yyyy-mm-dd")))',
      st ? '=COUNTIF(' + q + st + '2:' + st + ',"New")' : "",
    ]);
  });
  const L = "'All Leads'!", em = letter(colOf("All Leads", "Email")), fu = letter(colOf("All Leads", "Follow-up OK?")), ag = letter(colOf("All Leads", "Age group"));
  rows.push(["", "", "", "", ""], ["People who registered (from All Leads)", "", "", "", ""]);
  rows.push(["Different people (by email)", '=IFERROR(COUNTA(UNIQUE(FILTER(' + L + em + '2:' + em + ',' + L + em + '2:' + em + '<>""))),0)', "", "", ""]);
  rows.push(["Agreed to marketing (may follow up)", '=COUNTIF(' + L + fu + '2:' + fu + ',"Yes*")', "", "", ""]);
  rows.push(["Under 18 (do not market to)", '=COUNTIF(' + L + ag + '2:' + ag + ',"minor")', "", "", ""]);
  rows.push(["", "", "", "", ""], ["How to work this Sheet: open a tab, filter Lead status to New, contact the person, then change the status.", "", "", "", ""]);
  rows.push(["Yellow email = the same email appears more than once. Amber = do not market to them. Grey strikethrough = do not contact.", "", "", "", ""]);
  d.getRange(1, 1, rows.length, 5).setValues(rows);
  d.getRange(1, 1).setFontSize(16).setFontWeight("bold").setFontColor("#0c709a");
  d.getRange(3, 1, 1, 5).setFontWeight("bold").setBackground("#0c709a").setFontColor("#ffffff");
  d.getRange(11, 1).setFontWeight("bold");
  d.getRange(4, 2, 6, 4).setHorizontalAlignment("center");
  d.getRange(12, 2, 3, 1).setHorizontalAlignment("center");
  d.setColumnWidth(1, 360); d.setColumnWidths(2, 4, 140);
  d.setHiddenGridlines(true);
}

// ---------------------------------------------------------------------------------------------------------------------
// Receiving
// ---------------------------------------------------------------------------------------------------------------------

function doGet() {
  return out({ ok: true, service: "Techno Gurukul lead receiver", version: VERSION });
}

/**
 * The website sends either one record { kind, sentAt, data, secret } or a batch { kind: "batch", records: [...], secret }.
 * A batch is written in one go, which is what lets many visitors at once be saved in a few seconds instead of one by one.
 * The answer to a batch is { ok: true, results: [{ ok }, ...] } with one result per record, in the same order.
 */
function doPost(e) {
  let body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return out({ ok: false, error: "bad request" }); }
  const expected = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");
  if (!expected || body.secret !== expected) return out({ ok: false, error: "unauthorised" });

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
    if (body.kind === "batch") return out({ ok: true, results: processBatch(body.records || []) });
    const items = [];
    collect(String(body.kind), body.data || {}, body.sentAt, function (tab, id, row) { items.push({ i: 0, tab: tab, id: id, row: row }); });
    const results = [{ ok: true }];
    writeItems(items, results);
    return out(results[0]);
  } catch (err) {
    return out({ ok: false, error: String(err) });
  } finally {
    // Push the writes to the Sheet before letting the next request in. Without this, the next request can still see the
    // old "last row" and write over a row that was just added (a lost sign-up).
    try { SpreadsheetApp.flush(); } catch (ignore) {}
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

/** Works out which tab(s) and which row(s) a record becomes, and hands each to `sink(tab, id, row)`. Writes nothing. */
function collect(kind, d, sentAt, sink) {
  const at = ist(sentAt);
  const id = d.id ? String(d.id) : "";
  if (kind === "lead") {
    const src = d.source || {};
    const row = leadRow(at, d, src);
    sink(leadTab(src.sourceType), id, row);
    sink("All Leads", id, row);
  } else if (kind === "enquiry") {
    sink("Enquiries", id, [
      at, d.name, d.phone, d.email, d.preferredContact || "Any", d.interest, d.currentStatus, d.message, d.heardVia,
      "New", "", ist(d.consentTimestamp), d.privacyPolicyVersion, d.page, id,
    ]);
  } else if (kind === "lead-activity") {
    const lead = findLead(d.leadId);
    const src = d.source || {};
    sink("Activity", id, [
      ist(d.at || sentAt), lead.name, lead.email, d.sourceLabel || src.sourceId, SOURCE_TYPE_LABEL[src.sourceType] || src.sourceType,
      d.action || "opened", src.sourceId, d.leadId,
    ]);
  } else if (kind === "privacy-request") {
    sink("Privacy Requests", id, [
      at, REQUEST_LABEL[d.type] || d.type, d.name, d.email, d.message, recordsFor(d.email), "New", "", d.privacyPolicyVersion, id,
    ]);
  } else if (kind === "content-report") {
    const lead = findLead(d.reporterId);
    sink("Reports", id, [ist(d.at || sentAt), lead.name, lead.email, d.slug, d.itemId, d.reason, "New", "", d.reporterId, id]);
  } else {
    throw new Error("unknown kind");
  }
}

/** Writes a batch. New sign-ups and enquiries go first, so activity and privacy lookups in the same batch can find them. */
function processBatch(records) {
  const results = records.map(function () { return { ok: true }; });
  [true, false].forEach(function (firstPass) {
    const items = [];
    records.forEach(function (rec, i) {
      const isFirst = rec.kind === "lead" || rec.kind === "enquiry";
      if (isFirst !== firstPass) return;
      try {
        collect(String(rec.kind), rec.data || {}, rec.sentAt, function (tab, id, row) { items.push({ i: i, tab: tab, id: id, row: row }); });
      } catch (err) {
        results[i] = { ok: false, error: String(err) };
      }
    });
    writeItems(items, results);
  });
  return results;
}

/**
 * Writes collected rows, one write per tab. A record id that was already written (the website retried a slow request) is
 * skipped, never written twice. A failed tab marks its records as failed so the website can tell the visitor.
 */
function writeItems(items, results) {
  if (!items.length) return;
  const cache = CacheService.getScriptCache();
  const keyOf = function (it) { return it.id ? it.tab + "|" + it.id : ""; };
  const keys = items.map(keyOf).filter(function (k) { return k; });
  const known = keys.length ? cache.getAll(keys) : {};
  const local = {};
  const groups = {};
  items.forEach(function (it) {
    const key = keyOf(it);
    if (key && (known[key] || local[key])) return;
    if (key) local[key] = true;
    (groups[it.tab] = groups[it.tab] || []).push(it);
  });
  Object.keys(groups).forEach(function (tab) {
    try {
      appendMany(tab, groups[tab].map(function (x) { return x.row; }));
      const done = {};
      groups[tab].forEach(function (x) { if (x.id) done[tab + "|" + x.id] = "1"; });
      if (Object.keys(done).length) cache.putAll(done, 21600);
    } catch (err) {
      groups[tab].forEach(function (x) { results[x.i] = { ok: false, error: String(err) }; });
    }
  });
}

function leadRow(at, d, src) {
  const minor = d.ageGroup === "minor";
  const followUp = minor ? "No: under 18" : d.marketingConsent ? "Yes: agreed to marketing" : "No: has not agreed to marketing";
  return [
    at, d.name, d.phone, d.email, d.interest || "", SOURCE_TYPE_LABEL[src.sourceType] || src.sourceType, d.sourceLabel || src.sourceId,
    followUp, "New", "",
    d.ageGroup, minor ? "Parent tick box (not verified)" : "Not needed", d.marketingConsent ? "Yes" : "No",
    d.marketingConsentAt ? ist(d.marketingConsentAt) : "", ist(d.consentTimestamp), d.privacyPolicyVersion, d.termsVersion,
    src.sourceType, src.sourceId, d.id,
  ];
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function ist(iso) {
  if (!iso) return "";
  try { return Utilities.formatDate(new Date(iso), TIMEZONE, "yyyy-MM-dd HH:mm:ss"); } catch (err) { return String(iso); }
}

const checkedTabs = {}; // tabs whose headings were verified during this request

/**
 * The tab to write to. If it is missing, or was laid out by an older version (different columns), the old one is kept
 * and renamed "Old ..." and a correct one is created, so a row can never land under the wrong heading.
 */
function getTab(name) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (sheet && checkedTabs[name]) return sheet;
  const ready = sheet && headerMatches(sheet, TABS[name]) ? sheet : prepareTab(name);
  checkedTabs[name] = true;
  return ready;
}

/** Adds rows at the bottom in one write, and more sheet rows when the tab is full. Cells are already plain text (see setup). */
function appendMany(name, rows) {
  const sheet = getTab(name);
  const n = TABS[name].cols.length;
  const at = sheet.getLastRow() + 1;
  const need = at + rows.length - 1;
  const max = sheet.getMaxRows();
  if (need > max) {
    const add = Math.max(1000, need - max);
    sheet.insertRowsAfter(max, add);
    const from = sheet.getRange(2, 1, 1, n), to = sheet.getRange(max + 1, 1, add, n);
    from.copyTo(to, SpreadsheetApp.CopyPasteType.PASTE_FORMAT, false);
    from.copyTo(to, SpreadsheetApp.CopyPasteType.PASTE_DATA_VALIDATION, false);
  }
  sheet.getRange(at, 1, rows.length, n).setValues(rows.map(function (row) {
    return row.map(function (v) { return v == null ? "" : String(v); });
  }));
}

/** Looks a lead up by id in "All Leads", so Activity and Reports show a name and email. */
function findLead(id) {
  const none = { name: "(not found)", email: "" };
  if (!id) return none;
  const sheet = getTab("All Leads");
  const idCol = colOf("All Leads", "Lead ID");
  const cell = sheet.getRange(1, idCol, Math.max(sheet.getLastRow(), 1), 1).createTextFinder(String(id)).matchEntireCell(true).findNext();
  if (!cell) return none;
  const row = sheet.getRange(cell.getRow(), 1, 1, idCol).getValues()[0];
  return { name: row[colOf("All Leads", "Name") - 1], email: row[colOf("All Leads", "Email") - 1] };
}

/** How many records we hold for an email, so a deletion or access request shows what to look for. */
function recordsFor(email) {
  if (!email) return "";
  const parts = [];
  ["All Leads", "Enquiries"].forEach(function (name) {
    const sheet = getTab(name);
    const last = sheet.getLastRow();
    if (last < 2) return;
    const found = sheet.getRange(2, colOf(name, "Email"), last - 1, 1).createTextFinder(String(email)).matchEntireCell(true).matchCase(false).findAll().length;
    if (found) parts.push((name === "All Leads" ? "Sign-ups: " : "Enquiries: ") + found);
  });
  return parts.length ? parts.join(", ") : "None found";
}
