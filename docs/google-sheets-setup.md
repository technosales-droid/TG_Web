# Connect the website to a Google Sheet

The website sends every submission to a small Google Apps Script that lives inside your Google Sheet and writes each one
into the right tab. No CRM is needed. Allow about 30 minutes.

## What lands where

| Tab | What goes in it | Comes from |
|---|---|---|
| Enquiries | Every Contact page enquiry | The Contact form |
| Blog Comments | People who registered to comment or review | The access form, opened from a blog article |
| Projects | People who registered to open a project | The access form, opened from a project card |
| Resources | People who registered to open a resource | The access form, opened from a resource card |
| All Leads | Every registration, from any of the three | The access form |
| Activity | Each time a registered person opens a project or resource, with their name and email | Gated content |
| Privacy Requests | Access, correction, deletion, consent withdrawal and questions | The Privacy Requests page |
| Reports | Reported comments (for when public comments exist) | Not used yet |

The **Source type** and **Source ID** columns say exactly what caused a registration, for example `comment` and
`unity-vs-unreal-engine`, or `resource` and `access-test-resource`.

## Steps

1. **Create the Sheet.** Use a company Google account, not a personal one. Name it "Techno Gurukul Leads". Share it only
   with the few people who must see it. It holds names, emails and phone numbers.
2. **Add the script.** In the Sheet choose *Extensions > Apps Script*. Delete the sample code, paste the whole of
   `docs/google-apps-script.gs`, and save.
3. **Set the shared password.** In Apps Script open *Project Settings* (the gear), scroll to *Script properties*, click
   *Add script property*, name it `WEBHOOK_SECRET` and give it a long random value (40+ characters). Keep a copy for
   step 6. Generate one with:
   `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`
4. **Create the tabs.** In the editor choose the `setup` function and click *Run*. Google asks you to authorise the
   script: choose your account, *Advanced*, *Go to project*, *Allow*. The tabs appear in the Sheet.
5. **Publish it.** *Deploy > New deployment*, click the gear and pick *Web app*. Set *Execute as* to **Me** and *Who has
   access* to **Anyone**. Click *Deploy* and copy the **Web app URL** (it ends in `/exec`).
   "Anyone" is needed so the website can reach it; the script rejects any request that lacks the shared password.
6. **Give the website the two values.**
   - Locally: create `.env.local` in the project folder with
     ```
     LEAD_WEBHOOK_URL=<the Web app URL>
     LEAD_WEBHOOK_SECRET=<the WEBHOOK_SECRET value>
     ACCESS_SESSION_SECRET=<another long random value>
     ```
     then restart `npm run dev`.
   - In production: add the same three as environment variables in your hosting dashboard, then redeploy.
7. **Test.** Send an enquiry on `/contact`, then open a blog article and try to comment. A new row appears in
   *Enquiries*, *Blog Comments* and *All Leads* within a few seconds.

## Changing the script later

Editing the code does nothing until you publish it: *Deploy > Manage deployments*, click the pencil, choose *New
version*, *Deploy*. The URL stays the same.

## Things to know

- If the script or the Sheet is unreachable, the website tells the visitor it could not send, and shows an email
  fallback for enquiries. In production nothing is recorded as received unless the Sheet answered.
- Everything is stored as plain text, so a name that starts with `=` cannot run as a formula.
- The team fills the *Lead status*, *Status* and *Notes* columns by hand. The site never sets them.
- Only follow up leads whose *Marketing consent* is `Yes` and *Age group* is `adult`. Honour "Do Not Contact".
- A person who registers twice (for example on two devices) appears twice, with the same email. Sort or filter by email.
- A Google Sheet is not a secured database. Keep sharing tight, turn on two-step verification for the owning account,
  and export a backup copy regularly. Google limits how many script runs you get per day, which is far above what a
  site this size sends.
- Delete or correct a person's rows when they make a privacy request, in every tab that has them (search by email).
