# Connect the website to a Google Sheet

The website sends every submission to a small Google Apps Script that lives inside your Google Sheet and writes each one
into the right tab. No CRM is needed. Allow about 30 minutes the first time, 5 minutes to upgrade.

## What lands where

| Tab | What goes in it | Comes from |
|---|---|---|
| Dashboard | Counts that update themselves: totals, today, last 7 days, waiting for you | Formulas |
| Enquiries | Every Contact page enquiry | The Contact form |
| Blog Comments | People who registered to comment or review | The access form, opened from a blog article |
| Projects | People who registered to open a project | The access form, opened from a project card |
| Resources | People who registered to open a resource | The access form, opened from a resource card |
| All Leads | Every registration, from any of the three | The access form |
| Activity | Each time a registered person opens a project or resource | Gated content |
| Privacy Requests | Access, correction, deletion, consent withdrawal and questions | The Privacy Requests page |
| Reports | Reported comments | Not used: the report route is switched off until comments are saved on the server |

The columns you use every day are on the left. Grey headers on the right are technical details (ids, versions).

## Set up (first time)

1. **Create the Sheet.** Use a company Google account. Share it only with the few people who must see it: it holds names,
   emails and phone numbers.
2. **Add the script.** *Extensions > Apps Script*. Delete the sample code, paste the whole of `docs/google-apps-script.gs`
   and save.
3. **Set the shared password.** *Project Settings* (the gear) > *Script properties* > *Add script property*: name
   `WEBHOOK_SECRET`, value a long random string (40+ characters). Keep a copy for step 6. Generate one with:
   `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`
4. **Create the tabs.** In the editor choose `setup` in the function dropdown and click *Run*. Authorise when asked
   (*Advanced*, *Go to project*, *Allow*). Tabs, dropdowns, colours and the Dashboard appear.
5. **Publish it.** *Deploy > New deployment* > gear > *Web app*. *Execute as* **Me**, *Who has access* **Anyone**. Copy the
   **Web app URL** (ends in `/exec`). "Anyone" is needed so the website can reach it; the script rejects any request without
   the shared password.
6. **Give the website the values** as environment variables (`.env.local` locally, the hosting dashboard online):
   `LEAD_WEBHOOK_URL` (the URL), `LEAD_WEBHOOK_SECRET` (the same value as `WEBHOOK_SECRET`), `ACCESS_SESSION_SECRET` (another
   long random value) and `NEXT_PUBLIC_SITE_URL`. Restart or redeploy.
7. **Check.** Run `healthCheck` in the editor. Then send an enquiry on `/contact` and try to comment on a blog article.

## The Sheet only changes when you update the script

The website and the Sheet are separate. Pushing code to GitHub or redeploying the site never changes your Sheet's columns,
colours or Dashboard: those come from the script pasted inside the Sheet. Until you paste the newest script, run `setup`
and publish a new version, the Sheet keeps its old layout (the website still saves to it, just with the old columns and
one record at a time). Version 3 also fixes a lost-sign-up bug in version 1: two sign-ups arriving together could write
over each other's row in All Leads.

## Wipe the test data and start clean

Do this before going live, or any time the tabs look wrong. In the Apps Script editor choose
`deleteAllDataAndStartFresh` in the function dropdown and click *Run*. It asks first, then deletes every tab and all data
and builds clean tabs with a Dashboard. It cannot be undone. Nothing on the website needs to change.

If you ever paste a newer script and forget to run `setup`, the script now notices a tab with old headings, keeps it as
`Old <name>` and writes into a correct new tab, so a row never lands under the wrong heading. Run `healthCheck` to see the
state of every tab. Columns you add to the right of the standard ones are left alone; do not rename the standard headings.

Run `audit` in the editor at any time. It reports, for every tab, the number of rows and whether any record was written
twice, is missing its id, or sits under the wrong heading. Anything other than plain row counts needs a look.

