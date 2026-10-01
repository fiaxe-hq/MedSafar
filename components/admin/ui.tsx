/** Small building blocks shared by every admin section. Server-rendered, no client JS. */

export const adminInput =
  "min-h-11 w-full rounded-md border border-line bg-surface px-3 text-base text-ink focus:border-accent focus:ring-4 focus:ring-accent/10 focus:outline-none";

const button =
  "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md px-4 text-sm font-medium whitespace-nowrap transition-colors";

export const adminButton = {
  primary: `${button} bg-cta text-cta-ink hover:bg-cta-hover`,
  quiet: `${button} border border-line bg-surface text-ink hover:bg-surface-2`,
  danger: `${button} border border-line bg-surface text-danger hover:bg-danger-soft`,
};

export function AdminHeading({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-[-0.02em]">{title}</h1>
      {intro ? <p className="mt-3 text-base text-ink-2">{intro}</p> : null}
    </div>
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
