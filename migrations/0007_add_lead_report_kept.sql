-- Reports older than a month are listed in the admin panel for a decision.
-- 1 once the team chooses to keep one, so it is not asked about again.
ALTER TABLE leads ADD COLUMN report_kept INTEGER;
