// Fire a named event to whichever tools are loaded: GA4, Google Ads, the Meta
// Pixel and Microsoft Clarity. Safe to call when none are configured.
//
// Event map (our name -> what each tool receives):
//   contact_submit  GA4 generate_lead + Google Ads conversion, Meta Lead
//   phone_click     GA4 phone_click, Meta Contact
//   project_open    Meta ViewContent (builds a "looked at projects" audience)
//   everything else GA4 and Clarity only
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID;
const GADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GADS_LEAD_LABEL;

export function track(name, params = {}) {
  if (typeof window === 'undefined') return;

  const ga = name === 'contact_submit' ? 'generate_lead' : name;
  window.gtag?.('event', ga, params);
  if (name === 'contact_submit' && GADS_ID && GADS_LEAD_LABEL) {
    window.gtag?.('event', 'conversion', { send_to: `${GADS_ID}/${GADS_LEAD_LABEL}` });
  }

  if (window.fbq) {
    if (name === 'contact_submit') window.fbq('track', 'Lead', { content_category: params.project_type || 'none' });
    else if (name === 'phone_click') window.fbq('track', 'Contact');
    else if (name === 'project_open') window.fbq('track', 'ViewContent', { content_name: params.project });
  }

  if (window.clarity) {
    window.clarity('event', name);
    Object.entries(params).forEach(([k, v]) => window.clarity('set', k, String(v)));
  }
}

// First-touch source for this visit, kept in sessionStorage so it survives page
// changes. Ads should link here with UTM tags; fbclid and gclid are added by
// Meta and Google automatically.
const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];

export function captureAttribution() {
  if (typeof window === 'undefined') return;
  try {
    const q = new URLSearchParams(window.location.search);
    const fresh = {};
    KEYS.forEach((k) => { if (q.get(k)) fresh[k] = q.get(k).slice(0, 200); });
    if (Object.keys(fresh).length && !sessionStorage.getItem('rmp_attr')) {
      sessionStorage.setItem('rmp_attr', JSON.stringify({ ...fresh, landing: window.location.pathname, ref: document.referrer.slice(0, 200) }));
    }
  } catch {}
}

export function getAttribution() {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(sessionStorage.getItem('rmp_attr') || '{}'); } catch { return {}; }
}
