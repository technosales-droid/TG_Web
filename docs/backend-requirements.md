# Access, leads and privacy: what is built and what is still required

This site has no database or admin panel. The access system is built so the browser side and the API boundary are
complete, and everything that needs a real backend is listed here. Nothing below is simulated: without the backend
pieces, production refuses to accept registrations.

## What exists

| Piece | Where |
|---|---|
| One reusable form and dialog (AccessGate) | `src/components/access/access-gate.tsx`, `access-provider.tsx` |
| Registration, session, sign-out | `src/app/api/access/route.ts` |
| Signed HttpOnly session cookie | `src/server/session.ts` |
| Same-origin (CSRF) check, body limit, rate limit | `src/server/guard.ts` |
| Delivery boundary (webhook) | `src/server/delivery.ts` |
| Lead record shape, validation | `src/lib/access.ts` |
| Gated project and resource content, served only with a session | `src/server/gated-content.ts`, `src/app/api/content/[kind]/[slug]/route.ts` |
| Access activity (which content a person opened) | `src/app/api/access/activity/route.ts` |
| Privacy requests | `src/app/api/privacy-request/route.ts`, `/privacy-requests` |
| Comment and review reports (intake only) | `src/app/api/report/route.ts` |
| Cookie preferences, consent-gated Google Map | `src/lib/consent.ts`, `src/components/access/cookie-settings.tsx` |
| Legal pages | `/privacy-policy`, `/cookie-policy`, `/terms`, `/community-guidelines`, `/privacy-requests` |

## Must be set up before launch

1. **Environment variables** (see `.env.example`): `ACCESS_SESSION_SECRET` and `LEAD_WEBHOOK_URL`. Without them the access
   form answers "not available" in production.
2. **A place to keep records.** The webhook receives `{ kind, sentAt, data }` where `kind` is `lead`, `lead-activity`,
   `privacy-request` or `content-report`. It must store them securely, deduplicate leads by email or phone, and answer
   2xx only after storing. A lead is a `LeadRecord` (`src/lib/access.ts`). The team sets `status`; the site never does.
3. **Comments and reviews storage.** They are kept in the visitor's own browser today (`src/lib/blog-feedback.ts`), so
   other visitors cannot see them. Public comments need a server table with author id (the session `sid`), article
   slug, text, rating, parent id, timestamps and a hidden flag, plus an admin action to hide or delete. Replace
   `read`/`write` in that file with API calls; the components do not change. Wire the Report button to `/api/report`.
4. **A lead dashboard.** Use your CRM, or build an admin behind real authentication. Do not expose lead data through an
   unauthenticated route. Statuses: New, Contacted, Interested, Application Started, Enrolled, Not Interested, Do Not
   Contact. A "Do Not Contact" flag must be honoured before any outreach, and outreach may only go to leads with
   `marketingConsent: true` and `ageGroup: "adult"`.
5. **Privacy request handling.** A staff process: verify identity, then give a summary, correct, erase or stop
   processing, and record the outcome. Withdrawal of consent must end the access session's permissions in the store.
6. **Verifiable parental consent.** The access form has a "my parent or guardian has agreed" tick box for visitors under
   18. It is recorded as `guardianConsent: "claimed"` and verifies nothing. The Digital Personal Data Protection Rules
   require verifiable consent of a parent or guardian before processing a child's data, and forbid tracking,
   behavioural monitoring and targeted advertising aimed at children. Choose a verification method (for example a
   confirmation to the parent's email or a verified identifier) and get legal advice before collecting minors' data.
   Until then consider turning access off for under-18s.
7. **Legal review.** Every `[PLACEHOLDER]` on the legal pages must be filled: legal entity, registered address, privacy
   and grievance contacts, hosting and storage providers, retention periods, response time, storage location, moderation
   contact, governing law. Nothing in the site claims legal compliance, and it should not until counsel has reviewed it.
   Bump `PRIVACY_POLICY_VERSION` and `TERMS_VERSION` in `src/lib/legal-versions.ts` whenever the text changes.
8. **Rate limiting** is in memory per server instance. Use the host's shared limiter or Redis for a hard limit, and
   consider a CAPTCHA if spam appears.
9. **Publishing projects and resources.** Add the public record (title, thumbnail, short description) to
   `src/data/projects.ts` or `resources.ts` with `sample: false`, and its full content to `src/server/gated-content.ts`.
   Student work needs `creatorPermission: "granted"` (and a guardian's, for a minor) and `publicationStatus:
   "published"`, or it stays hidden. The build fails if a real record has a media URL in the public file.

## Not done on purpose

Analytics and advertising are not installed, so there is no analytics consent. Add one to the cookie preferences only
if you add such a tool. There is no messaging, follower system, public profile or notification feature.
