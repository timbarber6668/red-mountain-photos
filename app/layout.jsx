import './globals.css'

export const metadata = {
  title: 'Red Mountain Photography | Luxury Real Estate & Architectural Photography in Telluride, Colorado',
  description: 'Award-winning architectural and real estate photography for luxury homes, mountain properties, and design firms in Telluride, Mountain Village, and the Colorado high country. FAA-certified drone imaging, cinematic video, and portfolio-quality work.',
  keywords: 'real estate photography Telluride, architectural photography Colorado, drone photography mountain homes, luxury property photography',
  openGraph: {
    title: 'Red Mountain Photography | Telluride Luxury Real Estate Photography',
    description: 'Architectural and real estate photography for mountain properties in Telluride and Colorado',
    url: 'https://redmountainphotos.com',
    siteName: 'Red Mountain Photography',
    images: [
      {
        url: 'https://redmountainphotos.com/images/actual/544A5593.jpg',
        width: 1200,
        height: 630,
        alt: 'Red Mountain Photography - Luxury interior photography'
      }
    ]
  },
  canonical: 'https://redmountainphotos.com'
}

export default function RootLayout({ children }) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Red Mountain Photography',
    description: 'Luxury real estate and architectural photography services in Telluride, Colorado',
    url: 'https://redmountainphotos.com',
    telephone: '+1-970-XXXXX',
    areaServed: [
      'Telluride, CO',
      'Mountain Village, CO',
      'Ridgway, CO',
      'Ouray, CO',
      'Silverton, CO',
      'Durango, CO',
      'Aspen, CO'
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '37.9377',
      longitude: '-107.8123'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Telluride',
      addressLocality: 'Telluride',
      addressRegion: 'CO',
      postalCode: '81435',
      addressCountry: 'US'
    },
    service: [
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
  };

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Space+Grotesk:wght@300;400;500&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </head>
      <body className="font-inter">{children}</body>
    </html>
  )
}
