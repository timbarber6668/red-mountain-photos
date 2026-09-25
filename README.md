# Red Mountain Photography — Mockup Site

A premium photography portfolio site for Red Mountain Photography, based in Telluride, Colorado. Specializing in luxury real estate, architectural, drone, and cinematic video production.

**Live Site:** https://mockup-site-red.vercel.app

## Stack

- **Next.js 14** with React 18
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Google Fonts:** Space Grotesk (UI/headlines), Cormorant Garamond (display/CTA)

## Quick Start

```bash
cd mockup-site
npm install
npm run dev
```

Site runs on `http://localhost:3000` (or next available port)

To specify a port:
```bash
npm run dev -- -p 3001
```

## Build & Deploy

```bash
npm run build
npm run start
```

### Vercel Deployment

This project is configured for Vercel. Deploy with:

```bash
vercel --prod
```

**Current Production:** https://mockup-site-red.vercel.app

## Project Structure

```
mockup-site/
├── app/
│   ├── page.jsx                              # Home page
│   ├── layout.jsx                            # Root layout + Google Fonts + header/footer
│   ├── globals.css                           # Global styles
│   ├── sitemap.js                            # /sitemap.xml
│   ├── robots.js                             # /robots.txt
│   ├── about/
│   │   └── page.jsx                          # About page (bio, services, process)
│   ├── contact/
│   │   ├── page.jsx                          # Contact page
│   │   └── ContactForm.jsx                   # Client form (mailto-based submission)
│   └── components/
│       ├── RedMountainMagazineStack.tsx      # Main home page component (all sections)
│       ├── SiteHeader.jsx                    # Global nav (Work / About / Contact)
│       └── SiteFooter.jsx                    # Global footer
├── public/
│   └── images/
│       ├── logo.png                          # Logo (transparent PNG)
│       ├── Tim.avif                          # Founder portrait
│       └── actual/                           # Project photography
│           ├── DJI_0408.jpg                  # Alpine Ascent (drone)
│           ├── 544A8777.jpg                  # Shadowed Ridges
│           ├── 544A8388.jpg                  # Mountain Gaze
│           ├── 544A1449.jpg                  # Forest Depths
│           ├── 544A1850.jpg                  # Twilight Approach
│           └── 544A3825.jpg                  # Weathered Stone
│           └── [16 additional project images]
├── CLAUDE.md                                 # Technical documentation
├── tsconfig.json                             # TypeScript config
├── next.config.js                            # Next.js config
├── tailwind.config.js                        # Tailwind config
├── package.json                              # Dependencies
└── .gitignore                                # Git ignore rules
```

## Design

**Color Palette:**
- Background: `#F5F3F0` (warm off-white)
- Text: `#1A1A1A` (deep charcoal)
- Accent: `#8B4545` (warm red)

**Typography:**
- Headlines: Space Grotesk (500/400 weight), uppercase
- Display: Cormorant Garamond (300/400 weight)
- UI: Space Grotesk with tracking

## Page Sections

1. **Header** — Global nav: Work (anchor to stack), About, Resources (/blog), Contact
2. **Hero** — 60/40 split (text left, bedroom photo right) with logo, headline, and "View Work" anchor button
3. **Local SEO** — Service area coverage (Telluride → Steamboat Springs)
4. **Services** — 2×2 grid: Real Estate, Video, Hospitality, Drone
5. **About** — Dark section with Tim Barber bio and founder portrait
6. **Magazine Stack** (`#work`) — Sticky stacking bars with expandable project panels (6 projects)
7. **FAQ** (`#faq`) — 6 questions including pricing (off-white background)
8. **Photography Resources** — 3 article cards with images linking to real posts at /blog (white background to contrast with FAQ)
9. **Testimonials** — 3 quotes, off-white background (placeholder attributions — replace with real client quotes before launch)
10. **Footer** — Contact info, explore links, service areas, socials, copyright

All sections share the same left gutter (no centered containers) per Tim's alignment feedback. No em dashes anywhere in site copy (Tim's preference). The old bottom CTA panel ("View Full Portfolio") was removed at Tim's request.

## Blog (/blog)

