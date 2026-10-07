/** Small building blocks shared by every admin section. Server-rendered, no client JS. */

export const adminInput =
  "min-h-11 w-full rounded-md border border-line bg-surface px-3.5 text-base text-ink transition-[border-color,box-shadow] placeholder:text-ink-3 focus:border-accent focus:ring-4 focus:ring-accent/10 focus:outline-none";

export const adminLabel = "block text-sm font-medium text-ink-2";

const button =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md px-4 text-sm font-medium whitespace-nowrap transition-[background-color,color,border-color,box-shadow,scale] duration-300 ease-(--ease-soft) active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40";

export const adminButton = {
  primary: `${button} bg-cta text-cta-ink hover:bg-cta-hover hover:shadow-card`,
  quiet: `${button} border border-line bg-surface text-ink hover:border-accent hover:bg-surface-2`,
  danger: `${button} border border-danger-line bg-surface text-danger hover:bg-danger-soft`,
  /** Square, icon only. Give it an aria-label. */
  icon: `${button} size-11 border border-line bg-surface px-0 text-ink-2 hover:border-accent hover:bg-surface-2 hover:text-ink`,
};

export const adminCard = "rounded-lg border border-hairline bg-surface";

export function AdminHeading({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Actions shown at the end of the row on wide screens. */
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-accent">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="display-2 mt-2">{title}</h1>
        {intro ? <p className="mt-3 text-base text-ink-2">{intro}</p> : null}
      </div>
      {children}
    </div>
  );
}

/** One figure in a row of summary tiles. */
export function AdminTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className={`${adminCard} flex flex-col-reverse p-5`}>
      {hint ? <p className="order-first mt-1 text-sm text-ink-3">{hint}</p> : null}
      <dt className="mt-2 text-sm font-medium text-ink-2">{label}</dt>
      <dd className="numeral text-accent">{value}</dd>
    </div>
  );
}

export function AdminBadge({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "good";
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.8125rem] font-medium whitespace-nowrap ${
        tone === "good" ? "bg-accent-soft text-accent" : "bg-surface-2 text-ink-3 ring-1 ring-hairline"
      }`}
    >
      <span
        aria-hidden
        className={`size-1.5 rounded-full ${tone === "good" ? "bg-brand" : "bg-line"}`}
      />
      {children}
    </span>
  );
}

export function AdminNotice({
  tone = "info",
  children,
}: {
  tone?: "info" | "error";
  children: React.ReactNode;
}) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={`mt-6 rounded-md border px-4 py-3 text-sm ${
        tone === "error"
          ? "border-danger-line bg-danger-soft text-danger"
          : "border-hairline bg-accent-quiet text-ink"
      }`}
    >
      {children}
    </p>
  );
}
