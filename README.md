# jugaco.com — Juga Company

Umbrella-brand landing page for **Juga Company**, the home of
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
