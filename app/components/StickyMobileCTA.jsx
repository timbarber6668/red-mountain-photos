'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Pages where a persistent "get in touch" bar would be redundant or intrusive.
const HIDDEN_ON = ['/contact', '/thank-you'];

export default function StickyMobileCTA() {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-[60] grid grid-cols-2 border-t border-white/15 bg-[#1A1A1A]/95 backdrop-blur-sm"
      style={{ fontFamily: "'Space Grotesk', sans-serif", paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a
        href="tel:+19706700846"
        className="flex items-center justify-center gap-2 py-4 text-[10px] tracking-[0.2em] uppercase text-[#F5F3F0] active:bg-white/10 transition-colors"
      >
        Call
      </a>
      <Link
        href="/contact"
        className="flex items-center justify-center gap-2 py-4 text-[10px] tracking-[0.2em] uppercase bg-[#8B4545] text-white active:bg-[#743a3a] transition-colors"
      >
        Get a Quote
      </Link>
    </div>
  );
}
