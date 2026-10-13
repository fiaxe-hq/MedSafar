/**
 * Work not yet shown to the client. The client preview build sets
 * HIDE_UPCOMING to "1" in next.config.ts: these sections then stay out of the
 * pages, and the pages below redirect to /coming-soon. Everywhere else, they
 * show.
 */
export const showUpcoming = process.env.HIDE_UPCOMING !== "1";

/** Pages added since the last client review. */
export const upcomingPages = [
  "/specialities",
  "/questionnaires",
  "/cancellations",
  "/disclaimer",
  "/editorial-policy",
];

/** True for a link to one of the pages above, while they are hidden. */
export function hiddenLink(href: string): boolean {
  return !showUpcoming && upcomingPages.some((page) => href === page || href.startsWith(`${page}/`));
}
