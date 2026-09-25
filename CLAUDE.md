# CLAUDE.md — IndoX Energy Website

Read `docs/PRD.md` and `docs/TRD.md` first for full context before generating pages or components.

## Project summary

Static Next.js 15 (App Router) marketing + lead-gen website for IndoX Energy (fuel supply, storage tech, EV charging). 23 pages + 404. **No backend, no database, no payment gateway.** Forms submit client-side to Web3Forms. Heavy emphasis on polished animation and premium visual feel — this is the #1 priority alongside correct content structure.

## Tech stack (do not deviate without asking)

Next.js 15 (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion + GSAP/ScrollTrigger + Lenis (smooth scroll) + lucide-react + react-hook-form + zod. Optional: React Three Fiber for a hero 3D element.

## Coding conventions

- **Components:** PascalCase file + export name (`QuoteFormFull.tsx`). One component per file.
- **Routes:** every page lives under `app/` per the exact folder structure in `TRD.md`. Don't invent new URL slugs — use the ones in the sitemap table.
- **Shared page sections** (Hero, TrustStrip, QuoteCTABand, Breadcrumbs, MiniQuoteForm, FAQ accordion) must be built once in `components/` and reused across every Product/Service page — never copy-pasted per page.
- **Content stays out of components.** Product/service copy lives in `content/products.ts` / `content/services.ts` as typed data; components just render it. This lets new products/services be added without touching component code.
- **Styling:** Tailwind utility classes only; use the CSS variables in `TRD.md` §4 for brand colors — never hardcode hex values in components.
- **No `any` types.** Type all content models and component props.
- **No invented data.** Never fabricate stats, counters, client logos, or testimonials — leave a clearly marked placeholder or omit the section, per PRD §7 rule.

## Animation rules

- Wrap section entrances in the shared `<ScrollReveal>` component (Framer Motion `whileInView`) — don't write one-off `useEffect` + IntersectionObserver per section.
- Lenis smooth scroll is initialized once in `SmoothScrollProvider` at the root layout — never re-initialize per page.
- GSAP + ScrollTrigger is reserved for the more complex, timeline-based pieces: hero entrance, the "Our Approach" 6-step flow, the footer truck (`FooterTruck`), the text marquee, scroll parallax, and any pinned/scrubbed sections. Simple fade/slide-in reveals and hovers should use Framer Motion, not GSAP — keep the two tools' responsibilities separate (never let both animate the same element) to avoid animation conflicts.
- All timing/speed values live in `lib/motion.ts` — never hardcode durations or speeds in components.
- Animate only `transform` and `opacity`. Create GSAP instances inside `gsap.context()` and `revert()` on unmount; pause looping animations when offscreen.
- Desktop-only extras (magnetic buttons, card tilt, parallax) must be gated to `(min-width: 1024px) and (pointer: fine)`; mobile gets the lighter version.
- Always respect `prefers-reduced-motion` — provide a reduced/no-animation fallback, don't skip this.
- Keep animations tasteful: entrance + scroll reveals + hover states are enough. Avoid anything that delays the user from reading content or reaching a CTA.

## Forms

- Use `formSubmit.ts` for all form submissions — a single function wrapping the Web3Forms fetch call. Don't write ad-hoc fetch calls inside form components.
- `MiniQuoteForm` pre-fills the "Requirement" field based on the current page (pass as a prop).
- On success: `router.push('/thank-you')`. On failure: inline error state, no silent failures.
- Never add a backend API route for form handling unless explicitly asked — the whole point of this stack is zero backend.

## SEO

- Every page must export `generateMetadata` with a unique title + description — never leave a page with default/duplicate metadata (this was explicitly called out as a mistake to avoid, per the reference-site review in PRD).
- Add JSON-LD via `lib/seo.ts` helpers: Organization/LocalBusiness (root layout), Product schema (product pages), Article schema (blog), FAQ schema (any page with an FAQ block).
- All links must be real (`href`) — never leave a placeholder `#` link.
- Every image needs meaningful `alt` text.

## What NOT to build

- No login/auth, no user dashboard, no database, no CMS integration (blog is local MDX for now).
- No payment gateway, no `/payments` page.
- **No API routes, no Server Actions, no middleware, no ISR/on-demand revalidation.** Hosting is Hostinger shared hosting (no VPS, no Node runtime) — the site must build via `next build` with `output: 'export'` and run as plain static files. Anything requiring a server at runtime will not work after deploy.
- Don't use `next/image`'s runtime optimization — config has `unoptimized: true`. Assume images are pre-sized/compressed before they land in `public/`.
- Every dynamic route (`/blog/[slug]`) must have all params known at build time via `generateStaticParams` — no on-demand generation.

## When adding a new page

1. Check `docs/PRD.md` for that page's required sections and content source.
2. Check `docs/TRD.md` for its exact route path and which shared components it should reuse.
3. Add content data to `content/products.ts` or `content/services.ts` if applicable — don't hardcode copy in the page file.
4. Reuse `Hero`, `QuoteCTABand`, `Breadcrumbs`, FAQ accordion, and relevant grid components before writing anything new.
## Theme & color rules

These override any "gradients everywhere" / dark-only wording in `docs/PRD.md` and `docs/TRD.md`.

**Brand colors** (from the final logo) — defined only in `app/globals.css`, mapped into the Tailwind theme. Never hardcode hex in components.
- `brand-blue` `#0E4C9E`
- `brand-green` `#398D41`
- `brand-lime` `#4BA826`
- `brand-blue-glow` `#3D86E0` (lighter tint for blue text/links/icons on dark)

**Dark + light themes** via `next-themes` (`attribute="class"`, `defaultTheme="dark"`, `enableSystem={false}`), toggled by `components/layout/ThemeToggle.tsx`. Components use **semantic tokens only** — defined once for `:root` (light) and `.dark`:
- `--bg`, `--bg-elevated`, `--surface`, `--border`, `--text`, `--text-muted`
- `--primary` — button fill, always brand-blue with white text
- `--accent` — light: brand-green, dark: brand-lime
- `--link` — light: brand-blue, dark: brand-blue-glow

Use `bg-background`, `bg-card`, `bg-surface`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`, `text-link`, `text-accent`, etc. Never write `dark:`-only or light-only hardcoded colors; both themes must look intentional.

**Contrast:** brand-blue on the dark background is ~2.5:1, so on dark it is **fill only** (with white text on top) — never text, links or thin strokes. Use `--link` instead. Brand-green on white is ~4.2:1, so in light mode `--accent` is for icons, large text and fills — not small body text.

**Minimal gradient rule.** Default to solid colors. Gradients are allowed in exactly two places:
1. The animated connecting line in the Our Approach flow (blue → green → lime).
2. One very subtle radial glow behind the Hero (low opacity; a soft tint in light mode).

Everything else is solid: buttons = solid brand-blue fill; cards = solid `--surface` with a 1px `--border`; accents = solid green/lime; hover = border-color change + slight lift/shadow. No gradient borders, no glow gradients, no gradient text, no glassmorphism blur except the sticky header after scroll.

**Images:** every image goes through `components/ui/ImageSlot.tsx` + `content/images.ts` (plain `<img>`, static export). Content images are always framed (rounded, 1px border) so near-black photos read correctly in light mode.
