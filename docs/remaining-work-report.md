# Techno Gurukul website: what is left before launch

Status on 25 September 2026. Code is pushed to `technosales-droid/TG_Web`, branch `main`. The site runs on Vercel for testing;
the final home is your live domain on cPanel.

**How to read this.** Every item says who does it: **You** (needs your details, decisions or accounts), **Me** (I can build or
fix it once told to) or **Both**. Priority: **Blocker** = must be done before you announce the site, **Should** = do soon after,
**Later** = planned for after launch.

---

## 1. Where things stand

| Area | State |
|---|---|
| Pages, design, navigation, blog system, program pages | Built |
| Contact form, access form (projects, resources, comments), privacy requests | Built and saving to Google Sheets |
| Google Sheet pipeline (script version 7) | Live. Tested with 14,000+ records: none lost, none duplicated, all in the right columns |
| Spam and abuse protection | In place (limits, caps, blocked routes). No captcha yet |
| Security testing | Done against a local copy; found problems were fixed |
| Phone usability | Code reviewed and fixed. Not yet checked on a real phone |
| Legal pages | Written, but 28 details are still placeholders and none has been reviewed by a lawyer |
| Real content (projects, resources, photos, faculty, testimonials, contact details) | **Not supplied yet** |
| Comments and reviews | Saved only on the visitor's own device. No server database |
| Live site on Vercel with the Sheet connected | **Not confirmed yet** (environment values still to be added) |

---

## 2. Blockers, in the order I would do them

| # | Item | Who | Section |
|---|---|---|---|
| 1 | Add the four environment values on Vercel, redeploy, send one real enquiry | You | 3.1 |
| 2 | Supply real content and delete the test entries | Both | 4 |
| 3 | Fill the 28 legal placeholders and get a lawyer to review | Both | 6 |
| 4 | Decide what happens to comments and reviews (database or switch off) | Both | 5.1 |
| 5 | Check the site on real phones and browsers | You | 8 |
| 6 | Stop the Vercel test site being indexed by Google | Me | 9 |
| 7 | Wipe the Sheet and run the final live test | Both | 3.4 |

---

## 3. Deployment and infrastructure

### 3.1 Vercel (now) — Blocker, You
1. Vercel project, Settings, **Environment Variables**. Add for Production and Preview: `LEAD_WEBHOOK_URL`,
   `LEAD_WEBHOOK_SECRET`, `ACCESS_SESSION_SECRET`, `NEXT_PUBLIC_SITE_URL` (the Vercel link for now).
2. Deployments, latest, **Redeploy** (these are read at build time).
3. On the live link: send an enquiry, comment on a blog article, open a project. Check the rows in the Sheet.

I cannot do this: Vercel needs your login.

### 3.2 Move to your live domain on cPanel — Blocker, Both
1. **Ask your host if the plan has "Setup Node.js App".** This site has a server side (forms, access, private files).
   Static-only cPanel cannot run it. If not offered, use a Node host (VPS, Render, or keep Vercel on the real domain).
2. Set the same four environment values; `NEXT_PUBLIC_SITE_URL` must be the real domain, for example `https://www.technogurukul.com`.
3. Upload the project including the `private-content/` folder. Build with `npm run build`, start with `npm start`.
4. Ask the host to pass the visitor's address in the `X-Forwarded-For` header, or spam limits cannot tell visitors apart.
5. HTTPS must be on (the session cookie and security headers assume it).
6. Point DNS, choose one of `www` or the bare domain and redirect the other to it.
7. Email: set SPF, DKIM and DMARC for `technogurukul.com` so mail from `admission@technogurukul.com` is not treated as spam.

### 3.3 Google Sheet hygiene — Should, You
- The Sheet holds names, emails and phone numbers. Share it only with the people who need it, and turn on two-step verification on
  the owning Google account.
- Take a regular backup (File, Make a copy, or a scheduled export).
- Decide who follows up leads, and how often the Sheet is checked. Nothing tells the team when a new row arrives (see 5.2).

