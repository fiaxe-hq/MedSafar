/** Label and value rows, for the plain facts on a detail page. */
export function Facts({
  items,
  className = "",
}: {
  items: { label: string; value: React.ReactNode }[];
  className?: string;
}) {
  return (
    <dl className={`border-t border-hairline ${className}`}>
      {items.map((item) => (
        <div
          key={item.label}
          className="grid gap-1 border-b border-hairline py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
        >
          <dt className="text-sm text-ink-3 sm:pt-0.5">{item.label}</dt>
          <dd className="text-base text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Several short values in one row, one per line. */
export function Lines({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
