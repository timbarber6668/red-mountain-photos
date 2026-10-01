import { NextResponse } from 'next/server';

// Sends website inquiries through Resend, the same provider the invoicing app
// uses on the redmountainphotos.com domain.
//   RESEND_API_KEY  required. Without it this route answers 503 and the form
//                   falls back to opening the visitor's email app.
//   CONTACT_TO      optional, defaults to tim@redmountainphotos.com
//   CONTACT_FROM    optional, defaults to the address below
const TO = process.env.CONTACT_TO || 'tim@redmountainphotos.com';
const FROM = process.env.CONTACT_FROM || 'Red Mountain Website <website@redmountainphotos.com>';

const clean = (v, max = 2000) => String(v ?? '').trim().slice(0, max);
const escape = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export async function POST(request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ error: 'not_configured' }, { status: 503 });

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const fields = {
    name: clean(body.name, 200),
    email: clean(body.email, 200),
    phone: clean(body.phone, 60),
    location: clean(body.location, 200),
    projectType: clean(body.projectType, 100) || 'Not specified',
    timing: clean(body.timing, 200),
    message: clean(body.message, 5000),
  };

  if (!fields.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) || !fields.message) {
    return NextResponse.json({ error: 'invalid' }, { status: 422 });
  }

  const rows = [
    ['Name', fields.name],
    ['Email', fields.email],
    ['Phone', fields.phone],
    ['Property location', fields.location],
    ['Project type', fields.projectType],
    ['Timing', fields.timing],
  ].filter(([, v]) => v);

  const text = [...rows.map(([k, v]) => `${k}: ${v}`), '', fields.message].join('\n');
  const html = `
    <table style="font-family:Helvetica,Arial,sans-serif;font-size:14px;border-collapse:collapse">
      ${rows.map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#777">${k}</td><td style="padding:4px 0">${escape(v)}</td></tr>`).join('')}
    </table>
    <p style="font-family:Helvetica,Arial,sans-serif;font-size:14px;white-space:pre-wrap;margin-top:20px">${escape(fields.message)}</p>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: fields.email,
      subject: `Website inquiry: ${fields.projectType} from ${fields.name}`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text());
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
