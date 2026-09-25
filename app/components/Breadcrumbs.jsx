import Link from 'next/link';

const BASE_URL = 'https://redmountainphotos.com';

/**
 * trail: [{ name, href }] for ancestors. The current page is passed as `current`
 * and rendered as plain text (no link), per breadcrumb convention.
 */
export default function Breadcrumbs({ trail = [], current }) {
  const items = [{ name: 'Home', href: '/' }, ...trail];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: `${BASE_URL}${item.href === '/' ? '' : item.href}`,
      })),
      { '@type': 'ListItem', position: items.length + 1, name: current },
    ],
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="text-[11px] tracking-[0.15em] uppercase"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item) => (
          <li key={item.href} className="flex items-center gap-2">
            <Link href={item.href} className="text-current opacity-60 hover:opacity-100 transition-opacity">
              {item.name}
            </Link>
            <span aria-hidden="true" className="opacity-40">/</span>
          </li>
        ))}
        <li aria-current="page" className="opacity-90">{current}</li>
      </ol>
    </nav>
  );
}
