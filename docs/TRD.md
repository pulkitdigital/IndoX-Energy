# TRD — IndoX Energy Website

Static, animation-rich marketing + lead-gen site. **No backend, no database, no payment gateway.**

## 1. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | SEO (metadata API, sitemap, per-page meta), static export/SSG, file-based routing matches the 23-page sitemap directly |
| Language | **TypeScript** | Type-safe content models for products/services/blog |
| Styling | **Tailwind CSS** | Fast, consistent, easy theming via CSS variables |
| Component library | **shadcn/ui** | Accessible primitives (accordion for FAQs, dialog, tabs) styled with Tailwind |
| Icons | **lucide-react** | Consistent icon set for feature grids, trust strip |
| Scroll animation | **Framer Motion** | Section reveals, hover/tap micro-interactions, page/route transitions |
| Advanced animation | **GSAP + ScrollTrigger** | Hero sequences, the 6-step "Our Approach" interactive flow, timeline-based animations |
| Smooth scroll | **Lenis** | Butter-smooth inertia scroll site-wide, pairs well with GSAP ScrollTrigger |
| 3D / hero visual (optional) | **React Three Fiber + drei** | Optional animated 3D render of the logo flame/leaf or a bowser model in the hero — only if timeline allows |
| Forms | **react-hook-form + zod** | Multi-step quote form validation (client-side only) |
| Form submission (no backend) | **Web3Forms** (or Formspree) | Sends form data straight to client's email from the browser — no server needed |
| Blog content | **MDX** (local files in `/content/blog`) | No CMS needed at launch; each `.mdx` file = one article, swappable for a headless CMS later |
| Images | **Plain `<img>` / `next/image` with `unoptimized: true`** | Static export has no runtime image optimization — pre-compress images (WebP) before adding to `public/`; lazy-load with explicit width/height |
| Hosting | **Hostinger shared hosting** (static export) | No VPS/Node server available — see §1a for the export/deploy setup |
| Analytics | **GA4 + Meta Pixel + Google Ads tag** | Loaded via `next/script`, fires on form submit / call click / WhatsApp click |

**No backend framework, no Prisma/Postgres, no Firebase needed for this project** — everything is static + client-side form service. If the client later wants a CMS, saved leads dashboard, or dynamic pricing, that's a phase-2 add-on (e.g., a lightweight Next.js API route + a simple DB) that would need VPS/Node hosting, not a launch requirement.

## 1a. Hosting constraint — Hostinger shared hosting (no VPS)

Hostinger's plan here is **shared hosting**, not VPS — there is no Node.js runtime available. This changes how Next.js must be built:

- `next.config.ts` must set **`output: 'export'`** — this makes `next build` produce a fully static `/out` folder (plain HTML/CSS/JS), no Node server required at runtime.
- **`next/image`** must use `unoptimized: true` in config (or use plain `<img>` for some assets) — the image optimization API is a server feature and won't run on static export. Compensate by pre-optimizing/compressing images before adding them to `public/`.
- **No API routes, no Server Actions, no middleware, no ISR/on-demand revalidation** — none of these run without a Node server. This project doesn't need them anyway (forms go straight to Web3Forms from the client).
- **Blog pages:** every `/blog/[slug]` must be pre-rendered at build time via `generateStaticParams` (all 6 launch articles known upfront) — static export requires every dynamic route to be fully pre-generatable, which fits since blog content is local MDX, not a CMS.
- **Deploy process:** run `next build` locally/CI → this generates the `/out` folder → upload the **contents** of `/out` into Hostinger's `public_html` (via File Manager or FTP/FileZilla) → done. No server restart, no build step happens on Hostinger itself.
- **Routing:** Next.js static export writes each route as `route/index.html`, which works correctly with Hostinger's default Apache/LiteSpeed static serving — no extra `.htaccess` rewrite needed for standard pages. Only add a custom `.htaccess` if a clean 404 page or trailing-slash behavior needs adjusting.

## 2. Folder structure

