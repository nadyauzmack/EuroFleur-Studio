# EuroFleur Studio SEO maintenance & launch verification

Last editorial/technical SEO update: 2026-10-19

## What is implemented in this repository

- Original, individually addressable journal pages under `/journal/<slug>/` (15 articles), grouped on the main Flower Journal index.
- Homepage excerpts, related-article links on the collection and information pages, and contextual links between articles.
- Page-specific title tags, meta descriptions, self-referencing canonical URLs, Open Graph data and social images.
- Florist/WebSite markup on the homepage; CollectionPage/BlogPosting, BreadcrumbList and visible-question FAQPage JSON-LD where applicable.
- `robots.txt` pointing to `https://eurofleurstudio.com/sitemap.xml`; sitemap includes the homepage, eight main subpages and 15 journal articles.
- Image alt-text refinements and a responsive, lightweight journal article stylesheet.
- Copy consistently describing scheduled pickup in Canal Winchester rather than delivery. No exact street pickup address is published.

## Required checks outside GitHub

1. **Confirm Cloudflare Pages deployment**: Workers & Pages → EuroFleur Studio project → Deployments. Confirm the latest `main` commit deploys successfully. Test `/journal/` and at least two full article URLs on the actual public domain, mobile and desktop. GitHub commits alone do not verify deployment.
2. **Check the canonical hostname**: `https://eurofleurstudio.com/` is the canonical domain in HTML and sitemap. Test `https://www.eurofleurstudio.com/` and ensure it responds with an HTTP 301 redirect to the equivalent non-www path. Cloudflare Pages `_redirects` does **not** support domain-level redirect sources. If missing, use Cloudflare **Bulk Redirects** with source `www.eurofleurstudio.com`, target `https://eurofleurstudio.com`, status `301`, subpath matching and preserve path suffix/query. Follow Cloudflare's www-to-apex setup guide for a proxied www DNS record.
3. **Google Search Console**: Verify the root domain property and resubmit `https://eurofleurstudio.com/sitemap.xml`. Inspect the homepage, `/journal/` and key journal URLs using URL Inspection. Request indexing selectively for the priority pages, then monitor the Pages/Indexing report for crawl errors and canonical mismatches. Submitting is not a guarantee of indexing.
4. **Google Business Profile**: Verify business name, telephone, website URL and the actual eligible business category. Clearly describe that orders are **pickup only**. Use pickup information consistent with Google's rules for service-area and address visibility; do not publish a private home address merely for SEO. Add current original floral photos and seek genuine customer reviews; never generate or buy reviews.
5. **Performance and mobile**: Run PageSpeed Insights on the homepage, `/journal/` and an article. Audit especially the large homepage hero PNG for next-generation image format (WebP/AVIF), properly sized versions, width/height to reduce layout shift, and mobile image loading. Original images were not compressed in this repository-only SEO update. Do not replace image paths without uploading actual optimised files and testing them.
6. **Ongoing content quality**: Update or add useful journal articles only when there is genuinely new floral insight, imagery, experience, seasonal detail or a customer question. Do not publish thin city-by-city variants. Link new posts to suitable order and information pages. Change each page's `dateModified` and sitemap `lastmod` only when the content materially changes.
7. **Editorial accuracy**: Keep prices, styles, payment methods, 21-day notice, blocked dates, last-minute availability, pickup hours and telephone aligned with the real order workflow. Review every journal article after any policy change. Do not claim delivery, full event installations or specific flower availability without confirmation.

## Implementation caveats

- FAQPage JSON-LD is descriptive markup, **not** a promise of FAQ-rich search results; Google generally limits those results to eligible government and health sites.
- Structured data, sitemap submissions and new articles can aid discovery and interpretation; none guarantees ranking or indexing.
- Search visibility also depends on site reputation, customer experience, local relevance, genuine links/reviews and competing pages.
