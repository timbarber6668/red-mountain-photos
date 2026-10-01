# Red Mountain Photos : Mockup Site

## Stack
- Next.js 14, React 18, TypeScript, Tailwind CSS
- Framer Motion (hero animations + panel arrow rotation)
- Fonts: Space Grotesk (UI/headlines), Cormorant Garamond (CTA/display) : Google Fonts in `app/layout.jsx`

## Dev Server
```
cd mockup-site
npm run dev        # starts on port 3000 (or next available)
npm run dev -- -p 3001  # explicit port
```
Preview tool launch config: `mockup-site/.claude/launch.json`

## Color Palette
- Background: `#F5F3F0` (warm off-white)
- Text: `#1A1A1A` (deep charcoal)
- Accent: `#8B4545` (warm red)

## File Structure
```
app/
  page.jsx                          ← renders RedMountainMagazineStack
  layout.jsx                        ← Google Fonts, metadata, LocalBusiness JSON-LD, SiteHeader/SiteFooter
  globals.css
  sitemap.js                        ← /sitemap.xml (base URL redmountainphotos.com)
  robots.js                         ← /robots.txt
  about/page.jsx                    ← About page (bio, service images, process)
  contact/page.jsx                  ← Contact page (server, metadata)
  contact/ContactForm.jsx           ← Client form : submits via mailto: link
  components/
    RedMountainMagazineStack.tsx    ← MAIN home page component (all home sections)
    SiteHeader.jsx                  ← global nav: Work (/#work), About, Contact
    SiteFooter.jsx                  ← global footer: contact, links, service areas
public/
  images/
    logo.png                        ← transparent logo (mountain + camera icon, red)
    Tim.avif                        ← founder portrait (About section)
    actual/
      544A5593-sun.jpg  ← HERO image (bedroom, chevron wall, brass lamp, warm sunlight edit, Oct 2026)
      DJI_0547.jpg  ← Galloping Goose Chalet (drone aerial)
      544A8777.jpg  ← Sky High at the Plaza
      544A8388.jpg  ← Mountainside Retreat
      544A1449.jpg  ← Ironwood Estates
      544A1850.jpg  ← Twilight Approach
      544A3825.jpg  ← Weathered Stone
      544A6445.jpg  ← About page: Real Estate/Architecture card
      544A5484.jpg  ← About page: Home Tour Videos card
      544A4778.jpg  ← About page: Hospitality card (rooftop hot tub)
      DJI_0943.jpg  ← About page: Drone card (top-down aerial)
      544A6048.jpg  ← Contact page sidebar (kitchen, resized to 1600px)
```

## Launch polish (Sept 30, 2026, branch `launch-polish`)
- **Sticky header** (`SiteHeader.jsx`, client): translucent cream with blur, Contact is a solid red button on every page. Height lives in `--header-h` (globals.css: 56px mobile, 64px md+). Magazine-stack bars use `--bar-h` (46/56px) and offset by the header; the scroll/observer math reads both vars, so change heights only in globals.css.
- **FAQ** is a native `<details>` accordion (answers stay in the HTML for SEO/AI search). Each item has `id="faq-<id>"` and `data-faq`; opening one fires `faq_open` via `lib/track.js`. Other events: `project_open`, `gallery_open`, `contact_submit`. CTAs carry `data-cta` for heatmaps.
- **Analytics**: `NEXT_PUBLIC_GA_ID` (GA4) and `NEXT_PUBLIC_CLARITY_ID` (Microsoft Clarity heatmaps). Both off until set.
- **Contact form** posts to `app/api/contact/route.js`, which sends via Resend. Needs `RESEND_API_KEY` in the Vercel project (Tim adds it). Without it the route returns 503 and the form falls back to the old mailto behavior. Optional `CONTACT_TO`, `CONTACT_FROM`.
- **Services** data is in `lib/services.js`, rendered by `components/ServicesGrid.jsx` (compact on home, full on About).
- **Headshot**: `public/images/tim-barber.jpg` (Tim.avif is retired).
- **Favicon**: `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`, generated from logo.png.
- **Project 4** is now "White Oak House" (Catherine Frank interior design), replacing Ironwood Estates. Images in `public/images/work/catherine-frank/` (2000px) and `/thumb` (800px). Projects can take `pair` (side-by-side hero for vertical images), `credit` and `gallery` (thumbnails with a lightbox).
- **Testimonials removed**: they were placeholder quotes with unverifiable claims. Add back only with real, attributable quotes.
- **Blog**: posts carry `date` (BlogPosting schema, sitemap). Newest first; home shows the first three. Three posts added: prep checklist, licensing, seasons.
- **Oct 1 revisions (Tim):** turnaround is 8 to 10 days photo, about 2 weeks video, rush on availability. Every third party needs its own license; multiple licensees get a discount and cost sharing is encouraged. No deposit: payment on delivery for most shoots, travel or larger projects per the quote. Visible email removed site-wide (form plus phone only). No links to the wedding site from this site, or back (Tim wants each to read as a specialist). Hospitality is now "Hospitality & Luxury Vacation Rentals".
- **Vacation rentals** are a large share of clients but kept out of the main nav: `/vacation-rental-photography` landing page (Service + FAQPage schema), linked from the services card, About and the footer. Researched post `vacation-rental-photography-revenue` has a `sources` array rendered as a Sources list; only cite figures traced to a primary source. Posts array order is display order, and the home page shows the first three, so keep those architecture-led.
- `public/llms.txt` summarises the business for AI search engines.
- Library JPEGs recompressed to q80 progressive (same dimensions), roughly 80% smaller.