### 3.4 Before opening to the public — Blocker, Both
- The Sheet is clean today. After any further testing, run `deleteAllDataAndStartFresh` in the Sheet's Apps Script so no test rows remain.
- Send one real enquiry, one sign-up and one privacy request on the live domain; confirm each lands in the right tab.

---

## 4. Content you need to supply

The site never invents facts, so anything missing shows as a labelled placeholder or is hidden. Each row is one thing to send me.

| # | Content | Where it shows | What I need | Priority |
|---|---|---|---|---|
| 4.1 | **Projects** (student, faculty, institute work) | Learning, Projects | For each: title, creator, type, program, short and full description, images, and **the creator's written permission** (and a parent's for a minor). Test entry `access-test-project` must go | Blocker |
| 4.2 | **Resources** (guides, templates, files) | Learning, Resources | For each: title, type, format, short description, thumbnail, the file (PDF and so on) or a link. Test entry `access-test-resource` and `private-content/access-test-resource.pdf` must go | Blocker |
| 4.3 | **Faculty** | About, Faculty & Facilities | Real names, roles, short bios, photos, consent to publish. Today there are 4 "Faculty 01 to 04" placeholders | Blocker (hide the section if not ready) |
| 4.4 | **Facility photos, GIFs, videos** | About, Faculty & Facilities | Real photos, and videos with posters. Every media tile currently shows a tile labelled "Placeholder" to visitors | Blocker (hide if not ready) |
| 4.5 | **Contact details** | Contact page, footer | A working phone number, working hours, a WhatsApp link if you use it. Phone and hours show "not listed yet" | Blocker |
| 4.6 | **Course details** | Each program page | Per course, only what you can stand behind: curriculum modules (only Digital Marketing has its 18 modules), duration, batch dates, eligibility, tools, instructors, fees or "ask us", certificate wording. Anything missing shows a plain placeholder | Blocker |
| 4.7 | **Testimonials and reviews** | Home, course pages | Real, approved ones: quote, name, role, program, rating, photo, and their consent. The demo ones are made up and are automatically hidden on the live site; do not enable them | Should |
| 4.8 | **Blog** (32 articles) | Blogs | (a) An editor to read and approve every article: they are draft general explainers. (b) Real photos: the 18 articles in the library have no photo and show a coloured cover; the other 14 reuse brand photos. (c) A real author and short bio, or keep "Techno Gurukul Editorial Team" | Should |
| 4.9 | **Brand photography** | Hero images on Home, About, Contact, Projects, Resources | The same handful of brand images are reused and several are marked "temporary" in the code. Supply dedicated images at 1920 wide or larger | Should |
| 4.10 | **Social profiles** | Footer | Confirm the six links that are set are correct and official; supply WhatsApp if wanted | Should |
| 4.11 | **"Coming soon" programs** | Home, Programs | Confirm these future programs are real intentions you want to show, or remove the labels | Should |
| 4.12 | **Popup promotions** | Every page after 45 seconds | Confirm the wording and course list for the rotating popup. Consider whether a popup helps or annoys | Should |

**Rule I follow:** no invented names, numbers, ratings, students, placements, prices, awards or partners. If a fact is missing I leave a placeholder.

---

## 5. Backend and data

### 5.1 Comments and reviews — Blocker (decision), Both
Today a comment is saved only on the device that wrote it. Nobody else sees it, and the Report feature is switched off
(`/api/report` answers 404).
- **Option A, launch without public comments:** the comment box stays as a way to capture leads, with the "saved on this device" note.
  Nothing more to build.
- **Option B, real comments:** you choose a database (Supabase or Upstash through the Vercel Marketplace are the easy ones) and a
  moderator. I build storage, showing others' comments, the Report button, removal, and a moderation view. Needs 6 (legal) updated too.
- Recommendation: launch with A, build B after launch.

