# IndoX Energy — Website

Static marketing and lead-generation website for **IndoX Energy** (fuel supply, storage technology and EV charging). Built with Next.js 15 (App Router) and exported as plain static files — **no backend, no database, no payment gateway**. Forms submit client-side to Web3Forms.

> Full context lives in [`docs/PRD.md`](docs/PRD.md) and [`docs/TRD.md`](docs/TRD.md). Project rules for contributors and AI assistants are in [`CLAUDE.md`](CLAUDE.md); where they conflict with the PRD/TRD (theme, gradients, fonts, hover system, GSAP scope), `CLAUDE.md` wins.

---

## Table of contents

1. [Tech stack](#tech-stack)
2. [Getting started](#getting-started)
3. [Environment variables](#environment-variables)
4. [Scripts](#scripts)
5. [Project structure](#project-structure)
6. [Routes](#routes)
7. [Content model](#content-model)
8. [Design system](#design-system)
9. [Animation](#animation)
10. [Forms, analytics and consent](#forms-analytics-and-consent)
11. [SEO](#seo)
12. [Images](#images)
13. [Blog (MDX)](#blog-mdx)
14. [Build and deploy](#build-and-deploy)
15. [Pre-launch checklist](#pre-launch-checklist)
16. [Conventions and constraints](#conventions-and-constraints)

---

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript (strict) |
| Output | `output: "export"`, `trailingSlash: true`, `images.unoptimized: true` |
| Styling | Tailwind CSS v4 (CSS-first `@theme` in `app/globals.css`, no `tailwind.config.ts`) |
| UI primitives | shadcn/ui, Base UI (`@base-ui/react`), lucide-react |
| Animation | `motion` (import from `"motion/react"`), GSAP + ScrollTrigger, Lenis smooth scroll |
| Theming | `next-themes` (dark default, light available) |
| Forms | react-hook-form + zod, Web3Forms |
| Content | Typed TS data in `content/`, MDX blog via gray-matter + `next-mdx-remote/rsc` + `remark-gfm` |
| Tooling | ESLint 9, `sharp` (image tooling) |

Fonts: **Archivo** (headings) and **Inter** (body), defined only in `lib/fonts.ts`.

## Getting started

Requirements: Node.js 20+ and npm.

```bash
npm install
cp .env.example .env.local   # fill in values; empty values disable that feature
npm run dev                  # http://localhost:3000
```

On Windows PowerShell use `Copy-Item .env.example .env.local`.

## Environment variables

All variables are public (`NEXT_PUBLIC_*`) because the site is static. An empty value disables the related feature; nothing renders if an ID is missing.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used for metadata, sitemap and JSON-LD |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Web3Forms access key. Without it, forms show the phone/WhatsApp failure fallback |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 (loaded only after consent) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel (loaded only after consent) |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads tag (loaded only after consent) |
| `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` | Google Ads lead conversion label |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number, country code + number. **PLACEHOLDER** until set (links fall back to `/contact/`) |
| `NEXT_PUBLIC_TOLL_FREE` | Toll-free number shown in the UI |

The Privacy page names Web3Forms / GA4 / Ads / Meta Pixel only when their variable is set for the build (`lib/integrations.ts`), so re-check `/privacy/` after changing env vars.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Static export to `out/` |
| `npm run start` | `next start` (not used in production; hosting is static) |
| `npm run lint` | ESLint |
| `npm run seo:audit` | Crawls `out/` after a build; fails on SEO/link/JSON-LD/sitemap problems (see [SEO](#seo)) |
| `npm run images:check` | Lists missing image files and generated placeholders (`--strict` exits 1) |
| `npm run images:readme` | Regenerates `public/images/README.md` from `content/images.ts` |
| `npm run images:placeholders` | Creates labelled placeholders for missing slots only; never overwrites |
| `npm run images:optimize` | Re-encodes real photos over the size budget (hero ≤ 200 KB, others ≤ 120 KB) |

## Project structure

```text
IndoX Energy/
├── app/                          # Routes (App Router)
│   ├── layout.tsx                # Root layout: fonts, theme, Lenis, header/footer, JSON-LD
│   ├── globals.css               # Tailwind v4 @theme, brand + semantic tokens, hover system
│   ├── page.tsx                  # Home
│   ├── about/                    # /about/
│   ├── contact/                  # /contact/ (quote form, coverage check)
│   ├── products/                 # /products/ + [slug]/ template
│   ├── services/                 # /services/ + [slug]/ template
│   ├── ev-charging/              # /ev-charging/
│   ├── end-to-end-energy-infrastructure/
│   ├── blog/                     # /blog/ + [slug]/ (MDX articles)
│   ├── privacy/  terms/          # Legal pages (draft banner, see below)
│   ├── thank-you/                # noindex, not in sitemap
│   ├── not-found.tsx             # 404 (out/404.html)
│   ├── sitemap.ts  robots.ts     # force-static
│   └── icon.svg
│
├── components/
│   ├── layout/                   # Header, MegaMenu, MobileNav, MobileActionBar, WhatsAppFloat,
│   │                             # Footer, QuoteCTABand, TrustStrip, ComplianceLine, Breadcrumbs,
│   │                             # CookieNotice, Logo, ThemeToggle/Provider, EmptyGauge
│   ├── home/                     # Hero, OurApproachFlow, ProductGrid, ServiceGrid, TechDashboardPreview,
│   │                             # EVTeaser, IndustriesGrid, EndToEndTeaser, PanIndiaMap, WhyIndox,
│   │                             # BlogPreview, ProductCard
│   ├── templates/                # ProductPageTemplate, ServicePageTemplate, DetailHero, FeatureGrid,
│   │                             # ProcessStrip, ChipList, RelatedCard, FAQSection, OverviewGrid
│   ├── about/                    # Story, values, leadership, quality/safety, licences, profile
│   ├── ev/                       # EVSolutions, EVProcess, EVLocations, ACvsDCTable
│   ├── end-to-end/               # EcosystemFlow, BusinessModelCards, PackageSelector
│   ├── blog/                     # ArticleBody, BlogGrid, BlogCard, TableOfContents, ShareBar, ...
│   ├── forms/                    # MiniQuoteForm, QuoteFormFull, NewsletterForm, CoverageCheck,
│   │                             # ThankYouContent, SubmitFailure, submitForm.ts, schemas.ts
│   ├── legal/                    # LegalDocument, DraftBanner
│   ├── animations/               # SmoothScrollProvider, ScrollReveal, AutoReveal, PageTransition,
│   │                             # Marquee, FooterTruck, CustomCursor
│   ├── analytics/                # Analytics (consent-gated)
│   ├── seo/                      # JsonLd
│   ├── decor/                    # GridLines, DottedField, RouteLine, TruckSilhouette
│   └── ui/                       # ImageSlot, FigureFrame, Icon, Eyebrow, SectionHeading, SpecLabel,
│                                 # PlaceholderBadge, ContactLink, CtaLink, accordion, button, input
│
├── content/                      # Typed copy and data (no copy in components)
│   ├── products.ts  services.ts  industries.ts  coverage.ts  india-map.ts
│   ├── home.ts  about.ts  contact.ts  ev.ts  end-to-end.ts  packages.ts
│   ├── blog-ui.ts  common.ts  legal.ts
│   ├── company.ts                # Company facts, phones, legal identifiers (single source)
│   ├── navigation.ts             # Routes, menus, sitemapRoutes, quoteHref()
│   ├── images.ts                 # Every image slot (single source of truth)
│   └── blog/                     # 6 MDX articles (file name = slug)
│
├── lib/                          # fonts, motion, seo, blog, slug, format, analytics, consent,
│                                 # integrations, icons, useMediaQuery, utils
├── scripts/
│   ├── images.mjs                # Image tooling (check / readme / placeholders / optimize)
│   └── seo-audit.mjs             # Post-build SEO audit
├── public/
│   ├── images/<folder>/<slot>.webp   # See "Images"
│   └── logo/                     # logo.png, favicon.png
├── docs/                         # PRD.md, TRD.md
├── .env.example
├── next.config.ts                # Static export config
├── components.json               # shadcn config
└── CLAUDE.md                     # Project rules
```

## Routes

25 PRD routes; 28 sitemap URLs once the six blog articles are counted, plus `/thank-you/` and the 404.

| Route | Notes |
|---|---|
| `/` | Home |
| `/products/` and `/products/[slug]/` | 5 products: `hsd-diesel-supply`, `bulk-fuel-oil-supply`, `smart-diesel-storage-tanks`, `fuel-dispensing-units`, `fuel-bowser` |
| `/services/` and `/services/[slug]/` | 7 services: `doorstep-diesel-delivery`, `bulk-fuel-supply`, `fuel-inventory-management`, `fuel-monitoring-iot`, `tank-fabrication-installation`, `fuel-theft-prevention`, `fuel-management-solution` |
| `/ev-charging/` | EV solutions, process, locations, AC vs DC (qualitative only) |
| `/end-to-end-energy-infrastructure/` | Ecosystem flow, business models, package selector |
| `/about/` | Story, vision, values, quality and safety, profile |
| `/contact/` | Two-step quote form, coverage check, office |
| `/blog/` and `/blog/[slug]/` | Listing (search, filters, pagination) + 6 MDX articles |
| `/privacy/`, `/terms/` | Legal drafts |
| `/thank-you/` | noindex, excluded from sitemap |

Dynamic routes use `generateStaticParams` with `dynamicParams = false`. Use the helpers in `content/navigation.ts` for hrefs (all end with `/`); every "Get a Quote" goes through `ROUTES.quote` or `quoteHref({ service, product })`.

## Content model

- **Copy lives in `content/*.ts`** as typed data; components only render it.
- **Company facts** (CIN, GSTIN, address, phones, leadership, licences) come only from `content/company.ts`.
- **Routes and menus** come only from `content/navigation.ts`. Add every new public route to `sitemapRoutes`.
- **Product and service pages** are single `[slug]` templates (`ProductPageTemplate`, `ServicePageTemplate`) fed by `content/products.ts` / `content/services.ts`. Products describe *what*; services describe *how*.
- **No invented data.** Missing facts are marked `PLACEHOLDER` and render a `PlaceholderBadge`, or the section is omitted.

### Adding a page

1. Check the page's requirements in `docs/PRD.md` and its route in `docs/TRD.md`.
2. Add copy to the right `content/*.ts` file.
3. Reuse `SectionHeading`, `QuoteCTABand`, `Breadcrumbs`, `FAQSection`, `FigureFrame`, `ImageSlot` and the existing grids first.
4. Export `generateMetadata` using `buildMetadata()` from `lib/seo.ts`, and add the relevant JSON-LD.
5. Add the route to `sitemapRoutes` in `content/navigation.ts`.

## Design system

Defined in `app/globals.css`; components use **semantic tokens only** (`bg-background`, `bg-elevated`, `bg-card`, `text-foreground`, `text-heading`, `text-muted-foreground`, `border-border`, `bg-primary`, `text-link`, `text-accent`). Never hardcode hex in components.

- **Brand colours:** blue `#0E4C9E`, green `#398D41`, lime `#4BA826`, blue-glow `#3D86E0`; navy is derived with `color-mix()`.
- **No neutral gray or black.** Every surface, border and text colour is a brand-derived tint.
- **Themes:** dark (default) and light via `ThemeToggle`; both must look intentional.
- **Minimal gradients:** only the Approach / End-to-End flow line and one faint hero glow. Everything else is solid.
- **Shape:** 4–8px radii, no pill buttons (except the logo), borders over shadows, plain lucide line icons.
- **Type:** headings in sentence case; eyebrows use `label-caps`; each section starts with a numbered `Eyebrow`.
- **Hover system:** shared `hv-*` classes only (values in `lib/motion.ts` → `HOVER_CSS`), gated to `(hover: hover) and (pointer: fine)`.
- **Copy voice:** concrete and plain; banned buzzwords are listed in `CLAUDE.md`.

## Animation

- Section entrances: shared `<ScrollReveal>` (`motion` `whileInView`).
- Lenis is initialised once in `SmoothScrollProvider`, driven by `gsap.ticker`.
- GSAP/ScrollTrigger is limited to: hero timeline, Our Approach and End-to-End flows, footer truck, marquee, parallax, pinned/scrubbed sections. `motion` handles reveals, card lift/tilt, magnetic button, cursor, mega menu.
- All durations, speeds and easings live in `lib/motion.ts`.
- Animate only `transform` and `opacity`. Create GSAP instances in `gsap.context()` and revert on unmount.
- Desktop-only extras are gated to `(min-width: 1024px) and (pointer: fine)`.
- `prefers-reduced-motion` shows the final state with no motion.

## Forms, analytics and consent

- **Forms** (`MiniQuoteForm`, `QuoteFormFull`, `NewsletterForm`) submit only through `components/forms/submitForm.ts` (Web3Forms fetch, honeypot, `lead_submit`, sessionStorage lead summary). Validation is zod in `components/forms/schemas.ts` (Indian mobile `^[6-9]\d{9}$`).
- On success: `router.push("/thank-you/")`. On failure: inline `SubmitFailure` with phone and WhatsApp fallback; input is kept.
- **Analytics** (`components/analytics/Analytics.tsx`) loads GA4, Meta Pixel and Google Ads only after the visitor accepts in `CookieNotice` (`lib/consent.ts`). Events go through `trackEvent("lead_submit" | "call_click" | "whatsapp_click")`.
- Every `tel:` / `wa.me` link must use `ContactLink` (or `CtaLink` with `contact`) so clicks are tracked.

## SEO

- Every page exports `generateMetadata` via `buildMetadata()` (unique title and description, canonical with trailing slash, OG, Twitter).
- JSON-LD via `lib/seo.ts`: Organization/LocalBusiness, Product, Service, Article, FAQPage, BreadcrumbList.
- `app/sitemap.ts` and `app/robots.ts` are `force-static`; the sitemap is `sitemapRoutes` plus blog articles and excludes `/thank-you/`.
- `npm run seo:audit` (after `npm run build`) fails on: duplicate or missing title/description, not exactly one `<h1>`, images without alt, `#` or broken links/anchors, bad canonicals, missing or invalid JSON-LD, sitemap not equal to 28 pages, robots issues, missing `404.html` / `ErrorDocument`.

## Images

`content/images.ts` is the single source of truth. Each slot has a `folder`, and its file is always `/images/<folder>/<key>.webp`. Render images only through `components/ui/ImageSlot.tsx`, framed by `FigureFrame` or a card.

| Folder (`public/images/`) | Contents |
|---|---|
| `home/`, `home/hero/` | Hero background and truck cut-out, Approach steps, tech, panorama, CTA |
| `products/` | One image per product |
| `services/` | Service page heroes |
| `industries/` | 8 industry tiles |
| `blog/` | Article covers (16:9) |
| `ev/` | EV hero, charger, AC / DC |
| `end-to-end/`, `about/`, `contact/` | Page heroes and supporting images |

**Replace an image** by dropping a same-named `.webp` into its folder, then run `npm run images:optimize`. **Add a slot** in `content/images.ts` (with `folder` and `imageUsage`), then run `npm run images:readme`. `public/images/README.md` is generated; never edit it by hand. Logos stay in `public/logo/` and render only through `<Logo />`. Never use a retail fuel-station image.

Placeholders are labelled `PLACEHOLDER — FAKE` by `images:check` and **must all be replaced with real photos before launch**.

## Blog (MDX)

- One file per article in `content/blog/<slug>.mdx`; the file name must equal the `slug`.
- Frontmatter: `title`, `slug`, `excerpt`, `category`, `date` (ISO), `author` (`IndoX Energy Team`), `heroImage` (an existing 16:9 `blog/` slot), `relatedLink { label, href }`, and `featured: true` on exactly one post.
- `lib/blog.ts` validates frontmatter at build time, computes reading time and heading TOC. Heading ids come from `lib/slug.ts`; duplicate heading text fails the build.
- Length about 800–1100 words, with at least one table, checklist, `<Callout>` or `<PullQuote>`. No invented statistics, prices, regulation numbers or client stories. Mention IndoX only in the closing line.

## Build and deploy

Hosting is Hostinger shared hosting (no Node runtime).

```bash
npm run build       # static export -> ./out
npm run seo:audit   # verify the export
```

Upload the **contents** of `out/` to `public_html`. `public/.htaccess` (including `ErrorDocument 404 /404.html`) is copied into `out/` at build time.

## Pre-launch checklist

- [ ] Replace every image placeholder (`npm run images:check --strict` passes).
- [ ] Fill `PLACEHOLDER` facts in `content/company.ts` (CIN, GSTIN, address, leadership, licences, response hours, company profile PDF) and set `NEXT_PUBLIC_WHATSAPP_NUMBER`.
- [ ] Set `NEXT_PUBLIC_WEB3FORMS_KEY` and any analytics IDs; re-check `/privacy/`.
- [ ] **Remove the legal `DraftBanner` from `/privacy/` and `/terms/` only after the client confirms in writing that their legal adviser approved the text.** Do not launch with it in place.
- [ ] Resolve the Terms `[PLACEHOLDER: …]` jurisdiction line.
- [ ] `npm run lint`, `npm run build`, `npm run seo:audit` all pass.
- [ ] Check headings for awkward wraps at 360px, 768px and 1280px, in both themes.

## Conventions and constraints

- PascalCase file and export names, one component per file; no `any`; strict TypeScript.
- Tailwind utilities only; brand colours only in `@theme`.
- Import `motion` from `"motion/react"`, never `framer-motion`.
- Never let `motion` and GSAP animate the same element (nest wrappers).
- **Not allowed:** API routes, Server Actions, middleware, ISR/revalidation, login/auth, database, CMS, payment gateway, `next/image` runtime optimisation, `#` placeholder links, invented stats, clients or certifications.
- Every image needs meaningful `alt`; decorative images use `alt=""` with `aria-hidden`.
