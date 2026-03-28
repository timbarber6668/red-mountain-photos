'use client'

export default function SchemaMarkup({ projects }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://redmountainphotos.com/#organization',
    name: 'Red Mountain Photos',
    description: 'Luxury architectural and real estate photography services specializing in Telluride and mountain communities',
    url: 'https://redmountainphotos.com',
    sameAs: [
      'https://www.instagram.com/redmountainphotos',
      'https://www.linkedin.com/company/red-mountain-photos'
    ],
    areaServed: {
      '@type': 'GeoShape',
      'addressCountry': 'US',
      'name': 'Rocky Mountain Region'
    },
    serviceType: ['Architectural Photography', 'Real Estate Photography', 'Drone Photography'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '24',
      bestRating: '5',
      worstRating: '1'
    },
    portfolio: projects.map(project => ({
      '@type': 'CreativeWork',
      '@id': `https://redmountainphotos.com/projects/${project.id}`,
      name: project.name,
      description: project.description,
      image: project.image,
      datePublished: `${project.year}-01-01`,
      author: {
        '@type': 'Person',
        name: 'Red Mountain Photos Studio'
      },
      contentLocation: {
        '@type': 'Place',
        name: project.location,
        geo: {
          '@type': 'GeoCoordinates',
          // Approximate coordinates for Colorado projects
          latitude: project.location.includes('Telluride') ? 37.9377 : 39.7392,
          longitude: project.location.includes('Telluride') ? -106.3843 : -104.9903
        }
      },
      keywords: [project.category, 'architectural photography', 'luxury real estate', project.location],
      material: project.details.Material,
      photographyEquipment: project.details['Shot On'] || project.details['Camera'],
      isPartOf: {
        '@type': 'CollectionPage',
        name: 'Red Mountain Architectural Archives',
        url: 'https://redmountainphotos.com'
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
