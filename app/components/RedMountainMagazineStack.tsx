'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import posts from '../blog/posts';

const resourcePosts = posts.slice(0, 3);

const faqs = [
  {
    q: "What's your turnaround time for project deliverables?",
    a: 'Most projects are delivered within 2-3 weeks of the shoot date. Expedited delivery (7-10 days) is available for rush listings and time-sensitive projects. We discuss timeline expectations during the initial consultation.',
  },
  {
    q: 'How is pricing structured?',
    a: 'Every property and project is different, so we quote each one individually based on the scope: square footage, number of finished images, video, drone coverage, and travel. Tell us about your project through the contact form and we will send a detailed quote, usually within 24 hours.',
  },
  {
    q: 'Do you travel for projects?',
    a: 'Yes, gladly, and we would like to do more of it. Telluride is home base and we know the San Juans intimately, but we regularly travel for architectural, resort, and residential work and we are always glad to shoot somewhere new. Travel is folded into the quote and is usually a small fraction of a project budget. Tell us where the property is and we will tell you what it takes to get there.',
  },
  {
    q: 'Do you offer drone photography for every project?',
    a: 'Drone imagery adds significant value to most projects, especially for properties with acreage or dramatic settings. We assess each location for optimal drone angles and include aerial coverage in our comprehensive packages. Weather and local airspace restrictions may apply.',
  },
  {
    q: 'How do you handle image licensing and usage rights?',
    a: 'All deliverables include a perpetual, non-exclusive license for marketing and promotional use. Clients may use images for MLS listings, broker marketing, print materials, and websites. We retain the right to use images in our portfolio and for case studies (with your permission).',
  },
  {
    q: "What if I'm not satisfied with the initial selects?",
    a: 'We collaborate closely with clients throughout the shoot and post-production. If you would like to reshoot specific areas or have feedback on the selects, we schedule a revision session to ensure you are completely satisfied before final delivery.',
  },
];

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
    src: '/images/actual/544A1449.jpg',
    title: 'Ironwood Estates',
    category: 'Interior Design',
    year: '2021',
    location: 'Telluride, CO',
    services: ['Real Estate Photography', 'Property Marketing'],
    description: 'A luxury residential listing shoot for a boutique vacation rental company in Telluride. The property\'s character lives in its relationship to the surrounding pine forest, and the photography was designed to communicate that connection throughout.',
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
      <section className="md:min-h-[calc(100vh-64px)] flex flex-col md:flex-row relative overflow-hidden">
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
            <a
              href="#work"
              className="self-start sm:self-auto inline-flex items-center gap-3 px-7 py-3 border border-[#1A1A1A] text-[#1A1A1A] text-[10px] tracking-[0.2em] uppercase hover:bg-[#1A1A1A] hover:text-white transition-colors duration-300"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              View Work <span>→</span>
            </a>
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
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-xs tracking-[0.18em] uppercase text-[#8B4545] mb-5"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Based in Telluride · Shooting Nationwide
          </p>
          <p className="text-lg text-[#1A1A1A]/70 leading-relaxed">
            Telluride is home base, not a boundary. We know how light moves through the San Juans and we work constantly across the Colorado high country, from Mountain Village and Ouray to Aspen, Vail, and Steamboat Springs. We also travel nationwide for architects, developers, brokers, and hospitality brands who want this level of work on their project. If your property is somewhere else entirely, that is not a problem. Tell us where it is and we will get there.
          </p>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section className="bg-[#F5F3F0] py-24 px-10 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2
              className="text-4xl md:text-5xl font-light mb-6 text-[#1A1A1A]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Services
            </h2>
            <p className="text-base text-[#1A1A1A]/70 max-w-3xl mx-auto">
              Every project starts with a vision, whether it's a luxury home, a restaurant launch, or a vacation rental. Red Mountain Photography works alongside architects, developers, and brands to translate that vision into images and motion that feel authentic and purposeful.
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
                Cinematic property walkthroughs and home tour videos designed for MLS listings, broker marketing, high-end vacation rentals, and social media. Professional color grading, 3D tracking, motion design, and pacing that keeps viewers engaged.
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
                I believe every space has a story waiting to be told. My job is to reveal that narrative through clean, intentional architectural photography and video.
              </p>
              <p>
                Based in Telluride, and happy to travel wherever your project takes us. I partner with architects, designers, realtors and builders to craft images that honor their vision.
              </p>
              <p>
                I'm grateful for the opportunity to bring clarity, light and purpose to every frame, and to help your work shine for years to come.
              </p>
            </div>
          </div>
          {/* Portrait */}
          <div className="w-full md:w-1/2 min-h-[30vh] md:min-h-0 relative">
            <img
              src="/images/Tim.avif"
              alt="Tim Barber, founder of Red Mountain Photography, Telluride architectural photographer"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* ── Magazine stack ── */}
      <div id="work" style={{ overflowAnchor: 'none' }}>
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
                              <li key={d} className="text-sm text-[#1A1A1A]/70" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{d}</li>
                            ))}
                          </ul>
                        </div>
                        <Link href="/contact" className="mt-auto self-start inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#8B4545] border-b border-[#8B4545] pb-0.5 hover:opacity-60 transition-opacity" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          Start a Project Like This →
                        </Link>
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
      <section id="faq" className="bg-[#F5F3F0] py-24 px-10 md:px-16">
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
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-light mb-16 text-[#1A1A1A] text-center"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map(({ q, a }) => (
              <div key={q}>
                <h3
                  className="text-lg font-medium mb-3 text-[#1A1A1A] uppercase tracking-[0.1em]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {q}
                </h3>
                <p className="text-base text-[#1A1A1A]/70 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photography Resources ── */}
      <section className="bg-white border-t border-b border-black/10 py-24 px-10 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2
              className="text-4xl md:text-5xl font-light mb-6 text-[#1A1A1A]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Photography Resources
            </h2>
            <p className="text-base text-[#1A1A1A]/60 max-w-2xl mx-auto">
              Tips, insights, and best practices for real estate marketing and architectural photography in the Colorado high country.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {resourcePosts.map((post) => (
              <article key={post.slug} className="bg-[#F5F3F0] border border-black/5 flex flex-col">
                <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="w-full aspect-[3/2] object-cover hover:scale-[1.02] transition-transform duration-500"
                  />
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs text-[#8B4545] uppercase tracking-[0.15em] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {post.category}
                  </p>
                  <h3 className="text-lg font-medium text-[#1A1A1A] mb-3 leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    <Link href={`/blog/${post.slug}`} className="hover:text-[#8B4545] transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-[#1A1A1A]/60 mb-4 leading-relaxed">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-auto self-start text-xs text-[#8B4545] uppercase tracking-[0.15em] hover:opacity-60 transition-opacity"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 px-7 py-3 border border-[#8B4545] text-[#8B4545] text-[10px] tracking-[0.2em] uppercase hover:bg-[#8B4545] hover:text-white transition-colors duration-300"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              View All Articles <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-[#F5F3F0] py-24 px-10 md:px-16">
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
                "The aerial coverage was exactly what we needed. It provided context and scale that our MLS photos couldn't, and the drone work added genuine value to the marketing package."
              </p>
              <p className="text-xs font-medium text-[#1A1A1A] uppercase tracking-[0.1em]">
                Luxury Property Developer, Mountain Village
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default RedMountainMagazineStack;
