# CLAUDE.md — IndoX Energy Website

Read `docs/PRD.md` (v2) and `docs/TRD.md` (v2) first for full context before generating pages or components. Where this file conflicts with them, this file wins (theme, gradients, fonts, hover system, GSAP scope).

## Project summary

Static Next.js 15 (App Router) marketing + lead-gen website for IndoX Energy (fuel supply, storage tech, EV charging). 25 PRD routes (§5): 28 sitemap URLs once the 6 blog articles are counted, plus `/thank-you/` and the 404. **No backend, no database, no payment gateway.** Forms submit client-side to Web3Forms. Heavy emphasis on polished animation and a premium, non-generic visual feel — this is the #1 priority alongside correct content structure.

## Tech stack (do not deviate without asking)

Next.js 15 (App Router) + TypeScript (strict) + **Tailwind CSS v4** (CSS-first, `@theme` in `app/globals.css`, no `tailwind.config.ts`) + shadcn/ui + **`motion`** (import from `"motion/react"` — never `framer-motion`) + GSAP/ScrollTrigger + Lenis (smooth scroll, driven by `gsap.ticker`) + lucide-react + react-hook-form + zod + gray-matter (MDX frontmatter). Optional: React Three Fiber for a hero 3D element.

## Folder structure (TRD §3)

- `components/layout/` — Header, MegaMenu, MobileNav, MobileActionBar, WhatsAppFloat, Footer, QuoteCTABand, TrustStrip, ComplianceLine, CookieNotice, Logo, ThemeToggle, ThemeProvider
- `components/home/` — the Home sections (Hero, OurApproachFlow, ProductGrid, ServiceGrid, TechDashboardPreview, EVTeaser, IndustriesGrid, EndToEndTeaser, PanIndiaMap, WhyIndox, BlogPreview) + their helpers
- `components/templates/` — `ProductPageTemplate`, `ServicePageTemplate`, `FAQSection`, shared detail-page blocks
- `components/forms/`, `components/animations/`, `components/analytics/`, `components/ui/`
- `content/` — typed data: `products.ts`, `services.ts`, `about.ts`, `contact.ts`, `ev.ts`, `end-to-end.ts`, `packages.ts`, `blog-ui.ts`, `industries.ts`, `coverage.ts`, `company.ts`, `navigation.ts`, `images.ts`, `home.ts`, `common.ts`, `blog/*.mdx`
- `lib/` — `fonts.ts` (Archivo + Inter), `motion.ts`, `seo.ts`, `blog.ts`, `slug.ts`, `format.ts`, `analytics.ts`, `consent.ts`, `icons.ts`, `utils.ts`
- `scripts/images.mjs` — image tooling behind `npm run images:check | images:readme | images:placeholders | images:optimize` (reads `content/images.ts`). `images:optimize` re-encodes only REAL photos that exceed the TRD §10 budget (hero ≤ 200KB, others ≤ 120KB); run it after dropping in new photos.
- `scripts/seo-audit.mjs` — `npm run seo:audit` (after `npm run build`): crawls `out/` and fails on duplicate/missing title or description, not exactly one `<h1>`, `<img>` without alt (decorative = `alt=""` + `aria-hidden`), `#`/broken internal links or anchors, bad canonicals, missing/invalid JSON-LD per page type, sitemap ≠ 28 indexable pages, robots issues, missing 404.html / `ErrorDocument`. Run it before every release.

## Coding conventions

- **Components:** PascalCase file + export name (`QuoteFormFull.tsx`). One component per file.
- **Routes:** every page lives under `app/` per the exact folder structure in `TRD.md`. Don't invent new URL slugs — use the ones in the sitemap table and the helpers in `content/navigation.ts` (all hrefs end with `/`).
- **Product and service pages are `[slug]` templates:** `app/products/[slug]/page.tsx` and `app/services/[slug]/page.tsx` with `generateStaticParams` over `content/products.ts` / `content/services.ts` and `dynamicParams = false`. One template file each — never one page file per product.
- **Shared page sections** (Hero, TrustStrip, QuoteCTABand, Breadcrumbs, MiniQuoteForm, FAQ accordion) must be built once in `components/` and reused across every Product/Service page — never copy-pasted per page.
- **Content stays out of components.** Copy lives in `content/*.ts` as typed data (TRD §4 types); components just render it. Company facts, phones and legal lines come only from `content/company.ts`; routes and menus only from `content/navigation.ts`.
- **Styling:** Tailwind utility classes only; brand colours live in `@theme` in `app/globals.css` — never hardcode hex values in components.
- **No `any` types.** Type all content models and component props.
- **No invented data.** Never fabricate stats, counters, client logos, testimonials, certifications, coverage or specs — leave a clearly marked `PLACEHOLDER` (and `PlaceholderBadge` in the UI) or omit the section, per PRD §9.

