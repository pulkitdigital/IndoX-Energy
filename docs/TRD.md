# TRD — IndoX Energy Website

| | |
|---|---|
| **Version** | 2.0 — aligned to `PRD.md` v2 and the Website Blueprint |
| **Date** | 26 Sep 2026 |
| **Type** | Static, animation-rich marketing and lead-gen site |
| **Constraints** | **No backend, no database, no payment gateway.** Hosted on Hostinger shared hosting (no Node runtime) |

---

## 1. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router), latest stable 15+**, with `output: 'export'` | Metadata API, sitemap, file-based routing that maps 1:1 to the 25-route sitemap, full static export |
| Language | **TypeScript** (strict) | Type-safe content models for products, services, industries and blog |
| Styling | **Tailwind CSS v4** | CSS-first config: brand tokens defined once in `globals.css` via `@theme` |
| Components | **shadcn/ui** | Accessible primitives (Accordion for FAQs, Tabs, Dialog, Sheet for mobile nav, Select, Checkbox) |
| Icons | **lucide-react** | Consistent icons for feature grids, trust strip, industries |
| UI animation | **Motion** (`motion/react`, formerly Framer Motion) | Section reveals, hover and tap micro-interactions, mega-menu and route transitions |
| Timeline animation | **GSAP + ScrollTrigger** | Hero sequence, 6-step Our Approach flow, 7-step ecosystem flow, gradient line draw |
| Smooth scroll | **Lenis** | Inertia scroll site-wide, synced to the GSAP ticker |
| 3D hero (optional) | **React Three Fiber + drei** | Animated logo flame and leaf, or a bowser model, only if the timeline allows. Lazy-loaded, desktop only |
| Forms | **react-hook-form + zod** | Multi-step quote form with client-side validation |
| Form delivery | **Web3Forms** (Formspree as fallback) | Posts from the browser straight to the client's email, no server needed |
| Blog | **MDX** in `/content/blog`, read with `next-mdx-remote/rsc` + `gray-matter` | No CMS at launch; one `.mdx` file per article |
| Images | `next/image` with `unoptimized: true`, pre-compressed WebP/AVIF | Static export has no runtime image optimizer |
| Analytics | **GA4 + Meta Pixel + Google Ads tag** via `next/script` | Loaded only after cookie consent; events on form submit, call click, WhatsApp click |
| Hosting | **Hostinger shared hosting** (static files in `public_html`) | See §2 |

**Phase 2 (not in launch scope):** a headless CMS, a leads dashboard, or dynamic pricing would need Node or VPS hosting (for Next.js API routes and a database).

---

## 2. Hosting constraint: static export on shared hosting

Hostinger shared hosting has **no Node.js runtime**, so the site must be a fully static build.

### 2.1 `next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",       // next build → static /out folder
  trailingSlash: true,    // writes /about/index.html so Apache serves /about/ without rewrites
  images: { unoptimized: true },
};

