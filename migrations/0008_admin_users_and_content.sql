-- Team logins for /admin. Each person has an account; the first one is made
-- with the ADMIN_PASSWORD setup key (lib/admin/auth.ts). Passwords are stored
-- only as PBKDF2 hashes.
CREATE TABLE admin_users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  -- 'owner' can manage the team as well as the content; 'editor' the content only.
  role TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  -- Raised to sign a person out everywhere (password change, removal).
  session_version INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  last_sign_in_at TEXT
);

-- Failed sign-ins, for the lockout. Holds the email typed and a hash of the
-- IP address, never the password. Rows older than a day are deleted.
CREATE TABLE admin_sign_in_failures (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  failed_at INTEGER NOT NULL
);

CREATE INDEX admin_sign_in_failures_email ON admin_sign_in_failures (email, failed_at);
CREATE INDEX admin_sign_in_failures_ip ON admin_sign_in_failures (ip_hash, failed_at);

-- Who changed what, shown in /admin.
CREATE TABLE admin_activity (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  user_name TEXT NOT NULL,
  summary TEXT NOT NULL,
  href TEXT,
  at TEXT NOT NULL
);

CREATE INDEX admin_activity_at ON admin_activity (at);

-- Changes made in /admin to hospitals, doctors, treatments, blog posts and the
-- contact details (lib/content.ts). The files in data/ and content/ stay the
-- starting point: a row here replaces the record with the same kind and slug,
-- adds a new one, or hides one.
CREATE TABLE content_entries (
  kind TEXT NOT NULL,
  slug TEXT NOT NULL,
  -- The whole record as JSON, in the shape of content/types.ts.
  data TEXT NOT NULL,
  hidden INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  updated_by TEXT NOT NULL,
  PRIMARY KEY (kind, slug)
);

-- OpenNext's page cache bookkeeping (binding NEXT_TAG_CACHE_D1). The deploy
-- creates it too; it is here so local previews work.
CREATE TABLE IF NOT EXISTS revalidations (
  tag TEXT NOT NULL,
  revalidatedAt INTEGER NOT NULL,
  stale INTEGER,
  expire INTEGER DEFAULT NULL,
  UNIQUE (tag) ON CONFLICT REPLACE
);