## Product pages

- `app/products/page.tsx` (overview) and `app/products/[slug]/page.tsx` (`generateStaticParams` over `content/products.ts`, `dynamicParams = false`). The `[slug]` page only builds metadata and renders `<ProductPageTemplate product={…} />` — no per-product JSX anywhere.
- `components/templates/ProductPageTemplate.tsx` renders the 9 PRD §8.4 blocks in this order and nothing else: 1 Hero (Breadcrumbs, H1 = product name, `promise`, 4:3 `heroImage` in `FigureFrame`, "Enquire now" → `#enquire` + `MiniQuoteForm` pre-set to the product name) → `TrustStrip` → 2 Overview (`overviewTitle`, `overview`, 4:3 `detailImage`) → 3 Key features (card grid; spec table only when `specs` has client-confirmed values) → 4 Applications (chips) → 5 Related service card (`relatedServiceSlug` → `/services/[slug]/`) → 6 Safety & compliance line (`safetyNote` + link to `/about/#quality-safety`) → 7 `FAQSection` (Accordion + FAQPage JSON-LD) → 8 Other products (4 `ProductCard`s) → 9 `QuoteCTABand`. Section eyebrows are numbered 01–08 after the hero.
- JSON-LD per product page: `productJsonLd` (no price/offers), `breadcrumbJsonLd` via `Breadcrumbs`, `faqPageJsonLd` via `FAQSection`. Title = `seo.title + " | IndoX Energy"`.
- All copy lives on the `Product` object (`promise`, `overviewTitle`, `overview`, 6–8 `features`, `applications`, `safetyNote`, 4–6 `faqs`) and shared labels in `productPageCopy` / `productsOverview`. Product pages say WHAT is supplied/installed; service pages say HOW — never reuse a sentence between them. No invented specs, capacities, prices, stats, clients or certifications; keep "eligible customers" / "where applicable" / "subject to applicable regulations", and `ComplianceLine` under the hero, overview and features.
- `/products/` uses `OverviewGrid` (identical `ProductCard`s, 4:3, 3 + 2 desktop / 2 tablet / 1 mobile, CTA "Explore") and the "Products + services together" ruled list.
- Shared building blocks built once for all later templates: `components/layout/Breadcrumbs.tsx`, `components/templates/FAQSection.tsx`, `components/ui/accordion.tsx` (Base UI; panels stay mounted so answers are in the static HTML), `components/templates/OverviewGrid.tsx`.
- `sitemapRoutes` (content/navigation.ts) lists only routes that are built; add every new public route there (28 today: 22 content pages incl. 6 articles, plus Privacy and Terms; `/thank-you/` and the 404 are never listed).

## Service pages

- `app/services/page.tsx` (overview) and `app/services/[slug]/page.tsx` (`generateStaticParams` over `content/services.ts`, `dynamicParams = false`); the `[slug]` page only builds metadata and renders `<ServicePageTemplate service={…} />`.
- `components/templates/ServicePageTemplate.tsx` renders the 10 PRD §8.6 blocks in order: 1 Hero (`DetailHero`: breadcrumbs, name, `promise`, 4:3 `heroImage`, "Get a Quote" → `#enquire`, `MiniQuoteForm` pre-set to the service name) → `TrustStrip` → 2 The problem (exactly 3, numbered, ruled columns) → 3 What we do (`FeatureGrid`, 4–6) → 4 How it works (`ProcessStrip`: step titles exactly as the PRD table + one line each; accent lines draw in order with a one-shot GSAP ScrollTrigger, no pin; horizontal ≥640px, vertical rail below; reduced motion = fully drawn) + `ComplianceLine` → 5 Benefits (3–4 equal cards) → 6 Who it's for (`ChipList` of industry names from `industries`) → 7 Related product (`RelatedCard` → `/products/[slug]/`) → 8 `FAQSection` → 9 Other services (3 `ProductCard`s, same group first) → 10 `QuoteCTABand`. Eyebrows 01–08 after the hero.
- JSON-LD: `serviceJsonLd` (provider = Organization, areaServed India), `breadcrumbJsonLd`, `faqPageJsonLd`. Title = `seo.title + " | IndoX Energy"`.
- Copy lives on each `Service` (`promise`, `problems`, `whatWeDo`, `howItWorks`, `benefits`, `industries`, `faqs`) + `servicePageCopy` / `servicesOverview` / `serviceGroups`. Service pages describe HOW (process, outcome, what the customer gets); never reuse product-page sentences (compliance qualifiers excepted). No invented stats, prices, response times, capacities, clients or certifications. `name`, `shortName`, `group`, `icon`, `promise` also feed Home.
- `/services/`: 7 identical `ProductCard`s (4:3) in three bands (Supply, Infrastructure, Intelligence) laid out in ONE 4-column grid on desktop (band label in column 1, `lg:auto-rows-fr`) so every card is the same size; then the "Also see the products" strip.
- Product ↔ service links must match the PRD tables both ways (`relatedServiceSlug` / `relatedProductSlug`).
- Shared detail-page blocks (used by both templates, never copy-pasted): `DetailHero`, `FeatureGrid`, `ChipList`, `RelatedCard`, `FAQSection`, `ProcessStrip`, `OverviewGrid` in `components/templates/`; cards are always `components/home/ProductCard.tsx`.

