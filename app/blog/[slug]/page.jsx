import Link from 'next/link';
import { notFound } from 'next/navigation';
import posts, { getPost } from '../posts';
import Breadcrumbs from '../../components/Breadcrumbs';

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Red Mountain Photography`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `https://redmountainphotos.com/blog/${post.slug}`,
      publishedTime: post.date,
      authors: ['Tim Barber'],
      images: [{ url: `https://redmountainphotos.com${post.image}` }],
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `https://redmountainphotos.com${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: `https://redmountainphotos.com/blog/${post.slug}`,
    author: { '@type': 'Person', '@id': 'https://redmountainphotos.com/#tim-barber', name: 'Tim Barber', url: 'https://redmountainphotos.com/about' },
    publisher: { '@id': 'https://redmountainphotos.com/#business' },
  };
  const published = new Date(`${post.date}T12:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="bg-[#F5F3F0] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {/* Hero */}
      <section className="bg-[#1A1A1A] text-[#F5F3F0] py-16 md:py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 text-[#F5F3F0]">
            <Breadcrumbs trail={[{ name: 'Resources', href: '/blog' }]} current={post.title} />
          </div>
          <p
            className="text-xs tracking-[0.18em] uppercase text-[#c98282] mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {post.category} · {post.readTime}
          </p>
          <h1
            className="text-4xl md:text-6xl font-light leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {post.title}
          </h1>
          <p className="mt-6 text-sm text-[#F5F3F0]/60" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            By <a href="/about" className="text-[#F5F3F0] hover:text-[#c98282] transition-colors">Tim Barber</a> · <time dateTime={post.date}>{published}</time>
          </p>
        </div>
      </section>

      {/* Feature image */}
      <section className="px-6 md:px-16 -mb-10">
        <div className="max-w-4xl mx-auto">
          <img
            src={post.image}
            alt={post.imageAlt}
            className="w-full aspect-[16/9] object-cover border border-black/10 -translate-y-10"
          />
        </div>
      </section>

      {/* Body */}
      <article className="pb-24 px-6 md:px-16">
        <div className="max-w-3xl mx-auto">
          {post.body.map((section, i) => (
            <div key={i} className="mb-10">
              {section.heading && (
                <h2
                  className="text-lg font-medium mb-4 text-[#1A1A1A] uppercase tracking-[0.1em]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((p, j) => (
                <p key={j} className="text-base text-[#1A1A1A]/75 leading-relaxed mb-5">
                  {p}
                </p>
              ))}
            </div>
          ))}

          <div className="border-t border-black/10 pt-8 mt-12">
            <p className="text-base text-[#1A1A1A]/70 mb-6">
              Red Mountain Photography shoots architecture, interiors and real estate from a home base in Telluride, Colorado, and travels nationwide. Have a property in mind?
            </p>
            <Link
              href="/contact"
              data-cta="article-quote"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#8B4545] text-white text-[10px] tracking-[0.2em] uppercase hover:bg-[#1A1A1A] transition-colors duration-300"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Get a Quote <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </article>

      {/* More articles */}
      <section className="bg-white border-t border-black/10 py-16 md:py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl font-light mb-10 text-[#1A1A1A]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            More Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {others.map((p) => (
              <article key={p.slug}>
                <p
                  className="text-xs text-[#8B4545] uppercase tracking-[0.15em] mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {p.category}
                </p>
                <h3 className="text-base font-medium text-[#1A1A1A] leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <Link href={`/blog/${p.slug}`} className="hover:text-[#8B4545] transition-colors">
                    {p.title}
                  </Link>
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
