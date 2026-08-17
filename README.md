# jugaco.com — Jugá Company

Umbrella-brand landing page for **Jugá Company**, the home of
[JugáTenis](https://www.jugatenis.com) and [JugáPádel](https://www.jugapadel.app).

Static site (single `index.html`, no build step) deployed with **GitHub Pages**
from the `main` branch root. The custom domain is set via the `CNAME` file.

## DNS setup for jugaco.com

Point the domain at GitHub Pages:

- Apex `jugaco.com` → `A` records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `www.jugaco.com` → `CNAME` record: `jugatenis.github.io`

## Assets

Logos are copies of `apps/web/public/assets/logo+iso*.svg` from the
[jugatenis](https://github.com/JugaTenis/jugatenis) monorepo — re-copy them if
the brand marks change.

## Logo

`assets/logo-jugacompany.svg` reuses the exact "JUGÁ" glyph outlines from the
JugáTenis wordmark; "COMPANY" is outlined from Anton (SIL OFL), scaled to the
wordmark's cap height and skewed to its measured 10° slant. Regeneration
script: see the `make-logo2.js` gist in the PR/commit history context (it needs
`opentype.js` + Anton TTF).
