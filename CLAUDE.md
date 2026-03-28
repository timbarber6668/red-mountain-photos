# Red Mountain Photos — Mockup Site

## Stack
- Next.js 14, React 18, TypeScript, Tailwind CSS
- Framer Motion (hero animations + panel arrow rotation)
- Fonts: Space Grotesk (UI/headlines), Cormorant Garamond (CTA/display) — Google Fonts in `app/layout.jsx`

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
  layout.jsx                        ← Google Fonts import, metadata
  globals.css
  components/
    RedMountainMagazineStack.tsx    ← MAIN COMPONENT (everything is here)
public/
  images/
    logo.png                        ← transparent logo (mountain + camera icon, red)
    Tim.avif                        ← founder portrait (About section)
    actual/
      544A5593.jpg  ← HERO image (bedroom, chevron wall, brass lamp)
      DJI_0408.jpg  ← Alpine Ascent (drone aerial)
      544A8777.jpg  ← Shadowed Ridges
      544A8388.jpg  ← Mountain Gaze
      544A1449.jpg  ← Forest Depths
      544A1850.jpg  ← Twilight Approach
      544A3825.jpg  ← Weathered Stone
```

## Page Sections (top to bottom)

### 1. Hero Section
- Layout: `flex-col md:flex-row` — stacked on mobile, side-by-side on desktop
- **Text column** (40% / `md:w-2/5`), off-white `#F5F3F0` background, `justify-between`
  - **Top:** empty spacer (pushes content to center)
  - **Middle:** logo + headline group (Framer Motion fade-in)
    - Logo: `/images/logo.png`, height = `clamp(32px, 3.8vw, 56px)`
    - Headline: Space Grotesk uppercase, tight tracking `-0.03em`, leading `0.9`
      - Line 1: "RED MOUNTAIN" — `fontWeight: 500`, `text-[#1A1A1A]`
      - Line 2: "PHOTOGRAPHY" — `fontWeight: 300`, `text-[#8B4545]`
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
- State: `expandedId: number | null` — only one panel open at a time
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
| 1 | Alpine Ascent | Drone Series | DJI_0408.jpg | Telluride, CO |
| 2 | Shadowed Ridges | Landscape Study | 544A8777.jpg | Mountain Village, CO |
| 3 | Mountain Gaze | Portrait Series | 544A8388.jpg | Telluride, CO |
| 4 | Forest Depths | Dense Growth | 544A1449.jpg | Ridgway, CO |
| 5 | Twilight Approach | Golden Hour | 544A1850.jpg | Telluride, CO |
| 6 | Weathered Stone | Detail Focus | 544A3825.jpg | Ouray, CO |

### 6. FAQ Section
- Cormorant Garamond heading, Space Grotesk Q&A blocks
- Topics: turnaround time, pricing, shoot prep, coverage area, deliverables, licensing

### 7. CTA Section
- Dark `#1A1A1A` background, full width
- Cormorant Garamond display headline (light weight)
- `#8B4545` filled button → inverts on hover to off-white

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
