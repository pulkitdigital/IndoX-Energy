import type { Metadata, Viewport } from "next";
import "./globals.css";
import { bodyFont, headingFont, labelFont } from "@/app/fonts";
import { COMPANY, SITE_URL, THEME_COLOR } from "@/lib/constants";
import { localBusinessJsonLd, organizationJsonLd } from "@/lib/seo";
import ThemeProvider from "@/components/layout/ThemeProvider";
import SmoothScrollProvider from "@/components/animations/SmoothScrollProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/layout/MobileActionBar";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import CookieNotice from "@/components/layout/CookieNotice";
import Analytics from "@/components/layout/Analytics";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY.name} — ${COMPANY.positioning}`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    "IndoX Energy supplies diesel from authorized sources with metered doorstep delivery, smart storage tanks, dispensing, IoT fuel monitoring and EV charging infrastructure across India.",
  applicationName: COMPANY.name,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // `dark` is the SSR default (also the no-JS theme); next-themes' pre-paint script swaps it if the visitor chose light.
    <html lang="en-IN" className={`dark ${headingFont.variable} ${bodyFont.variable} ${labelFont.variable}`} suppressHydrationWarning>
      <body>
        <noscript>
          <style>{"[data-image-slot]{opacity:1!important}[data-image-wipe]{display:none!important}"}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only z-[70] rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <SmoothScrollProvider>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <MobileActionBar />
            <WhatsAppFloat />
            <CookieNotice />
          </SmoothScrollProvider>
        </ThemeProvider>
        <Analytics />
        <JsonLd data={[organizationJsonLd(), localBusinessJsonLd()]} />
      </body>
    </html>
  );
}
