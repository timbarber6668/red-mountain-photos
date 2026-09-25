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
      title: post.title,
      description: post.excerpt,
      images: [{ url: `https://redmountainphotos.com${post.image}` }],
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="bg-[#F5F3F0] min-h-screen">
      {/* Hero */}
      <section className="bg-[#1A1A1A] text-[#F5F3F0] py-20 px-10 md:px-16">
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
        </div>
      </section>

      {/* Feature image */}
      <section className="px-10 md:px-16 -mb-10">
        <div className="max-w-4xl mx-auto">
          <img
            src={post.image}
            alt={post.imageAlt}
            className="w-full aspect-[16/9] object-cover border border-black/10 -translate-y-10"
          />
        </div>
      </section>

      {/* Body */}
      <article className="pb-24 px-10 md:px-16">
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
            <p className="text-sm text-[#1A1A1A]/60 mb-4">
              Red Mountain Photography provides luxury real estate, architectural, drone, and video coverage across Telluride and the Colorado high country.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#8B4545] border-b border-[#8B4545] pb-0.5 hover:opacity-60 transition-opacity"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Start a Conversation →
            </Link>
          </div>
        </div>
      </article>

      {/* More articles */}
      <section className="bg-white border-t border-black/10 py-20 px-10 md:px-16">
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