export default nextConfig;
```

> **Why `trailingSlash: true`:** without it, static export writes `about.html`. Apache/LiteSpeed would then return 404 for `/about` unless custom rewrites are added. With it, every route becomes `route/index.html`, which shared hosting serves natively.

### 2.2 What cannot be used

Static export on shared hosting rules out:

- ❌ API routes, Route Handlers with dynamic behaviour, Server Actions
- ❌ Middleware, ISR, on-demand revalidation, `cookies()` / `headers()`
- ❌ Runtime image optimization

None of these are needed for this project.

### 2.3 Rules that follow from static export

- **Dynamic routes:** `/blog/[slug]` must implement `generateStaticParams` over all MDX files. Set `dynamicParams = false`.
- **`sitemap.ts` and `robots.ts`:** add `export const dynamic = "force-static"` so they are emitted as static files.
- **404:** `app/not-found.tsx` is exported as `404.html`. Point Apache at it with `.htaccess` (§11).
- **Search, filters and the "Build your package" selector:** all run client-side (`"use client"`) over build-time data.

---

## 3. Folder structure

```
indox-energy/
├── app/
│   ├── layout.tsx                          # root: fonts, Header, Footer, WhatsAppFloat, MobileActionBar,
│   │                                       #       SmoothScrollProvider, CookieNotice, Analytics, JSON-LD
│   ├── globals.css                         # Tailwind v4 @theme brand tokens (§5)
│   ├── page.tsx                            # 1  Home
│   ├── about/page.tsx                      # 2  About Us
│   ├── products/
│   │   ├── page.tsx                        # 3  Products overview
│   │   └── [slug]/page.tsx                 # 4–8 product pages (generateStaticParams over content/products.ts)
│   ├── services/
│   │   ├── page.tsx                        # 9  Services overview
│   │   └── [slug]/page.tsx                 # 10–16 service pages (generateStaticParams over content/services.ts)
│   ├── ev-charging/page.tsx                # 17
│   ├── end-to-end-energy-infrastructure/page.tsx   # 18
│   ├── blog/
│   │   ├── page.tsx                        # 19 Blog listing
│   │   └── [slug]/page.tsx                 # 20 Blog article template (MDX)
│   ├── contact/page.tsx                    # 21
│   ├── thank-you/page.tsx                  # 22 (noindex)
│   ├── privacy/page.tsx                    # 23
│   ├── terms/page.tsx                      # 24
│   ├── not-found.tsx                       # 25 404 → 404.html
│   ├── sitemap.ts                          # force-static
│   └── robots.ts                           # force-static
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── MegaMenu.tsx                    # Products (5 cards) / Services (7 items, 2 cols)
│   │   ├── MobileNav.tsx                   # shadcn Sheet, expandable groups
│   │   ├── MobileActionBar.tsx             # Call · WhatsApp · Get a Quote
│   │   ├── WhatsAppFloat.tsx
│   │   ├── Footer.tsx                      # 5 columns + bottom strip
│   │   ├── Breadcrumbs.tsx                 # + BreadcrumbList JSON-LD
│   │   ├── QuoteCTABand.tsx
│   │   ├── TrustStrip.tsx
│   │   ├── ComplianceLine.tsx
│   │   ├── CookieNotice.tsx
│   │   └── Logo.tsx                        # single place to swap logo (white pill until white logo arrives)
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── OurApproachFlow.tsx             # GSAP 6-step flow
│   │   ├── ProductGrid.tsx
│   │   ├── ServiceGrid.tsx
│   │   ├── TechDashboardPreview.tsx        # "Sample data" mockup
│   │   ├── EVTeaser.tsx
│   │   ├── IndustriesGrid.tsx              # + customer segments strip
│   │   ├── EndToEndTeaser.tsx
│   │   ├── PanIndiaMap.tsx                 # SVG India map, active/expanding states
│   │   ├── WhyIndox.tsx
│   │   └── BlogPreview.tsx
│   ├── about/
│   │   ├── VisionMission.tsx
│   │   ├── CoreValues.tsx
│   │   ├── Leadership.tsx                  # hidden until data exists
│   │   ├── QualitySafety.tsx               # 9-point grid + annotated bowser
│   │   ├── Licences.tsx                    # hidden until data exists
│   │   ├── Commitment.tsx
│   │   └── CompanyProfileTable.tsx
│   ├── templates/
│   │   ├── ProductPageTemplate.tsx         # 9 blocks (PRD §8.4)
│   │   ├── ServicePageTemplate.tsx         # 10 blocks (PRD §8.6)
│   │   ├── OverviewGrid.tsx                # products/services overview pages
│   │   └── FAQSection.tsx                  # shadcn Accordion + FAQPage JSON-LD
│   ├── ev/
│   │   ├── EVSolutions.tsx
│   │   ├── EVProcess.tsx
│   │   ├── EVLocations.tsx
│   │   └── ACvsDCTable.tsx
│   ├── end-to-end/
│   │   ├── EcosystemFlow.tsx               # GSAP 7-step flow, linked nodes
│   │   ├── BusinessModelCards.tsx
│   │   └── PackageSelector.tsx             # client-side recommender
│   ├── blog/
│   │   ├── BlogGrid.tsx                    # client-side search + category filter + pagination (9/page)
│   │   ├── FeaturedPost.tsx
│   │   ├── TableOfContents.tsx
│   │   ├── InArticleCTA.tsx
│   │   ├── ShareBar.tsx
│   │   ├── AuthorBox.tsx
│   │   └── mdx-components.tsx              # styled h2/h3, tables, callouts, pull quotes
│   ├── forms/
│   │   ├── QuoteFormFull.tsx               # 2-step, /contact
│   │   ├── MiniQuoteForm.tsx               # 4 fields, product/service/EV pages
│   │   ├── CoverageCheck.tsx               # city/PIN check against content/coverage.ts
│   │   ├── NewsletterForm.tsx
│   │   ├── schemas.ts                      # zod schemas
│   │   └── submitForm.ts                   # Web3Forms fetch + analytics event
│   ├── animations/
│   │   ├── SmoothScrollProvider.tsx        # Lenis + GSAP ticker sync
│   │   ├── ScrollReveal.tsx                # Motion wrapper
│   │   └── PageTransition.tsx
│   ├── analytics/
│   │   └── Analytics.tsx                   # GA4, Meta Pixel, Google Ads — consent-gated
│   └── ui/                                 # shadcn components
│
├── content/
│   ├── products.ts                         # 5 products
│   ├── services.ts                         # 7 services
│   ├── industries.ts                       # 7 industries + customer segments
│   ├── coverage.ts                         # active / expanding states & cities (from client)
│   ├── company.ts                          # legal name, CIN, GSTIN, address, phones, socials
│   ├── navigation.ts                       # header, mega menus, footer columns
│   └── blog/
│       ├── construction-diesel-theft.mdx
│       ├── doorstep-delivery-vs-pump.mdx
│       ├── what-is-atg.mdx
│       ├── hsd-vs-ldo-vs-mho.mdx
│       ├── ev-charger-setup-guide.mdx
│       └── fuel-safety-checklist.mdx
│
├── lib/
│   ├── utils.ts
│   ├── seo.ts                              # buildMetadata(), JSON-LD generators
│   ├── blog.ts                             # getAllPosts(), getPost(slug) — build time, fs + gray-matter
│   └── analytics.ts                        # trackEvent('lead_submit' | 'call_click' | 'whatsapp_click')
│
├── public/
│   ├── images/                             # pre-compressed WebP/AVIF
│   ├── logo/
│   ├── docs/indox-company-profile.pdf
│   └── .htaccess                           # copied into /out on build (§11)
│
├── docs/
│   ├── PRD.md
│   └── TRD.md
├── CLAUDE.md
├── .env.example
└── README.md
```

> **Why `[slug]` for products and services:** the 5 product pages share one template, and so do the 7 service pages. Driving them from `content/products.ts` and `content/services.ts` with `generateStaticParams` means one template file each, and copy lives in data rather than JSX. The URLs stay exactly as in the PRD sitemap.

---

## 4. Data models

```ts
// content/products.ts
export type Product = {
  slug: "hsd-diesel-supply" | "bulk-fuel-oil-supply" | "smart-diesel-storage-tanks"
      | "fuel-dispensing-units" | "fuel-bowser";
  name: string;
  oneLiner: string;
  seo: { title: string; description: string };
  heroImage: string;
  overview: string;
  features: { icon: string; title: string; text?: string }[];
  specs?: { label: string; value: string }[];      // client-confirmed only
  applications: string[];
  relatedServiceSlug: Service["slug"];
  faqs: { q: string; a: string }[];                // 4–6
};
```

```ts
// content/services.ts
export type Service = {
  slug: "doorstep-diesel-delivery" | "bulk-fuel-supply" | "fuel-inventory-management"
      | "fuel-monitoring-iot" | "tank-fabrication-installation"
      | "fuel-theft-prevention" | "fuel-management-solution";
  name: string;
  group: "Supply" | "Infrastructure" | "Intelligence";
  promise: string;
  seo: { title: string; description: string };
  heroImage: string;
  problems: [string, string, string];
  whatWeDo: { icon: string; title: string; text?: string }[];
  howItWorks: string[];                            // numbered steps
  benefits: string[];                              // 3–4
  industries: Industry["slug"][];
  relatedProductSlug: Product["slug"];
  faqs: { q: string; a: string }[];
};
```

```ts
// content/industries.ts
export type Industry = {
  slug: "construction-infrastructure" | "mining-heavy-equipment" | "manufacturing-industrial"
      | "logistics-fleet" | "telecom" | "agriculture" | "commercial-institutional";
  name: string;
  icon: string;
  painPoint: string;
};
```

```ts
// MDX frontmatter — content/blog/*.mdx
export type PostFrontmatter = {
  title: string;
  slug: string;
  excerpt: string;
  category: "Fuel Management" | "Diesel Supply" | "Storage & Safety"
          | "EV Charging" | "Industry Guides" | "Company News";
  date: string;            // ISO
  author: { name: string; role: string; photo?: string };
  heroImage: string;
  featured?: boolean;
  relatedLink: { label: string; href: string };   // in-article CTA target
};
```

---

## 5. Theme

Brand colours are sampled from the final logo. Tailwind v4 reads them from `@theme` in `app/globals.css`. **Components use the Tailwind tokens only, never raw hex.** There is **no neutral gray and no black** anywhere in the UI: every background, border and text colour is derived from the brand tokens with `color-mix()`, once, in `app/globals.css`.

```css
@import "tailwindcss";