## Upgrade from an earlier version

1. Replace the script with the new `docs/google-apps-script.gs` (which saves many visitors in one go). The website
   still works with an older script, only slower, so upgrade the script whenever you can.
2. Run `setup`. Your old tabs are kept and renamed `Old ...`; the new ones are created. Delete the old ones when sure.
3. *Deploy > Manage deployments*, pencil, *New version*, *Deploy*. The URL does not change.

## Working the Sheet every day

- Open the **Dashboard** first: it shows what is waiting.
- In a tab, filter **Lead status** to `New` (the filter arrows are already on). Contact the person, then choose a status
  from the dropdown and add a note.
- **Follow-up OK?** tells you what you may do. `Yes` means they agreed to marketing. `No` means answer what they asked, but
  do not market to them. Anyone under 18 is always `No`.
- A **yellow email** appears more than once (a repeat visitor or two devices). It is one person; do not contact twice.
- A **grey struck-through row** is `Do not contact`. Respect it.
- **Privacy Requests** show a **Records found** count (sign-ups and enquiries for that email) so you know what to look for
  and delete in every tab. Set the status to `Done` when finished.
- **Activity** shows who opened which project or resource, by name and email.

## Things to know

- The site waits for the Sheet to confirm before telling a visitor it was received (about 2 to 3 seconds). If the Sheet is
  slow the site retries once; the script ignores a record it already wrote, so a retry never creates a duplicate row. If the
  Sheet is down the visitor sees a clear message, plus an email fallback for enquiries.
- Records that arrive together are saved together. In a test with a stand-in Sheet, 40 visitors at once were all saved in
  about 6 seconds and 100 in about 14. Measure the real Sheet with a few test sign-ups; Google's speed varies. Google also
  caps how much script time an account gets per day (see Apps Script quotas), so the site limits how much any one visitor,
  or the whole site, can send.
- Limits, so a bot cannot fill the Sheet or use up the daily quota: 15 enquiries and 30 registrations per address per 10
  minutes; 120 enquiries and 240 registrations per minute for the whole site; 3 enquiries and 6 registrations per email per
  hour. During an attack these limits can also turn away real visitors for a minute; that is the deliberate trade.
- A record that is sent twice (the website retrying) is recognised by its id among the most recent 600 rows of its tab and
  skipped. A record sent again long after that would be written again; the yellow email colour and `audit` make that easy
  to see.
- Google's speed varies: in a real test of 7,000 records a typical batch of 40 took about 5 seconds, but a few took 20 to
  30 seconds and one took over two minutes. The website waits up to a minute per batch and retries, and every record it
  could not save is reported to the visitor, never dropped silently.
- Only the first time a person opens a project or resource is recorded in Activity.
- A failed or unclear answer from Google (including a Google error page) is never treated as saved: the visitor is told to
  try again. Each form carries a submission id, so trying again after a slow answer never creates a second row.
- Everything is stored as plain text, so a name that starts with `=` cannot run as a formula. Names starting with `=`, `+`,
  `-` or `@` get a leading `'`, and messages starting with `=` or `@` do, in case the Sheet is exported to CSV.
- Phone numbers are stored in one format: `+91 98765 43210` for India, `+971501234567` for other countries.
- Only follow up leads whose **Follow-up OK?** starts with `Yes`. Nobody confirms an email address at sign-up, so a `Yes` means
  the form was ticked, not that the owner of that email did it. Say who you are and how to opt out in the first message.
- Visitors under 18 cannot create an access profile (a parent's agreement cannot be verified yet), so there is no under-18 row.
- A Google Sheet is not a secured database. Keep sharing tight, turn on two-step verification for the owning account, and
  export a backup regularly.
- If the site sits behind a proxy that hides the visitor's address (some cPanel setups), spam limits fall back to one shared
  bucket with a larger allowance. Ask the host to pass `X-Forwarded-For`.
