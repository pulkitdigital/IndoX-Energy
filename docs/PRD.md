# PRD — IndoX Energy Website

| | |
|---|---|
| **Client** | IndoX Energy Private Limited |
| **Agency** | BeBeyond Digital Solutions |
| **Version** | 2.0 — aligned to *IndoX Energy — Website Blueprint* |
| **Date** | 26 Sep 2026 |
| **Companion doc** | `TRD.md` (tech stack, hosting, build) |

---

## 1. Overview

IndoX Energy is a B2B energy company offering fuel supply, site delivery, smart storage, dispensing, fuel monitoring and EV charging infrastructure.

The website is a **static, animation-rich marketing and lead-generation site**. It positions IndoX as a **fuel-intelligence company that also supplies fuel**, not just another doorstep-diesel operator.

- **Positioning line:** From Fuel Supply to Fuel Intelligence
- **Core flow:** Source → Deliver → Store → Dispense → Monitor → Analyze
- **Working tagline:** Powering Sustainable Energy *(final choice pending; see §12, item 2)*

---

## 2. Goals

| Priority | Goal | How it's measured |
|---|---|---|
| Primary | Qualified B2B quote requests (fuel type, monthly volume, site location) | Form submissions → `/thank-you` conversion event |
| Secondary | Click-to-call and WhatsApp enquiries | Call-click and WhatsApp-click events |
| Secondary | EV site-survey requests | EV form submissions tagged "EV Charging" |
| Secondary | SEO rankings for bulk diesel, doorstep diesel delivery, fuel monitoring searches | Search Console impressions and clicks per page |

---

## 3. Audience

| Segment | Who | What they care about |
|---|---|---|
| Primary | Builders, contractors, infrastructure companies, factories, mining companies, logistics and fleet operators, telecom tower operators, commercial facilities | Uninterrupted supply, no downtime, stopping fuel theft, clear records |
| Secondary | EV charging hosts: hotels, restaurants, highways, residential societies, fleet depots, parking operators, petrol pumps | Turnkey installation, payments, maintenance |

Inside a buyer's company, three people read the site:

| Reader | Cares about |
|---|---|
| Purchase manager | Products: what fuel, what spec |
| Site / operations head | Services: delivery, storage, no downtime |
| Owner / CFO | Technology: control, theft prevention, reports |

---

## 4. Scope

**In scope**
- 22 content pages, plus Privacy, Terms and a 404 page (**25 routes in total**; see §5).
- Client-side quote forms that post to a form service (no custom backend).
- Scroll animations, micro-interactions, smooth scroll and hero motion.
- GA4, Meta Pixel and Google Ads tracking, with conversion events.
- 6 launch blog articles.

**Out of scope**
- ❌ Payments page and payment gateway (removed from the blueprint).
- ❌ Backend, database, login or user accounts.
- ❌ Server-rendered or dynamic data, and CMS.
- ❌ Hindi version (unless confirmed; see §12, item 10).

**Changes from the blueprint**

