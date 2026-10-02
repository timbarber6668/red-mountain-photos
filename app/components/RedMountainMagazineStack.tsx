'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import posts from '../blog/posts';
import ServicesGrid from './ServicesGrid';
import { track } from '../lib/track';

const resourcePosts = posts.slice(0, 3);

const sans = { fontFamily: "'Space Grotesk', sans-serif" };
const serif = { fontFamily: "'Cormorant Garamond', serif" };

// FAQ copy lives here so the visible answers and the FAQPage schema cannot drift.
// `id` is stable: it names the heatmap/analytics event and the #anchor.
const faqs = [
  {
    id: 'turnaround',
    q: 'How soon will I have the images?',
    a: 'Photos are delivered in 8 to 10 days, and video in about two weeks. If you need them sooner, ask about rush processing. It depends on availability.',
  },
  {
    id: 'pricing',
    q: 'How is pricing structured?',
    a: 'Every project is quoted individually. Listings are priced by bedroom count, and architectural or partial shoots by the number of spaces. Video, aerials and twilight are added as needed, and booking photo and video on the same visit lowers the total. Send the details through the contact form and you will have a quote within a day.',
  },
  {
    id: 'travel',
    q: 'Do you travel for projects?',
    a: 'Yes. Telluride is home base and most of our work is in the Colorado high country, but we travel for architectural, hospitality and residential projects anywhere in the country. Travel is built into the quote. Tell us where the property is and we will tell you what it takes to get there.',
  },
  {
    id: 'drone',
    q: 'Can you fly a drone at my property?',
    a: 'Usually. All aerial work is flown by an FAA-certified pilot. Some sites sit in controlled airspace or have local restrictions, and mountain weather can push a flight to another day, so we check your location in advance and plan a backup window.',
  },
  {
    id: 'licensing',
    q: 'How does your photo licensing work?',
    a: 'The client who books the shoot can use the images to market that property anywhere: MLS, web, print and social. Any other company that wants to use them, such as a builder, architect, designer or supplier, needs its own license. Multiple licensees get a discount, and we encourage everyone involved to share the cost of the shoot.',
  },
  {
    id: 'prep',
    q: 'How should I prepare the property?',
    a: 'Clean and stage the home as best you can. Clear clutter off counters and surfaces, replace any burned-out bulbs, and move cars, hoses and trash bins out of sight. Clean the windows, glass doors and mirrors: smudged glass is the hardest thing to fix in editing. Our preparation guide has the full room-by-room checklist.',
    link: { href: '/blog/preparing-your-home-for-a-photo-shoot', label: 'Read the preparation guide' },
  },
  {
    id: 'booking',
    q: 'How do I book?',
    a: 'Send the property details through the contact form and you will hear back within a day with a quote and available dates. For most shoots, payment is due when the photos are delivered. Projects with travel or a larger scope have their terms set out in the quote.',
    link: { href: '/contact', label: 'Request a quote' },
  },
];

type GalleryImage = { src: string; full: string; alt: string };

interface ProjectItem {
  id: number;
  src: string;
  /** Specific description of the hero image. */
  alt?: string;
  title: string;
  category: string;
  year: string;
  location: string;
  credit?: string;
  services: string[];
  description: string;
  details: string;
  deliverables: string[];
  gallery?: GalleryImage[];
}

// Each project folder in public/images/work/<slug>/ holds hero.jpg (home page),
// full-size gallery images (2560px long edge) and thumb/ (800px).
const work = (slug: string) => ({
  hero: `/images/work/${slug}/hero.jpg`,
  shot: (n: string, alt: string): GalleryImage => ({
    src: `/images/work/${slug}/thumb/${n}.jpg`,
    full: `/images/work/${slug}/${n}.jpg`,
    alt,
  }),
});
const gg = work('galloping-goose-chalet');
const sh = work('sky-high-at-the-plaza');
const mr = work('mountainside-retreat');
const wo = work('white-oak-house');
const ws = work('weathered-stone');

