# IndoX Energy — Website

Static Next.js 15 marketing + lead-gen site. See `CLAUDE.md`, `docs/PRD.md` and `docs/TRD.md`.

## Develop

```bash
npm install
cp .env.example .env.local   # fill in IDs; empty values simply disable that feature
npm run dev
```

## Build & deploy (Hostinger shared hosting)

```bash
npm run build   # static export → ./out
```

Upload the **contents** of `out/` into `public_html`. No server runtime is needed.

## Where things live

- `content/` — all copy and lists (products, services, home sections, blog metadata). Edit here, not in components.
- `lib/constants.ts` — contact details, routes, nav. Values marked `PLACEHOLDER` await client confirmation.
- `app/globals.css` — brand tokens (the only place hex colours live).
- `components/animations/` — `SmoothScrollProvider` (Lenis, once) and `ScrollReveal` (Framer Motion).

## Images

Every image slot is listed in `content/images.ts` (filename, alt text, recommended size). To add or replace
an image, drop a `.webp` with the **same filename** into `public/images/` (e.g. `public/images/hero-bowser.webp`)
and rebuild/re-upload — no code change. Missing files show a branded placeholder with the slot name.

Search the codebase for `PLACEHOLDER` to find every item awaiting real client data.
