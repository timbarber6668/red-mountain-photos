import Link from 'next/link';
import ContactForm from './ContactForm';
import Breadcrumbs from '../components/Breadcrumbs';

export const metadata = {
  title: 'Contact Red Mountain Photography | Telluride Real Estate & Architecture Photography',
  description: 'Get in touch with Red Mountain Photography. Based in Telluride, Colorado. Request a quote for your luxury real estate, architectural, drone, or video project.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="bg-[#F5F3F0] min-h-screen">
      {/* Hero */}
      <section className="bg-[#1A1A1A] text-[#F5F3F0] py-24 px-10 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-[#F5F3F0]">
            <Breadcrumbs current="Contact" />
          </div>
          <h1
            className="text-6xl md:text-7xl font-light mb-6 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Get in Touch
          </h1>
          <p className="text-lg text-[#F5F3F0]/70 max-w-2xl">
            Ready to discuss your photography project? Wherever the property is, we'd love to hear about it. Tell us the details below, or call us at{' '}
            <a href="tel:+19706700846" className="text-[#F5F3F0] underline decoration-[#8B4545] underline-offset-4 hover:text-[#c98282] transition-colors">
              (970) 670-0846
            </a>
            . We'll respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-24 px-10 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div>
            <div className="mb-12 hidden md:block">
              <img
                src="/images/actual/544A6048.jpg"
                alt="Custom mountain home kitchen with marble island and pendant lighting, interior photography by Red Mountain Photography"
                className="w-full aspect-[4/3] object-cover border border-black/10"
              />
            </div>

            <div className="mb-12">
              <h2
                className="text-sm font-medium text-[#1A1A1A] mb-4 uppercase tracking-[0.1em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Quick Contact
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-[#1A1A1A]/60 uppercase tracking-[0.15em] mb-1">Phone</p>
                  <a href="tel:+19706700846" className="text-base text-[#1A1A1A] hover:text-[#8B4545] transition-colors">
                    (970) 670-0846
                  </a>
                </div>
                <div>
                  <p className="text-xs text-[#1A1A1A]/60 uppercase tracking-[0.15em] mb-1">Email</p>
                  <a href="mailto:tim@redmountainphotos.com" className="text-base text-[#1A1A1A] hover:text-[#8B4545] transition-colors">
                    tim@redmountainphotos.com
                  </a>
                </div>
                <div>
                  <p className="text-xs text-[#1A1A1A]/60 uppercase tracking-[0.15em] mb-1">Based In</p>
                  <p className="text-base text-[#1A1A1A]">Telluride, Colorado</p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2
                className="text-sm font-medium text-[#1A1A1A] mb-4 uppercase tracking-[0.1em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Where We Work
              </h2>
              <p className="text-base text-[#1A1A1A]/70 leading-relaxed">
                Home base is Telluride, Colorado, and we work constantly across the Colorado high country. We also travel nationwide, so if your property sits outside this region, say where it is and we will work out the logistics with you.
              </p>
            </div>

            <div>
              <h2
                className="text-sm font-medium text-[#1A1A1A] mb-4 uppercase tracking-[0.1em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Response Time
              </h2>
              <p className="text-base text-[#1A1A1A]/70 leading-relaxed">
                We typically respond to inquiries within 24 hours. For rush projects or urgent timelines, mention it in your message and we'll prioritize getting back to you.
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
          <Link
            href="/#work"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#8B4545] text-white text-xs tracking-[0.2em] uppercase hover:bg-[#F5F3F0] hover:text-[#1A1A1A] transition-colors duration-300"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            View Our Work <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
