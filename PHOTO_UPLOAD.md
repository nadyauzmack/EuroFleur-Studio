# Add the three bouquet photos to EuroFleur Studio

The site code already references these filenames, with old illustrations as temporary fallbacks until the images are uploaded.

| Local filename | GitHub destination | Appears in |
|---|---|---|
| `medium-photo.webp` | `assets/medium-photo.webp` | Medium card and order preview |
| `large-photo.webp` | `assets/large-photo.webp` | Large card, homepage hero, story section, order preview |
| `ramo-photo.webp` | `assets/ramo-photo.webp` | Ramo Buchón collection card and order preview |

## Upload the files

1. Download and unzip `EuroFleur_Bouquet_Photos.zip` from the ChatGPT conversation.
2. Go to [GitHub's assets directory](https://github.com/nadyauzmack/EuroFleur-Studio/tree/main/assets).
3. Choose **Add file → Upload files** and upload the three `.webp` files from the unzipped `assets` folder.
4. Commit the change directly to `main`.
5. Cloudflare Pages should redeploy automatically. Refresh `https://eurofleurstudio.com/` and check all three product cards, homepage hero and order preview.

These photographs are supplied by the studio owner. Image references in `index.html` currently use the above filenames. If they are unavailable, the site displays the previous SVG illustrations instead. Pricing and ordering behavior are unchanged.

Photos show examples, not a guarantee of exact flower varieties or colors. Photo 3 is the full three-panel comparison of 50, 75 and 100 rose bouquet sizes.