- `app/blog/posts.js` — all article content as data (5 articles, each with slug/category/title/excerpt/image/body)
- `app/blog/page.jsx` — index page listing all articles
- `app/blog/[slug]/page.jsx` — article template (SSG via generateStaticParams, per-post metadata/OG)
- Articles: golden-hour-mountain-light, drone-photography-luxury-marketing, material-craft-architectural-photography, cinematic-video-real-estate-marketing, photography-packages-explained
- To add an article: append an object to `posts.js`; the index, article page, homepage cards (first 3 posts), and sitemap all pick it up automatically

## Magazine Stack (Interactive Feature)

The centerpiece of the site is an interactive "magazine stack" that uses CSS `position: sticky` to create an accumulating visual effect:

- 6 project bars stick to the top as you scroll down
- Click any bar to expand a detailed project panel
- Panel expands inline, pushing content down
- Bars below the expanded panel appear "behind" it
- Panel auto-collapses when scrolled out of view

**Technical details:** See `CLAUDE.md` for implementation notes.

## Image Assets

All 19 project images are stored in `public/images/actual/` as actual files (not symlinks). This ensures they deploy correctly to Vercel and other hosting platforms.

### Images Used:
- Hero: `544A5593.jpg` (bedroom with chevron wall, brass lamp)
- About/Portrait: `Tim.avif` (founder portrait)
- Magazine Stack: 6 featured projects + variants

## Configuration Files

- **`.env.local`** (not committed) — For local development secrets
- **`.gitignore`** — Excludes node_modules, .next, *.log, .env.local
- **`next.config.js`** — Image optimization settings
- **`tailwind.config.js`** — Custom color palette and theme

## Development Notes

### Image Handling
- Images are served from `public/images/` directory
- AVIF format for portraits (better compression)
- JPG for landscape/project photos (better quality)
- All images are optimized for web delivery

### Performance
- Static site generation (SSG) for all pages
- Tailwind CSS purging unused styles
- Framer Motion animations optimized for performance
- Google Fonts loaded via `@next/font` for best performance

## SEO Roadmap

- [x] Service descriptions with keywords
- [x] Local SEO signals (location, service areas)
- [x] Founder bio and About section
- [x] FAQ section (6 questions, including pricing)
- [x] Contact page with working (mailto-based) form
- [x] JSON-LD schema markup (LocalBusiness + Services, in `app/layout.jsx`)
- [x] Testimonials section (needs real client quotes + names)
- [x] Insights section ("Notes from the Field" — self-contained, no fake blog links)
- [x] Meta titles/descriptions + canonical URLs on all pages
- [x] Descriptive alt text on all images; one H1 per page
- [x] sitemap.xml + robots.txt

### Launch audit (Sept 24, 2026) — done
- [x] Custom 404 page
- [x] CTA above the fold (header Contact + hero View Work)
- [x] Internal links (full graph, no broken links)
- [x] Thank-you page after contact submit
- [x] Breadcrumbs + BreadcrumbList schema
- [x] Sticky mobile CTA (Call / Get a Quote)
- [x] robots.txt + sitemap.xml
- [x] Unique page titles and meta descriptions
- [x] Social share image (real 1200x630 landscape, replaced a portrait that would have cropped badly)
- [x] Travel-forward positioning (was Telluride-only)
- [x] Alt text on all images
- [x] Local schema (ProfessionalService + FAQPage + BreadcrumbList)
- [x] Privacy policy page
- [~] Google Analytics: component ready, set NEXT_PUBLIC_GA_ID to activate

### Before launch (needs input from Tim)
- [x] Phone number: (970) 670-0846 — on contact page, footer, and LocalBusiness schema
- [x] Email: tim@redmountainphotos.com — form, footer, contact page, schema
- [ ] GA4 Measurement ID (set NEXT_PUBLIC_GA_ID in Vercel env vars)
- [ ] Have a professional glance at the privacy policy before it goes live
- [ ] Confirm ownership of instagram.com/redmountainphotos and facebook.com/redmountainphotos
- [ ] Replace testimonial quotes/attributions with real client quotes
- [ ] Optional: swap mailto form for a form service (Formspree/FormSubmit) or API route

## Deployment Status

**URL:** https://mockup-site-red.vercel.app
**Images:** All 20 project images deployed as real files (no symlinks)
**Performance:** Static generation, optimized assets

## For More Details

See `CLAUDE.md` for:
- Complete technical implementation guide
- How to recreate the project from scratch
- Magazine stack architecture
- Expand/collapse interaction details
- Known behaviors and limitations

## License

© 2026 Red Mountain Photography. All rights reserved.
