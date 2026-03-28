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
│   ├── layout.jsx                            # Root layout + Google Fonts
│   ├── globals.css                           # Global styles
│   ├── contact/
│   │   └── page.jsx                          # Contact form page
│   └── components/
│       └── RedMountainMagazineStack.tsx      # Main component (all sections)
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

1. **Hero** — 60/40 split (text left, bedroom photo right) with logo, headline, and CTA
2. **Local SEO** — Service area coverage (Telluride, Mountain Village, Ridgway, Ouray, Silverton, Durango, Aspen)
3. **Services** — 2×2 grid: Real Estate, Video, Hospitality, Drone
4. **About** — Dark section with Tim Barber bio and founder portrait
5. **Magazine Stack** — Sticky stacking bars with expandable project panels (6 projects)
6. **FAQ** — Common questions about services, pricing, and deliverables
7. **CTA** — Call-to-action section with primary button

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
- [x] FAQ section (6 questions)
- [x] Contact page with form
- [ ] JSON-LD schema markup (LocalBusiness, Service)
- [ ] Testimonials section
- [ ] Blog/Resources content (4-6 posts)
- [ ] Meta title/description optimization
- [ ] H1/H2 structure audit + descriptive alt text

## Deployment Status

**Last Deployment:** March 27, 2026
**Status:** ✅ Live and fully functional
**URL:** https://mockup-site-red.vercel.app
**Images:** All 19 project images deployed
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
