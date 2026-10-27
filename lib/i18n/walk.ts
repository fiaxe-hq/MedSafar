/**
 * Turns the English content into a flat list of sentences to translate, and
 * lays a translation back over it.
 *
 * Every sentence has a path, such as "treatments.knee-replacement.summary".
 * A record with a slug (or failing that an id) is addressed by it rather than
 * by its position, so a translation keeps working when records are added or
 * reordered. Anything that
 * is not reader-facing text (slugs, links, photos, codes) is left alone.
 */

export type Dict = Record<string, string>;

/** Keys whose values are never shown as text. */
const codeKeys = new Set([
  "slug",
  "href",
  "src",
  "poster",
  "youtube",
  "iso",
  "code",
  "network",
  "number",
  "id",
  "icon",
  "focus",
  "kind",
  "type",
  "speciality",
  "specialities",
  "hospital",
  "hospitals",
  "doctors",
  "treatments",
  "related",
  "category",
  "date",
  "menu",
  "area",
  "areas",
  "currency",
  "gstin",
]);

/** Values that are links, slugs, numbers or addresses rather than prose. */
function isCode(value: string): boolean {
  return (
    value.trim() === "" ||
    /^[a-z0-9]+(-[a-z0-9]+)*$/.test(value) ||
    /^(\/|#|https?:|mailto:|tel:)/.test(value) ||
    /^[^\s@]+@[^\s@]+$/.test(value) ||
    /^[+\d\s().%-]+$/.test(value) ||
    /^\d{4}-\d{2}-\d{2}/.test(value)
  );
}

/** A list of slugs or codes, such as a hospital's specialities. */
const isCodeList = (key: string, list: unknown[]) => codeKeys.has(key) && list.every((item) => typeof item === "string");

function segment(item: unknown, index: number): string {
  if (item && typeof item === "object") {
    if ("slug" in item && typeof item.slug === "string") return item.slug;
    if ("id" in item && typeof item.id === "string") return item.id;
  }
  return String(index);
}

/** Every reader-facing sentence in `value`, by path. */
export function flatten(value: unknown, path = "", out: Dict = {}, key = ""): Dict {
  if (typeof value === "string") {
    if (!codeKeys.has(key) && !isCode(value)) out[path] = value;
  } else if (Array.isArray(value)) {
    if (isCodeList(key, value)) return out;
    value.forEach((item, i) => flatten(item, `${path}.${segment(item, i)}`, out, key));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) flatten(v, path ? `${path}.${k}` : k, out, k);
  }
  return out;
}

/** A copy of `value` with every sentence the translation has swapped in. */
export function localize<T>(value: T, dict: Dict, path = "", key = ""): T {
  if (typeof value === "string") {
    const text = dict[path];
    return (text && !codeKeys.has(key) && !isCode(value) ? text : value) as T;
  }
  if (Array.isArray(value)) {
    if (isCodeList(key, value)) return value;
    return value.map((item, i) => localize(item, dict, `${path}.${segment(item, i)}`, key)) as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = localize(v, dict, path ? `${path}.${k}` : k, k);
    return out as T;
  }
  return value;
}
