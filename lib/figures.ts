/**
 * How the trust figures (published in /admin/stats) are shown, on the home
 * page and in the admin preview, so any value the team types fits its box.
 */

/**
 * Long plain numbers get Indian-style commas: the last three digits, then
 * every two ("45615153" -> "4,56,15,153"). Done on the text itself, so a
 * number of any length keeps every digit exactly as typed.
 */
export function formatFigure(value: string): string {
  const v = value.trim();
  if (!/^\d{5,}$/.test(v)) return v;
  const last = v.slice(-3);
  const rest = v.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `${rest},${last}`;
}

/**
 * One text size for the whole row, set by its longest value, so the figures
 * match each other and the longest still fits (values are at most 24 characters).
 */
export function figureSize(values: string[]): string {
  const longest = Math.max(0, ...values.map((v) => formatFigure(v).length));
  if (longest <= 5) return "text-4xl sm:text-5xl";
  if (longest <= 8) return "text-3xl sm:text-4xl";
  if (longest <= 12) return "text-2xl sm:text-3xl";
  return "text-xl sm:text-2xl";
}
