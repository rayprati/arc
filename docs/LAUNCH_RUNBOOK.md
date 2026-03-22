EXECUTION RUNBOOK
# LAUNCH_RUNBOOK.md

# Arc — Launch Runbook

This is the execution checklist to take the landing funnel from local build to live experiment with clean data.

No deviations. No improvisation.

---

## 1. Repo + Structure

- Create private GitHub repo: `arc`
- Structure:
  - `/landing` → site code
  - `/docs` → README, PLAN, RUNBOOK
  - `/ads` → creatives
  - `/data` → results (screenshots, exports)

- Push clean initial commit
- Create `main` branch (production)
- Create `dev` branch (working)

---

## 2. Deployment (Vercel)

- Create Vercel account
- Connect GitHub repo
- Import project
- Set root to `/landing` if needed
- Deploy

- Enable:
  - automatic deploys on push
  - preview deployments

---

## 3. Domain + DNS

- Buy domain (clean, short, not cringe)
- In Vercel:
  - add domain
  - set as primary
- In registrar:
  - point DNS to Vercel

- Confirm:
  - HTTPS active
  - no redirect issues
  - mobile loads clean

---

## 4. Environment Variables

In Vercel project settings, add:

- `NEXT_PUBLIC_POSTHOG_KEY` (or analytics key)
- `NEXT_PUBLIC_PIXEL_ID`
- `FORM_ENDPOINT` (Airtable / Supabase / API route)
- `PAYMENT_LINK` (Stripe link if used)

Never hardcode keys in code.

---

## 5. Email Capture Backend

Pick ONE:

### Option A (fastest)
- Airtable base:
  - fields: email, timestamp, utm_source, utm_campaign, utm_content, precommit_click

### Option B
- Supabase table (same fields)

Wire form submission to this.

Test:
- submit email → appears in table instantly

---

## 6. Analytics + Tracking

### Meta Pixel
- Create Meta Ads account
- Create Pixel
- Install on all pages
- Fire:
  - PageView
  - Lead (on email submit)

### Product Analytics (PostHog recommended)
- Install script
- Track events:

Landing:
- `hero_cta_click`
- `scroll_depth`

Email page:
- `email_submit_success`

Modal:
- `precommit_click`
- `precommit_skip`

### UTM Handling
- Capture:
  - utm_source
  - utm_medium
  - utm_campaign
  - utm_content
- Persist across pages
- Store with email

---

## 7. Anti-Spam Protection

- Add honeypot field OR
- Lightweight CAPTCHA

Goal: block bots without adding friction.

---

## 8. Payment (Optional for v1)

- Create Stripe payment link ($1 or $5)
- Attach to “Pre-commit” button

If not ready:
- still track `precommit_click`

---

## 9. QA (Non-Negotiable)

Test on mobile first.

### Functional
- all CTAs click correctly
- email form works
- modal appears
- payment link opens (if live)
- UTMs persist
- events fire (check analytics dashboard)

### Visual
- no broken layout
- no overlap
- fast load
- no console errors

### Pages
- `/` loads
- `/start` works
- `/learn` works
- `/terms` exists
- `/privacy` exists

---

## 10. Ad Account Setup

- Create Meta Ads account
- Set payment method
- Install Pixel (already done)

Create 2 campaigns:
- Creative A (humiliation angle)
- Creative B (loss aversion angle)

Budget:
- $125 each

Optimize for:
- landing page views (initially)

---

## 11. Launch Sequence

1. push final build to `main`
2. confirm Vercel deploy live
3. test full funnel once more
4. verify analytics firing
5. verify email capture working
6. verify domain clean
7. launch ads
8. monitor first 2–3 hours for breakage

---

## 12. Metrics to Check (Next Morning)

From ads + analytics:

- CTR
- CPC
- landing page conversion %
- cost per email
- precommit click rate

---

## 13. Decision Rule

- CTR > 1.5%
- LP conversion > 5%

If both hit:
→ increase spend

If not:
→ kill or adjust immediately

---

## 14. Data Logging

After test:

- screenshot ad metrics
- export email list
- note:
  - which creative won
  - conversion rates
  - cost per lead

Store in `/data`

---

## 15. Non-Negotiables

- no fake public metrics
- no broken tracking
- no “we’ll fix it later”
- no building product before signal
- no emotional attachment to outcome

---

## Final Principle

You are not launching a product.

You are running a **paid experiment to extract truth from the market.**

Speed, clarity, clean data.

Everything else is noise.
