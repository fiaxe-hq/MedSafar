import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/lib/cloudflare";
import { hashIp } from "@/lib/leads";

/**
 * Admin sign-in: one account per team member (table admin_users).
 *
 * Passwords are stored as PBKDF2 hashes. Signing in sets a signed, httpOnly
 * cookie naming the account and its session version; every admin page,
 * Server Action and download checks it against the database, so removing a
 * person or changing their password signs them out at once.
 *
 * The ADMIN_PASSWORD Worker secret is the setup key: it creates the first
 * account, and the session cookies are signed with a key derived from it, so
 * changing the secret signs everyone out. With no usable secret, nobody can
 * sign in. Cloudflare Access can sit in front of /admin as well (see README).
 */

const COOKIE = "medsafar_admin";
const MAX_AGE_SECONDS = 12 * 60 * 60;
export const MIN_PASSWORD_LENGTH = 10;
/** The setup key's own minimum, as before team logins. */
const MIN_SETUP_KEY_LENGTH = 8;

/** Workers allow at most 100,000 PBKDF2 iterations. */
const ITERATIONS = 100_000;

const LOCK_WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES_PER_EMAIL = 5;
const MAX_FAILURES_PER_IP = 20;

export type Role = "owner" | "editor";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  active: boolean;
  createdAt: string;
  lastSignInAt: string | null;
};

type UserRow = {
  id: string;
  email: string;
  name: string;
  role: string;
  password_hash: string;
  active: number;
  session_version: number;
  created_at: string;
  last_sign_in_at: string | null;
};

const encoder = new TextEncoder();

function db() {
  return env().LEADS_DB;
}

function toUser(row: UserRow): AdminUser {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role === "owner" ? "owner" : "editor",
    active: row.active === 1,
    createdAt: row.created_at,
    lastSignInAt: row.last_sign_in_at,
  };
}

export function normaliseEmail(email: string): string {
  return email.trim().toLowerCase();
}

// Setup key

/** Whether the ADMIN_PASSWORD secret is usable, so a bad setup is reported, not mistaken for a wrong password. */
export function passwordSetup(): "ok" | "missing" | "too-short" {
  const value = env().ADMIN_PASSWORD;
  if (typeof value !== "string" || value.trim() === "") return "missing";
  return value.trim().length < MIN_SETUP_KEY_LENGTH ? "too-short" : "ok";
}

function setupKey(): string | null {
  return passwordSetup() === "ok" ? String(env().ADMIN_PASSWORD).trim() : null;
}

// Hashing

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
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

async function pbkdf2(password: string, salt: Uint8Array<ArrayBuffer>, iterations: number): Promise<ArrayBuffer> {
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  return crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations }, key, 256);
}

/** "pbkdf2$<iterations>$<salt>$<hash>", all base64url. */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await pbkdf2(password, salt, ITERATIONS);
  return `pbkdf2$${ITERATIONS}$${toBase64Url(salt)}$${toBase64Url(hash)}`;
}

/** Constant-time comparison of the derived bits. */
async function passwordMatches(password: string, stored: string): Promise<boolean> {
  const [scheme, iterationsText, saltText, hashText] = stored.split("$");
  const iterations = Number(iterationsText);
  const salt = saltText ? fromBase64Url(saltText) : null;
  const expected = hashText ? fromBase64Url(hashText) : null;
  if (scheme !== "pbkdf2" || !Number.isInteger(iterations) || !salt || !expected) return false;
  const actual = new Uint8Array(await pbkdf2(password, salt, iterations));
  if (actual.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < actual.length; i++) diff |= actual[i] ^ expected[i];
  return diff === 0;
}

/** Spent on unknown emails too, so a wrong email takes as long as a wrong password. */
const DUMMY_HASH = "pbkdf2$100000$AAAAAAAAAAAAAAAAAAAAAA$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

// Sessions