const projectList: ProjectItem[] = [
  {
    id: 1,
    src: gg.hero,
    alt: 'Aerial view of a timber mountain home among aspens and pines at golden hour, with the San Juan peaks beyond',
    title: 'Galloping Goose Chalet',
    category: 'Drone Series',
    year: '2024',
    location: 'Mountain Village, CO',
    services: ['Aerial Drone Photography', 'Cinematic Video'],
    description: 'A full aerial coverage project showcasing a luxury mountain estate nestled in the San Juan range above Telluride. Shot across two golden-hour sessions to capture the interplay of natural light across the home and surrounding landscape.',
    details: 'FAA-certified drone imaging provided context shots, site overview, and detail passes at multiple altitudes. The results were used across MLS listing materials, broker marketing decks, and the developer\'s portfolio.',
    deliverables: ['10 aerial stills', '1-min cinematic reel', 'Social media edits'],
    gallery: [
      gg.shot('544A1850', 'Kitchen with green glazed tile, a wood range hood and timber posts'),
      gg.shot('544A1893', 'Kitchen island with wood stools under exposed timber framing'),
      gg.shot('544A1887', 'Corner reading nook with a daybed and floor-to-ceiling windows onto aspens and peaks'),
      gg.shot('544A8018', 'Dining room with wood chairs and a wall of windows into the trees'),
      gg.shot('544A1819', 'Wood soaking tub beside a tall window'),
      gg.shot('544A2097', 'Stone terrace with a round fire pit, hot tub and aspens at sunset'),
    ],
  },
  {
    id: 2,
    src: sh.hero,
    alt: 'Kitchen with deep green cabinetry, white tile, open wood shelving and leather stools',
    title: 'Sky High at the Plaza',
    category: 'Interior Study',
    year: '2022',
    location: 'Mountain Village, CO',
    services: ['Architectural Photography', 'Interior Documentation'],
    description: 'A warm modern kitchen study, balancing bold color with restrained material selection. Deep green cabinetry anchors the space against a clean white tile backdrop, while natural wood shelving and brass accents introduce warmth and contrast. The design blends contemporary minimalism with mid-century influences, creating a space that feels both elevated and approachable.',
    details: 'Captured over a single full day with both wide establishing shots and tight detail frames. The resulting images were used in the designer\'s portfolio and on the client\'s website.',
    deliverables: ['28 interior and exterior stills', 'Detail series', 'Print-ready files'],
    gallery: [
      sh.shot('544A8783', 'Dining area with rust chairs, brass globe lights and sheer curtains'),
      sh.shot('544A1757', 'Living room with a blue sofa and tall windows framing the mountains'),
      sh.shot('544A8712', 'Breakfast nook with a round table, window seat and circular shelf'),
      sh.shot('544A1650', 'Bedroom with a chevron wood wall, rust armchair and black-framed windows'),
      sh.shot('544A1655', 'Sunlight across a chevron wood headboard wall and bedside pendant'),
      sh.shot('544A1749', 'Upholstered bed with layered pillows in late afternoon light'),
      sh.shot('DJI_0098', 'Aerial view of the Mountain Village plaza and ski runs at sunset'),
    ],
  },
  {
    id: 3,
    src: mr.hero,
    alt: 'White oak kitchen with an island, brass pendants and leather stools',
    title: 'Mountainside Retreat',
    category: 'Renovation Series',
    year: '2024',
    location: 'Telluride, CO',
    services: ['Interior Design Photography'],
    description: 'Interior work commissioned by the architect showcasing their renovation projects in historic Telluride. The brief called for imagery that felt lived-in and warm rather than staged.',
    details: 'Natural light was prioritized throughout. Furniture and props were styled on-site with the client\'s design team. Final images appeared in a regional hospitality guide and the brand\'s website launch.',
    deliverables: ['20 interior stills', 'Post production staging', 'Web-optimized gallery'],
    gallery: [
      mr.shot('544A8353', 'Open great room under a vaulted timber ceiling with gable windows'),
      mr.shot('544A8375', 'Living room with a dark fireplace wall and sectional sofa'),
      mr.shot('544A8406', 'Vaulted living room with a linear fireplace and gable windows'),
      mr.shot('544A8467', 'Kitchen sink under a black-framed window with brass pendants'),
    ],
  },
  {
    id: 4,
    src: wo.hero,
    alt: 'White oak kitchen wall with a stone backsplash in raking afternoon light',
    title: 'White Oak House',
    category: 'Interior Design',
    year: '2026',
    location: 'Telluride, CO',
    credit: 'Interior design by Catherine Frank',
    services: ['Interior Design Photography', 'Portfolio Imagery'],
    description: 'A portfolio shoot for interior designer Catherine Frank. The house is built from a short list of natural materials: white oak, stone and blackened steel, softened with leather, wool and sheepskin. The brief was to show how those materials carry from room to room, and how the big windows bring the aspens inside.',
    details: 'Shot in the fall with the aspens turning outside. Wide frames follow the flow of the house. Closer frames stay on the curved oak stair, the stone fireplace surrounds and the carved stone tub, where the craft is easiest to see.',
    deliverables: ['18 finished images', 'Web and print files'],
    gallery: [
      wo.shot('544A5606', 'Leather chairs at a tall window framing aspens and peaks'),
      wo.shot('544A5605', 'Curved white oak staircase with a lit handrail'),
      wo.shot('544A5617', 'Living room with a curved sofa under steel-framed windows and fall aspens'),
      wo.shot('544A5765', 'Living room with a stone fireplace wall, sheepskin chairs and aspen views'),
      wo.shot('544A5655', 'Linear fireplace set in a white oak surround with stacked stone walls'),
      wo.shot('544A5752', 'Gallery hallway with stone wall, timber beams and sheepskin chairs'),
      wo.shot('544A5649', 'White oak kitchen wall with integrated range and stone backsplash'),
      wo.shot('544A5643', 'Kitchen island with leather stools and a wall of windows'),
      wo.shot('544A5633', 'Kitchen island with a stone counter and brass faucets beside tall windows'),
      wo.shot('544A5791', 'Kitchen with a black range hood, marble island and leather stools'),
      wo.shot('544A5668', 'Blue-walled bar and billiards room with a crystal chandelier'),
      wo.shot('544A5607', 'Seating area with a sculptural chair beside black steel windows'),
      wo.shot('544A5732', 'Curved blackened steel stair above a rust velvet sofa'),
      wo.shot('544A5746', 'White oak stair rising past a corner window'),
      wo.shot('544A5718', 'Bedroom with a see-through fireplace and fur bench'),
      wo.shot('544A5693', 'Carved stone soaking tub beside steel-framed windows and aspens'),
    ],
  },
  {
    id: 6,
    src: ws.hero,
    alt: 'Bedroom with a live-edge walnut headboard against geometric wallpaper',
    title: 'Weathered Stone',
    category: 'Detail Focus',
    year: '2024',
    location: 'Ouray, CO',
    services: ['Detail Photography', 'Material Documentation'],
    description: 'A close study of material and craft in a custom stone residence in Ouray. The client, a design-build firm, needed images that communicated the quality and precision of their stonework and millwork to prospective clients and design press.',
    details: 'Shot with macro and tilt-shift lenses to isolate material character without distortion. The resulting detail library is used across the firm\'s portfolio, pitch decks, and award submissions.',
    deliverables: ['60 detail stills', 'Material library', 'Print-ready masters'],
    gallery: [
      ws.shot('544A3840', 'Dining room with a sculptural chandelier and blackened steel fireplace'),
      ws.shot('544A4143', 'Living room with a steel fireplace wall and bear portrait'),
      ws.shot('544A4147', 'Blackened steel fireplace wall with a glowing linear fire'),
      ws.shot('544A3847', 'Snowy mountain mural behind a tripod lamp and side table'),
      ws.shot('544A4022', 'Kitchen sink under a window looking out to pines and cliffs'),
      ws.shot('544A3826', 'Rooftop hot tub facing a steep mountain canyon'),
      ws.shot('544A3836', 'Bed facing open balcony doors and the mountains'),
      ws.shot('544A3837', 'Bedroom with an upholstered headboard and panoramic artwork'),
      ws.shot('544A3834', 'Bed with geometric pillows beside a lamp and tall window'),
      ws.shot('544A3831', 'Bed with patterned wallpaper and a wall sconce'),
      ws.shot('544A3829', 'Bunk room with a stag pillow and triangle-pattern wall'),
      ws.shot('544A3828', 'Bed corner with a window onto town rooftops'),
      ws.shot('544A3823', 'Morning light on a dark bedspread by the window'),
    ],
  },
];

