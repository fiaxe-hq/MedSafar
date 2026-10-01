-- Enquiries from the two-step form. Step 1 inserts the phone; step 2 fills the rest.
CREATE TABLE leads (
  id TEXT PRIMARY KEY,
  phone TEXT NOT NULL,
  phone_iso TEXT NOT NULL,
  source TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  name TEXT,
  email TEXT,
  country TEXT,
  treatment TEXT,
  timeline TEXT,
  notes TEXT,
  report_file TEXT,
  consent INTEGER,
  completed_at TEXT
);

CREATE INDEX leads_created_at ON leads (created_at);
