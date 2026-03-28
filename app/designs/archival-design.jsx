'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SceneBackground from '../components/SceneBackground'

gsap.registerPlugin(ScrollTrigger)

export default function ArchivalDesign({ projects }) {
  const sectionsRef = useRef([])
  const imagesRef = useRef([])

  useEffect(() => {
    // Add parallax to images
    imagesRef.current.forEach((img, idx) => {
      if (!img) return
      gsap.to(img, {
        scrollTrigger: {
          trigger: img.closest('section'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          markers: false,
          onUpdate: (self) => {
            // Parallax depth effect: images move slower than scroll
            gsap.set(img, { y: self.getVelocity() * 0.5 })
          }
        }
      })
    })

    // Fade in sections
    sectionsRef.current.forEach((section, idx) => {
      if (!section) return
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          scrub: false,
          markers: false
        },
        opacity: 0.6,
        y: 30,
        duration: 0.6
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="text-black overflow-x-hidden relative" style={{ backgroundColor: '#F5F3F0', cursor: 'crosshair' }}>
      {/* Three.js background */}
      <SceneBackground />

      {/* System Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b px-[2.5vw] py-[1.5vh]" style={{ backgroundColor: 'rgba(245, 243, 240, 0.95)', borderColor: 'rgba(26, 26, 26, 0.12)' }}>
        <div className="flex items-center gap-[4vw]">
          <span className="text-[9px] uppercase tracking-[0.15em] font-medium">Red Mountain</span>
          <div className="flex-1 h-px bg-black/20"></div>
          <a href="#" className="text-[9px] uppercase tracking-[0.15em] hover:text-[#8B4545] transition-colors">Archives</a>
          <a href="#" className="text-[9px] uppercase tracking-[0.15em] hover:text-[#8B4545] transition-colors">Index</a>
          <a href="#" className="text-[9px] uppercase tracking-[0.15em] hover:text-[#8B4545] transition-colors">Info</a>
        </div>
      </header>

      {/* System Footer */}
      <footer className="fixed bottom-[2.5vw] left-[2.5vw] right-[2.5vw] z-50 flex justify-between pointer-events-none text-white" style={{ mixBlendMode: 'difference' }}>
        <div className="space-y-1">
          <div className="text-[9px] uppercase tracking-[0.1em]">SYS.REF: RM-2024</div>
          <div className="text-[9px] uppercase tracking-[0.1em]">EST: TELLURIDE, CO</div>
        </div>
        <div className="text-right space-y-1">
          <div className="text-[9px] uppercase tracking-[0.1em]">SCROLL TO ADVANCE</div>
          <div className="text-[9px] uppercase tracking-[0.1em]">© MMXXIV</div>
        </div>
      </footer>

      {/* Main Content */}
      <main className="relative w-full" style={{ scrollbarWidth: 'none' }}>
        {/* Hero Section */}
        <section ref={el => sectionsRef.current[0] = el} className="h-screen w-screen flex flex-shrink-0 relative z-10">
          <div className="w-1/2 pt-[15vh] pl-[8vw] pr-[2.5vw] pb-[2.5vw] flex flex-col justify-center bg-white/95 backdrop-blur-sm">
            <div className="relative">
              <h1 
                className="leading-[0.85] text-black"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(6rem, 10vw, 12rem)',
                  fontWeight: 400,
                  marginLeft: '-0.5vw',
                  letterSpacing: '-0.03em'
                }}
              >
                Red<br />Mountain
              </h1>
              <div 
                className="mt-[1vh] pl-[2vw] text-gray-600"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.5rem, 3vw, 3rem)',
                  fontStyle: 'italic',
                  fontWeight: 300
                }}
              >
                Architectural Archives
              </div>
            </div>

            <div className="mt-[8vh] max-w-[240px] text-[10px] leading-[1.6] text-black">
              Documenting the intersection of architectural intervention and natural landscape. A curated survey of residential and commercial projects across mountain environments.
            </div>

            <div className="mt-[4vh] space-y-2 text-[9px] uppercase tracking-[0.1em]">
              <div className="grid grid-cols-[80px_1fr] gap-4">
                <span className="opacity-50">Status</span>
                <span>Ongoing Archive</span>
              </div>
              <div className="grid grid-cols-[80px_1fr] gap-4">
                <span className="opacity-50">Medium</span>
                <span>Photography & Drone</span>
              </div>
            </div>
          </div>

          <div className="w-1/2 relative p-[2.5vw] bg-gray-50 overflow-hidden">
            <img
              ref={el => imagesRef.current[0] = el}
              src={projects[0].image}
              alt={projects[0].name}
              className="w-full h-full object-cover"
              style={{ filter: 'contrast(1.1) brightness(1.05)' }}
            />
            <div className="absolute bottom-[2.5vw] right-[2.5vw] bg-white/90 backdrop-blur-sm px-2 py-1 text-[9px] uppercase tracking-[0.1em]">
              FIG 1.
            </div>
          </div>

          <div className="section-number absolute text-[1rem] opacity-40 top-[2.5vw] left-[2.5vw]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>01</div>
        </section>

        {/* Project Sections */}
        {projects.slice(1).map((project, idx) => (
          <section
            key={project.id}
            ref={el => sectionsRef.current[idx + 1] = el}
            className="h-screen w-screen flex flex-shrink-0 relative z-10"
            style={{
              backgroundColor: idx % 2 === 0 ? '#F8F8F8' : '#FFFFFF'
            }}
          >
            {idx % 2 === 0 ? (
              <>
                <div className="w-[55%] relative flex items-center justify-center p-[2.5vw] overflow-hidden">
                  <img
                    ref={el => imagesRef.current[idx + 1] = el}
                    src={project.image}
                    alt={project.name}
                    className="w-4/5 h-3/4 object-cover"
                    style={{ filter: 'contrast(1.15) brightness(1.05)' }}
                  />
                </div>
                <div className="w-[45%] p-[2.5vw] flex flex-col justify-between border-l border-black/15 bg-white/95 backdrop-blur-sm">
                  <div className="mt-[15vh]">
                    <h2 
                      className="text-black leading-[0.9]"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 'clamp(4rem, 6vw, 8rem)',
                        fontWeight: 400,
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {project.name}
                    </h2>
                    <div 
                      className="mt-[2vh] text-gray-600"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 'clamp(1.5rem, 2vw, 2.5rem)',
                        fontStyle: 'italic'
                      }}
                    >
                      {project.year}
                    </div>
                  </div>

                  <div className="mb-[10vh] border-t border-black/15 pt-[2vh] grid grid-cols-2 gap-[2vw] text-[9px] uppercase tracking-[0.1em]">
                    <div className="space-y-1">
                      {Object.entries(project.details).slice(0, 3).map(([key, val], i) => (
                        <div key={i} className="grid grid-cols-[80px_1fr] gap-4">
                          <span className="opacity-50">{key}</span>
                          <span>{val}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-1">
                      {Object.entries(project.details).slice(3).map(([key, val], i) => (
                        <div key={i} className="grid grid-cols-[80px_1fr] gap-4">
                          <span className="opacity-50">{key}</span>
                          <span>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-[45%] p-[2.5vw] flex flex-col justify-between border-r border-black/15 bg-white/95 backdrop-blur-sm">
                  <div className="mt-[15vh]">
                    <h2 
                      className="text-black leading-[0.9]"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 'clamp(4rem, 6vw, 8rem)',
                        fontWeight: 400,
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {project.name}
                    </h2>
                    <div 
                      className="mt-[2vh] text-gray-600"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 'clamp(1.5rem, 2vw, 2.5rem)',
                        fontStyle: 'italic'
                      }}
                    >
                      {project.year}
                    </div>
                  </div>

                  <div className="mb-[10vh] border-t border-black/15 pt-[2vh] grid grid-cols-2 gap-[2vw] text-[9px] uppercase tracking-[0.1em]">
                    <div className="space-y-1">
                      {Object.entries(project.details).slice(0, 3).map(([key, val], i) => (
                        <div key={i} className="grid grid-cols-[80px_1fr] gap-4">
                          <span className="opacity-50">{key}</span>
                          <span>{val}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-1">
                      {Object.entries(project.details).slice(3).map(([key, val], i) => (
                        <div key={i} className="grid grid-cols-[80px_1fr] gap-4">
                          <span className="opacity-50">{key}</span>
                          <span>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-[55%] relative flex items-center justify-center p-[2.5vw] overflow-hidden">
                  <img
                    ref={el => imagesRef.current[idx + 1] = el}
                    src={project.image}
                    alt={project.name}
                    className="w-4/5 h-3/4 object-cover"
                    style={{ filter: 'contrast(1.15) brightness(1.05)' }}
                  />
                </div>
              </>
            )}

            <div
              className="section-number absolute text-[1rem] opacity-40" 
              style={{ 
                fontFamily: "'Cormorant Garamond', serif",
                top: 'calc(2.5vw + 50px)',
                left: '2.5vw'
              }}
            >
              {String(idx + 2).padStart(2, '0')}
            </div>
          </section>
        ))}
      </main>

      <style jsx>{`
        main::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
