'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectItem {
  id: number;
  src: string;
  title: string;
  category: string;
  year: string;
  location: string;
  services: string[];
  description: string;
  details: string;
  deliverables: string[];
}

const BAR_HEIGHT = 56;

const projects: ProjectItem[] = [
  {
    id: 1,
    src: '/images/actual/DJI_0408.jpg',
    title: 'Alpine Ascent',
    category: 'Drone Series',
    year: '2024',
    location: 'Telluride, CO',
    services: ['Aerial Drone Photography', 'Cinematic Video'],
    description: 'A full aerial coverage project showcasing a luxury mountain estate nestled in the San Juan range outside Telluride. Shot across two golden-hour sessions to capture the interplay of natural light across the roof forms and surrounding landscape.',
    details: 'FAA-certified drone imaging provided context shots, site overview, and detail passes at multiple altitudes. The results were used across MLS listing materials, broker marketing decks, and the developer\'s portfolio.',
    deliverables: ['60 aerial stills', '2-min cinematic drone reel', 'Social media edits'],
  },
  {
    id: 2,
    src: '/images/actual/544A8777.jpg',
    title: 'Shadowed Ridges',
    category: 'Landscape Study',
    year: '2024',
    location: 'Mountain Village, CO',
    services: ['Architectural Photography', 'Exterior Documentation'],
    description: 'An architectural study exploring how a high-altitude residence responds to its ridge-line setting. This project focused on the building\'s exterior materiality — stone, glass, and steel — as it transitions across seasons and light conditions.',
    details: 'Captured over a single full day with both wide establishing shots and tight detail frames. The resulting portfolio helped the architect win two regional design awards and anchor a national publication feature.',
    deliverables: ['48 exterior stills', 'Detail series', 'Print-ready files'],
  },
  {
    id: 3,
    src: '/images/actual/544A8388.jpg',
    title: 'Mountain Gaze',
    category: 'Portrait Series',
    year: '2024',
    location: 'Telluride, CO',
    services: ['Interior Photography', 'Lifestyle Imagery'],
    description: 'Interior portrait work commissioned for a boutique hospitality brand launching their flagship mountain property. The brief called for imagery that felt lived-in and warm rather than staged — an editorial approach to real estate photography.',
    details: 'Natural light was prioritized throughout. Furniture and props were styled on-site with the client\'s design team. Final images appeared in a regional hospitality guide and the brand\'s website launch.',
    deliverables: ['80 interior stills', 'Lifestyle selects', 'Web-optimized gallery'],
  },
  {
    id: 4,
    src: '/images/actual/544A1449.jpg',
    title: 'Forest Depths',
    category: 'Dense Growth',
    year: '2024',
    location: 'Ridgway, CO',
    services: ['Real Estate Photography', 'Property Marketing'],
    description: 'A luxury residential listing shoot for a forested retreat on 40 acres outside Ridgway. The property\'s character lives in its relationship to the surrounding Ponderosa pine forest — the photography was designed to communicate that connection throughout.',
    details: 'Interior, exterior, and aerial coverage delivered as a complete marketing package. The listing sold above asking price within three weeks of launch, with the listing agent citing the photography as a key differentiator.',
    deliverables: ['90 photos (interior + exterior)', 'Drone stills', 'Agent promo reel'],
  },
  {
    id: 5,
    src: '/images/actual/544A1850.jpg',
    title: 'Twilight Approach',
    category: 'Golden Hour',
    year: '2024',
    location: 'Telluride, CO',
    services: ['Twilight Photography', 'Architectural Photography'],
    description: 'Twilight and dusk photography for a contemporary mountain home in Telluride\'s historic district. The blue-hour window — roughly 20 minutes after sunset — produced the warm exterior glow and dramatic sky contrast the client needed for their feature submission.',
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
    description: 'A close study of material and craft in a custom stone residence in Ouray. The client — a design-build firm — needed images that communicated the quality and precision of their stonework and millwork to prospective clients and design press.',
    details: 'Shot with macro and tilt-shift lenses to isolate material character without distortion. The resulting detail library is used across the firm\'s portfolio, pitch decks, and award submissions.',
    deliverables: ['60 detail stills', 'Material library', 'Print-ready masters'],
  },
];

