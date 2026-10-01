import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="bg-[#111111] text-[#F5F3F0]">
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/images/logo.png" alt="Red Mountain Photography logo" className="h-7 w-auto" />
            <span
              className="text-[11px] tracking-[0.22em] uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
            >
              Red Mountain Photography
            </span>
          </div>
          <p className="text-sm text-[#F5F3F0]/50 leading-relaxed max-w-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Architectural, interior and real estate photography and video. Based in Telluride, Colorado. Working nationwide.
          </p>
        </div>

        {/* Contact */}
        <div style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#F5F3F0]/40 mb-4">Contact</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="tel:+19706700846" className="hover:text-[#c98282] transition-colors">
                (970) 670-0846
              </a>
            </li>
            <li>
              <a href="mailto:tim@redmountainphotos.com" className="hover:text-[#c98282] transition-colors">
                tim@redmountainphotos.com
              </a>
            </li>
            <li className="text-[#F5F3F0]/60">Telluride, Colorado</li>
          </ul>
          <div className="flex gap-5 mt-6 text-[11px] tracking-[0.15em] uppercase">
            <a
              href="https://instagram.com/redmountainphotos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5F3F0]/60 hover:text-[#c98282] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com/redmountainphotos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5F3F0]/60 hover:text-[#c98282] transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>

        {/* Explore + service area */}
        <div style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#F5F3F0]/40 mb-4">Explore</p>
          <ul className="space-y-2 text-sm mb-6">
            <li><Link href="/#work" className="hover:text-[#c98282] transition-colors">Selected Work</Link></li>
            <li><Link href="/about" className="hover:text-[#c98282] transition-colors">About</Link></li>
            <li><Link href="/blog" className="hover:text-[#c98282] transition-colors">Resources</Link></li>
            <li><Link href="/#faq" className="hover:text-[#c98282] transition-colors">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-[#c98282] transition-colors">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-[#c98282] transition-colors">Privacy</Link></li>
            <li>
              <a href="https://redmountainweddingfilms.com" className="hover:text-[#c98282] transition-colors">
                Wedding Films <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
          <p className="text-xs text-[#F5F3F0]/40 leading-relaxed">
            Home base in Telluride. Regular work across the Colorado high country, and travel anywhere in the country.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div
          className="max-w-6xl mx-auto px-6 md:px-16 py-6 text-[11px] text-[#F5F3F0]/40 tracking-[0.1em]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          © {new Date().getFullYear()} Red Mountain Media · Red Mountain Photography and Red Mountain Wedding Films · Telluride, Colorado
        </div>
      </div>
    </footer>
  );
}
