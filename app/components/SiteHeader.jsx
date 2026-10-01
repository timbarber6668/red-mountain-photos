'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/#work', label: 'Work', match: null },
  { href: '/about', label: 'About', match: '/about' },
  { href: '/blog', label: 'Resources', match: '/blog' },
];

// Sticky, translucent header. Stays on screen so Contact is always one tap away.
export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-[70] transition-colors duration-300 border-b backdrop-blur-md ${
        scrolled ? 'bg-[#F5F3F0]/85 border-black/10' : 'bg-[#F5F3F0]/95 border-transparent'
      }`}
      style={{ height: 'var(--header-h)', fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <div className="flex items-center justify-between h-full px-5 md:px-16 max-w-[1600px] mx-auto">
        <Link href="/" className="flex items-center gap-3 group" aria-label="Red Mountain Photography, home">
          <img src="/images/logo.png" alt="" width="44" height="28" className="h-6 md:h-7 w-auto" />
          <span
            className="text-[11px] tracking-[0.22em] uppercase text-[#1A1A1A] group-hover:text-[#8B4545] transition-colors hidden lg:inline"
            style={{ fontWeight: 500 }}
          >
            Red Mountain Photography
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className="flex items-center gap-5 md:gap-10 text-[10px] md:text-[11px] tracking-[0.16em] md:tracking-[0.22em] uppercase"
        >
          {NAV.map((item) => {
            const active = item.match && pathname.startsWith(item.match);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`py-2 transition-colors hover:text-[#8B4545] ${active ? 'text-[#8B4545]' : 'text-[#1A1A1A]/70'}`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            data-cta="header-contact"
            className="bg-[#8B4545] text-white px-3.5 md:px-5 py-2.5 hover:bg-[#1A1A1A] transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
