# Bloomy — marketing site

Marketing site for [Bloomy](https://www.bloomylearning.com/), the AI mastery-learning platform for K–12. Two audience lanes: a families-first homepage and a dedicated schools page, always one click apart via the nav switcher.

**Live:** https://www.bloomylearning.com/

## Stack

Plain HTML, CSS, and vanilla JavaScript. **Intentionally no build step, no dependencies, no framework.** Please keep it that way — there is nothing to install, compile, or update.

## Structure

```
├── index.html          # Families page (default)
├── schools.html        # Schools page
├── 404.html            # Not-found page (GitHub Pages serves this automatically)
├── css/
│   └── styles.css      # Full design system: tokens, components, responsive rules
├── js/
│   └── main.js         # Nav menu, FAQ accordion, demo form, reveals
├── assets/
│   ├── flower-120.png  # Logo mark (nav/footer/CSS bullets load this)
│   ├── og-image.png    # 1200×630 social share card
│   ├── img/            # Section imagery (WebP) — AI-generated to brand spec
│   └── brand/          # Source art (full-size logo, original scan) — not referenced by any page
├── favicon.* / apple-touch-icon.png / site.webmanifest   # Icon set (root by convention)
├── robots.txt / sitemap.xml
└── .editorconfig / .gitignore
```

The nav and footer are duplicated across `index.html` and `schools.html` (no build step = no includes). Each block carries a `SHARED:` comment listing the intentional per-page differences — mirror any other change in both files.

## Local development

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000. Any static file server works.

## Deploy

GitHub Pages: repo **Settings → Pages → Deploy from branch → main / root**. Push to `main` = deployed.

For the custom domain, add a `CNAME` file containing `www.bloomylearning.com`, point a DNS CNAME record at `austinaway.github.io`, and enable **Enforce HTTPS**.

## Brand tokens

Defined in `:root` in [css/styles.css](css/styles.css). Lane rule: **green = families, blue = schools.**

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#101410` | Headlines, dark pills |
| `--surface` | `#ffffff` | Page background, cards |
| `--canvas` | `#f7f8f5` | Theme color, 404 page |
| `--surface-alt` | `#eff2ec` | Alternating sage bands |
| `--green` / `--green-deep` | `#2bc77d` / `#177a4e` | Families lane, logo |
| `--blue` / `--blue-deep` | `#2d5bd1` / `#24479f` | Schools lane |
| `--lilac` | `#7e5bd8` | BloomyBot / AI |
| `--sun` / `--sun-deep` | `#f4a91c` / `#8a5d05` | Streaks, badges |
| `--rose` | `#cf5a80` | Accents |

Type: [Manrope](https://fonts.google.com/specimen/Manrope) (Google Fonts), weights 500–800, headlines 800. Solid color bands only — no gradients. Color arrives through the `.art` image-placeholder blocks.

## Known gaps / TODO

- Section imagery in `assets/img/` is AI-generated (Higgsfield, to brand spec) — swap for commissioned art/photography when available; each `<img>` slot is a drop-in replacement.
- The schools demo form has no backend yet — JS shows a confirmation but data goes nowhere (`js/main.js`, marked `TODO`).
- Footer **Privacy** / **Terms** links are removed until final policy URLs exist; re-add them in both footers then.
- **Sign in** points at `https://app.bloomylearning.com/`.
