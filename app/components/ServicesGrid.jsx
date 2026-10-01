import Link from 'next/link';
import services from '../lib/services';

const sans = { fontFamily: "'Space Grotesk', sans-serif" };
const serif = { fontFamily: "'Cormorant Garamond', serif" };

// compact: four across with one-line copy (home page).
// full: two across with the longer description (About page).
export default function ServicesGrid({ variant = 'compact' }) {
  const compact = variant === 'compact';
  return (
    <div
      className={
        compact
          ? 'grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8'
          : 'grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16'
      }
    >
      {services.map((s, i) => (
        <article key={s.slug} id={compact ? undefined : s.slug}>
          <div className={`${compact ? 'aspect-[4/3]' : 'aspect-video'} mb-5 overflow-hidden bg-[#e9e6e1]`}>
            <img
              src={s.image}
              alt={s.imageAlt}
              loading="lazy"
              className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
            />
          </div>
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#8B4545] mb-2" style={sans}>
            {String(i + 1).padStart(2, '0')}
          </p>
          <h3
            className={`${compact ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'} font-light mb-3 text-[#1A1A1A] leading-tight`}
            style={serif}
          >
            {s.href ? (
              <Link href={s.href} className="hover:text-[#8B4545] transition-colors">{s.title}</Link>
            ) : (
              s.title
            )}
          </h3>
          <p className={`${compact ? 'text-sm' : 'text-base'} text-[#1A1A1A]/65 leading-relaxed`}>
            {compact ? s.short : s.long}
          </p>
          {s.href && (
            <Link
              href={s.href}
              className="inline-block mt-3 text-[10px] tracking-[0.2em] uppercase text-[#8B4545] border-b border-[#8B4545] pb-0.5 hover:opacity-60 transition-opacity"
              style={sans}
            >
              Learn more →
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}
