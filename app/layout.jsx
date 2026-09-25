import './globals.css'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import StickyMobileCTA from './components/StickyMobileCTA'
import Analytics from './components/Analytics'

export const metadata = {
  metadataBase: new URL('https://redmountainphotos.com'),
  title: 'Red Mountain Photography | Luxury Real Estate & Architectural Photography in Telluride, Colorado',
  description: 'Architectural and real estate photography for luxury homes, mountain properties, and design firms. Based in Telluride, Colorado and available for projects nationwide. FAA-certified drone imaging, cinematic video, and portfolio-quality work.',
  keywords: 'real estate photography Telluride, architectural photography Colorado, drone photography mountain homes, luxury property photography, travel architectural photographer',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Red Mountain Photography | Telluride Luxury Real Estate Photography',
    description: 'Architectural and real estate photography for mountain properties. Based in Telluride, available nationwide.',
    url: 'https://redmountainphotos.com',
    siteName: 'Red Mountain Photography',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://redmountainphotos.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Aerial view of a luxury mountain home at dusk surrounded by aspens with the San Juan range beyond, Telluride, Colorado'
      }
    ]
  },
}

export default function RootLayout({ children }) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://redmountainphotos.com/#business',
    name: 'Red Mountain Photography',
    description: 'Luxury real estate, architectural, and aerial photography. Based in Telluride, Colorado and available for projects nationwide.',
    url: 'https://redmountainphotos.com',
    telephone: '+1-970-670-0846',
    email: 'tim@redmountainphotos.com',
    image: 'https://redmountainphotos.com/images/og-image.jpg',
    priceRange: '$$$',
    founder: {
      '@type': 'Person',
      name: 'Tim Barber',
      jobTitle: 'Photographer'
    },
    sameAs: [
      'https://instagram.com/redmountainphotos',
      'https://facebook.com/redmountainphotos'
    ],
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      'Telluride, CO',
      'Mountain Village, CO',
      'Ridgway, CO',
      'Ouray, CO',
      'Silverton, CO',
      'Durango, CO',
      'Aspen, CO',
      'Vail, CO',
      'Breckenridge, CO',
      'Steamboat Springs, CO'
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '37.9377',
      longitude: '-107.8123'
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Telluride',
      addressRegion: 'CO',
      postalCode: '81435',
      addressCountry: 'US'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Photography Services',
      itemListElement: [
        {
          '@type': 'Service',
          name: 'Architectural Photography',
          description: 'High-end architectural photography for custom homes and design projects'
        },
        {
          '@type': 'Service',
          name: 'Real Estate Photography',
          description: 'Luxury real estate and property marketing photography'
        },
        {
          '@type': 'Service',
          name: 'Drone & Aerial Photography',
          description: 'FAA-certified drone imaging and aerial photography'
        },
        {
          '@type': 'Service',
          name: 'Cinematic Video',
          description: 'Professional video and cinematic reel production for properties and marketing'
        }
      ]
    }
  };

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Space+Grotesk:wght@300;400;500&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </head>
      <body className="pb-[56px] md:pb-0">
        <SiteHeader />
        {children}
        <SiteFooter />
        <StickyMobileCTA />
        <Analytics />
      </body>
    </html>
  )
}
