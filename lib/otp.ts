import { cookies } from "next/headers";
import { env } from "./cloudflare";
import { sendOtpSms, smsReady } from "./sms";

/**
 * Mobile number check: a one-time code is sent to the number and typed back
 * before an enquiry is saved.
 *
 * The code itself is never stored. The browser gets a signed note of (number,
 * code, expiry) in an httpOnly cookie, and the typed code is checked by
 * signing it again: only the right code gives the same signature, and the
 * note cannot be forged without OTP_SECRET. A checked number is remembered
 * in a second signed cookie for a week, so a returning visitor is not asked
 * again. All limits are counted on the server, in D1.
 */

const CODE_DIGITS = 6;
/** How long a code works after it is sent. */
const CODE_TTL_MS = 10 * 60 * 1000;
/** Shortest gap between two sends to one browser, against double taps. */
export const RESEND_AFTER_S = 30;
/** How long a checked number skips the code step in this browser. */
const VERIFIED_TTL_MS = 7 * 24 * 60 * 60 * 1000;

/** Wrong codes allowed per number. */
const MAX_ATTEMPTS_PER_HOUR = 5;
const MAX_ATTEMPTS_PER_DAY = 10;
/** Codes sent per number, per connection and for the whole site. */
const MAX_SENDS_PER_PHONE_PER_HOUR = 4;
const MAX_SENDS_PER_PHONE_PER_DAY = 8;
const MAX_SENDS_PER_IP_PER_HOUR = 10;
const MAX_SENDS_PER_IP_PER_DAY = 30;
const MAX_SENDS_SITE_WIDE_PER_DAY = 500;

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

const CHALLENGE_COOKIE = "otp_challenge";
const COOLDOWN_COOKIE = "otp_cooldown";
const VERIFIED_COOKIE = "verified_phone";

/**
 * The code step is on wherever codes can be delivered: locally (where they
 * go to the dev server's log) and, once a provider is wired in, on the
 * Worker. Until then the Worker saves enquiries without it.
 */
export function otpRequired(): boolean {
  return smsReady() || process.env.NODE_ENV !== "production";
}

export type PhoneCheck =
  | "verified"
  /** A code was just sent; the visitor should type it. */
  | "sent"
  /** Wrong code. */
  | "code"
  /** No live code for this number: it expired, or none was sent. */
  | "expired"
  /** Too many wrong codes for this number. */
  | "attempts"
  /** Too many codes sent to this number or from this connection. */
  | "sendLimit"
  /** A code went out moments ago. */
  | "wait"
  /** The code could not be delivered. */
  | "sms";

/**
 * Has this browser proved it holds `phone` (E.164)? If not: with a `code`,
 * checks it; without one, sends a new code.
 */
export async function checkPhone(
  phone: string,
  ipHash: string | null,
  code: string | null,
): Promise<PhoneCheck> {
  if (!otpRequired()) return "verified";
  const jar = await cookies();
  if ((await readVerified(jar.get(VERIFIED_COOKIE)?.value)) === phone) return "verified";
  return code === null ? sendCode(phone, ipHash) : checkCode(phone, code);
}

async function sendCode(phone: string, ipHash: string | null): Promise<PhoneCheck> {
  const jar = await cookies();
  const cooldownUntil = Number(jar.get(COOLDOWN_COOKIE)?.value);
  if (Number.isSafeInteger(cooldownUntil) && Date.now() < cooldownUntil) return "wait";

  const sendId = await claimSend(phone, ipHash ?? "unknown");
  if (sendId === null) return "sendLimit";

  const code = createCode();
  let delivered = false;
  try {
    delivered = await sendOtpSms(phone, code);
  } catch (error) {
    console.error("[otp] send failed", error instanceof Error ? error.message : String(error));
  }
  if (!delivered) {
    await releaseRow("otp_sends", sendId).catch(() => {});
    return "sms";
  }

  const expiresAt = Date.now() + CODE_TTL_MS;
  jar.set(CHALLENGE_COOKIE, await createChallenge(phone, code, expiresAt), cookieOptions(CODE_TTL_MS));
  jar.set(COOLDOWN_COOKIE, String(Date.now() + RESEND_AFTER_S * 1000), cookieOptions(RESEND_AFTER_S * 1000));
  return "sent";
}

async function checkCode(phone: string, code: string): Promise<PhoneCheck> {
  const jar = await cookies();
  const challenge = parseChallenge(jar.get(CHALLENGE_COOKIE)?.value);
  // Only a genuine, live code sent to this number may use up one of its
  // attempts; otherwise anyone could lock a real visitor out with junk.
  if (
    !challenge ||
    Date.now() > challenge.expiresAt ||
    !(await verify(`otp-owner:${phone}:${challenge.expiresAt}`, challenge.owner))
  ) {
    return "expired";
  }

  const attemptId = await claimAttempt(phone);
  if (attemptId === null) return "attempts";

  const typed = code.replace(/\D/g, "");
  const matches =
    typed.length === CODE_DIGITS &&
    (await verify(`otp-code:${phone}:${typed}:${challenge.expiresAt}`, challenge.code));
  if (!matches) return "code";

  // A right code does not count against the limit.
  await releaseRow("otp_attempts", attemptId).catch(() => {});
  jar.delete(CHALLENGE_COOKIE);
  const until = Date.now() + VERIFIED_TTL_MS;
  jar.set(VERIFIED_COOKIE, `${phone}.${until}.${await sign(`verified:${phone}:${until}`)}`, cookieOptions(VERIFIED_TTL_MS));
  return "verified";
}

