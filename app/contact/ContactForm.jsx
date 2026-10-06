'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { track, getAttribution } from '../lib/track';

const CONTACT_EMAIL = 'tim@redmountainphotos.com';

function mailtoFallback(f) {
  const subject = `Photography inquiry from ${f.name}`;
  const lines = [
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    f.phone ? `Phone: ${f.phone}` : null,
    f.location ? `Property location: ${f.location}` : null,
    `Project type: ${f.projectType || 'Not specified'}`,
    f.timing ? `Timing: ${f.timing}` : null,
  ].filter(Boolean);
  const body = [...lines, '', f.message].join('\n');
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState('idle'); // idle | sending | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, attribution: getAttribution() }),
      });
      if (res.ok) {
        track('contact_submit', { project_type: fields.projectType || 'none' });
        router.push('/thank-you');
        return;
      }
      if (res.status === 503) {
        // Email sending not configured yet: hand off to the visitor's mail app.
        track('contact_submit', { project_type: fields.projectType || 'none', via: 'mailto' });
        mailtoFallback(fields);
        setTimeout(() => router.push('/thank-you'), 800);
        return;
      }
      setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  const inputClasses =
    'w-full px-4 py-3 border border-[#1A1A1A]/20 bg-white text-[#1A1A1A] placeholder-[#1A1A1A]/35 focus:outline-none focus:border-[#8B4545] transition-colors';
  const labelClasses = 'block text-[11px] font-medium text-[#1A1A1A] mb-2 uppercase tracking-[0.16em]';
  const labelStyle = { fontFamily: "'Space Grotesk', sans-serif" };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClasses} style={labelStyle}>Name</label>
          <input type="text" id="name" name="name" required autoComplete="name" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses} style={labelStyle}>Email</label>
          <input type="email" id="email" name="email" required autoComplete="email" className={inputClasses} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className={labelClasses} style={labelStyle}>
            Phone <span className="normal-case tracking-normal text-[#1A1A1A]/40">(optional)</span>
          </label>
          <input type="tel" id="phone" name="phone" autoComplete="tel" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="location" className={labelClasses} style={labelStyle}>Property location</label>
          <input type="text" id="location" name="location" className={inputClasses} placeholder="City and state" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="projectType" className={labelClasses} style={labelStyle}>Project type</label>
          <select id="projectType" name="projectType" className={inputClasses}>
            <option value="">Choose one</option>
            <option value="Real estate listing">Real estate listing</option>
            <option value="Architecture or interior design">Architecture or interior design</option>
            <option value="Hospitality or luxury vacation rental">Hospitality or luxury vacation rental</option>
            <option value="Property video">Property video</option>
            <option value="Drone and aerial">Drone and aerial</option>
            <option value="Something else">Something else</option>
          </select>
        </div>
        <div>
          <label htmlFor="timing" className={labelClasses} style={labelStyle}>
            Timing <span className="normal-case tracking-normal text-[#1A1A1A]/40">(optional)</span>
          </label>
          <input type="text" id="timing" name="timing" className={inputClasses} placeholder="e.g. listing goes live June 1" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses} style={labelStyle}>About the project</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          required
          className={inputClasses}
          placeholder="Size of the home, what you need (photos, video, aerials, twilight) and anything else useful."
        />
      </div>

      {/* Honeypot, hidden from people */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this empty</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        data-cta="contact-submit"
        className="w-full px-6 py-4 bg-[#8B4545] text-white font-medium uppercase tracking-[0.2em] text-xs hover:bg-[#1A1A1A] transition-colors duration-300 disabled:opacity-60"
        style={labelStyle}
      >
        {status === 'sending' ? 'Sending…' : 'Send Inquiry'}
      </button>

      {status === 'error' ? (
        <p className="text-sm text-[#8B4545]" role="alert" style={labelStyle}>
          Something went wrong sending that. Please try again, or call{' '}
          <a href="tel:+19706700846" className="underline">(970) 670-0846</a>.
        </p>
      ) : (
        <p className="text-xs text-[#1A1A1A]/50 leading-relaxed" style={labelStyle}>
          You will hear back within a day with a quote and available dates.
        </p>
      )}
    </form>
  );
}
