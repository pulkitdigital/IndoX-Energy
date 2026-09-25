# PRD — IndoX Energy Website

**Client:** IndoX Energy Private Limited
**Positioning:** From Fuel Supply to Fuel Intelligence — Source → Deliver → Store → Dispense → Monitor → Analyze
**Tagline:** Powering Sustainable Energy

## 1. Goal

Primary goal: qualified B2B quote requests (fuel type, monthly volume, site location).
Secondary goals: click-to-call / WhatsApp enquiries, EV site-survey requests, SEO ranking for bulk diesel and doorstep delivery searches.

## 2. Audience

- **Primary:** Builders, contractors, factories, mining, logistics/fleet operators, telecom tower operators, commercial facilities.
- **Secondary:** EV charging hosts — hotels, highways, residential societies, fleet depots, parking operators.

## 3. Scope change from original blueprint

- ❌ **No payment gateway, no Payments page, no backend/database.** The site is a fully static marketing + lead-generation site.
- ❌ No login system, no user accounts, no server-rendered dynamic data.
- ✅ Contact/quote form submits via a client-side form service (no custom backend needed — see TRD).
- ✅ Strong emphasis on visual polish: scroll animations, micro-interactions, smooth scroll, hero motion.
- Page count: **23 pages** (24 minus Payments) + 404.

## 4. Sitemap (23 pages + 404)

| # | Page | URL |
|---|------|-----|
| 1 | Home | `/` |
| 2 | About Us | `/about` |
| 3 | Products overview | `/products` |
| 4 | HSD / Diesel Supply | `/products/hsd-diesel-supply` |
| 5 | Bulk Fuel & Oil Supply | `/products/bulk-fuel-oil-supply` |
| 6 | Smart Diesel Storage Tanks | `/products/smart-diesel-storage-tanks` |
| 7 | Fuel Dispensing Units | `/products/fuel-dispensing-units` |
| 8 | Fuel Bowser / Mobile Fuel Solutions | `/products/fuel-bowser` |
| 9 | Services overview | `/services` |
| 10 | Doorstep / Site Diesel Delivery | `/services/doorstep-diesel-delivery` |
| 11 | Bulk Fuel Supply | `/services/bulk-fuel-supply` |
| 12 | Fuel Inventory Management | `/services/fuel-inventory-management` |
| 13 | Fuel Monitoring & IoT Solutions | `/services/fuel-monitoring-iot` |
| 14 | Tank Fabrication & Installation | `/services/tank-fabrication-installation` |
| 15 | Fuel Theft & Loss Prevention | `/services/fuel-theft-prevention` |
| 16 | Fuel Management Solution | `/services/fuel-management-solution` |
| 17 | EV Charging Solutions | `/ev-charging` |
| 18 | End-to-End Energy Infrastructure | `/end-to-end-energy-infrastructure` |
| 19 | Blog listing | `/blog` |
| 20 | Blog article template | `/blog/[slug]` |
| 21 | Contact Us | `/contact` |
| 22 | Thank-you | `/thank-you` |
| 23 | Privacy Policy | `/privacy` |
| 24 | Terms | `/terms` |
| — | 404 | — |

## 5. Navigation

**Header (desktop):** Logo · About Us · Our Products (mega menu, 5 cards) · Our Services (mega menu, 7 items in 2 cols) · EV Charging · End-to-End Infrastructure · Blog · Contact Us — right side: Toll-free number (click-to-call) + **Get a Quote** button (always visible).

**Mobile:** Top bar (logo, call icon, menu icon) → full-screen menu, Products/Services expand in place. Sticky bottom bar on every page: **Call · WhatsApp · Get a Quote**.

**Footer:** 5 columns (Brand, Products, Services, Company, Contact) + bottom strip (© , CIN, GSTIN, Privacy, Terms, compliance line).

## 6. Global components (every page)

- Sticky header
- WhatsApp float button (bottom-right desktop), pre-filled message
- Mobile action bar (Call / WhatsApp / Get a Quote)
- Quote CTA band (bottom of every page except Contact, legal pages)
- Mini quote form on Product/Service/EV pages (Name, Phone, Requirement, City)
- Breadcrumbs on inner pages
- Trust strip (Home, Product, Service, Contact pages)
- Compliance line under every product/delivery claim
- Cookie notice (first visit)
- Analytics: GA4, Meta Pixel, Google Ads tag — conversion events on form submit, call click, WhatsApp click
- SEO: unique title + meta description per page; LocalBusiness + Organization schema; Product schema on product pages; Article schema on blog; FAQ schema where FAQs exist

