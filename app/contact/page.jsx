import ContactForm from './ContactForm';
import Breadcrumbs from '../components/Breadcrumbs';

export const metadata = {
  title: 'Contact Red Mountain Photography | Telluride Real Estate & Architecture Photography',
  description: 'Request a quote for real estate, architectural, interior, drone or video photography. Based in Telluride, Colorado, working nationwide. Replies within a day.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="bg-[#F5F3F0] min-h-screen">
      {/* Hero */}
      <section className="bg-[#1A1A1A] text-[#F5F3F0] py-20 md:py-24 px-6 md:px-16">
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
            Tell us about the property and what you need, wherever it is. You will hear back within a day. Or call{' '}
            <a href="tel:+19706700846" className="text-[#F5F3F0] underline decoration-[#8B4545] underline-offset-4 hover:text-[#c98282] transition-colors">
              (970) 670-0846
            </a>
            .
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-20 md:py-24 px-6 md:px-16">
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
                Telluride is home base, and most of our work is in the Colorado high country. We also travel nationwide. Tell us where the property is and we will work out the logistics.
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
                Every inquiry gets a reply within a day. If your timeline is tight, say so in the message or call.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
