'use client'

import { useState } from 'react'

export default function Direction1({ projects }) {
  const [hoveredProject, setHoveredProject] = useState(null)

  return (
    <div className="bg-rmp-cream text-rmp-charcoal min-h-screen">
      {/* Hero/Sticky Branding Section */}
      <div className="fixed bottom-0 left-0 z-10 pointer-events-none">
        <div className="pl-8 pb-8">
          <h1 className="font-playfair text-6xl font-bold tracking-tight">Red Mountain</h1>
          <p className="font-playfair text-3xl font-light tracking-wide">PHOTOS</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-8 py-20">
        {/* Header */}
        <div className="mb-32">
          <p className="text-sm tracking-widest uppercase text-rmp-gray mb-6">Telluride, Colorado</p>
          <h2 className="font-playfair text-5xl mb-6">Luxury Real Estate &amp; Architectural Photography</h2>
          <p className="text-lg text-rmp-gray max-w-2xl leading-relaxed">
            Premium visual services for high-end properties, architectural projects, and design-focused developments. Capturing the essence of luxury spaces through editorial-quality imagery and video.
          </p>
          <div className="mt-8 flex gap-4">
            <button className="px-8 py-3 bg-rmp-red text-white hover:opacity-90 transition-opacity">
              Get In Touch
            </button>
            <button className="px-8 py-3 border border-rmp-charcoal hover:bg-rmp-charcoal hover:text-rmp-cream transition-colors">
              View Portfolio
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-20">
          {projects.map((project, index) => (
            <div key={project.id} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Project Header */}
              <div className="mb-6 border-t border-rmp-divider pt-6 flex items-center justify-between group cursor-pointer">
                <div className="flex-1">
                  <h3 className="project-name text-3xl mb-2">{project.name}</h3>
                  <div className="flex items-center gap-4 text-sm tracking-wide">
                    <span className="text-rmp-gray">({project.year})</span>
                    <span className="uppercase font-semibold">{project.category}</span>
                    <span className="text-rmp-gray">|</span>
                    <span className="uppercase text-rmp-gray">{project.location}</span>
                  </div>
                </div>
                <div className="text-3xl text-rmp-red opacity-0 group-hover:opacity-100 transition-opacity">→</div>
              </div>

              {/* Project Image */}
              <div 
                className="image-container bg-gray-200 overflow-hidden rounded-sm group hover:opacity-95 transition-opacity"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="mt-32 pt-12 border-t border-rmp-divider">
          <div className="grid grid-cols-3 gap-8 mb-16">
            <div>
              <p className="text-xs uppercase tracking-wider text-rmp-gray mb-4">Contact</p>
              <p className="font-playfair text-2xl mb-4">Red Mountain Photos</p>
              <p className="text-rmp-gray">Telluride, Colorado</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-rmp-gray mb-4">Services</p>
              <ul className="space-y-2 text-rmp-charcoal">
                <li><a href="#" className="hover:text-rmp-red transition-colors">Real Estate Photography</a></li>
                <li><a href="#" className="hover:text-rmp-red transition-colors">Architectural Video</a></li>
                <li><a href="#" className="hover:text-rmp-red transition-colors">Commercial Imagery</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-rmp-gray mb-4">Follow</p>
              <ul className="space-y-2 text-rmp-charcoal">
                <li><a href="#" className="hover:text-rmp-red transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-rmp-red transition-colors">Vimeo</a></li>
                <li><a href="#" className="hover:text-rmp-red transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-rmp-divider pt-8 flex justify-between items-center text-sm text-rmp-gray">
            <p>&copy; 2024 Red Mountain Photos. All rights reserved.</p>
            <a href="mailto:info@redmountainphotos.com" className="hover:text-rmp-red transition-colors">
              info@redmountainphotos.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