## 7. Page-by-page content

### Home (13 sections)
Hero → Trust strip → Our Approach (6-step interactive flow: Source → Deliver → Store → Dispense → Monitor → Analyze) → Our Products (5 cards) → Our Services (7 tiles) → Our Technology (tech chips + dashboard mockup, labelled "Sample") → EV Charging teaser → Industries We Serve + Customer Segments → End-to-End teaser → Pan-India Network (map) → Why IndoX Energy (3×2 grid) → Latest from blog (3 cards) → Quote CTA band.

**Rule: no invented counters, client logos or testimonials.** Real data only, or the section stays hidden.

### About Us
Hero → Our story → Vision & Mission → Core Values (6 tiles) → Leadership → Quality & Safety (9-point grid + annotated bowser image) → Licences & certifications → Our Commitment (6 points) → Company Profile table + PDF download → Quote CTA band.

### Products overview + 5 product pages
Shared template per product page: Hero → Overview → Key features/specs → Applications → Related service (cross-link) → Safety & compliance note → FAQs (4–6, schema) → Other products (4 cards) → Quote CTA band.

Products: HSD/Diesel Supply, Bulk Fuel & Oil Supply, Smart Diesel Storage Tanks, Fuel Dispensing Units, Fuel Bowser/Mobile Fuel Solutions.

### Services overview + 7 service pages
Shared template per service page: Hero → The problem (3 pain points) → What we do → How it works (numbered process) → Benefits → Who it's for → Related product (cross-link) → FAQs → Other services (3 cards) → Quote CTA band.

Services: Doorstep/Site Diesel Delivery, Bulk Fuel Supply, Fuel Inventory Management, Fuel Monitoring & IoT, Tank Fabrication & Installation, Fuel Theft & Loss Prevention, Fuel Management Solution.

### EV Charging Solutions
Hero (Book a Site Survey) → Our EV solutions → How it works (6 steps) → Suitable locations (8 tiles) → AC vs DC comparison table → FAQs → CTA: "Host an IndoX charger."

### End-to-End Energy Infrastructure
Hero → Ecosystem flow (7 linked steps) → Business Model (4 cards) → "Build your package" selector → Quote CTA band.

### Blog
Listing: hero + search, category chips, featured article, 3-col grid, newsletter band, pagination after 9 posts.
Article template: header, sticky TOC, body, in-article CTA, share bar, author box, related articles, Quote CTA band.
Launch with 6 articles (see blueprint for working titles).

### Contact Us
Hero → 2-step quote form (Step 1: solution/product/volume/city, Step 2: name/company/phone/email/industry/message + consent) → contact cards (toll-free, WhatsApp, email, office + map) → response-time promise → Pan-India coverage check.

### Thank-you
Confirmation + request summary → what happens next (3 steps) → WhatsApp button → 2 related blog articles → fires GA4/Meta/Google Ads conversion events.

### Privacy / Terms
Plain-text legal pages with table of contents. To be reviewed by client's legal adviser before launch.

### 404
Branded illustration (empty fuel gauge), one line of copy, links to Home / Solutions / Contact.

## 8. Design direction (new — attractive UI requirement)

- **Brand colors (from logo):** electric blue gradient (`#1E90FF` → `#00BFFF`) + leaf green gradient (`#39B54A` → `#8CC63F`), on a black/near-black base (`#050505`–`#0D0D0D`), white text.
- Motion-first: hero entrance animation, scroll-triggered reveals on every section, animated Our Approach flow (6-step), animated counters only where real data exists, smooth page transitions, smooth-scroll feel site-wide.
- Mobile-first responsive, but desktop gets the fuller animation treatment (reduced-motion respected for accessibility).

## 9. Open items to lock with client (unchanged from blueprint)

1. Final logo — lightning-leaf mark vs plain wordmark
2. Lead tagline — "Powering Sustainable Energy" vs "Fueling Progress • Powering Growth"
3. Real photos vs labelled concept renders (current supplied images are AI-generated)
4. Confirm IndoX does/doesn't run retail fuel stations
5. Rights to show "Repos Portable Station" tank photo
6. Trust details — registered address, CIN, GSTIN, founders, licence numbers
7. Real proof (client names/logos/volumes/testimonials) or proof section stays hidden
8. Active vs expanding coverage cities/states
9. ~~Payment gateway~~ — dropped from scope
10. English only, or English + Hindi toggle