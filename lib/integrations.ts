/**
 * Which third-party services are actually configured in this build (NEXT_PUBLIC_* env vars, inlined at build time).
 * The legal pages read these so the Privacy Policy only names services the site really uses.
 * Same ID rule as components/analytics/Analytics.tsx: an empty or non-ID value counts as "not configured".
 */
const clean = (value: string | undefined) => (value ?? "").replace(/[^\w-]/g, "");

export const hasWeb3Forms = (process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "").trim().length > 0;
export const hasGa4 = clean(process.env.NEXT_PUBLIC_GA4_ID).length > 0;
export const hasGoogleAds = clean(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID).length > 0;
export const hasMetaPixel = clean(process.env.NEXT_PUBLIC_META_PIXEL_ID).length > 0;
export const hasAnalytics = hasGa4 || hasGoogleAds || hasMetaPixel;