| Blueprint | PRD v2 |
|---|---|
| 24 pages including Payments (#22) | Payments removed → 23 pages including Thank-you and 404 |
| Privacy and Terms listed under legal | Counted as their own routes → **25 routes** |
| Footer bottom strip links to Payments | Payments link removed |

---

## 5. Sitemap (25 routes)

| # | Page | URL | Main job |
|---|---|---|---|
| 1 | Home | `/` | Explain IndoX in 10 seconds, route each buyer to the right product or service |
| 2 | About Us | `/about` | Story, values, Quality & Safety, Commitment, Company Profile |
| 3 | Products overview | `/products` | All 5 products at a glance |
| 4 | HSD / Diesel Supply | `/products/hsd-diesel-supply` | Bulk HSD for commercial and industrial users |
| 5 | Bulk Fuel & Oil Supply | `/products/bulk-fuel-oil-supply` | HSD, 10ppm ULSD, MHO, MTO, LDO, Biodiesel |
| 6 | Smart Diesel Storage Tanks | `/products/smart-diesel-storage-tanks` | Tanks with ATG, live monitoring, app |
| 7 | Fuel Dispensing Units | `/products/fuel-dispensing-units` | Controlled on-site fueling equipment |
| 8 | Fuel Bowser / Mobile Fuel Solutions | `/products/fuel-bowser` | The bowser itself: capacity, metering, GPS, safety |
| 9 | Services overview | `/services` | All 7 services at a glance |
| 10 | Doorstep / Site Diesel Delivery | `/services/doorstep-diesel-delivery` | Booking and receiving fuel at your site |
| 11 | Bulk Fuel Supply | `/services/bulk-fuel-supply` | How IndoX sources, transports and delivers large volumes |
| 12 | Fuel Inventory Management | `/services/fuel-inventory-management` | Opening stock to variance, tracked digitally |
| 13 | Fuel Monitoring & IoT Solutions | `/services/fuel-monitoring-iot` | ATG, IoT, GPS, RFID, dashboard |
| 14 | Tank Fabrication & Installation | `/services/tank-fabrication-installation` | Design → Commissioning |
| 15 | Fuel Theft & Loss Prevention | `/services/fuel-theft-prevention` | Alerts on unusual movement and stock variation |
| 16 | Fuel Management Solution | `/services/fuel-management-solution` | Manual records to digital fuel management |
| 17 | EV Charging Solutions | `/ev-charging` | AC/DC chargers, turnkey setup, locations |
| 18 | End-to-End Energy Infrastructure | `/end-to-end-energy-infrastructure` | One-partner ecosystem + Business Model |
| 19 | Blog listing | `/blog` | Articles for SEO and buyer education |
| 20 | Blog article template | `/blog/[slug]` | One layout for every post |
| 21 | Contact Us | `/contact` | Quote form, contact channels, coverage check |
| 22 | Thank-you | `/thank-you` | Confirms the request, fires ad conversions |
| 23 | Privacy Policy | `/privacy` | Legal |
| 24 | Terms | `/terms` | Legal |
| 25 | 404 | — | Recovers lost visitors |

**Overlap rule:** Product and Service pages deliberately overlap in topic (e.g. *Bulk Fuel & Oil Supply* and *Bulk Fuel Supply*) for search coverage. They must **not** share copy:
- **Product pages** describe *what IndoX supplies or installs*.
- **Service pages** describe *how IndoX does it for you*.

Every page gets its own title, meta description and wording.

---

## 6. Navigation

### Header (desktop)

| Position | Item | Behaviour |
|---|---|---|
| Left | IndoX logo | Links to Home |
| Menu 1 | About Us | Direct link |
| Menu 2 | Our Products ▾ | Mega menu: 5 product cards with icon and one line, plus "View all products" |
| Menu 3 | Our Services ▾ | Mega menu: 7 services in two columns, plus "View all services" |
| Menu 4 | EV Charging | Direct link |
| Menu 5 | End-to-End Infrastructure | Direct link |
| Menu 6 | Blog | Direct link |
| Menu 7 | Contact Us | Direct link |
| Right | Toll-free 1800-202-1200 | Click-to-call |
| Right | **Get a Quote** button | Always visible; opens `/contact` with the form in view |

- The header is sticky, and shrinks and turns solid on scroll.
- **Fallback:** if seven items crowd laptop widths (~1280px), End-to-End Infrastructure moves under About Us as a dropdown item.

### Mobile
- Top bar: logo, call icon, menu icon.
- Full-screen menu; Products and Services expand in place.
- Sticky bottom bar on every page: **Call · WhatsApp · Get a Quote**.

### Footer (5 columns + bottom strip)

| Column | Contents |
|---|---|
| 1. Brand | Logo, tagline, LinkedIn (first) and other socials, newsletter signup |
| 2. Products | 5 product pages |
| 3. Services | 7 service pages |
| 4. Company | About Us, EV Charging, End-to-End Infrastructure, Blog, Contact |
| 5. Contact | Registered address, toll-free number, info@indoxenergy.com, WhatsApp, map link |
| Bottom strip | © IndoX Energy Pvt Ltd · CIN · GSTIN · Privacy · Terms · "All supply subject to applicable laws, approvals and permissions." |

---

## 7. Global components

| Component | Where | Details |
|---|---|---|
| Sticky header | All pages | See §6 |
| WhatsApp float | All pages, bottom right (desktop) | Pre-filled message: "Hi IndoX, I need a quote for…" |
| Mobile action bar | All pages on mobile | Call · WhatsApp · Get a Quote |
| Quote CTA band | Bottom of every page except Contact, Thank-you, legal pages, 404 | Headline, one line, Get a Quote + Call buttons |
| Mini quote form | Product, Service and EV pages | 4 fields: Name, Phone, Requirement (pre-selected to the page), City. The full form stays on `/contact` |
| Breadcrumbs | All inner pages | e.g. Home › Our Services › Doorstep Diesel Delivery |
| Trust strip | Home, Product and Service pages, Contact | Authorized sourcing · PESO-compliant equipment · Metered, documented delivery · GST invoicing |
| Compliance line | Footer + under every product or delivery claim | "Subject to applicable regulations, location, product and quantity." |
| Cookie notice | First visit | Minimal bar with accept and decline. Tracking pixels load only after accept |
| Tracking | Site-wide | GA4, Meta Pixel, Google Ads tag; events on form submit, call click, WhatsApp click |
| SEO | All pages | Unique title and meta description; LocalBusiness + Organization schema; Product schema on product pages; Article schema on posts; FAQ schema where FAQs exist |

---

## 8. Page-by-page requirements

### 8.1 Home (`/`) — 13 sections

Home absorbs six content blocks that don't get their own page: **Our Approach, Our Technology, Industries We Serve, Customer Segments, Pan-India Network, Why IndoX**.

| # | Section | Layout | Content source |
|---|---|---|---|
| 1 | Hero | Full-width bowser visual or video; headline, subline, **Get a Quote** + **Explore Services** buttons | Tagline + intro paragraph |
| 2 | Trust strip | 4 icon points | Quality & Safety (short) |
| 3 | Our Approach | Interactive 6-step flow: Source → Deliver → Store → Dispense → Monitor → Analyze | Our Approach |
| 4 | Our Products | 5 cards with image and one line, "View all products" | Our Products |
| 5 | Our Services | 7 compact tiles with icon, "View all services" | Our Services |
| 6 | Our Technology | Split: tech chips (ATG, IoT, GPS, RFID, Dashboard, App, Analytics, Alerts) + dashboard mockup labelled **"Sample"** | Our Technology |
| 7 | EV Charging teaser | Charger image, 3 points, link to EV page | EV Charging Solutions |
| 8 | Industries We Serve + Customer Segments | 7 industry tiles, with a segments strip underneath | Industries + Customer Segments |
| 9 | End-to-End teaser | Ecosystem strip, link to the End-to-End page | End-to-End Energy Infrastructure |
| 10 | Pan-India Network | India map with active and expanding regions, city availability check | Pan-India Network |
| 11 | Why IndoX Energy | 6 points in a 3×2 grid | Why IndoX Energy |
| 12 | Latest from the blog | 3 article cards | Blog |
| 13 | Quote CTA band | Global component | — |

**Industries (section 8):**
1. Construction & Infrastructure
2. Mining & Heavy Equipment
3. Manufacturing & Industrial
4. Logistics & Fleet
5. Telecom
6. Agriculture
7. Commercial & Institutional

**Customer segments:** Builders · Contractors · Infrastructure Companies · Factories · Mining Companies · Logistics Companies · Fleet Operators · Telecom Operators · Commercial Facilities · Project Sites · Industrial Units.

**Why IndoX (section 11):**
1. Reliable Supply Network
2. Technology Driven
3. Customized Solutions
4. End-to-End Support
5. Transparent Operations
6. Scalable Network

**Rule:** no invented counters, client logos or testimonials. A proof section is added only when the client supplies real data.

### 8.2 About Us (`/about`)

About Us is the trust page. It absorbs **Quality & Safety, Our Commitment and Company Profile**.

| # | Section | Layout | Content source |
|---|---|---|---|
| 1 | Hero | "Powering businesses with reliable energy solutions" + short intro | About Us |
| 2 | Our story | 2–3 paragraphs + a real photo of the fleet or site | About Us |
| 3 | Vision & Mission | Two side-by-side cards | Our Vision, Our Mission |
| 4 | Core Values | 6 icon tiles: Safety · Reliability · Transparency · Technology · Service · Growth | Core Values |
| 5 | Leadership | Founder and key team: photo, name, role, LinkedIn | To collect from client |
| 6 | Quality & Safety | 9-point commitments grid + annotated bowser image (fire extinguisher, hazmat panel, metered DU, valve box) | Quality & Safety |
| 7 | Licences & certifications | Cards with document name and number, viewable on click; real documents only | To collect from client |
| 8 | Our Commitment | 6 points: Reliable Supply, Smart Technology, Operational Transparency, Safety, Customer Support, Long-Term Partnerships | Our Commitment |
| 9 | Company Profile | Table (legal name, CIN, GSTIN, registered office, industry, core business, customer base, service model, geographic vision, positioning) + Download Company Profile (PDF) | Company Profile |
| 10 | Quote CTA band | Global | — |

**Quality & Safety (section 6), the 9 points:**
1. Authorized sourcing
2. Appropriate product specifications
3. Proper transportation practices
4. Safe storage
5. Controlled dispensing
6. Delivery documentation
7. Equipment inspection
8. Applicable safety standards
9. Regulatory compliance

Sections 5 and 7 are hidden until the client supplies real content.

### 8.3 Products overview (`/products`)

1. Hero: "Fuel and fuel infrastructure for business."
2. 5 large product cards: image, 2 lines, "Explore" link.
3. "Products + services together" strip showing how each product connects to a service (e.g. Smart Tanks → Tank Fabrication & Installation).
4. Quote CTA band.

### 8.4 Product pages (4–8) — shared template

| # | Block | Purpose |
|---|---|---|
| 1 | Hero | Product name, one-line promise, product image, Enquire button + mini form |
| 2 | Overview | What it is, 1 paragraph |
| 3 | Key features / specs | Icon grid or spec table |
| 4 | Applications | Chips or tiles of where it's used |
| 5 | Related service | Card linking to the matching service page |
| 6 | Safety & compliance note | One line + link to About › Quality & Safety |
| 7 | FAQs | 4–6 questions, FAQ schema |
| 8 | Other products | 4 cards |
| 9 | Quote CTA band | Global |

| Page | Features / specs (block 3) | Applications (block 4) | Related service |
|---|---|---|---|
| HSD / Diesel Supply | Bulk HSD for eligible commercial and industrial customers; authorized sources; supply per applicable regulations | Construction, DG sets, manufacturing, infrastructure, mining & heavy equipment, logistics & fleet, telecom, agriculture & commercial | Bulk Fuel Supply |
| Bulk Fuel & Oil Supply | Product cards: HSD, 10ppm ULSD (where applicable), MHO, MTO, LDO, Biodiesel/Biofuel, other industrial oils (subject to specs and regulations) | Industrial heating, solvents, machinery, fleets | Bulk Fuel Supply |
| Smart Diesel Storage Tanks | Storage tank, ATG, live level monitoring, consumption tracking, digital reports, alerts, dispensing management, theft/loss monitoring, GPS/IoT (where applicable), app + web dashboard | Sites needing on-site storage and controlled dispensing | Tank Fabrication & Installation |
| Fuel Dispensing Units | Professional DUs; integration with fuel-management technology for control and accountability | Fleets, construction, industrial facilities, DG sets, mining, infrastructure, commercial fuel users | Fuel Management Solution |
| Fuel Bowser / Mobile Fuel Solutions | Bulk transport, site delivery, mobile fueling, metered dispensing, delivery documentation, GPS (where applicable) | Remote sites, fleets, projects without storage | Doorstep / Site Diesel Delivery |

### 8.5 Services overview (`/services`)

1. Hero: "Fuel at your site. Less downtime. Better fuel management."
2. 7 service cards grouped into three bands:
   - **Supply:** Doorstep Delivery, Bulk Supply
   - **Infrastructure:** Tank Fabrication & Installation
   - **Intelligence:** Inventory Management, Monitoring & IoT, Theft & Loss Prevention, Fuel Management
3. Quote CTA band.

### 8.6 Service pages (10–16) — shared template

| # | Block | Purpose |
|---|---|---|
| 1 | Hero | Service name, promise, image, Get a Quote + mini form |
| 2 | The problem | 3 pain points (downtime, pilferage, manual records) |
| 3 | What we do | Feature grid |
| 4 | How it works | Numbered process strip |
| 5 | Benefits | 3–4 outcome cards |
| 6 | Who it's for | Industry chips |
| 7 | Related product | Card linking to the matching product page |
| 8 | FAQs | 4–6 questions, FAQ schema |
| 9 | Other services | 3 cards |
| 10 | Quote CTA band | Global |

| Page | What we do (block 3) | How it works (block 4) | Related product |
|---|---|---|---|
| Doorstep / Site Diesel Delivery | Delivery to eligible sites through an organized network; Fuel at Your Site · Less Downtime · Better Fuel Management | Book → Schedule → Dispatch → Metered fill → Delivery documents | Fuel Bowser |
| Bulk Fuel Supply | Coordinated procurement, transport and delivery for large quantities | Requirement → Sourcing → Quote → Dispatch → Delivery → Invoice | Bulk Fuel & Oil Supply |
| Fuel Inventory Management | Tracks opening stock, fuel received, dispensed, closing stock, daily and equipment-wise consumption, delivery records, variance | Setup → Daily capture → Reconciliation → Reports | Smart Diesel Storage Tanks |
| Fuel Monitoring & IoT Solutions | ATG, IoT, GPS, RFID, sensors, cloud monitoring, mobile app, web dashboard, analytics, alerts | Sensors → Cloud → Dashboard → Alerts | Smart Diesel Storage Tanks |
| Tank Fabrication & Installation | End-to-end storage infrastructure to applicable technical, safety and regulatory requirements | Design → Fabrication → Installation → Piping → Dispensing → Automation → Testing → Commissioning | Smart Diesel Storage Tanks |
| Fuel Theft & Loss Prevention | Flags unusual fuel movement, unauthorized dispensing, stock variation and potential losses | Monitor → Detect → Alert → Investigate → Report | Fuel Dispensing Units |
| Fuel Management Solution | Moves businesses from manual records to digital fuel management | Fuel Receipt → Storage → Dispensing → Monitoring → Reporting → Analytics | Fuel Dispensing Units |

### 8.7 EV Charging Solutions (`/ev-charging`)

1. **Hero:** "Powering the transition to electric mobility" + charger visual, **Book a Site Survey** button, mini form.
2. **Our EV solutions:**
   - AC chargers and DC fast chargers
   - OCPP integration
   - RFID / QR / digital payments
   - Monitoring platform
   - AMC & technical support
3. **How it works:** Site Survey → Load & Electrical Planning → Civil & Electrical Work → Installation → Testing & Commissioning → AMC.
4. **Suitable locations (8 tiles):** highways, commercial complexes, hotels & restaurants, petrol pumps, fleet depots, residential societies, industrial facilities, parking.
5. **AC vs DC comparison table:** speed, use case, typical location.
6. **FAQs** with schema.
7. **CTA band:** "Host an IndoX charger."

### 8.8 End-to-End Energy Infrastructure (`/end-to-end-energy-infrastructure`)

1. **Hero:** "One partner. Multiple energy solutions."
2. **Ecosystem flow (7 steps):** Fuel Supply → Transportation → Storage → Dispensing → Digital Monitoring → Fuel Management → EV Charging. Each step links to its product or service page.
3. **Our Business Model:** 4 cards, each with "best for" examples:
   - Supply Model: bulk fuel procurement and delivery
   - Infrastructure Model: tank, dispensing and monitoring infrastructure
   - Technology Model: digital fuel monitoring and management
   - Integrated Model: fuel + storage + dispensing + technology + support
4. **"Build your package" selector:** the user picks their needs, and the page recommends a model. This runs client-side only.
5. **Quote CTA band.**

### 8.9 Blog listing (`/blog`)

1. Hero: "Fuel intelligence insights" + search bar (client-side filter).
2. Category chips: Fuel Management · Diesel Supply · Storage & Safety · EV Charging · Industry Guides · Company News.
3. Featured article card across the top.
4. Article grid: 3 columns on desktop, 1 on mobile. Each card shows image, category, title, 2-line excerpt, read time and date.
5. Newsletter signup band.
6. Pagination after 9 posts.

### 8.10 Blog article template (`/blog/[slug]`)

| Block | Details |
|---|---|
| Header | Category, title, author with photo, date, read time, hero image |
| Table of contents | Sticky on the left (desktop), collapsible on mobile |
| Body | Headings, images, pull quotes, tables, callout boxes |
| In-article CTA | After the 2nd section: a card linking to the matching product or service page |
| Share bar | LinkedIn, WhatsApp, copy link |
| Author box | Name, role, one line |
| Related articles | 3 cards |
| Quote CTA band | Global |

**Launch articles (6).** The blog launches with 6 articles and grows by 2 posts a month.

| # | Working title | Links to |
|---|---|---|
| 1 | How construction sites lose diesel — and how to stop it | Fuel Theft & Loss Prevention |
| 2 | Doorstep diesel delivery vs buying from a pump: cost comparison for businesses | Doorstep / Site Diesel Delivery |
| 3 | What is Automated Tank Gauging (ATG) and does your site need it? | Smart Diesel Storage Tanks |
| 4 | HSD vs LDO vs MHO: which fuel does your equipment need? | Bulk Fuel & Oil Supply |
| 5 | Setting up an EV charger at your hotel or society: a step-by-step guide | EV Charging Solutions |
| 6 | Fuel safety checklist for DG sets and on-site storage | About Us (Quality & Safety) |

### 8.11 Contact Us (`/contact`)

1. **Hero:** "Let's power your business."
2. **Split layout:** the quote form on the left; contact cards (toll-free, WhatsApp, email, registered office with map) on the right.
3. **Quote form, 2 steps:**

   | Step | Field | Type | Required |
   |---|---|---|---|
   | 1 — What do you need? | Solution / service | Multi-select | Yes |
   | 1 | Product | Select | No |
   | 1 | Estimated monthly volume (litres) | Range select | Yes |
   | 1 | Delivery city / PIN | Text | Yes |
   | 2 — About you | Name | Text | Yes |
   | 2 | Company | Text | No |
   | 2 | Phone | Tel (10-digit Indian mobile) | Yes |
   | 2 | Email | Email | No |
   | 2 | Industry | Select (7 industries) | No |
   | 2 | Message | Textarea | No |
   | 2 | Consent | Checkbox linked to Privacy | Yes |

4. **Response promise:** "Our team calls back within **X** working hours." The client sets X.
5. **Pan-India Network note:** "Check if we deliver to your city", with a city/PIN field.
6. **Office locations** with a map embed.

### 8.12 Thank-you (`/thank-you`)

- Confirmation message with the request summary.
- What happens next, in 3 steps: call back → requirement check → quote.
- WhatsApp button for urgent needs.
- 2 related blog articles.
- Fires GA4, Meta and Google Ads conversion events.
- Set to `noindex`.

### 8.13 Privacy Policy and Terms (`/privacy`, `/terms`)

- Plain-text pages with a table of contents.
- Cover form data, cookies, tracking pixels, WhatsApp communication and the third-party form service.
- To be reviewed by the client's legal adviser before launch.

### 8.14 404

- Branded illustration of an empty fuel gauge, one line of copy.
- Links to Home, Products, Services and Contact.

---

## 9. Content rules

1. **Real proof only:** no invented counters, testimonials, client logos or certifications.
2. **Compliance wording:** keep the client's qualifiers ("subject to applicable regulations", "where applicable", "eligible customers") on every supply, product and delivery claim.
3. **No retail-pump imagery** unless the client confirms IndoX operates retail outlets.
4. **AI-generated images** may be used only as labelled concept renders, with no garbled text on vehicles or screens. Real fleet and site photos replace them when available.
5. **Dashboard mockups** are always labelled "Sample data".
6. **Overlap pages** share topics, never copy (see §5).
7. **No pricing claims** or "cheapest" language.

---

## 10. Design direction

- **Brand colours** come from the final logo: blue `#0E4C9E`, green `#398D41` and lime `#4BA826`, with the brand gradient blue → green → lime, on a near-black base (`#050505` / `#0D0D0D`) with white text. Exact tokens and contrast rules are in `TRD.md` §5.
- **Motion-first:**
  - Hero entrance animation
  - Scroll-triggered reveals on every section
  - Animated 6-step Our Approach flow
  - Smooth page transitions and smooth scroll site-wide
- **Animated counters** only where real data exists.
- **Responsive:** mobile-first; desktop gets the fuller animation treatment. `prefers-reduced-motion` is respected everywhere.
- **Logo on dark:** the navy "Ind" is invisible on a black background. Until a white-text logo is supplied, the logo sits on a white rounded pill.

---

## 11. Acceptance criteria

- [ ] All 25 routes build and open with no console errors.
- [ ] Every page has a unique title and meta description.
- [ ] Both forms submit, redirect to `/thank-you`, and the lead arrives in the client's inbox.
- [ ] Conversion events fire for form submit, call click and WhatsApp click (verified in GA4 DebugView and Meta Events Manager).
- [ ] Lighthouse on mobile: Performance 90+, Accessibility 100, SEO 100.
- [ ] Works on the latest Chrome, Safari, Firefox and Edge, plus Android Chrome and iOS Safari.
- [ ] No dead `#` links anywhere.
- [ ] Hidden sections (Leadership, Licences, Proof) stay hidden until real content is supplied.

---

## 12. Open items to lock with the client

1. **Final logo:** the lightning-"o" and leaf-"X" mark, or the plain "IndoX" wordmark used on the trucks? A white-text version is also needed for the dark theme.
2. **Lead tagline:** "Powering Sustainable Energy" or "Fueling Progress • Powering Growth"?
3. **Photos:** real photos of the fleet, tanks and sites, or labelled concept renders? The supplied images are AI-generated.
4. **Retail stations:** does IndoX run retail fuel stations? If not, the pump image stays off the site.
5. **"Repos Portable Station" tank photo:** confirm IndoX has the rights to show it.
6. **Trust details:** registered address, CIN, GSTIN, founders and team, licence and certificate numbers.
7. **Proof:** real client names or logos, volumes, testimonials with permission. If there are none, the proof sections stay hidden.
8. **Coverage:** which cities and states are active, and which are expanding.
9. **Response time:** the X in "calls back within X working hours".
10. **Language:** English only, or English + Hindi toggle?
11. **Form destination:** which email address receives leads, and whether a WhatsApp business number differs from the toll-free number.