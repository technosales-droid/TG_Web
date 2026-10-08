# Deploying to cPanel

This assumes your hosting plan has **"Setup Node.js App"** in cPanel (powered by Phusion Passenger / CloudLinux's
Node.js Selector). If it doesn't, ask your host to enable it, or this site needs a different host (a VPS, Render,
or Vercel on your real domain) — it cannot run on plain static-file cPanel hosting.

## 1. Get the code onto the server

**If your cPanel has SSH/Terminal access (recommended):**
```
git clone https://github.com/technosales-droid/TG_Web.git
cd TG_Web/technogurukul-web
npm install
npm run build
```

**If you only have File Manager / FTP:** build the project on your own machine first (`npm run build`), then
upload everything **except** `node_modules` (cPanel's "Run NPM Install" button rebuilds that on the server) —
including the `.next` folder this time, since cPanel won't run the build step for you. Zip it first; extracting a
zip in File Manager is far more reliable than uploading thousands of individual files over FTP.

Either way, `private-content/` must end up in the app's root folder, next to `package.json` — it holds the gated
brochure PDFs and is never served directly to the public, only streamed by the app itself.

## 2. Create the Node.js App in cPanel

**Setup Node.js App → Create Application**
- **Node.js version:** 20.9 or later (the app won't start on anything older)
- **Application mode:** Production
- **Application root:** the folder you uploaded to (e.g. `TG_Web/technogurukul-web`)
- **Application URL:** your domain (or subdomain)
- **Application startup file:** `server.js`

Save, then open the app again and click **Run NPM Install** (installs `node_modules` from `package.json`).

If you have terminal access, run `npm run build` here too (cPanel's Node UI doesn't run it for you).

## 3. Environment variables

In the same Node.js App screen, add these under **Environment Variables**:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | your real domain, e.g. `https://www.technogurukul.com` (no trailing slash) |
| `ACCESS_SESSION_SECRET` | a random 32+ character string — **do not reuse the one from local dev.** Generate one locally with `openssl rand -hex 32` and paste it only into cPanel's Environment Variables — never into any file in this repo. |
| `LEAD_WEBHOOK_URL` | the Google Apps Script webhook URL (same one used for local testing, or a fresh deployment if you want production leads in a separate Sheet) |
| `LEAD_WEBHOOK_SECRET` | the matching secret for that webhook |

Without `ACCESS_SESSION_SECRET` the access-gate/brochure system refuses to work (fails closed, not silently).
Without `LEAD_WEBHOOK_URL`/`LEAD_WEBHOOK_SECRET` every form submission is rejected outright. Both are deliberate —
the site never pretends a submission succeeded when it didn't.

Click **Restart** after adding/changing any of these.

## 4. HTTPS

Turn on AutoSSL (or your host's equivalent) for the domain before testing anything. The production session cookie
uses the `__Host-` prefix, which browsers reject outright over plain HTTP — the access-gate, brochure downloads,
and any "stay signed in" behavior simply won't work without it.

## 5. DNS and email

- Point the domain at this hosting account; pick either `www` or the bare domain as canonical and redirect the
  other to it (ask your host how they prefer this configured).
- Set SPF, DKIM and DMARC for the domain so mail from `admission@technogurukul.com` isn't flagged as spam.

## 6. Test before announcing it

1. Visit the live domain — homepage, a program page, `/learning/projects`, `/learning/resources`.
2. Open the brochure download on a program card, complete the access form, confirm the PDF actually downloads.
3. Submit the contact form and check the row lands correctly in the Google Sheet.
4. Confirm the 45-second promo popup appears and its CTA works.
5. Check `/sitemap.xml` and `/robots.txt` show the real domain and allow indexing (they switch to "index
   everything" automatically once `NODE_ENV=production` — nothing extra to configure).

## Notes

- `npm start` now runs `node server.js` (a small custom server written for this), not `next start` — this is the
  standard pattern for running Next.js under Passenger/cPanel, since Passenger hands the app a port (or a Unix
  socket path) directly rather than letting it bind its own. `next start` is still available as `npm run start:next`
  if you ever move this to a host that doesn't need Passenger (a VPS, for instance).
- Vercel ignores all of this — it builds and serves the app its own way, so nothing here affects that deployment.
