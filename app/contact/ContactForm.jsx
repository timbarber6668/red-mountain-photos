'use client';

import { useRouter } from 'next/navigation';

const CONTACT_EMAIL = 'tim@redmountainphotos.com';

export default function ContactForm() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name') || '';
    const email = data.get('email') || '';
    const phone = data.get('phone') || '';
    const location = data.get('location') || '';
    const projectType = data.get('projectType') || 'Not specified';
    const message = data.get('message') || '';

    const subject = `Photography inquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      location ? `Property location: ${location}` : null,
      `Project type: ${projectType}`,
      '',
      message,
    ]
      .filter((line) => line !== null)
      .join('\n');

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Let the mail handler take over before navigating, otherwise some
    // browsers cancel the mailto when the page changes underneath it.
    setTimeout(() => router.push('/thank-you'), 800);
  };

  const inputClasses =
    'w-full px-4 py-3 border border-[#1A1A1A]/20 bg-white text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:outline-none focus:border-[#8B4545] transition-colors';
  const labelClasses = 'block text-sm font-medium text-[#1A1A1A] mb-2 uppercase tracking-[0.1em]';
  const labelStyle = { fontFamily: "'Space Grotesk', sans-serif" };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className={labelClasses} style={labelStyle}>Name</label>
        <input type="text" id="name" name="name" required className={inputClasses} placeholder="Your name" />
      </div>

      <div>
        <label htmlFor="email" className={labelClasses} style={labelStyle}>Email</label>
        <input type="email" id="email" name="email" required className={inputClasses} placeholder="your@email.com" />
      </div>

      <div>
        <label htmlFor="phone" className={labelClasses} style={labelStyle}>
          Phone <span className="normal-case text-[#1A1A1A]/40">(optional)</span>
        </label>
        <input type="tel" id="phone" name="phone" className={inputClasses} placeholder="Your phone number" />
      </div>

      <div>
        <label htmlFor="location" className={labelClasses} style={labelStyle}>
          Property Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          className={inputClasses}
          placeholder="City and state, anywhere in the country"
        />
      </div>

      <div>
        <label htmlFor="projectType" className={labelClasses} style={labelStyle}>Project Type</label>
        <select
          id="projectType"
          name="projectType"
          className="w-full px-4 py-3 border border-[#1A1A1A]/20 bg-white text-[#1A1A1A] focus:outline-none focus:border-[#8B4545] transition-colors"
        >
          <option value="">Select a project type...</option>
          <option value="Real Estate Photography">Real Estate Photography</option>
          <option value="Architectural Photography">Architectural Photography</option>
          <option value="Drone & Aerial Photography">Drone &amp; Aerial Photography</option>
          <option value="Cinematic Video">Cinematic Video</option>
          <option value="Hospitality & Vacation Rental">Hospitality &amp; Vacation Rental</option>
          <option value="Custom Package">Custom Package</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses} style={labelStyle}>Message</label>
        <textarea
          id="message"
          name="message"
          rows="6"
          required
          className={inputClasses}
          placeholder="Tell us about your project..."
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-4 bg-[#8B4545] text-white font-medium uppercase tracking-[0.2em] text-xs hover:bg-[#1A1A1A] transition-colors duration-300"
        style={labelStyle}
      >
        Send Message
      </button>

      <p className="text-xs text-[#1A1A1A]/50 leading-relaxed" style={labelStyle}>
        Submitting opens your email app with the message pre-filled. You can also write to us directly at{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#8B4545] underline">{CONTACT_EMAIL}</a>.
      </p>
    </form>
  );
}