// The hero opens the gallery, so the lightbox starts on the home-page image.
const projects: ProjectItem[] = projectList.map(p =>
  p.gallery && p.src.endsWith('/hero.jpg')
    ? { ...p, gallery: [{ src: p.src.replace('/hero.jpg', '/thumb/hero.jpg'), full: p.src, alt: p.alt ?? p.title }, ...p.gallery] }
    : p
);

// Background image preloading. Requests run a few at a time so they never
// crowd out what the visitor is looking at, and are skipped on Save-Data or
// slow connections. Each URL is fetched once; the browser cache does the rest.
const preloaded = new Set<string>();
const preloadQueue: string[] = [];
let preloadActive = 0;
const canPreload = () => {
  if (typeof navigator === 'undefined') return false;
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return !(c?.saveData || /(^|-)2g$/.test(c?.effectiveType ?? ''));
};
const pumpPreload = () => {
  while (preloadActive < 3 && preloadQueue.length) {
    const url = preloadQueue.shift()!;
    preloadActive++;
    const img = new Image();
    img.decoding = 'async';
    img.onload = img.onerror = () => { preloadActive--; pumpPreload(); };
    img.src = url;
  }
};
// `urgent` jumps the queue (a project the visitor just opened or is pointing at).
const preload = (urls: string[], urgent = false) => {
  if (!canPreload()) return;
  const fresh = urls.filter(u => !preloaded.has(u));
  fresh.forEach(u => preloaded.add(u));
  if (urgent) preloadQueue.unshift(...fresh);
  else preloadQueue.push(...fresh);
  pumpPreload();
};
const preloadProject = (project: ProjectItem) =>
  preload([project.src, ...(project.gallery ?? []).flatMap(g => [g.src, g.full])], true);

