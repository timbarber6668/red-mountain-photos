import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found | Red Mountain Photography',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="bg-[#F5F3F0] min-h-[70vh] flex items-center px-6 md:px-16 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <p
          className="text-xs tracking-[0.2em] uppercase text-[#8B4545] mb-6"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Error 404
        </p>
        <h1
          className="text-5xl md:text-6xl font-light mb-6 text-[#1A1A1A] leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          This Frame Doesn't Exist
        </h1>
        <p className="text-base text-[#1A1A1A]/70 leading-relaxed mb-10 max-w-md mx-auto">
          The page you're looking for has moved or never existed. Let's get you back to something worth looking at.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#8B4545] text-white text-[10px] tracking-[0.2em] uppercase hover:bg-[#1A1A1A] transition-colors duration-300"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Back to Home <span>&rarr;</span>
          </Link>
          <Link
            href="/#work"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#1A1A1A] text-[#1A1A1A] text-[10px] tracking-[0.2em] uppercase hover:bg-[#1A1A1A] hover:text-white transition-colors duration-300"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            View Work <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
