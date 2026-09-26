"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent, type ConsentState } from "@/lib/consent";

// IDs are interpolated into inline scripts, so strip anything that is not an ID character.
const clean = (value: string | undefined) => (value ?? "").replace(/[^\w-]/g, "");

const GA4_ID = clean(process.env.NEXT_PUBLIC_GA4_ID);
const ADS_ID = clean(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID);
const PIXEL_ID = clean(process.env.NEXT_PUBLIC_META_PIXEL_ID);

/**
 * GA4 + Google Ads (gtag) and Meta Pixel via next/script (TRD §8). Renders nothing unless the ID is set in .env
 * AND the visitor has accepted cookies in CookieNotice (choice stored in localStorage by lib/consent.ts).
 */
export default function Analytics() {
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    setConsent(readConsent());
    const onChange = (event: Event) => setConsent((event as CustomEvent<ConsentState>).detail);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (consent !== "accepted") return null;

  const gtagId = GA4_ID || ADS_ID;

  return (
    <>
      {gtagId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());${
              GA4_ID ? `gtag('config','${GA4_ID}');` : ""
            }${ADS_ID ? `gtag('config','${ADS_ID}');` : ""}`}
          </Script>
        </>
      ) : null}
      {PIXEL_ID ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      ) : null}
    </>
  );
}
