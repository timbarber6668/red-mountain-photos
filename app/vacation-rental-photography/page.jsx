import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';

const URL = 'https://redmountainphotos.com/vacation-rental-photography';

export const metadata = {
  title: 'Luxury Vacation Rental Photography | Telluride & Mountain Village | Red Mountain Photography',
  description:
    'Vacation rental photography for luxury homes in Telluride, Mountain Village and the Colorado high country. Photos and video for Airbnb, Vrbo and direct booking sites by Tim Barber.',
  alternates: { canonical: '/vacation-rental-photography' },
  openGraph: {
    title: 'Luxury Vacation Rental Photography in Telluride',
    description: 'Photos and video for luxury vacation rentals on Airbnb, Vrbo and direct booking sites.',
    url: URL,
    images: [{ url: 'https://redmountainphotos.com/images/actual/544A4778.jpg' }],
  },
};

const sans = { fontFamily: "'Space Grotesk', sans-serif" };
const serif = { fontFamily: "'Cormorant Garamond', serif" };

const included = [
  ['A planned cover image', 'The first photo guests see in search results. We decide what it is before the shoot.'],
  ['The whole home', 'Every bedroom and bath, the kitchen and living spaces, plus the hot tub, the views and the details guests ask about.'],
  ['Windows that show the view', 'Bracketed exposures and flash frames blended by hand, so the rooms and the view outside are both right.'],
  ['Ready to upload', 'Files sized for Airbnb, Vrbo and direct booking sites, with a recommended photo order.'],
  ['Optional extras', 'Drone aerials, twilight exteriors, a walkthrough video and vertical cuts for social.'],
  ['Both seasons', 'For homes booked year-round, a summer set and a winter set, so guests see the season they are booking.'],
];

const faqs = [
  {
    q: 'Do you photograph Airbnb and Vrbo listings?',
    a: 'Yes. A large share of our work is luxury vacation rentals listed on Airbnb, Vrbo and owners’ own booking sites, for owners and for property management companies.',
  },
  {
    q: 'Can you shoot between guests?',
    a: 'Yes. We schedule around your booking calendar and cleaning turnovers. Send us the open dates and we will fit the shoot in.',
  },
  {
    q: 'How soon will I have the photos?',
    a: 'Photos are delivered in 8 to 10 days, and video in about two weeks. If a listing needs to go live sooner, ask about rush processing. It depends on availability.',
  },
  {
    q: 'Do you work with property management companies?',
    a: 'Yes. For managers with several homes, we keep a consistent look across the whole portfolio and can shoot new units as they come on.',
  },
  {
    q: 'Where do you work?',
    a: 'Telluride is home base, and we shoot rentals across Mountain Village, Ophir, Ridgway, Ouray and the Colorado high country. We also travel for rental and hospitality work anywhere in the country.',
  },
];

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${URL}#service`,
    name: 'Luxury Vacation Rental Photography',
    serviceType: 'Vacation rental photography',
    description:
      'Photography and video for luxury vacation rentals and short-term rentals on Airbnb, Vrbo and direct booking sites.',
    url: URL,
    provider: { '@id': 'https://redmountainphotos.com/#business' },
    areaServed: [
      'Telluride, CO',
      'Mountain Village, CO',
      'Ophir, CO',
      'Ridgway, CO',
      'Ouray, CO',
      { '@type': 'Country', name: 'United States' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
];

export default function VacationRentalPage() {
  return (
    <div className="bg-[#F5F3F0]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="bg-[#1A1A1A] text-[#F5F3F0] py-20 md:py-24 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-[#F5F3F0]">
            <Breadcrumbs current="Vacation Rentals" />
          </div>
          <p className="text-[11px] tracking-[0.24em] uppercase text-[#c98282] mb-5" style={sans}>
            Hospitality &amp; Luxury Vacation Rentals
          </p>
          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight" style={serif}>
            Luxury Vacation Rental Photography
          </h1>
          <p className="text-lg text-[#F5F3F0]/70 max-w-2xl mb-10">
            Photos and video for vacation homes in Telluride, Mountain Village and across the Colorado high country, made to stand out on Airbnb, Vrbo and your own booking site.
          </p>
          <Link
            href="/contact"
            data-cta="rental-hero-quote"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#8B4545] text-white text-[11px] tracking-[0.2em] uppercase hover:bg-[#F5F3F0] hover:text-[#1A1A1A] transition-colors duration-300"
            style={sans}
          >
            Get a Quote <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Image strip */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-[#1A1A1A]">
        <img src="/images/actual/544A4778.jpg" alt="Rooftop hot tub with lounge chairs above forested slopes at a Telluride vacation rental" className="w-full aspect-[4/3] object-cover" />
        <img src="/images/actual/544A5498.jpg" alt="Bright living room with fireplace and balcony views at a Mountain Village vacation rental" className="w-full aspect-[4/3] object-cover" />
        <img src="/images/actual/544A2097.jpg" alt="Outdoor fire pit and spa terrace with autumn aspens at a Telluride vacation home" className="w-full aspect-[4/3] object-cover" />
      </section>

      {/* Why */}
      <section className="bg-white py-20 md:py-24 px-6 md:px-16 border-b border-black/10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] tracking-[0.24em] uppercase text-[#8B4545] mb-5" style={sans}>
            Why it matters
          </p>
          <p className="text-2xl md:text-3xl font-light text-[#1A1A1A] leading-snug mb-8" style={serif}>
            Guests book from the photos. A study of 7,423 Airbnb properties found that professional photos lifted occupancy by about 9%.
          </p>
          <Link
            href="/blog/vacation-rental-photography-revenue"
            className="text-[11px] tracking-[0.2em] uppercase text-[#8B4545] border-b border-[#8B4545] pb-0.5 hover:opacity-60 transition-opacity"
            style={sans}
          >
            What the research says →
          </Link>
        </div>
      </section>

      {/* Included */}
      <section className="py-20 md:py-24 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.24em] uppercase text-[#8B4545] mb-5" style={sans}>
              What you get
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A]" style={serif}>
              Every rental shoot includes
            </h2>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {included.map(([title, body], i) => (
              <li key={title} className="border-t border-[#1A1A1A] pt-6">
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#8B4545] mb-3" style={sans}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="text-2xl font-light mb-3 text-[#1A1A1A]" style={serif}>{title}</h3>
                <p className="text-base text-[#1A1A1A]/70 leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 md:py-24 px-6 md:px-16 border-y border-black/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A] text-center mb-12" style={serif}>
            Rental questions
          </h2>
          <div className="space-y-10">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="text-xl md:text-2xl font-light text-[#1A1A1A] mb-3" style={serif}>{f.q}</h3>
                <p className="text-base text-[#1A1A1A]/70 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1A1A1A] text-[#F5F3F0] py-20 md:py-24 px-6 md:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight" style={serif}>
            Send us the listing.
          </h2>
          <p className="text-base text-[#F5F3F0]/70 mb-10 max-w-xl mx-auto">
            Share the property or your current listing link, and you will hear back within a day with a quote and open dates.
          </p>
          <Link
            href="/contact"
            data-cta="rental-closing-quote"
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
