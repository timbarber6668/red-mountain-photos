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

interface ProjectItem {
  id: number;
  src: string;
  /** Optional second image: shown side by side with `src` on desktop. */
  pair?: string;
  title: string;
  category: string;
  year: string;
  location: string;
  credit?: string;
  services: string[];
  description: string;
  details: string;
  deliverables: string[];
  gallery?: { src: string; full: string; alt: string }[];
}

const cf = (n: string, alt: string) => ({
  src: `/images/work/catherine-frank/thumb/${n}.jpg`,
  full: `/images/work/catherine-frank/${n}.jpg`,
  alt,
});

const projects: ProjectItem[] = [
  {
    id: 1,
    src: '/images/actual/DJI_0547.jpg',
    title: 'Galloping Goose Chalet',
    category: 'Drone Series',
    year: '2024',
    location: 'Mountain Village, CO',
    services: ['Aerial Drone Photography', 'Cinematic Video'],
    description: 'A full aerial coverage project showcasing a luxury mountain estate nestled in the San Juan range above Telluride. Shot across two golden-hour sessions to capture the interplay of natural light across the home and surrounding landscape.',
    details: 'FAA-certified drone imaging provided context shots, site overview, and detail passes at multiple altitudes. The results were used across MLS listing materials, broker marketing decks, and the developer\'s portfolio.',
    deliverables: ['10 aerial stills', '1-min cinematic reel', 'Social media edits'],
  },
  {
    id: 2,
    src: '/images/actual/544A8777.jpg',
    title: 'Sky High at the Plaza',
    category: 'Interior Study',
    year: '2022',
    location: 'Mountain Village, CO',
    services: ['Architectural Photography', 'Interior Documentation'],
    description: 'A warm modern kitchen study, balancing bold color with restrained material selection. Deep green cabinetry anchors the space against a clean white tile backdrop, while natural wood shelving and brass accents introduce warmth and contrast. The design blends contemporary minimalism with mid-century influences, creating a space that feels both elevated and approachable.',
    details: 'Captured over a single full day with both wide establishing shots and tight detail frames. The resulting images were used in the designer\'s portfolio and on the client\'s website.',
    deliverables: ['28 interior and exterior stills', 'Detail series', 'Print-ready files'],
  },
  {
    id: 3,
    src: '/images/actual/544A8388.jpg',
    title: 'Mountainside Retreat',
    category: 'Renovation Series',
    year: '2024',
    location: 'Telluride, CO',
    services: ['Interior Design Photography'],
    description: 'Interior work commissioned by the architect showcasing their renovation projects in historic Telluride. The brief called for imagery that felt lived-in and warm rather than staged.',
    details: 'Natural light was prioritized throughout. Furniture and props were styled on-site with the client\'s design team. Final images appeared in a regional hospitality guide and the brand\'s website launch.',
    deliverables: ['20 interior stills', 'Post production staging', 'Web-optimized gallery'],
  },
  {
    id: 4,
    src: '/images/work/catherine-frank/544A5606.jpg',
    pair: '/images/work/catherine-frank/544A5601.jpg',
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
      cf('544A5649', 'White oak kitchen wall with integrated range and stone backsplash'),
      cf('544A5655', 'Linear fireplace set in a white oak surround with stacked stone walls'),
      cf('544A5693', 'Carved stone soaking tub beside steel-framed windows and aspens'),
      cf('544A5752', 'Gallery hallway with stone wall, timber beams and sheepskin chairs'),
      cf('544A5732', 'Curved blackened steel stair above a rust velvet sofa'),
      cf('544A5765', 'Living room with stone fireplace wall, sheepskin chairs and aspen views'),
    ],
  },
  {
    id: 5,
    src: '/images/actual/544A1850.jpg',
    title: 'Twilight Approach',
    category: 'Golden Hour',
    year: '2024',
    location: 'Telluride, CO',
    services: ['Twilight Photography', 'Architectural Photography'],
    description: 'Twilight and dusk photography for a contemporary mountain home in Telluride\'s historic district. The blue-hour window, roughly 20 minutes after sunset, produced the warm exterior glow and dramatic sky contrast the client needed for their feature submission.',
    details: 'Coordinated with the interior design and staging teams to ensure all lighting was tuned for the shoot window. Multiple bracketed exposures were composited for maximum dynamic range across the sky and interior warm tones.',
    deliverables: ['Twilight exterior series', 'Interior ambient stills', 'High-res composites'],
  },
  {
    id: 6,
    src: '/images/actual/544A3825.jpg',
    title: 'Weathered Stone',
    category: 'Detail Focus',
    year: '2024',
    location: 'Ouray, CO',
    services: ['Detail Photography', 'Material Documentation'],
    description: 'A close study of material and craft in a custom stone residence in Ouray. The client, a design-build firm, needed images that communicated the quality and precision of their stonework and millwork to prospective clients and design press.',
    details: 'Shot with macro and tilt-shift lenses to isolate material character without distortion. The resulting detail library is used across the firm\'s portfolio, pitch decks, and award submissions.',
    deliverables: ['60 detail stills', 'Material library', 'Print-ready masters'],
  },
];

