"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { figureSize, formatFigure } from "@/lib/figures";

type Figure = { key: string; label: string; value: string };

/**
 * The row of proof figures published in /admin/stats. Fetched in the browser so
 * the home page stays pre-built. With none published (or if the fetch fails) it
 * renders nothing, so no empty gap and no zeros are ever shown.
 */
export function TrustFigures() {
  const [figures, setFigures] = useState<Figure[]>([]);

  useEffect(() => {
    let live = true;
    // The page's language, so the labels come in it where /admin has a translation.
    fetch(`/api/figures?lang=${encodeURIComponent(document.documentElement.lang || "en")}`)
      .then((r) => (r.ok ? (r.json() as Promise<Figure[]>) : []))
      .then((rows) => live && Array.isArray(rows) && setFigures(rows))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  if (figures.length === 0) return null;

  return (
    <section aria-label="Med Safar in numbers" className="border-b border-hairline bg-surface py-8">
      <Container>
        {/* Centred, whatever the count: one figure sits in the middle, two or
            three spread evenly, more wrap onto a second centred line. Each has
            the same width, and the text size follows the longest value. */}
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-8 text-center sm:gap-x-12">
          {figures.map((f) => (
            <li key={f.key} className="w-[9.5rem] min-w-0 sm:w-56">
              <p
                className={`font-display leading-none font-medium tracking-[-0.03em] text-accent tabular-nums [overflow-wrap:anywhere] ${figureSize(
                  figures.map((x) => x.value),
                )}`}
              >
                {formatFigure(f.value)}
              </p>
              <p className="mt-2 text-sm text-balance text-ink-2 [overflow-wrap:anywhere]">{f.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
