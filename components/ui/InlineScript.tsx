"use client";

/**
 * An inline script that runs during HTML parsing on a full page load.
 * React warns when rendering produces a <script> in the browser, so on the
 * client it is typed as plain text and never runs (the type mismatch is
 * expected, hence suppressHydrationWarning). The pattern from Next's guide
 * "Preventing flash before hydration".
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