## Launch Audit (completed Sept 24, 2026)
Custom 404 (`app/not-found.jsx`), thank-you page (`app/thank-you/`, noindex, form redirects here 800ms after the mailto fires), privacy policy (`app/privacy/`), breadcrumbs (`components/Breadcrumbs.jsx`, visual + BreadcrumbList schema, on about/contact/blog/article/privacy), sticky mobile CTA (`components/StickyMobileCTA.jsx`, Call + Get a Quote, hidden on /contact and /thank-you, body has pb-[56px] md:pb-0 so the footer clears it), FAQPage schema (FAQ copy now lives in the `faqs` array at the top of RedMountainMagazineStack so schema and visible text cannot drift), Analytics component (`components/Analytics.jsx`, renders nothing until NEXT_PUBLIC_GA_ID is set).

Fixed: og:image was a PORTRAIT photo declared as 1200x630 and would have cropped badly on every social platform. Now `/images/og-image.jpg`, a real 1200x630 landscape crop of DJI_0547. Also fixed a 180px dead gap under the mobile hero (min-h is now md-only) and the Resources nav link that was hidden on mobile.

Schema upgraded from LocalBusiness to ProfessionalService with hasOfferCatalog, founder, and areaServed including Country: United States (see travel positioning below).

## Contact Info (confirmed by Tim, July 2026)
- Phone: (970) 670-0846 : contact page, footer, schema (`tel:+19706700846`)
- Email: tim@redmountainphotos.com : form mailto, footer, contact page, schema

## Known Placeholders (need real data from Tim before launch)
- Confirm social handles are Tim's (instagram/facebook.com/redmountainphotos)

## Page Sections (top to bottom)

### 1. Hero Section
- Layout: `flex-col md:flex-row` : stacked on mobile, side-by-side on desktop
- **Text column** (40% / `md:w-2/5`), off-white `#F5F3F0` background, `justify-between`
  - **Top:** empty spacer (pushes content to center)
  - **Middle:** logo + headline group (Framer Motion fade-in)
    - Logo: `/images/logo.png`, height = `clamp(32px, 3.8vw, 56px)`
    - Headline: Space Grotesk uppercase, tight tracking `-0.03em`, leading `0.9`
      - Line 1: "RED MOUNTAIN" : `fontWeight: 500`, `text-[#1A1A1A]`
      - Line 2: "PHOTOGRAPHY" : `fontWeight: 300`, `text-[#8B4545]`
      - Font size: `text-[9vw] md:text-[3.8vw]`
  - **Bottom:** tagline (tiny uppercase) + "VIEW WORK →" outlined button
- **Image column** (60% / `md:w-3/5`): bedroom photo `544A5593.jpg`, `object-cover`

### 2. Local SEO Section
- White background, "Based in Telluride, Colorado" label
- Service area copy: Telluride, Mountain Village, Ridgway, Ouray, Silverton, Durango, Aspen

### 3. Services Section
- 2×2 grid of service cards:
  - Luxury Real Estate & Architectural Photography
  - Property Home Tour Videos
  - Hospitality & Vacation Rentals
  - Drone & Aerial Imaging
- Each card: Space Grotesk uppercase heading + description paragraph

### 4. About Section
- Dark `#1A1A1A` background, 50/50 split
- **Left:** "About" label, "Tim Barber, Founder" headline, 3 personal bio paragraphs
- **Right:** Tim's portrait (`/images/Tim.avif`), `object-cover object-top`

### 5. Magazine Stack (the key scroll interaction)
- All 6 project title bars + images are **flat siblings** inside one `<div>` with `overflow-anchor: none`
- Each bar: `position: sticky`, `top: index × 56px` (`BAR_HEIGHT = 56`), `z-index: 50`
- Bars accumulate at top as you scroll down (CSS sticky stacking)
- Each bar renders: `TITLE ... (YEAR)  CATEGORY  →`
- Hover: bg tints to `#f9f8f6`
- Font: Space Grotesk, `tracking-[0.22em]` uppercase

