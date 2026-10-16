# EuroFleur Studio — Domain and Cloudflare Pages

**Official website:** https://eurofleurstudio.com/  
**Source:** https://github.com/nadyauzmack/EuroFleur-Studio  
**Order email:** justfloralmoments@gmail.com  
**Status:** Domain has been purchased, but site publishing, DNS setup, and domain attachment are not verified as complete.

This uses **GitHub + Cloudflare Pages** (like the owner's other websites), not Netlify.

## Step 1 — Deploy website from GitHub

1. Sign in to [Cloudflare](https://dash.cloudflare.com/).
2. In **Workers & Pages**, create a **Pages** project and choose **Connect to Git**.
3. Connect the GitHub repository `nadyauzmack/EuroFleur-Studio`.
4. Set **Production branch:** `main`; **Framework preset:** `None`; **Build command:** leave blank; **Build output directory:** repo root (`.` or `/`, as requested by the Cloudflare UI).
5. Deploy. Confirm the temporary `*.pages.dev` site works before pointing the custom domain. Future commits to `main` will trigger automatic deployments.

## Step 2 — Add the purchased domain to Cloudflare DNS

If the domain was **purchased through Cloudflare Registrar**, it may already be in the same Cloudflare account's list of domains; inspect the domain under **Websites** and skip nameserver transfer if already managed by Cloudflare.

If purchased through another registrar (Namecheap, GoDaddy, Squarespace Domains, etc.):

1. In Cloudflare, choose **Add a domain / website**, then add `eurofleurstudio.com`.
2. Check the DNS records detected by Cloudflare, especially any existing email or verification records. Preserve any records the user actually needs.
3. Cloudflare will show **two assigned nameservers** specific to this domain. Do not use nameservers from another domain or copy placeholders from guides.
4. At the **registrar where eurofleurstudio.com was purchased**, open its DNS / Nameservers settings and replace its existing authoritative nameservers with exactly the two assigned by Cloudflare.
5. Save, and check Cloudflare's domain/zone status until nameserver setup is **Active**. This may take some time.

**Important:** Do not confuse setting the DNS nameservers with transferring the domain registration. Keep the registrar unless you explicitly want to change it.

## Step 3 — Attach the domain to the Pages project

1. Open **Workers & Pages → [your EuroFleur Pages project] → Custom domains**.
2. Choose **Set up a domain** and enter `eurofleurstudio.com`; continue through activation. For the apex/root domain, Cloudflare requires the DNS zone to use Cloudflare nameservers.
3. Add `www.eurofleurstudio.com` as a custom domain if you want both versions to work.
4. Use `https://eurofleurstudio.com/` as the primary/canonical URL. Optionally configure a 301 redirect from `www` to apex in Cloudflare's redirect rules. Do not assume redirects were created simply by adding both names.
5. Verify HTTPS/SSL, root and www behavior, mobile layout, images, and a test email request before sharing the link.

See Cloudflare's official documentation:
- https://developers.cloudflare.com/pages/configuration/custom-domains/
- https://developers.cloudflare.com/pages/configuration/git-integration/
- https://developers.cloudflare.com/pages/how-to/www-redirect/

## Website behavior and custom orders

The static site validates bouquet/rose counts, flower colors (1–3), ribbon colors (1–2), paper colors (1–2), and pickup requests **21+ days ahead**. It then opens a prefilled email to `justfloralmoments@gmail.com`.

**Customers must press Send in their email client or Gmail.** The static site does not automatically transmit or save orders and does not collect payment. The studio personally confirms orders and gives customers their exact pickup address privately.

## Pickup privacy warning

The public website and order-request emails display **Canal Winchester, OH** only. Send the exact pickup address privately after order confirmation. Do not add a home address to this public repository.

## SEO files prepared in GitHub

The `index.html` metadata identifies `https://eurofleurstudio.com/` as the canonical site. `robots.txt`, `sitemap.xml`, and `favicon.svg` are included. These changes **do not configure DNS, domain ownership verification, or actual website deployment**.

## Updating the website

Edit files in GitHub and commit to `main`. When the repository is connected to Cloudflare Pages, future updates will deploy automatically.