@theme {
  /* Brand — from logo */
  --color-brand-blue:      #0E4C9E;
  --color-brand-green:     #398D41;
  --color-brand-lime:      #4BA826;
  /* Derived tint — NOT a brand colour. Blue text, links and icons on dark. */
  --color-brand-blue-glow: #3D86E0;
  /* Derived deep navy (≈ #011433): light-mode ink and the dark-mode base. */
  --color-brand-navy: color-mix(in oklab, var(--color-brand-blue) 46%, black);
  --color-on-brand:        #FFFFFF;
}

:root {               /* light: white + faint blue/green tints, navy ink */
  --bg:            color-mix(in oklab, var(--color-brand-blue) 2%, white);
  --bg-elevated:   color-mix(in oklab, var(--color-brand-blue) 6%, white);
  --bg-tint-green: color-mix(in oklab, var(--color-brand-green) 7%, white);
  --surface:       #FFFFFF;
  --border:        color-mix(in oklab, var(--color-brand-blue) 14%, white);
  --border-strong: color-mix(in oklab, var(--color-brand-blue) 28%, white);
  --text:          var(--color-brand-navy);
  --text-muted:    color-mix(in oklab, var(--color-brand-blue) 50%, color-mix(in oklab, var(--color-brand-navy) 60%, white));
  --heading:       var(--color-brand-blue);
  --primary:       var(--color-brand-blue);
  --accent:        var(--color-brand-green);
  --link:          var(--color-brand-blue);
}

