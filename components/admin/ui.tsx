/** Small building blocks shared by every admin section. No client JS, so they work in the editors too. */

export const adminInput =
  "min-h-11 w-full rounded-md border border-line bg-surface px-3.5 text-base text-ink transition-[border-color,box-shadow] placeholder:text-ink-3 focus:border-accent focus:ring-4 focus:ring-accent/10 focus:outline-none";

export const adminLabel = "block text-sm font-medium text-ink-2";

const button =
  "inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-md px-4 text-sm font-medium whitespace-nowrap transition-[background-color,color,border-color,box-shadow,scale] duration-300 ease-(--ease-soft) active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40";

export const adminButton = {
  primary: `${button} bg-cta text-cta-ink shadow-[0_1px_2px_rgb(6_41_31/0.18),inset_0_1px_0_rgb(255_255_255/0.12)] hover:bg-cta-hover`,
  quiet: `${button} border border-hairline bg-surface text-ink shadow-[0_1px_2px_rgb(11_61_49/0.05)] hover:border-line hover:bg-surface-2`,
  danger: `${button} border border-danger-line bg-surface text-danger hover:bg-danger-soft`,
  /** Square, icon only. Give it an aria-label. */
  icon: `${button} size-10 border border-hairline bg-surface px-0 text-ink-2 hover:border-accent hover:bg-surface-2 hover:text-ink`,
};

export const adminCard =
  "rounded-xl border border-hairline bg-surface shadow-[0_1px_2px_rgb(11_61_49/0.04)]";

/** Page titles, in the header and in the editors. */
export const adminTitle = "font-display text-[1.75rem] leading-tight font-semibold tracking-[-0.02em] text-ink sm:text-[2rem]";

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
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-b border-hairline pb-6">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="text-[0.8125rem] font-medium text-ink-3">{eyebrow}</p>
        ) : null}
        <h1 className={`${adminTitle} ${eyebrow ? "mt-1" : ""}`}>{title}</h1>
        {intro ? <p className="mt-2 text-[0.9375rem] text-ink-2">{intro}</p> : null}
      </div>
      {children ? <div className="flex flex-wrap items-center gap-2">{children}</div> : null}
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
    <div className={`${adminCard} p-5`}>
      <dt className="text-sm font-medium text-ink-3">{label}</dt>
      <dd className="mt-2 font-display text-[2rem] leading-none font-semibold tracking-[-0.02em] text-ink tabular-nums">{value}</dd>
      {hint ? <dd className="mt-2 text-sm text-ink-3">{hint}</dd> : null}
    </div>
  );
}

const badgeTones = {
  good: { box: "bg-accent-soft text-accent", dot: "bg-brand" },
  neutral: { box: "bg-surface-2 text-ink-3 ring-1 ring-hairline", dot: "bg-line" },
  warn: { box: "bg-amber-50 text-amber-800 ring-1 ring-amber-200", dot: "bg-amber-500" },
  off: { box: "bg-danger-soft text-danger ring-1 ring-danger-line", dot: "bg-danger" },
};

export function AdminBadge({
  tone = "neutral",
  children,
}: {
  tone?: keyof typeof badgeTones;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.8125rem] font-medium whitespace-nowrap ${badgeTones[tone].box}`}
    >
      <span aria-hidden className={`size-1.5 rounded-full ${badgeTones[tone].dot}`} />
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
      className={`mt-6 rounded-lg border px-4 py-3 text-sm ${
        tone === "error"
          ? "border-danger-line bg-danger-soft text-danger"
          : "border-hairline bg-accent-quiet text-ink"
      }`}
    >
      {children}
    </p>
  );
}

/** A time as the team reads it: Indian time, day and month written out. */
export function adminWhen(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
}
