import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="bg-[#F5F3F0] border-b border-black/10">
      <div className="flex items-center justify-between px-10 md:px-16 h-16">
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/images/logo.png"
            alt="Red Mountain Photography logo"
            className="h-7 w-auto"
          />
          <span
            className="text-[11px] tracking-[0.22em] uppercase text-[#1A1A1A] group-hover:text-[#8B4545] transition-colors hidden sm:inline"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
          >
            Red Mountain Photography
          </span>
        </Link>
        <nav
          className="flex items-center gap-4 md:gap-10 text-[10px] md:text-[11px] tracking-[0.12em] md:tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <Link href="/#work" className="text-[#1A1A1A]/70 hover:text-[#8B4545] transition-colors">
            Work
          </Link>
          <Link href="/about" className="text-[#1A1A1A]/70 hover:text-[#8B4545] transition-colors">
            About
          </Link>
          <Link href="/blog" className="text-[#1A1A1A]/70 hover:text-[#8B4545] transition-colors">
            Resources
          </Link>
          <Link
            href="/contact"
            className="text-[#8B4545] border border-[#8B4545] px-3 md:px-4 py-2 hover:bg-[#8B4545] hover:text-white transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
