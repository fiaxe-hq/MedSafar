/**
 * Control styles.
 *
 * Shape rule for the whole site: buttons and inputs are rounded-md, cards are
 * rounded-lg. Nothing deviates.
 * Every control is at least 52px high, because most visitors are on a phone.
 */

const btnBase =
  "inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-md px-5 text-base sm:px-7 font-medium whitespace-nowrap transition-[background-color,color,translate,scale,border-color,box-shadow] duration-300 ease-(--ease-soft) active:scale-[0.98] disabled:pointer-events-none disabled:opacity-55";

export const btnPrimary = `${btnBase} bg-cta text-cta-ink hover:-translate-y-0.5 hover:bg-cta-hover hover:shadow-lift`;

export const btnQuiet = `${btnBase} border border-line bg-surface text-ink hover:-translate-y-0.5 hover:border-accent hover:bg-surface-2 hover:shadow-card`;

export const btnPlain = `${btnBase} px-0 text-accent hover:translate-x-0.5 hover:text-accent-hover rtl:hover:-translate-x-0.5`;

export const field =
  "min-h-13 w-full rounded-md border border-line bg-surface px-4 text-base text-ink transition-[border-color,box-shadow] placeholder:text-ink-3 focus:border-accent focus:ring-4 focus:ring-accent/10 focus:outline-none";

export const label = "block text-base font-medium text-ink";

export const card = "rounded-lg border border-hairline bg-surface";

/** Small uppercase caption used for the one eyebrow the page is allowed. */
export const eyebrow =
  "text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-accent";
