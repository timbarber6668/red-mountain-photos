import Breadcrumbs from '../components/Breadcrumbs';
export const metadata = {
  title: 'Privacy Policy | Red Mountain Photography',
  description: 'How Red Mountain Photography collects, uses, and protects information submitted through this website.',
  alternates: { canonical: '/privacy' },
};

const LAST_UPDATED = 'September 24, 2026';

export default function PrivacyPage() {
  const section = (heading, paragraphs) => (
    <div className="mb-10" key={heading}>
      <h2
        className="text-lg font-medium mb-4 text-[#1A1A1A] uppercase tracking-[0.1em]"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {heading}
      </h2>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-base text-[#1A1A1A]/75 leading-relaxed mb-4">{p}</p>
      ))}
    </div>
  );

  return (
    <div className="bg-[#F5F3F0]">
      <section className="bg-[#1A1A1A] text-[#F5F3F0] py-20 px-10 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-[#F5F3F0]">
            <Breadcrumbs current="Privacy Policy" />
          </div>
          <h1
            className="text-4xl md:text-6xl font-light mb-4 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm text-[#F5F3F0]/60" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Last updated {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="py-20 px-10 md:px-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-base text-[#1A1A1A]/75 leading-relaxed mb-10">
            Red Mountain Photography ("we", "us") operates redmountainphotos.com. This page explains what information we collect through this website, how we use it, and the choices you have. We keep this simple because our data practices are simple.
          </p>

          {section('Information You Give Us', [
            'When you use the contact form, you choose what to send us: your name, email address, an optional phone number, the type of project, and your message. The form opens your own email application with that information prepared, and nothing is sent until you send it yourself. We receive it the same way we receive any other email.',
            'If you call or email us directly, we keep that correspondence so we can respond and maintain a record of the project.',
          ])}

          {section('How We Use It', [
            'We use the information you send to respond to your inquiry, prepare a quote, schedule and deliver photography work, and keep in touch about projects you have engaged us for. We do not sell your information, rent it, or share it with third parties for their own marketing.',
            'We may share information with service providers who help us operate the business, such as our email provider or payment processor, and only to the extent needed to do that work.',
          ])}

          {section('Information Collected Automatically', [
            'Our website is hosted on Vercel, which records standard server and security logs including IP addresses and browser information. These logs are used to keep the site running and secure.',
            'If analytics are enabled on this site, we use them only to understand aggregate traffic patterns, such as which pages are visited and how people arrive. We configure analytics to avoid collecting information that identifies you personally, and we do not use it to build advertising profiles.',
          ])}

          {section('Cookies', [
            'This site does not use cookies for advertising or cross-site tracking. If analytics are enabled, the analytics provider may set a cookie to distinguish one visit from another. Most browsers let you block or delete cookies in their settings, and this site remains fully usable if you do.',
          ])}

          {section('Photographs and Client Work', [
            'Photographs we create remain our copyrighted work, licensed to clients under the terms of each project agreement. We may display images from completed projects in our portfolio, on social media, and in case studies. If you are a client and prefer that your property not appear in our portfolio, tell us and we will honor that.',
          ])}

          {section('How Long We Keep Information', [
            'We keep project correspondence and records for as long as needed to serve the client relationship and to meet ordinary business and tax obligations. You can ask us to delete correspondence that we are not required to retain.',
          ])}

          {section('Your Choices', [
            'You can ask us what information we hold about you, ask us to correct it, or ask us to delete it. You can also ask us to stop contacting you at any time. Write to tim@redmountainphotos.com and we will take care of it.',
          ])}

          {section('Children', [
            'This site is intended for business use by adults and is not directed to children under 13. We do not knowingly collect information from children.',
          ])}

          {section('Changes to This Policy', [
            'If our practices change, we will update this page and revise the date above.',
          ])}

          {section('Contact Us', [
            'Questions about this policy or about information we hold can go to tim@redmountainphotos.com or (970) 670-0846. Red Mountain Photography is based in Telluride, Colorado.',
          ])}
        </div>
      </section>
    </div>
  );
}
