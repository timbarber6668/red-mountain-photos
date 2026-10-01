import Link from 'next/link';

export const metadata = {
  title: 'Thank You | Red Mountain Photography',
  description: 'Thanks for reaching out to Red Mountain Photography. We respond to project inquiries within 24 hours.',
  alternates: { canonical: '/thank-you' },
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <div className="bg-[#F5F3F0]">
      <section className="bg-[#1A1A1A] text-[#F5F3F0] py-28 px-6 md:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-xs tracking-[0.2em] uppercase text-[#c98282] mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Message On Its Way
          </p>
          <h1
            className="text-5xl md:text-6xl font-light mb-8 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Thank You
          </h1>
          <p className="text-lg text-[#F5F3F0]/70 leading-relaxed max-w-xl mx-auto">
            Your inquiry is on its way. We read every message personally and typically respond within 24 hours, often sooner.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-2xl md:text-3xl font-light mb-8 text-[#1A1A1A]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            What Happens Next
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left mb-16">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#8B4545] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>01</p>
              <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">
                We read your message and look at the property or project details you shared.
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#8B4545] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>02</p>
              <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">
                You get a reply with recommended coverage and a detailed quote, usually within 24 hours.
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#8B4545] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>03</p>
              <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">
                Once the scope is set, we schedule the shoot around the light your property gets.
              </p>
            </div>
          </div>

          <p className="text-sm text-[#1A1A1A]/60 mb-8 leading-relaxed">
            Need to reach us sooner? Call{' '}
            <a href="tel:+19706700846" className="text-[#8B4545] hover:opacity-60 transition-opacity">(970) 670-0846</a>
            {' '}or email{' '}
            <a href="mailto:tim@redmountainphotos.com" className="text-[#8B4545] hover:opacity-60 transition-opacity">tim@redmountainphotos.com</a>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#work"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#8B4545] text-white text-[10px] tracking-[0.2em] uppercase hover:bg-[#1A1A1A] transition-colors duration-300"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              View Selected Work <span>&rarr;</span>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#1A1A1A] text-[#1A1A1A] text-[10px] tracking-[0.2em] uppercase hover:bg-[#1A1A1A] hover:text-white transition-colors duration-300"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Read Our Guides <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
