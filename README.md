# Auré Studio

A responsive studio website for photography, film, AI editing inquiries, and premium video access. Built with React 19, TypeScript, Vinext (Next.js App Router APIs), Cloudflare D1, and private R2 storage. The original workspace application is unchanged.

## What is included

- Cinematic homepage, responsive photo galleries and lightbox, searchable film collection, film detail pages, AI service inquiry page, services, booking, private purchase library, credits and privacy pages.
- Protected administrator dashboard: publish/unpublish images and films, categories, service packages, INR prices, preview settings, studio identity/logo/contact details and homepage visibility. Review inquiries, customers, orders and processing jobs.
- D1 schema and generated migration in `drizzle/`. Content records hold the typed image/video/category/service data; original and preview assets are separately referenced media records. Orders, verified payments, entitlements, customers, inquiries, processing jobs and watch history have separate tables.
- Booking inquiries persist server-side. Sign-in is required; each customer sees only their own records. Notifications are not enabled because no email or WhatsApp credentials were supplied.
- Razorpay server-created orders, checkout, HMAC verification, server fetch of captured payment, verified webhook handling, idempotent entitlement upserts and refund-based access revocation. The browser alone cannot grant access.
- Originals in private R2, public previews as separate assets, five-minute user-bound signed playback tickets, entitlement checks on every media request, byte-range streaming. No private original keys are serialized into public film pages.
- Background FFmpeg processor that creates real blurred/reduced-resolution preview files. Processing does not block web requests. Failure states and retries are available in admin.

## Current launch state

The Sites publication is owner-private. Licensed reference photography is explicitly identified as illustrative, and the three supplied music videos are credited official Heartwave embeds. No client testimonials, personal contact details, invented film prices or completed production purchases are present. Replace references with authorized studio work before a public launch.

**Payments require your Razorpay credentials and an end-to-end test with that account.** No payment was made during development. Local entitlement tests use explicitly simulated database fixtures, not a fake checkout. The production processor also needs a running trusted host and its service credential. Administrator access fails closed until configured.

## Local development

Use Node 22.13+ and npm. Install dependencies with the Sites `install-dependencies.mjs` helper, or `npm ci` for standalone development. Copy `.env.example` to `.dev.vars` and enter local values. Both files containing actual secrets and runtime data are ignored by Git.

For loopback development only, `npm run dev -- --hostname 127.0.0.1 --port 5187` provides simulated ChatGPT sign-in. Sign-in uses `local_seedy`; set `ADMIN_USER_IDS=local_seedy` **only in local `.dev.vars`**. This mock is excluded from production builds.

Generate a schema migration after schema edits with `npm run db:generate`. Build once with the Sites `build-site.mjs` helper, then apply the initial migration locally:

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_jittery_khan.sql
```

Do not replay already-applied migrations. Do not edit applied migrations; append new ones. Hosted Sites applies committed migrations during deployment.

## Production configuration

Keep the existing `project_id` in `.openai/hosting.json`. Sites supplies the `DB` and `BUCKET` bindings and owns authenticated identity headers. Do not expose this Worker through an alternate ingress that lets callers forge those headers.

Set runtime values through Sites environment variables; never add secret values to the manifest or source:

| Variable | Purpose |
| --- | --- |
| `ADMIN_USER_IDS` | Comma-separated stable Site user IDs. Sign in to `/admin` to see your ID. Never use the local test ID in production. |
| `PLAYBACK_SECRET` | At least 32 random bytes, encoded as hex; signs five-minute playback tickets. |
| `RAZORPAY_KEY_ID` | Your `rzp_test_…` key first; switch to live only after testing. |
| `RAZORPAY_KEY_SECRET` | The matching private API key secret. |
| `RAZORPAY_WEBHOOK_SECRET` | Independent webhook secret configured in Razorpay. |
| `PROCESSOR_SECRET` | At least 32 random bytes; shared only with the trusted external processor. |

Configure the Razorpay webhook at `https://<site>/api/payments/webhook` for `payment.captured`, `order.paid`, and `refund.processed`. Verify both checkout callbacks and webhook retries in test mode. On an owner-private Site, Razorpay cannot ordinarily reach the gateway; use a public launch audience when ready or a separately configured platform-supported service ingress. Do not silently bypass the Site access policy.

