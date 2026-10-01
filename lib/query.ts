/** A search parameter can arrive once, several times or not at all. */
export function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}
