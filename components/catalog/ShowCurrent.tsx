"use client";

import { useEffect } from "react";

/**
 * On a phone the filter options sit in a row that scrolls sideways. This
 * brings the chosen one into view, so the choice is never hidden off-screen.
 */
export function ShowCurrent({ id }: { id: string }) {
  useEffect(() => {
    // Scrolls only the row, never the page.
    document
      .getElementById(id)
      ?.querySelectorAll<HTMLElement>("[aria-current]")
      .forEach((el) => {
        const row = el.closest("ul");
        if (!row || row.scrollWidth <= row.clientWidth) return;
        const box = el.getBoundingClientRect();
        const frame = row.getBoundingClientRect();
        row.scrollLeft += box.left - frame.left - (frame.width - box.width) / 2;
      });
  }, [id]);
  return null;
}
