// Fire a named event to whichever analytics tools are loaded (GA4, Microsoft
// Clarity). Safe to call when neither is configured.
export function track(name, params = {}) {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', name, params);
  if (window.clarity) {
    window.clarity('event', name);
    Object.entries(params).forEach(([k, v]) => window.clarity('set', k, String(v)));
  }
}