.dark {               /* dark: deep navy base, blue-tinted borders, white text */
  --bg:            var(--color-brand-navy);
  --bg-elevated:   color-mix(in oklab, var(--color-brand-blue) 9%, var(--color-brand-navy));
  --bg-tint-green: color-mix(in oklab, var(--color-brand-green) 9%, var(--color-brand-navy));
  --surface:       color-mix(in oklab, var(--color-brand-blue) 15%, var(--color-brand-navy));
  --border:        color-mix(in oklab, var(--color-brand-blue-glow) 24%, var(--color-brand-navy));
  --border-strong: color-mix(in oklab, var(--color-brand-blue-glow) 40%, var(--color-brand-navy));
  --text:          #FFFFFF;
  --text-muted:    color-mix(in oklab, var(--color-brand-blue-glow) 45%, white);
  --heading:       color-mix(in oklab, var(--color-brand-blue-glow) 22%, white);
  --primary:       var(--color-brand-blue);
  --accent:        var(--color-brand-lime);
  --link:          var(--color-brand-blue-glow);
}
```

(Abridged; `app/globals.css` also defines `--surface-hover`, `--primary-hover`, `--overlay`, `--shadow-subtle` and the shadcn mapping, all from the same brand tokens.)

**Colour roles:** headings, links and buttons use brand blue (on dark, the blue-glow tint for text; brand-blue stays a fill with white text). Green/lime are for small accents only: icons, heading underlines, status marks, and the faint `bg-tint-green` section background. Sections alternate `bg-background` / `bg-elevated` (plus the one green-tinted section) for rhythm in both themes.

**Minimal gradient rule:** everything is solid. Gradients appear in exactly two places: the Our Approach / ecosystem flow line (blue → green → lime, `bg-flow-x` / `bg-flow-y`) and one faint radial glow behind the Hero (`bg-hero-glow`). No gradient CTAs, borders or text.

### Contrast rules

| Token | On light bg | On navy bg (dark) | Allowed use |
|---|---|---|---|
| `brand-blue` `#0E4C9E` | ~7.9:1 | ~2.2:1 (fails) | Light: headings, links, fills. Dark: **fill only**, with white text on top |
| `brand-blue-glow` `#3D86E0` | — | ~4.6–5:1 | Dark: links, icons, blue text |
| heading tint (glow 22% + white) | — | ~14:1 | Dark: h1–h4 |
| `brand-green` `#398D41` | ~4:1 | — | Light: icons, large text, fills (not small body text) |
| `brand-lime` `#4BA826` | — | ~5.5–6.7:1 | Dark: icons, highlights, accents |
| navy ink / muted ink | ~17:1 / ~6:1 | — | Light: body text / descriptions |
| white / muted (glow 45% + white) | — | ~18:1 / ~10:1 | Dark: body text / descriptions |