// Sticky offsets come from CSS variables (globals.css) so the bars stack
// below the sticky site header and shrink on phones.
const cssPx = (name: string) =>
  parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name)) || 0;

const Eyebrow = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-[11px] tracking-[0.24em] uppercase text-[#8B4545] mb-5 ${className}`} style={sans}>
    {children}
  </p>
);

// Hover/always-on label inviting a click on a project image.
const ViewCue = () => (
  <span
    aria-hidden="true"
    className="absolute bottom-6 right-6 md:bottom-10 md:right-10 inline-flex items-center gap-2 bg-[#F5F3F0]/90 backdrop-blur-sm px-4 py-2.5 text-[11px] tracking-[0.2em] uppercase text-[#1A1A1A] transition-all duration-300 md:opacity-0 md:translate-y-2 group-hover/img:opacity-100 group-hover/img:translate-y-0"
    style={sans}
  >
    View project <span className="text-[#8B4545]">→</span>
  </span>
);

const panelEase = [0.4, 0, 0.2, 1] as const;
const panelVariants = {
  open: { height: 'auto', opacity: 1, transition: { duration: 0.4, ease: panelEase } },
  closed: (instant: boolean) => ({
    height: 0,
    opacity: 0,
    transition: { duration: instant ? 0 : 0.4, ease: panelEase },
  }),
};