// Sticky offsets come from CSS variables (globals.css) so the bars stack
// below the sticky site header and shrink on phones.
const cssPx = (name: string) =>
  parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name)) || 0;

const Eyebrow = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-[11px] tracking-[0.24em] uppercase text-[#8B4545] mb-5 ${className}`} style={sans}>
    {children}
  </p>
);

const RedMountainMagazineStack = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const expandedIndex = expandedId !== null ? projects.findIndex(p => p.id === expandedId) : -1;
  const panelRef = React.useRef<HTMLDivElement>(null);

  const toggle = (project: ProjectItem) => {
    setExpandedId(prev => {
      const next = prev === project.id ? null : project.id;
      if (next !== null) track('project_open', { project: project.title });
      return next;
    });
  };

  // After the panel renders, scroll so it sits just below the stacked bars.
  React.useEffect(() => {
    if (expandedId === null || !panelRef.current) return;
    const panel = panelRef.current;

    // Double rAF waits for layout to settle after scroll anchoring.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const barsAbove = cssPx('--header-h') + (expandedIndex + 1) * cssPx('--bar-h');
        let absoluteTop = 0;
        let el: HTMLElement | null = panel;
        while (el) {
          absoluteTop += el.offsetTop;
          el = el.offsetParent as HTMLElement | null;
        }
        document.documentElement.scrollTop = absoluteTop - barsAbove;
      });
    });
  }, [expandedId, expandedIndex]);

  // Collapse when the panel scrolls behind the sticky bars.
  React.useEffect(() => {
    if (expandedId === null) return;
    let observer: IntersectionObserver | null = null;
    const timer = setTimeout(() => {
      if (!panelRef.current) return;
      const barsHeight = cssPx('--header-h') + (expandedIndex + 1) * cssPx('--bar-h');
      observer = new IntersectionObserver(
        ([entry]) => { if (!entry.isIntersecting) setExpandedId(null); },
        { rootMargin: `-${barsHeight}px 0px 0px 0px` }
      );
      observer.observe(panelRef.current);
    }, 1500);
    return () => { clearTimeout(timer); observer?.disconnect(); };
  }, [expandedId, expandedIndex]);

  React.useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

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
                className="sticky w-full text-left bg-white border-b border-black/10 cursor-pointer transition-colors duration-150 hover:bg-[#f9f8f6]"
                style={{
                  top: `calc(var(--header-h) + var(--bar-h) * ${index})`,
                  height: 'var(--bar-h)',
                  zIndex: expandedIndex >= 0 && index > expandedIndex ? 40 : 50,
                }}
                onClick={() => toggle(project)}
              >
                <div className="flex items-center justify-between h-full px-6 md:px-10" style={sans}>
                  <span className="flex items-baseline gap-4 md:gap-6">
                    <span className="text-[10px] tracking-[0.2em] text-[#8B4545] tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-xs md:text-sm font-medium tracking-[0.18em] md:tracking-[0.22em] uppercase text-[#1A1A1A]">
                      {project.title}
                    </span>
                  </span>
                  <span className="flex items-center gap-8 text-xs tracking-[0.15em] uppercase text-[#1A1A1A]/45">
                    <span className="hidden md:inline">{project.location}</span>
                    <span className="hidden sm:inline">{project.category}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-[#8B4545] inline-block"
                      aria-hidden="true"
                    >
                      →
                    </motion.span>
                  </span>
                </div>
              </button>

              {/* Expandable panel: in document flow, pushes content down */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    ref={panelRef}
                    id={panelId}
                    key="panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
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
                          {project.gallery.map(g => (
                            <button
                              key={g.src}
                              type="button"
                              onClick={() => { setLightbox({ src: g.full, alt: g.alt }); track('gallery_open', { image: g.full }); }}
                              className="block aspect-[2/3] overflow-hidden bg-[#e9e6e1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B4545]"
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

              {/* Full-bleed image, or a side-by-side pair for vertical work */}
              {project.pair ? (
                <div className="w-full h-[80vh] md:h-screen grid grid-cols-1 md:grid-cols-2 bg-[#1A1A1A]">
                  <img
                    src={project.src}
                    alt={`${project.title}, ${project.category.toLowerCase()} photography in ${project.location}: leather chairs at a window framing aspens and peaks`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <img
                    src={project.pair}
                    alt={`${project.title}: curved white oak staircase with a lit handrail`}
                    loading="lazy"
                    className="hidden md:block w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-[65vh] md:h-screen">
                  <img
                    src={project.src}
                    alt={`${project.title}, ${project.category.toLowerCase()} photography in ${project.location} by Red Mountain Photography`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-[#111]/95 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.alt}
          >
            <img src={lightbox.src} alt={lightbox.alt} className="max-h-full max-w-full object-contain" />
            <button
              type="button"
              className="absolute top-4 right-5 text-[11px] tracking-[0.2em] uppercase text-white/70 hover:text-white"
              style={sans}
              onClick={() => setLightbox(null)}
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default RedMountainMagazineStack;
