import type { FormContent } from "@/content/types";

/** The message for a refused step, in the visitor's language. */
export function formError(text: FormContent, error: string | null | undefined): string | null {
  if (!error) return null;
  const errors: Record<string, string> = text.errors;
  return errors[error] ?? text.errors.generic;
}
