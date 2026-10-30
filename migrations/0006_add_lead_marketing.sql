-- Marketing consent, separate from the consent to share a case with doctors
-- and optional: 1 if ticked, 0 if not, NULL for enquiries made before it.
ALTER TABLE leads ADD COLUMN marketing INTEGER;
