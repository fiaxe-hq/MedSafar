import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/lib/cloudflare";

/**
 * Admin sign-in.
 *
 * Every admin page, Server Action and download needs this session: a shared
 * password (the ADMIN_PASSWORD Worker secret) exchanged for a signed,
 * httpOnly cookie. Cloudflare Access can sit in front of /admin as well once
 * the site is on a custom domain (see README).
 *
 * The cookie is signed with the password itself, so changing the secret signs
 * everyone out. With no usable secret, nobody can sign in.
 */

const COOKIE = "medsafar_admin";
const MAX_AGE_SECONDS = 12 * 60 * 60;
export const MIN_PASSWORD_LENGTH = 8;

const encoder = new TextEncoder();

/** Whether the ADMIN_PASSWORD secret is usable, so a bad setup is reported, not mistaken for a wrong password. */
export function passwordSetup(): "ok" | "missing" | "too-short" {
  const value = env().ADMIN_PASSWORD;
  if (typeof value !== "string" || value.trim() === "") return "missing";
  return value.trim().length < MIN_PASSWORD_LENGTH ? "too-short" : "ok";
}

function secret(): string | null {
  return passwordSetup() === "ok" ? String(env().ADMIN_PASSWORD).trim() : null;
}

async function hmacKey(key: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function toBase64Url(bytes: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> | null {
  try {
    const binary = atob(value.replace(/-/g, "+").replace(/_/g, "/"));
    return Uint8Array.from(binary, (c) => c.charCodeAt(0));
  } catch {
    return null;
  }
}

/** Constant-time password check: HMAC(secret, input) against HMAC(secret, secret). */
async function passwordMatches(input: string, expected: string): Promise<boolean> {
  const key = await hmacKey(expected);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(expected));
  return crypto.subtle.verify("HMAC", key, signature, encoder.encode(input));
}

async function sessionSignature(expected: string, expires: number): Promise<ArrayBuffer> {
  return crypto.subtle.sign("HMAC", await hmacKey(expected), encoder.encode(`session:${expires}`));
}

/** True when the request carries a valid, unexpired admin session. */
export async function isAdmin(): Promise<boolean> {
  // Read the cookie first: it marks the route as per-request before the
  // Worker's bindings are touched.
  const value = (await cookies()).get(COOKIE)?.value;
  const expected = secret();
  if (!value || !expected) return false;

  const [expiresText, signatureText] = value.split(".");
  const expires = Number(expiresText);
  const signature = signatureText ? fromBase64Url(signatureText) : null;
  if (!Number.isFinite(expires) || expires < Date.now() || !signature) return false;

  return crypto.subtle.verify(
    "HMAC",
    await hmacKey(expected),
    signature,
    encoder.encode(`session:${expires}`),
  );
}

/** Use at the top of every admin page, Server Action and Route Handler. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
}

/** Checks the password and, if it matches, sets the session cookie. */
export async function signIn(password: string): Promise<boolean> {
  const expected = secret();
  if (!expected || !(await passwordMatches(password.trim(), expected))) return false;

  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const signature = toBase64Url(await sessionSignature(expected, expires));
  (await cookies()).set(COOKIE, `${expires}.${signature}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: MAX_AGE_SECONDS,
  });
  return true;
}

export async function signOut(): Promise<void> {
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
}
