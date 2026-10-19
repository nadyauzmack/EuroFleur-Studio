# EuroFleur Studio — Stripe pickup checkout rollout

This is a **staging branch**, not live checkout. Current email-order flow on main remains untouched.

## Existing behavior
- Cloudflare Pages static index.html, order form and bouquet pricing.
- 21-day minimum notice, exact pickup address shared privately.
- Current order form opens an email request; **no online payment**.

## Implemented on this branch
- GET /api/availability?date=YYYY-MM-DD Pages Function.
- Weekly pickup slots and blocked dates configured by environment variables.
- Server-side 21-day minimum in America/New_York.
- POST /api/create-checkout intentionally returns 503 until secure payment fulfillment is implemented.

## Cloudflare Pages variables
WEEKLY_PICKUP_SLOTS = {"2":["17:00","17:30"],"6":["11:00","11:30"]}
BLOCKED_PICKUP_DATES = ["2026-11-26","2026-12-25"]

Confirmed schedule: Monday–Sunday, hourly pickup slots 8:00 AM through 7:00 PM Eastern (8:00 PM closing), maximum 3 orders per slot, at least 21 days ahead. These defaults are in the availability function; environment variables override them. Blocked dates default to none. Capacity is informational until durable reservations are implemented.

## Remaining before enabling payments
1. Confirm any specific blocked dates; weekly schedule is set to seven days, 8 AM–8 PM, hourly, three orders per slot.
2. Create Stripe account, configure test-mode STRIPE_SECRET_KEY as a Cloudflare encrypted secret and webhook signing secret; never commit either.
3. Implement server-side price mapping (medium $125, large $175, Ramo 50/75/100 $175/$250/$350), Stripe Checkout Sessions and tax handling.
4. Add durable D1 order and slot reservations with concurrency protection and expiration; recheck availability server-side before checkout.
5. Verify Stripe webhook signatures and mark orders paid idempotently; only then send confirmation and reserve pickup permanently.
6. Update the front-end to select only available dates/slots, collect required pickup-only acknowledgment, redirect to Stripe, and handle success/cancel states.
7. Test mobile, duplicate checkout, expired session, failed payment, timezone and daylight-saving transitions, blocked dates, 21-day cutoff, webhooks, refunds.
8. Deploy after review; preserve an email request fallback until live checkout is tested.

**All orders pickup only — no delivery.** Exact pickup address is not public.
