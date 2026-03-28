'use client'

export default function Direction3({ projects }) {
  return (
    <div className="min-h-screen" style={{ background: '#F5E6C8', backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,.02) 2px, rgba(0,0,0,.02) 4px)' }}>
      <div style={{ color: '#2C2C28' }}>
        {/* Hero */}
        <div className="relative pt-20 pb-32 border-b" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
          <div className="max-w-5xl mx-auto px-8">
            <div className="mb-4 text-sm tracking-widest uppercase" style={{ color: '#8B7B5C' }}>Telluride Archive</div>
            <h1 className="font-playfair text-6xl font-bold mb-8" style={{ color: '#2C2C28' }}>Red Mountain</h1>
            <h2 className="font-playfair text-5xl font-light mb-8" style={{ color: '#9B8B6B' }}>PHOTOGRAPHS</h2>
            <p className="text-lg max-w-2xl leading-relaxed mb-8" style={{ color: '#6B6B5C' }}>
              A curated collection of luxury real estate and architectural photography. Each frame captures the timeless elegance of mountain living and design excellence.
            </p>
            <button className="px-8 py-3 text-white transition-opacity hover:opacity-90" style={{ backgroundColor: '#C76A6A' }}>
              Inquire
            </button>
          </div>
        </div>

        {/* Projects */}
        <div className="max-w-5xl mx-auto px-8 py-32">
          <div className="space-y-24">
            {projects.map((project, idx) => (
              <div key={project.id} className="fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                {/* Polaroid-style card */}
                <div 
                  className="bg-white p-4" 
                  style={{ 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    transform: `rotate(${idx % 2 === 0 ? -1 : 1}deg)`
                  }}
                >
                  {/* Image with sepia filter */}
                  <div 
                    className="image-container bg-gray-300 mb-4 relative overflow-hidden"
                    style={{
                      filter: 'sepia(0.2) contrast(1.1) saturate(0.8)',
                    }}
                  >
                    <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Info */}
                  <div className="px-2">
                    <h3 className="font-crimson text-2xl mb-3" style={{ color: '#2C2C28' }}>{project.name}</h3>
                    <div className="space-y-1 text-sm" style={{ color: '#8B7B5C' }}>
                      <p>{project.location} · {project.year}</p>
                      <p className="uppercase tracking-wide">{project.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t mt-20" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
          <div className="max-w-5xl mx-auto px-8 py-16">
            <div className="grid grid-cols-3 gap-8 mb-12">
              <div>
                <p className="text-xs uppercase tracking-wider mb-4" style={{ color: '#8B7B5C' }}>Red Mountain</p>
                <p className="text-2xl mb-4" style={{ color: '#2C2C28' }}>Photographs</p>
                <p style={{ color: '#8B7B5C' }}>Telluride, Colorado</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider mb-4" style={{ color: '#8B7B5C' }}>Services</p>
                <ul className="space-y-2 text-sm" style={{ color: '#2C2C28' }}>
                  <li><a href="#" className="hover:opacity-70 transition-opacity">Real Estate</a></li>
                  <li><a href="#" className="hover:opacity-70 transition-opacity">Architecture</a></li>
                  <li><a href="#" className="hover:opacity-70 transition-opacity">Commercial</a></li>
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider mb-4" style={{ color: '#8B7B5C' }}>Connect</p>
                <ul className="space-y-2 text-sm" style={{ color: '#2C2C28' }}>
                  <li><a href="#" className="hover:opacity-70 transition-opacity">Instagram</a></li>
                  <li><a href="#" className="hover:opacity-70 transition-opacity">Vimeo</a></li>
                  <li><a href="mailto:info@redmountainphotos.com" className="hover:opacity-70 transition-opacity">Email</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t pt-8 flex justify-between items-center text-sm" style={{ borderColor: 'rgba(0,0,0,0.1)', color: '#8B7B5C' }}>
              <p>&copy; MMXXIV Red Mountain Photographs</p>
              <p>All images &copy; Red Mountain</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