// Full-screen gallery viewer: swipe or drag on touch, arrows and keys on desktop.
const Lightbox = ({
  images,
  index,
  onIndex,
  onClose,
}: {
  images: GalleryImage[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) => {
  const [dir, setDir] = useState(0);
  const dragged = React.useRef(false);
  const count = images.length;
  const go = React.useCallback((step: number) => {
    setDir(step);
    onIndex((index + step + count) % count);
  }, [index, count, onIndex]);
  const image = images[index];

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  // Keep the page behind from scrolling while the viewer is open.
  React.useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => { root.style.overflow = prev; };
  }, []);

  // Warm the neighbours so a swipe lands on a loaded image.
  React.useEffect(() => {
    [1, -1].forEach(step => { new Image().src = images[(index + step + count) % count].full; });
  }, [index, images, count]);

  const arrow = 'absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full bg-black/45 backdrop-blur-sm text-white/90 hover:bg-black/70 hover:text-white transition-colors text-lg md:text-xl';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] bg-[#111]/95 flex items-center justify-center overflow-hidden"
      style={{ touchAction: 'none' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
    >
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={image.full}
          custom={dir}
          variants={{
            enter: (d: number) => ({ x: d > 0 ? '60%' : d < 0 ? '-60%' : 0, opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (d: number) => ({ x: d > 0 ? '-60%' : '60%', opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: 'spring', stiffness: 320, damping: 34 }, opacity: { duration: 0.2 } }}
          drag={count > 1 ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.8}
          onDragStart={() => { dragged.current = true; }}
          onDragEnd={(_, info) => {
            const swipe = info.offset.x + info.velocity.x * 0.2;
            if (swipe < -80) go(1);
            else if (swipe > 80) go(-1);
          }}
          onClick={e => {
            // Tapping the dark area closes; a swipe that ends there does not.
            e.stopPropagation();
            if (!dragged.current && e.target === e.currentTarget) onClose();
            dragged.current = false;
          }}
          className="absolute inset-0 flex items-center justify-center px-4 pt-12 pb-12 md:px-20 md:py-10 cursor-grab active:cursor-grabbing"
        >
          <img
            src={image.full}
            alt={image.alt}
            draggable={false}
            className="max-h-full max-w-full object-contain select-none"
          />
        </motion.div>
      </AnimatePresence>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            className={`${arrow} left-2 md:left-6`}
            onClick={e => { e.stopPropagation(); go(-1); }}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next image"
            className={`${arrow} right-2 md:right-6`}
            onClick={e => { e.stopPropagation(); go(1); }}
          >
            →
          </button>
          <p
            className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.2em] text-white/60 tabular-nums"
            style={sans}
            aria-live="polite"
          >
            {index + 1} / {count}
          </p>
        </>
      )}

      <button
        type="button"
        className="absolute top-4 right-5 text-[11px] tracking-[0.2em] uppercase text-white/70 hover:text-white"
        style={sans}
        onClick={onClose}
      >
        Close
      </button>
    </motion.div>
  );
};

const RedMountainMagazineStack = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<{ images: GalleryImage[]; index: number } | null>(null);
  // Panels leave instantly when they are off screen or another panel is opening.
  const [exitInstant, setExitInstant] = useState(false);
  const expandedIndex = expandedId !== null ? projects.findIndex(p => p.id === expandedId) : -1;

  const panelEl = (id: number) => document.getElementById(`project-panel-${id}`);
  const barsAbove = (index: number) => cssPx('--header-h') + (index + 1) * cssPx('--bar-h');

  // Close the open panel without moving what the visitor is looking at. Any part
  // of the panel already scrolled up behind the bars is taken back out of the
  // scroll position as the panel shrinks, so the content below stays put.
  const collapse = (instant: boolean) => {
    if (expandedId === null) return;
    const panel = panelEl(expandedId);
    setExitInstant(instant);
    setExpandedId(null);
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    const startHeight = rect.height;
    const hidden = Math.min(startHeight, Math.max(0, barsAbove(expandedIndex) - rect.top));
    if (hidden <= 0) return;
    const startScroll = window.scrollY;
    const step = () => {
      const h = panel.isConnected ? panel.offsetHeight : 0;
      window.scrollTo({ top: startScroll - Math.min(hidden, startHeight - h), behavior: 'instant' });
      if (h > 0) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const open = (project: ProjectItem) => {
    if (expandedId === project.id) return;
    preloadProject(project);
    setExitInstant(true);
    setExpandedId(project.id);
    track('project_open', { project: project.title });
  };

  const toggle = (project: ProjectItem) => {
    if (expandedId === project.id) collapse(false);
    else open(project);
  };

  // Once the page has loaded, quietly fetch every hero, then the thumbnails.
  React.useEffect(() => {
    const start = () => {
      preload(projects.map(p => p.src));
      preload(projects.flatMap(p => (p.gallery ?? []).map(g => g.src)));
    };
    const idle = () => ('requestIdleCallback' in window ? window.requestIdleCallback(start, { timeout: 3000 }) : setTimeout(start, 1500));
    if (document.readyState === 'complete') idle();
    else window.addEventListener('load', idle, { once: true });
    return () => window.removeEventListener('load', idle);
  }, []);

  // After the panel renders, scroll so it sits just below the stacked bars.
  React.useEffect(() => {
    if (expandedId === null) return;
    let frames = 0;
    let raf = 0;
    const place = () => {
      const panel = panelEl(expandedId);
      // Wait for a previously open panel to leave so the math sees final layout.
      const others = document.querySelectorAll('[data-project-panel]').length > 1;
      if (!panel || (others && frames++ < 30)) { raf = requestAnimationFrame(place); return; }
      const top = panel.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - barsAbove(expandedIndex), behavior: 'smooth' });
    };
    // Double rAF lets layout settle before measuring.
    raf = requestAnimationFrame(() => { raf = requestAnimationFrame(place); });
    return () => cancelAnimationFrame(raf);
  }, [expandedId, expandedIndex]);

  // Collapse once the panel has left the view (behind the bars or below the
  // screen), but only after scrolling stops so a flick on a phone is not fought.
  const collapseRef = React.useRef(collapse);
  collapseRef.current = collapse;
  React.useEffect(() => {
    if (expandedId === null) return;
    let observer: IntersectionObserver | null = null;
    let outOfView = false;
    let idle: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      clearTimeout(idle);
      idle = setTimeout(() => { if (outOfView) collapseRef.current(true); }, 200);
    };
    const timer = setTimeout(() => {
      const panel = panelEl(expandedId);
      if (!panel) return;
      observer = new IntersectionObserver(
        ([entry]) => { outOfView = !entry.isIntersecting; },
        { rootMargin: `-${barsAbove(expandedIndex)}px 0px 0px 0px` }
      );
      observer.observe(panel);
      window.addEventListener('scroll', onScroll, { passive: true });
    }, 1500);
    return () => {
      clearTimeout(timer);
      clearTimeout(idle);
      observer?.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [expandedId, expandedIndex]);

  return (
    <div className="bg-[#F5F3F0]">

      {/* ── Hero ── */}
      {/* Desktop: text panel left, photo right. Mobile: the photo fills one screen (svh, so it fits under the browser bars) with the name over a dark fade; the header's Contact is the only CTA. */}
      <section className="relative flex flex-col md:flex-row overflow-hidden h-[calc(100svh-var(--header-h))] md:h-auto md:min-h-[calc(100vh-var(--header-h))]">
        <div
          className="absolute inset-x-0 bottom-0 z-10 px-6 pb-9 pt-32 bg-gradient-to-t from-black/75 via-black/35 to-transparent md:relative md:inset-auto md:w-2/5 md:flex md:flex-col md:justify-between md:px-16 md:py-16 md:bg-[#F5F3F0] md:bg-none"
        >
          <div className="hidden md:block" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
          >
            <img
              src="/images/logo.png"
              alt="Red Mountain Photography logo, a mountain peak and camera"
              width="89"
              height="56"
              className="hidden md:block mb-3 w-auto"
              style={{ height: 'clamp(32px, 3.8vw, 56px)' }}
            />
            <h1 className="leading-[0.9] tracking-[-0.03em] uppercase" style={{ ...sans, fontWeight: 300 }}>
              <span
                className="block text-[11vw] text-[#F5F3F0] md:text-[3.8vw] md:text-[#1A1A1A] whitespace-nowrap"
                style={{ fontWeight: 500 }}
              >
                Red Mountain
              </span>
              <span
                className="block text-[11vw] text-[#F5F3F0] md:text-[3.8vw] md:text-[#8B4545] whitespace-nowrap"
                style={{ fontWeight: 300 }}
              >
                Photography
              </span>
            </h1>
            <p
              className={`text-[#F5F3F0]/85 mt-3 md:mt-7 text-sm md:text-lg md:text-[#1A1A1A]/70 leading-relaxed max-w-sm`}
              style={sans}
            >
              Architecture, interiors and real estate. Based in Telluride, shooting nationwide.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="hidden md:flex flex-wrap items-center gap-3"
            style={sans}
          >
            <Link
              href="/contact"
              data-cta="hero-quote"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#8B4545] text-white text-[10px] tracking-[0.2em] uppercase hover:bg-[#1A1A1A] transition-colors duration-300"
            >
              Get a Quote <span aria-hidden="true">→</span>
            </Link>
            <a
              href="#work"
              data-cta="hero-work"
              className="inline-flex items-center gap-3 px-7 py-3.5 border border-[#1A1A1A] text-[#1A1A1A] text-[10px] tracking-[0.2em] uppercase hover:bg-[#1A1A1A] hover:text-white transition-colors duration-300"
            >
              View Work
            </a>
          </motion.div>
        </div>

        <div
          className="absolute inset-0 md:relative md:inset-auto md:flex-none md:w-3/5 md:h-auto"
        >
          <img
            src="/images/actual/544A5593-sun.jpg"
            alt="Bedroom with a chevron-paneled wall, black bed and brass reading lamp, Telluride interior photography"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-16 border-y border-black/10">
        <div className="max-w-3xl mx-auto text-center">
          <Eyebrow>Based in Telluride · Shooting Nationwide</Eyebrow>
          <p className="text-2xl md:text-3xl font-light text-[#1A1A1A] leading-snug" style={serif}>
            Photography and video for architects, builders, designers and brokers. Telluride is home, and we travel wherever the project is.
          </p>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="bg-[#F5F3F0] py-20 md:py-24 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 md:mb-14 text-center">
            <Eyebrow>Services</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A]" style={serif}>
              What we shoot
            </h2>
          </div>
          <ServicesGrid variant="compact" />
          <div className="mt-12 text-center">
            <Link
              href="/about#services"
              className="text-[11px] tracking-[0.2em] uppercase text-[#8B4545] border-b border-[#8B4545] pb-0.5 hover:opacity-60 transition-opacity"
              style={sans}
            >
              Services in detail →
            </Link>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="bg-[#1A1A1A] text-[#F5F3F0]">
        <div className="flex flex-col md:flex-row md:min-h-[70vh]">
          <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 py-16 md:py-24 order-2 md:order-1">
            <Eyebrow className="!text-[#c98282]">Behind the camera</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-light mb-8 leading-tight" style={serif}>
              Tim Barber
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-[#F5F3F0]/80 max-w-lg" style={sans}>
              <p>
                I live in Telluride and photograph architecture, interiors and real estate for the people who design, build and sell them.
              </p>
              <p>
                Most of my work is in the San Juans, where I know which rooms catch morning light and when the peaks glow after sunset. More of it every year is on the road, and I am always glad to travel for the right project.
              </p>
              <p>
                You work directly with me, from the first call to the final files.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-10 self-start text-[11px] tracking-[0.2em] uppercase text-[#F5F3F0] border-b border-[#8B4545] pb-0.5 hover:text-[#c98282] transition-colors"
              style={sans}
            >
              More about the studio →
            </Link>
          </div>
          <div className="w-full md:w-1/2 relative aspect-[4/5] md:aspect-auto order-1 md:order-2">
            <img
              src="/images/tim-barber.jpg"
              alt="Tim Barber, architectural and real estate photographer, Telluride, Colorado"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
            />
          </div>
        </div>
      </section>

      {/* ── Selected work ── */}
      <section className="bg-[#F5F3F0] pt-20 md:pt-24 pb-10 px-6 md:px-16 text-center">
        <Eyebrow>Selected Work</Eyebrow>
        <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A] mb-4" style={serif}>
          Recent projects
        </h2>
        <p className="text-sm text-[#1A1A1A]/55" style={sans}>Open a project for the story behind it.</p>
      </section>

      {/* ── Magazine stack ── */}
      <div id="work" style={{ overflowAnchor: 'none' }}>
        {projects.map((project, index) => {
          const isOpen = project.id === expandedId;
          const panelId = `project-panel-${project.id}`;
          return (
            <React.Fragment key={project.id}>

              {/* Sticky title bar */}
              <button
                type="button"
                data-project-id={project.id}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="group sticky w-full text-left bg-white border-b border-black/10 cursor-pointer transition-colors duration-150 hover:bg-[#f3efe9]"
                style={{
                  top: `calc(var(--header-h) + var(--bar-h) * ${index})`,
                  height: 'var(--bar-h)',
                  zIndex: expandedIndex >= 0 && index > expandedIndex ? 40 : 50,
                }}
                onClick={() => toggle(project)}
                onPointerEnter={e => { if (e.pointerType === 'mouse') preloadProject(project); }}
              >
                <div className="flex items-center justify-between h-full px-6 md:px-10" style={sans}>
                  <span className="flex items-baseline gap-4 md:gap-6">
                    <span className="text-[10px] tracking-[0.2em] text-[#8B4545] tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-xs md:text-sm font-medium tracking-[0.18em] md:tracking-[0.22em] uppercase text-[#1A1A1A] transition-colors duration-150 group-hover:text-[#8B4545]">
                      {project.title}
                    </span>
                  </span>
                  <span className="flex items-center gap-8 text-xs tracking-[0.15em] uppercase text-[#1A1A1A]/45">
                    <span className="hidden md:inline">{project.location}</span>
                    <span className="hidden sm:inline">{project.category}</span>
                    <span className="flex items-center gap-2 text-[#8B4545]">
                      <span className="text-[10px] md:text-[11px] tracking-[0.2em]">{isOpen ? 'Close' : 'View'}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-[#8B4545] inline-block"
                      aria-hidden="true"
                    >
                      →
                    </motion.span>
                    </span>
                  </span>
                </div>
              </button>

              {/* Expandable panel: in document flow, pushes content down */}
              <AnimatePresence initial={false} custom={exitInstant}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    data-project-panel
                    key="panel"
                    custom={exitInstant}
                    variants={panelVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="overflow-hidden bg-white border-b border-black/10"
                    style={{ position: 'relative', zIndex: 49 }}
                  >
                    <div className="px-6 md:px-10 py-10 md:py-12 max-w-6xl mx-auto">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="md:col-span-2">
                          <p className="text-xs tracking-[0.15em] uppercase text-[#8B4545] mb-4" style={sans}>
                            {project.location} · {project.year}
                          </p>
                          <p className="text-[#1A1A1A] leading-relaxed mb-6" style={{ ...serif, fontSize: '1.2rem' }}>
                            {project.description}
                          </p>
                          <p className="text-sm text-[#1A1A1A]/60 leading-relaxed" style={sans}>
                            {project.details}
                          </p>
                        </div>
                        <div className="flex flex-col gap-8" style={sans}>
                          {project.credit && (
                            <div>
                              <p className="text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A]/40 mb-3">Credit</p>
                              <p className="text-sm text-[#1A1A1A]">{project.credit}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A]/40 mb-3">Services</p>
                            <ul className="space-y-1">
                              {project.services.map(s => (
                                <li key={s} className="text-sm text-[#1A1A1A]">{s}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A]/40 mb-3">Deliverables</p>
                            <ul className="space-y-1">
                              {project.deliverables.map(d => (
                                <li key={d} className="text-sm text-[#1A1A1A]/70">{d}</li>
                              ))}
                            </ul>
                          </div>
                          <Link
                            href="/contact"
                            data-cta="project-contact"
                            className="mt-auto self-start inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#8B4545] border-b border-[#8B4545] pb-0.5 hover:opacity-60 transition-opacity"
                          >
                            Start a project like this →
                          </Link>
                        </div>
                      </div>

                      {project.gallery && (
                        <div className="mt-10 grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
                          {project.gallery.map((g, gi) => (
                            <button
                              key={g.src}
                              type="button"
                              onClick={() => { setLightbox({ images: project.gallery!, index: gi }); track('gallery_open', { image: g.full }); }}
                              className="block aspect-square overflow-hidden bg-[#e9e6e1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B4545]"
                              aria-label={`View larger: ${g.alt}`}
                            >
                              <img src={g.src} alt={g.alt} loading="lazy" className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-500" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Full-bleed hero image */}
                <button
                  type="button"
                  onClick={() => open(project)}
                  onPointerEnter={e => { if (e.pointerType === 'mouse') preloadProject(project); }}
                  aria-label={`Open project: ${project.title}`}
                  className="group/img relative block w-full h-[65vh] md:h-screen cursor-pointer text-left"
                >
                  <img
                    src={project.src}
                    alt={project.alt ? `${project.alt}. ${project.title}, ${project.location}` : `${project.title}, ${project.category.toLowerCase()} photography in ${project.location} by Red Mountain Photography`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  {!isOpen && <ViewCue />}
                </button>

            </React.Fragment>
          );
        })}
      </div>

      {/* ── FAQ ── */}
      <section id="faq" className="bg-[#F5F3F0] py-20 md:py-24 px-6 md:px-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map(f => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            }),
          }}
        />
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A]" style={serif}>
              Good to know
            </h2>
          </div>
          <div className="border-b border-black/10">
            {faqs.map(f => (
              <details
                key={f.id}
                id={`faq-${f.id}`}
                data-faq={f.id}
                className="faq-item border-t border-black/10 group"
                onToggle={e => {
                  if ((e.currentTarget as HTMLDetailsElement).open) track('faq_open', { question: f.id });
                }}
              >
                <summary className="flex items-start justify-between gap-6 py-6 cursor-pointer select-none">
                  <h3 className="text-xl md:text-2xl font-light text-[#1A1A1A] leading-snug group-hover:text-[#8B4545] transition-colors" style={serif}>
                    {f.q}
                  </h3>
                  <span className="faq-mark text-2xl leading-none text-[#8B4545] mt-1 shrink-0" style={sans} aria-hidden="true">+</span>
                </summary>
                <div className="pb-7 -mt-1 pr-10">
                  <p className="text-base text-[#1A1A1A]/70 leading-relaxed" style={sans}>{f.a}</p>
                  {f.link && (
                    <Link
                      href={f.link.href}
                      className="inline-block mt-4 text-[11px] tracking-[0.2em] uppercase text-[#8B4545] border-b border-[#8B4545] pb-0.5 hover:opacity-60 transition-opacity"
                      style={sans}
                    >
                      {f.link.label} →
                    </Link>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Resources ── */}
      <section className="bg-white border-y border-black/10 py-20 md:py-24 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 md:mb-14 text-center">
            <Eyebrow>Resources</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A]" style={serif}>
              Notes from the field
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {resourcePosts.map(post => (
              <article key={post.slug} className="flex flex-col">
                <Link href={`/blog/${post.slug}`} className="block overflow-hidden mb-5">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    loading="lazy"
                    className="w-full aspect-[3/2] object-cover hover:scale-[1.03] transition-transform duration-700"
                  />
                </Link>
                <p className="text-[10px] text-[#8B4545] uppercase tracking-[0.2em] mb-2" style={sans}>
                  {post.category} · {post.readTime}
                </p>
                <h3 className="text-2xl font-light text-[#1A1A1A] mb-3 leading-snug" style={serif}>
                  <Link href={`/blog/${post.slug}`} className="hover:text-[#8B4545] transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm text-[#1A1A1A]/60 leading-relaxed">{post.excerpt}</p>
              </article>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 px-7 py-3 border border-[#1A1A1A] text-[#1A1A1A] text-[10px] tracking-[0.2em] uppercase hover:bg-[#1A1A1A] hover:text-white transition-colors duration-300"
              style={sans}
            >
              All articles <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Closing call to action ── */}
      <section className="bg-[#1A1A1A] text-[#F5F3F0] py-20 md:py-24 px-6 md:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <Eyebrow className="!text-[#c98282]">Start a project</Eyebrow>
          <h2 className="text-4xl md:text-6xl font-light mb-6 leading-tight" style={serif}>
            Tell us about the property.
          </h2>
          <p className="text-base text-[#F5F3F0]/70 mb-10 max-w-xl mx-auto" style={sans}>
            Where it is, when you need it and what you have in mind. You will hear back within a day with availability and a quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center" style={sans}>
            <Link
              href="/contact"
              data-cta="closing-quote"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#8B4545] text-white text-[11px] tracking-[0.2em] uppercase hover:bg-[#F5F3F0] hover:text-[#1A1A1A] transition-colors duration-300"
            >
              Get a Quote <span aria-hidden="true">→</span>
            </Link>
            <a
              href="tel:+19706700846"
              data-cta="closing-call"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-[#F5F3F0]/40 text-[#F5F3F0] text-[11px] tracking-[0.2em] uppercase hover:border-[#F5F3F0] transition-colors duration-300"
            >
              (970) 670-0846
            </a>
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            index={lightbox.index}
            onIndex={index => setLightbox(lb => (lb ? { ...lb, index } : lb))}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default RedMountainMagazineStack;