The processor uses these additional **process-only** environment variables:

| Variable | Purpose |
| --- | --- |
| `STUDIO_URL` | Your deployed Site origin. |
| `SITES_SERVICE_TOKEN` | Existing Sites service credential for owner-private access; omit on a public Site. Keep out of source and logs. |
| `FFMPEG_BIN` | Optional FFmpeg executable location. Defaults to `ffmpeg`. |

Run `node scripts/process-previews.mjs` under a process supervisor on a trusted host with Node and FFmpeg installed. `--once` processes at most one queued job. The processor authenticates, claims a job atomically, downloads the private original, runs FFmpeg in a temporary directory, uploads a separate preview, and deletes temporary files. It enforces a ten-minute FFmpeg timeout and only permits file/pipe protocols. Run it with minimal OS permissions and sandbox untrusted media processing. Failed/stalled jobs can be retried from admin; a stalled processing lease can be reset after one hour.

## Content workflow

1. Sign in as the configured administrator and open `/admin`.
2. Add images, categories, services or a film as a draft. Confirm publishing rights.
3. For a premium film, upload an MP4 original (90 MB maximum), then upload a **different** preview MP4 or generate one using the processor. Image uploads accept JPEG, PNG and WebP up to 10 MB. File signatures and streamed byte counts are checked server-side.
4. Configure an INR price, preview treatment and length. Publish only after the preview is ready.
5. Public YouTube videos use an 11-character official video ID. Restricted films cannot use YouTube URLs.
6. Replace the illustrative gallery, update studio contacts/logo, and disable reference films in Settings when ready.

Long original films beyond the initial 90 MB upload limit should use a managed video provider with resumable uploads and signed HLS playback. This version streams MP4 with byte ranges; adaptive HLS is not implemented. AI enhancement is an inquiry service, not an automatic AI processing engine. Browser access controls cannot prevent every screen recording.

## Verification

- `npm run typecheck`: TypeScript validation.
- `npm test`: booking/content validation, exact payment amount/currency/order matching, HMAC tampering and ticket expiry.
- `tests/integration.mjs`: 40 local HTTP checks covering anonymous/admin authorization, cross-user inquiry isolation, upload signatures, separate FFmpeg preview generation, unpublished media, unpaid access denial, forged payment rejection, simulated entitlement playback, expiry, other-user denial, byte ranges, key leakage revocation, public playback, oversized-file rejection, and processing failures.
- Browser checks: desktop/mobile navigation, category filtering, lightbox, typed search and official YouTube playback.

Integration tests refuse non-loopback hosts and need a local built Worker with D1/R2 and `.dev.vars` bindings, `ffmpeg`/`ffprobe`, and `.sites-runtime/test-assets/original.mp4`. They create disposable local fixtures only. A production build alone does not verify live payment processing, production gateway webhooks, or external processor availability.

## Deployment

Use the Sites source workflow helper to run the checks/build, commit and push the exact source, and package an archive. Save and deploy that exact version through Sites. Preserve the current audience. The generated site origin is `https://aure-cinematic-studio.nirajpaul2.chatgpt.site`.

Before accepting real payments, test a successful and failed Razorpay transaction, duplicate/reordered webhooks, refunds, mobile playback, and a full preview processing run on the production infrastructure. Configure business policies and a real contact route before public sales.

## References

- [Razorpay integration documentation](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/)
- [Cloudflare R2 Workers API](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/)
- [Cloudflare Workers best practices](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/)
- Photography provenance: `public/images/credits.json` and `/credits`.
