import { connection } from "next/server";
import { env } from "./cloudflare";

/**
 * Trust strip figures, stored in D1 (table site_stats, migrations/0002).
 *
 * Nothing is invented in code: the public site shows only rows an admin has
 * published in /admin, and shows no figures at all when there are none.
 *
 * Rows with country = NULL are global. A row with a country slug overrides
 * the global row with the same key on that country's page.
 */

export type SiteStat = {
  id: string;
  key: string;
  country: string | null;
  label: string;
  value: string;
  sortOrder: number;
  published: boolean;
  updatedAt: string;
};

/** What the public trust strip needs. */
export type PublicStat = { key: string; label: string; value: string };

type StatRow = {
  id: string;
  key: string;
  country: string | null;
  label: string;
  value: string;
  sort_order: number;
  published: number;
  updated_at: string;
};

function toStat(row: StatRow): SiteStat {
  return {
    id: row.id,
    key: row.key,
    country: row.country,
    label: row.label,
    value: row.value,
    sortOrder: row.sort_order,
    published: row.published === 1,
    updatedAt: row.updated_at,
  };
}

function db() {
  return env().LEADS_DB;
}

// Public

/**
 * Published figures for a page: global rows, with any published override for
 * `country` taking the place of the global row with the same key.
 *
 * Read on every request, so a change in /admin shows at once. If the table is
 * missing or D1 fails, the strip shows no figures rather than breaking the page.
 */
export async function getPublishedStats(country: string | null): Promise<PublicStat[]> {
  await connection();
  try {
    const { results } = await db()
      .prepare(
        "SELECT * FROM site_stats WHERE published = 1 AND (country IS NULL OR country = ?) ORDER BY sort_order, label",
      )
      .bind(country ?? "")
      .all<StatRow>();

    const byKey = new Map<string, StatRow>();
    for (const row of results) {
      const current = byKey.get(row.key);
      if (!current || (row.country !== null && current.country === null)) byKey.set(row.key, row);
    }
    return [...byKey.values()]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((row) => ({ key: row.key, label: row.label, value: row.value }));
  } catch (error) {
    console.error("site_stats read failed", error);
    return [];
  }
}

// Admin

/** Every global figure, published or not, in display order. */
export async function listStats(): Promise<SiteStat[]> {
  const { results } = await db()
    .prepare("SELECT * FROM site_stats WHERE country IS NULL ORDER BY sort_order, label")
    .all<StatRow>();
  return results.map(toStat);
}

export async function createStat(input: { key: string; label: string; value: string }) {
  const now = new Date().toISOString();
  const last = await db()
    .prepare("SELECT MAX(sort_order) AS max FROM site_stats WHERE country IS NULL")
    .first<{ max: number | null }>();
  await db()
    .prepare(
      "INSERT INTO site_stats (id, key, country, label, value, sort_order, published, updated_at) VALUES (?, ?, NULL, ?, ?, ?, 0, ?)",
    )
    .bind(crypto.randomUUID(), input.key, input.label, input.value, (last?.max ?? 0) + 10, now)
    .run();
}

export async function updateStat(id: string, input: { label: string; value: string }) {
  await db()
    .prepare("UPDATE site_stats SET label = ?, value = ?, updated_at = ? WHERE id = ?")
    .bind(input.label, input.value, new Date().toISOString(), id)
    .run();
}

export async function setStatPublished(id: string, published: boolean) {
  await db()
    .prepare("UPDATE site_stats SET published = ?, updated_at = ? WHERE id = ?")
    .bind(published ? 1 : 0, new Date().toISOString(), id)
    .run();
}

export async function deleteStat(id: string) {
  await db().prepare("DELETE FROM site_stats WHERE id = ?").bind(id).run();
}

/** Swaps a figure with its neighbour, then renumbers 10, 20, 30... */
export async function moveStat(id: string, direction: "up" | "down") {
  const stats = await listStats();
  const from = stats.findIndex((s) => s.id === id);
  const to = direction === "up" ? from - 1 : from + 1;
  if (from < 0 || to < 0 || to >= stats.length) return;
  [stats[from], stats[to]] = [stats[to], stats[from]];

  const now = new Date().toISOString();
  const update = db().prepare("UPDATE site_stats SET sort_order = ?, updated_at = ? WHERE id = ?");
  await db().batch(stats.map((s, i) => update.bind((i + 1) * 10, now, s.id)));
}