**Logo:** the navy "Ind" is invisible on the dark base. Until a white-text logo is supplied, `<Logo />` renders the logo on a white rounded pill. It's one component, so there's one place to swap it later.

---

## 6. Animation spec

| Where | Library | Behaviour |
|---|---|---|
| Site-wide scroll | Lenis | `lerp ≈ 0.1`; `lenis.raf` driven by `gsap.ticker`; `ScrollTrigger.update` on Lenis scroll |
| Section reveals | Motion | Fade + 24px rise, `whileInView`, `once: true`, stagger 0.08s for grids |
| Hero | GSAP timeline | Headline word-stagger → subline → CTAs → visual; under 1.2s total |
| Our Approach (Home) | GSAP + ScrollTrigger | Pinned section; gradient line draws across 6 steps, each node activates in turn; on mobile, becomes a vertical stepper with no pin |
| Ecosystem flow (End-to-End) | GSAP + ScrollTrigger | Same pattern, 7 linked nodes |
| Mega menu | Motion | 150ms fade + scale from 0.98 |
| Cards | Motion | Hover lift 4px + gradient border glow |
| Route change | Motion | Short fade (≤ 200ms) |
| 3D hero (optional) | R3F | Lazy-loaded with `next/dynamic` (`ssr: false`), desktop only, static image fallback |

**Rules:**
- `prefers-reduced-motion: reduce` disables Lenis, pinning and all non-essential motion.
- Only `transform` and `opacity` are animated.
- Counters animate only when backed by real data.

---

## 7. Forms (no backend)

| Form | Location | Fields |
|---|---|---|
| `QuoteFormFull` | `/contact` | 2 steps. **Step 1:** solution (multi-select), product, monthly volume (range), city/PIN. **Step 2:** name, company, phone, email, industry, message, consent |
| `MiniQuoteForm` | Product, service and EV pages | Name, Phone, Requirement (pre-selected to the page), City |
| `CoverageCheck` | Home, Contact | City/PIN, matched client-side against `content/coverage.ts`; unmatched cities are prompted to submit an enquiry |
| `NewsletterForm` | Footer, Blog | Email |