```
indox-energy/
├── app/
│   ├── layout.tsx                     # root layout: header, footer, WhatsApp float, Lenis provider
│   ├── page.tsx                       # Home
│   ├── about/page.tsx
│   ├── products/
│   │   ├── page.tsx                   # Products overview
│   │   ├── hsd-diesel-supply/page.tsx
│   │   ├── bulk-fuel-oil-supply/page.tsx
│   │   ├── smart-diesel-storage-tanks/page.tsx
│   │   ├── fuel-dispensing-units/page.tsx
│   │   └── fuel-bowser/page.tsx
│   ├── services/
│   │   ├── page.tsx                   # Services overview
│   │   ├── doorstep-diesel-delivery/page.tsx
│   │   ├── bulk-fuel-supply/page.tsx
│   │   ├── fuel-inventory-management/page.tsx
│   │   ├── fuel-monitoring-iot/page.tsx
│   │   ├── tank-fabrication-installation/page.tsx
│   │   ├── fuel-theft-prevention/page.tsx
│   │   └── fuel-management-solution/page.tsx
│   ├── ev-charging/page.tsx
│   ├── end-to-end-energy-infrastructure/page.tsx
│   ├── blog/
│   │   ├── page.tsx                   # Blog listing
│   │   └── [slug]/page.tsx            # Blog article template (reads MDX)
│   ├── contact/page.tsx
│   ├── thank-you/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── not-found.tsx                  # 404
│   └── sitemap.ts                     # auto-generated sitemap.xml
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx                 # + MegaMenu
│   │   ├── Footer.tsx
│   │   ├── MobileNav.tsx
│   │   ├── MobileActionBar.tsx        # sticky Call/WhatsApp/Quote
│   │   ├── WhatsAppFloat.tsx
│   │   ├── QuoteCTABand.tsx
│   │   └── Breadcrumbs.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── TrustStrip.tsx
│   │   ├── OurApproachFlow.tsx        # GSAP-driven 6-step animation
│   │   ├── ProductGrid.tsx
│   │   ├── ServiceGrid.tsx
│   │   ├── TechDashboardPreview.tsx
│   │   ├── IndustriesGrid.tsx
│   │   ├── PanIndiaMap.tsx
│   │   ├── WhyIndox.tsx
│   │   └── BlogPreview.tsx
│   ├── forms/
│   │   ├── QuoteFormFull.tsx          # 2-step form, /contact
│   │   ├── MiniQuoteForm.tsx          # 4-field version, product/service pages
│   │   └── formSubmit.ts              # Web3Forms client call
│   ├── animations/
│   │   ├── ScrollReveal.tsx           # Framer Motion wrapper
│   │   ├── SmoothScrollProvider.tsx   # Lenis setup
│   │   └── PageTransition.tsx
│   └── ui/                            # shadcn components (accordion, tabs, dialog, button...)
│
├── content/
│   ├── products.ts                    # typed data for all 5 products
│   ├── services.ts                    # typed data for all 7 services
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
│   ├── seo.ts                         # metadata helpers, schema generators
│   └── constants.ts                   # phone numbers, brand colors, nav data
│
├── public/
│   ├── images/
│   └── logo/
│
├── docs/
│   ├── PRD.md
│   └── TRD.md
│
├── CLAUDE.md
├── .env.example
├── tailwind.config.ts
└── README.md
```

## 3. Data model (examples)

```ts
// content/products.ts
export type Product = {
  slug: string;
  name: string;
  oneLiner: string;
  overview: string;
  features: string[];
  applications: string[];
  relatedServiceSlug: string;
  faqs: { q: string; a: string }[];
};
```

```ts
// content/services.ts
export type Service = {
  slug: string;
  name: string;
  problem: string[];
  whatWeDo: string[];
  howItWorks: string[];
  benefits: string[];
  industries: string[];
  relatedProductSlug: string;
  faqs: { q: string; a: string }[];
};
```

## 4. Theme (colors, sampled from the final logo)

```css
:root {
  /* Brand colors — from logo */
  --brand-blue:   #0E4C9E;
  --brand-green:  #398D41;
  --brand-lime:   #4BA826;

  /* Derived tint — NOT a brand color. Use for blue text, links, icons and glows on dark. */
  --brand-blue-glow: #3D86E0;

  /* Brand gradient: blue → green → lime */
  --brand-gradient: linear-gradient(90deg, #0E4C9E 0%, #398D41 55%, #4BA826 100%);

  /* Base */
  --bg-base:       #050505;
  --bg-elevated:   #0D0D0D;
  --text-primary:  #FFFFFF;
  --text-muted:    #A3A3A3;
}
```

Brand gradient (blue→green→lime) is used for CTAs, section accents, gradient borders and the "Our Approach" flow line. Black base throughout.

**Contrast rules (dark theme):**

| Color | On `#050505` | Allowed use |
|---|---|---|
| `--brand-blue` `#0E4C9E` | ~2.5:1 (fails) | **Fill only**, with white text on top (~8:1). Never for text, links or thin strokes. |
| `--brand-blue-glow` `#3D86E0` | ~5.5:1 | Blue text, links, icons, glows |
| `--brand-green` `#398D41` | ~4.9:1 | Icons, large text, accents |
| `--brand-lime` `#4BA826` | ~6.7:1 | Icons, highlights, hover glow |

Define these variables only in `globals.css` and map them into the Tailwind theme (`brand-blue`, `brand-green`, `brand-lime`, `brand-blue-glow`). Components use the Tailwind tokens, never raw hex.

**Logo:** navy "Ind" is invisible on the dark base. Until a transparent white-text logo is supplied, render the logo on a white rounded pill (single `<Logo />` component, one place to swap later).

## 5. Form handling (no backend)

`QuoteFormFull` and `MiniQuoteForm` both post directly to Web3Forms (or Formspree) via `fetch` from the client, using an access key stored in `.env.local`. On success, redirect to `/thank-you`; on failure, inline error. No server route, no database — this keeps the whole site static-exportable.

## 6. Performance & SEO checklist

- Static generation (`generateStaticParams` for blog slugs) — required for static export
- Unique `generateMetadata` per page (title + description)
- Images: `unoptimized: true` (static export constraint) — pre-compress/resize (WebP) before adding to `public/` since there's no runtime optimization on Hostinger shared hosting
- LocalBusiness + Organization JSON-LD in root layout
- Product / Article / FAQ JSON-LD per relevant page
- `sitemap.ts` + `robots.ts`
- Lighthouse targets: 90+ performance, 100 accessibility, 100 SEO