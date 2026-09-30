import type { Metadata, Viewport } from "next";
import "./globals.css";
import type { CSSProperties } from "react";
import { fontClassName, fontStyle } from "@/lib/fonts";
import { hoverCssVars } from "@/lib/motion";
import { SITE_URL, THEME_COLOR, company } from "@/content/company";
import { localBusinessJsonLd, organizationJsonLd } from "@/lib/seo";
import ThemeProvider from "@/components/layout/ThemeProvider";
import SmoothScrollProvider from "@/components/animations/SmoothScrollProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/layout/MobileActionBar";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import CookieNotice from "@/components/layout/CookieNotice";
import CustomCursor from "@/components/animations/CustomCursor";
import PageTransition from "@/components/animations/PageTransition";
import AutoReveal from "@/components/animations/AutoReveal";
import Analytics from "@/components/analytics/Analytics";
import JsonLd from "@/components/seo/JsonLd";

/** Site-wide defaults only. Every page overrides title + description via buildMetadata() (lib/seo.ts). */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: company.name,
  formatDetection: { telephone: false },
  icons: {
    icon: [{ url: "/logo/favicon.png", type: "image/png" }],
    shortcut: "/logo/favicon.png",
    apple: "/logo/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
};

/** Font families (lib/fonts.ts) + hover-system values (lib/motion.ts) as CSS custom properties. */
const htmlStyle = { ...fontStyle, ...hoverCssVars } as CSSProperties;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // `dark` is the SSR default (and the no-JS theme); next-themes' pre-paint script swaps it if the visitor chose light.
    <html lang="en-IN" className={`dark ${fontClassName}`} style={htmlStyle} suppressHydrationWarning>
      <body>
        <noscript>
          <style>{"[data-hero-item]{opacity:1!important}[data-image-slot]{opacity:1!important}[data-image-reveal]{opacity:1!important;transform:none!important;filter:none!important}[data-flow=cover]{transform:scale(0)!important}"}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only z-[70] rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
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
            <CustomCursor />
            <PageTransition />
            <AutoReveal />
          </SmoothScrollProvider>
        </ThemeProvider>
        <Analytics />
        <JsonLd data={[organizationJsonLd(), localBusinessJsonLd()]} />
      </body>
    </html>
  );
}