- **Validation:** zod schemas in `components/forms/schemas.ts`. Indian mobile regex `^[6-9]\d{9}$`, required consent.
- **Submit:** `fetch("https://api.web3forms.com/submit")` with `NEXT_PUBLIC_WEB3FORMS_KEY`.
  - The key is public by design; it only allows sending to the configured inbox.
  - Include `subject`, `from_name` and a `form_source` field (page URL + form name).
- **Spam protection:** a honeypot field plus the Web3Forms hCaptcha on the full form.
- **Success:** fire `trackEvent("lead_submit", { form, requirement })`, then route to `/thank-you` (pass a short summary via `sessionStorage` for display).
- **Failure:** show an inline error with the phone and WhatsApp as fallback. Form data is never lost on error.

---

## 8. Analytics and consent

- **`CookieNotice`:** stores the choice in `localStorage` (wrapped in try/catch).
- **`Analytics.tsx`:** injects GA4, Meta Pixel and Google Ads via `next/script` **only after accept**.
- **Events (`lib/analytics.ts`):**

  | Event | Fired on | GA4 | Meta | Google Ads |
  |---|---|---|---|---|
  | `lead_submit` | Form success | `generate_lead` | `Lead` | Conversion |
  | `call_click` | Any `tel:` link | `click_call` | `Contact` | Conversion (secondary) |
  | `whatsapp_click` | Any `wa.me` link | `click_whatsapp` | `Contact` | Conversion (secondary) |

- **`/thank-you`:** also fires a page-level conversion as a backup.

---

## 9. SEO

- **Metadata:** `lib/seo.ts → buildMetadata()` gives each page a unique title, description, canonical URL (with trailing slash), Open Graph and Twitter tags.
- **JSON-LD:**
  - Root layout: `Organization` + `LocalBusiness` (from `content/company.ts`)
  - Product pages: `Product` (no price)
  - Service pages: `Service`
  - Blog: `Article`
  - Pages with FAQs: `FAQPage`
  - Inner pages: `BreadcrumbList`
- **Sitemap and robots:** `sitemap.ts` lists all public routes and excludes `/thank-you`; `robots.ts` references the sitemap. `/thank-you` is set to `noindex`.
- **Other:** `<html lang="en">`, one H1 per page, descriptive alt text on every image.

---

## 10. Performance and accessibility targets

| Metric | Target |
|---|---|
| Lighthouse (mobile) | Performance 90+, Accessibility 100, SEO 100, Best Practices 100 |
| LCP | < 2.5s on 4G |
| CLS | < 0.1 (explicit width/height on all images) |
| JS | GSAP, R3F and Lenis loaded only where used; 3D lazy-loaded |
| Images | WebP/AVIF, hero ≤ 200KB, others ≤ 120KB, `loading="lazy"` below the fold |
| Fonts | `next/font`, self-hosted, `display: swap` |
| Accessibility | Keyboard-navigable mega menu and mobile nav, visible focus rings, labelled form fields, reduced motion respected |

---

## 11. Build and deploy

1. `npm run build`. With `output: 'export'`, this writes the full site to `/out`.
2. Confirm `/out` contains `index.html`, `about/index.html`, …, `404.html` and `.htaccess`.
3. Upload **the contents of `/out`** into Hostinger `public_html` (File Manager or FTP). Replace old files, and remove stale routes if any were renamed.
4. Nothing builds or restarts on Hostinger.

**`public/.htaccess`** (copied into `/out` at build):

```apache
# Custom 404
ErrorDocument 404 /404.html

# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/avif "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
</IfModule>
```

---

## 12. Environment variables

```bash
# .env.example — all public (client-side, static export)
NEXT_PUBLIC_SITE_URL=https://www.indoxenergy.com
NEXT_PUBLIC_WEB3FORMS_KEY=
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_GOOGLE_ADS_ID=
NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL=
NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX
NEXT_PUBLIC_TOLL_FREE=18002021200
```

Static export inlines only `NEXT_PUBLIC_*` variables. Nothing secret belongs in this project.