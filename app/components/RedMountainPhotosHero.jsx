'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-8 py-6">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-white hover:text-[#8B4545] transition-colors mix-blend-difference"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="text-xs font-medium tracking-[0.3em] text-white mix-blend-difference" style={{ fontFamily: "'Inter', sans-serif" }}>
          EST. 2024
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed inset-0 bg-[#1A1A1A] flex items-center justify-center"
        >
          <div className="text-center space-y-8">
            {['Portfolio', 'About', 'Services', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                href={`#${item.toLowerCase()}`}
                className="block text-5xl md:text-7xl font-bold text-[#F5F3F0] hover:text-[#8B4545] transition-colors"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

// Main Hero Component
const RedMountainPhotosHero = ({ featuredImages }) => {
  // Use provided images or defaults
  const heroImage = featuredImages?.[0] || '/images/actual/DJI_0408.jpg';
  const portfolioImages = featuredImages?.slice(1, 5) || [
    '/images/actual/544A8777.jpg',
    '/images/actual/544A8388.jpg',
    '/images/actual/544A1449.jpg',
    '/images/actual/544A1850.jpg',
  ];

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&display=swap');
      `}</style>

      <Navigation />

      {/* Editorial Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Left Side - Typography & Content */}
        <div className="relative z-20 w-full lg:w-2/5 px-8 md:px-16 lg:px-24 py-24 lg:pr-0">
          {/* Accent Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-24 h-1 bg-[#8B4545] mb-12 origin-left"
          />

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-7xl md:text-8xl lg:text-9xl xl:text-[140px] font-bold leading-[0.9] mb-8 text-[#1A1A1A]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 900 }}
          >
            Red
            <br />
            Mountain
            <span className="block text-[#8B4545] italic mt-4">Photos</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-[#1A1A1A]/70 mb-12 max-w-md leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Editorial photography capturing raw wilderness and untamed landscapes. Where nature meets artistry.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <button className="group relative px-8 py-4 bg-[#8B4545] text-white font-semibold text-sm tracking-wider overflow-hidden transition-all hover:bg-[#1A1A1A]" style={{ fontFamily: "'Inter', sans-serif" }}>
              <span className="relative z-10 flex items-center justify-center gap-2">
                VIEW PORTFOLIO
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
            <button className="px-8 py-4 border-2 border-[#1A1A1A] text-[#1A1A1A] font-semibold text-sm tracking-wider hover:bg-[#1A1A1A] hover:text-white transition-all" style={{ fontFamily: "'Inter', sans-serif" }}>
              GET IN TOUCH
            </button>
          </motion.div>

          {/* Year + Stats Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-24 left-8 md:left-16 lg:left-24 text-[#1A1A1A]/30 font-bold text-[180px] md:text-[240px] leading-none pointer-events-none select-none"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            24
          </motion.div>
        </div>

        {/* Right Side - Full Bleed Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="hidden lg:block absolute inset-y-0 right-0 w-3/5"
        >
          <div className="relative h-full w-full overflow-hidden">
            <img
              src={heroImage}
              alt="Red Mountain Photography"
              className="h-full w-full object-cover"
            />
            {/* Red Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B4545]/20 via-transparent to-transparent mix-blend-multiply" />
            {/* Dark Edge Vignette */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#F5F3F0] lg:to-transparent" />
          </div>

          {/* Overlapping Text Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="hidden lg:block absolute bottom-12 right-12 bg-white/95 backdrop-blur-sm px-8 py-6 shadow-2xl max-w-sm"
          >
            <p className="text-sm font-medium tracking-wider text-[#8B4545] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
              FEATURED PROJECT
            </p>
            <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Mountain Landscapes
            </h3>
            <p className="text-sm text-[#1A1A1A]/60" style={{ fontFamily: "'Inter', sans-serif" }}>
              Capturing the untamed beauty of Colorado's peaks
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#1A1A1A]/50"
        >
          <span className="text-xs tracking-widest rotate-90" style={{ fontFamily: "'Inter', sans-serif" }}>SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[1px] h-12 bg-[#1A1A1A]/30"
          />
        </motion.div>
      </section>

      {/* Featured Work Section */}
      <section className="bg-[#1A1A1A] text-[#F5F3F0] py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Featured
              <br />
              <span className="text-[#8B4545]">Work</span>
            </motion.h2>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 md:mt-0 group flex items-center gap-2 text-sm tracking-wider text-[#F5F3F0] hover:text-[#8B4545] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              VIEW ALL PROJECTS
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative overflow-hidden aspect-[3/4] cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Portfolio work ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B4545] via-[#8B4545]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Project {index + 1}
                  </h3>
                  <p className="text-sm tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Architectural & Landscape
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RedMountainPhotosHero;
