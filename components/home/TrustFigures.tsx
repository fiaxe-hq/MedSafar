"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";

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
    fetch("/api/figures")
      .then((r) => (r.ok ? (r.json() as Promise<Figure[]>) : []))
      .then((rows) => live && Array.isArray(rows) && setFigures(rows))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  if (figures.length === 0) return null;

  return (
    <section aria-label="Medsafar in numbers" className="border-b border-hairline bg-surface py-8">
      <Container>
        <ul className="grid grid-cols-2 gap-6 text-center sm:grid-cols-3 lg:grid-cols-4">
          {figures.map((f) => (
            <li key={f.key}>
              <p className="numeral text-3xl text-accent sm:text-4xl">{f.value}</p>
              <p className="mt-1 text-sm text-ink-2">{f.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
