'use client';

import { useEffect } from 'react';
import { track, captureAttribution } from '../lib/track';

// Site-wide click tracking, so individual links need no extra code:
//  - phone number links fire phone_click
//  - anything carrying data-cta fires cta_click with that name (hero-quote,
//    header-contact, closing-call, ...)
// Also remembers where the visit came from (UTM tags, fbclid, gclid).
export default function ClickTracker() {
  useEffect(() => {
    captureAttribution();
    const onClick = (e) => {
      const el = e.target.closest?.('a[href^="tel:"], [data-cta]');
      if (!el) return;
      if (el.matches('a[href^="tel:"]')) track('phone_click', { location: el.dataset.cta || window.location.pathname });
      if (el.dataset.cta && el.dataset.cta !== 'contact-submit') track('cta_click', { cta: el.dataset.cta });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}
