-- Figures for the trust strip (patients helped, partner hospitals, ...).
-- Managed in /admin. Nothing shows on the site until a row is published.
--
-- country is NULL for a figure shown on every page. A row with a country slug
-- (e.g. 'ng') overrides the global row with the same key on that country's
-- page only. Overrides are not editable in /admin yet.
CREATE TABLE site_stats (
  id TEXT PRIMARY KEY,
  key TEXT NOT NULL,
  country TEXT,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  published INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
);

-- One global row per key, and one override per key and country.
CREATE UNIQUE INDEX site_stats_key_country ON site_stats (key, COALESCE(country, ''));
CREATE INDEX site_stats_published ON site_stats (published, sort_order);
