# Studio verification — 15 October 2026

## Passed locally

- TypeScript typecheck and production build.
- Six security/validation tests: contact/date/consent validation, premium publication prerequisites, URL restrictions, payment field matching, HMAC tampering, playback expiry.
- Forty HTTP integration checks, including customer data isolation, administrator authorization, origin checks, media uploads, genuinely separate FFmpeg previews, unpaid-access denial, simulated purchase entitlement playback, cross-user and expired-ticket rejection, byte-range streaming, revocation, public playback, archived media, oversized images and failed processing.
- All 14 main/metadata routes return 200; an unknown route returns 404.
- Browser sign-in, inquiry submission, success receipt and administrator inbox verified using local test data.
- Mobile navigation and desktop/mobile widths checked at 390px and 1440px with no horizontal overflow. Gallery, lightbox, search and official YouTube player checked during implementation.

## Fixes made during this review

- Added Film store and My Library links to the mobile menu.
- Moved booking sign-in before form entry, preserving the selected service through sign-in.
- Rejected impossible calendar dates, such as February 31.
- Fixed oversized-file handling to return a clean HTTP 413 error; the local Worker previously lost the response when rejecting an unread upload body.

## Not yet verified in production

No real payment was made. Razorpay test/live keys, its webhook secret, production admin user IDs, playback secret and an external preview-processor host must be configured. Checkout success, webhook delivery and refunds require verification against that payment account. Local playback tests simulate a verified entitlement directly in a test database.

Reference photographs and music films are clearly credited. Authorized studio media, contact details and sale prices have not been supplied. The initial store therefore has no premium listings. No email or WhatsApp notifications are configured. AI editing is an inquiry service, not an automated enhancement engine. Large-file resumable uploads and adaptive HLS are not implemented; current MP4 originals are limited to 90 MB.

Local test data and secrets are excluded from the published source and archive.
