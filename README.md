# EuroFleur Studio — romantic floral design

**Official domain:** https://eurofleurstudio.com/ (purchased; Cloudflare DNS/domain setup and successful deployment still require verification). 

A lightweight, mobile-friendly bouquet website with a fully interactive order configurator. Source of truth: this GitHub repository. Designed to publish through **Cloudflare Pages** (same hosting workflow as KinNotice and the owner's portfolio). **No Netlify or build framework required.**

## Publish via GitHub + Cloudflare Pages

1. In your existing Cloudflare account, open **Workers & Pages → Create → Pages → Connect to Git**.
2. Authorize GitHub if asked, then select `nadyauzmack/EuroFleur-Studio`.
3. Set production branch to `main`, framework preset to `None`, build command blank, and output directory to the repository root (`/` or `.` as the interface requests).
4. Deploy. Cloudflare creates a `*.pages.dev` URL, and future commits to `main` deploy automatically.
5. Test the published website and the email-request handoff on desktop and mobile.
6. Add the purchased domain **eurofleurstudio.com** to Cloudflare DNS and attach it under the Pages project's **Custom domains** settings. Verify HTTPS and both root / www domain behavior before sharing.

See [CLOUDFLARE_DEPLOYMENT.md](CLOUDFLARE_DEPLOYMENT.md) for domain setup and registrar/nameserver instructions.

## How ordering works

- The website **does not collect payment and does not transmit form submissions to a server**. It validates the selections, generates a complete order request, then lets the customer open a prefilled email to **justfloralmoments@gmail.com** using their email app or Gmail.
- **The customer must actually send the email.** The website never claims an order was received until then. Requests are not confirmed until the studio personally replies.
- A copy-request button provides a fallback if the customer's email client cannot open automatically.
- No external form service is needed. If fully automatic web-based submissions are wanted later, a Cloudflare Worker/Pages Function with configured email service can be added; that requires further account/domain setup.

## Arrangements

| Item | Price | Includes |
| --- | ---: | --- |
| Medium floral arrangement | $125 | Round glass vase, greenery |
| Large floral arrangement | $175 | Round glass vase, greenery |
| Ramo Buchón, 50 roses | $175 | Wrapped roses, no greenery or vase |
| Ramo Buchón, 75 roses | $250 | Wrapped roses, no greenery or vase |
| Ramo Buchón, 100 roses | $350 | Wrapped roses, no greenery or vase |

Customers select 1–3 flower colors, exactly 1 ribbon color, and 1–2 wrapping paper colors. Actual flowers are designer's choice. Date picker requires a minimum of **21 calendar days** of notice, and preferred pickup time is collected for manual approval.

## Pickup address & privacy

The public site shows **Canal Winchester, Ohio** only. The exact street address is shared directly with the customer **after the order is confirmed**.

**Privacy practice:** Never include the exact pickup address in public website files. Share pickup details privately after personally confirming the order.

## Design assets

The illustrated bouquets in `assets/` are original placeholders, not customer product photos or images taken from other artists. Replace them with photos of your own work before taking paid orders. All files load by relative path and do not require a build step.

## Pre-launch checklist

Confirm actual test emails can be sent and received; check pickup hours, order changes/cancellations, substitutions, local taxes, home-business rules, and policy language. Do not treat requests as sales or accept payments until you have confirmed the process.