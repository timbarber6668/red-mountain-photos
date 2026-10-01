import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';
import ServicesGrid from '../components/ServicesGrid';

export const metadata = {
  title: 'About Tim Barber | Red Mountain Photography, Telluride',
  description:
    'Tim Barber is an architectural, interior and real estate photographer based in Telluride, Colorado, working across the Colorado high country and nationwide.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Tim Barber | Red Mountain Photography',
    description: 'Architectural, interior and real estate photography by Tim Barber. Based in Telluride, Colorado.',
    url: 'https://redmountainphotos.com/about',
    images: [{ url: 'https://redmountainphotos.com/images/tim-barber.jpg' }],
  },
};

const sans = { fontFamily: "'Space Grotesk', sans-serif" };
const serif = { fontFamily: "'Cormorant Garamond', serif" };

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://redmountainphotos.com/#tim-barber',
  name: 'Tim Barber',
  jobTitle: 'Architectural and Real Estate Photographer',
  image: 'https://redmountainphotos.com/images/tim-barber.jpg',
  url: 'https://redmountainphotos.com/about',
  telephone: '+1-970-670-0846',
  worksFor: { '@id': 'https://redmountainphotos.com/#business' },
  homeLocation: { '@type': 'Place', name: 'Telluride, Colorado' },
  knowsAbout: [
    'Architectural photography',
    'Interior design photography',
    'Real estate photography',
    'Twilight photography',
    'Drone and aerial photography',
    'Property video',
  ],
  sameAs: ['https://instagram.com/redmountainphotos', 'https://facebook.com/redmountainphotos'],
};

const clients = [
  {
    title: 'Architects & interior designers',
    body: 'Portfolio images that show the design as it was intended: the materials, the proportions and the light. Shot to your brief, for your website, award entries and publication.',
  },
  {
    title: 'Builders',
    body: 'The finished rooms and the craft inside them: joinery, stonework and finishes. Often shared with the architect and designer, so everyone splits the cost.',
  },
  {
    title: 'Real estate brokers',
    body: 'Photos, video and aerials for luxury listings, ready for MLS, print and social, and delivered in 8 to 10 days.',
  },
  {
    title: 'Hospitality & luxury vacation rentals',
    body: 'Hotels, lodges, owners and property managers. Galleries planned around the cover image and built for Airbnb, Vrbo and direct booking.',
    href: '/vacation-rental-photography',
  },
];

const craft = [
  'Bracketed exposures and flash frames, blended by hand, so windows hold the view and rooms keep their true color.',
  'Lighting set room by room on site, and every vertical straightened in the edit.',
  'Every frame edited by me. No outsourced or automated batch editing.',
  'FAA-certified drone pilot for aerial stills and video.',
  'Photo and video on the same visit, with the video cut and graded by me as well.',
  'One point of contact, from the first call to the final files.',
];

