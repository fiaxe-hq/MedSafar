import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import type { CountryCode, NumberType, PhoneNumber } from "libphonenumber-js/max";

/**
 * Checks a visitor's phone number on the server. The full ("max") metadata
 * checks each country's real number ranges, not just the length, and tells a
 * mobile from a premium-rate or toll-free line. It stays on the server, so
 * the browser never downloads it.
 */

/** Kinds of number a person can be reached on. Unknown kinds pass. */
const REACHABLE: (NumberType | undefined)[] = [
  "MOBILE",
  "FIXED_LINE_OR_MOBILE",
  "FIXED_LINE",
  "PERSONAL_NUMBER",
  "VOIP",
  undefined,
];

/**
 * The number, if it is a real, reachable one; otherwise null. `iso` may be
 * empty when the number is written with its country code (+91 or 0091).
 */
export function parsePhone(digits: string, iso: string): PhoneNumber | null {
  const written = digits.trim().replace(/^00/, "+");
  const parsed = parsePhoneNumberFromString(written, (iso.toUpperCase() || undefined) as CountryCode | undefined);
  if (!parsed || !parsed.isValid()) return null;
  if (!REACHABLE.includes(parsed.getType())) return null;
  if (looksMadeUp(parsed.nationalNumber)) return null;
  return parsed;
}

/** Filler numbers that fit some country's ranges: 9999999999, 9876543210. */
function looksMadeUp(national: string): boolean {
  if (new Set(national).size <= 2) return true;
  const steps = new Set<number>();
  for (let i = 1; i < national.length; i++) {
    steps.add((Number(national[i]) - Number(national[i - 1]) + 10) % 10);
  }
  return national.length >= 7 && steps.size === 1;
}