### 5.2 Notifications and email — Should, Me
- **Nobody is told when an enquiry arrives.** The team only sees the Sheet. I can add an email to `admission@technogurukul.com` for every
  new enquiry and privacy request (a small Apps Script addition).
- **Visitors get no confirmation email.** A short "we received your enquiry" email needs a sending service (Google Workspace via the
  script, or Resend/Brevo). You choose the service.
- **Email addresses are not verified,** so anyone can sign up with someone else's address. A confirmation email (double opt-in) fixes this.
  Until then the Sheet marks marketing consent as "(email not confirmed)".

### 5.3 Abuse protection still open — Should
| Item | Who | Notes |
|---|---|---|
| Captcha (Cloudflare Turnstile, free) | Both | You create the keys (site key and secret key); I add the check to all forms. Needs CSP change |
| Shared rate limiter | Both | Limits count per running server today. Add Upstash Redis in Vercel, I wire it. Optional until traffic is real |
| Under-18 access | You | **Blocked.** Needs a way to verify a parent's agreement. Decide the method (OTP to a parent's number, signed form, and so on) |
| Session revocation | Me | A visitor's 30-day access cannot be cancelled early. Low risk: it holds only a first name and random id |

### 5.4 Data, retention and privacy operations — Should, You
- **Privacy requests** (access, correction, deletion) arrive in the Sheet; a person must act on them and delete rows from every tab.
  Nominate that person and a response time (this is one of the legal placeholders).
- Decide how long enquiries and sign-ups are kept, and delete after that. The privacy policy needs the retention period.
- Longer term, a Google Sheet is not a secured database. When leads grow, move to a CRM or database.

### 5.5 Monitoring — Should, Both
- No error tracking (Sentry or similar) and no uptime check. Add an uptime monitor (free ones exist) on the home page and `/api/access`.
- Apps Script: turn on failure notification emails (Triggers, Failure notifications), and watch for Google's daily quota limits.

### 5.6 Content management — Later, Both
Blogs, programs and catalogues live in code, so each new article or project needs a code change and a deploy. If the team wants to
publish without a developer, add a CMS (Sanity, Notion, or a Sheet-driven feed). Decide after launch.

### 5.7 Payments and enrolment — Later, You (decision)
There is no fee payment or online enrolment: the site collects enquiries only. If you want online payment, a payment gateway, an
invoice flow and the refund terms (see 6) must be decided first.

---

## 6. Legal and compliance

I write structure and wording; I cannot supply facts and I am not a lawyer. Nothing on the site claims DPDP compliance.

**28 placeholders to fill** (they show as highlighted "to be confirmed" text on the legal pages):
- **Company:** legal entity name and registration details, registered address, governing jurisdiction, dispute-resolution mechanism.
- **Privacy:** privacy contact email, grievance contact name/email/address, hosting provider, storage location and country, retention
  period (two places), retention for privacy requests, response time, staff access roles, moderation contact and process, and the
  parental-consent method (under-18 access is blocked until then).
- **Fees and refunds:** fee and payment terms, refund percentage, refund processing period, non-refundable charges, payment-gateway
  charge terms, program cancellation terms, transfer and batch-change terms.
- **Courses:** certification or accreditation details, program-specific eligibility.

**Also needed:**
- A lawyer reads Privacy Policy, Terms, Refund Policy, Disclaimer, Cookie Policy and Community Guidelines. — Blocker, You
- Your GST or business registration details in the footer if required. — Should, You
- If you add analytics later, update the Cookie Policy, Privacy Policy and the cookie banner (see 9).

---

## 7. Security status (for your information)

Tested and holding: forged or tampered sign-in cookies, cross-site requests, private-file path tricks, huge and malformed requests,
15,000+ fuzzed inputs, and floods of 1,000 to 10,000 requests per route. Public HTML and scripts do not contain any gated text or
file names. Secrets are only in environment values, never in the code.

