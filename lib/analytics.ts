/**
 * Cloudflare Web Analytics: page views and visitors, with no cookies, so no
 * consent banner is needed.
 *
 * Paste the site token from Cloudflare dashboard → Analytics & Logs → Web
 * Analytics → Add a site. The token is public (it ships in every page), so it
 * lives here rather than in a secret. While it is null, nothing is loaded.
 */
export const analyticsToken: string | null = null;