function cookieOptions(ttlMs: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: Math.floor(ttlMs / 1000),
  };
}

// Codes and signatures

function createCode(): string {
  const range = 10 ** CODE_DIGITS;
  // Drop the top slice of the range so every code is equally likely.
  const limit = 2 ** 32 - (2 ** 32 % range);
  const value = new Uint32Array(1);
  do crypto.getRandomValues(value);
  while (value[0] >= limit);
  return String(value[0] % range).padStart(CODE_DIGITS, "0");
}

let keyPromise: Promise<CryptoKey> | null = null;

/** OTP_SECRET has no fallback: reusing another key would let a leak of it forge these cookies. */
function key(): Promise<CryptoKey> {
  const secret = (env().OTP_SECRET ?? "").trim();
  if (!secret) throw new Error("Set OTP_SECRET (any long random string) to sign OTP cookies.");
  keyPromise ??= crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
  return keyPromise;
}

async function sign(payload: string): Promise<string> {
  const bytes = await crypto.subtle.sign("HMAC", await key(), new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Constant-time check of a hex signature. */
async function verify(payload: string, signature: string): Promise<boolean> {
  if (!/^[0-9a-f]{64}$/.test(signature)) return false;
  const bytes = new Uint8Array(signature.match(/../g)!.map((h) => parseInt(h, 16)));
  return crypto.subtle.verify("HMAC", await key(), bytes, new TextEncoder().encode(payload));
}

/**
 * "<expiresAt>.<owner>.<code>": `owner` ties the challenge to one number
 * without the code, so a forged or foreign cookie is turned away before it
 * costs that number an attempt.
 */
async function createChallenge(phone: string, code: string, expiresAt: number): Promise<string> {
  return [
    expiresAt,
    await sign(`otp-owner:${phone}:${expiresAt}`),
    await sign(`otp-code:${phone}:${code}:${expiresAt}`),
  ].join(".");
}

function parseChallenge(value: string | undefined) {
  const [expiresAtText, owner, code, ...rest] = (value ?? "").split(".");
  const expiresAt = Number(expiresAtText);
  if (rest.length || !Number.isSafeInteger(expiresAt) || !owner || !code) return null;
  return { expiresAt, owner, code };
}

/** The number inside a verified-phone cookie, or null if it is forged or expired. */
async function readVerified(value: string | undefined): Promise<string | null> {
  const [phone, untilText, signature, ...rest] = (value ?? "").split(".");
  const until = Number(untilText);
  if (rest.length || !/^\+\d{6,15}$/.test(phone ?? "") || !Number.isSafeInteger(until) || !signature) {
    return null;
  }
  if (Date.now() > until || !(await verify(`verified:${phone}:${until}`, signature))) return null;
  return phone;
}

// Limits. Each count and its insert are one statement, so parallel requests
// cannot all slip past a limit together.

async function claimSend(phone: string, ipHash: string): Promise<number | null> {
  const now = Date.now();
  const db = env().LEADS_DB;
  const [, claim] = await db.batch([
    db.prepare("DELETE FROM otp_sends WHERE sent_at < ?").bind(now - DAY_MS),
    db
      .prepare(
        `INSERT INTO otp_sends (phone, ip_hash, sent_at)
         SELECT ?1, ?2, ?3
         WHERE (SELECT COUNT(*) FROM otp_sends WHERE phone = ?1 AND sent_at >= ?4) < ?5
           AND (SELECT COUNT(*) FROM otp_sends WHERE phone = ?1 AND sent_at >= ?6) < ?7
           AND (SELECT COUNT(*) FROM otp_sends WHERE ip_hash = ?2 AND sent_at >= ?4) < ?8
           AND (SELECT COUNT(*) FROM otp_sends WHERE ip_hash = ?2 AND sent_at >= ?6) < ?9
           AND (SELECT COUNT(*) FROM otp_sends WHERE sent_at >= ?6) < ?10`,
      )
      .bind(
        phone,
        ipHash,
        now,
        now - HOUR_MS,
        MAX_SENDS_PER_PHONE_PER_HOUR,
        now - DAY_MS,
        MAX_SENDS_PER_PHONE_PER_DAY,
        MAX_SENDS_PER_IP_PER_HOUR,
        MAX_SENDS_PER_IP_PER_DAY,
        MAX_SENDS_SITE_WIDE_PER_DAY,
      ),
  ]);
  return claim.meta.changes === 1 ? Number(claim.meta.last_row_id) : null;
}

async function claimAttempt(phone: string): Promise<number | null> {
  const now = Date.now();
  const db = env().LEADS_DB;
  const [, claim] = await db.batch([
    db.prepare("DELETE FROM otp_attempts WHERE attempted_at < ?").bind(now - DAY_MS),
    db
      .prepare(
        `INSERT INTO otp_attempts (phone, attempted_at)
         SELECT ?1, ?2
         WHERE (SELECT COUNT(*) FROM otp_attempts WHERE phone = ?1 AND attempted_at >= ?3) < ?4
           AND (SELECT COUNT(*) FROM otp_attempts WHERE phone = ?1 AND attempted_at >= ?5) < ?6`,
      )
      .bind(phone, now, now - HOUR_MS, MAX_ATTEMPTS_PER_HOUR, now - DAY_MS, MAX_ATTEMPTS_PER_DAY),
  ]);
  return claim.meta.changes === 1 ? Number(claim.meta.last_row_id) : null;
}

async function releaseRow(table: "otp_sends" | "otp_attempts", id: number): Promise<void> {
  await env().LEADS_DB.prepare(`DELETE FROM ${table} WHERE id = ?`).bind(id).run();
}
