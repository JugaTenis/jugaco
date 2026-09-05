# jugacompany.com — Jugá Company

Umbrella-brand site for **Jugá Company**, the home of
[JugáTenis](https://www.jugatenis.com) and [JugáPádel](https://www.jugapadel.app).

Next.js (App Router, Tailwind v4) using the design tokens of the
[plataforma](https://github.com/JugaCompany/plataforma) monorepo
(`app/globals.css` mirrors its `jt-*` tokens; the JugáPádel palette applies
under `[data-sport="padel"]`).

## Live stats

The home page shows the community impact (players, friendships, matches,
clubs, cities). Numbers come from the platform's public `/api/stats` on each
brand domain (`lib/stats.ts`), fetched server-side with ISR every 5 minutes.
If either endpoint fails the stats section is hidden instead of showing stale
placeholders.

## Develop

```sh
pnpm install
pnpm dev      # http://localhost:3000
pnpm build && pnpm start
```

## Deploy (Vercel)

Project `jugaco` in the JugáCompany team, linked to this repo, production
branch `main`. Vercel auto-detects Next.js — no build settings or env vars
needed.

DNS for `jugacompany.com` (Spaceship):

- Apex `jugacompany.com` → `A` record `76.76.21.21`
- `www.jugacompany.com` → `CNAME` `cname.vercel-dns.com`

Add both domains to the Vercel project and redirect `www` to the apex.
Disable GitHub Pages in the repo settings once DNS points to Vercel.

## Assets

Brand logos live in `public/assets/` and are copies of
`apps/web/public/assets/logo+iso*.svg` from the plataforma monorepo — re-copy
them if the brand marks change. `tools/make-logo.js` regenerates the
JugáCompany wordmark (needs `opentype.js`, the Bebas Neue TTF as `bebas.ttf`,
and the tenis wordmark as `wordmark.svg` in the working directory).