#### Expandable Project Panels
- State: `expandedId: number | null` : only one panel open at a time
- Click a bar → `toggle(id)` sets/clears `expandedId`
- Panel renders in document flow between bar and image (pushes content down)
- Panel uses Framer Motion `AnimatePresence` with `height: 0 → 'auto'` animation
- Arrow rotates 90° via `motion.span animate={{ rotate: isOpen ? 90 : 0 }}`
- Panel content: 3-column grid (2 col description + 1 col meta with services/deliverables)
- **Scroll-to-reveal:** `useEffect` with double `requestAnimationFrame` calculates panel's absolute `offsetTop` and scrolls viewport so panel appears below stacked bars
- **Auto-collapse:** `IntersectionObserver` with negative `rootMargin` (equal to stacked bars height) detects when panel scrolls behind bars and resets `expandedId` to null
- Bars below expanded one get `z-index: 40` (lower than panel's `z-index: 49`) so panel appears above them
- **Known behavior:** clicking a stacked bar scrolls the page up to reveal the panel rather than expanding inline within the stack

#### Projects Data
| # | Title | Category | Image | Location |
|---|-------|----------|-------|----------|
| 1 | Galloping Goose Chalet | Drone Series | DJI_0547.jpg | Mountain Village, CO |
| 2 | Sky High at the Plaza | Interior Study | 544A8777.jpg | Mountain Village, CO |
| 3 | Mountainside Retreat | Renovation Series | 544A8388.jpg | Telluride, CO |
| 4 | White Oak House | Interior Design | work/catherine-frank/544A5606 + 5601 (pair) | Telluride, CO |
| 5 | Twilight Approach | Golden Hour | 544A1850.jpg | Telluride, CO |
| 6 | Weathered Stone | Detail Focus | 544A3825.jpg | Ouray, CO |

Each expanded panel's "Start a Project Like This →" links to `/contact`.

### 6. FAQ Section (`#faq`)
- Cormorant Garamond heading, Space Grotesk Q&A blocks
- Topics: turnaround time, pricing, drone coverage, licensing, revisions, coverage area

### 7. Photography Resources (white bg, contrasts with FAQ's off-white)
- First 3 posts from `app/blog/posts.js` as image cards → link to /blog/<slug>; "View All Articles" → /blog
- Blog: posts.js (content data), blog/page.jsx (index), blog/[slug]/page.jsx (article template, SSG)

### 8. Closing CTA (dark): Get a Quote + phone. Testimonials were removed Sept 30 (placeholders).

### 9. Footer (SiteFooter)
- Last section on every page; no separate CTA panel (removed at Tim's request : he doesn't want a "full portfolio" promise)

## Copy & Layout Rules (from Tim)
- **No em dashes anywhere.** Use commas, colons, or periods instead.
- **Centered spine, per-panel formatting:** every section's container is centered (`max-w-* mx-auto`); section headers are `text-center`; content inside (Q&As, service cards, article cards) keeps its own left-aligned formatting. Page heroes (about/contact/blog) stay left-aligned text inside centered containers. Tim asked for "more center aligned, but each panel its own formatting."
- Project writeups in the magazine stack are drafts; Tim is revising them.
- **Travel positioning (Sept 2026):** Tim wants MORE travel work. Copy no longer reads Telluride-only. The homepage band is "Based in Telluride · Shooting Nationwide", the FAQ question is "Do you travel for projects?" (yes, gladly), the footer and contact page say home base + nationwide, the contact form has a Property Location field, and schema areaServed leads with Country: United States. Do not reintroduce copy that enumerates only Colorado towns as the service area.

## Technical Notes

### Sticky Stacking Technique
The magazine stack uses CSS `position: sticky` with incremental `top` values. All bars and images are **flat siblings** (using `React.Fragment`) inside a single container div. Each bar's `top` = `index × 56px`. As the user scrolls, bars accumulate at the top of the viewport. No JavaScript needed for the stacking itself.

### Expand/Collapse Architecture
The expand system went through multiple iterations. Key learnings:
- **`getBoundingClientRect()` on sticky elements returns the sticky position**, not the natural document position. Use `offsetTop` chain instead.
- **Browser scroll anchoring** (`overflow-anchor`) fights programmatic `scrollTop` changes when content is added above the viewport. Disable with `overflow-anchor: none`.
- **Double `requestAnimationFrame`** is needed to let the browser settle layout before calculating scroll positions.
- **`IntersectionObserver` with negative `rootMargin`** cleanly detects when expanding content scrolls behind sticky bars, with a 1500ms delay to avoid firing during the initial scroll animation.

## To Recreate From Scratch
1. `npx create-next-app@14 mockup-site --typescript --tailwind --app`
2. `npm install framer-motion`
3. Copy `RedMountainMagazineStack.tsx` into `app/components/`
4. Update `app/page.jsx`:
   ```jsx
   import RedMountainMagazineStack from './components/RedMountainMagazineStack';
   export default function Home() { return <RedMountainMagazineStack />; }
   ```
5. Add to `app/layout.jsx` `<head>`:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Space+Grotesk:wght@300;400;500&display=swap" rel="stylesheet" />
   ```
6. Place photos in `public/images/actual/`
7. Place `logo.png` (transparent PNG) in `public/images/`
8. Place `Tim.avif` in `public/images/`
