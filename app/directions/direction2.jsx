'use client'

export default function Direction2({ projects }) {
  return (
    <div className="min-h-screen" style={{ background: '#F5F0E1', backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,.03) 2px, rgba(0,0,0,.03) 4px)' }}>
      <div className="text-gray-800">
        {/* Hero */}
        <div className="relative pt-20 pb-32">
          <div className="max-w-5xl mx-auto px-8">
            <div className="mb-2 text-sm tracking-widest uppercase text-gray-600">Telluride, Colorado</div>
            <h1 className="font-playfair text-6xl font-bold mb-8" style={{ color: '#3C3733' }}>Red Mountain Photos</h1>
            <div className="w-16 h-1" style={{ backgroundColor: '#C67B5C' }} className="mb-8"></div>
            <p className="text-lg max-w-2xl leading-relaxed" style={{ color: '#6B6B65' }}>
              Artisanal luxury photography for high-end properties and architectural projects. We capture the warmth and character of each space with intention and care.
            </p>
            <button className="mt-8 px-8 py-3 text-white transition-opacity hover:opacity-90" style={{ backgroundColor: '#C67B5C' }}>
              Get In Touch
            </button>
          </div>
        </div>

        {/* Projects Grid - Asymmetric */}
        <div className="max-w-6xl mx-auto px-8 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((project, idx) => (
              <div key={project.id} className="fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="mb-6 p-4" style={{ backgroundColor: 'rgba(198, 123, 92, 0.08)', borderRadius: '2px' }}>
                  <h3 className="project-name text-2xl mb-3" style={{ color: '#3C3733' }}>{project.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span>{project.year}</span>
                    <span className="uppercase font-semibold" style={{ color: '#C67B5C' }}>{project.category}</span>
                    <span>{project.location}</span>
                  </div>
                </div>
                <div className="image-container" style={{ borderRadius: '2px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t" style={{ borderColor: '#D4C4A8' }}>
          <div className="max-w-5xl mx-auto px-8 py-16">
            <div className="grid grid-cols-3 gap-8 mb-12">
              <div>
                <p className="text-xs uppercase tracking-wider mb-4" style={{ color: '#9B9B8F' }}>Contact</p>
                <p className="font-playfair text-2xl mb-4" style={{ color: '#3C3733' }}>Red Mountain</p>
                <p style={{ color: '#9B9B8F' }}>Telluride, Colorado</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider mb-4" style={{ color: '#9B9B8F' }}>Services</p>
                <ul className="space-y-2">
                  <li><a href="#" style={{ color: '#3C3733' }} className="hover:opacity-70 transition-opacity">Real Estate Photography</a></li>
                  <li><a href="#" style={{ color: '#3C3733' }} className="hover:opacity-70 transition-opacity">Architectural Video</a></li>
                  <li><a href="#" style={{ color: '#3C3733' }} className="hover:opacity-70 transition-opacity">Commercial Imagery</a></li>
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider mb-4" style={{ color: '#9B9B8F' }}>Follow</p>
                <ul className="space-y-2">
                  <li><a href="#" style={{ color: '#3C3733' }} className="hover:opacity-70 transition-opacity">Instagram</a></li>
                  <li><a href="#" style={{ color: '#3C3733' }} className="hover:opacity-70 transition-opacity">Vimeo</a></li>
                  <li><a href="#" style={{ color: '#3C3733' }} className="hover:opacity-70 transition-opacity">LinkedIn</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t pt-8 flex justify-between items-center text-sm" style={{ borderColor: '#D4C4A8', color: '#9B9B8F' }}>
              <p>&copy; 2024 Red Mountain Photos.</p>
              <a href="mailto:info@redmountainphotos.com" className="hover:opacity-70 transition-opacity">
                info@redmountainphotos.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