const steps = [
  {
    title: 'Plan',
    body: 'A short call about the property, who the images are for and how they will be used. Then a shot list and a schedule built around the light.',
  },
  {
    title: 'Shoot',
    body: 'Tripod, careful lighting and enough time in each room to get it right. Interiors by day, exteriors and twilight when the light is best.',
  },
  {
    title: 'Deliver',
    body: 'Edited, color-corrected files in an online gallery, sized for MLS, web and print. Photos in 8 to 10 days, video in about two weeks. Ask about rush processing.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#F5F3F0]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      {/* Hero */}
      <section className="bg-[#1A1A1A] text-[#F5F3F0] py-20 md:py-24 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-[#F5F3F0]">
            <Breadcrumbs current="About" />
          </div>
          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight" style={serif}>
            About Red Mountain Photography
          </h1>
          <p className="text-lg text-[#F5F3F0]/70 max-w-2xl">
            Architectural, interior and real estate photography by Tim Barber. Based in Telluride, Colorado.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 md:py-24 px-6 md:px-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="overflow-hidden bg-[#e9e6e1]">
            <img
              src="/images/tim-barber.jpg"
              alt="Tim Barber, architectural and real estate photographer, Telluride, Colorado"
              width="1200"
              height="1339"
              className="w-full h-auto object-cover"
            />
          </div>

          <div>
            <p className="text-[11px] tracking-[0.24em] uppercase text-[#8B4545] mb-5" style={sans}>
              Behind the camera
            </p>
            <h2 className="text-4xl md:text-5xl font-light mb-8 text-[#1A1A1A] leading-tight" style={serif}>
              Tim Barber
            </h2>
            <div className="space-y-5 text-base text-[#1A1A1A]/75 leading-relaxed">
              <p>
                I&apos;m the photographer behind Red Mountain. I live in Telluride and photograph architecture, interiors and real estate for architects, builders, designers, brokers and hospitality brands.
              </p>
              <p>
                Living here shapes the work. I know which side of the canyon loses the sun first, when the aspens turn, and how short a twilight window is at this altitude. That knowledge travels with me, and I travel more every year.
              </p>
              <p>
                My work runs from new custom homes and design projects to luxury listings and vacation rentals. Every shoot is planned around the light and the brief, and you work with me directly from the first call to the final files.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[11px] uppercase tracking-[0.2em]" style={sans}>
              <a
                href="https://instagram.com/redmountainphotos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B4545] hover:opacity-60 transition-opacity"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com/redmountainphotos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B4545] hover:opacity-60 transition-opacity"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Who I work with */}
      <section className="bg-white py-20 md:py-24 px-6 md:px-16 border-t border-black/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.24em] uppercase text-[#8B4545] mb-5" style={sans}>
              Clients
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A]" style={serif}>
              Who I work with
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {clients.map((c) => (
              <div key={c.title} className="border-t border-[#1A1A1A] pt-6">
                <h3 className="text-2xl md:text-3xl font-light mb-3 text-[#1A1A1A]" style={serif}>
                  {c.href ? (
                    <Link href={c.href} className="hover:text-[#8B4545] transition-colors">{c.title}</Link>
                  ) : (
                    c.title
                  )}
                </h3>
                <p className="text-base text-[#1A1A1A]/70 leading-relaxed">{c.body}</p>
                {c.href && (
                  <Link
                    href={c.href}
                    className="inline-block mt-4 text-[10px] tracking-[0.2em] uppercase text-[#8B4545] border-b border-[#8B4545] pb-0.5 hover:opacity-60 transition-opacity"
                    style={sans}
                  >
                    Vacation rental photography →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craft */}
      <section className="bg-[#1A1A1A] text-[#F5F3F0] py-20 md:py-24 px-6 md:px-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <p className="text-[11px] tracking-[0.24em] uppercase text-[#c98282] mb-5" style={sans}>
              The work
            </p>
            <h2 className="text-4xl md:text-5xl font-light leading-tight" style={serif}>
              What goes into every shoot
            </h2>
          </div>
          <ul className="md:col-span-3 divide-y divide-white/10 border-y border-white/10">
            {craft.map((c) => (
              <li key={c} className="py-4 text-base text-[#F5F3F0]/80 leading-relaxed">{c}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-white py-20 md:py-24 px-6 md:px-16 border-y border-black/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 text-center">
            <p className="text-[11px] tracking-[0.24em] uppercase text-[#8B4545] mb-5" style={sans}>
              Services
            </p>
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-[#1A1A1A] leading-tight" style={serif}>
              What we shoot
            </h2>
            <p className="text-base text-[#1A1A1A]/65 max-w-2xl mx-auto">
              Most projects combine more than one of these. Each is quoted to the property and how the images will be used.
            </p>
          </div>
          <ServicesGrid variant="full" />
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-24 px-6 md:px-16 bg-[#F5F3F0]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.24em] uppercase text-[#8B4545] mb-5" style={sans}>
              Process
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A]" style={serif}>
              How a shoot works
            </h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t border-[#1A1A1A] pt-6">
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#8B4545] mb-3" style={sans}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="text-2xl font-light mb-3 text-[#1A1A1A]" style={serif}>
                  {s.title}
                </h3>
                <p className="text-base text-[#1A1A1A]/70 leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1A1A1A] text-[#F5F3F0] py-20 md:py-24 px-6 md:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight" style={serif}>
            Have a project in mind?
          </h2>
          <p className="text-base text-[#F5F3F0]/70 mb-10 max-w-xl mx-auto">
            Tell us about the property and you will hear back within a day.
          </p>
          <Link
            href="/contact"
            data-cta="about-quote"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#8B4545] text-white text-[11px] tracking-[0.2em] uppercase hover:bg-[#F5F3F0] hover:text-[#1A1A1A] transition-colors duration-300"
            style={sans}
          >
            Get a Quote <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
