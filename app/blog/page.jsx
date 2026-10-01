import Link from 'next/link';
import posts from './posts';
import Breadcrumbs from '../components/Breadcrumbs';

export const metadata = {
  title: 'Photography Resources | Red Mountain Photography | Telluride',
  description:
    'Practical guides on real estate, architectural, drone and video photography for mountain homes and design projects, from Telluride photographer Tim Barber.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogIndexPage() {
  return (
    <div className="bg-[#F5F3F0] min-h-screen">
      {/* Hero */}
      <section className="bg-[#1A1A1A] text-[#F5F3F0] py-20 md:py-24 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-[#F5F3F0]">
            <Breadcrumbs current="Photography Resources" />
          </div>
          <h1
            className="text-6xl md:text-7xl font-light mb-6 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Photography Resources
          </h1>
          <p className="text-lg text-[#F5F3F0]/70 max-w-2xl">
            Practical guides on photographing, preparing and marketing mountain homes and design projects.
          </p>
        </div>
      </section>

      {/* Article grid */}
      <section className="py-20 md:py-24 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white border border-black/5 flex flex-col">
              <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  className="w-full aspect-[3/2] object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              </Link>
              <div className="p-6 flex flex-col flex-1">
                <p
                  className="text-xs text-[#8B4545] uppercase tracking-[0.15em] mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {post.category} · {post.readTime}
                </p>
                <h2 className="text-lg font-medium text-[#1A1A1A] mb-3 leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <Link href={`/blog/${post.slug}`} className="hover:text-[#8B4545] transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-[#1A1A1A]/60 mb-4 leading-relaxed">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-auto self-start text-xs text-[#8B4545] uppercase tracking-[0.15em] hover:opacity-60 transition-opacity"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1A1A1A] text-[#F5F3F0] py-20 md:py-24 px-6 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl font-light mb-6 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Planning a Shoot?
          </h2>
          <p className="text-base text-[#F5F3F0]/70 mb-8 max-w-2xl mx-auto">
            Tell us about the property and we will recommend the right coverage. You will hear back within a day.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#8B4545] text-white text-xs tracking-[0.2em] uppercase hover:bg-[#F5F3F0] hover:text-[#1A1A1A] transition-colors duration-300"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Get a Quote <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