Still open: no captcha, per-server rate limits, no email verification, comments not verified, sessions not revocable (see 5).
Sending the same sign-up long after the first could write a second row; the yellow email colour and the Sheet's `audit` tool show it.

---

## 8. Quality checks nobody has done yet

| # | Check | Who |
|---|---|---|
| 8.1 | **Real phones.** Home, a program page, Projects, Resources (open a card, submit the access form, close, scroll), Contact (send), the menu, the cookie banner, the popup, portrait and landscape, on one iPhone and one Android | You |
| 8.2 | **Browsers:** Chrome, Safari (Mac and iPhone), Firefox, Edge | You |
| 8.3 | **Widths:** 320, 375, 768, 1024, 1440, 1920 pixels. I cannot open a browser in this project, so I have only reviewed the code | You |
| 8.4 | **Accessibility:** tab through every page with the keyboard, try a screen reader on the forms and the access dialog | You, Me (fixes) |
| 8.5 | **Speed:** run Lighthouse or PageSpeed on Home, a program, Blogs, Projects, and send me the low scores | You, Me (fixes) |
| 8.6 | **Proofread** every page and legal text | You |
| 8.7 | **Broken links and images** scan on the live site | Me, after launch on the real domain |

---

## 9. SEO and analytics

- **Vercel test site can be indexed.** Vercel treats the `main` branch as production, so Google may index the test address and later
  see it as a duplicate of your real domain. Fix: password-protect the Vercel site or turn indexing off for it. — Blocker, Me (small change)
- **Not built yet — Should, Me:** a branded 404 page and error page (visitors currently see the plain default), a web app manifest,
  a touch icon, and per-page share images (one logo image is used everywhere).
- **After you move to the real domain — Later, Both:**
  1. Add the site in Google Search Console, verify it, submit `sitemap.xml`. The sitemap and robots file already exist and switch to
     "index everything" only on the real production deployment.
  2. GA4: I add the tag, but the site's security policy blocks Google scripts today and the cookie banner says "no analytics". I will
     add analytics as an optional category that loads only after the visitor accepts, and update both policies. Send me the GA4 measurement ID.
  3. Organisation structured data (schema) exists; recheck it once real details are in.

---

## 10. Small jobs I can do as soon as you say so

1. Email alert to `admission@technogurukul.com` for each new enquiry and privacy request.
2. Branded 404 and error pages, manifest, touch icon, per-page share images.
3. Keep the Vercel test site out of Google.
4. Hide the Faculty and Facilities placeholders (or the whole page) until real material arrives.
5. Add real projects, resources, faculty, photos and contact details as you send them, and delete the test entries.
6. Fill the legal placeholders from your answers.
7. Cloudflare Turnstile once you send the keys; the shared rate limiter once Upstash is connected.
8. Analytics with consent once you have the GA4 ID.

---

## 11. Suggested order

1. **This week:** Vercel environment values and live test (3.1). Start collecting content (4.1 to 4.6) and legal details (6). Decide 5.1.
2. **Then:** I add the alert email, 404 page, noindex on the test site, and fill in content and legal text as it arrives.
3. **Before launch:** lawyer review, phone and browser checks (8), captcha, wipe the Sheet, cPanel setup and DNS (3.2).
4. **Launch day:** live enquiry test, Search Console, uptime monitor.
5. **After launch:** analytics, real comments (5.1 option B), shared rate limiter, CMS, payments if wanted.

## Decisions I need from you

1. Launch with or without public comments (5.1)?
2. Which service sends email: Google Workspace or a sending service (5.2)?
3. What method for parental consent, or keep under-18 access off (5.3)?
4. Hide faculty and facility sections until real material exists (4.3, 4.4)?
5. Will cPanel run Node.js, or do we host the app elsewhere (3.2)?
6. Who follows up leads and handles privacy requests, and within what time (5.4)?
7. Keep the 45-second course popup (4.12)?