async function sessionKey(): Promise<CryptoKey | null> {
  const key = setupKey();
  if (!key) return null;
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(`medsafar-admin-session:${key}`),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function setSession(user: { id: string }, version: number) {
  const key = await sessionKey();
  if (!key) return;
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = `${user.id}.${version}.${expires}`;
  const signature = toBase64Url(await crypto.subtle.sign("HMAC", key, encoder.encode(payload)));
  (await cookies()).set(COOKIE, `${payload}.${signature}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: MAX_AGE_SECONDS,
  });
}

/** The signed-in team member, or null. */
export async function currentAdmin(): Promise<AdminUser | null> {
  // Read the cookie first: it marks the route as per-request before the
  // Worker's bindings are touched.
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return null;
  const key = await sessionKey();
  if (!key) return null;

  const [id, versionText, expiresText, signatureText] = value.split(".");
  const version = Number(versionText);
  const expires = Number(expiresText);
  const signature = signatureText ? fromBase64Url(signatureText) : null;
  if (!id || !Number.isInteger(version) || !Number.isFinite(expires) || expires < Date.now() || !signature) {
    return null;
  }
  const valid = await crypto.subtle.verify("HMAC", key, signature, encoder.encode(`${id}.${version}.${expires}`));
  if (!valid) return null;

  const row = await db().prepare("SELECT * FROM admin_users WHERE id = ?").bind(id).first<UserRow>();
  if (!row || row.active !== 1 || row.session_version !== version) return null;
  return toUser(row);
}

export async function isAdmin(): Promise<boolean> {
  return (await currentAdmin()) !== null;
}

/** Use at the top of every admin page, Server Action and Route Handler. */
export async function requireAdmin(): Promise<AdminUser> {
  const user = await currentAdmin();
  if (!user) redirect("/admin/login");
  return user;
}

/** For the team pages: owners only. */
export async function requireOwner(): Promise<AdminUser> {
  const user = await requireAdmin();
  if (user.role !== "owner") redirect("/admin");
  return user;
}

export async function signOut(): Promise<void> {
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
}

// Sign-in

async function requestIpHash(): Promise<string> {
  const ip = (await headers()).get("cf-connecting-ip");
  return ip ? hashIp(ip) : "unknown";
}

export type SignInResult = "ok" | "wrong" | "locked" | "setup";

export async function signIn(emailInput: string, password: string): Promise<SignInResult> {
  if (!setupKey()) return "setup";
  const email = normaliseEmail(emailInput);
  const ipHash = await requestIpHash();
  const now = Date.now();
  const since = now - LOCK_WINDOW_MS;

  await db().prepare("DELETE FROM admin_sign_in_failures WHERE failed_at < ?").bind(now - 24 * 60 * 60 * 1000).run();
  const counts = await db()
    .prepare(
      `SELECT
         (SELECT COUNT(*) FROM admin_sign_in_failures WHERE email = ? AND failed_at > ?) AS by_email,
         (SELECT COUNT(*) FROM admin_sign_in_failures WHERE ip_hash = ? AND failed_at > ?) AS by_ip`,
    )
    .bind(email, since, ipHash, since)
    .first<{ by_email: number; by_ip: number }>();
  if ((counts?.by_email ?? 0) >= MAX_FAILURES_PER_EMAIL || (counts?.by_ip ?? 0) >= MAX_FAILURES_PER_IP) {
    return "locked";
  }

  const row = await db().prepare("SELECT * FROM admin_users WHERE email = ?").bind(email).first<UserRow>();
  const matches = await passwordMatches(password, row?.password_hash ?? DUMMY_HASH);
  if (!row || !matches || row.active !== 1) {
    await db()
      .prepare("INSERT INTO admin_sign_in_failures (email, ip_hash, failed_at) VALUES (?, ?, ?)")
      .bind(email, ipHash, now)
      .run();
    return "wrong";
  }

  await db()
    .prepare("UPDATE admin_users SET last_sign_in_at = ? WHERE id = ?")
    .bind(new Date(now).toISOString(), row.id)
    .run();
  await db().prepare("DELETE FROM admin_sign_in_failures WHERE email = ?").bind(email).run();
  await setSession(row, row.session_version);
  return "ok";
}

// First account

export async function hasAccounts(): Promise<boolean> {
  const row = await db().prepare("SELECT COUNT(*) AS n FROM admin_users").first<{ n: number }>();
  return (row?.n ?? 0) > 0;
}

/** Constant-time check of the setup key. */
async function setupKeyMatches(input: string): Promise<boolean> {
  const expected = setupKey();
  if (!expected) return false;
  const key = await crypto.subtle.importKey("raw", encoder.encode(expected), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(expected));
  return crypto.subtle.verify("HMAC", key, signature, encoder.encode(input.trim()));
}

export type NewAccount = { name: string; email: string; password: string };

/** Creates the first owner, only while there are no accounts at all. */
export async function createFirstOwner(key: string, account: NewAccount): Promise<AdminUser | "key" | "exists"> {
  if (await hasAccounts()) return "exists";
  if (!(await setupKeyMatches(key))) return "key";
  const user = await insertUser({ ...account, role: "owner" });
  await setSession(user, 1);
  return user;
}

// Team

export async function insertUser(input: NewAccount & { role: Role }): Promise<AdminUser> {
  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  await db()
    .prepare(
      "INSERT INTO admin_users (id, email, name, role, password_hash, active, session_version, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 1, 1, ?, ?)",
    )
    .bind(id, normaliseEmail(input.email), input.name.trim(), input.role, await hashPassword(input.password), now, now)
    .run();
  return { id, email: normaliseEmail(input.email), name: input.name.trim(), role: input.role, active: true, createdAt: now, lastSignInAt: null };
}

export async function listUsers(): Promise<AdminUser[]> {
  const { results } = await db().prepare("SELECT * FROM admin_users ORDER BY active DESC, name").all<UserRow>();
  return results.map(toUser);
}

export async function getUser(id: string): Promise<AdminUser | null> {
  const row = await db().prepare("SELECT * FROM admin_users WHERE id = ?").bind(id).first<UserRow>();
  return row ? toUser(row) : null;
}

export async function emailTaken(email: string, exceptId?: string): Promise<boolean> {
  const row = await db()
    .prepare("SELECT id FROM admin_users WHERE email = ? AND id != ?")
    .bind(normaliseEmail(email), exceptId ?? "")
    .first();
  return row !== null;
}

/** Active owners, so the last one cannot be removed or demoted. */
export async function ownerCount(): Promise<number> {
  const row = await db()
    .prepare("SELECT COUNT(*) AS n FROM admin_users WHERE role = 'owner' AND active = 1")
    .first<{ n: number }>();
  return row?.n ?? 0;
}

export async function updateUser(id: string, input: { name: string; email: string; role: Role }) {
  await db()
    .prepare("UPDATE admin_users SET name = ?, email = ?, role = ?, updated_at = ? WHERE id = ?")
    .bind(input.name.trim(), normaliseEmail(input.email), input.role, new Date().toISOString(), id)
    .run();
}

/** Sets a new password and signs the person out everywhere. */
export async function setPassword(id: string, password: string) {
  await db()
    .prepare(
      "UPDATE admin_users SET password_hash = ?, session_version = session_version + 1, updated_at = ? WHERE id = ?",
    )
    .bind(await hashPassword(password), new Date().toISOString(), id)
    .run();
}

/** After changing one's own password: a fresh cookie for the new session version. */
export async function renewOwnSession(id: string) {
  const row = await db().prepare("SELECT * FROM admin_users WHERE id = ?").bind(id).first<UserRow>();
  if (row) await setSession(row, row.session_version);
}

/** Turning access off also signs the person out at once. */
export async function setUserActive(id: string, active: boolean) {
  await db()
    .prepare(
      "UPDATE admin_users SET active = ?, session_version = session_version + 1, updated_at = ? WHERE id = ?",
    )
    .bind(active ? 1 : 0, new Date().toISOString(), id)
    .run();
}

export async function checkOwnPassword(id: string, password: string): Promise<boolean> {
  const row = await db().prepare("SELECT password_hash FROM admin_users WHERE id = ?").bind(id).first<UserRow>();
  return row ? passwordMatches(password, row.password_hash) : false;
}

// Activity

export type Activity = { id: number; userName: string; summary: string; href: string | null; at: string };

export async function logActivity(user: AdminUser, summary: string, href?: string) {
  await db()
    .prepare("INSERT INTO admin_activity (user_id, user_name, summary, href, at) VALUES (?, ?, ?, ?, ?)")
    .bind(user.id, user.name, summary, href ?? null, new Date().toISOString())
    .run();
}

export async function recentActivity(limit = 30): Promise<Activity[]> {
  const { results } = await db()
    .prepare("SELECT id, user_name, summary, href, at FROM admin_activity ORDER BY at DESC, id DESC LIMIT ?")
    .bind(limit)
    .all<{ id: number; user_name: string; summary: string; href: string | null; at: string }>();
  return results.map((r) => ({ id: r.id, userName: r.user_name, summary: r.summary, href: r.href, at: r.at }));
}
