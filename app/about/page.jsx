export const metadata = {
  title: 'About Red Mountain Photography | Tim Barber | Telluride',
  description: 'Meet Tim Barber, founder of Red Mountain Photography. Learn about our approach to architectural and real estate photography in Telluride, Colorado.',
  canonical: 'https://redmountainphotos.com/about'
};

export default function AboutPage() {
  return (
    <div className="bg-[#F5F3F0]">
      {/* Hero */}
      <section className="bg-[#1A1A1A] text-[#F5F3F0] py-24 px-10 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-6xl md:text-7xl font-light mb-6 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            About Red Mountain Photography
          </h1>
          <p className="text-lg text-[#F5F3F0]/70">
            Founded by Tim Barber, Red Mountain Photography brings clarity, light, and purpose to every frame.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 px-10 md:px-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Founder Image */}
          <div className="bg-white border border-black/10 overflow-hidden">
            <img
              src="/images/Tim.avif"
              alt="Tim Barber, founder of Red Mountain Photography"
              className="w-full h-full object-cover aspect-square"
            />
          </div>

          {/* Founder Bio */}
          <div>
            <h2
              className="text-4xl md:text-5xl font-light mb-8 text-[#1A1A1A] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Tim Barber
            </h2>
            <div className="space-y-6 text-base text-[#1A1A1A]/75 leading-relaxed">
              <p>
                I believe every space has a story waiting to be told — my job is to reveal that narrative through clean, intentional architectural photography and video.
              </p>
              <p>
                Based in Telluride (and happy to travel wherever your project takes us), I partner with architects, designers, realtors and builders to craft images that honor their vision. I'm grateful for the opportunity to bring clarity, light and purpose to every frame — and to help your work shine for years to come.
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-10 flex gap-6">
              <a
                href="https://facebook.com/redmountainphotos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#8B4545] uppercase tracking-[0.15em] hover:opacity-60 transition-opacity"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Facebook
              </a>
              <a
                href="https://instagram.com/redmountainphotos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#8B4545] uppercase tracking-[0.15em] hover:opacity-60 transition-opacity"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white py-24 px-10 md:px-16 border-t border-b border-black/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2
              className="text-4xl md:text-5xl font-light mb-6 text-[#1A1A1A] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Services
            </h2>
            <p className="text-base text-[#1A1A1A]/70 max-w-3xl">
              Every project starts with a vision — whether it's a luxury home, a restaurant launch, or a vacation rental. Red Mountain Photography works alongside architects, developers, and brands to translate that vision into images and motion that feel authentic and purposeful. Below are the services that help your story stand out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Service 1 */}
            <div>
              <div className="bg-[#F5F3F0] aspect-video mb-6 border border-black/10 flex items-center justify-center">
                <div className="text-center text-[#1A1A1A]/40">
                  <p className="text-sm">Service Image</p>
                </div>
              </div>
              <h3
                className="text-2xl font-light mb-4 text-[#1A1A1A]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Luxury Real Estate &amp; Architectural Photography
              </h3>
              <p className="text-base text-[#1A1A1A]/70 leading-relaxed">
                High-end architectural and real estate photography for luxury homes, custom builds, and design-forward properties. Clean composition, intentional lighting, and meticulous post-production to showcase every detail.
              </p>
            </div>

            {/* Service 2 */}
            <div>
              <div className="bg-[#F5F3F0] aspect-video mb-6 border border-black/10 flex items-center justify-center">
                <div className="text-center text-[#1A1A1A]/40">
                  <p className="text-sm">Service Image</p>
                </div>
              </div>
              <h3
                className="text-2xl font-light mb-4 text-[#1A1A1A]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Property Home Tour Videos
              </h3>
              <p className="text-base text-[#1A1A1A]/70 leading-relaxed">
                Cinematic property walkthroughs and home tour videos designed for MLS listings, broker marketing, and social media. Professional color grading, motion design, and pacing that keeps viewers engaged.
              </p>
            </div>

            {/* Service 3 */}
            <div>
              <div className="bg-[#F5F3F0] aspect-video mb-6 border border-black/10 flex items-center justify-center">
                <div className="text-center text-[#1A1A1A]/40">
                  <p className="text-sm">Service Image</p>
                </div>
              </div>
              <h3
                className="text-2xl font-light mb-4 text-[#1A1A1A]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Hospitality &amp; Vacation Rentals
              </h3>
              <p className="text-base text-[#1A1A1A]/70 leading-relaxed">
                Professional photography and video for hotels, resorts, vacation rentals, and hospitality brands. Lifestyle imagery that captures the guest experience and drives bookings across digital platforms.
              </p>
            </div>

            {/* Service 4 */}
            <div>
              <div className="bg-[#F5F3F0] aspect-video mb-6 border border-black/10 flex items-center justify-center">
                <div className="text-center text-[#1A1A1A]/40">
                  <p className="text-sm">Service Image</p>
                </div>
              </div>
              <h3
                className="text-2xl font-light mb-4 text-[#1A1A1A]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
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

      {/* Process Section */}
      <section className="py-24 px-10 md:px-16 bg-[#F5F3F0]">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-light mb-16 text-[#1A1A1A]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            How We Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3
                className="text-lg font-medium mb-4 text-[#1A1A1A] uppercase tracking-[0.1em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                01. Discover
              </h3>
              <p className="text-base text-[#1A1A1A]/70 leading-relaxed">
                We start by listening — understanding your vision, your goals, and the story you want to tell about your space or project.
              </p>
            </div>
            <div>
              <h3
                className="text-lg font-medium mb-4 text-[#1A1A1A] uppercase tracking-[0.1em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                02. Execute
              </h3>
              <p className="text-base text-[#1A1A1A]/70 leading-relaxed">
                We shoot with intentionality — careful composition, strategic lighting, and attention to every detail to capture the essence of your project.
              </p>
            </div>
            <div>
              <h3
                className="text-lg font-medium mb-4 text-[#1A1A1A] uppercase tracking-[0.1em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                03. Deliver
              </h3>
              <p className="text-base text-[#1A1A1A]/70 leading-relaxed">
                We refine and deliver — meticulous post-production and a cohesive collection of images ready for marketing, portfolio, or publication.
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
            Ready to Tell Your Story?
          </h2>
          <p className="text-base text-[#F5F3F0]/70 mb-8 max-w-2xl mx-auto">
            Whether you need architectural documentation, real estate marketing, or property video, let's bring clarity and purpose to your project.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#8B4545] text-white text-xs tracking-[0.2em] uppercase hover:bg-[#F5F3F0] hover:text-[#1A1A1A] transition-colors duration-300"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Get in Touch <span>→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