const RedMountainMagazineStack = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const expandedIndex = expandedId !== null ? projects.findIndex(p => p.id === expandedId) : -1;
  const panelRef = React.useRef<HTMLDivElement>(null);

  const toggle = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  // After panel renders, scroll so it's visible below the stacked bars
  React.useEffect(() => {
    if (expandedId === null || !panelRef.current) return;
    const panel = panelRef.current;
    const barsAbove = (expandedIndex + 1) * BAR_HEIGHT;

    // Use double-rAF to wait for layout after scroll anchoring settles
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
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

  // Collapse when panel scrolls behind the sticky bars (out of view)
  React.useEffect(() => {
    if (expandedId === null) return;
    let observer: IntersectionObserver | null = null;
    const timer = setTimeout(() => {
      if (!panelRef.current) return;
      const barsHeight = (expandedIndex + 1) * BAR_HEIGHT;
      observer = new IntersectionObserver(
        ([entry]) => { if (!entry.isIntersecting) setExpandedId(null); },
        { rootMargin: `-${barsHeight}px 0px 0px 0px` }
      );
      observer.observe(panelRef.current);
    }, 1500);
    return () => { clearTimeout(timer); observer?.disconnect(); };
  }, [expandedId, expandedIndex]);

  return (
    <div className="bg-[#F5F3F0]">

      {/* ── Hero ── */}
      <section className="min-h-screen flex flex-col md:flex-row relative overflow-hidden">
        <div className="relative z-10 w-full md:w-2/5 flex flex-col justify-between px-10 md:px-16 py-12 md:py-16 bg-[#F5F3F0]">
          <div />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
            className="py-8 md:py-0"
          >
            <img
              src="/images/logo.png"
              alt="Red Mountain Photos logo - Mountain peak and camera icon"
              className="mb-3 w-auto"
              style={{ height: 'clamp(32px, 3.8vw, 56px)' }}
            />
            <h1
              className="font-light leading-[0.9] tracking-[-0.03em] text-[#1A1A1A] uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300 }}
            >
              <span className="block text-[9vw] md:text-[3.8vw] whitespace-nowrap" style={{ fontWeight: 500 }}>Red Mountain</span>
              <span className="block text-[9vw] md:text-[3.8vw] text-[#8B4545] whitespace-nowrap" style={{ fontWeight: 300 }}>Photography</span>
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
          >
            <p
              className="text-[10px] text-[#1A1A1A]/45 leading-relaxed tracking-[0.14em] uppercase max-w-[180px]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Telluride · Architecture &amp; Real Estate Photography
            </p>
            <button
              className="self-start sm:self-auto inline-flex items-center gap-3 px-7 py-3 border border-[#1A1A1A] text-[#1A1A1A] text-[10px] tracking-[0.2em] uppercase hover:bg-[#1A1A1A] hover:text-white transition-colors duration-300"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              View Work <span>→</span>
            </button>
          </motion.div>
        </div>

        <div className="relative w-full md:w-3/5 h-[55vw] md:h-auto min-h-[55vw] md:min-h-0">
          <img
            src="/images/actual/544A5593.jpg"
            alt="Modern luxury bedroom interior with chevron wall pattern, black bed with designer lamp - Telluride interior photography"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F3F0]/20 to-transparent md:bg-gradient-to-l md:from-transparent md:to-[#F5F3F0]/10" />
        </div>
      </section>

      {/* ── Local SEO / Service Areas ── */}
      <section className="bg-white py-20 px-10 md:px-16 border-b border-black/10">
        <div className="max-w-6xl mx-auto">
          <p
            className="text-xs tracking-[0.15em] uppercase text-[#8B4545] mb-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Based in Telluride, Colorado
          </p>
          <p className="text-lg text-[#1A1A1A]/70 leading-relaxed max-w-3xl">
            Red Mountain Photography is based in Telluride, Colorado, serving luxury real estate, architectural, and commercial clients throughout the Colorado high country. We work regularly in Telluride, Mountain Village, Ridgway, Ouray, Silverton, Durango, and Aspen — capturing the unique character of alpine and mountain resort properties.
          </p>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section className="bg-[#F5F3F0] py-24 px-10 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2
              className="text-4xl md:text-5xl font-light mb-6 text-[#1A1A1A]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Services
            </h2>
            <p className="text-base text-[#1A1A1A]/70 max-w-3xl">
              Every project starts with a vision — whether it's a luxury home, a restaurant launch, or a vacation rental. Red Mountain Photography works alongside architects, developers, and brands to translate that vision into images and motion that feel authentic and purposeful.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Luxury Real Estate & Architectural Photography */}
            <div>
              <h3
                className="text-xl font-medium mb-4 text-[#1A1A1A] uppercase tracking-[0.1em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Luxury Real Estate &amp; Architectural Photography
              </h3>
              <p className="text-base text-[#1A1A1A]/70 leading-relaxed">
                High-end architectural and real estate photography for luxury homes, custom builds, and design-forward properties. Clean composition, intentional lighting, and meticulous post-production to showcase every detail.
              </p>
            </div>

            {/* Property Home Tour Videos */}
            <div>
              <h3
                className="text-xl font-medium mb-4 text-[#1A1A1A] uppercase tracking-[0.1em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Property Home Tour Videos
              </h3>
              <p className="text-base text-[#1A1A1A]/70 leading-relaxed">
                Cinematic property walkthroughs and home tour videos designed for MLS listings, broker marketing, and social media. Professional color grading, motion design, and pacing that keeps viewers engaged.
              </p>
            </div>

            {/* Hospitality & Vacation Rentals */}
            <div>
              <h3
                className="text-xl font-medium mb-4 text-[#1A1A1A] uppercase tracking-[0.1em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Hospitality &amp; Vacation Rentals
              </h3>
              <p className="text-base text-[#1A1A1A]/70 leading-relaxed">
                Professional photography and video for hotels, resorts, vacation rentals, and hospitality brands. Lifestyle imagery that captures the guest experience and drives bookings across digital platforms.
              </p>
            </div>

            {/* Drone & Aerial Imaging */}
            <div>
              <h3
                className="text-xl font-medium mb-4 text-[#1A1A1A] uppercase tracking-[0.1em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Drone &amp; Aerial Imaging
              </h3>
              <p className="text-base text-[#1A1A1A]/70 leading-relaxed">
                FAA-certified drone photography and aerial video for large properties, estates, and resort settings. Establishes context, scale, and landscape relationships that elevate the complete marketing package.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="bg-[#1A1A1A] text-[#F5F3F0]">
        <div className="flex flex-col md:flex-row min-h-[60vh]">
          {/* Text */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-16 py-20 md:py-24">
            <p
              className="text-xs tracking-[0.18em] uppercase text-[#8B4545] mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              About
            </p>
            <h2
              className="text-3xl md:text-4xl font-light mb-8 leading-snug"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Tim Barber,<br />Founder
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-[#F5F3F0]/80" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <p>
                I believe every space has a story waiting to be told — my job is to reveal that narrative through clean, intentional architectural photography and video.
              </p>
              <p>
                Based in Telluride, and happy to travel wherever your project takes us. I partner with architects, designers, realtors and builders to craft images that honor their vision.
              </p>
              <p>
                I'm grateful for the opportunity to bring clarity, light and purpose to every frame — and to help your work shine for years to come.
              </p>
            </div>
          </div>
          {/* Portrait */}
          <div className="w-full md:w-1/2 min-h-[30vh] md:min-h-0 relative">
            <img
              src="/images/Tim.avif"
              alt="Tim Barber, founder of Red Mountain Photography — Telluride architectural photographer"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* ── Magazine stack ── */}
      <div style={{ overflowAnchor: 'none' }}>
        {projects.map((project, index) => {
          const isOpen = project.id === expandedId;
          return (
            <React.Fragment key={project.id}>

              {/* Sticky title bar */}
              <div
                data-project-id={project.id}
                className="sticky bg-white border-b border-black/10 cursor-pointer group transition-colors duration-150 hover:bg-[#f9f8f6]"
                style={{
                  top: `${index * BAR_HEIGHT}px`,
                  height: `${BAR_HEIGHT}px`,
                  zIndex: expandedIndex >= 0 && index > expandedIndex ? 40 : 50,
                }}
                onClick={() => toggle(project.id)}
              >
                <div className="flex items-center justify-between h-full px-10">
                  <span
                    className="text-sm font-medium tracking-[0.22em] uppercase text-[#1A1A1A]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {project.title}
                  </span>
                  <div
                    className="flex items-center gap-8 text-xs tracking-[0.15em] uppercase text-[#1A1A1A]/45"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <span className="hidden sm:inline">({project.year})</span>
                    <span className="hidden sm:inline">{project.category}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-[#8B4545] inline-block"
                    >
                      →
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Expandable panel — in document flow, pushes content down */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    ref={panelRef}
                    key="panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden bg-white border-b border-black/10"
                    style={{ position: 'relative', zIndex: 49 }}
                  >
                    <div className="px-10 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl">
                      <div className="md:col-span-2">
                        <p
                          className="text-xs tracking-[0.15em] uppercase text-[#8B4545] mb-4"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {project.location} · {project.year}
                        </p>
                        <p
                          className="text-base text-[#1A1A1A] leading-relaxed mb-6"
                          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem' }}
                        >
                          {project.description}
                        </p>
                        <p
                          className="text-sm text-[#1A1A1A]/60 leading-relaxed"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {project.details}
                        </p>
                      </div>
                      <div className="flex flex-col gap-8">
                        <div>
                          <p className="text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A]/40 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Services</p>
                          <ul className="space-y-1">
                            {project.services.map(s => (
                              <li key={s} className="text-sm text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A]/40 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Deliverables</p>
                          <ul className="space-y-1">
                            {project.deliverables.map(d => (
                              <li key={d} className="text-sm text-[#1A1A1A]/70" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>— {d}</li>
                            ))}
                          </ul>
                        </div>
                        <button className="mt-auto self-start inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#8B4545] border-b border-[#8B4545] pb-0.5 hover:opacity-60 transition-opacity" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          View Full Project →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Full-bleed image */}
              <div className="w-full h-screen">
                <img
                  src={project.src}
                  alt={`${project.title} - ${project.category} located in ${project.location}. Professional architectural and real estate photography by Red Mountain Photography`}
                  className="w-full h-full object-cover"
                />
              </div>

            </React.Fragment>
          );
        })}
      </div>

      {/* ── FAQ ── */}
      <section className="bg-[#F5F3F0] py-24 px-10 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-light mb-16 text-[#1A1A1A]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div>
              <h3
                className="text-lg font-medium mb-3 text-[#1A1A1A] uppercase tracking-[0.1em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                What's your turnaround time for project deliverables?
              </h3>
              <p className="text-base text-[#1A1A1A]/70 leading-relaxed">
                Most projects are delivered within 2-3 weeks of the shoot date. Expedited delivery (7-10 days) is available for rush listings and time-sensitive projects. We discuss timeline expectations during the initial consultation.
              </p>
            </div>
            <div>
              <h3
                className="text-lg font-medium mb-3 text-[#1A1A1A] uppercase tracking-[0.1em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Do you offer drone photography for every project?
              </h3>
              <p className="text-base text-[#1A1A1A]/70 leading-relaxed">
                Drone imagery adds significant value to most projects, especially for properties with acreage or dramatic settings. We assess each location for optimal drone angles and include aerial coverage in our comprehensive packages. Weather and local airspace restrictions may apply.
              </p>
            </div>
            <div>
              <h3
                className="text-lg font-medium mb-3 text-[#1A1A1A] uppercase tracking-[0.1em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                How do you handle image licensing and usage rights?
              </h3>
              <p className="text-base text-[#1A1A1A]/70 leading-relaxed">
                All deliverables include a perpetual, non-exclusive license for marketing and promotional use. Clients may use images for MLS listings, broker marketing, print materials, and websites. We retain the right to use images in our portfolio and for case studies (with your permission).
              </p>
            </div>
            <div>
              <h3
                className="text-lg font-medium mb-3 text-[#1A1A1A] uppercase tracking-[0.1em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                What if I'm not satisfied with the initial selects?
              </h3>
              <p className="text-base text-[#1A1A1A]/70 leading-relaxed">
                We collaborate closely with clients throughout the shoot and post-production. If you'd like to reshoot specific areas or have feedback on the selects, we schedule a revision session to ensure you're completely satisfied before final delivery.
              </p>
            </div>
            <div>
              <h3
                className="text-lg font-medium mb-3 text-[#1A1A1A] uppercase tracking-[0.1em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Do you work outside the Colorado high country?
              </h3>
              <p className="text-base text-[#1A1A1A]/70 leading-relaxed">
                While we're based in Telluride and specialize in mountain and resort properties, we do accept select projects in nearby markets. We're happy to discuss travel arrangements and location-specific pricing for out-of-area work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Blog / Resources ── */}
      <section className="bg-[#F5F3F0] py-24 px-10 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-light mb-4 text-[#1A1A1A]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Photography Resources
          </h2>
          <p className="text-base text-[#1A1A1A]/60 mb-16 max-w-2xl">
            Tips, insights, and best practices for real estate marketing and architectural photography in the Colorado high country.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Blog Card 1 */}
            <article className="bg-white p-6 border border-black/5">
              <p className="text-xs text-[#8B4545] uppercase tracking-[0.15em] mb-2">Guide</p>
              <h3 className="text-lg font-medium text-[#1A1A1A] mb-3">
                The Golden Hour: Capturing Mountain Light in Real Estate Photography
              </h3>
              <p className="text-sm text-[#1A1A1A]/60 mb-4 line-clamp-3">
                Why timing matters when shooting luxury properties. We explore how to maximize natural light for breathtaking aerial and interior imagery.
              </p>
              <button className="text-xs text-[#8B4545] uppercase tracking-[0.15em] hover:opacity-60 transition-opacity">
                Read more →
              </button>
            </article>

            {/* Blog Card 2 */}
            <article className="bg-white p-6 border border-black/5">
              <p className="text-xs text-[#8B4545] uppercase tracking-[0.15em] mb-2">Strategy</p>
              <h3 className="text-lg font-medium text-[#1A1A1A] mb-3">
                Drone Photography: When to Use Aerial Shots in Luxury Marketing
              </h3>
              <p className="text-sm text-[#1A1A1A]/60 mb-4 line-clamp-3">
                Best practices for incorporating aerial imagery into your listing package. Learn how drone photography increases buyer engagement and speeds sales.
              </p>
              <button className="text-xs text-[#8B4545] uppercase tracking-[0.15em] hover:opacity-60 transition-opacity">
                Read more →
              </button>
            </article>

            {/* Blog Card 3 */}
            <article className="bg-white p-6 border border-black/5">
              <p className="text-xs text-[#8B4545] uppercase tracking-[0.15em] mb-2">Insight</p>
              <h3 className="text-lg font-medium text-[#1A1A1A] mb-3">
                Material &amp; Craft: Highlighting Quality in Architectural Photography
              </h3>
              <p className="text-sm text-[#1A1A1A]/60 mb-4 line-clamp-3">
                How close-up and detail photography showcases the precision of custom stonework, millwork, and finishing. Perfect for design portfolios and press.
              </p>
              <button className="text-xs text-[#8B4545] uppercase tracking-[0.15em] hover:opacity-60 transition-opacity">
                Read more →
              </button>
            </article>

            {/* Blog Card 4 */}
            <article className="bg-white p-6 border border-black/5">
              <p className="text-xs text-[#8B4545] uppercase tracking-[0.15em] mb-2">Trend</p>
              <h3 className="text-lg font-medium text-[#1A1A1A] mb-3">
                The Rise of Cinematic Video in Real Estate Marketing
              </h3>
              <p className="text-sm text-[#1A1A1A]/60 mb-4 line-clamp-3">
                Short-form and long-form video content is now essential for luxury listings. Explore how motion captures lifestyle and drives buyer interest faster.
              </p>
              <button className="text-xs text-[#8B4545] uppercase tracking-[0.15em] hover:opacity-60 transition-opacity">
                Read more →
              </button>
            </article>

            {/* Blog Card 5 */}
            <article className="bg-white p-6 border border-black/5">
              <p className="text-xs text-[#8B4545] uppercase tracking-[0.15em] mb-2">Case Study</p>
              <h3 className="text-lg font-medium text-[#1A1A1A] mb-3">
                Comprehensive Photography Packages: What's Included &amp; Why
              </h3>
              <p className="text-sm text-[#1A1A1A]/60 mb-4 line-clamp-3">
                A breakdown of our full-service approach: interior, exterior, drone, and video coverage. See how each component contributes to successful sales outcomes.
              </p>
              <button className="text-xs text-[#8B4545] uppercase tracking-[0.15em] hover:opacity-60 transition-opacity">
                Read more →
              </button>
            </article>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-white py-24 px-10 md:px-16 border-b border-black/10">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-light mb-16 text-[#1A1A1A] text-center"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Trusted by Brokers, Architects &amp; Developers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Testimonial 1 */}
            <div className="border-l-2 border-[#8B4545] pl-6">
              <p
                className="text-sm italic text-[#1A1A1A]/80 mb-4 leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                "The photography was a game-changer for the listing. We had multiple offers within the first week, and the agent specifically credited Red Mountain's imagery as a key differentiator."
              </p>
              <p className="text-xs font-medium text-[#1A1A1A] uppercase tracking-[0.1em]">
                Real Estate Broker, Telluride
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="border-l-2 border-[#8B4545] pl-6">
              <p
                className="text-sm italic text-[#1A1A1A]/80 mb-4 leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                "Working with Red Mountain elevated our portfolio. Their images captured the detail and craftsmanship of our work in ways that helped us win two regional design awards."
              </p>
              <p className="text-xs font-medium text-[#1A1A1A] uppercase tracking-[0.1em]">
                Design-Build Firm, Colorado
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="border-l-2 border-[#8B4545] pl-6">
              <p
                className="text-sm italic text-[#1A1A1A]/80 mb-4 leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                "The aerial coverage was exactly what we needed—it provided context and scale that our MLS photos couldn't. The drone work was professional and added genuine value to the marketing package."
              </p>
              <p className="text-xs font-medium text-[#1A1A1A] uppercase tracking-[0.1em]">
                Luxury Property Developer, Mountain Village
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1A1A1A] text-[#F5F3F0] py-32 px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-6xl font-light mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Discover Our Work
          </h2>
          <p
            className="text-base text-[#F5F3F0]/60 mb-12 max-w-lg mx-auto leading-relaxed"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Discover the complete Red Mountain photography collection.
            Each series showcases a unique perspective on wilderness and light.
          </p>
          <button
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#8B4545] text-white text-xs tracking-[0.2em] uppercase hover:bg-[#F5F3F0] hover:text-[#1A1A1A] transition-colors duration-300"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            View Full Portfolio <span>→</span>
          </button>
        </div>
      </section>

    </div>
  );
};

export default RedMountainMagazineStack;
