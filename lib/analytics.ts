/**
 * Cloudflare Web Analytics: page views and visitors, with no cookies, so no
 * consent banner is needed.
 *
 * Paste the site token from Cloudflare dashboard → Analytics & Logs → Web
 * Analytics → Add a site. The token is public (it ships in every page), so it
 * lives here rather than in a secret. While it is null, nothing is loaded.
 */
export const analyticsToken: string | null = null;

/**
 * Google Analytics 4: the measurement ID of the site's web stream, such as
 * "G-AB12CD34EF" (Google Analytics → Admin → Data streams → the stream).
 * It is public, so it lives here. Google Analytics sets cookies, so it loads
 * only after the visitor accepts them (components/site/CookieBanner.tsx).
 * While it is null, nothing is loaded.
 */
export const gaId: string | null = null;
