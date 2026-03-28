export const metadata = {
  title: 'Contact Red Mountain Photography | Telluride Real Estate & Architecture Photography',
  description: 'Get in touch with Red Mountain Photography. Based in Telluride, Colorado. Request a quote for your luxury real estate, architectural, drone, or video project.',
  canonical: 'https://redmountainphotos.com/contact'
};

export default function ContactPage() {
  return (
    <div className="bg-[#F5F3F0] min-h-screen">
      {/* Hero */}
      <section className="bg-[#1A1A1A] text-[#F5F3F0] py-24 px-10 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-6xl md:text-7xl font-light mb-6 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Get in Touch
          </h1>
          <p className="text-lg text-[#F5F3F0]/70 max-w-2xl">
            Ready to discuss your photography project? We'd love to hear from you. Fill out the form below or call us directly.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-24 px-10 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#1A1A1A] mb-2 uppercase tracking-[0.1em]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-[#1A1A1A]/20 bg-white text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:outline-none focus:border-[#8B4545] transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#1A1A1A] mb-2 uppercase tracking-[0.1em]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-[#1A1A1A]/20 bg-white text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:outline-none focus:border-[#8B4545] transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-[#1A1A1A] mb-2 uppercase tracking-[0.1em]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-[#1A1A1A]/20 bg-white text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:outline-none focus:border-[#8B4545] transition-colors"
                  placeholder="+1 (970) XXX-XXXX"
                />
              </div>

              <div>
                <label
                  htmlFor="projectType"
                  className="block text-sm font-medium text-[#1A1A1A] mb-2 uppercase tracking-[0.1em]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  className="w-full px-4 py-3 border border-[#1A1A1A]/20 bg-white text-[#1A1A1A] focus:outline-none focus:border-[#8B4545] transition-colors"
                >
                  <option value="">Select a project type...</option>
                  <option value="real-estate">Real Estate Photography</option>
                  <option value="architectural">Architectural Photography</option>
                  <option value="drone">Drone & Aerial Photography</option>
                  <option value="video">Cinematic Video</option>
                  <option value="custom">Custom Package</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#1A1A1A] mb-2 uppercase tracking-[0.1em]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  className="w-full px-4 py-3 border border-[#1A1A1A]/20 bg-white text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:outline-none focus:border-[#8B4545] transition-colors"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-[#8B4545] text-white font-medium uppercase tracking-[0.2em] text-xs hover:bg-[#1A1A1A] transition-colors duration-300"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <div className="mb-12">
              <h3
                className="text-sm font-medium text-[#1A1A1A] mb-4 uppercase tracking-[0.1em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Quick Contact
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-[#1A1A1A]/60 uppercase tracking-[0.15em] mb-1">Phone</p>
                  <p className="text-base text-[#1A1A1A]">+1 (970) XXX-XXXX</p>
                </div>
                <div>
                  <p className="text-xs text-[#1A1A1A]/60 uppercase tracking-[0.15em] mb-1">Email</p>
                  <p className="text-base text-[#1A1A1A]">info@redmountainphotos.com</p>
                </div>
                <div>
                  <p className="text-xs text-[#1A1A1A]/60 uppercase tracking-[0.15em] mb-1">Based In</p>
                  <p className="text-base text-[#1A1A1A]">Telluride, Colorado</p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h3
                className="text-sm font-medium text-[#1A1A1A] mb-4 uppercase tracking-[0.1em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Service Areas
              </h3>
              <p className="text-base text-[#1A1A1A]/70 leading-relaxed">
                Telluride · Mountain Village · Ridgway · Ouray · Silverton · Durango · Aspen
              </p>
            </div>

            <div>
              <h3
                className="text-sm font-medium text-[#1A1A1A] mb-4 uppercase tracking-[0.1em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Response Time
              </h3>
              <p className="text-base text-[#1A1A1A]/70 leading-relaxed">
                We typically respond to inquiries within 24 hours. For rush projects or urgent needs, please call us directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1A1A1A] text-[#F5F3F0] py-24 px-10 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl font-light mb-6 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Let's Create Something Remarkable
          </h2>
          <p className="text-base text-[#F5F3F0]/70 mb-8 max-w-2xl mx-auto">
            Whether you're a broker marketing luxury listings, an architect building your portfolio, or a homeowner documenting a custom build, we're ready to bring your vision to life.
          </p>
          <button
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#8B4545] text-white text-xs tracking-[0.2em] uppercase hover:bg-[#F5F3F0] hover:text-[#1A1A1A] transition-colors duration-300"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            View Our Work <span>→</span>
          </button>
        </div>
      </section>
    </div>
  );
}