## About, Contact, Thank-you

- **Placeholder policy (all pages):** never invent people, licences, numbers, addresses, response times, years, fleet sizes, clients or certifications. Company facts live only in `content/company.ts` (`cin`, `gstin`, `address`, `mapUrl`, `leadership`, `licences`, `RESPONSE_HOURS`, `COMPANY_PROFILE_PDF`). Empty register facts render a `PlaceholderBadge` ("To be added"); empty lists hide their section; an empty callback time falls back to "Our team will call you back shortly."
- **/about/** (`app/about/page.tsx`, copy in `content/about.ts`, sections in `components/about/`): Hero → Our story → `VisionMission` → `CoreValues` → `Leadership` → `QualitySafety` (`id="quality-safety"`, target of every product page's safety link) → `Licences` → `Commitment` → `CompanyProfileTable` → `QuoteCTABand`. `Leadership` and `Licences` return `null` while their arrays are empty; the page numbers only the sections actually shown (components take an `index` prop). The company-profile PDF button renders only if the file exists in `public/` at build time. Story / vision / mission / values / commitment copy is a DRAFT derived from the PRD: replace it with client text, don't embellish it.
- **Annotated bowser** (`QualitySafety`): callouts are HTML overlays with numbered markers positioned by `%` (`x`, `y` in `content/about.ts`), never text in the photo; the legend list is the accessible content (markers `aria-hidden`), beside the image on desktop, under it on mobile. Re-position markers when the real photo lands.
- **/contact/** (`app/contact/page.tsx`, copy in `content/contact.ts`): hero (+ `responsePromise`) → `TrustStrip` → `QuoteFormFull` (`#quote-form`) beside the contact cards → `CoverageCheck` → office block (map iframe + "Open in Maps" only when `company.address` exists, otherwise a placeholder card). No `QuoteCTABand`. ContactPage + BreadcrumbList JSON-LD.
- **Every "Get a Quote"** points at `ROUTES.quote` (`/contact/#quote-form`) or `quoteHref({ service, product })` from `content/navigation.ts` — never plain `/contact/`. Deep-link params: `?service=<service slug | ev-charging | end-to-end>` (comma list allowed) and `?product=<product slug>`; a product also pre-ticks its related service. Product/service pages pass their own `quoteHref` to `QuoteCTABand`.
- **QuoteFormFull**: 2 steps exactly per PRD §8.11 (schema `quoteFullSchema`, per-step fields `QUOTE_STEP_FIELDS`), per-step validation before Next, Back keeps values, focus moves to the step heading, Enter on step 1 = Next. Option lists (`solutionOptions`, `productOptions`, `volumeOptions`, `industryOptions`) live in `content/contact.ts`. Failure UI for every form is `components/forms/SubmitFailure.tsx`; input styles come from `components/forms/fieldStyles.ts`.
- **/thank-you/** (noindex, not in the sitemap): `ThankYouContent` reads the `LeadSummary` that `submitForm` stores in sessionStorage (name, requirement, city, topics); direct visits get the generic text. 3 next steps via `ProcessStrip`, WhatsApp (pre-filled via `CtaLink contact.message`) + call buttons, 2 related posts (`relatedCategoriesFor(topics)`, else the first 2) as `components/blog/BlogCard.tsx`. Backup conversion = `trackEvent("lead_submit", { source: "thank_you_page" })`, only with consent, only after a real submit, once per lead (`CONVERSION_FIRED_KEY`, cleared by `submitForm`).

## EV Charging and End-to-End

- **/ev-charging/** (`app/ev-charging/page.tsx`, copy in `content/ev.ts`, sections in `components/ev/`): `DetailHero` (16:9 `ev-hero`, "Book a Site Survey" → `quoteHref({ service: "ev-charging" })`, MiniQuoteForm pre-set to "EV Charging Solutions") → `EVSolutions` (shared `FeatureGrid`) → `EVProcess` (shared `ProcessStrip`, 6 steps, line draw, no pin) → `EVLocations` (8 identical icon tiles, no images) → `ACvsDCTable` → `FAQSection` → `QuoteCTABand` with `copy={ev.cta}` ("Host an IndoX charger."), `solid`, `whatsapp={false}`. Service + FAQPage + BreadcrumbList JSON-LD.
- **EV comparison is qualitative only**: slower / faster, long stay / quick top-up, typical locations and dwell time. Never kW ratings, charging times, prices, connector counts, subsidies, savings or ROI. `ACvsDCTable` is a real `<table>` (caption, `scope="col"`/`"row"`) inside its own `overflow-x-auto` region (`min-w`), so only the table scrolls on mobile. Keep "subject to site conditions, approvals and applicable regulations" on installation claims.
- **/end-to-end-energy-infrastructure/** (`app/end-to-end-energy-infrastructure/page.tsx`, copy in `content/end-to-end.ts`, components in `components/end-to-end/`): hero (16:9 `e2e-hero`, Get a Quote → `quoteHref({ service: "end-to-end" })`) → `EcosystemFlow` → `BusinessModelCards` → `PackageSelector` → `QuoteCTABand`. BreadcrumbList JSON-LD.
- **EcosystemFlow**: Our Approach pattern without the pin — the allowed `bg-flow-x`/`bg-flow-y` line scrubs with scroll (`ECOSYSTEM` in `lib/motion.ts`) and nodes activate as it reaches them; horizontal from `lg`, vertical stepper below; SSR / no-JS / reduced motion = final state. All 7 nodes are real links (routes from `content/navigation.ts` helpers only).
- **Business models**: 4 identical cards; "Best for" examples are business types, never client names; no stats.
- **PackageSelector** (client only): ALL recommendation logic lives in `content/packages.ts` — the `needs` list (label, category, quote-form `service`, optional `product`) and the ordered `rules` table (first match wins: EV + anything → Integrated; 3+ needs across categories → Integrated; supply-only → Supply; monitoring-only → Technology; storage/dispensing (± monitoring) → Infrastructure; EV-only → Infrastructure; otherwise Integrated). The component only renders `recommend(selected)`: native checkboxes, `aria-live` announcement, "Request a quote for this" (deep link with every selected need's service, plus `end-to-end` for Integrated), Reset, neutral prompt when nothing is selected.
- `QuoteCTABand` accepts optional `copy`, `solid` and `whatsapp` props; `DetailHero` accepts optional `ctaHref` and `imageAspect` — defaults keep every existing page unchanged.

## Blog

- **MDX pipeline:** one file per article in `content/blog/<slug>.mdx` (file name = `slug`, enforced). Frontmatter = `PostFrontmatter` (TRD §4): title, slug, excerpt, category (from `BLOG_CATEGORIES`), ISO date, author `{ name: "IndoX Energy Team", role: "Editorial" }` (no personal names or photos), heroImage (an existing 16:9 `blog/` slot), `relatedLink { label, href }` to a real page, `featured: true` on exactly one post. `lib/blog.ts` reads and validates them at build time (fs + gray-matter), computes `readingMinutes` (words ÷ 200) and the H2/H3 `headings`; `components/blog/ArticleBody.tsx` renders with `next-mdx-remote/rsc` + `remark-gfm` (tables, `- [ ]` checklists). `app/blog/[slug]/page.tsx`: `generateStaticParams` over all posts, `dynamicParams = false`. Articles are appended to the sitemap in `app/sitemap.ts` (not `navigation.ts`, which must stay client-safe).
- **Writing rules:** ~800–1100 words, intro → 4–6 H2 sections (H3 inside) → at least one table / checklist / `<Callout>` / `<PullQuote>` → short close. No invented statistics, percentages, prices, savings, studies, regulation numbers or client stories; keep general facts qualitative and hedged. Safety content is general good practice that defers to applicable rules and the site's safety officer — never promise compliance or safety outcomes. Fuel grades: no spec numbers, always "confirm with the equipment manufacturer". EV: no kW, price or subsidy numbers. Mention IndoX only in the closing line (the in-article CTA is automatic).
- **Heading ids / TOC:** ids come from `lib/slug.ts` (`slugify`) on BOTH sides — `lib/blog.ts` for the TOC and the `h2`/`h3` MDX components for the rendered ids — so they always match; duplicate heading text fails the build. Keep headings plain text (no links/code in headings). `TableOfContents` = sticky left column on desktop with scroll-spy, `<details>` on mobile.
- **Article template:** header (category, title, excerpt, author, date, read time, 16:9 hero) → TOC + body (~70ch) with the `InArticleCTA` inserted automatically after the 2nd H2 section (`splitAfterSection`) → `ShareBar` → `AuthorBox` → 3 related posts (same category first, then latest) → `QuoteCTABand`. Article + BreadcrumbList JSON-LD; `buildMetadata({ image, article })` for the OG image. MDX tables render inside their own focusable `overflow-x-auto` region.
- **Listing (`/blog/`):** `BlogGrid` (client) does search, category chips (All + every category, empty ones included with an empty state), the featured card (default view only), a 3/2/1-column grid of identical `BlogCard`s (16:9, 2-line excerpt, read time, date) and pagination after 9 (hidden otherwise). Filter state lives in the URL (`?q=&category=&page=`, `history.replaceState`), SSR renders the unfiltered first page.
- **NewsletterForm** (`components/forms/NewsletterForm.tsx`): email only, `newsletterSchema`, `submitForm({ form: "newsletter" })` — newsletter signups never fire `lead_submit` and never touch the thank-you summary. Inline success / failure (failure keeps the email).
- **Share links exception:** `ShareBar`'s LinkedIn / WhatsApp links are reader SHARE links (`wa.me/?text=` with no number), not IndoX contact links, so they are plain anchors without call/WhatsApp tracking. Every link that contacts IndoX still goes through `ContactLink` / `CtaLink contact`.

## Legal pages and 404

- **/privacy/** and **/terms/** (`app/privacy/page.tsx`, `app/terms/page.tsx`, copy in `content/legal.ts`, shared body `components/legal/LegalDocument.tsx` with the blog's `TableOfContents`). No QuoteCTABand. Sitemap: yes.
- **DRAFT BANNER — MUST NOT GO LIVE UNREVIEWED.** Both pages show `components/legal/DraftBanner.tsx` (text `LEGAL_DRAFT_NOTICE`: "Draft for legal review — not yet approved by IndoX Energy's legal adviser. Do not treat as final.") at the top and bottom. Remove it ONLY after the client confirms in writing that their legal adviser approved the text. Do not launch the production site while it is still there, and never delete it on your own initiative.
- Never invent legal facts: no retention period (the Privacy copy says it will be confirmed by the legal adviser), no court city/state (Terms use a `[PLACEHOLDER: …]` line), no registration numbers, no "last updated" date. Contact details come from `content/company.ts` only.
- The Privacy "Third-party services" and cookie text are built from `lib/integrations.ts`, which reads the same `NEXT_PUBLIC_*` env vars as `Analytics.tsx` and `submitForm.ts`. Web3Forms / GA4 / Google Ads / Meta Pixel are named only when their variable is set for the build, so re-check the page after changing env vars or adding a tool.
- **404** (`app/not-found.tsx`, copy `notFoundPage` in `content/common.ts`, illustration `components/layout/EmptyGauge.tsx`): static export writes `out/404.html`; `public/.htaccess` has `ErrorDocument 404 /404.html`. No canonical, noindex. The gauge is drawn in code with theme tokens (no text or logo inside the SVG).

## Animation rules

- Wrap section entrances in the shared `<ScrollReveal>` component (`motion` `whileInView`) — don't write one-off `useEffect` + IntersectionObserver per section.
- Lenis smooth scroll is initialized once in `SmoothScrollProvider` at the root layout, driven by `gsap.ticker` with `ScrollTrigger.update` on scroll — never re-initialize per page.
- **GSAP + ScrollTrigger** may be used for: the hero timeline, the Our Approach flow (and the End-to-End ecosystem flow), the footer truck (`FooterTruck`), the text marquee, image scroll parallax, and pinned/scrubbed sections.
- **`motion`** handles simple reveals, card lift/tilt, the magnetic button, the custom cursor, the mega menu and small state changes. Plain hover states use the CSS hover system (see "Theme & fonts"). Keep the two tools' responsibilities separate — never let both animate the same element (nest wrappers instead).
- All timing/speed/easing values live in `lib/motion.ts` — never hardcode durations or speeds in components.
- Animate only `transform` and `opacity` (image "wipes" are a cover panel scaling away, not `clip-path`; bars grow with `scaleY`, not `height`). Create GSAP instances inside `gsap.context()` and `revert()` on unmount; pause looping animations when offscreen.
- Desktop-only extras (magnetic buttons, card tilt, parallax, pinning) must be gated to `(min-width: 1024px) and (pointer: fine)` (pinning: `min-width: 768px`); mobile gets the lighter version.
- Always respect `prefers-reduced-motion`: show the final state, no motion, Lenis and pinning disabled.
- Keep animations tasteful: entrance + scroll reveals + hover states are enough. Never delay the user from reading content or reaching a CTA (hero sequence < 1.2s).

## Forms

- Use `components/forms/submitForm.ts` for all form submissions — a single function wrapping the Web3Forms fetch call and the `lead_submit` event. Don't write ad-hoc fetch calls inside form components.
- `MiniQuoteForm` pre-fills the "Requirement" field based on the current page (pass the page's product/service name as `requirement`; options come from `requirementOptions` in `content/common.ts`). Validation lives in `components/forms/schemas.ts` (zod; Indian mobile `^[6-9]\d{9}$`, "+91"/leading 0 normalised). Form copy lives in `content/common.ts` (`miniQuoteForm`, `thankYou`).
- `submitForm()` handles the honeypot (`botcheck`), `form_source`, `lead_submit` and the sessionStorage summary for `/thank-you/`; without `NEXT_PUBLIC_WEB3FORMS_KEY` it returns a failure so the phone/WhatsApp fallback shows.
- On success: `router.push('/thank-you/')`. On failure: inline error state with phone + WhatsApp fallback, no silent failures, no lost input.
- Never add a backend API route for form handling unless explicitly asked — the whole point of this stack is zero backend.

## Analytics (consent-gated)

- `components/analytics/Analytics.tsx` injects GA4, Meta Pixel and Google Ads via `next/script` **only after** the visitor accepts in `CookieNotice` (choice in `localStorage` via `lib/consent.ts`, wrapped in try/catch). It renders nothing when an ID is missing.
- Fire events only through `trackEvent('lead_submit' | 'call_click' | 'whatsapp_click')` in `lib/analytics.ts`.
- Every `tel:` / `wa.me` link must be `components/ui/ContactLink.tsx` (or `CtaLink` with `contact={…}`) so call/WhatsApp clicks are always tracked. Never hand-write a `tel:` or `wa.me` anchor.

## SEO

- Every page must export `generateMetadata` using `buildMetadata()` from `lib/seo.ts` with a unique title + description (canonical with trailing slash, OG, Twitter) — never leave a page with default/duplicate metadata.
- Add JSON-LD via `lib/seo.ts` helpers: Organization/LocalBusiness (root layout, from `content/company.ts`), Product (product pages), Service (service pages), Article (blog), FAQPage (any FAQ block), BreadcrumbList (inner pages).
- `app/sitemap.ts` and `app/robots.ts` use `export const dynamic = "force-static"`; the sitemap reads `sitemapRoutes` from `content/navigation.ts` and excludes `/thank-you/`.
- All links must be real (`href`) — never leave a placeholder `#` link.
- Every image needs meaningful `alt` text.

## What NOT to build

- No login/auth, no user dashboard, no database, no CMS integration (blog is local MDX in `content/blog/`, read at build time by `lib/blog.ts`).
- No payment gateway, no `/payments` page, no Payments link.
- **No API routes, no Server Actions, no middleware, no ISR/on-demand revalidation.** Hosting is Hostinger shared hosting (no VPS, no Node runtime) — the site must build via `next build` with `output: 'export'` and run as plain static files. Anything requiring a server at runtime will not work after deploy.
- Don't use `next/image`'s runtime optimization — config has `unoptimized: true`. Assume images are pre-sized/compressed before they land in `public/`.
- Every dynamic route (`/blog/[slug]`, `/products/[slug]`, `/services/[slug]`) must have all params known at build time via `generateStaticParams` — no on-demand generation.

## When adding a new page

1. Check `docs/PRD.md` for that page's required sections and content source.
2. Check `docs/TRD.md` for its exact route path and which shared components it should reuse.
3. Add content data to the right `content/*.ts` file — don't hardcode copy in the page file.
4. Reuse `SectionHeading`, `QuoteCTABand`, `Breadcrumbs`, FAQ accordion, `FigureFrame`, `ImageSlot` and the relevant grid components before writing anything new.
5. Add the route to `sitemapRoutes` in `content/navigation.ts` if it isn't generated there already.

## Theme & color rules

These override any "gradients everywhere" / dark-only wording in `docs/PRD.md` and `docs/TRD.md`.

**Brand colors** (from the final logo) — defined only in `@theme` in `app/globals.css`. Never hardcode hex in components.
- `brand-blue` `#0E4C9E`
- `brand-green` `#398D41`
- `brand-lime` `#4BA826`
- `brand-blue-glow` `#3D86E0` (lighter tint for blue text/links/icons on dark)
- `brand-navy` = `color-mix(in oklab, brand-blue 46%, black)` ≈ `#011433` — derived deep navy: light-mode ink **and** the dark-mode base

**No neutral gray and no black anywhere** — not in components, not in tokens. Every surface, border and text colour is a tint derived from the brand tokens with `color-mix()`, defined once in `app/globals.css` (`:root` / `.dark`). Only white (`#fff`, surfaces/text on dark) and the brand values themselves are literal.

**Dark + light themes** via `next-themes` (`attribute="class"`, `defaultTheme="dark"`, `enableSystem={false}`, no flash), toggled by `components/layout/ThemeToggle.tsx` in the Header and MobileNav. Components use **semantic tokens only** — defined once for `:root` (light) and `.dark`:

| Token | Light | Dark |
|---|---|---|
| `--bg` | white + 2% brand-blue | brand-navy |
| `--bg-elevated` | white + 6% brand-blue (light blue tint) | navy + 9% brand-blue |
| `--bg-tint-green` (`bg-tint-green`) | white + 7% brand-green | navy + 9% brand-green |
| `--surface` / `--surface-hover` | white / white + 3% blue | navy + 15% / 22% blue |
| `--border` / `--border-strong` | white + 14% / 28% blue | navy + 24% / 40% blue-glow |
| `--text` | brand-navy (ink, ~17:1) | white |
| `--text-muted` | blue-tinted navy (~6:1) | white + 45% blue-glow |
| `--heading` (h1–h4, set in base styles) | brand-blue | white + 22% blue-glow |
| `--primary` | brand-blue fill, white text | brand-blue fill, white text |
| `--accent` | brand-green | brand-lime |
| `--link` | brand-blue | brand-blue-glow |

Use `bg-background`, `bg-elevated`, `bg-tint-green`, `bg-card`, `text-foreground`, `text-heading`, `text-muted-foreground`, `border-border`, `bg-primary`, `text-link`, `text-accent`, etc. Never write `dark:`-only or light-only hardcoded colors; both themes must look intentional. The shadcn variable names are mapped onto these tokens (no zinc/neutral palette). Headings on a brand-blue fill set `text-on-brand` explicitly (the base `--heading` colour doesn't inherit).

**Colour roles:** headings, links and buttons use brand blue (on dark: the blue-glow tint for text, brand-blue as fill); green/lime only for small accents (icons, underlines, status, the EV section tint).

**Contrast:** brand-blue on the navy background is ~2.2:1, so on dark it is **fill only** (with white text on top) — never text, links or thin strokes. Use `--link` / `--heading` instead. Brand-green on the light background is ~4:1, so in light mode `--accent` is for icons, large text, separators and fills — not small body text.

**Minimal gradient rule.** Default to solid colors. Gradients are allowed in exactly two places:
1. The connecting line in the Our Approach flow and the End-to-End ecosystem flow (blue → green → lime), `bg-flow-x` / `bg-flow-y`.
2. One very faint radial glow behind the Hero, `bg-hero-glow` (softer tint in light mode).

The Hero also has a full-width architectural grid (`hero-grid*` utilities): solid 1px brand-blue lines (blue-glow on dark) at ~8% light / ~12% dark, 60px cells, every 4th line stronger, drawn with hard-stop repeating gradients (no colour blending) and faded out at the sides and bottom with a CSS mask. It is the only grid on the site.

Everything else is solid: buttons = solid brand-blue fill; cards = solid `--surface` with a 1px `--border`; accents = solid green/lime used sparingly; hover = border-color change + 4px lift (shadow at most `shadow-subtle`). No gradient borders, no glow gradients, no gradient text, no glassmorphism blur except the sticky header after scroll.

**Logo:** only through `<Logo />` — on a white rounded pill in both themes until a white-text logo arrives (the one pill shape on the site).

**Images:** every image goes through `components/ui/ImageSlot.tsx` + `content/images.ts` (plain `<img>`, static export). `content/images.ts` is the single source of truth: each slot has a `folder` and its `src` is always `/images/<folder>/<key>.webp` — never write an image path anywhere else. Replace an image by dropping a same-named `.webp` into its folder. Content images are always framed (`FigureFrame` or a card: 6px radius, 1px border) so near-black photos read correctly in light mode. Never use a retail fuel-station image.

Image folders (`public/images/`, one per page/section; filenames = slot keys):

| Folder | Slots |
|---|---|
| `home/hero/` | indox-industrial-bg (hero background), indox-truck-3d (hero truck cut-out) |
| `home/` | hero-bowser (not rendered by the current hero), approach-source, approach-deliver, approach-store, approach-dispense, approach-monitor, approach-analyze, tech-bg, end-to-end-panorama, cta-bg |
| `products/` | product-hsd, product-bulk, product-tank, product-du, product-bowser |
| `services/` | service page heroes (service-doorstep, -bulk, -inventory, -monitoring, -fabrication, -theft, -management) and future service images |
| `industries/` | industry-construction, industry-manufacturing, industry-mining, industry-logistics, industry-telecom, industry-agriculture, industry-commercial, industry-infrastructure |
| `blog/` | blog-diesel-theft, blog-doorstep-vs-pump, blog-atg, blog-fuel-grades, blog-ev-setup, blog-fuel-safety and future post covers |
| `ev/` | ev-charger (Home teaser only), ev-hero (16:9), ev-ac, ev-dc (4:3, AC vs DC table headers) |
| `end-to-end/` | e2e-hero (16:9) |
| `about/` | about-hero (16:9), about-story (4:3), about-quality-bowser (4:3, annotated in code) |
| `contact/` | contact-hero (16:9) |

Logos stay in `public/logo/`. When adding a slot: add it to `content/images.ts` (with `folder` and an `imageUsage` line), then run `npm run images:readme` to regenerate `public/images/README.md` (generated — never edit by hand). `npm run images:check` lists missing files and generated dev placeholders (reported as `PLACEHOLDER — FAKE`; `--strict` exits 1). `npm run images:placeholders` creates labelled placeholders for missing slots only and never overwrites a file. Placeholders must all be replaced with real photos before launch.

## Theme & fonts (anti "AI-generated" rules)

**Fonts:** headings **Archivo** (700/800; 600 only for `label-caps`), body/descriptions **Inter** (400/500/600). **No other fonts** — no Montserrat, no mono, no presets. Both are defined in ONE file, `lib/fonts.ts`, exposing `--font-heading` (Archivo) and `--font-body` (Inter); shadcn components inherit them through `--font-sans`.
- Headings are **sentence case** (never all-caps). Scale: h1 `text-display` = `clamp(2rem, 4.4vw, 4rem)`, line-height 1.08 (hero headline: exactly 2 lines, `nowrap` per line from 640px, second line in `text-accent`), tracking −0.02em, 800; h2 `text-section` = `clamp(1.75rem, 3.2vw, 2.75rem)`, line-height 1.15; h3 1.125–1.5rem. Body 16–17px, line-height 1.65, descriptions in `text-muted-foreground`.
- Eyebrows, step numbers, spec labels and captions use `label-caps`: Archivo 600, uppercase, 11px, letter-spacing 0.14em. Never smaller than 11px.
- Check headings for awkward wraps at 360px, 768px and 1280px.

**Layout and detail:**
- Left-align headings and copy in nearly all sections. Centered text only for the final CTA band.
- Every section starts with a numbered eyebrow and a thin rule (`<Eyebrow index="02" label="Products" />` → `02 / PRODUCTS ——`), then an accent underline that draws in under the heading.
- Alternate section backgrounds (`bg-background` / `bg-elevated` with 1px borders) for rhythm in both themes.
- Never use the same layout twice in a row. Home: Hero = classic two columns (widened text column left, 16:11 image right, same container); Products = five identical cards, 4:3 images, 3 + 2 on desktop; Services = ruled list of rows; Industries = image-led grid of identical 4:3 tiles; Blog = three identical 16:9 cards; Why IndoX = 3×2 grid separated by 1px lines with plain icons (no cards, no icon tiles); Approach = large numerals 01–06 on the flow.
- Corner radius 4–8px everywhere (buttons 6px, cards 8px, images 6px). No pill buttons (the logo pill is the only exception). No shadows heavier than `shadow-subtle`; prefer borders.
- Icons: plain lucide line icons at 1.5 stroke via `<Icon />`. No coloured circular backgrounds, no gradient icon tiles, no icon-in-a-box.
- Technical touches, restrained: 1px hairline dividers, crosshair ticks on image frames (`FigureFrame`), `FIG. 01 — Fuel bowser` captions, spec labels (`SpecLabel`: theme tokens + 1px border by default; `tone="onDark"` only on a dark photo such as the Home hero — `Eyebrow` has the same `tone="onDark"`).
- No glow blobs, blurred orbs, floating particles, dot grids or glassmorphism (except the sticky header blur). No emoji anywhere.
- Colour restraint: mostly neutrals; brand-blue for actions; green/lime for small accents only.

**Hover system** (`app/globals.css` → "Hover system"; values in `lib/motion.ts` → `HOVER_CSS`, written onto `<html>` as `--hv-*`). Use these shared classes — never one-off hover styles:
- Containers: `hv-card` (lift 4px + accent border), `hv-surface` (accent border, no lift — when motion owns the transform), `hv-row`, `hv-menu`, `hv-btn`, `hv-btn-line` (accent border + solid fill wipe), `hv-chip`, `hv-group`, `hv-dim-siblings`.
- Targets inside them: `hv-img` (zoom 1.05), `hv-arrow` (nudge 4px), `hv-arrow-in`, `hv-icon` (2px), `hv-icon-rot` (6°), `hv-fade-in`, `hv-accent`, `hv-bar`. Standalone: `hv-link` (nav/footer underline), `hv-text-link` (links in copy).
- All hovers are gated to `(hover: hover) and (pointer: fine)` and mirrored on `:focus-visible`. 150–250ms ease-out. Reduced motion keeps colour/underline changes and removes movement, zoom, tilt, magnetic and the custom cursor. Hover-only content must have a touch fallback (`hv-fine-only` / `hv-touch-only`).
- `CustomCursor` (desktop fine pointer only): opt image cards/tiles in with `data-cursor="view"` — only on elements that are links. It never hides the native cursor.

**Copy:** concrete and plain. Short sentences about sites, DG sets, delivery, records, theft and downtime. Banned: seamless, cutting-edge, revolutionize, unlock, empower, elevate, leverage, robust, holistic, next-gen, game-changing, future-proof, "in today's fast-paced world". Keep compliance qualifiers on every supply/delivery claim with `<ComplianceLine />` under them.
