import Script from 'next/script';

// Every tool is opt-in by environment variable, set in Vercel project settings
// or .env.local. With none set, nothing loads and no cookies are written.
//   NEXT_PUBLIC_GA_ID              Google Analytics 4, e.g. "G-XXXXXXXXXX"
//   NEXT_PUBLIC_GADS_ID            Google Ads tag, e.g. "AW-1234567890"
//   NEXT_PUBLIC_GADS_LEAD_LABEL    conversion label of the Google Ads "Lead" action
//   NEXT_PUBLIC_META_PIXEL_ID      Meta Pixel / dataset id (numbers only)
//   NEXT_PUBLIC_CLARITY_ID         Microsoft Clarity project id: free click heatmaps,
//                                  scroll maps and session recordings.
// Events are fired by app/lib/track.js. The privacy page describes all of this,
// so update it if a tool is added.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID;
const META_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export default function Analytics() {
  const gtagId = GA_ID || GADS_ID;
  return (
    <>
      {gtagId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${GA_ID ? `gtag('config', '${GA_ID}', { anonymize_ip: true });` : ''}
              ${GADS_ID ? `gtag('config', '${GADS_ID}');` : ''}
            `}
          </Script>
        </>
      )}
      {META_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
      {CLARITY_ID && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      )}
    </>
  );
}
